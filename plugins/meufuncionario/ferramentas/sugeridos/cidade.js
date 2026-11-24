// Sugeridos da cidade inteira, no Chrome do painel (gerencial). Precisa de md-tools.js e regra.js.
// 1) window.__fotos = {idLojaMD: "idProd,idProd,..."} (produtos com foto, vindos do 1menu)
// 2) planejarCidade(ids)  → lê produtos.php de cada loja e monta window.__planos[id] (NÃO grava)
// 3) gravarCidade(ids)    → grava (145/149), só completa até 5. Progresso em window.__cid.
(function () {
  const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  let nomes = null;
  async function entrarId(id) {
    if (!nomes) nomes = new Map((await MD.listar()).map((l) => [String(l.id), l.nome.replace(/\s*\([^)]*\)\s*$/, '')]));
    const nome = norm(nomes.get(String(id)) || '');
    // MD.entrar compara o INÍCIO do texto do link (com MD.norm): passar o nome inteiro do link, nunca cortado
    const links = (await MD.links()).map((l) => l.t);
    const palavras = nome.split(/[^a-z0-9]+/).filter((w) => w.length >= 4);
    const cand = links.filter((t) => norm(t).startsWith(nome)).concat(links.filter((t) => palavras.some((w) => norm(t).includes(w))));
    for (const t of [...new Set(cand)]) { try { return await MD.entrar(id, t); } catch {} await MD.sleep(1500); }
    // último recurso: só a 1ª palavra (ex.: "Daddy's" — o apóstrofo atrapalha a comparação)
    try { return await MD.entrar(id, nome.split(/[^a-z0-9]+/)[0]); } catch {}
    throw new Error('nao entrei em ' + id);
  }
  function lerProdutos(html) {
    const rows = [];
    for (const tr of MD.parse(html).querySelectorAll('table tbody tr')) {
      const c = tr.cells; if (!c || c.length < 12) continue;
      const md = c[1].textContent.trim(); if (!/^\d+$/.test(md)) continue;
      const preco = Number((c[9].querySelector('input')?.value || c[9].textContent).replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      // colunas: 9 valor, 10 estoque, 11 ativo (checkbox flgAtivo), 12 disponível
      const ativo = !!c[11].querySelector('input.flgAtivo:checked') || /^\s*Ativo/i.test(c[11].textContent);
      const disp = /Sim/i.test(c[12].textContent);
      rows.push({ md, cat: c[2].textContent.trim(), name: c[4].textContent.trim(), price: preco, ativo, disp });
    }
    return rows;
  }
  window.planejarCidade = (ids) => {
    window.__planos = window.__planos || {}; window.__cid = { fase: 'planejar', fim: false, feitas: 0, erros: [] };
    (async () => {
      for (const id of ids) {
        try {
          await entrarId(id);
          const fotos = new Set((window.__fotos[id] || '').split(','));
          const prods = lerProdutos(await MD.get('produtos.php')).filter((p) => p.ativo && p.disp)
            .map((p) => ({ ...p, foto: fotos.has(p.md) }));
          window.__planos[id] = { rows: prods, prods: prods.length, comFoto: prods.filter((p) => p.foto).length, plano: montarPlano(prods) };
        } catch (e) { __cid.erros.push(id + ': ' + String(e).slice(0, 80)); }
        finally { try { await MD.get(MD.voltar); } catch {} __cid.feitas++; await MD.sleep(4000); }
      }
      __cid.fim = true;
    })();
    return ids.length;
  };
  // RÁPIDO (use este): 145/149 funcionam do GERENCIAL só passando idRestaurante — não precisa entrar
  // na loja. ~55 ms por chamada; 3 em paralelo gravou 6.865 sugeridos em ~6 min (Aripuanã, 13/11/2026).
  window.gravarRapido = (ids, paralelo = 3) => {
    window.__g2 = { fim: false, ins: 0, pul: 0, erros: [], feitos: 0 };
    const tarefas = ids.flatMap((id) => (window.__planos[id]?.plano || []).map((it) => ({ id, it })));
    __g2.total = tarefas.length;
    const post = async (id, d) => { for (let k = 0; k < 3; k++) { try { return JSON.parse(await (await fetch(MD.BASE + 'ajax_operacao.php', { method: 'POST', credentials: 'include', body: new URLSearchParams({ idRestaurante: String(id), ...d }) })).text()); } catch { await MD.sleep(800); } } return null; };
    let i = 0;
    const worker = async () => {
      while (i < tarefas.length) {
        const { id, it } = tarefas[i++];
        const at = await post(id, { nrOperacao: '145', tpSugerido: 'cardapio', idCardapio: String(it.alvoId) });
        if (!Array.isArray(at)) { __g2.erros.push(id + ' ' + it.alvoNome); __g2.feitos++; continue; }
        const ja = new Set(at.map((s) => String(s.idCardapioSg))); let ordem = ja.size;
        for (const sg of it.sugeridos) {
          if (ja.has(String(sg.id))) { __g2.pul++; continue; }
          if (ordem >= 5) break;
          const r = await post(id, { nrOperacao: '149', idCardapioSg: String(sg.id), nrOrdem: String(ordem + 1), tpSugerido: 'cardapio', idCardapio: String(it.alvoId) });
          if (r && r.retorno === 'OK') { __g2.ins++; ordem++; ja.add(String(sg.id)); } else __g2.erros.push(id + ' ' + it.alvoNome + '>' + sg.nome);
          await MD.sleep(40);
        }
        __g2.feitos++;
      }
    };
    Promise.all(Array.from({ length: paralelo }, worker)).then(() => { __g2.fim = true; });
    return tarefas.length;
  };
  // LENTO (antigo): entra loja por loja; ~2 s por sugerido.
  window.gravarCidade = (ids) => {
    window.__cid = { fase: 'gravar', fim: false, feitas: 0, ins: 0, pul: 0, erros: [], porLoja: {} };
    (async () => {
      for (const id of ids) {
        const P = window.__planos[id]; if (!P || !P.plano.length) { __cid.feitas++; continue; }
        let ins = 0;
        try {
          await entrarId(id);
          const post = async (d) => { const t = await (await fetch(MD.BASE + 'ajax_operacao.php', { method: 'POST', credentials: 'include', body: new URLSearchParams({ idRestaurante: String(id), ...d }) })).text(); try { return JSON.parse(t); } catch { return null; } };
          for (const it of P.plano) {
            const at = await post({ nrOperacao: '145', tpSugerido: 'cardapio', idCardapio: String(it.alvoId) });
            const ja = new Set((Array.isArray(at) ? at : []).map((s) => String(s.idCardapioSg)));
            let ordem = ja.size;
            for (const sg of it.sugeridos) {
              if (ja.has(String(sg.id))) { __cid.pul++; continue; }
              if (ordem >= 5) break;
              const r = await post({ nrOperacao: '149', idCardapioSg: String(sg.id), nrOrdem: String(ordem + 1), tpSugerido: 'cardapio', idCardapio: String(it.alvoId) });
              if (r && r.retorno === 'OK') { ins++; ordem++; ja.add(String(sg.id)); } else __cid.erros.push(id + ' ' + it.alvoNome);
              await MD.sleep(120);
            }
          }
        } catch (e) { __cid.erros.push(id + ': ' + String(e).slice(0, 80)); }
        finally { __cid.ins += ins; __cid.porLoja[id] = ins; try { await MD.get(MD.voltar); } catch {} __cid.feitas++; await MD.sleep(4000); }
      }
      __cid.fim = true;
    })();
    return ids.length;
  };
})();
