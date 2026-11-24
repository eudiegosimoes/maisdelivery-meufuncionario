// GERADO por servidor/ferramentas/empacotar.mjs — não editar aqui; editar os arquivos do núcleo.

import { createClient } from 'npm:@supabase/supabase-js@2';

// Base de conhecimento do Meu Funcionário: "pedido do franqueado -> caminho no painel do MD".
// É aqui que mora o valor do produto. Fica só no servidor; o plugin do cliente nunca recebe o arquivo inteiro.
// Fonte: docs/MAPA-DO-PAINEL.md e skills (varredura e testes de 24/11/2026).

const RECEITAS = [
  {
    id: 'preco-produto',
    titulo: 'Trocar o preço de um produto',
    palavras: ['preco', 'preço', 'valor', 'trocar preco', 'reajuste', 'aumentar', 'baixar'],
    onde: 'Painel do lojista (dentro da loja)',
    passos: [
      'Entrar na loja (link da loja no pedidosk.php do gerencial; 6 s entre trocas de loja).',
      'Achar o idCardapio na lista produtos.php (botão .edtRegistro, atributo idCardapio).',
      'POST ajax_operacao.php nrOperacao=31, idCardapio, vlItem="12,50" (sempre com vírgula).',
      'Conferir lendo produtos.php de novo (coluna Valor).',
    ],
    cuidados: ['Valor com vírgula. Com ponto o painel multiplica por 100.'],
  },
  {
    id: 'ativar-produto',
    titulo: 'Pausar / ativar produto (ou vários)',
    palavras: ['pausar', 'desativar', 'ativar', 'acabou', 'esgotado', 'tirar do cardapio', 'sem estoque'],
    onde: 'Painel do lojista',
    passos: [
      'Um produto: op 171 (idCardapio) para saber se está em promoção; depois op 27 (idCardapio, flgAtivo 0/1).',
      'Vários: POST produtos.php action="Ativa/DesativaProduto", idCardapio[] (um por produto), flgAtivaDesativa 0/1.',
      'Conferir as colunas Ativo e Disponível em produtos.php.',
    ],
    cuidados: ['"Disponível: Não" também acontece com estoque 0 ou com horário do produto fora do dia.'],
  },
  {
    id: 'estoque',
    titulo: 'Produto aparece como indisponível / estoque',
    palavras: ['indisponivel', 'indisponível', 'nao aparece', 'não aparece', 'estoque', 'sumiu do app'],
    onde: 'Painel do lojista',
    passos: [
      'Ver em produtos.php as colunas Estoque, Ativo e Disponível.',
      'Estoque 0 ou vazio = indisponível. Ajustar com op 113 (idCardapio, qtEstoque="999999").',
      'Se o produto tem horário próprio (sun_1_open…sat_2_close), ele só vende nesses dias/horas: limpar os horários em produto_detalhe.php (action=edt → salvar sem dsImagem).',
      'Opção de nível com controle de estoque: op 180 (idOpcaoNivel, qtEstoque).',
    ],
    cuidados: ['Padrão das lojas: 999999 = sem limite.'],
  },
  {
    id: 'pizza-meio-a-meio',
    titulo: 'Criar pizza com sabores (meio a meio) / "escolha X sabores"',
    palavras: ['pizza', 'sabores', 'meio a meio', 'escolha 2 sabores', 'sabor'],
    onde: 'Painel do lojista → Produto → Níveis Cardápio',
    passos: [
      'Criar/abrir o produto (ex.: "Pizza Grande") e ligar flgNiveis=1 nele (não liga sozinho).',
      'nivel_cardapio.php action=new: dsTitulo "Escolha 2 sabores", nivelPor=2 (Produto), idCategoria=0, idSubCategoria=0, idCardapio=<id>, qtMinOpcao=2, qtMaxOpcao=2, flgTipoPreco=3 (média e substitui) ou 5 (maior valor e substitui), flgMostrarPreco=1, flgAtivo=1.',
      'opcoes_nivel_cardapio.php (multipart) action=ins: idNivelCardapio, dsNome do sabor, vlItem com vírgula, flgAtivo=1. Uma por sabor.',
      'Conferir: nivel_cardapio.php mostra o produto na coluna Produto; opções com POST idNivelFiltro.',
    ],
    cuidados: [
      'Nível por produto com idCategoria preenchida vira nível da CATEGORIA inteira.',
      'As telas antigas Sabores/Adicional quase não são usadas: o padrão é nível.',
      'Copiar o produto NÃO copia os níveis; copiar o nível (action=cp) copia as opções.',
    ],
  },
  {
    id: 'adicionais',
    titulo: 'Adicionais pagos / "escolha até N" (açaí, lanche)',
    palavras: ['adicional', 'adicionais', 'acai', 'açaí', 'complemento', 'escolha ate', 'turbinar', 'monte seu'],
    onde: 'Painel do lojista → Níveis Cardápio',
    passos: [
      'Nível por produto (nivelPor=2, idCategoria=0) ou por categoria (nivelPor=1, idCardapio=0) se vale para todos.',
      'qtMinOpcao=0, qtMaxOpcao=N, flgTipoPreco=0 (somar ao produto).',
      'Opções em opcoes_nivel_cardapio.php; preço rápido op 38, ativo op 26, estoque op 180.',
    ],
    cuidados: ['Se flgControlaEstoque=1, as opções nascem com estoque 0 (indisponíveis): ajustar.'],
  },
  {
    id: 'subir-cardapio',
    titulo: 'Subir cardápio completo de uma loja',
    palavras: ['subir cardapio', 'cadastrar cardapio', 'cardápio novo', 'cardapio', 'panfleto', 'anota ai', 'saipos', 'menudino'],
    onde: 'Painel do lojista (entrar na loja)',
    passos: [
      'Montar o JSON no formato [[categoria,[[nome,preço,descrição,bebida(0/1),níveis,foto]]]] e validar com a ferramenta md_validar_cardapio.',
      'Categorias com sufixo da loja ("Lanches - Nome da Loja"): as categorias são da cidade inteira.',
      'Para cada produto: produto_detalhe.php action=ins (multipart), vlItem com vírgula, qtEstoque=999999, horários vazios, níveis juntos (flgSalvaNiveis=1).',
      'Ordem das categorias: POST produtos.php categoriaOrdem=[{"id":..},…] (lista completa).',
      'Fotos: editar cada produto com dsImagem (JPEG 800×800); sem dsImagem a foto atual fica.',
      'Conferir lendo produtos.php e nivel_cardapio.php.',
    ],
    cuidados: ['Nome até 45 caracteres.', 'Produto sem preço: R$ 0,00 e inativo.', 'Não inventar sabor/produto: avisar o que foi deduzido.'],
  },
  {
    id: 'taxas',
    titulo: 'Taxas de entrega por bairro / taxa mínima',
    palavras: ['taxa', 'entrega', 'bairro', 'frete', 'taxa minima', 'taxa mínima', 'valor da entrega'],
    onde: 'Loja: configuracao.php · Cidade: valores_entregas_gerencial.php',
    passos: [
      'Ler o form #form_post de configuracao.php inteiro (FormData).',
      'Reenviar TODAS as vlEntrega[][<linha>] com vírgula (o form traz "6.00").',
      'Bairro novo na loja: repostar com nrBairros[] + vlEntrega[] novos. Remover linha: op 9 (idEntrega).',
      'Conferir lendo de novo e comparando.',
    ],
    cuidados: ['BUG confirmado: "4.00" com ponto grava R$ 400,00.', 'Uma loja por vez, 6 s entre lojas.'],
  },
  {
    id: 'abrir-fechar',
    titulo: 'Abrir / fechar / inativar loja',
    palavras: ['abrir loja', 'fechar loja', 'status da loja', 'inativar loja', 'loja fechada'],
    onde: 'Gerencial ou lojista',
    passos: ['op 18: idRestaurante, flgAtivo 1 Aberto / 2 Fechado / 0 Inativo.', 'Conferir em estabelecimento.php (flgAtivo).'],
    cuidados: ['Nunca abrir loja sem ordem do lojista.', 'Ops 142/143 ativam/desativam TODAS as lojas da cidade: nunca usar sem ordem expressa.'],
  },
  {
    id: 'cadastrar-loja',
    titulo: 'Cadastrar loja nova',
    palavras: ['loja nova', 'cadastrar loja', 'novo estabelecimento', 'empresa nova', 'chegou uma empresa'],
    onde: 'Gerencial',
    passos: [
      'Conferir se já existe: lista_estabelecimentos.php, estabelecimentos_recebidos.php (cadastradas sozinhas) e estabelecimentos_nacionais.php (redes, botão OBTER).',
      'estabelecimento.php action=new: nome, descrição, e-mail, DDD/telefone, segmentos (idCategoria_1..4), endereço, nrLatLong, horários (3 turnos/dia), logo PNG 800×800, flgAtivo=0.',
      'Integrador: op 83 (idMarketplace, idRestaurante, flgApi=1) e op 85 (arrEmpresaIntegrada[]=38).',
      'Taxas copiadas de uma vizinha; pagamentos; status Fechado (op 18, 2).',
    ],
    cuidados: ['Horário em todos os dias; dia fechado = 00:01–00:02 e limpar depois.'],
  },
  {
    id: 'motoboy',
    titulo: 'Cadastrar / liberar motoboy (entregador)',
    palavras: ['motoboy', 'entregador', 'liberar motoboy', 'ativar entregador', 'cadastrar entregador'],
    onde: 'Gerencial → Cadastros → Entregadores (externo, atende a cidade)',
    passos: [
      'Novo: preencher nome, e-mail (único entre funcionários e entregadores), DDD/telefone, cidade, status "Em análise". A SENHA é digitada pelo motoboy ou pelo franqueado.',
      'Filtros do externo: lojas permitidas/proibidas, pagamentos que não aceita, bairros (vazio = tudo).',
      'Liberar/bloquear: op 76 (idEntregador, flgAtivoEntregador 1 Online / 2 Offline / 0 Inativo / -2 Em análise).',
    ],
    cuidados: [
      'Inativo some de todas as listas: anotar o ID antes.',
      'Editar exige validar o telefone por SMS/WhatsApp (código vai para o motoboy).',
      'Listas com títulos trocados: entregador.php = ativos; entregadores_em_analise.php = todos.',
      'Entregador interno (da loja) só com tpEntregadores=1 na configuração da loja.',
    ],
  },
  {
    id: 'promocao',
    titulo: 'Criar promoção',
    palavras: ['promocao', 'promoção', 'oferta', 'desconto em produto', 'combo promocional'],
    onde: 'Lojista → Promoções → promocao_detalhe.php',
    passos: [
      'Exige imagem, pelo menos 1 produto e preço menor que o original.',
      'Itens: idCardapio[], idSabor[], qtItem[], vlNormal[], vlDesconto[] — valores COM VÍRGULA.',
      'Datas dd/mm/aaaa, horas hh:mm; totais vlNormalTotal/vlDescontoTotal com vírgula.',
    ],
    cuidados: ['Itens com ponto viram ×100 (13.90 → 1390).'],
  },
  {
    id: 'cupom',
    titulo: 'Criar cupom',
    palavras: ['cupom', 'codigo de desconto', 'código promocional'],
    onde: 'Lojista (só a loja) ou gerencial (todas as lojas)',
    passos: ['cupom.php action=ins: dsCupom, qtUsoLimite, idTpDesconto (1 %, 0 R$, 2 frete grátis), vlDesconto com vírgula, datas, flgAtivo.'],
    cuidados: ['Cupom da cidade vale para todas as lojas: confirmar com o franqueado.'],
  },
  {
    id: 'pedido-situacao',
    titulo: 'Mudar situação / cancelar pedido',
    palavras: ['pedido', 'cancelar pedido', 'situacao do pedido', 'status do pedido', 'pedido travado'],
    onde: 'detalhes_pedido.php?id=<base64(idPedido)>',
    passos: [
      'O select Situação grava na hora (op 24) e recarrega.',
      'Cancelar: motivo da lista + texto com 20+ caracteres (o cliente vê).',
    ],
    cuidados: ['Mexe com cliente e dinheiro: sempre pedir confirmação.'],
  },
  {
    id: 'relatorio',
    titulo: 'Gerar relatório',
    palavras: ['relatorio', 'relatório', 'vendas', 'mais vendidos', 'cancelados', 'quanto vendeu'],
    onde: 'relatorio.php',
    passos: [
      'POST só com hdnRelatorioSel, idRelatorio, dtInicio, dtFim (dd/mm/aaaa), hrInicio, hrFim.',
      'Período máximo de 1 ano.',
      'Relatórios 23, 24 e 40 só saem como arquivo (idFormatoSaida 0 PDF, 1 CSV, 2 Excel).',
    ],
    cuidados: ['Mandar outros filtros com "0" zera o resultado.'],
  },
  {
    id: 'funcionario',
    titulo: 'Funcionário da loja e permissões',
    palavras: ['funcionario', 'funcionário', 'permissao', 'permissão', 'acesso da loja', 'garcom'],
    onde: 'Lojista → Configurações → Funcionários',
    passos: [
      'Criar: nome, e-mail único, DDD/telefone; a SENHA é digitada pelo franqueado.',
      'Permissões: funcionario_permissoes.php?id=<b64>, POST arr_telas_sistema_sel e arr_relatorios_sistema_sel (ids com vírgula). Novo nasce com todas.',
    ],
    cuidados: ['Excluir o último funcionário ativo tira o acesso da loja (op 178 avisa).', 'O Chrome autopreenche a senha salva: limpar o campo.'],
  },
];

