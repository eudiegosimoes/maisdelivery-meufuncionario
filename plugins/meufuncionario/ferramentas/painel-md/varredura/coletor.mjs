// Coletor local: recebe o mapeamento do painel e grava em JSONL. Só escuta em 127.0.0.1.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const DIR = process.argv[2];
fs.mkdirSync(DIR, { recursive: true });
const H = {
  'Access-Control-Allow-Origin': 'https://painel.maisdeliveryempresas.com.br',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Private-Network': 'true',
};
http.createServer((req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, H); return res.end(); }
  if (req.method === 'GET' && req.url.startsWith('/varredor.js')) {
    res.writeHead(200, { ...H, 'Content-Type': 'text/javascript' });
    return res.end(fs.readFileSync(new URL('./varredor.js', import.meta.url)));
  }
  if (req.method !== 'POST') { res.writeHead(405, H); return res.end(); }
  const nome = (new URL(req.url, 'http://x').searchParams.get('f') || 'saida').replace(/[^\w-]/g, '');
  let b = '';
  req.on('data', c => (b += c));
  req.on('end', () => {
    fs.appendFileSync(path.join(DIR, nome + '.jsonl'), b.replace(/\n/g, ' ') + '\n');
    res.writeHead(200, H); res.end('ok');
  });
}).listen(47801, '127.0.0.1', () => console.log('coletor ok'));
