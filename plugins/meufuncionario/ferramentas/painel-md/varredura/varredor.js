// Varredor só-leitura do painel MD. Só faz GET em páginas .php e .js do próprio painel.
// Não guarda conteúdo de linhas de tabela (dados pessoais), só a estrutura.
window.__varrer = async function (ctx, opts = {}) {
  const COLET = 'http://127.0.0.1:47801/?f=';
  const BLOQ = /login|logout|sair|exclu|delet|remov|apaga|cobrancas_todos|confirmacao_2fa|conta_mercado|conta_asaas|gerar|setup|\.exe|ajax_|download|export|salva|grava|insere|atualiza|envia|upd_|ins_|del_|processa|webhook|callback|cron|oapi|api\//i;
  const SENS = /^(sel)?(id)?(Restaurantes?|Entregador(es)?|Usuarios?|Funcionarios?|Clientes?|Pedidos?|selfuncionarios|arr\w+Sel)(\[\])?$/i;
  const T = s => (s || '').replace(/\s+/g, ' ').trim();
  const M = s => String(s || '').replace(/\d{3,}/g, '#');
  const P = h => (h || '').split('#')[0].split('?')[0];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const envia = rec => fetch(COLET + ctx, { method: 'POST', body: JSON.stringify(rec) }).catch(() => {});
  const jsCache = (window.__jsVistos = window.__jsVistos || new Set());

  const label = (d, i) => {
    let l = i.id && d.querySelector('label[for="' + CSS.escape(i.id) + '"]');
    if (!l) { const g = i.closest('.form-group,[class*="col-"],td,.input-group'); l = g && g.querySelector('label'); }
    if (!l && i.closest('label')) l = i.closest('label');
    return l ? T(l.textContent).slice(0, 60) : (i.placeholder ? 'ph:' + T(i.placeholder).slice(0, 40) : '');
  };
  const campos = (root, d) => {
    const vist = new Set(); const out = [];
    root.querySelectorAll('input,select,textarea').forEach(i => {
      const n = M(i.name || (i.id ? '#' + i.id : '')); if (!n) return;
      const tipo = i.tagName === 'SELECT' ? (i.multiple ? 'multi' : 'select') : i.tagName === 'TEXTAREA' ? 'textarea' : (i.type || 'text');
      const o = { n, t: tipo };
      if (tipo === 'radio' || tipo === 'checkbox') o.v = M(i.value);
      const k = n + '|' + (o.v || ''); if (vist.has(k)) return; vist.add(k);
      if (tipo !== 'hidden') { const l = label(d, i); if (l) o.l = l; }
      if (i.required) o.req = 1;
      if (i.tagName === 'SELECT') {
        if (!SENS.test(i.name || '') && i.options.length <= 40) o.op = [...i.options].map(x => M(x.value) + '=' + T(x.textContent).slice(0, 50));
        else o.nop = i.options.length;
      }
      if (i.maxLength > 0 && i.maxLength < 1000) o.max = i.maxLength;
      const cls = (i.className || '').toString().split(/\s+/).filter(c => /mask|money|valor|data|date|time|hora|cep|tel|cpf|cnpj|select2|chosen/i.test(c)); if (cls.length) o.cls = cls.join(' ');
      out.push(o);
    });
    return out;
  };
  const botoes = root => [...root.querySelectorAll('button,input[type=submit],input[type=button],a.btn')].map(b => {
    const o = { t: T(b.textContent || b.value).slice(0, 50) };
    const c = (b.className || '').toString().split(/\s+/).filter(c => c && !/^btn(-xs|-sm|-lg|-block|-outline)?$|^(btn-)?(primary|success|danger|warning|info|default|white|secondary)$|^m[lrtb]?-\d|^p[lrtb]?-\d|^pull-|^float-/.test(c)).join(' '); if (c) o.c = c;
    const on = b.getAttribute('onclick'); if (on) o.on = M(T(on)).slice(0, 120);
    const dt = [...b.attributes].filter(a => /^data-(?!original|placement|toggle$)/.test(a.name)).map(a => a.name + (a.name.match(/target|dismiss|action|tipo|op/) ? '=' + M(a.value).slice(0, 40) : '')); if (dt.length) o.d = dt.join(' ');
    if (b.getAttribute('data-toggle') === 'modal' || b.getAttribute('data-bs-toggle') === 'modal') o.modal = b.getAttribute('data-target') || b.getAttribute('data-bs-target') || b.getAttribute('href');
    if (b.tagName === 'A') { const h = b.getAttribute('href') || ''; if (h && !h.startsWith('#') && !h.startsWith('javascript')) o.href = P(h).replace(/^https?:\/\/[^/]+/, '') + (h.includes('?') ? '?' + h.split('?')[1].split('&').map(kv => kv.split('=')[0]).join('&') : ''); }
    return o;
  }).filter(o => o.t || o.on || o.c);

  // Extrai chamadas ajax / operações de um texto JS.
  const lerJS = (txt) => {
    const ops = []; const urls = [];
    const fnAntes = idx => {
      const trecho = txt.slice(Math.max(0, idx - 3000), idx);
      const re = /function\s+(\w+)\s*\(([^)]*)\)|(\w+)\s*[:=]\s*(?:async\s*)?function\s*\(([^)]*)\)|\$\(\s*['"]([^'"]+)['"]\s*\)\.on\(\s*['"](\w+)['"](?:\s*,\s*['"]([^'"]+)['"])?|\$\(\s*(?:document|['"][^'"]+['"])\s*\)\.on\(\s*['"](\w+)['"]\s*,\s*['"]([^'"]+)['"]|\$\(\s*['"]([^'"]+)['"]\s*\)\.(click|change|submit|blur|keyup)\(/g;
      let m, last = null; while ((m = re.exec(trecho))) last = m;
      if (!last) return '';
      if (last[1]) return last[1] + '(' + T(last[2]) + ')';
      if (last[3]) return last[3] + '(' + T(last[4]) + ')';
      if (last[5]) return '$(' + last[5] + ').on(' + last[6] + (last[7] ? ',' + last[7] : '') + ')';
      if (last[8]) return 'on(' + last[8] + ',' + last[9] + ')';
      return '$(' + last[10] + ').' + last[11];
    };
    const re = /nrOperacao['"]?\s*[:=,]\s*['"]?(\d+)/g; let m;
    while ((m = re.exec(txt))) {
      const i = m.index;
      const ini = txt.lastIndexOf('{', i); const fim = txt.indexOf('}', i);
      const bloco = txt.slice(Math.max(ini, i - 600), fim > 0 ? Math.min(fim, i + 600) : i + 300);
      const chaves = [...new Set([...bloco.matchAll(/['"]?(\w+)['"]?\s*:/g)].map(x => x[1]).filter(k => !/^(nrOperacao|type|url|data|dataType|success|error|async|cache|method|contentType|processData|function|http|https)$/.test(k)))];
      const urlm = txt.slice(Math.max(0, i - 400), i).match(/url\s*:\s*['"]([^'"]+)['"][^]*$/);
      ops.push({ op: m[1], fn: fnAntes(i), k: chaves.slice(0, 15), url: urlm ? P(urlm[1]) : '' });
    }
    const reU = /(?:url\s*:\s*|\$\.(?:post|get|getJSON)\(\s*|fetch\(\s*|location(?:\.href)?\s*=\s*|window\.open\(\s*)['"`]([^'"`]+\.php[^'"`]*)['"`]/g;
    while ((m = reU.exec(txt))) { const u = P(m[1]); if (!/ajax_operacao/.test(u)) urls.push({ u: u.replace(/^https?:\/\/[^/]+/, ''), q: m[1].includes('?') ? m[1].split('?')[1].split('&').map(kv => kv.split('=')[0]).join('&') : '', fn: fnAntes(m.index) }); }
    const acts = [...new Set([...txt.matchAll(/(?:#action|name=["']?action["']?\]?)['"]?\s*\)\s*\.val\(\s*['"](\w+)['"]/g)].map(x => x[1]))];
    const swal = [...new Set([...txt.matchAll(/swal\(\s*\{?\s*(?:title\s*:\s*)?['"`]([^'"`]{4,80})/g)].map(x => x[1]))].slice(0, 15);
    return { ops, urls, acts, swal };
  };

  // Linha de base: o que todas as páginas têm (cabeçalho, avisos, chat).
  const baseInline = window.__baseInline || new Set();
  const visit = new Set(opts.pular || []);
  const fila = [...new Set(opts.inicio || [])];
  const scriptsComuns = window.__scriptsComuns;
  let n = 0;
  while (fila.length && n < (opts.max || 200)) {
    const p = fila.shift(); if (visit.has(p) || (BLOQ.test(p) && !(opts.permitir || []).includes(p))) continue; visit.add(p); n++;
    let r, html;
    try { r = await fetch(p, { credentials: 'include', redirect: 'follow' }); html = await r.text(); } catch (e) { await envia({ ctx, p, erro: String(e) }); continue; }
    const d = new DOMParser().parseFromString(html, 'text/html');
    const final = P(r.url).split('/').pop();
    const rec = { ctx, p, st: r.status, final: final !== p ? final : undefined, titulo: T(d.title).slice(0, 80) };
    const main = d.querySelector('#page-wrapper, .wrapper-content, main, .content-wrapper') || d.body;
    rec.h = [...new Set([...main.querySelectorAll('h1,h2,h3,h4,h5,.ibox-title,.card-title,.panel-heading,legend')].map(x => T(x.textContent).slice(0, 80)).filter(Boolean))].slice(0, 20);
    rec.forms = [...main.querySelectorAll('form')].filter(f => !f.closest('.modal')).map(f => ({ id: f.id || undefined, a: P(f.getAttribute('action')), m: (f.getAttribute('method') || 'get').toLowerCase(), enc: f.enctype && f.enctype.includes('multipart') ? 'multipart' : undefined, c: campos(f, d), b: botoes(f) }));
    rec.modais = [...d.querySelectorAll('.modal')].map(md => ({ id: md.id || undefined, t: T((md.querySelector('.modal-title,.modal-header h4,.modal-header h5') || {}).textContent).slice(0, 80), form: md.querySelector('form') ? P(md.querySelector('form').getAttribute('action')) : undefined, c: campos(md, d), b: botoes(md) })).filter(x => x.c.length || x.b.length > 1);
    rec.tabelas = [...main.querySelectorAll('table')].map(t => ({ id: t.id || undefined, cols: [...t.querySelectorAll('thead th')].map(x => T(x.textContent).slice(0, 40)), linhas: t.querySelectorAll('tbody tr').length, rowCtl: (() => { const tr = t.querySelector('tbody tr'); if (!tr) return undefined; return [...tr.querySelectorAll('input,select,button,a')].map(e => e.tagName.toLowerCase() + (e.type ? ':' + e.type : '') + (e.name ? ' n=' + M(e.name) : '') + (e.className ? ' .' + String(e.className).split(/\s+/).filter(c => !/^btn|^form-control|^input-sm/.test(c)).join('.') : '') + (e.getAttribute('onclick') ? ' on=' + M(e.getAttribute('onclick')).slice(0, 60) : '') + (e.getAttribute('onchange') ? ' ch=' + M(e.getAttribute('onchange')).slice(0, 60) : '') + (e.tagName === 'A' && e.getAttribute('href') && !e.getAttribute('href').startsWith('#') ? ' href=' + P(e.getAttribute('href')).split('/').pop() : '')).slice(0, 25); })() }));
    rec.botoes = botoes(main).filter(b => !b._skip).slice(0, 80);
    // Links internos
    const links = new Set(); const linkQ = {};
    d.querySelectorAll('a[href],form[action],[data-href],option[value$=".php"]').forEach(a => {
      const raw = a.getAttribute('href') || a.getAttribute('action') || a.getAttribute('data-href') || a.getAttribute('value') || '';
      if (/^(https?:)?\/\//.test(raw) && !raw.includes(location.host)) return;
      const pp = P(raw).replace(/^https?:\/\/[^/]+/, '').replace(/^\/?painel\//, '').replace(/^\.\//, '');
      if (!/^[\w-]+\.php$/.test(pp)) return;
      links.add(pp);
      if (raw.includes('?')) linkQ[pp] = [...new Set([...(linkQ[pp] || []), ...raw.split('?')[1].split('&').map(kv => kv.split('=')[0])])];
    });
    rec.links = [...links]; rec.linkQ = linkQ;
    // Scripts
    const inl = [...d.querySelectorAll('script:not([src])')].map(s => s.textContent);
    const basePref = window.__basePref || (window.__basePref = new Set([...baseInline].map(s => s.split(':').slice(1).join(':'))));
    const inlTxt = inl.filter(t => !basePref.has(t.slice(0, 200))).join('\n;\n');
    rec.js = lerJS(inlTxt);
    const srcs = [...d.querySelectorAll('script[src]')].map(s => P(s.getAttribute('src'))).filter(s => !/jquery|bootstrap|plugins\/|cdn|google|facebook|moment|sweetalert|datatables|select2|chosen|summernote|toastr|metisMenu|pace|inspinia|chart|maps/i.test(s) && !(scriptsComuns && scriptsComuns.has(s)));
    rec.jsArq = srcs;
    await envia(rec);
    for (const s of srcs) {
      if (jsCache.has(s)) continue; jsCache.add(s);
      try { const t = await (await fetch(s, { credentials: 'include' })).text(); await envia({ ctx, tipo: 'js', p: s, tam: t.length, js: lerJS(t) }); } catch (e) {}
      await sleep(400);
    }
    for (const l of links) if (!visit.has(l) && !BLOQ.test(l)) fila.push(l);
    for (const u of rec.js.urls) { const x = u.u.split('/').pop(); if (/^[\w-]+\.php$/.test(x) && !visit.has(x) && !BLOQ.test(x)) fila.push(x); }
    await sleep(opts.pausa || 1500);
  }
  await envia({ ctx, tipo: 'fim', visitadas: [...visit], restantes: fila.filter(x => !visit.has(x)) });
  return 'ok ' + n + ' paginas, fila restante ' + fila.filter(x => !visit.has(x)).length;
};

window.__prepararBase = async function (pagSimples) {
  // Scripts que aparecem em DUAS páginas simples diferentes = cabeçalho comum.
  const ler = async p => new DOMParser().parseFromString(await (await fetch(p)).text(), 'text/html');
  const [a, b] = [await ler(pagSimples[0]), await ler(pagSimples[1])];
  const ki = d => new Set([...d.querySelectorAll('script:not([src])')].map(s => s.textContent.length + ':' + s.textContent.slice(0, 200)));
  const ke = d => new Set([...d.querySelectorAll('script[src]')].map(s => (s.getAttribute('src') || '').split('?')[0]));
  const ia = ki(a), ib = ki(b), ea = ke(a), eb = ke(b);
  // inline: o cabeçalho pode variar de tamanho; usa só o começo do texto
  const pref = s => s.split(':').slice(1).join(':');
  const pb = new Set([...ib].map(pref));
  window.__baseInline = new Set([...ia].filter(x => pb.has(pref(x))).concat([...ib].filter(x => new Set([...ia].map(pref)).has(pref(x)))));
  window.__scriptsComuns = new Set([...ea].filter(x => eb.has(x)));
  return window.__baseInline.size + ' inline, ' + window.__scriptsComuns.size + ' externos comuns';
};
'varredor carregado';
