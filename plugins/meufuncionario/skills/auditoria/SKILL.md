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

## Caminhos (varredura 24/11/2026)
- Lista de lojas (`lista_estabelecimentos.php`): situação, horário hoje, gateway, CPF obrigatório, aceita cupons.
  Status da loja op 18; CPF op 114. ⚠️ ops 142/143 ativam/desativam **todas** as lojas — nunca usar sem ordem expressa.
- Relatórios úteis (`relatorio.php`, `idRelatorio`): 19 lojas há dias fechadas, 25 produtos sem estoque,
  59 opções de nível sem estoque, 32 lojas que mais cancelam, 49 lojas com integração,
  41 vencimento dos vínculos Mercado Pago, 16 entregadores última vez online.
- Feriados: `feriados.php` (op 139 sugere os feriados do ano).
- Comentários dos clientes: `avaliacao_remover.php` (gerencial), `avaliacao.php` (lojista).
- Tudo em `docs/ROTAS-DO-PAINEL.md`.

## Relatórios — como gerar (testado 24/11/2026)
POST `relatorio.php` só com `hdnRelatorioSel`, `idRelatorio`, `dtInicio`, `dtFim`, `hrInicio`, `hrFim`.
Período máximo de 1 ano (acima disso volta vazio sem aviso). 23, 24 e 40 só saem como arquivo
(`idFormatoSaida` 0 PDF / 1 CSV / 2 Excel). Colunas de cada relatório: `docs/MAPA-DO-PAINEL.md`.
Dashboard da loja: `dashboard_ajax.php` ops 1–8 (semanal, mensal, top produtos, top clientes, comparativos).
