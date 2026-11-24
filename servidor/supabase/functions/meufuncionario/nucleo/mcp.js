// Servidor MCP mínimo (JSON-RPC 2.0 por HTTP, resposta em JSON).
// Independente de plataforma: roda no Supabase (Deno) e no teste local (Node).
import { RECEITAS, buscarReceita, formatarReceita } from './receitas.js';
import { validarCardapio } from './validar.js';

export const VERSAO = '0.1.0';
const PROTOCOLOS = ['2025-06-18', '2025-03-26', '2024-11-05'];

export const FERRAMENTAS = [
  {
    name: 'md_receita',
    description:
      'Devolve o caminho certo no painel do Mais Delivery para um pedido do franqueado (ex.: "trocar preço", "pizza meio a meio", "liberar motoboy", "taxa mínima"), com passos, operações e armadilhas. Use antes de agir no painel.',
    inputSchema: {
      type: 'object',
      properties: { pedido: { type: 'string', description: 'O que o franqueado pediu, em palavras dele.' } },
      required: ['pedido'],
    },
  },
  {
    name: 'md_validar_cardapio',
    description:
      'Confere um cardápio no formato do MD antes de subir: [[categoria,[[nome,preço,descrição,bebida(0/1),níveis,foto]]]]. Nível = {titulo,min,max,tp,opcoes:[[nome,valor]]}. Devolve erros (impedem subir) e avisos.',
    inputSchema: {
      type: 'object',
      properties: { cardapio: { description: 'O cardápio (lista ou texto JSON).' } },
      required: ['cardapio'],
    },
  },
];

const ok = (id, result) => ({ jsonrpc: '2.0', id, result });
const erro = (id, code, message) => ({ jsonrpc: '2.0', id, error: { code, message } });
const texto = (t, isError = false) => ({ content: [{ type: 'text', text: t }], isError });

export function chamarFerramenta(nome, args = {}) {
  if (nome === 'md_receita') {
    const achadas = buscarReceita(args.pedido || '');
    if (!achadas.length) {
      return texto(
        'Não achei receita para esse pedido. Receitas disponíveis:\n' + RECEITAS.map((r) => `- ${r.titulo}`).join('\n'),
      );
    }
    const [melhor, ...outras] = achadas;
    let t = formatarReceita(melhor.r);
    if (outras.length) t += '\n\nTalvez também: ' + outras.slice(0, 3).map((x) => x.r.titulo).join(' · ');
    return texto(t);
  }
  if (nome === 'md_validar_cardapio') {
    const r = validarCardapio(args.cardapio);
    const linhas = [
      r.ok ? '✅ Cardápio pode subir.' : '❌ Corrigir antes de subir.',
      r.resumo ? `Resumo: ${r.resumo.categorias} categorias, ${r.resumo.produtos} produtos, ${r.resumo.produtosComNiveis} com níveis.` : '',
      ...(r.erros.length ? ['', 'Erros:', ...r.erros.map((e) => '- ' + e)] : []),
      ...(r.avisos.length ? ['', 'Avisos:', ...r.avisos.map((a) => '- ' + a)] : []),
    ].filter((x) => x !== '');
    return texto(linhas.join('\n'), !r.ok);
  }
  return null;
}

// Trata uma mensagem JSON-RPC. Devolve o objeto de resposta, ou null para notificações.
export function tratarMensagem(msg, licenca) {
  const { id, method, params } = msg || {};
  const notificacao = id === undefined || id === null;
  switch (method) {
    case 'initialize': {
      const pedido = params?.protocolVersion;
      return ok(id, {
        protocolVersion: PROTOCOLOS.includes(pedido) ? pedido : PROTOCOLOS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'meufuncionario', version: VERSAO },
        instructions: `Meu Funcionário (Mais Delivery). Licença: ${licenca.cidade || 'sem cidade'}, válida até ${licenca.validade || 'sem data'}. Consulte md_receita antes de agir no painel.`,
      });
    }
    case 'notifications/initialized':
    case 'notifications/cancelled':
      return null;
    case 'ping':
      return ok(id, {});
    case 'tools/list':
      return ok(id, { tools: FERRAMENTAS });
    case 'tools/call': {
      const r = chamarFerramenta(params?.name, params?.arguments);
      return r ? ok(id, r) : erro(id, -32602, `Ferramenta desconhecida: ${params?.name}`);
    }
    default:
      return notificacao ? null : erro(id, -32601, `Método não suportado: ${method}`);
  }
}

export async function hashChave(chave) {
  const dados = new TextEncoder().encode(String(chave));
  const h = await crypto.subtle.digest('SHA-256', dados);
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function chaveDoCabecalho(headers) {
  const a = headers.get('authorization') || '';
  const m = a.match(/^Bearer\s+(.+)$/i);
  return (m ? m[1] : headers.get('x-licenca') || '').trim();
}

// Regras da licença (iguais nos dois ambientes). registro = linha da tabela licencas ou null.
export function situacaoLicenca(registro, hoje = new Date()) {
  if (!registro) return { valida: false, motivo: 'Licença não encontrada.' };
  if (registro.status !== 'ativa') return { valida: false, motivo: `Licença ${registro.status}. Fale com o suporte.` };
  if (registro.validade && new Date(registro.validade + 'T23:59:59') < hoje) {
    return { valida: false, motivo: `Licença vencida em ${registro.validade}. Renove para continuar.` };
  }
  return { valida: true };
}

// Recebe uma Request (Web API) e devolve uma Response. buscarLicenca(hash) e registrarUso(...) são injetados.
export async function atender(req, { buscarLicenca, registrarUso }) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-licenca, content-type, mcp-protocol-version, mcp-session-id',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
  const json = (corpo, status = 200) =>
    new Response(JSON.stringify(corpo), { status, headers: { 'Content-Type': 'application/json', ...cors } });

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method === 'GET') return new Response('Use POST (MCP Streamable HTTP).', { status: 405, headers: cors });
  if (req.method !== 'POST') return json(erro(null, -32600, 'Método HTTP inválido'), 405);

  const chave = chaveDoCabecalho(req.headers);
  if (!chave) return json(erro(null, -32001, 'Licença ausente. Configure MEUFUNC_LICENCA.'), 401);
  const hash = await hashChave(chave);
  const licenca = await buscarLicenca(hash);
  const sit = situacaoLicenca(licenca);
  if (!sit.valida) return json(erro(null, -32001, sit.motivo), 403);

  let corpo;
  try {
    corpo = await req.json();
  } catch {
    return json(erro(null, -32700, 'JSON inválido'), 400);
  }
  const lote = Array.isArray(corpo) ? corpo : [corpo];
  const respostas = [];
  for (const m of lote) {
    const r = tratarMensagem(m, licenca);
    if (m?.method === 'tools/call') {
      try {
        await registrarUso(hash, m.params?.name || '?');
      } catch {
        /* registro de uso não pode derrubar a chamada */
      }
    }
    if (r) respostas.push(r);
  }
  if (!respostas.length) return new Response(null, { status: 202, headers: cors });
  return json(Array.isArray(corpo) ? respostas : respostas[0]);
}
