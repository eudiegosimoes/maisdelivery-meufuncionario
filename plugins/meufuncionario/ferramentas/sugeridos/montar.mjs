// Monta os "produtos sugeridos" (peça junto do app MD) de uma loja, offline.
// uso: node montar.mjs <produtos.json> <saida.json>
// produtos.json: [{md, name, price, cat, foto}] — a regra fica em regra.js (a mesma que roda no Chrome).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

(0, eval)(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'regra.js'), 'utf8'));
const [, , ent, sai] = process.argv;
const rows = JSON.parse(fs.readFileSync(ent, 'utf8'));
const plano = globalThis.montarPlano(rows);
fs.writeFileSync(sai, JSON.stringify(plano));
console.log(`produtos ${rows.length} | com sugeridos ${plano.length} | sem (menos de 3 opções) ${rows.length - plano.length}`);
for (const x of plano) console.log(`[${x.tipo}] ${x.alvoNome} -> ${x.sugeridos.map((s) => s.nome).join(' | ')}`);