const norm = (t) =>
  String(t ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

function buscarReceita(pedido) {
  const p = norm(pedido);
  const notas = RECEITAS.map((r) => {
    let n = 0;
    for (const w of r.palavras) if (p.includes(norm(w))) n += norm(w).split(' ').length + 1;
    for (const w of norm(r.titulo).split(/\W+/)) if (w.length > 3 && p.includes(w)) n += 1;
    return { r, n };
  })
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  return notas;
}

function formatarReceita(r) {
  return [
    `# ${r.titulo}`,
    `Onde: ${r.onde}`,
    '',
    'Passos:',
    ...r.passos.map((s, i) => `${i + 1}. ${s}`),
    '',
    'Cuidados:',
    ...r.cuidados.map((c) => `- ${c}`),
    '',
    'Regras gerais: uma loja por vez (~6 s entre trocas), nunca digitar senha, nunca imprimir links login.php?index=, perguntar antes de excluir/publicar/mexer em dinheiro, conferir lendo de novo depois de gravar.',
  ].join('\n');
}


// Validação de cardápio no formato do MD:
// [ ["Categoria", [ ["Nome", preco, "descrição", bebida(0/1), [niveis], "urlFoto"?] ] ] ]
// nível: { titulo, min, max, tp, opcoes: [ ["Nome", valor] ] }
// tp: somar | substituir | media_somar | media_substituir | maior_somar | maior_substituir

const TIPOS_PRECO = {
  somar: 0,
  substituir: 1,
  media_somar: 2,
  media_substituir: 3,
  maior_somar: 4,
  maior_substituir: 5,
};

const MAX_NOME = 45;

function validarCardapio(entrada) {
  const erros = [];
  const avisos = [];
  let cardapio = entrada;
  if (typeof entrada === 'string') {
    try {
      cardapio = JSON.parse(entrada);
    } catch (e) {
      return { ok: false, erros: ['JSON inválido: ' + e.message], avisos, resumo: null };
    }
  }
  if (!Array.isArray(cardapio) || !cardapio.length) {
    return { ok: false, erros: ['O cardápio deve ser uma lista de categorias.'], avisos, resumo: null };
  }

  let produtos = 0;
  let comNiveis = 0;
  const nomesCat = new Set();

  cardapio.forEach((cat, ci) => {
    const onde = `Categoria ${ci + 1}`;
    if (!Array.isArray(cat) || cat.length < 2) return erros.push(`${onde}: formato deve ser ["Nome", [produtos]].`);
    const [nomeCat, prods] = cat;
    if (!String(nomeCat || '').trim()) erros.push(`${onde}: sem nome.`);
    const chave = String(nomeCat).trim().toLowerCase();
    if (nomesCat.has(chave)) avisos.push(`${onde} "${nomeCat}": nome de categoria repetido.`);
    nomesCat.add(chave);
    if (!Array.isArray(prods) || !prods.length) return erros.push(`${onde} "${nomeCat}": sem produtos.`);

    const nomesProd = new Set();
    prods.forEach((p, pi) => {
      const op = `"${nomeCat}" › produto ${pi + 1}`;
      if (!Array.isArray(p)) return erros.push(`${op}: formato inválido.`);
      produtos++;
      const [nome, preco, desc, bebida, niveis] = p;
      const n = String(nome || '').trim();
      if (!n) erros.push(`${op}: sem nome.`);
      if (n.length > MAX_NOME) avisos.push(`${op} "${n}": nome com ${n.length} caracteres (máx. ${MAX_NOME}).`);
      if (nomesProd.has(n.toLowerCase())) avisos.push(`${op} "${n}": nome repetido na categoria.`);
      nomesProd.add(n.toLowerCase());

      if (typeof preco !== 'number' || Number.isNaN(preco)) {
        erros.push(`${op} "${n}": preço deve ser número (ex.: 12.5), não texto${typeof preco === 'string' ? ` ("${preco}")` : ''}.`);
      } else if (preco < 0) erros.push(`${op} "${n}": preço negativo.`);

      if (desc != null && typeof desc !== 'string') erros.push(`${op} "${n}": descrição deve ser texto.`);
      if (typeof desc === 'string' && desc.length > 500) avisos.push(`${op} "${n}": descrição longa (${desc.length} caracteres).`);
      if (bebida != null && bebida !== 0 && bebida !== 1) erros.push(`${op} "${n}": campo bebida deve ser 0 ou 1.`);

      const nvs = niveis == null ? [] : niveis;
      if (!Array.isArray(nvs)) return erros.push(`${op} "${n}": níveis devem ser lista.`);
      if (nvs.length) comNiveis++;
      if (preco === 0 && !nvs.some((x) => x && x.min >= 1)) {
        avisos.push(`${op} "${n}": preço R$ 0,00 sem nível obrigatório — subir INATIVO ou confirmar o preço.`);
      }

      nvs.forEach((nv, ni) => {
        const onv = `${op} "${n}" › nível ${ni + 1}`;
        if (!nv || typeof nv !== 'object') return erros.push(`${onv}: formato inválido.`);
        const { titulo, min, max, tp, opcoes } = nv;
        if (!String(titulo || '').trim()) erros.push(`${onv}: sem título.`);
        if (!Number.isInteger(min) || min < 0) erros.push(`${onv} "${titulo}": min deve ser inteiro ≥ 0.`);
        if (!Number.isInteger(max) || max < 1) erros.push(`${onv} "${titulo}": max deve ser inteiro ≥ 1.`);
        if (Number.isInteger(min) && Number.isInteger(max) && min > max) erros.push(`${onv} "${titulo}": min maior que max.`);
        if (!(tp in TIPOS_PRECO)) erros.push(`${onv} "${titulo}": tipo de preço "${tp}" inválido (use ${Object.keys(TIPOS_PRECO).join(', ')}).`);
        if (!Array.isArray(opcoes) || !opcoes.length) return erros.push(`${onv} "${titulo}": sem opções.`);
        if (Number.isInteger(max) && max > opcoes.length) avisos.push(`${onv} "${titulo}": max ${max} maior que o nº de opções (${opcoes.length}).`);
        if (/sabor/i.test(titulo || '') && min >= 2 && (tp === 'somar' || tp === 'maior_somar' || tp === 'media_somar')) {
          avisos.push(`${onv} "${titulo}": pizza com ${min}+ sabores costuma usar media_substituir ou maior_substituir.`);
        }
        if (preco === 0 && min >= 1 && tp === 'somar') {
          avisos.push(`${onv} "${titulo}": produto de R$ 0,00 com nível obrigatório "somar" — talvez o certo seja "substituir".`);
        }
        const nomesOp = new Set();
        opcoes.forEach((o, oi) => {
          const oo = `${onv} › opção ${oi + 1}`;
          if (!Array.isArray(o) || o.length < 2) return erros.push(`${oo}: formato deve ser ["Nome", valor].`);
          const [on, ov] = o;
          if (!String(on || '').trim()) erros.push(`${oo}: sem nome.`);
          if (typeof ov !== 'number' || Number.isNaN(ov) || ov < 0) erros.push(`${oo} "${on}": valor deve ser número ≥ 0.`);
          if (nomesOp.has(String(on).toLowerCase())) avisos.push(`${oo} "${on}": opção repetida.`);
          nomesOp.add(String(on).toLowerCase());
        });
      });
    });
  });

  return {
    ok: erros.length === 0,
    erros,
    avisos,
    resumo: { categorias: cardapio.length, produtos, produtosComNiveis: comNiveis },
  };
}


// Servidor MCP mínimo (JSON-RPC 2.0 por HTTP, resposta em JSON).
// Independente de plataforma: roda no Supabase (Deno) e no teste local (Node).


const VERSAO = '0.1.0';
const PROTOCOLOS = ['2025-06-18', '2025-03-26', '2024-11-05'];

const FERRAMENTAS = [
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

function chamarFerramenta(nome, args = {}) {
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
function tratarMensagem(msg, licenca) {
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

async function hashChave(chave) {
  const dados = new TextEncoder().encode(String(chave));
  const h = await crypto.subtle.digest('SHA-256', dados);
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function chaveDoCabecalho(headers) {
  const a = headers.get('authorization') || '';
  const m = a.match(/^Bearer\s+(.+)$/i);
  return (m ? m[1] : headers.get('x-licenca') || '').trim();
}

// Regras da licença (iguais nos dois ambientes). registro = linha da tabela licencas ou null.
function situacaoLicenca(registro, hoje = new Date()) {
  if (!registro) return { valida: false, motivo: 'Licença não encontrada.' };
  if (registro.status !== 'ativa') return { valida: false, motivo: `Licença ${registro.status}. Fale com o suporte.` };
  if (registro.validade && new Date(registro.validade + 'T23:59:59') < hoje) {
    return { valida: false, motivo: `Licença vencida em ${registro.validade}. Renove para continuar.` };
  }
  return { valida: true };
}

// Recebe uma Request (Web API) e devolve uma Response. buscarLicenca(hash) e registrarUso(...) são injetados.
async function atender(req, { buscarLicenca, registrarUso }) {
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


// Edge Function do Supabase: servidor MCP do Meu Funcionário com checagem de licença.
// Deploy: supabase functions deploy meufuncionario --no-verify-jwt
// (a autenticação é a chave de licença, não o JWT do Supabase)


const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
});

Deno.serve((req) =>
  atender(req, {
    buscarLicenca: async (hash: string) => {
      const { data } = await supabase
        .from('licencas')
        .select('cidade, id_marketplace, status, validade, limite_lojas')
        .eq('chave_hash', hash)
        .maybeSingle();
      return data;
    },
    registrarUso: async (hash: string, ferramenta: string) => {
      await supabase.from('uso').insert({ chave_hash: hash, ferramenta });
    },
  }),
);
