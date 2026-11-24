// Gera os cartões ilustrados do tutorial (SVG) em assets/tutorial/.
// Uso: node assets/tutorial/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const W = 1200, H = 675;
const VERM = '#C8102E', VERM2 = '#9E0B23', AMAR = '#FFC72C', CINZA = '#F4F4F6', TXT = '#1F1F24', SUAVE = '#5B5B66';
const FONTE = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const texto = (x, y, s, { tam = 28, cor = TXT, peso = 400, ancora = 'start', mono = false } = {}) =>
  `<text x="${x}" y="${y}" font-family="${mono ? "Consolas, 'Courier New', monospace" : FONTE}" font-size="${tam}" font-weight="${peso}" fill="${cor}" text-anchor="${ancora}">${esc(s)}</text>`;

// Janela genérica (navegador ou app) — desenho simples, sem marcas.
const janela = (x, y, w, h, barra, corpo) => `
  <g>
    <rect x="${x + 6}" y="${y + 10}" width="${w}" height="${h}" rx="18" fill="#000" opacity="0.08"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff" stroke="#E2E2E8" stroke-width="2"/>
    <rect x="${x}" y="${y}" width="${w}" height="52" rx="18" fill="${CINZA}"/>
    <rect x="${x}" y="${y + 34}" width="${w}" height="18" fill="${CINZA}"/>
    <circle cx="${x + 26}" cy="${y + 26}" r="7" fill="#FF5F57"/><circle cx="${x + 48}" cy="${y + 26}" r="7" fill="#FEBC2E"/><circle cx="${x + 70}" cy="${y + 26}" r="7" fill="#28C840"/>
    ${barra ? `<rect x="${x + 100}" y="${y + 12}" width="${w - 130}" height="28" rx="14" fill="#fff" stroke="#DADAE0"/>${texto(x + 118, y + 32, barra, { tam: 17, cor: SUAVE })}` : ''}
    ${corpo}
  </g>`;

