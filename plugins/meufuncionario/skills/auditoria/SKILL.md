---
name: auditoria
description: Audita as lojas de uma cidade no Mais Delivery — status, horários, taxas, pagamentos, integrador, logos quebrados, cardápio sem foto. Use para "confere a cidade", "o que está errado nas lojas", "auditoria".
---

# Auditoria da cidade

> Rascunho inicial: completar com o tour do painel.

## O que conferir por loja
- Status (Ativo / Fechado / Inativo / Em análise / arquivada).
- Horário de todos os dias.
- Taxas: nenhuma abaixo da mínima da cidade, nenhuma 600/999,99.
- Pagamentos e chave Pix.
- Integrador ligado (op 83/85).
- Logo carregando (não 404).
- Produtos ativos sem foto ou com preço zero.

## Como
- Uma loja por vez, ~6 s entre lojas (Cloudflare).
- Ler pelo gerencial com `idRestaurante` sempre que der (não precisa entrar na loja).
- Entregar relatório ao franqueado e **perguntar antes de corrigir**.
