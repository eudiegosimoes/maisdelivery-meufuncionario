# Mapa do painel do Mais Delivery

Tour tela por tela. **Só leitura**: no tour não se salva nada em loja real;
para testar uma ação, usar a loja de testes.

Base: `https://painel.maisdeliveryempresas.com.br/painel/`

## Como registrar cada tela

```
### <nome da tela> — <arquivo>.php
- Acesso: gerencial / lojista / os dois
- Para que serve:
- Campos e botões:
- O que salva (form, action, ajax_operacao nrOperacao=...):
- Armadilhas:
- Usado pelas skills:
```

## Perfis a percorrer
- [x] Gerencial da cidade (menu completo) — ver "Tour 1"
- [ ] Painel do lojista (dentro de uma loja)
- [ ] Motoboys / entregadores
- [ ] App do cliente (só o que impacta o painel)

## Operações já conhecidas (`ajax_operacao.php`)
| nrOperacao | O que faz |
|---|---|
| 9 | Apaga linha de taxa de bairro (`idEntrega`) |
| 18 | Status da loja (`flgAtivo`: 1 Ativo, 2 Fechado, 0 Inativo) |
| 21 | Cardápio do app (lê `nrOrdem` das categorias, níveis) |
| 83 | Liga a integração (`idMarketplace`, `flgApi`) |
| 85 | Empresa integrada (`arrEmpresaIntegrada[]`=38, CHEFÃO PDV) |

## Telas já conhecidas
- `lista_estabelecimentos.php`: lista de lojas da cidade.
- `estabelecimento.php`: dados da loja (action=new/edt/upd).
- `configuracao.php`: pagamentos, entrega, taxas por bairro.
- `produtos.php`, `produto_detalhe.php`: cardápio.
- `categoria_item.php`, `categoria_ordem.php`: categorias.
- `segmentos.php`, `bairro.php`: cadastros da cidade (gerencial).
- `estabelecimentos_desarquivar.php`: lojas arquivadas.
- `pedidosk.php`: pedidos + links de acesso às lojas.

## Tour 1 — Gerencial da cidade (24/11/2026, Aripuanã)

Feito só com GET (fetch + leitura do HTML), 6 s entre telas, nada salvo.
Padrão geral das telas de cadastro: tabela + botões **Adicionar / Editar /
Remover**, e um form oculto `POST <mesma tela>.php` com `h:action` + `h:id<Coisa>`
(Editar/Remover preenchem esse form via JS). `nrOperacao` 18, 57, 81, 121, 168 e
169 aparecem em todas as telas (são do cabeçalho/notificações, não da tela).

Menu do topo: Dashboard · Pedidos · Cadastros · Cobranças · Marketplace ·
Fidelidade · Licença · Suporte. A tela inicial é `pedidosk.php` (kanban).

