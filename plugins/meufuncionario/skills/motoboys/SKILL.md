---
name: motoboys
description: Cadastra e ativa motoboys/entregadores no Mais Delivery. Use para "cadastra esse motoboy", "ativa o entregador", "libera o motoboy no app".
---

# Motoboys

> **Mapeado em parte** (tour gerencial de 24/11/2026, ver `docs/MAPA-DO-PAINEL.md`).

## O que já se sabe
- Cadastro fica no **gerencial**: Cadastros → Entregadores (`entregador.php`).
  Colunas: Nome, E-mail, Telefone, Status, Entrega, Entregas agora, Cadastro.
  Botões Adicionar Entregador, Ver no Mapa, Editar, Remover. Form oculto
  `POST entregador.php` com `action`, `idEntregador`, `flgEntregador`.
- "Entregadores em Análise" é a mesma tela com filtro (é onde caem os que se
  cadastram pelo app e esperam liberação). Abrir pelo link do menu, não pela URL nua.
- Regras gerais de entregador ficam em Marketplace → Configuração (`marketplace.php`):
  `qtPedEntregador`, metas de coleta/entrega, `qtMinBloqueio`, ver telefone do cliente.
- Contrato do entregador: `contratos_texto.php` (modelo) e `contratos.php?id=…`.

## O que ainda falta descobrir
- Campos do formulário de Adicionar/Editar e o valor de `flgEntregador` que libera.
- Campos obrigatórios e documentos.
- Como ativar/bloquear e vincular a lojas ou à cidade.
- Como funciona o repasse/pagamento ao motoboy.
