// Junta os JSONL da varredura e gera docs/ROTAS-DO-PAINEL.md + ferramentas/painel-md/rotas.json
import fs from 'node:fs';
import path from 'node:path';
const [, , DIR, REPO] = process.argv;
const ctxs = fs.readdirSync(DIR).filter(f => f.endsWith('.jsonl')).map(f => f.replace('.jsonl', ''));
const dados = {};
for (const c of ctxs) dados[c] = fs.readFileSync(path.join(DIR, c + '.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l));

const ordemCtx = c => (c === 'gerencial' ? '0' : '1' + c);
const pags = {}; // p -> {ctxs:[], rec}
const jsArqs = {}; // src -> js
const fins = {};
for (const c of ctxs.sort((a, b) => ordemCtx(a).localeCompare(ordemCtx(b)))) {
  for (const r of dados[c]) {
    if (r.tipo === 'js') { jsArqs[r.p] = jsArqs[r.p] || r; continue; }
    if (r.tipo === 'fim') { fins[c] = r; continue; }
    if (r.erro) continue;
    const k = (c === 'gerencial' ? 'G' : 'L') + ':' + r.p;
    if (!pags[k]) pags[k] = { ctxs: [], rec: r, perfil: c === 'gerencial' ? 'gerencial' : 'lojista' };
    pags[k].ctxs.push(c);
    // guarda a versão com mais linhas/forms
    const peso = x => JSON.stringify(x).length;
    if (peso(r) > peso(pags[k].rec)) pags[k].rec = r;
  }
}

// Índice de operações
const ops = {};
const addOp = (o, onde) => {
  const e = (ops[o.op] = ops[o.op] || { fns: new Set(), k: new Set(), onde: new Set(), url: new Set() });
  if (o.fn) e.fns.add(o.fn.replace(/\s+/g, ' ').slice(0, 140));
  o.k.forEach(x => e.k.add(x)); e.onde.add(onde); if (o.url) e.url.add(o.url);
};
for (const [k, v] of Object.entries(pags)) (v.rec.js?.ops || []).forEach(o => addOp(o, k.slice(2) + ' (inline)'));
for (const [s, r] of Object.entries(jsArqs)) (r.js?.ops || []).forEach(o => addOp(o, s));

const esc = s => String(s ?? '').replace(/\|/g, '\\|');
const campo = c => {
  let s = '`' + c.n + '`';
  if (c.t && c.t !== 'text') s += ' ' + c.t;
  if (c.v !== undefined) s += '=' + c.v;
  if (c.l) s += ' — ' + c.l;
  if (c.req) s += ' *(obrig.)*';
  if (c.max) s += ' (máx ' + c.max + ')';
  if (c.op) s += ' {' + c.op.slice(0, 25).join('; ') + (c.op.length > 25 ? '; …' : '') + '}';
  else if (c.nop) s += ' {' + c.nop + ' opções}';
  return esc(s);
};
const L = [];
L.push('# Rotas do painel do Mais Delivery (referência completa)');
L.push('');
L.push('Gerado automaticamente pela varredura só-leitura (GET) de ' + new Date().toISOString().slice(0, 10) + '.');
L.push('Contextos varridos: ' + ctxs.join(', ') + '. Números de 3+ dígitos viram `#`. Nenhum dado de cliente/linha de tabela é guardado.');
L.push('Use junto com `MAPA-DO-PAINEL.md` (visão por menu) e `ferramentas/painel-md/rotas.json` (mesmo conteúdo em JSON).');
L.push('');
L.push('## Índice');
for (const perfil of ['gerencial', 'lojista']) {
  const ks = Object.keys(pags).filter(k => pags[k].perfil === perfil).sort();
  L.push('- **' + perfil + '** (' + ks.length + '): ' + ks.map(k => '[' + k.slice(2) + '](#' + perfil[0] + '-' + k.slice(2).replace(/[^\w]/g, '').toLowerCase() + ')').join(' · '));
}
L.push('- [Operações `ajax_operacao.php`](#operacoes)');
L.push('');
for (const perfil of ['gerencial', 'lojista']) {
  L.push('## Perfil ' + perfil);
  L.push('');
  for (const k of Object.keys(pags).filter(k => pags[k].perfil === perfil).sort()) {
    const { rec: r, ctxs: cs } = pags[k];
    L.push('<a id="' + perfil[0] + '-' + r.p.replace(/[^\w]/g, '').toLowerCase() + '"></a>');
    L.push('### ' + r.p + (r.final ? ' → redireciona p/ `' + r.final + '`' : ''));
    const meta = [];
    if (r.titulo) meta.push('título: ' + r.titulo);
    if (perfil === 'lojista') meta.push('vista em: ' + cs.join(', '));
    if (r.h?.length) meta.push('seções: ' + r.h.slice(0, 12).join(' / '));
    if (meta.length) L.push(meta.map(m => '- ' + esc(m)).join('\n'));
    if (r.final) { L.push(''); continue; }
    for (const f of r.forms || []) {
      if (!f.c.length && !f.b.length) continue;
      L.push('- **Form** `' + (f.m || 'get').toUpperCase() + ' ' + (f.a || '(mesma página)') + '`' + (f.id ? ' #' + f.id : '') + (f.enc ? ' multipart' : '') + (f.b.length ? ' — botões: ' + esc(f.b.map(b => b.t).filter(Boolean).join(', ')) : ''));
      if (f.c.length) L.push('  - ' + f.c.map(campo).join('<br>'));
    }
    for (const m of r.modais || []) {
      L.push('- **Modal** ' + esc(m.t || m.id || '') + (m.id ? ' `#' + m.id + '`' : '') + (m.form !== undefined ? ' (form → `' + (m.form || 'mesma') + '`)' : '') + (m.b.length ? ' — botões: ' + esc(m.b.map(b => b.t).filter(Boolean).join(', ')) : ''));
      if (m.c.length) L.push('  - ' + m.c.map(campo).join('<br>'));
    }
    for (const t of r.tabelas || []) if (t.cols.length || t.rowCtl?.length) L.push('- **Tabela** ' + (t.id ? '`#' + t.id + '` ' : '') + esc(t.cols.join(' · ')) + ' (' + t.linhas + ' linhas)' + (t.rowCtl?.length ? '<br>  controles por linha: ' + esc(t.rowCtl.join(' ; ')) : ''));
    const bts = (r.botoes || []).filter(b => b.t || b.on);
    if (bts.length) L.push('- **Botões**: ' + esc([...new Set(bts.map(b => (b.t || '?') + (b.c ? ' .' + b.c.replace(/\s+/g, '.') : '') + (b.on ? ' [' + b.on + ']' : '') + (b.modal ? ' →modal ' + b.modal : '') + (b.href ? ' →' + b.href : '')))].slice(0, 40).join(' · ')));
    const jo = r.js || {};
    if (jo.ops?.length) L.push('- **Operações (inline)**: ' + esc(jo.ops.map(o => o.op + ' ' + o.fn.split('(')[0] + '(' + o.k.join(',') + ')').join(' · ')));
    if (jo.urls?.length) L.push('- **Chama**: ' + esc([...new Set(jo.urls.map(u => u.u + (u.q ? '?' + u.q : '') + (u.fn ? ' ← ' + u.fn.split('(')[0] : '')))].join(' · ')));
    if (jo.acts?.length) L.push('- **Valores de `action`**: ' + jo.acts.join(', '));
    if (jo.swal?.length) L.push('- **Mensagens**: ' + esc(jo.swal.slice(0, 8).join(' / ')));
    for (const s of r.jsArq || []) {
      const j = jsArqs[s]; if (!j) continue;
      if (j.js.ops.length) L.push('- **JS `' + s + '`** ops: ' + esc(j.js.ops.map(o => o.op + ' ' + o.fn.split('(')[0] + '(' + o.k.join(',') + ')').join(' · ')));
      if (j.js.urls.length) L.push('  - chama: ' + esc([...new Set(j.js.urls.map(u => u.u + (u.q ? '?' + u.q : '') + (u.fn ? ' ← ' + u.fn.split('(')[0] : '')))].join(' · ')));
      if (j.js.acts.length) L.push('  - `action`: ' + j.js.acts.join(', '));
    }
    const lq = Object.entries(r.linkQ || {}).filter(([p]) => !/login/.test(p)).map(([p, q]) => p + '?' + q.join('&'));
    if (lq.length) L.push('- **Links com parâmetros**: ' + esc(lq.join(' · ')));
    L.push('');
  }
}
L.push('<a id="operacoes"></a>');
L.push('## Operações `ajax_operacao.php` (POST, campo `nrOperacao`)');
L.push('');
L.push('| op | função(ões) no JS | parâmetros | onde aparece |');
L.push('|---|---|---|---|');
for (const op of Object.keys(ops).sort((a, b) => a - b)) {
  const e = ops[op];
  L.push('| ' + op + ' | ' + esc([...e.fns].join('<br>')) + ' | ' + esc([...e.k].join(', ')) + ' | ' + esc([...e.onde].slice(0, 8).join(', ') + (e.onde.size > 8 ? ' …' : '')) + ' |');
}
L.push('');
L.push('## Fila não visitada / bloqueada de propósito');
for (const [c, f] of Object.entries(fins)) L.push('- ' + c + ': ' + (f.restantes || []).join(', '));
const limpa = s => s
  .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g, '<email>')
  .replace(/\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g, '<doc>')
  .replace(/\(?\d{2}\)?\s?9?\d{4}-\d{4}/g, '<tel>')
  .replace(/\d{8,}/g, '#')
  .replace(/https?:\/\/(chat\.whatsapp|join\.slack|drive\.google|www\.dropbox)[^\s"'|)<]*/g, '<link-externo>')
  .replace(/login\.php\?[^\s"'|)<]*/g, 'login.php');
fs.writeFileSync(path.join(REPO, 'docs', 'ROTAS-DO-PAINEL.md'), limpa(L.join('\n') + '\n'));

const json = { gerado: new Date().toISOString().slice(0, 10), paginas: {}, js: {}, operacoes: {} };
for (const [k, v] of Object.entries(pags)) json.paginas[k] = { perfil: v.perfil, vistaEm: v.ctxs, ...v.rec, ctx: undefined };
for (const [s, r] of Object.entries(jsArqs)) json.js[s] = r.js;
for (const [o, e] of Object.entries(ops)) json.operacoes[o] = { fns: [...e.fns], params: [...e.k], onde: [...e.onde], url: [...e.url] };
fs.writeFileSync(path.join(REPO, 'plugins', 'meufuncionario', 'ferramentas', 'painel-md', 'rotas.json'), limpa(JSON.stringify(json, null, 1)));
console.log('paginas', Object.keys(pags).length, 'js', Object.keys(jsArqs).length, 'ops', Object.keys(ops).length);