const botao = (x, y, w, rotulo, { cor = VERM, txt = '#fff', tam = 22 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="48" rx="24" fill="${cor}"/>${texto(x + w / 2, y + 32, rotulo, { tam, cor: txt, peso: 700, ancora: 'middle' })}`;

const seta = (x1, y1, x2, y2) =>
  `<path d="M${x1},${y1} C${(x1 + x2) / 2},${y1 - 40} ${(x1 + x2) / 2},${y2 + 40} ${x2},${y2}" stroke="${AMAR}" stroke-width="8" fill="none" stroke-linecap="round" marker-end="url(#ponta)"/>`;

const cartao = (n, titulo, linhas, ilustracao, rodape = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${VERM}"/><stop offset="1" stop-color="${VERM2}"/></linearGradient>
    <marker id="ponta" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${AMAR}"/></marker>
  </defs>
  <rect width="${W}" height="${H}" rx="28" fill="url(#fundo)"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="22" fill="#fff"/>
  <!-- coluna de texto -->
  <circle cx="110" cy="120" r="54" fill="${AMAR}"/>
  ${texto(110, 140, n, { tam: 58, peso: 800, ancora: 'middle', cor: VERM2 })}
  ${titulo.map((t, i) => texto(70, 230 + i * 50, t, { tam: 42, peso: 800 })).join('')}
  ${linhas.map((l, i) => texto(70, 250 + titulo.length * 50 + i * 40, l, { tam: 26, cor: SUAVE })).join('')}
  ${rodape ? `<rect x="70" y="${H - 130}" width="430" height="64" rx="14" fill="#FFF6D9"/>${texto(92, H - 89, rodape, { tam: 22, cor: '#7A5A00', peso: 600 })}` : ''}
  ${texto(W - 60, H - 46, 'Meu Funcionário · @eudiegosimoes', { tam: 18, cor: '#A0A0AA', ancora: 'end' })}
  <!-- ilustração -->
  ${ilustracao}
</svg>`;

const X = 560, Y = 90, LW = 580, LH = 470; // área da ilustração

const passos = [
  {
    arq: 'passo-1-conta.svg', n: '1',
    titulo: ['Crie sua conta', 'do Claude'],
    linhas: ['Entre em claude.ai e faça', 'seu cadastro. Para o Claude Code', 'é preciso o plano Pro ou Max.'],
    rodape: '💡 O Meu Funcionário é grátis',
    ilus: janela(X, Y, LW, LH, 'claude.ai',
      `${texto(X + LW / 2, Y + 170, 'Bem-vindo ao Claude', { tam: 34, peso: 700, ancora: 'middle' })}
       <rect x="${X + 120}" y="${Y + 210}" width="${LW - 240}" height="50" rx="12" fill="${CINZA}" stroke="#DADAE0"/>${texto(X + 140, Y + 243, 'seu e-mail', { tam: 20, cor: '#9A9AA5' })}
       ${botao(X + 120, Y + 285, LW - 240, 'Continuar')}
       ${texto(X + LW / 2, Y + 380, 'Depois escolha o plano Pro ou Max', { tam: 20, cor: SUAVE, ancora: 'middle' })}`),
  },
  {
    arq: 'passo-2-aplicativo.svg', n: '2',
    titulo: ['Baixe o aplicativo', 'do Claude'],
    linhas: ['Em claude.ai/download, baixe', 'para Windows ou Mac, instale', 'e faça login.'],
    rodape: '⚠️ Use o app, não o site',
    ilus: janela(X, Y, LW, LH, 'claude.ai/download',
      `<rect x="${X + 215}" y="${Y + 95}" width="150" height="110" rx="12" fill="${CINZA}" stroke="#C9C9D2" stroke-width="3"/>
       <rect x="${X + 265}" y="${Y + 205}" width="50" height="22" fill="#C9C9D2"/><rect x="${X + 235}" y="${Y + 225}" width="110" height="10" rx="5" fill="#C9C9D2"/>
       ${texto(X + LW / 2, Y + 165, '⬇', { tam: 54, ancora: 'middle', cor: VERM })}
       ${botao(X + 140, Y + 270, LW - 280, 'Baixar para Windows')}
       ${botao(X + 140, Y + 335, LW - 280, 'Baixar para Mac', { cor: '#fff', txt: VERM })}
       <rect x="${X + 140}" y="${Y + 335}" width="${LW - 280}" height="48" rx="24" fill="none" stroke="${VERM}" stroke-width="3"/>`),
  },
  {
    arq: 'passo-3-extensao.svg', n: '3',
    titulo: ['Instale a extensão', '"Claude in Chrome"'],
    linhas: ['Na Chrome Web Store, procure', '"Claude in Chrome", adicione', 'e entre com a mesma conta.'],
    rodape: '🧩 É ela que mexe no painel',
    ilus: janela(X, Y, LW, LH, 'chrome web store',
      `<rect x="${X + 50}" y="${Y + 100}" width="96" height="96" rx="22" fill="${VERM}"/>${texto(X + 98, Y + 165, '🧩', { tam: 44, ancora: 'middle' })}
       ${texto(X + 170, Y + 140, 'Claude in Chrome', { tam: 30, peso: 700 })}
       ${texto(X + 170, Y + 178, 'Extensão oficial do Claude', { tam: 20, cor: SUAVE })}
       ${botao(X + 170, Y + 230, 300, 'Usar no Chrome')}
       ${seta(X + 470, Y + 380, X + 400, Y + 285)}
       ${texto(X + 330, Y + 420, 'clique aqui', { tam: 24, cor: VERM2, peso: 700 })}`),
  },
  {
    arq: 'passo-4-plugin.svg', n: '4',
    titulo: ['Instale o', 'Meu Funcionário'],
    linhas: ['No app do Claude, aba Code,', 'abra uma nova sessão e cole', 'os 2 comandos (um de cada vez).'],
    rodape: '📋 Copie os comandos do README',
    ilus: janela(X, Y, LW, LH, '',
      `${texto(X + 30, Y + 90, 'Claude  ›  Code  ›  Nova sessão', { tam: 18, cor: SUAVE, peso: 600 })}
       <rect x="${X + 30}" y="${Y + 115}" width="${LW - 60}" height="120" rx="12" fill="#1E1E24"/>
       ${texto(X + 50, Y + 160, '/plugin marketplace add', { tam: 21, cor: '#FFD666', mono: true })}
       ${texto(X + 50, Y + 192, '  eudiegosimoes/maisdelivery-', { tam: 21, cor: '#E6E6EA', mono: true })}
       ${texto(X + 50, Y + 222, '  meufuncionario', { tam: 21, cor: '#E6E6EA', mono: true })}
       <rect x="${X + 30}" y="${Y + 255}" width="${LW - 60}" height="92" rx="12" fill="#1E1E24"/>
       ${texto(X + 50, Y + 293, '/plugin install meufuncionario@', { tam: 21, cor: '#FFD666', mono: true })}
       ${texto(X + 50, Y + 325, '  maisdelivery-meufuncionario', { tam: 21, cor: '#E6E6EA', mono: true })}
       ${texto(X + 40, Y + 400, '1º comando → Enter · 2º comando → Enter', { tam: 21, cor: VERM2, peso: 700 })}`),
  },
  {
    arq: 'passo-5-confiar.svg', n: '5',
    titulo: ['Confirme e abra', 'uma nova sessão'],
    linhas: ['Se perguntar se confia no plugin,', 'diga sim. Depois abra uma', 'nova sessão para ele carregar.'],
    rodape: '🔁 Nova sessão = plugin ativo',
    ilus: janela(X, Y, LW, LH, '',
      `<rect x="${X}" y="${Y + 52}" width="${LW}" height="${LH - 52}" fill="#000" opacity="0.18"/>
       <rect x="${X + 70}" y="${Y + 120}" width="${LW - 140}" height="260" rx="18" fill="#fff" stroke="#E2E2E8" stroke-width="2"/>
       ${texto(X + LW / 2, Y + 185, 'Instalar plugin?', { tam: 30, peso: 700, ancora: 'middle' })}
       ${texto(X + LW / 2, Y + 225, 'meufuncionario', { tam: 22, cor: SUAVE, ancora: 'middle', mono: true })}
       ${botao(X + 110, Y + 290, 160, 'Cancelar', { cor: CINZA, txt: SUAVE })}
       ${botao(X + LW - 270, Y + 290, 160, 'Confiar')}
       ${seta(X + LW - 120, Y + 440, X + LW - 190, Y + 345)}`),
  },
  {
    arq: 'passo-6-painel.svg', n: '6',
    titulo: ['Entre no painel', 'do Mais Delivery'],
    linhas: ['Abra o painel no seu Chrome e', 'faça login você mesmo.', 'De preferência como gerencial.'],
    rodape: '🔒 O Claude nunca digita senha',
    ilus: janela(X, Y, LW, LH, 'painel.maisdeliveryempresas.com.br',
      `<rect x="${X}" y="${Y + 52}" width="${LW}" height="58" fill="${VERM}"/>${texto(X + 30, Y + 92, 'MAIS DELIVERY · painel', { tam: 22, cor: '#fff', peso: 800 })}
       ${texto(X + LW / 2, Y + 175, 'Entrar', { tam: 30, peso: 700, ancora: 'middle' })}
       <rect x="${X + 130}" y="${Y + 200}" width="${LW - 260}" height="46" rx="10" fill="${CINZA}" stroke="#DADAE0"/>${texto(X + 150, Y + 231, 'usuário', { tam: 19, cor: '#9A9AA5' })}
       <rect x="${X + 130}" y="${Y + 258}" width="${LW - 260}" height="46" rx="10" fill="${CINZA}" stroke="#DADAE0"/>${texto(X + 150, Y + 289, '••••••••  (você digita)', { tam: 19, cor: '#9A9AA5' })}
       ${botao(X + 130, Y + 322, LW - 260, 'Entrar')}`),
  },
  {
    arq: 'passo-7-pedir.svg', n: '7',
    titulo: ['Agora é só pedir!'],
    linhas: ['Fale como falaria com um', 'funcionário. Ele explica,', 'pede confirmação e faz.'],
    rodape: '✅ Confere na tela depois de gravar',
    ilus: janela(X, Y, LW, LH, '',
      `<rect x="${X + 150}" y="${Y + 85}" width="${LW - 180}" height="78" rx="18" fill="${CINZA}"/>
       ${texto(X + 170, Y + 117, 'Troca o preço do X-Bacon da', { tam: 20 })}${texto(X + 170, Y + 145, 'Lanchonete do João para R$ 27,90', { tam: 20 })}
       <rect x="${X + 30}" y="${Y + 185}" width="${LW - 110}" height="140" rx="18" fill="#FFF1F3" stroke="#F6C9D1"/>
       ${texto(X + 50, Y + 220, 'Vou mudar o X-Bacon da Lanchonete', { tam: 20 })}${texto(X + 50, Y + 248, 'do João de R$ 25,90 para R$ 27,90.', { tam: 20 })}
       ${texto(X + 50, Y + 288, 'Confirma?', { tam: 22, peso: 700, cor: VERM2 })}
       <rect x="${X + LW - 160}" y="${Y + 345}" width="130" height="56" rx="18" fill="${CINZA}"/>${texto(X + LW - 95, Y + 381, 'Sim', { tam: 22, peso: 700, ancora: 'middle' })}
       ${texto(X + 50, Y + 440, '✅ Pronto! Agora aparece R$ 27,90.', { tam: 21, cor: '#1B7F3A', peso: 700 })}`),
  },
];

for (const p of passos) fs.writeFileSync(path.join(DIR, p.arq), cartao(p.n, p.titulo, p.linhas, p.ilus, p.rodape));

// Capa
const capa = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${VERM}"/><stop offset="1" stop-color="${VERM2}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" rx="28" fill="url(#f)"/>
  ${texto(W / 2, 170, '🛵', { tam: 96, ancora: 'middle' })}
  ${texto(W / 2, 290, 'Como instalar o', { tam: 54, cor: '#fff', peso: 700, ancora: 'middle' })}
  ${texto(W / 2, 370, 'Meu Funcionário', { tam: 80, cor: AMAR, peso: 900, ancora: 'middle' })}
  ${texto(W / 2, 440, '7 passos · uns 15 minutos · sem saber programar', { tam: 30, cor: '#fff', ancora: 'middle' })}
  <rect x="${W / 2 - 260}" y="490" width="520" height="70" rx="35" fill="#fff"/>
  ${texto(W / 2, 536, 'Grátis para o Mais Delivery', { tam: 30, cor: VERM2, peso: 800, ancora: 'middle' })}
  ${texto(W / 2, 625, 'por Diego Simões · @eudiegosimoes · @adm.delivery', { tam: 22, cor: '#FFD9DF', ancora: 'middle' })}
</svg>`;
fs.writeFileSync(path.join(DIR, 'capa.svg'), capa);
console.log('gerados:', ['capa.svg', ...passos.map((p) => p.arq)].join(', '));
