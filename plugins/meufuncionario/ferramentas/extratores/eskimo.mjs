import fs from 'fs';
const dir = process.argv[2], sid = process.argv[3];
const all = JSON.parse(fs.readFileSync(dir + '/todos.json', 'utf8'));
const sl = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const pequenas = new Set(['de','da','do','das','dos','e','com','c/','ao','a','na','no','em','por','sem']);
const titulo = s => s.toLowerCase().split(/\s+/).map((w, i) => (i > 0 && pequenas.has(w)) ? w : (/^\d/.test(w) ? w.replace(/(\d)(ml|l|g|gr|kg|kl|un)$/i, (m, a, b) => a + b.toLowerCase()) : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
const limpa = n => n.replace(/^CX\s+\d+\s+\d+\s*-\s*/i, '').replace(/\(CX\d+\)/i, '').replace(/\s+/g, ' ').trim();

// fora: insumos/atacado/lixo
const FORA = /BALDE|COBERTURA|\bCOB\b|COB\.|COPO |COPO$|TAMPA|COLHER|SACOLA|SACO PLASTICO|PAZINHA|CASQUINHA MORENINHA|CANUDO|CAIXA TERMI|TOUCA|LUVA|GUARDANAPO|PAPEL HIG|POTE ISOPOR|M PRATO|BALAO|GORDURA|LEITE EM PO|LEIT EM PO|LEITE CONDENSADO|CREME DE LEITE|CEREJA|GRANULADO|GOTAS|GRANOLA|COCO RALADO|AMENDOIN 1|FAROFA DOCE|NUTELA|CREMA PISTACCHIO|CREME AMENDOIN|CREME COOKIES|CREME DE LEITINHO|LEITINHO BASE|CHOCOBOMBOM|CHOCOCOOKIES|CHOCOLEITINHO|CHOCONUTTE|SKIMO AO LEITE|SKIMO BRANCO|STRACCIATELLA|VARIEGATO|CONFEITO|PASTILHA CONFETE|CONFETE JAJAM|CHOCOBALL|CHOCOBOL|CHOCO POWER|GOMA|GOMAS|GELATINAS BANANA|BALA GELATINA FINI 1KG|MARSHMALLOW|MARSHIMALLOW|MARCHIMELO|SUCRILHOS|CEREAL|OVO MALTINE|CUMBUCA|^ERRO$|^PRODUTO$|^LIVRE$|TAXA ENTREGA|CAIXA\/ENGRADADO|C\/\s?1[05]\b|C\/\s?18|C \/18|C\/100|50 UN 1 KL|C\/ 100|ACAI CX|ACAI 5 LITROS|ACAI ZERO 5L|CAIXA PACOQUINHA|CX PACOQUINHA|CX SUCO|CAIXA SUCO|DOCE C\/EMB PACOCA|BOBOM SONHO VALSA|BOMBOM BONOBON .*750|BOMBOM ARCOR BONOBON|SORVETE SORTIDO KG|POTE SORVETE$|COPO TRANSPARENTE|20X40GR|10X100G|10X50G|ERVA|^CAIXA ACAI|NUTELLA|3 KL|SORVETE SABORES KG/i;

function cat(x) {
  const n = x.nome.toUpperCase(), g = x.grupo_nome;
  if (/^ACAI|COPAO ACAI|CREME DE NINHO/.test(n)) return 'Açaí';
  if (/^BALA|^BANANINHA/.test(n)) return 'Doces, balas e chocolates';
  if (/PICOLE|GELADINHO/.test(n)) return 'Picolés';
  if (/^POTE SORVETE|TORTA DE SORVETE|BEST CUP|NAPOLICUP|^SUNDAE|COPINHO GOURMET|CONE SELETTO|^IOG|SORVETE/.test(n) || g === 'SORVETES') return 'Sorvetes, potes e taças';
  if (/PICOLE|GELADINHO|^PIRULITO PICOLE/.test(n) || g === 'PICOLE') return 'Picolés';
  if (/TERERE|TERRERE/.test(n)) return 'Tereré';
  if (g === 'REFRIGERANTE' || g === 'BEBIDAS' || g === 'AGUA TONICA' || /COCA|POWERADE|MONSTER|DEL VAL|DV FRUT|SCHWEPPES|SPRIT|FANTA|GUARANA|KAPO|LEAO/.test(n)) return 'Bebidas';
  if (g === 'SALGADO' || /PIPOCA/.test(n)) return 'Salgadinhos e pipoca';
  if (/CASCAO|CESTINHA|CASQUINHA/.test(n)) return 'Casquinhas e cascões';
  return 'Doces, balas e chocolates';
}

const cats = {}, fotos = [], fora = [];
const vistos = new Set();
for (const x of all) {
  const bruto = limpa(x.nome);
  if (!x.valor_venda || FORA.test(bruto) || x.grupo_nome === 'USO E CONSUMO') { fora.push(bruto); continue; }
  const c = cat({ ...x, nome: bruto });
  const TROCA = [['Acai', 'Açaí'], ['Picole', 'Picolé'], ['Copao', 'Copão'], ['Pacoca', 'Paçoca'], ['Limao', 'Limão'], ['Maracuja', 'Maracujá'], ['Terere', 'Tereré'], ['Agua', 'Água'], ['Guarana', 'Guaraná'], ['Cascao', 'Cascão'], ['Acucar', 'Açúcar'], ['Hortelan', 'Hortelã'], ['Pacot', 'Pacote'], ['Salg', 'Salgadinho']];
  let nome = titulo(bruto).split(' ').map(w => (TROCA.find(t => t[0] === w) || [w, w])[1]).join(' ').slice(0, 45).trim();
  let _velho = titulo(bruto).replace(/Acai/g,'Açaí').replace(/Picole/g,'Picolé').replace(/Copao/g,'Copão').replace(/Pacoca/g,'Paçoca').replace(/Limao/g,'Limão').replace(/Maracuja/g,'Maracujá').replace(/Terere/g,'Tereré').replace(/Agua/g,'Água').slice(0, 45).trim();
  if (vistos.has(sl(nome))) { fora.push(bruto + ' (repetido)'); continue; }
  vistos.add(sl(nome));
  const desc = x.descricao && sl(x.descricao) !== sl(x.nome) ? titulo(limpa(x.descricao)) : '';
  (cats[c] = cats[c] || []).push([nome, Number(x.valor_venda), desc, c === 'Bebidas' ? 1 : 0, []]);
  if (x.imagem_url) fotos.push(`${sid}|${sl(nome)}|${x.imagem_url}`);
}
const ORD = ['Açaí', 'Sorvetes, potes e taças', 'Picolés', 'Casquinhas e cascões', 'Doces, balas e chocolates', 'Salgadinhos e pipoca', 'Tereré', 'Bebidas'];
const mc = ORD.filter(c => cats[c]).map(c => [c, cats[c].sort((a, b) => a[0].localeCompare(b[0]))]);
fs.writeFileSync(dir + '/cardapio.json', JSON.stringify(mc));
fs.writeFileSync(dir + '/fotos.txt', fotos.join('\n') + '\n');
fs.writeFileSync(dir + '/fora.txt', fora.join('\n'));
console.log(mc.map(c => c[0] + '(' + c[1].length + ')').join(', '), '| total', mc.reduce((s, c) => s + c[1].length, 0), '| fotos', fotos.length, '| fora', fora.length);
for (const c of mc) console.log('\n## ' + c[0] + '\n' + c[1].map(p => p[0] + ' ' + p[1]).join(' | '));
