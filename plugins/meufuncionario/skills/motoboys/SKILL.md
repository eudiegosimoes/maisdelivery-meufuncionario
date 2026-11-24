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

- Liberar/bloquear: op **76** (`idEntregador`, `flgAtivoEntregador`) — `assets/js/entregador.js`.
- Cadastro valida CEP (op 88), bairro (op 89) e telefone por código (op 161).
- Documentos do motoboy ficam no Google Drive da franquia: ops 106/107 (autenticar),
  108 lista arquivos (`idEntregador`), 109 upload, 111 remove.
- Mapa ao vivo: `entregadores_mapa.php` (ops 1–4: usuários, entregadores, lojas, prontos p/ entrega).
- Pedido → entregador: op 11 no kanban (`pedidosk.js`).
- Campos completos do form: `docs/ROTAS-DO-PAINEL.md`, seção `entregador.php`.

## O que ainda falta descobrir
- Campos do formulário de Adicionar/Editar e o valor de `flgEntregador` que libera.
- Campos obrigatórios e documentos.
- Como ativar/bloquear e vincular a lojas ou à cidade.
- Como funciona o repasse/pagamento ao motoboy.
