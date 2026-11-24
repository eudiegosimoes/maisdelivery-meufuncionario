---
name: taxas-bairros
description: Configura taxas de entrega por bairro no Mais Delivery — copiar de uma loja vizinha, aplicar taxa mínima na cidade, criar bairro novo e incluir em todas as lojas. Use para "coloca as mesmas taxas da loja X", "taxa mínima de 7", "bairro novo".
---

# Taxas e bairros

> Rascunho inicial: completar com o tour do painel.

## Regra de ouro
Ao postar `configuracao.php`, **sempre** regravar todas as `vlEntrega[][<linha>]` com `MD.virg` (vírgula). O form traz "6.00" e o MD lê 600 (ou 999,99).

## Copiar taxas de uma vizinha
1. Ler `configuracao.php` da vizinha: cada `select[name^="nrBairros"]` + `vlEntrega[][<linha>]`.
2. Loja nova: `MD.configurar(id, ini, bairros, pagamentos, entrega)`.
3. Loja que já tem bairros: editar a própria chave `vlEntrega[][<linha>]` (mandar `nrBairros[]` novos SOMA linhas).
4. Conferir lendo de novo: nenhuma diferença.

## Bairro novo na cidade
Gerencial `bairro.php` (action=ins) e depois acrescentar `nrBairros[]`/`vlEntrega[]` em cada loja. Pular o link "Gerencial" do `MD.links()`.

## Telas do gerencial (tour 24/11/2026)
- `bairro.php`: lista com "Participa do frete grátis?" e Status (`flgFreteGratis`, `flgStatus`).
- `valores_entregas_gerencial.php`: **todas** as taxas da cidade num form só
  (`nrBairros[][<id>]`, `vlEntrega[][<id>]`) com um único Salvar — mesmo cuidado da vírgula.
- `marketplace.php`: frete grátis geral (`flgFreteGratis`, `vlMinFreteGratis`),
  `tpEstPodeAltTxEntrega` (se a loja pode mudar a própria taxa) e `vlEntregaExtra`
  (acréscimo em todas as entregas). Conferir esses antes de mexer loja por loja.

## Taxa mínima
Pedir o valor ao franqueado, guardar cópia antes, atualizar só o que estiver abaixo e conferir loja por loja (uma loja por vez, ~6 s entre lojas).
