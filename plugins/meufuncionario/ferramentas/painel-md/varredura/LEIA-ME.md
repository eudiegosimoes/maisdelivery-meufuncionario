# Varredura do painel (só leitura)

Refaz `docs/ROTAS-DO-PAINEL.md` e `../rotas.json` quando o painel mudar.

1. `node coletor.mjs <pasta-temporaria>` — servidor local em 127.0.0.1:47801 que grava JSONL e serve o `varredor.js`.
2. Na aba do painel (Claude in Chrome), já logado:
   `(0,eval)(await (await fetch('http://127.0.0.1:47801/varredor.js')).text())`
   `await __prepararBase(['motivo_cancelamento_pedido.php','feriados.php'])` (no lojista: `['mesas.php','funcionario.php']`)
   `__varrer('gerencial', {inicio: [...links do menu], max: 250, pausa: 1500})`
3. Trocar de loja pelo link do `pedidosk.php` (6 s entre trocas), repetir com `__varrer('loja-<nome>', …)`.
4. `node gerar.mjs <pasta-temporaria> <raiz-do-repo>`.

Regras: só GET (e POST de `action=edt`/filtro, que só leem); filtro `BLOQ` pula login, exclusão,
cobrança, 2FA e qualquer coisa que salve. O gerador mascara e-mail, telefone, CPF/CNPJ, números
longos, links de convite e links de login.
