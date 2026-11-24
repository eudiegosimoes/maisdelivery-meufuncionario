// Junta o núcleo + index.ts num arquivo único, para colar no editor de funções do painel do Supabase.
// Uso: node servidor/ferramentas/empacotar.mjs  → gera servidor/dist/meufuncionario-index.ts
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const fn = path.join(raiz, 'supabase', 'functions', 'meufuncionario');
const ler = (p) => fs.readFileSync(path.join(fn, p), 'utf8');
const limpar = (t) =>
  t
    .replace(/^import .*?;\s*$/gm, '')
    .replace(/^export (const|function|async function) /gm, '$1 ');

const corpo = [
  '// GERADO por servidor/ferramentas/empacotar.mjs — não editar aqui; editar os arquivos do núcleo.',
  "import { createClient } from 'npm:@supabase/supabase-js@2';",
  limpar(ler('nucleo/receitas.js')),
  limpar(ler('nucleo/validar.js')),
  limpar(ler('nucleo/mcp.js')),
  limpar(ler('index.ts')),
].join('\n\n');

const saida = path.join(raiz, 'dist', 'meufuncionario-index.ts');
fs.mkdirSync(path.dirname(saida), { recursive: true });
fs.writeFileSync(saida, corpo);
console.log('gerado', path.relative(process.cwd(), saida), corpo.length, 'caracteres');
