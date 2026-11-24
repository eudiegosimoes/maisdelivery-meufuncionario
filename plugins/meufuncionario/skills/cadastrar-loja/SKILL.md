---
name: cadastrar-loja
description: Cadastra uma loja nova no painel do Mais Delivery (e no 1menu, se houver) a partir dos dados que o franqueado mandar (nome, endereço, WhatsApp, horário, logo, panfleto). Use quando o franqueado disser "chegou uma empresa nova", "cadastra essa loja" ou mandar dados de um estabelecimento.
---

# Cadastrar loja no Mais Delivery

> Rascunho inicial: completar com o que o tour do painel (docs/MAPA-DO-PAINEL.md) mostrar.

## Antes de começar
- O franqueado precisa estar logado no painel do MD como **gerencial da cidade**, no Chrome.
- Carregar `ferramentas/painel-md/md-tools.js` na aba do painel (ver PLAYBOOK, etapa 3).
- Nunca imprimir links `login.php?index=` e nunca digitar senha.

## Passos
1. Conferir se a loja já existe (`MD.listar`) — inclusive lojas que o lojista criou sozinho ("Em análise").
2. Montar os dados: nome, descrição, e-mail, telefone (DDD separado), segmento, bairro, rua, número, coordenada (`lat,lng`), tempo de entrega, modo de entrega (1 entrega, 2 balcão, 3 ambos).
3. Horário: o MD exige horário em todos os dias. Dia fechado: usar `00:01–00:02` e depois limpar pelo gerencial (`estabelecimento.php` action=edt → upd sem `dsImagem`). Fechar às 00:00 ou 00:01 é recusado.
4. Logo: converter para PNG 800×800 antes de enviar.
5. `MD.criarLoja(L, logo)` — já liga o integrador (op 83 + op 85, empresa 38).
6. Taxas: copiar de uma loja vizinha parecida (ver skill `taxas-bairros`).
7. Pagamento sem Pix conhecido: dinheiro + maquininha (`MD.configurar`).
8. Status **Fechado** até o lojista começar: op 18, `flgAtivo=2`.
9. Cardápio: skill `cardapio`.

## Conferir no fim
Coordenada, horário (domingo limpo), taxas iguais às da vizinha, integrador OK/OK, status Fechado, logo.
