// Servidor de teste local: o mesmo núcleo do Supabase, com licenças num JSON (só hashes).
// Uso: node servidor/local/servidor-local.mjs   (porta 47900)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { atender } from '../supabase/functions/meufuncionario/nucleo/mcp.js';

const dir = path.dirname(fileURLToPath(import.meta.url));
const arqLic = path.join(dir, 'licencas-teste.json');
const usos = [];
const PORTA = Number(process.env.PORTA || 47900);

http
  .createServer(async (req, res) => {
    const corpo = await new Promise((ok) => {
      let b = '';
      req.on('data', (c) => (b += c));
      req.on('end', () => ok(b));
    });
    const request = new Request(`http://127.0.0.1:${PORTA}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? undefined : corpo,
    });
    const resposta = await atender(request, {
      buscarLicenca: async (hash) => {
        const lic = fs.existsSync(arqLic) ? JSON.parse(fs.readFileSync(arqLic, 'utf8')) : {};
        return lic[hash] || null;
      },
      registrarUso: async (hash, ferramenta) => {
        usos.push({ hash: hash.slice(0, 8), ferramenta, em: new Date().toISOString() });
        console.log('uso:', ferramenta, hash.slice(0, 8));
      },
    });
    res.writeHead(resposta.status, Object.fromEntries(resposta.headers));
    res.end(resposta.body ? Buffer.from(await resposta.arrayBuffer()) : undefined);
  })
  .listen(PORTA, '127.0.0.1', () => console.log(`Meu Funcionário MCP local em http://127.0.0.1:${PORTA}/`));
