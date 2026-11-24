// Gera uma chave de licença nova e mostra o SQL para cadastrá-la.
// A chave aparece UMA vez (entregar ao cliente); no banco só vai o hash.
// Uso: node servidor/ferramentas/gerar-chave.mjs "Nome do franqueado" "Cidade" [validade AAAA-MM-DD] [--local]
import { randomBytes, createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [cliente = 'Teste', cidade = '', validade = '', ...flags] = process.argv.slice(2);
const bloco = () => randomBytes(3).toString('hex').toUpperCase();
const chave = `MF-${bloco()}-${bloco()}-${bloco()}`;
const hash = createHash('sha256').update(chave).digest('hex');
const q = (s) => (s ? `'${String(s).replace(/'/g, "''")}'` : 'null');

console.log('\nCHAVE (entregar ao cliente, não fica salva em lugar nenhum):\n  ' + chave);
console.log('\nSQL para o Supabase:');
console.log(
  `  insert into public.licencas (chave_hash, cliente, cidade, validade) values ('${hash}', ${q(cliente)}, ${q(cidade)}, ${q(validade)});\n`,
);

if (flags.includes('--local')) {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'local');
  const arq = path.join(dir, 'licencas-teste.json');
  const atual = fs.existsSync(arq) ? JSON.parse(fs.readFileSync(arq, 'utf8')) : {};
  atual[hash] = { cliente, cidade, status: 'ativa', validade: validade || null };
  fs.writeFileSync(arq, JSON.stringify(atual, null, 2));
  console.log('Também gravada (só o hash) em servidor/local/licencas-teste.json para o teste local.');
}
