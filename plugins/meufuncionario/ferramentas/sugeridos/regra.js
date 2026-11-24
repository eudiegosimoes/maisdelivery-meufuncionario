// Regra dos "produtos sugeridos" (peça junto do app MD). Script comum: roda no Node
// (montar.mjs faz eval) e no Chrome do painel. Define globalThis.montarPlano(rows).
// rows: [{md, name, price, cat, foto}] → [{alvoId, alvoNome, tipo, sugeridos:[{id,nome}]}]
//
// Regras do MD: máx 5 por produto, mín 3 pra seção aparecer, sugerido SEM FOTO não aparece.
// Regra da casa:
//  - comida: bebida (família se o prato for >= R$ 50) + 2ª bebida + acompanhamento + doce + 2º acompanhamento
//  - acompanhamento (batata, porção, esfiha) e doce: bebidas + doce + acompanhamento
//  - bebida: comidas mais em conta, variando a categoria (sem chiclete/bala)
//  - nunca o próprio produto nem outro da mesma categoria; sugerido mais barato que o alvo
//    (exceto quando o alvo é bebida).
(function () {
  const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const RX = {
    bebida: /bebida|refri|refrigerante|suco|agua|cerveja|drink|chopp|energetico|monster|coca|guarana|fanta|sprite|h2oh|schweppes|del ?vale|\bcha\b|mate|vinho|dose|lata|long ?neck|soda|kuat|pepsi|itubaina|heineken|skol|brahma|budweiser|original|amstel|stella/,
    doce: /doce|sobremesa|sorvete|acai|brownie|pudim|chocolate|bolo|torta|mousse|brigadeiro|petit|churros|milk ?shake|picole|trufa|cookie|chiclete|bala|bombom|geladinho|paleta|cupcake|donut|sonho|pave|cocada|creme de|copo da felicidade/,
    acomp: /batata|porc|frita|onion|nugget|esfiha|mandioca|aipim|polenta|anel|isca|coxinha|salgad|pao de alho|kibe|quibe|bolinho|tapioca|adicional|acompanhamento|extra|guarni/,
  };
  const COMIDA = /combo|promoc|pizza|lanche|hamb|burg|prato|marmita|refeic|executivo|almoco|espet|churrasco|sushi|japones|temaki|yakisoba|massa|pastel|sanduiche|x-|kit|balde|parmegiana|file|frango|carne|peixe|strogonoff|caldo|sopa|salada|wrap|hot ?dog|cachorro|crepe|panqueca|lasanha|macarr|risoto|feijoada|a la carte|self/;
  const IMPULSO = /chiclete|\bbala\b|bombom|trufa|pirulito/;

  const CAFE = /\bcafe|capuc|cappuc|expresso|espresso|chocolate quente|latte|mocha|machiat|cha gelado|ice tea/;
  function tipo(p) {
    const c = norm(p.cat).replace(/ - .*$/, ''), n = norm(p.name);
    if (IMPULSO.test(n)) return 'doce';
    if (/combo/.test(n)) return 'comida';           // combo dentro de "Bebidas" continua sendo comida
    if (CAFE.test(n) || /^cafe|cafes|cafeteria|bebidas quentes/.test(c)) return 'bebida';
    if (RX.bebida.test(c)) return 'bebida';
    if (RX.doce.test(c)) return 'doce';
    if (RX.acomp.test(c)) return 'acomp';
    if (COMIDA.test(c) || /combo/.test(n)) return 'comida';
    if (RX.bebida.test(n) && !RX.acomp.test(n) && !COMIDA.test(n)) return 'bebida';
    if (RX.doce.test(n)) return 'doce';
    if (RX.acomp.test(n)) return 'acomp';
    return 'comida';
  }
  const sabor = (n) => {
    n = norm(n);
    for (const k of ['coca', 'guarana', 'fanta', 'sprite', 'pepsi', 'kuat', 'suco', 'agua', 'cerveja', 'heineken', 'monster', 'h2oh', 'schweppes']) if (n.includes(k)) return k;
    return n.split(' ')[0];
  };
  const familia = (n) => /2 ?l\b|2 litro|1,5|1 ?l\b|1 litro|garrafa|2lt|1lt/.test(norm(n));
  const ordemBebida = ['coca', 'guarana', 'suco', 'fanta', 'sprite', 'pepsi', 'kuat', 'h2oh', 'agua', 'schweppes', 'cerveja', 'heineken', 'monster'];
  const rank = (p) => { const i = ordemBebida.indexOf(sabor(p.name)); return i < 0 ? 99 : i; };
  const alcool = (p) => /cerveja|heineken|skol|brahma|budweiser|amstel|stella|original|chopp|vinho|dose|whisky|vodka|caipir|gin\b|drink/.test(norm(p.name + ' ' + p.cat));

  globalThis.montarPlano = function (entrada) {
    // "Adicional bacon", "Extra queijo": não são produto pra oferecer nem recebem sugestão
    const ADIC = /^(adicional|adicionais|extra|acrescimo)\b/;
    const rows = entrada.filter((p) => !ADIC.test(norm(p.name)) && !ADIC.test(norm(p.cat)))
      .map((p) => ({ ...p, price: Number(p.price), t: tipo(p), cat0: norm(p.cat).replace(/ - .*$/, '') }));
    const comFoto = rows.filter((p) => p.foto && p.md && p.price > 0);
    function escolher(alvo) {
      const cand = comFoto.filter((p) => p.md !== alvo.md && p.cat0 !== alvo.cat0 && (alvo.t === 'bebida' || p.price < alvo.price));
      const out = [], usados = new Set();
      const add = (p) => { if (p && out.length < 5 && !out.includes(p)) { out.push(p); if (p.t === 'bebida') usados.add(sabor(p.name)); } };
      // refrigerante/suco primeiro; cerveja só se não tiver outra
      const bebidas = (grande) => cand.filter((p) => p.t === 'bebida')
        .sort((a, b) => alcool(a) - alcool(b) || (grande ? familia(b.name) - familia(a.name) : familia(a.name) - familia(b.name)) || rank(a) - rank(b) || a.price - b.price);
      const proxBebida = (grande) => bebidas(grande).find((p) => !usados.has(sabor(p.name)) && !out.includes(p));
      const barato = (t) => {
        const l = cand.filter((p) => p.t === t && !out.includes(p)).sort((a, b) => a.price - b.price);
        return l.find((p) => !out.some((o) => o.cat0 === p.cat0)) || l[0];
      };
      if (alvo.t === 'bebida') {
        const comer = cand.filter((p) => p.t !== 'bebida' && !IMPULSO.test(norm(p.name))).sort((a, b) => a.price - b.price);
        const cats = new Set();
        for (const p of comer) { if (cats.has(p.cat0)) continue; cats.add(p.cat0); add(p); }
        for (const p of comer) add(p);
        return out;
      }
      const grande = alvo.t === 'comida' && alvo.price >= 50;
      add(proxBebida(grande));
      add(proxBebida(false));
      if (alvo.t === 'comida') add(barato('acomp'));
      add(barato('doce'));
      // 2º acompanhamento só se for de outra categoria (nada de "batata P" + "batata G")
      { const a = barato('acomp'); if (a && !out.some((o) => o.cat0 === a.cat0)) add(a); }
      while (out.length < 5) { const b = proxBebida(grande) || proxBebida(!grande); if (!b) break; add(b); }
      while (out.length < 5) { const p = barato('acomp') || barato('doce') || barato('comida'); if (!p) break; add(p); }
      return out;
    }
    // Último recurso (pedido do dono): se não chegou a 5, completa com QUALQUER outro produto com foto
    // da loja — outra categoria primeiro, depois a mesma; preço mais perto do alvo primeiro.
    function completar(alvo, out) {
      // aqui vale até produto a R$ 0 (preço vem das opções, ex.: espetinho "escolha o sabor")
      const resto = rows.filter((p) => p.foto && p.md && p.md !== alvo.md && !out.includes(p))
        .sort((a, b) => (a.cat0 === alvo.cat0) - (b.cat0 === alvo.cat0) || Math.abs(a.price - alvo.price) - Math.abs(b.price - alvo.price));
      for (const p of resto) { if (out.length >= 5) break; out.push(p); }
      return out;
    }
    // sem o mínimo de 3 a seção não aparece no app, mas grava o que der (o dono pediu)
    return rows.map((a) => ({ alvoId: a.md, alvoNome: a.name, tipo: a.t, sugeridos: completar(a, escolher(a)).map((p) => ({ id: p.md, nome: p.name })) }))
      .filter((x) => x.alvoId && x.sugeridos.length >= 1);
  };
})();
