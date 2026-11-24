import { readFileSync, writeFileSync } from "node:fs";
const alvos = readFileSync("alvos.txt", "utf8").trim().split(/\r?\n/).map(l => l.split("|"));
const cand = JSON.parse(readFileSync("candidatos.json", "utf8"));
const por = {}; for (const c of cand) if (/maisdeliveryfranquia\.com\.br/.test(c.u)) (por[c.i] ||= []).push(c.u);
const vistos = new Set(); let h = `<!doctype html><meta charset=utf-8><style>body{font:13px sans-serif;margin:8px;background:#fff}.r{display:flex;align-items:center;gap:6px;margin:3px 0}.n{width:190px}img{width:150px;height:110px;object-fit:cover;border:1px solid #ccc}.k{position:relative}.k b{position:absolute;left:2px;top:2px;background:#ff0;padding:0 3px}</style>`;
alvos.forEach(([loja, nome, termo], i) => {
  const lista = por[i] || [];
  const chave = termo + "|" + lista.join(); if (vistos.has(chave)) return; vistos.add(chave);
  h += `<div class=r><div class=n>${i} ${loja} ${nome}</div>` + lista.map((u, j) => `<div class=k><img src="${u}"><b>${j}</b></div>`).join("") + `</div>`;
});
writeFileSync("candidatos.html", h);