### Cadastros
| Tela | Arquivo | O que tem | Skill |
|---|---|---|---|
| Banners | `banners.php` | Ativo, Ordem, Nome, Imagem (`idBanner`) | divulgacao |
| Segmentos | `segmentos.php` | Ativo, Ordem, Nome, Tem lojas, Imagem (`idCategoria`, `nrOrdem`) | cadastrar-loja |
| Estabelecimentos | `lista_estabelecimentos.php` | ID, Bairro, Nome, Segmento, Entregadores, Situação, CPF obrigatório, Horário hoje, Gateway, Aceita cupons. Menu **+ AÇÕES**: Editar, Funcionários, Renovar Mercado Pago, Copiar (neste/outro marketplace), Chave PIX (telefone/CNPJ-CPF/e-mail/aleatória). Editar = `POST estabelecimento.php` (`idRestaurante`, `action`) | cadastrar-loja, auditoria |
| Bairros | `bairro.php` | ID, Bairro, Participa do frete grátis?, Status (`idBairro`, `dsBairro`, `flgStatus`, `flgFreteGratis`) | taxas-bairros |
| Valores de Entrega | `valores_entregas_gerencial.php` | Um form só, `vlEntrega[][<idBairro>]` por bairro + **Salvar** (salva tudo de uma vez) | taxas-bairros |
| Categoria de Produtos | `categoria_item.php` | ID, Categoria, Ativo (`idCategoria`) — global, ~690 itens | cardapio |
| Subcategorias | `sub_categoria_item.php` | Status, Categoria, Subcategoria (`idSubCategoria`, `dsSubCategoria`) | cardapio |
| Formas de pagamento | `forma_pagamento.php` | Forma, Status, Retém valor, Chave Pix (`idPagamento`) | auditoria |
| Entregadores | `entregador.php` | Nome, E-mail, Telefone, Status, Entrega, Entregas agora, Cadastro. Botões Adicionar, **Ver no Mapa** (`idEntregador`, `flgEntregador`) | motoboys |
| Entregadores em Análise | `entregadores_em_analise.php` | Sem parâmetro redireciona para `entregador.php` (o link do menu leva filtro) | motoboys |
| Contratos Entregador / Restaurante | `contratos.php?id=…` | Sem `id` redireciona para `pedidosk.php` | — |
| Cupom p/ todas as lojas | `cupom.php` | Cupom, Gerado por, Utilizado/Limite, Mesmo cliente, Desconto, Limitado, Programado, Validade, Exclusivo, 1º pedido, Ativo (`idCupom`) | divulgacao |
| Motivos de cancelamento | `motivo_cancelamento_pedido.php` | `idMotivo`, `dsMotivo`, `flgAtivo` | — |
| Usuários | `usuario.php` | Filtro (`flgLancado`, `flgPedidos`, `flgAtivoFiltro`) + Consultar; colunas Nome, E-mail, CPF, Telefone, últimos pedido/acesso, Quem indicou | — |

### Cobranças (💰 só leitura — nunca gerar/enviar sem perguntar)
| Tela | Arquivo | O que tem |
|---|---|---|
| Configurar Comissões | `valor_comissao.php` | Por loja: comissão APP, PWA, Comanda, Lançados, Não atendidos |
| Gerar Cobranças | `cobrancas_todos.php` | **Não aberta** (risco de gerar cobrança) |
| Cobranças Avulsas | `cobrancas_avulsa.php` | Lojas, período dos pedidos, vencimento, valor, receber por, descrição, link de pagamento + Consultar |
| Listar / em aberto / pagas / vencidas | `cobrancas.php` (`_avencer`, `_pagas`, `_vencidas` redirecionam para ela) | Período, Loja, Vencimento, Valor, Com multa, Receber por, Pago?; botão **Gerar cobranças**; modal de envio por funcionário |

### Marketplace
| Tela | Arquivo | O que tem | Skill |
|---|---|---|---|
| Configuração | `marketplace.php` | 59 campos: dados da franquia, frete grátis geral (`flgFreteGratis`, `vlMinFreteGratis`), `tpEstPodeAltTxEntrega` (loja pode mudar taxa), `vlEntregaExtra`, Bandeira 2 (`vlBandeira2` + horários), entregadores (`qtPedEntregador`, metas de coleta/entrega, `qtMinBloqueio`, ver telefone), PIX offline aguarda comprovante, valor mínimo lançado, kanban, chave PIX e multa/juros das cobranças, taxas do gateway (`taxasGateway[1|2][…]`), `nrMinExpiraPedidos` | taxas-bairros, motoboys |
| Conta Mercado Pago / Asaas | `conta_mercado_pago.php`, `conta_asaas.php` | Redirecionam para `confirmacao_2fa.php` (código do autenticador). **Não entrar.** | — |
| Relatórios | `relatorio.php` | `idRelatorio` + filtros (loja, entregador, bairro, pagamento, origem, datas). Lista abaixo | auditoria |
| Avisos Estabelecimentos | `avisos_estabelecimentos.php` | Título, Data (`idAviso`) — aviso para os lojistas | — |
| Divulgação – Notificação | `lista_notificacoes.php` | Data, Título, Mensagem, Enviada (`idNotificacao`) + Nova Notificação (⚠️ envia push) | divulgacao |
| Divulgação – SMS / E-mail | `sms_divulgacao.php`, `email_divulgacao.php` | não abertas ainda | divulgacao |
| Ver Comentários | `avaliacao_remover.php` | não aberta ainda | auditoria |
| Recebidos / Em análise | `estabelecimentos_recebidos.php` | Lojas que se cadastraram sozinhas: Nome, Telefone, Situação, Observação → `POST estabelecimento.php` | cadastrar-loja |
| Estabelecimentos Nacionais | `estabelecimentos_nacionais.php` | Nome, Segmento, botão **OBTER** (traz loja nacional para a cidade) | cadastrar-loja |
| Desarquivar | `estabelecimentos_desarquivar.php` | lojas arquivadas | cadastrar-loja |
| Subgerência | `marketplace_acesso.php` | Logins de acesso (`idLoginAcesso`) | — |
| API – Integração | `marketplace_api.php` | Por loja: ATIVAR/DESATIVAR API, empresa integrada (ops 83/85) | cardapio |
| Notas Fiscais Suporte | `minhas_notas.php` | não aberta | — |
| Feriados | `feriados.php` | Feriado, Data, Tipo de bloqueio, Status | auditoria |

