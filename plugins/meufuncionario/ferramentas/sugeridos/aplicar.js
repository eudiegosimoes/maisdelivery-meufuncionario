// Grava os "produtos sugeridos" (peça junto) no MD. Rodar no Chrome, na aba do painel,
// depois de carregar md-tools.js e pôr o plano em window.__plano (saída do montar.mjs).
// API (mesma do Turbo Cardápio, docs/api-mais-delivery.md): ajax_operacao.php
//   145 = lista os atuais (tpSugerido=cardapio, idCardapio) · 149 = insere (idCardapioSg, nrOrdem)
//   147 = remove · máx 5 por produto. Não apaga o que já existe: só completa até 5.
// uso: aplicarSugeridos('130797', 'fornao express')  → acompanha em window.__js
window.aplicarSugeridos = (idLoja, nomeIni) => {
  window.__js = { fim: false, ins: 0, pul: 0, falha: [], feitos: 0 };
  (async () => {
    try {
      await MD.entrar(idLoja, nomeIni);
      const post = async (d) => { const t = await (await fetch(MD.BASE + 'ajax_operacao.php', { method: 'POST', credentials: 'include', body: new URLSearchParams({ idRestaurante: idLoja, ...d }) })).text(); try { return JSON.parse(t); } catch { return null; } };
      for (const it of window.__plano) {
        const at = await post({ nrOperacao: '145', tpSugerido: 'cardapio', idCardapio: String(it.alvoId) });
        const ja = new Set((Array.isArray(at) ? at : []).map((s) => String(s.idCardapioSg)));
        let ordem = ja.size;
        for (const sg of it.sugeridos) {
          if (String(sg.id) === String(it.alvoId) || ja.has(String(sg.id))) { __js.pul++; continue; }
          if (ordem >= 5) break;
          const res = await post({ nrOperacao: '149', idCardapioSg: String(sg.id), nrOrdem: String(ordem + 1), tpSugerido: 'cardapio', idCardapio: String(it.alvoId) });
          if (res && res.retorno === 'OK') { __js.ins++; ordem++; ja.add(String(sg.id)); } else __js.falha.push(it.alvoNome + '>' + sg.nome);
          await MD.sleep(150);
        }
        __js.feitos++;
      }
    } catch (e) { __js.erro = String(e).slice(0, 120); } finally { await MD.get(MD.voltar); __js.fim = true; }
  })();
  return window.__plano.length;
};
