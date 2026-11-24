// Teste de ponta a ponta do servidor MCP (local ou publicado).
// Uso: MEUFUNC_URL=http://127.0.0.1:47900/ MEUFUNC_LICENCA=MF-... node servidor/local/teste.mjs
const URL_ = process.env.MEUFUNC_URL || 'http://127.0.0.1:47900/';
const CHAVE = process.env.MEUFUNC_LICENCA || '';
let falhas = 0;
const conf = (nome, cond, extra = '') => {
  console.log(`${cond ? 'OK  ' : 'FALHOU'} ${nome}${extra ? ' — ' + extra : ''}`);
  if (!cond) falhas++;
};
const rpc = async (corpo, chave = CHAVE) => {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', ...(chave ? { Authorization: 'Bearer ' + chave } : {}) },
    body: JSON.stringify(corpo),
  });
  const t = await r.text();
  return { status: r.status, json: t ? JSON.parse(t) : null };
};
const chamar = (name, args) => rpc({ jsonrpc: '2.0', id: 9, method: 'tools/call', params: { name, arguments: args } });

// Licença
conf('sem chave → 401', (await rpc({ jsonrpc: '2.0', id: 1, method: 'ping' }, '')).status === 401);
conf('chave errada → 403', (await rpc({ jsonrpc: '2.0', id: 1, method: 'ping' }, 'MF-ERRADA')).status === 403);
const venc = await rpc({ jsonrpc: '2.0', id: 1, method: 'ping' }, 'MF-VENCIDA');
conf('licença vencida → 403', venc.status === 403, venc.json?.error?.message);
const susp = await rpc({ jsonrpc: '2.0', id: 1, method: 'ping' }, 'MF-SUSPENSA');
conf('licença suspensa → 403', susp.status === 403, susp.json?.error?.message);

// Protocolo
const ini = await rpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'teste', version: '1' } } });
conf('initialize', ini.status === 200 && ini.json.result?.serverInfo?.name === 'meufuncionario', ini.json.result?.instructions);
conf('notificação → 202', (await rpc({ jsonrpc: '2.0', method: 'notifications/initialized' })).status === 202);
const lista = await rpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
conf('tools/list', lista.json.result?.tools?.length === 2, lista.json.result?.tools?.map((t) => t.name).join(', '));

// Receitas
for (const [pedido, espera] of [
  ['quero trocar o preço do x-bacon', 'preço de um produto'],
  ['cria uma pizza meio a meio com 2 sabores', 'pizza'],
  ['libera o motoboy novo', 'motoboy'],
  ['coloca taxa mínima de 7 reais nos bairros', 'Taxas de entrega'],
  ['o produto sumiu do app', 'indisponível'],
]) {
  const r = await chamar('md_receita', { pedido });
  const t = r.json.result?.content?.[0]?.text || '';
  conf(`receita "${pedido}"`, t.toLowerCase().includes(espera.toLowerCase()), t.split('\n')[0]);
}

// Validação
const bom = [
  ['Pizzas - Loja X', [['Pizza Grande', 0, 'escolha 2 sabores', 0, [{ titulo: 'Escolha 2 sabores', min: 2, max: 2, tp: 'media_substituir', opcoes: [['Calabresa', 45], ['Mussarela', 40], ['Frango', 48]] }]]]],
  ['Bebidas - Loja X', [['Coca-Cola 2L', 14, '', 1, []]]],
];
const vb = await chamar('md_validar_cardapio', { cardapio: bom });
conf('cardápio bom passa', vb.json.result?.isError === false, vb.json.result?.content?.[0]?.text.split('\n')[0]);
const ruim = [
  ['Lanches', [
    ['X-Bacon com muito bacon e cheddar e ovo e salada completo', '25,90', 'desc', 0, []],
    ['Pizza', 0, '', 0, [{ titulo: 'Escolha 2 sabores', min: 3, max: 2, tp: 'somar', opcoes: [['A', 10]] }]],
  ]],
];
const vr = await chamar('md_validar_cardapio', { cardapio: ruim });
const tr = vr.json.result?.content?.[0]?.text || '';
conf('cardápio ruim é barrado', vr.json.result?.isError === true);
conf('  pega preço em texto com vírgula', tr.includes('"25,90"'));
conf('  pega min > max', tr.includes('min maior que max'));
conf('  avisa nome > 45', tr.includes('máx. 45'));
console.log('\n--- resposta do cardápio ruim ---\n' + tr);
console.log(falhas ? `\n${falhas} FALHA(S)` : '\nTUDO OK');
process.exitCode = falhas ? 1 : 0;
