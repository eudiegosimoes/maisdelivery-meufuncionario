// Validação de cardápio no formato do MD:
// [ ["Categoria", [ ["Nome", preco, "descrição", bebida(0/1), [niveis], "urlFoto"?] ] ] ]
// nível: { titulo, min, max, tp, opcoes: [ ["Nome", valor] ] }
// tp: somar | substituir | media_somar | media_substituir | maior_somar | maior_substituir

export const TIPOS_PRECO = {
  somar: 0,
  substituir: 1,
  media_somar: 2,
  media_substituir: 3,
  maior_somar: 4,
  maior_substituir: 5,
};

const MAX_NOME = 45;

export function validarCardapio(entrada) {
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