Relatórios (`idRelatorio`): 1 Usuários · 2 Usuários sem pedidos · 3 Pedidos
concluídos detalhado · 4 Avaliações das lojas · 5 Avaliações usuários · 6
Concluídos consolidado · 8 Produtos mais vendidos · 9 Entregas por entregador
analítico · 10 Cupons detalhado · 11 Usuários mais fiéis · 12 Tempo de entregas ·
13 Tempo médio por entregador · 14 Cancelados · 16 Entregadores última vez online
· 17 Funcionários das lojas · 18 Cobranças em aberto · 19 Lojas há dias fechadas ·
23/24 Concluídos sintético/analítico · 25 Produtos sem estoque · 26 Pedidos por
status · 29 Cancelamentos por tipo · 30 Adicionais mais vendidos · 32 Lojas que
mais cancelam · 34 Sabores mais vendidos · 35 Planilhas Power BI · 36 Repasse às
lojas · 37 Pagamentos cartão online · 38 Rejeitados por segurança · 40 Avaliação
de entregadores · 41 Vencimento vínculos Mercado Pago · 43 Entregas por entregador
sintético · 45 Promoções mais vendidas · 47 Metas de entregadores · 49 Lojas com
integração · 52 Cupons sintético · 53 Acessos e conversão · 55 Histórico situação
pedidos · 57 Acessaram e não pediram · 59 Opções de nível sem estoque.

### Fidelidade
| Tela | Arquivo | O que tem |
|---|---|---|
| CashBack e Indique e Ganhe | `configuracao_cb_ig.php` | Cashback (`flgAtivoCB`, `vlRetornoCB`, expiração, resgate mín/máx, pagamentos/origens) + Indique (`flgAtivoIG`, `vlIndica`, `vlIndicado`) + extrato |
| Gamificação | `premiacao.php` | Premiações (tipo, datas, qtd prêmios, valor mínimo) + ganhadores |
| Grupo WhatsApp | `whatsapp_grupo.php` | `dsGrupoWhatsapp` + Salvar |
| Carrinhos Abandonados | `carrinhos_abandonados.php` | Filtro por data; Nome, WhatsApp, Usuário novo, Loja (bom para remarketing) |

### Licença
`contratos_texto.php` / `contratos_texto_restaurante.php`: editor de modelo de
contrato (cláusulas, variáveis, quem assina). O resto do menu são links externos
(Drive, WhatsApp, Slack, treinamentos, YouTube, status do Mercado Pago).

## Telas a mapear
- Dashboard, `pedidos.php` (lista), Lançar Pedido, Ver no Mapa
- `estabelecimento.php` por dentro (form completo de loja) e `configuracao.php`
- `sms_divulgacao.php`, `email_divulgacao.php`, `avaliacao_remover.php`, `minhas_notas.php`
- Perfis: lojista, entregador, app do cliente
