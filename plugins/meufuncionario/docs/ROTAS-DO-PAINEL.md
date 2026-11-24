# Rotas do painel do Mais Delivery (referência completa)

Gerado automaticamente pela varredura só-leitura (GET) de 2026-11-24.
Contextos varridos: gerencial, loja-frutos, loja-pizzaria. Números de 3+ dígitos viram `#`. Nenhum dado de cliente/linha de tabela é guardado.
Use junto com `MAPA-DO-PAINEL.md` (visão por menu) e `ferramentas/painel-md/rotas.json` (mesmo conteúdo em JSON).

## Índice
- **gerencial** (57): [atendimento_suporte.php](#g-atendimento_suportephp) · [atendimento_suporte_novo.php](#g-atendimento_suporte_novophp) · [avaliacao_remover.php](#g-avaliacao_removerphp) · [avisos_estabelecimentos.php](#g-avisos_estabelecimentosphp) · [bairro.php](#g-bairrophp) · [banners.php](#g-bannersphp) · [carrinhos_abandonados.php](#g-carrinhos_abandonadosphp) · [categoria_item.php](#g-categoria_itemphp) · [cobrancas.php](#g-cobrancasphp) · [cobrancas_avencer.php](#g-cobrancas_avencerphp) · [cobrancas_avulsa.php](#g-cobrancas_avulsaphp) · [cobrancas_pagas.php](#g-cobrancas_pagasphp) · [cobrancas_vencidas.php](#g-cobrancas_vencidasphp) · [configuracao_cb_ig.php](#g-configuracao_cb_igphp) · [contratos.php](#g-contratosphp) · [contratos_texto.php](#g-contratos_textophp) · [contratos_texto_restaurante.php](#g-contratos_texto_restaurantephp) · [copiar_para_marketplace.php](#g-copiar_para_marketplacephp) · [cupom.php](#g-cupomphp) · [dashboard.php](#g-dashboardphp) · [detalhes_pedido.php](#g-detalhes_pedidophp) · [email_divulgacao.php](#g-email_divulgacaophp) · [entregador.php](#g-entregadorphp) · [entregadores_em_analise.php](#g-entregadores_em_analisephp) · [entregadores_mapa.php](#g-entregadores_mapaphp) · [estabelecimento.php](#g-estabelecimentophp) · [estabelecimentos_desarquivar.php](#g-estabelecimentos_desarquivarphp) · [estabelecimentos_nacionais.php](#g-estabelecimentos_nacionaisphp) · [estabelecimentos_recebidos.php](#g-estabelecimentos_recebidosphp) · [feriados.php](#g-feriadosphp) · [forma_pagamento.php](#g-forma_pagamentophp) · [funcionario.php](#g-funcionariophp) · [index.php](#g-indexphp) · [lista_estabelecimentos.php](#g-lista_estabelecimentosphp) · [lista_notificacoes.php](#g-lista_notificacoesphp) · [mapa_cidades.php](#g-mapa_cidadesphp) · [marketplace.php](#g-marketplacephp) · [marketplace_acesso.php](#g-marketplace_acessophp) · [marketplace_api.php](#g-marketplace_apiphp) · [marketplace_permissoes.php](#g-marketplace_permissoesphp) · [minhas_notas.php](#g-minhas_notasphp) · [motivo_cancelamento_pedido.php](#g-motivo_cancelamento_pedidophp) · [nota_pdf.php](#g-nota_pdfphp) · [notificacao.php](#g-notificacaophp) · [pedidos.php](#g-pedidosphp) · [pedidosk.php](#g-pedidoskphp) · [premiacao.php](#g-premiacaophp) · [relatorio.php](#g-relatoriophp) · [restaurante_ordem.php](#g-restaurante_ordemphp) · [segmentos.php](#g-segmentosphp) · [sms_divulgacao.php](#g-sms_divulgacaophp) · [sub_categoria_item.php](#g-sub_categoria_itemphp) · [tele_entrega.php](#g-tele_entregaphp) · [usuario.php](#g-usuariophp) · [valor_comissao.php](#g-valor_comissaophp) · [valores_entregas_gerencial.php](#g-valores_entregas_gerencialphp) · [whatsapp_grupo.php](#g-whatsapp_grupophp)
- **lojista** (30): [adicional.php](#l-adicionalphp) · [avaliacao.php](#l-avaliacaophp) · [aviso_cobranca.php](#l-aviso_cobrancaphp) · [categoria_item.php](#l-categoria_itemphp) · [categoria_ordem.php](#l-categoria_ordemphp) · [compartilhar_loja.php](#l-compartilhar_lojaphp) · [configuracao.php](#l-configuracaophp) · [cupom.php](#l-cupomphp) · [dashboard.php](#l-dashboardphp) · [detalhes_pedido.php](#l-detalhes_pedidophp) · [entregador.php](#l-entregadorphp) · [estabelecimento.php](#l-estabelecimentophp) · [funcionario.php](#l-funcionariophp) · [funcionario_permissoes.php](#l-funcionario_permissoesphp) · [index.php](#l-indexphp) · [integracoes.php](#l-integracoesphp) · [listar_cobrancas_estabelecimento.php](#l-listar_cobrancas_estabelecimentophp) · [mesas.php](#l-mesasphp) · [nivel_cardapio.php](#l-nivel_cardapiophp) · [opcoes_nivel_cardapio.php](#l-opcoes_nivel_cardapiophp) · [pedidos.php](#l-pedidosphp) · [pedidosk.php](#l-pedidoskphp) · [produto_detalhe.php](#l-produto_detalhephp) · [produtos.php](#l-produtosphp) · [promocao_detalhe.php](#l-promocao_detalhephp) · [promocoes.php](#l-promocoesphp) · [relatorio.php](#l-relatoriophp) · [sabor.php](#l-saborphp) · [sub_categoria_item.php](#l-sub_categoria_itemphp) · [tele_entrega.php](#l-tele_entregaphp)
- [Operações `ajax_operacao.php`](#operacoes)

## Perfil gerencial

<a id="g-atendimento_suportephp"></a>
### atendimento_suporte.php
- título: Mais Delivery \| Atendimento e Suporte
- seções: Atendimento e Suporte Abrir novo Chamado / Atendimento e Suporte
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** `#chamados` # · Situação · Etiqueta · Responsável · Descrição · Comentário · Data criação · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Abrir novo Chamado .addRegistro →atendimento_suporte_novo.php · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/atendimento_suporte.js`** ops: 1 buscaAtendimentos(nrLimit,cursor,direcao,next) · 2 enviaChamadoSuporte(dsCategoria,dsNomeAbertura,nrDDD,nrTelefone,dsEstabelecimento,idPedido,dsDescricao,dsArquivos) · 5 enviarArquivos(idMarketplace,dsNomeArquivo,dsTipoMime)
  - chama: atendimento_suporte_detalhes.php?id ← on · ajax_atendimento_suporte.php ← buscaAtendimentos · ajax_atendimento_suporte.php ← enviaChamadoSuporte · ajax_atendimento_suporte.php ← enviarArquivos
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-atendimento_suporte_novophp"></a>
### atendimento_suporte_novo.php
- título: Mais Delivery \| Novo Chamado de Atendimento
- **Form** `POST (mesma página)` #frmCadastro — botões: Selecionar Arquivos, Voltar, Enviar
  - `dsCategoria` select {=Selecione uma categoria; Dúvida=Dúvida; Sugestão=Sugestão; Problema=Problema}<br>`dsSeuNome`<br>`nrDDD`<br>`nrTelefone`<br>`dsEstabelecimento` select {102 opções}<br>`idPedido`<br>`dsDescricao` textarea<br>`#dsArquivos` file
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Selecionar Arquivos · Voltar →atendimento_suporte.php · Enviar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/atendimento_suporte.js`** ops: 1 buscaAtendimentos(nrLimit,cursor,direcao,next) · 2 enviaChamadoSuporte(dsCategoria,dsNomeAbertura,nrDDD,nrTelefone,dsEstabelecimento,idPedido,dsDescricao,dsArquivos) · 5 enviarArquivos(idMarketplace,dsNomeArquivo,dsTipoMime)
  - chama: atendimento_suporte_detalhes.php?id ← on · ajax_atendimento_suporte.php ← buscaAtendimentos · ajax_atendimento_suporte.php ← enviaChamadoSuporte · ajax_atendimento_suporte.php ← enviarArquivos
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-avaliacao_removerphp"></a>
### avaliacao_remover.php
- título: Mais Delivery \| Avaliação
- seções: Avaliação
- **Form** `POST avaliacao_remover.php` #form_actions
  - `action` hidden<br>`idAvaliacao` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Data · Estabelecimento · Usuário · Pedido · Entregador · Comentário · Ação (353 linhas)<br>  controles por linha: button:submit .edtRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Remover Comentario .edtRegistro
- **Valores de `action`**: edt
- **Mensagens**: Limpar Comentário
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-avisos_estabelecimentosphp"></a>
### avisos_estabelecimentos.php
- título: Mais Delivery \| Avisos Estabelecimentos
- seções: Avisos Adicionar Aviso / Avisos
- **Form** `POST avisos_estabelecimentos.php` #form_actions
  - `action` hidden<br>`idAviso` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Título · Data da criação · Ação (8 linhas)<br>  controles por linha: button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Aviso .addRegistro · Detalhes .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-bairrophp"></a>
### bairro.php
- título: Mais Delivery \| Bairros
- seções: Bairros Adicionar Bairro / Bairros
- **Form** `POST bairro.php` #form_actions
  - `action` hidden<br>`idCidade` hidden<br>`idBairro` hidden<br>`dsBairro` hidden<br>`flgStatus` hidden<br>`flgFreteGratis` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Cidade · Bairro · Participa do frete gratis? · Status · Ação (45 linhas)<br>  controles por linha: select:select-one n=selParticipaFreteGratis .flgFreteGratis ; select:select-one n=selecionarTabelaSituacao .statusBairro ; button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Bairro .addRegistro · Editar .edtRegistro · Remover .delRegistro
- **JS `assets/js/bairro.js`** ops: 89 verificaBairroExiste(dsBairro,idCidade) · 64 $(dsAbertura,dsNomeTela)
  - `action`: new, edt, sta, fre, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-bannersphp"></a>
### banners.php
- título: Mais Delivery \| Banners do Marketplace
- seções: Banners do Marketplace Adicionar Banner / Banners do Marketplace
- **Form** `POST banners.php` #form_actions
  - `action` hidden<br>`idBanner` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Ativo · Ordem · Nome · Imagem · Ação (40 linhas)<br>  controles por linha: button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Banner .addRegistro · Editar .edtRegistro · Remover .delRegistro
- **JS `assets/js/banner.js`** ops: 32 trazProdutos(idRestaurante) · 167 salvaRegistro() · 64 $(dsAbertura,dsNomeTela)
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-carrinhos_abandonadosphp"></a>
### carrinhos_abandonados.php
- título: Mais Delivery \| Carrinhos Abandonados
- seções: Carrinhos Abandonados Data Início: Data Fim: Filtrar / Carrinhos Abandonados
- **Form** `POST (mesma página)` #filtroDatas — botões: Filtrar
  - `dataInicio` — Data Início:<br>`dataFim` — Data Fim:
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Nome · WhatsApp · Usuário Novo · Data Criação · Estabelecimento (27 linhas)<br>  controles por linha: a href=#
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Filtrar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-categoria_itemphp"></a>
### categoria_item.php
- título: Mais Delivery \| Categorias
- seções: Categoria Adicionar Categoria / Categoria
- **Form** `POST categoria_item.php` #form_actions
  - `action` hidden<br>`idCategoria` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Categoria · Ativo? · Ação (3753 linhas)<br>  controles por linha: input:checkbox n=flgAtivo .flgAtivo ; button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Categoria .addRegistro · Editar .edtRegistro · Remover .delRegistro
- **JS `assets/js/categoria_item.js`** ops: 174 alteraStatus(idCategoria,flgAtivo)
  - chama: cardapio_sugeridos.php?id&tp ← $
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-cobrancasphp"></a>
### cobrancas.php
- título: Mais Delivery \| Cobranças
- seções: Cobranças em aberto dos estabelecimentos Gerar cobranças / Cobranças em aberto dos estabelecimentos / Nome do Estabelecimento
- **Form** `POST cobrancas.php` #[object Object]
  - `action` hidden<br>`id` hidden<br>`idCobranca` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** Nome do Estabelecimento `#exampleModalCenter` (form → `mesma`) — botões: ×, Fechar, Enviar
  - `selfuncionarios` select — Funcionário:<br>`#message-text` textarea — Mensagem:
- **Tabela** `#tbCobrancas` # ID · Período · Estabelecimento · Vencimento · Valor cobrança · Total com multa e juros · Receber por · Pago? · Data de pagamento · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Gerar cobranças →cobrancas_todos.php · Consultar .form-control.btn-consultar-painel · × .close · Enviar [$('#exampleModalCenter').modal('hide')] · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/cobrancas.js`** ops: 46 $(idCobranca) · 156 on(idCobranca,dsImagem) · 155 on() · 214 onchange_receber_por(idCobranca,flgReceberOnline) · 47 onchange_funcionario(idRestaurante,idFuncionarioCobranca) · 17 mudaStatusCobranca(idCobranca,idRestaurante,flgPago,flgAtivar)
  - chama: datapaymentstatuscobrancaasaas.php?id ← showPaymentStatus · ajax_busca_cobrancas.php ← body
  - `action`: edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-cobrancas_avencerphp"></a>
### cobrancas_avencer.php → redireciona p/ `cobrancas.php`
- título: Mais Delivery \| Cobranças
- seções: Cobranças em aberto dos estabelecimentos Gerar cobranças / Cobranças em aberto dos estabelecimentos / Nome do Estabelecimento

<a id="g-cobrancas_avulsaphp"></a>
### cobrancas_avulsa.php
- título: Mais Delivery \| Cadastrar cobranças avulsas
- seções: Cadastrar cobranças avulsas
- **Form** `POST (mesma página)` #frmDadosCobranca — botões: Consultar
  - `action` hidden<br>`arrEstabelecimentoSel` hidden<br>`idRestaurantes` multi — Estabelecimento {103 opções}<br>`dtInicial` — Data Inicial (pedidos)<br>`dtFinal` — Data Final (pedidos)<br>`dtVencimentoPadrao` — Data Vencimento<br>`vlCobrancaPadrao` — Valor cobrança<br>`flgReceberOnlinePadrao` select — Receber por: {0=Não receber online; 1=Mercado Pago; 2=Asaas}<br>`dsDescricaoPadrao` textarea — Descrição<br>`dsObservacaoPadrao` textarea — Observação<br>`dsLinkPgtoPadrao` — Link para Pagamento (opcional)
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Consultar .form-control.btn-consultar-painel
  - chama: ajax_envia_cobrancas_avulsas.php ← enviarCobrancas · cobrancas.php?id ← success
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-cobrancas_pagasphp"></a>
### cobrancas_pagas.php → redireciona p/ `cobrancas.php`
- título: Mais Delivery \| Cobranças
- seções: Cobranças pagas dos estabelecimentos Gerar cobranças / Cobranças pagas dos estabelecimentos / Nome do Estabelecimento

<a id="g-cobrancas_vencidasphp"></a>
### cobrancas_vencidas.php → redireciona p/ `cobrancas.php`
- título: Mais Delivery \| Cobranças
- seções: Cobranças vencidas dos estabelecimentos Gerar cobranças / Cobranças vencidas dos estabelecimentos / Nome do Estabelecimento

<a id="g-configuracao_cb_igphp"></a>
### configuracao_cb_ig.php
- título: Mais Delivery \| CashBack e Indique e Ganhe
- **Form** `POST configuracao_cb_ig.php` #frmCadastro — botões: Salvar, Salvar, Salvar, Consultar
  - `action` hidden<br>`qtDiasExpiracao` select {0=Não expirar; 30=Expirar em 30 dias; 45=Expirar em 45 dias; 60=Expirar em 60 dias; 90=Expirar em 90 dias; #=Expirar em 120 dias; #=Expirar em 180 dias; #=Expirar em 240 dias; #=Expirar em 360 dias}<br>`vlMinResgate` — ph:Valor mínimo que o usuário tem que acumu<br>`vlMaxResgate` — ph:Valor máximo que o usuário pode resgatar<br>`arrPagamentosSel` hidden<br>`idPagamentos` multi {0=Todos os pagamentos; #=Cartão - Crédito; #=Cartão - Débito; #=Cartão de Crédito no App (Online); #=Dinheiro; #=Maquininha; #=PIX - copia e cola \| Empresa deve conferir; #=Pix no App (Online); #=Pagamento no balcão; #=Pagamento por QR CODE; #=Pedido Pago para o Estabelecimento; #=Pedido Pago para o Marketplace; #=PlX NA ENTREGA; #=PlX via Qr code na maquininha}<br>`arrPagamentosResSel` hidden<br>`idPagamentosRes` multi {0=Todos os pagamentos; #=Cartão - Crédito; #=Cartão - Débito; #=Cartão de Crédito no App (Online); #=Dinheiro; #=Maquininha; #=PIX - copia e cola \| Empresa deve conferir; #=Pix no App (Online); #=Pagamento no balcão; #=Pagamento por QR CODE; #=Pedido Pago para o Estabelecimento; #=Pedido Pago para o Marketplace; #=PlX NA ENTREGA; #=PlX via Qr code na maquininha}<br>`arrOrigemSel` hidden<br>`idOrigens` multi {0=Todas as origens; 1=App Cliente Android; 2=App Cliente iOS; 3=App Empresa Android; 4=App Empresa iOS; 6=Web Painel Empresa; 9=PWA Web Cliente; 12=Integração iFood; 13=API Integração V2}<br>`idEntrega` select {3=Entrega e Balcão; 1=Entrega; 2=Balcão}<br>`flgAtivoCB` select {1=Sim; 0=Não}<br>`vlRetornoCB` — ph:Quantos % irá retornar para o usuário pa<br>`flgMostraPercentualCashbackApp` select {1=Sim; 0=Não}<br>`flgAtivoIG` select {1=Sim; 0=Não}<br>`vlIndica`<br>`vlIndicaPorcentagem`<br>`vlIndicado`<br>`tpMovimento` select — Tipo Lançamento {0=Todos; 1=Crédito - CashBack; 2=Débito; 3=Crédito - Marketplace; 4=Crédito - Indicado; 5=Crédito - Indica; 6=Débito - Expiração; 7=Crédito - Gamificação; 8=Estorno - Gerencial; 9=Saldo de Cupons em aberto}<br>`dtInicio` — Data Inicial<br>`dtFim` — Data Final<br>`flgCupomUsado` select — Cupom Utilizado? {2=Todos; 1=Sim; 0=Não}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Data · Tipo · Valor · Pedido · Usuário · Cupom · Cupom Utilizado? · Ação (13155 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Salvar · Consultar .form-control · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/configuracao_cb_ig.js`** ops: 215 realizaEstornoCashBack(idExtrato)
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-contratosphp"></a>
### contratos.php → redireciona p/ `pedidosk.php`
- título: Mais Delivery \| Meus Pedidos

<a id="g-contratos_textophp"></a>
### contratos_texto.php
- título: Mais Delivery \| Contratos dos Entregadores
- seções: Contratos dos Entregadores / Campos do contrato
- **Form** `POST contratos_texto.php` #form_actions
  - `action` hidden<br>`idContrato` hidden<br>`dsTexto` hidden<br>`jsonVariaveis` hidden<br>`idCidade` hidden<br>`flgTodosDevemAssinar` hidden<br>`idsAssinantes` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** Campo `#modal_campo` — botões: ×, Cancelar, Aplicar
  - `#modal_campo_valor` — Valor<br>`#modal_campo_opcao` select — Selecione a opção {}<br>`#modal_campo_data` — ph:dd/mm/aaaa
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Cancelar →contratos.php?id · Pré-visualizar · Salvar · Título .btn-formato · Subtítulo .btn-formato · Cláusula .btn-formato · Parágrafo .btn-formato · N .btn-formato · Linha .btn-formato · + Cláusula · Importar PDF / Word · Modelo padrão · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - `action`: new
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-contratos_texto_restaurantephp"></a>
### contratos_texto_restaurante.php
- título: Mais Delivery \| Contratos dos restaurantes
- seções: Contratos dos restaurantes / Campos do contrato
- **Form** `POST contratos_texto_restaurante.php` #form_actions
  - `action` hidden<br>`idContrato` hidden<br>`dsTexto` hidden<br>`jsonVariaveis` hidden<br>`idCidade` hidden<br>`flgTodosDevemAssinar` hidden<br>`idsAssinantes` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** Campo `#modal_campo` — botões: ×, Cancelar, Aplicar
  - `#modal_campo_valor` — Valor<br>`#modal_campo_opcao` select — Selecione a opção {}<br>`#modal_campo_data` — ph:dd/mm/aaaa
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Cancelar →contratos.php?id · Pré-visualizar · Salvar · Título .btn-formato · Subtítulo .btn-formato · Cláusula .btn-formato · Parágrafo .btn-formato · N .btn-formato · Linha .btn-formato · + Cláusula · Importar PDF / Word · Modelo padrão · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - `action`: new
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-copiar_para_marketplacephp"></a>
### copiar_para_marketplace.php

<a id="g-cupomphp"></a>
### cupom.php
- título: Mais Delivery \| Cupom
- seções: Cupom Adicionar Cupom / Cupom
- **Form** `POST cupom.php` #form_actions
  - `action` hidden<br>`idCupom` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Cupom · Gerado por · Utilizado / Limite · Qtd. Mesmo Cliente usa · Desconto · Limitado · Programado · Validade · Exclusivo · Primeiro pedido · Ativo · Disponível · Ação (342 linhas)<br>  controles por linha: button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Cupom .addRegistro · Editar .edtRegistro · Remover .delRegistro
- **JS `assets/js/cupom.js`** ops: 64 $(dsAbertura,dsNomeTela)
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-dashboardphp"></a>
### dashboard.php
- título: Mais Delivery \| Dashboard
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · ← .nav-btn · → .nav-btn · Hoje .nav-today · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - chama: dashboard_ajax.php ← ajaxPost
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-detalhes_pedidophp"></a>
### detalhes_pedido.php → redireciona p/ `pedidosk.php`
- título: Mais Delivery \| Meus Pedidos

<a id="g-email_divulgacaophp"></a>
### email_divulgacao.php
- título: Mais Delivery \| Divulgação - E-mail
- seções: E-mail Marketing
- **Form** `POST email_divulgacao.php` #frmCadastro multipart — botões: Enviar
  - `vlUnidade` hidden<br>`qtUsuarios` hidden<br>`qtLimite-1` hidden<br>`qtLimite-2` hidden<br>`qtLimite-3` hidden<br>`tpUsuarios` select {1=Que já fizeram pedidos antes.; 2=Que não tenham feito pedidos ainda.; 3=Com e sem Pedidos.}<br>`#slider_qtUsuarios` range — 0<br>`dsTitulo` — ph:Escreva aqui o título que deseja enviar. (máx 200)<br>`dsSubtitulo` — ph:Escreva aqui o subtítulo que deseja envi (máx 200)<br>`MAX_FILE_SIZE` hidden<br>`dsImagem` file<br>`dsMensagem` textarea — ph:Escreva aqui a mensagem que deseja envia (máx 200)<br>`dsLink` — ph:Insira o link, caso o e-mail deva direci<br>`dsEmail` — ph:E-mail para cópia
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Enviar .col-sm-1 · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/email_divulgacao.js`** ops: 167 validaInfos()
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-entregadorphp"></a>
### entregador.php
- título: Mais Delivery \| Entregadores em análise
- seções: Entregador Adicionar Entregador Ver no Mapa / Entregador
- **Form** `POST entregador.php` #form_actions
  - `action` hidden<br>`idEntregador` hidden<br>`flgEntregador` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Nome · E-mail · Telefone · Status · Entrega · Entregas Agora · Cadastro · Ação (35 linhas)<br>  controles por linha: a .__cf_email__ href=email-protection ; a href=# ; select:select-one n=selecionaFlgAtivoEntregador# . ch=confirmaMudancaStatus(this, '#') ; a href=detalhes_pedido.php ; a href=detalhes_pedido.php ; a href=detalhes_pedido.php ; button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Entregador .addRegistro · Ver no Mapa →entregadores_mapa.php · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/entregador.js`** ops: 88 $(dsCep) · 119 verificaApiWhatsAppOnline() · 161 validarCodigoTelefoneServidor() · 76 mudarStatusEntregador(idEntregador,flgAtivoEntregador) · 89 buscaBairros(idCidade) · 106 autenticarGoogleDrive() · 110 removerAcessoGoogleDrive() · 107 verificarAutenticacao() · 109 uploadArquivo() · 108 listaArquivos(idEntregador) · 111 removeArquivo(idArquivo)
  - chama: pedidos.php · entregador.php ← success · ajax_cidades_estado.php ← buscaCidades
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id · detalhes_pedido.php?id

<a id="g-entregadores_em_analisephp"></a>
### entregadores_em_analise.php → redireciona p/ `entregador.php`
- título: Mais Delivery \| Entregadores
- seções: Entregador Adicionar Entregador Ver no Mapa / Entregador

<a id="g-entregadores_mapaphp"></a>
### entregadores_mapa.php
- título: Mais Delivery \| Entregadores no Mapa
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar
- **JS `assets/js/entregadores_mapa.js`** ops: 48 coordenadasCidade(dsCidade) · 1 buscarUsuarios(idMarketplace,idSituacao,idPedido) · 3 buscarEstabelecimentos(idMarketplace,idSituacao,idPedido) · 2 buscarEntregadores(idMarketplace,idPedido,idEntregador) · 4 buscarProntosPraEntrega(idMarketplace)
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-estabelecimentophp"></a>
### estabelecimento.php
- título: Mais Delivery \| Estabelecimentos
- seções: ViewContent Padrão / ViewMenu Personalizado / AddToCart Padrão / InitiateCheckout Padrão / Purchase Padrão
- **Form** `POST estabelecimento.php` #form_actions
  - `action` hidden<br>`idRestaurante` hidden<br>`dsEstado` hidden
- **Form** `POST (mesma página)` #frmCadastro multipart — botões: Colar, Voltar, Salvar
  - `action` hidden<br>`idRestaurante` hidden<br>`idEndereco` hidden<br>`dtArquivado` hidden<br>`dsNome`<br>`dsDescricao`<br>`dsExternoCode` hidden<br>`dsEmail`<br>`dsCnpj`<br>`dsTipoSocietario` select {=Selecione; LIMITED=Sociedade Limitada; INDIVIDUAL=Empresário Individual; MEI=MEI; ASSOCIATION=Associação}<br>`nrTempoMin` (máx 3)<br>`nrTempoMax` (máx 3)<br>`tpTempoEntrega` select {1=min; 2=horas; 3=dias}<br>`flgCalculaTempo` select {1=Sim; 0=Não}<br>`flgAparecerApp` select {1=Sim; 0=Não}<br>`nrDDD` (máx 3)<br>`nrTelefone`<br>`idCidade` select {#=Juína}<br>`idCategoria_1` select {0=Selecione; #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idCategoria_2` select {0=Selecione (opcional); #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idCategoria_3` select {0=Selecione (opcional); #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idCategoria_4` select {0=Selecione (opcional); #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idEntrega` select {0=Selecione; 1=Entrega; 2=Balcão; 3=Entrega e balcão}<br>`flgMaiorIdade` select {1=Sim; 0=Não}<br>`MAX_FILE_SIZE` hidden<br>`dsImagem` file<br>`flgAtivo` select {1=Ativo; 2=Fechado; 0=Inativo; -1=Arquivado; -2=Em análise}<br>`dsCep`<br>`idBairro` select {46 opções}<br>`dsRua`<br>`nrRua`<br>`dsComplemento`<br>`dsReferencia`<br>`nrLatLong` — ph:Copie e cole do PIN do Google Maps Ex: -<br>`sun_1_open` — ph:Abre<br>`sun_1_close` — ph:Fecha<br>`sun_2_open` — ph:Abre<br>`sun_2_close` — ph:Fecha<br>`sun_3_open` — ph:Abre<br>`sun_3_close` — ph:Fecha<br>`mon_1_open` — ph:Abre<br>`mon_1_close` — ph:Fecha<br>`mon_2_open` — ph:Abre<br>`mon_2_close` — ph:Fecha<br>`mon_3_open` — ph:Abre<br>`mon_3_close` — ph:Fecha<br>`tue_1_open` — ph:Abre<br>`tue_1_close` — ph:Fecha<br>`tue_2_open` — ph:Abre<br>`tue_2_close` — ph:Fecha<br>`tue_3_open` — ph:Abre<br>`tue_3_close` — ph:Fecha<br>`wed_1_open` — ph:Abre<br>`wed_1_close` — ph:Fecha<br>`wed_2_open` — ph:Abre<br>`wed_2_close` — ph:Fecha<br>`wed_3_open` — ph:Abre<br>`wed_3_close` — ph:Fecha<br>`thu_1_open` — ph:Abre<br>`thu_1_close` — ph:Fecha<br>`thu_2_open` — ph:Abre<br>`thu_2_close` — ph:Fecha<br>`thu_3_open` — ph:Abre<br>`thu_3_close` — ph:Fecha<br>`fri_1_open` — ph:Abre<br>`fri_1_close` — ph:Fecha<br>`fri_2_open` — ph:Abre<br>`fri_2_close` — ph:Fecha<br>`fri_3_open` — ph:Abre<br>`fri_3_close` — ph:Fecha<br>`sat_1_open` — ph:Abre<br>`sat_1_close` — ph:Fecha<br>`sat_2_open` — ph:Abre<br>`sat_2_close` — ph:Fecha<br>`sat_3_open` — ph:Abre<br>`sat_3_close` — ph:Fecha<br>`idMetaPixel`<br>`dsGoogleTagManager`<br>`dsGoogleAnalytics`
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Colar · Voltar →lista_estabelecimentos.php · Salvar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/validacao.js`** ops: 82 validaCoordenadasCidade(nrLatitude,nrLongitude,idCidade)
- **JS `assets/js/estabelecimento.js`** ops: 88 $(dsCep) · 64 validaHorarios(dsAbertura,dsNomeTela) · 150 verificaExternoCodeExiste(idRestaurante,dsExternoCode)
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-estabelecimentos_desarquivarphp"></a>
### estabelecimentos_desarquivar.php
- título: Mais Delivery \| Estabelecimentos Arquivados
- seções: Desarquivar Estabelecimentos
- **Form** `POST estabelecimentos_desarquivar.php` #form_actions
  - `action` hidden<br>`idRestaurante` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Estabelecimento · Descrição · Data que foi arquivado · Ação (531 linhas)<br>  controles por linha: button:submit .edtRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Desarquivar .edtRegistro
- **Valores de `action`**: edt
- **Mensagens**: Deseja desarquivar este estabelecimento?
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-estabelecimentos_nacionaisphp"></a>
### estabelecimentos_nacionais.php
- título: Mais Delivery \| Estabelecimentos Nacionais
- seções: Estabelecimentos Nacionais
- **Form** `POST estabelecimentos_nacionais.php` #form_actions
  - `action` hidden<br>`idRestaurante` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Nome · Logo · Segmento · Data Criação · Ação (60 linhas)<br>  controles por linha: button:submit .obterButton
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · OBTER .obterButton · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/estabelecimentos_nacionais.js`** ops: 18 mudarStatusEstabelecimento(idRestaurante,flgAtivo)
  - chama: estabelecimentos_recebidos.php ← $
  - `action`: ins, edt
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-estabelecimentos_recebidosphp"></a>
### estabelecimentos_recebidos.php
- título: Mais Delivery \| Estabelecimentos em análise
- seções: Estabelecimentos Recebidos de Outros Marketplaces ou de Pré Cadastro
- **Form** `POST estabelecimento.php` #form_actions
  - `action` hidden<br>`idRestaurante` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Logo · Nome · Descrição · Data cadastro · Telefone · Situação · Observação (34 linhas)<br>  controles por linha: a href=# ; select:select-one n=selecionarTabelaSituacao .selecionarSituacaoTabela ch=confirmaMudancaStatus(this, '#')
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/estabelecimentos_recebidos.js`** ops: 173 on(idRestaurante,dsObservacao) · 18 mudarStatusEstabelecimento(idRestaurante,flgAtivo)
  - chama: estabelecimentos_recebidos.php ← $
  - `action`: edt
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-feriadosphp"></a>
### feriados.php
- título: Mais Delivery \| Feriados
- seções: Feriados Adicionar Feriado / Feriados
- **Form** `POST feriados.php` #form_actions
  - `action` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** `#table-feriados` Feriado · Dia da semana · Data · Tipo de bloqueio · Status · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Feriado .addRegistroSugetao · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/feriados.js`** ops: 141 confirmaExclusao(flgAtivo,idMarketplaceFeriado) · 144 mudarTpBloqueio(tpBloqueio) · 141 mudarStatus(flgAtivo) · 139 buscaSugestaoFeriados() · 140 insereFeriado(dsFeriado,dtFeriado,tpBloqueio,flgAtivo)
  - chama: feriados.php ← success
  - `action`: new
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-forma_pagamentophp"></a>
### forma_pagamento.php
- título: Mais Delivery \| Formas de Pagamento
- seções: Forma de pagamento Adicionar / Forma de pagamento
- **Form** `POST forma_pagamento.php` #form_actions
  - `action` hidden<br>`idPagamento` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Forma de pagamento · Status · Retem Valor · Chave Pix · Ação (11 linhas)<br>  controles por linha: button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar .addRegistro · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-funcionariophp"></a>
### funcionario.php
- título: Mais Delivery \| Funcionários
- seções: Funcionário Adicionar Funcionário / Funcionário
- **Form** `POST funcionario.php` #form_actions
  - `action` hidden<br>`idFuncionario` hidden<br>`idRestaurante` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Nome · E-mail · Telefone · WhatsApp · Ativo · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Funcionário .addRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/funcionario.js`** ops: 178 excluiFuncionario(idRestaurante) · 119 verificaApiWhatsAppOnline() · 160 validarCodigoTelefoneServidor()
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-indexphp"></a>
### index.php → redireciona p/ `pedidosk.php`
- título: Mais Delivery \| Meus Pedidos

<a id="g-lista_estabelecimentosphp"></a>
### lista_estabelecimentos.php
- título: Mais Delivery \| Estabelecimentos
- seções: Estabelecimentos + AÇÕES Ordenar Estabelecimentos Adicionar Estabelecimento Ativ / Estabelecimentos
- **Form** `POST estabelecimento.php` #form_actions
  - `idRestaurante` hidden<br>`action` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** modalOrdenarRestaurante `#modalOrdenarRestaurante` (form → `mesma`) — botões: Voltar, Salvar
- **Tabela** ID · Cidade · Bairro · Nome · Telefone · Segmento · Entregadores · Situação · CPF Obrigatório · Horário Hoje · Gateway de pagamento · Aceita Cupons · Ação · Copiar (101 linhas)<br>  controles por linha: a href=# ; select:select-one n=selecionarTabelaSituacao# . ch=confirmaMudancaStatus(this, '#') ; select:select-one n=selecionarObrigatorioCpfTabela# . ch=mudarCpfObrigatorio(this, '#') ; button:submit .edtRegistro ; a . href=funcionario.php ; button:submit .cpRegistro ; a . href=copiar_para_marketplace.php ; button:submit . on=copiaTexto('#')
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · + AÇÕES · Salvar · Editar .edtRegistro · Funcionarios →funcionario.php?idRestaurante · Neste Marketplace .cpRegistro · Outro Marketplace →copiar_para_marketplace.php?idRestaurante · Chave PIX CNPJ ou CPF .btn-copy-pix [copiaTexto('#')] · Chave PIX Telefone .btn-copy-pix [copiaTexto('#')] · Renovar Mercado Pago →marketplace.callback_mp.php?origin&store&grant_type&code · Chave PIX E-mail .btn-copy-pix [copiaTexto('<email>')] · Chave PIX E-mail .btn-copy-pix [copiaTexto('<email>')] · Chave PIX E-mail .btn-copy-pix [copiaTexto('<email>')]
- **JS `assets/js/lista_estabelecimentos.js`** ops: 114 mudarCpfObrigatorio(idRestaurante,flgCpfObrigato) · 18 mudarStatusEstabelecimento(idRestaurante,flgAtivo) · 142 ativarTodosEstabelecimentos() · 143 desativarTodosEstabelecimentos()
  - `action`: new, edt, cp
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id · funcionario.php?idRestaurante · copiar_para_marketplace.php?idRestaurante

<a id="g-lista_notificacoesphp"></a>
### lista_notificacoes.php
- título: Mais Delivery \| Notificações Programadas e Enviadas
- seções: Notificações Nova Notificação / Notificações
- **Form** `POST lista_notificacoes.php` #form_actions
  - `action` hidden<br>`idNotificacao` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Data Criação · Título · Mensagem · Enviada · Data Envio · Ação (100 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Nova Notificação .addRegistro →/painel/notificacao.php · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/notificacao.js`** ops: 32 trazProdutos(idRestaurante) · 167 validaNotificacao()
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-mapa_cidadesphp"></a>
### mapa_cidades.php
- título: Mais Delivery \| Mapa de Calor por Cidade
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar
- **JS `assets/js/mapa_cidades.js`** ops: 23 buscarPedidos24H(dtInicial)
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-marketplacephp"></a>
### marketplace.php
- título: Mais Delivery \| Marketplace
- seções: ViewContent Padrão / ViewMenu Personalizado / AddToCart Padrão / InitiateCheckout Padrão / Purchase Padrão / Horários de Funcionamento (Bandeira 2)
- **Form** `POST marketplace.php` #frmCadastro
  - `flgFreteGratis_ant` hidden<br>`dsIBGECidade` hidden<br>`vlMinFreteGratis_ant` hidden<br>`idMarketplace` hidden<br>`dsFuncionamentoBandeira2` hidden<br>`dsNome`<br>`dsNomeRepresentante`<br>`dsEmail`<br>`nrDDD`<br>`nrTelefone`<br>`dsCnpj`<br>`dsCpf`<br>`dsTipoSocietario` select {=Selecione; LIMITED=Sociedade Limitada; INDIVIDUAL=Empresário Individual; MEI=MEI; ASSOCIATION=Associação}<br>`dsCep`<br>`dsRua`<br>`dsNumero`<br>`dsBairro`<br>`dsCidade`<br>`dsEstado`<br>`dsComplemento`<br>`flgAtivo` select {1=Sim; 0=Não}<br>`flgRecEntrega` select {1=Vai para o Marketplace; 0=Vai para o Estabelecimento}<br>`qtPedEntregador`<br>`flgFreteGratis` select {1=Sim; 0=Não}<br>`flgPermiteVerPagamento` select {1=Sim; 0=Não}<br>`vlMinFreteGratis`<br>`tpEstPodeAltTxEntrega` select {0=Todos os Estabelecimentos; 1=Só estabelecimentos com entregador Próprio/Interno; 2=Nenhum estabelecimento só o Administrador/Gerencia}<br>`vlEntregaExtra`<br>`vlBandeira2`<br>`flgPermissaoEntregadorTelefone` select {1=Sim; 0=Não}<br>`nrMinutoMetaColeta`<br>`nrMinutoMetaEntrega`<br>`idSituacaoEntrega` select {3=Visualizam e Pegam 'Em Andamento'; -1=Visualizam 'Em Andamento', pegam 'Pronto para Entr; 4=Visualizam e Pegam 'Pronto para Entrega'}<br>`qtMinBloqueio`<br>`flgMostraUsuario` hidden<br>`flgAguardaComprovante` select {0=Sim; 1=Não}<br>`vlMinimoLancado`<br>`arrOcultaSituacoesKanbanSel` hidden<br>`idOcultaSituacoesKanban` multi — Não mostrar as situações de pedidos na tela Kaban para: {0=Nenhuma situação; -1=Aguardando pagamento; 2=Na fila de preparo; 3=Em andamento; 4=Pronto pra Entrega; 5=Saiu para entrega; 7=Entregador na sua porta; 6=Entrega realizada; 9=Cancelado; -2=Pagamento não realizado}<br>`arrSituacoesPermisaoSel` hidden<br>`idSituacoesPermisao` multi — Não permitir alterar as situações de pedidos para: {0=Todas situações são permitidas; -1=Aguardando pagamento; 2=Na fila de preparo; 3=Em andamento; 4=Pronto pra Entrega; 5=Saiu para entrega; 7=Entregador na sua porta; 6=Entrega realizada; 9=Cancelado; -2=Pagamento não realizado}<br>`flgBalcaoOnline` select {0=Não; 1=Sim}<br>`flgLancarPedidoBairroInativo` select {0=Não; 1=Sim}<br>`arrOcultaSituacoesKanbanSelOld` hidden<br>`arrSituacoesPermisaoSelOld` hidden<br>`flgMostraInadimplente` select {0=Não mostrar no app; 1=Mostrar fechado no app}<br>`tpChavePix` select {0=Selecione o tipo da sua chave pix; 1=CPF; 2=CNPJ; 3=E-mail; 4=Telefone; 5=Chave aleatória}<br>`dsChavePix` — ph:Preencha a chave pix que deseja receber <br>`vlPercentualMultaCobranca`<br>`vlPercentualJurosMoraCobranca`<br>`dsObsCobranca` textarea<br>`dsMsgLembrarCobranca` textarea<br>`formasTaxaCobranca[]` multi — Repassar taxas no pagamento da cobrança: {NENHUM=Nenhum; CREDIT_CARD=Crédito; PIX=PIX}<br>`#dsGatewayTaxas1` — Gateway de pagamento online:<br>`taxasGateway[1][vlPercentualTaxaPIX]` — Taxa percentual do PIX online (%):<br>`taxasGateway[1][vlTaxaFixaPIX]` — Taxa fixa do PIX online (R$):<br>`taxasGateway[1][vlPercentualTaxaCartao]` — Taxa percentual do cartão online (%):<br>`taxasGateway[1][vlTaxaFixaCartao]` — Taxa fixa do cartão online (R$):<br>`#dsGatewayTaxas2` — Gateway de pagamento online:<br>`taxasGateway[2][vlPercentualTaxaPIX]` — Taxa percentual do PIX online (%):<br>`taxasGateway[2][vlTaxaFixaPIX]` — Taxa fixa do PIX online (R$):<br>`taxasGateway[2][vlPercentualTaxaCartao]` — Taxa percentual do cartão online (%):<br>`taxasGateway[2][vlTaxaFixaCartao]` — Taxa fixa do cartão online (R$):<br>`nrMinExpiraPedidos` select {10=10 minutos; 15=15 minutos; 20=20 minutos}<br>`tpGatewayPagamentoOnline` select {1=Mercado Pago; 2=Asaas}<br>`tpPagamentoOnline` select {0=Vai para o Estabelecimento; 1=Vai para o Marketplace}<br>`flgMostraAguardandoPgto` select {1=Sim; 0=Não}<br>`idMetaPixel`<br>`dsGoogleTagManager`<br>`dsGoogleAnalytics`
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** Horários de Funcionamento (Bandeira 2) `#modalHorarios` — botões: ×, Cancelar, Salvar horários
  - `sun_1_open` — ph:Abre<br>`sun_1_close` — ph:Fecha<br>`sun_2_open` — ph:Abre<br>`sun_2_close` — ph:Fecha<br>`mon_1_open` — ph:Abre<br>`mon_1_close` — ph:Fecha<br>`mon_2_open` — ph:Abre<br>`mon_2_close` — ph:Fecha<br>`tue_1_open` — ph:Abre<br>`tue_1_close` — ph:Fecha<br>`tue_2_open` — ph:Abre<br>`tue_2_close` — ph:Fecha<br>`wed_1_open` — ph:Abre<br>`wed_1_close` — ph:Fecha<br>`wed_2_open` — ph:Abre<br>`wed_2_close` — ph:Fecha<br>`thu_1_open` — ph:Abre<br>`thu_1_close` — ph:Fecha<br>`thu_2_open` — ph:Abre<br>`thu_2_close` — ph:Fecha<br>`fri_1_open` — ph:Abre<br>`fri_1_close` — ph:Fecha<br>`fri_2_open` — ph:Abre<br>`fri_2_close` — ph:Fecha<br>`sat_1_open` — ph:Abre<br>`sat_1_close` — ph:Fecha<br>`sat_2_open` — ph:Abre<br>`sat_2_close` — ph:Fecha
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Salvar · × .close · Cancelar · Salvar horários · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/marketplace.js`** ops: 88 $(dsCep) · 119 verificaApiWhatsAppOnline() · 163 validarCodigoTelefoneServidor() · 22 $() · 106 autenticarGoogleDrive() · 110 removerAcessoGoogleDrive() · 107 verificarAutenticacao() · 64 $(dsAbertura,dsNomeTela)
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-marketplace_acessophp"></a>
### marketplace_acesso.php
- título: Mais Delivery \| Login acesso ao Gerencial
- seções: Subgerência Adicionar Login Acesso / Subgerência
- **Form** `POST marketplace_acesso.php` #form_actions
  - `action` hidden<br>`idLoginAcesso` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Nome · E-mail · Telefone · Ativo · Dt. Criacao · Ação (2 linhas)<br>  controles por linha: a .__cf_email__ href=email-protection ; a . href=marketplace_permissoes.php ; button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Login Acesso .addRegistro · Permissões →marketplace_permissoes.php?id · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/marketplace_acesso.js`** ops: 164 verificaSeMudouTelefone() · 165 enviarCodigoValidacaoTelefone() · 162 validarCodigoTelefoneServidor() · 97 verificaSeMudouEmail() · 98 enviarCodigoValidacao() · 119 verificaApiWhatsAppOnline()
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id · marketplace_permissoes.php?id

<a id="g-marketplace_apiphp"></a>
### marketplace_api.php
- título: Mais Delivery \| Minhas Licenças Robozinho
- seções: API - Integração API ATIVA DESATIVAR API / API - Integração / API ATIVA
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID Integração · Restaurante · Telefone · Ação · Selecione empresa p/ se integrar (135 linhas)<br>  controles por linha: button:submit .atQrCode on=onclick_ativar_desativar(this); ; button:submit .delPacote on=onclick_ativar_desativar(this); ; select:select-multiple .chosen-select ch=onchange_seleciona_empresa(this)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · DESATIVAR API [onclick_ativar_desativar(this);] · ATIVAR .atQrCode [onclick_ativar_desativar(this);] · DESATIVAR .delPacote [onclick_ativar_desativar(this);] · ATIVAR .atRobo [onclick_ativar_desativar(this);]
- **JS `assets/js/marketplace_api.js`** ops: 85 onchange_seleciona_empresa(idRestaurante,arrEmpresaIntegrada)
  - chama: marketplace_api.php ← onclick_ativar_desativar
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-marketplace_permissoesphp"></a>
### marketplace_permissoes.php

<a id="g-minhas_notasphp"></a>
### minhas_notas.php
- título: Mais Delivery \| Minhas Notas Fiscais
- seções: Notas fiscais referentes ao pagamento do suporte mensal. / Notas Fiscais
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** `#example` Vencimento · Pagamento · Nota Fiscal · Valor · PDF (34 linhas)<br>  controles por linha: a href=nota_pdf.php ; a . href=nota_pdf.php
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Visualizar PDF →nota_pdf.php?id
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id · nota_pdf.php?id

<a id="g-motivo_cancelamento_pedidophp"></a>
### motivo_cancelamento_pedido.php
- título: Mais Delivery \| Motivos de Cancelamento
- seções: Motivos de Cancelamento de Pedido Adicionar Motivo / Motivos de Cancelamento de Pedido
- **Form** `POST motivo_cancelamento_pedido.php` #form_actions
  - `action` hidden<br>`idMotivo` hidden<br>`dsMotivo` hidden<br>`flgAtivo` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Motivo · Status · Ações (14 linhas)<br>  controles por linha: select:select-one n=selecionarTabelaSituacao .flgAtivo ; button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Motivo .addRegistro · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - `action`: new, edt, flg, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-nota_pdfphp"></a>
### nota_pdf.php

<a id="g-notificacaophp"></a>
### notificacao.php
- título: Mais Delivery \| Notificação
- seções: Notificação
- **Form** `POST notificacao.php` #frmCadastro multipart — botões: Voltar, Enviar
  - `dsTitulo` (máx 30)<br>`dsMensagem` — ph:Escreva aqui a mensagem que deseja envia (máx 200)<br>`MAX_FILE_SIZE` hidden<br>`dsImagem` file<br>`idVinculo` select {0=Sem Vínculo; 1=Vincular com um Segmento de Estabelecimento; 2=Vínculo com uma Promoção; 3=Vínculo com um Estabelecimento; 4=Vínculo com um Estabelecimento e Produto; 5=Cashback; 6=Indique e Ganhe; 7=Pedido Premiado; 8=Cadastro Premiado; 9=Extrato da Conta}<br>`idCategoria` select {0=Selecione o Segmento; #=Abertos Agora; #=A ESTABELECIMENTOS 24H; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Esfihas; #=Padaria; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=Lanchonete; #=MACARRÃO; #=Restaurante; #=Mercado; #=Conveniencia; #=Gás e água}<br>`idPromocao` select {0=Selecione a Promoção; #=DOM RÚSTICO - Combo 1.0}<br>`idRestaurante` select {102 opções}<br>`idCardapio` select {0=Selecione o Produto}<br>`tpUsuarios` select {1=Que já fizeram pedidos antes.; 2=Que não tenham feito pedidos ainda.; 3=Com e sem Pedidos.}<br>`dtProgramada` — ph:Deixe em branco para enviar imediatament<br>`hrProgramada` — ph:Deixe em branco para enviar imediatament<br>`#dsSugestoes` select {65 opções}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Voltar →/painel/lista_notificacoes.php · Enviar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/notificacao.js`** ops: 32 trazProdutos(idRestaurante) · 167 validaNotificacao()
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-pedidosphp"></a>
### pedidos.php → redireciona p/ `pedidosk.php`
- título: Mais Delivery \| Meus Pedidos

<a id="g-pedidoskphp"></a>
### pedidosk.php
- título: Mais Delivery \| Meus Pedidos
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Meu pedidos lista [mudarTipolistagem(0)] · Meus Pedidos kanban [mudarTipolistagem(1)] · Lançar Pedido .addRegistro →tele_entrega.php · Ver Pedidos no Mapa →entregadores_mapa.php · Ver filtro .btn-filtro [abriFiltro()] · Consultar .form-control [buscaPedidoPeriodoSituacao()] · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/pedidosk.js`** ops: 101 mudarTipolistagem(flgTipoTelaPedido,idMarketplace) · 157 atualizaSituacaoPagamentoOnlinePedido(idPedido) · 99 buscarSituacaoPedidos() · 100 buscaPedidos(dtInicio,dtFim) · 100 buscaDetalhesPedido(dtInicio,dtFim,idPedido) · 102 buscaEntregadoresOnline() · 65 verificaPedidoComanda(idComanda) · 24 mudaSituacaoPedido(idPedido,idSituacao,idRestaurante,flgAdministrador,dsMotivo,idFuncionario,flgPix,idMotivo) · 66 fechaComanda(idComanda) · 11 alteraEntregador(idPedido,idEntregador,flgAdministrador,flgConfirmou)
  - chama: ajax_estorno_pagamento_online.php ← ajaxEstornaPagamentoOnline
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-premiacaophp"></a>
### premiacao.php
- título: Mais Delivery \| Premiação
- seções: Premiação Adicionar Premiação / Premiação / Ganhadores
- **Form** `POST premiacao.php` #form_actions
  - `action` hidden<br>`idPremiacao` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** modalCenterPremiosGanhadores `#modalCenterPremiosGanhadores` — botões: ×, Fechar
- **Tabela** Tipo · Nome Premiação · Data de Início · Data Final · Data Premiação · Qtd Prêmios / ganahdores · Valor Mínimo · Situação · Ativo · Ação (1 linhas)<br>  controles por linha: input:checkbox n=flgAtivo .flgAtivo ; button:submit .edtRegistro ; button:submit .delRegistro
- **Tabela** `#tableUsuariosVencedores` #ID · ID Usuário · ID Pedido · Nome · Telefone · Data Premiação · Entrega (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Premiação .addRegistro · Editar .edtRegistro · Remover .delRegistro · × .close · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/premiacao.js`** ops: 176 on(idGanhadoresSorteio) · 93 trazerPremiacaoGanhador(idPremiacao,tpPremiacao) · 94 realizaSorteio(idPremiacao) · 166 trazUsuariosParticipantes(idPremiacao,tpPremiacao,qtPaginas) · 170 abrePedidosUsuario(idPremiacao,idUsuario) · 172 sorteiaPremios(arrPremios) · 212 alteraStatus(idPremiacao,flgAtivo)
  - chama: detalhes_pedido.php?id ← abreDetalhePedido · ajax_busca_vencedores_usuarios.php ← render
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-relatoriophp"></a>
### relatorio.php
- título: Mais Delivery \| Relatórios
- seções: Relatórios
- **Form** `POST (mesma página)` #frmRelatorio — botões: Consultar
  - `hdnRelatorioSel` hidden<br>`idRelatorio` select — Relatório {41 opções}<br>`idCidade` select — Cidades {#=Juína}<br>`idRestaurante[]` multi — Estabelecimento {102 opções}<br>`idTipoCupom` select — Escolha o tipo de cupom {0=Todos; 1=Cupom comum; 2=Cupom de CashBack e Indique Ganhe}<br>`arrEntregadoresSel` hidden<br>`idEntregadores` multi — Entregador {36 opções}<br>`tpEntregador` select — Tipo de Entregador {0=Todos os entregadores; 1=Interno; 2=Externo}<br>`arrBairrosSel` hidden<br>`idBairros` multi — Bairro {46 opções}<br>`arrPagamentosSel` hidden<br>`idPagamentos` multi — Pagamento {0=Todos os pagamentos; #=Cartão - Crédito; #=Cartão - Débito; #=Cartão de Crédito no App (Online); #=Dinheiro; #=Maquininha; #=PIX - copia e cola \| Empresa deve conferir; #=Pix no App (Online); #=Pagamento no balcão; #=Pagamento por QR CODE; #=Pedido Pago para o Estabelecimento; #=Pedido Pago para o Marketplace; #=PlX NA ENTREGA; #=PlX via Qr code na maquininha}<br>`dtCriacaoInicio` — Data Inicio Criação Usuário<br>`dtCriacaoFim` — Data Fim Criação Usuário<br>`arrOrigensSel` hidden<br>`idOrigens` multi — Origem {0=Todas as origens; 1=App Cliente Android; 2=App Cliente iOS; 3=App Empresa Android; 4=App Empresa iOS; 5=Web Cliente; 6=Web Painel Empresa; 7=App Empresa Windows; 8=Whatsapp; 9=PWA Web Cliente; 10=PWA Comanda; 11=API Integração V1; 12=Integração iFood; 13=API Integração V2}<br>`arrEntregasSel` hidden<br>`idEntregas` select — Entrega {0=Entregas grátis e pagas; 1=Entrega Grátis; 2=Entrega Paga}<br>`dtInicio` — Data inicial<br>`dtFim` — Data final<br>`diasSemana[]` multi — Dias da semana {1=Segunda-feira; 2=Terça-feira; 3=Quarta-feira; 4=Quinta-feira; 5=Sexta-feira; 6=Sábado; 7=Domingo}<br>`hrInicio` — Horário inicial<br>`hrFim` — Horário final<br>`idStatus` select — Status {0=TODOS; -2=PAGAMENTO NÃO REALIZADO; -1=AGUARDANDO PAGAMENTO; -2=PAGAMENTO NÃO REALIZADO; -1=AGUARDANDO PAGAMENTO; 1=VERIFICANDO; 2=NA FILA DE PREPARO; 3=EM ANDAMENTO; 4=PRONTO PRA ENTREGA; 5=SAIU PRA ENTREGA; 7=ENTREGADOR NA SUA PORTA; 6=ENTREGA REALIZADA; 9=CANCELADO}<br>`nrDias` number — Número de dias sem fazer pedido<br>`arrTpCalculoComissaoSel` hidden<br>`tpCalculoComissao` multi — Calcular comissão sobre? {0=Produtos; 1=Entregas; 2=Cupons; 3=Promoções}<br>`idFormatoSaida` select — Formato do arquivo de saída do relatório {0=Gerar relatório em formato PDF; 1=Gerar relatório em formato CSV; 2=Gerar relatório em formato Excel}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Consultar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - chama: ajax_relatorio_filtro.php ← exibeCampos
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-restaurante_ordemphp"></a>
### restaurante_ordem.php
- **Operações (inline)**: 16 $(idMarketplace,idCidade,idCategoria)

<a id="g-segmentosphp"></a>
### segmentos.php
- título: Mais Delivery \| Segmentos dos Estabelecimentos
- seções: Segmento Adicionar Segmento / Segmento
- **Form** `POST segmentos.php` #form_actions
  - `action` hidden<br>`idCategoria` hidden<br>`nrOrdem` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Ativo · Ordem · Nome · Tem Estabelecimentos · Imagem · Ação (26 linhas)<br>  controles por linha: input:text n=nrOrdem .nrOrdem ; button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Segmento .addRegistro · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/segmentos.js`** ops: 75 buscaSegmento(dsCategoria)
  - `action`: new, edt, del, ord
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-sms_divulgacaophp"></a>
### sms_divulgacao.php
- título: Mais Delivery \| Divulgação - SMS
- seções: Envio de SMS para usuários
- **Form** `POST sms_divulgacao.php` #frmCadastro multipart — botões: Copiar Link, Enviar
  - `vlUnidade` hidden<br>`qtUsuarios` hidden<br>`qtLimite-1` hidden<br>`qtLimite-2` hidden<br>`qtLimite-3` hidden<br>`qtLimite-4` hidden<br>`tpUsuarios` select {1=Que já fizeram pedidos antes.; 2=Que não tenham feito pedidos ainda.; 3=Com e sem Pedidos.; 4=Lançados (Não orgânicos).}<br>`#slider_qtUsuarios` range — 0<br>`#txt_url`<br>`dsMensagem` textarea — ph:Escreva aqui a mensagem que deseja envia (máx 200)<br>`nrDDD` — ph:DDD<br>`nrTelefone` — ph:Telefone
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Copiar Link · Enviar .col-sm-1
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-sub_categoria_itemphp"></a>
### sub_categoria_item.php
- título: Mais Delivery \| Subcategorias
- seções: Subcategoria Adicionar Subcategoria / Subcategoria
- **Form** `POST sub_categoria_item.php` #form_actions
  - `action` hidden<br>`idCategoria` hidden<br>`idSubCategoria` hidden<br>`dsSubCategoria` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Status · Categoria · Subcategoria · Ação (4000 linhas)<br>  controles por linha: button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Subcategoria .addRegistro · Editar .edtRegistro · Remover .delRegistro
- **JS `assets/js/sub_categoria_item.js`** ops: 167 $() · 122 $(idSubCategoria,dsImagem)
  - chama: cardapio_sugeridos.php?id&tp ← $
  - `action`: new, edt, del
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-tele_entregaphp"></a>
### tele_entrega.php
- título: Mais Delivery \| Novo Pedido
- seções: Novo Pedido
- **Form** `POST (mesma página)` #frmCadastro multipart — botões: Enviar Pedido
  - `idEndereco` hidden<br>`nrLatitude` hidden<br>`nrLongitude` hidden<br>`idRestaurante` select {102 opções}<br>`nrDDD` (máx 3)<br>`nrTelefone`<br>`dsNome`<br>`idEntrega` select {1=Delivery; 2=Retirada no Balcão}<br>`enderecos` select {}<br>`idCidade` hidden<br>`dsCidade` hidden<br>`idBairro` select {0=Selecione}<br>`dsRua`<br>`nrRua`<br>`dsComplemento`<br>`dsReferencia`<br>`vlPedido` (máx 7)<br>`vlEntrega` (máx 7)<br>`vlTotal` (máx 7)<br>`flgPedidoPago` select {0=Não foi pago; 1=Pedido Pago para o Estabelecimento; 2=Pedido Pago para o Marketplace}<br>`idPagamento` select {0=Selecione o estabelecimento primeiro}<br>`idSituacao` select {1=VERIFICANDO; 2=NA FILA DE PREPARO; 3=EM ANDAMENTO; 4=PRONTO PRA ENTREGA; 6=ENTREGA REALIZADA}<br>`dsObservacao` textarea
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Enviar Pedido · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/tele_entrega.js`** ops: 29 trazUsuario(nrDDD,nrTelefone,flgValidaCidade) · 28 trazerFormaPagamento(idRestaurante) · 154 carregaBairrosPorCidade(idCidade) · 105 obtemEntregaSemEndereco(idRestaurante,dsCidade,dsEstado,nrLatitude,nrLongitude,dsRua,nrRua,idBairro,flgPedidoLancado) · 68 obtemEntregaBairroOuKM(idRestaurante,idEndereco,flgPedidoLancado) · 58 enviaPedido(idRestaurante,dsNome,nrDDD,nrTelefone,idCidade,nrLatitude,nrLongitude,dsRua,nrRua,dsComplemento,dsReferencia,idBairro)
  - chama: pedidos.php ← success
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-usuariophp"></a>
### usuario.php
- título: Mais Delivery \| Usuários
- seções: USUÁRIOS Adicionar Usuário / USUÁRIOS
- **Form** `POST usuario.php` #form_actions
  - `action` hidden<br>`idUsuario` hidden<br>`qtCidades` hidden<br>`flgIndique` hidden
- **Form** `POST (mesma página)` #frmUsuarios — botões: Consultar
  - `flgLancado` select — Origem {0=Usuários Orgânicos; 1=Usuários Lançados; 2=Todos}<br>`flgPedidos` select — Pedidos {3=Usuários com e sem Pedidos; 2=Usuários sem Pedidos; 1=Usuários com Pedidos}<br>`flgAtivoFiltro` select — Situação {2=Todos menos Excluídos; 1=Ativos; 0=Bloqueados; -1=Excluídos}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** `#tableUsuarios` # ID · Nome · Email · CPF · Telefone · Dt. Criação · Dt. Último Pedido · Dt. Último Acesso · Tipo · Situação · Quem Indicou · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Usuário .addRegistro · Consultar .form-control · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - chama: usuario_novo.php ← $ · ajax_busca_usuarios.php ← buscaUsuarios
  - `action`: edt, rm
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-valor_comissaophp"></a>
### valor_comissao.php
- título: Mais Delivery \| Configurar Comissões
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Estabelecimento · Status · Comissão de PedidosAPP · Comissão de PedidosPWA · Comissão de PedidosComanda · Comissão de PedidosLançados · Comissão de PedidosNão Atendidos (102 linhas)<br>  controles por linha: select:select-one n=tpComissaoOrganicoTodos .comissao-grid-control ch=onChangeTipoComissaoTodos(this, 19) ; input:text n=vlComissaoOrganicoTodos .valorcomissao.comissao-grid-control ch=onChangeComissaoTodos(this, 20); ; select:select-one n=tpComissaoOrgPwaTodos .comissao-grid-control ch=onChangeTipoComissaoTodos(this, 71) ; input:text n=vlComissaoOrgPwaTodos .valorcomissao.comissao-grid-control ch=onChangeComissaoTodos(this, 72); ; select:select-one n=tpComissaoComandaTodos .comissao-grid-control ch=onChangeTipoComissaoTodos(this, 73) ; input:text n=vlComissaoComandaTodos .valorcomissao.comissao-grid-control ch=onChangeComissaoTodos(this, 74); ; select:select-one n=tpComissaoLancadoTodos .comissao-grid-control ch=onChangeTipoComissaoTodos(this, 33) ; input:text n=vlComissaoLancadoTodos .valorcomissao.comissao-grid-control ch=onChangeComissaoTodos(this, 34); ; select:select-one n=tpComissaoCanceladosTodos .comissao-grid-control ch=onChangeTipoComissaoTodos(this, 87) ; input:text n=vlComissaoCanceladosTodos .valorcomissao.comissao-grid-control ch=onChangeComissaoTodos(this, 86);
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - chama: valor_comissao.php ← success
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-valores_entregas_gerencialphp"></a>
### valores_entregas_gerencial.php
- título: Mais Delivery \| Valores de Entrega do Gerencial
- seções: Valores de Entrega do Gerencial
- **Form** `POST (mesma página)` #form_post — botões: Adicionar KM, Remover Todos, Adicionar Bairro, Adicionar Todos, Remover Todos, Salvar
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar KM .addRegistro · Remover Todos .dltTodosKm · Adicionar Bairro .addRegistro · Adicionar Todos .addTodosBairros · Remover Todos .dltTodosBairros · Salvar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/validacao.js`** ops: 82 validaCoordenadasCidade(nrLatitude,nrLongitude,idCidade)
- **JS `assets/js/valores_entrega_gerencial.js`** ops: 10 $(idEntrega) · 8 trataEventosBairro() · 9 $(idEntrega) · 158 $(idRestaurante,arrIdEntregas) · 159 on(arrIdEntregas,idRestaurante)
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

<a id="g-whatsapp_grupophp"></a>
### whatsapp_grupo.php
- título: Mais Delivery \| Grupo WhatsApp
- **Form** `POST (mesma página)` #frmCadastro — botões: Salvar
  - `action` hidden<br>`dsGrupoWhatsapp` — ph:Digite no campo o link para o grupo do W
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Salvar
- **JS `assets/js/whatsapp_grupo.js`** ops: 112 salvarWhatsappGrupo(dsGrupoWhatsapp)
- **Links com parâmetros**: contratos.php?id · cobrancas.php?id

## Perfil lojista

<a id="l-adicionalphp"></a>
### adicional.php
- título: Mais Delivery \| Adicional
- vista em: loja-frutos, loja-pizzaria
- seções: Adicional dos Produtos Adicionar Adicional / Adicional dos Produtos
- **Form** `POST adicional.php` #form_actions
  - `action` hidden<br>`idAdicional` hidden<br>`qtCopias` hidden
- **Form** `POST (mesma página)` #frmNivel — botões: Consultar
  - `idCategoria` select — Categoria de Produto {0=Selecione a Categoria}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Categoria · Subcategoria · Adicional · Ordem · Valor · Ativo? · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Consultar .form-control · Adicionar Adicional .addRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/adicional.js`** ops: 27 $(idAdicional,flgAtivo) · 15 $(idRestaurante,idCategoria) · 39 $(idAdicional,vlItem) · 51 $(idAdicional,dsImagem) · 167 trataSalvar() · 81 confirmaSalvar(idRestaurante)
  - `action`: new, edt, cp, del

<a id="l-avaliacaophp"></a>
### avaliacao.php
- título: Mais Delivery \| Avaliação
- vista em: loja-frutos
- seções: Avaliações
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Usuário · Comentário · Nota · Data · Resposta (273 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/avaliacao.js`** ops: 5 on(idAvaliacao,dsResposta)

<a id="l-aviso_cobrancaphp"></a>
### aviso_cobranca.php
- título: Mais Delivery \| Cobranças em Aberto
- vista em: loja-frutos
- seções: Cobranças em Aberto
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar
  - chama: datapaymentcobrancamp.php ← preparar

<a id="l-categoria_itemphp"></a>
### categoria_item.php
- título: Mais Delivery \| Categorias
- vista em: loja-frutos, loja-pizzaria
- seções: Categoria Adicionar Categoria / Categoria
- **Form** `POST categoria_item.php` #form_actions
  - `action` hidden<br>`idCategoria` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Categoria · Status · Ação (3753 linhas)<br>  controles por linha: button:submit .edtSugeridos
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Categoria .addRegistro · Sugeridos .edtSugeridos
- **JS `assets/js/categoria_item.js`** ops: 174 alteraStatus(idCategoria,flgAtivo)
  - chama: cardapio_sugeridos.php?id&tp ← $
  - `action`: new, edt, del

<a id="l-categoria_ordemphp"></a>
### categoria_ordem.php
- vista em: loja-frutos

<a id="l-compartilhar_lojaphp"></a>
### compartilhar_loja.php
- vista em: loja-frutos
- seções: 🔗 COMPARTILHE SUA LOJA!
- **Botões**: Imprimir .btn-compartilhar-neutro →tcpdf/pedido/qr_code_loja.php?id · Acessar Link .btn-compartilhar-neutro →/web/loja.php?id · Copiar Link · Enviar por WhatsApp .btn-whatsapp-acao →/send?l&text
- **Mensagens**: Link Copiado

<a id="l-configuracaophp"></a>
### configuracao.php
- título: Mais Delivery \| Configurações
- vista em: loja-frutos, loja-pizzaria
- seções: Configurações / Configuração do PIX Offline
- **Form** `POST configuracao.php` #form_actions
  - `idRestaurante` hidden<br>`qtCidades` hidden
- **Form** `POST (mesma página)` #form_post multipart — botões: Configurar, Adicionar KM, Remover Todos, Adicionar Bairro, Adicionar Todos, Remover Todos, Salvar, ×, Voltar, Aplicar
  - `flgAceitaCupons` select {1=Sim; 0=Não}<br>`flgCashBack` select {0=Não; 1=Sim}<br>`flgPermissaoEntregadorInternoTelefone` select {1=Sim; 0=Não}<br>`tpChavePix` select {=Selecione o tipo da sua chave pix; 1=CNPJ ou CPF; 2=E-mail; 3=Telefone; 4=Chave aleatória; 5=Nenhuma}<br>`dsChavePix`<br>`flgCpfObrigato` select {0=Não; 1=Sim}<br>`vlMinimo` (máx 5)<br>`idConclusao` select {1=2 Horas; 2=6 Horas; 3=12 Horas; 4=1 Dia; 5=3 Dias; 6=7 Dias}<br>`idAceitar` select {1=15 Minutos; 7=30 Minutos; 2=60 Minutos; 3=4 Horas; 4=1 Dia; 5=3 Dias}<br>`qtTempoPronto` select {0=0 Minutos; 5=5 Minutos; 10=10 Minutos; 15=15 Minutos}<br>`tpImpressaoPedido` select {0=Térmica Padrão - Fonte Letra Menor; 1=Térmica Genérica - Fonte Letra Maior}<br>`flgDescricaoProdutoImpressao` select {0=Não; 1=Sim}<br>`arrOcultaSituacoesKanbanSel` hidden<br>`idOcultaSituacoesKanban` multi — Não mostrar as situações de pedidos na tela Kaban para: {0=Usar configuração do Marketplace; -1=Aguardando pagamento; 2=Na fila de preparo; 3=Em andamento; 4=Pronto pra Entrega; 5=Saiu para entrega; 7=Entregador na sua porta; 6=Entrega realizada; 9=Cancelado; -2=Pagamento não realizado}<br>`arrSituacoesPermisaoSel` hidden<br>`idSituacoesPermisao` multi — Não permitir alterar as situações de pedidos para: {0=Usar configuração do Marketplace; -1=Aguardando pagamento; 2=Na fila de preparo; 3=Em andamento; 4=Pronto pra Entrega; 5=Saiu para entrega; 7=Entregador na sua porta; 6=Entrega realizada; 9=Cancelado; -2=Pagamento não realizado}<br>`arrOcultaSituacoesKanbanSelOld` hidden<br>`arrSituacoesPermisaoSelOld` hidden<br>`idEntrega` radio=1 — Entrega<br>`idEntrega` radio=2 — Entrega<br>`idEntrega` radio=3 — Entrega<br>`tpEntregadores` radio=1 — Internos (Estabelecimento)<br>`tpEntregadores` radio=2 — Internos (Estabelecimento)<br>`tpTaxaEntrega` radio=1 — Do Estabelecimento<br>`tpTaxaEntrega` radio=2 — Do Estabelecimento<br>`flgFreteGratis` select {1=Sim; 0=Não}<br>`vlMinFreteGratis`<br>`tpGatewayPagamentoOnline` select — Gateway de pagamento online: {-1=Configurado no marketplace => Mercado Pago; 1=Mercado Pago; 2=Asaas}<br>`tpPagamentoOnline` select — O valor total do pagamento online (Pedido + Entrega): {-1=Configurado no marketplace => Vai para o Estabelec; 0=Vai para o Estabelecimento; 1=Vai para o Marketplace}<br>`pagamentos_online[]` checkbox=# — Cartão de Crédito no App (Online)<br>`pagamentos_offline[]` checkbox=# — Cartão - Crédito<br>`nrBairros[][#]` select — Bairro {#=Aeroporto}<br>`vlEntrega[][#]` — ph:0,00<br>`selRestaurantes[]` multi {100 opções}<br>`#tpChavePixModal` select — Tipo da chave PIX: {=Selecione o tipo da sua chave PIX; 1=CNPJ ou CPF; 2=E-mail; 3=Telefone; 4=Chave aleatória; 5=Nenhuma}<br>`#dsChavePixModal` — Chave PIX:
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** Configuração do PIX Offline `#modalConfiguracaoPixOffline` — botões: ×, Voltar, Aplicar
  - `#tpChavePixModal` select — Tipo da chave PIX: {=Selecione o tipo da sua chave PIX; 1=CNPJ ou CPF; 2=E-mail; 3=Telefone; 4=Chave aleatória; 5=Nenhuma}<br>`#dsChavePixModal` — Chave PIX:
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Configurar .js-configurar-pix-offline · Adicionar KM .addRegistro · Remover Todos .dltTodosKm · Adicionar Bairro .addRegistro · Adicionar Todos .addTodosBairros · Remover Todos .dltTodosBairros · Salvar · × .close · Aplicar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/validacao.js`** ops: 82 validaCoordenadasCidade(nrLatitude,nrLongitude,idCidade)
- **JS `assets/js/configuracao.js`** ops: 10 $(idEntrega) · 8 trataEventosBairro() · 9 $(idEntrega) · 158 $(idRestaurante,arrIdEntregas) · 159 on(arrIdEntregas,idRestaurante)

<a id="l-cupomphp"></a>
### cupom.php
- título: Mais Delivery \| Cupom
- vista em: loja-frutos
- seções: Cupom Adicionar Cupom / Cupom
- **Form** `POST cupom.php` #form_actions
  - `action` hidden<br>`idCupom` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Cupom · Gerado por · Utilizado / Limite · Qtd. Mesmo Cliente usa · Desconto · Limitado · Programado · Validade · Exclusivo · Primeiro pedido · Ativo · Disponível · Ação (2 linhas)<br>  controles por linha: button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Cupom .addRegistro · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/cupom.js`** ops: 64 $(dsAbertura,dsNomeTela)
  - `action`: new, edt, del

<a id="l-dashboardphp"></a>
### dashboard.php
- título: Mais Delivery \| Dashboard
- vista em: loja-frutos
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · ← .nav-btn · → .nav-btn · Hoje .nav-today · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - chama: dashboard_ajax.php ← ajaxPost

<a id="l-detalhes_pedidophp"></a>
### detalhes_pedido.php → redireciona p/ `pedidosk.php`
- título: Mais Delivery \| Meus Pedidos
- vista em: loja-frutos

<a id="l-entregadorphp"></a>
### entregador.php
- título: Mais Delivery \| Entregadores em análise
- vista em: loja-frutos
- seções: Entregador Adicionar Entregador / Entregador
- **Form** `POST entregador.php` #form_actions
  - `action` hidden<br>`idEntregador` hidden<br>`flgEntregador` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Nome · E-mail · Telefone · Status · Entrega · Entregas Agora · Cadastro · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Entregador .addRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/entregador.js`** ops: 88 $(dsCep) · 119 verificaApiWhatsAppOnline() · 161 validarCodigoTelefoneServidor() · 76 mudarStatusEntregador(idEntregador,flgAtivoEntregador) · 89 buscaBairros(idCidade) · 106 autenticarGoogleDrive() · 110 removerAcessoGoogleDrive() · 107 verificarAutenticacao() · 109 uploadArquivo() · 108 listaArquivos(idEntregador) · 111 removeArquivo(idArquivo)
  - chama: pedidos.php · entregador.php ← success · ajax_cidades_estado.php ← buscaCidades
  - `action`: new, edt, del

<a id="l-estabelecimentophp"></a>
### estabelecimento.php
- título: Mais Delivery \| Estabelecimentos
- vista em: loja-frutos
- seções: ViewContent Padrão / ViewMenu Personalizado / AddToCart Padrão / InitiateCheckout Padrão / Purchase Padrão
- **Form** `POST estabelecimento.php` #form_actions
  - `action` hidden<br>`idRestaurante` hidden<br>`dsEstado` hidden
- **Form** `POST (mesma página)` #frmCadastro multipart — botões: Colar, Salvar
  - `action` hidden<br>`idRestaurante` hidden<br>`idEndereco` hidden<br>`dtArquivado` hidden<br>`dsNome`<br>`dsDescricao`<br>`dsExternoCode` hidden<br>`dsEmail`<br>`dsCnpj`<br>`dsTipoSocietario` select {=Selecione; LIMITED=Sociedade Limitada; INDIVIDUAL=Empresário Individual; MEI=MEI; ASSOCIATION=Associação}<br>`nrTempoMin` (máx 3)<br>`nrTempoMax` (máx 3)<br>`tpTempoEntrega` select {1=min; 2=horas; 3=dias}<br>`flgCalculaTempo` select {1=Sim; 0=Não}<br>`flgAparecerApp` select {1=Sim; 0=Não}<br>`nrDDD` (máx 3)<br>`nrTelefone`<br>`idCidade` select {#=Juína}<br>`idCategoria_1` select {0=Selecione; #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idCategoria_2` select {0=Selecione (opcional); #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idCategoria_3` select {0=Selecione (opcional); #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idCategoria_4` select {0=Selecione (opcional); #=A ESTABELECIMENTOS 24H; #=TOP 30; #=ENTREGA GRÁTIS ;); #=Hamburguerias; #=Marmitas Delivery; #=Açaí e sorvete; #=Pastelarias; #=Espetinhos; #=Pizzaria; #=Oriental; #=Peixarias; #=Padaria; #=Esfihas; #=café e doceria; #=churros crepes e tapiocas; #=Batata Recheada; #=mexicano; #=Solidariedade; #=Lanchonete; #=MACARRÃO; #=Acarajé; #=Restaurante; #=Mercado; #=Conveniencia; …}<br>`idEntrega` select {0=Selecione; 1=Entrega; 2=Balcão; 3=Entrega e balcão}<br>`flgMaiorIdade` select {1=Sim; 0=Não}<br>`MAX_FILE_SIZE` hidden<br>`dsImagem` file<br>`flgAtivo` select {1=Ativo; 2=Fechado; 0=Inativo; -1=Arquivado; -2=Em análise}<br>`dsCep`<br>`idBairro` select {46 opções}<br>`dsRua`<br>`nrRua`<br>`dsComplemento`<br>`dsReferencia`<br>`nrLatLong` — ph:Copie e cole do PIN do Google Maps Ex: -<br>`sun_1_open` — ph:Abre<br>`sun_1_close` — ph:Fecha<br>`sun_2_open` — ph:Abre<br>`sun_2_close` — ph:Fecha<br>`sun_3_open` — ph:Abre<br>`sun_3_close` — ph:Fecha<br>`mon_1_open` — ph:Abre<br>`mon_1_close` — ph:Fecha<br>`mon_2_open` — ph:Abre<br>`mon_2_close` — ph:Fecha<br>`mon_3_open` — ph:Abre<br>`mon_3_close` — ph:Fecha<br>`tue_1_open` — ph:Abre<br>`tue_1_close` — ph:Fecha<br>`tue_2_open` — ph:Abre<br>`tue_2_close` — ph:Fecha<br>`tue_3_open` — ph:Abre<br>`tue_3_close` — ph:Fecha<br>`wed_1_open` — ph:Abre<br>`wed_1_close` — ph:Fecha<br>`wed_2_open` — ph:Abre<br>`wed_2_close` — ph:Fecha<br>`wed_3_open` — ph:Abre<br>`wed_3_close` — ph:Fecha<br>`thu_1_open` — ph:Abre<br>`thu_1_close` — ph:Fecha<br>`thu_2_open` — ph:Abre<br>`thu_2_close` — ph:Fecha<br>`thu_3_open` — ph:Abre<br>`thu_3_close` — ph:Fecha<br>`fri_1_open` — ph:Abre<br>`fri_1_close` — ph:Fecha<br>`fri_2_open` — ph:Abre<br>`fri_2_close` — ph:Fecha<br>`fri_3_open` — ph:Abre<br>`fri_3_close` — ph:Fecha<br>`sat_1_open` — ph:Abre<br>`sat_1_close` — ph:Fecha<br>`sat_2_open` — ph:Abre<br>`sat_2_close` — ph:Fecha<br>`sat_3_open` — ph:Abre<br>`sat_3_close` — ph:Fecha<br>`idMetaPixel`<br>`dsGoogleTagManager`<br>`dsGoogleAnalytics`
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Colar · Salvar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/validacao.js`** ops: 82 validaCoordenadasCidade(nrLatitude,nrLongitude,idCidade)
- **JS `assets/js/estabelecimento.js`** ops: 88 $(dsCep) · 64 validaHorarios(dsAbertura,dsNomeTela) · 150 verificaExternoCodeExiste(idRestaurante,dsExternoCode)

<a id="l-funcionariophp"></a>
### funcionario.php
- título: Mais Delivery \| Funcionários
- vista em: loja-frutos
- seções: Funcionário Adicionar Funcionário / Funcionário
- **Form** `POST funcionario.php` #form_actions
  - `action` hidden<br>`idFuncionario` hidden<br>`idRestaurante` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Nome · E-mail · Telefone · WhatsApp · Ativo · Ação (1 linhas)<br>  controles por linha: a .__cf_email__ href=email-protection ; a href=send ; a . href=funcionario_permissoes.php ; button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Funcionário .addRegistro · Permissões →funcionario_permissoes.php?id · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/funcionario.js`** ops: 178 excluiFuncionario(idRestaurante) · 119 verificaApiWhatsAppOnline() · 160 validarCodigoTelefoneServidor()
  - `action`: new, edt, del
- **Links com parâmetros**: funcionario_permissoes.php?id

<a id="l-funcionario_permissoesphp"></a>
### funcionario_permissoes.php
- vista em: loja-frutos

<a id="l-indexphp"></a>
### index.php → redireciona p/ `pedidosk.php`
- título: Mais Delivery \| Meus Pedidos
- vista em: loja-frutos

<a id="l-integracoesphp"></a>
### integracoes.php
- título: Mais Delivery \| Integrações
- vista em: loja-frutos
- seções: Integrações com outras Plataformas
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · INTEGRAR [realizarIntegraçãoIFood();] · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/integracoes.js`** ops: 134 (idRestaurante) · 129 geraAccessToken(idIntegracao,dsAuthorizationCode,dsAuthorizationCodeVerifier) · 130 desativarIntegracaoIFood(idRestaurante,idIntegracao) · 131 ativarIntegracaoIFood(idRestaurante,idIntegracao) · 132 removerIntegracaoIFood(idIntegracao)

<a id="l-listar_cobrancas_estabelecimentophp"></a>
### listar_cobrancas_estabelecimento.php
- título: Mais Delivery \| Cobranças
- vista em: loja-frutos
- seções: Cobranças Estabelecimentos
- **Form** `POST listar_cobrancas_estabelecimento.php` #[object Object]
  - `action` hidden<br>`id` hidden<br>`idCobranca` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** `#tbCobrancas` Período · Vencimento · Valor cobrança · Pago? · Ação (1 linhas)<br>  controles por linha: button:button n=btVer# .verRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Ver .verRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - `action`: edt
- **Links com parâmetros**: listar_cobrancas_estabelecimento.php?id

<a id="l-mesasphp"></a>
### mesas.php
- título: Mais Delivery \| Mesas
- vista em: loja-frutos
- seções: Mesas Adicionar Mesa / Mesas
- **Form** `POST mesas.php` #form_actions
  - `action` hidden<br>`idMesa` hidden<br>`nrMesa` hidden<br>`dsMesa` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Número mesa · Nome mesa · Ativa? · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Mesa .addRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/mesas.js`** ops: 63 alteraflag(idMesa,flgAtivo,1)
  - `action`: new, edt, del

<a id="l-nivel_cardapiophp"></a>
### nivel_cardapio.php
- título: Mais Delivery \| Níveis Cardápio
- vista em: loja-frutos, loja-pizzaria
- seções: Níveis Cardápio Adicionar Nivel Cardápio / Níveis Cardápio
- **Form** `POST nivel_cardapio.php` #form_actions
  - `action` hidden<br>`idNivelCardapio` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Categoria · Subcategoria · Produto · Ordem · Titulo · Ativo · Ação (28 linhas)<br>  controles por linha: input:checkbox n=flgAtivo# .flgAtivo ; button:submit .edtRegistro ; button:submit .cpRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Nivel Cardápio .addRegistro · Editar .edtRegistro · Copiar .cpRegistro · Remover .delRegistro
- **JS `assets/js/nivel_cardapio.js`** ops: 26 $(idNivelCardapio,flgAtivo) · 15 $(idRestaurante,idCategoria) · 81 confirmaDados(idRestaurante) · 175 alteraExternalCode(idNivelCardapio,dsExternoCode,idRestaurante) · 179 alteraTipoNivel(idNivelCardapio,tpNivel,idRestaurante)
  - `action`: new, edt, cp, del

<a id="l-opcoes_nivel_cardapiophp"></a>
### opcoes_nivel_cardapio.php
- título: Mais Delivery \| Opções Nivel Cardápio
- vista em: loja-frutos, loja-pizzaria
- seções: Opções Nivel Cardápio Adicionar Opção Nivel Cardápio / Opções Nivel Cardápio
- **Form** `POST opcoes_nivel_cardapio.php` #form_actions
  - `action` hidden<br>`idNivelFiltro` hidden<br>`idOpcaoNivel` hidden<br>`qtCopias` hidden
- **Form** `POST (mesma página)` #frmNivel — botões: Consultar
  - `idNivelFiltro` select — Nível Cardápio {0=Selecione o nível; -1=Todos os Níveis; #=Escolha 5 minis pasteis!; #=Salgados - Dri Massas Artesanais - Combo de 5 salg; #=Salgados - Dri Massas Artesanais - Combo 5 salgado; #=Lasanhas - Dri Massas Artesanais - Adicionais; #=Lasanhas - Dri Massas Artesanais - Deseja Talheres; #=Pizza gaveta - Dri Massas Artesanais - Pizza Gavet; #=Pizza gaveta - Dri Massas Artesanais - Pizza Gavet; #=Pizza gaveta salgada - Dri Pizzas Gavetas - Escolh; #=Pizza gaveta salgada - Dri Pizzas Gavetas - Adicio; #=Pizza gaveta doce - Dri Pizzas Gavetas - Escolha 1; #=Pizza gaveta doce - Dri Pizzas Gavetas - Adicional; #=Combos - Dri Pizzas Gaveta - Combo 4 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 4 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 4 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 6 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 6 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 6 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 8 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 8 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 4 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 4 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 4 Pizzas gaveta; #=Combos - Dri Pizzas Gaveta - Combo 4 Pizzas gaveta; …}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Categoria · Subcategoria · Titulo do nível cardápio · Nome da opção do nível · Valor · Ativo? · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Consultar .form-control · Adicionar Opção Nivel Cardápio .addRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/opcoes_nivel_cardapio.js`** ops: 26 $(idOpcaoNivel,flgAtivo) · 38 $(idOpcaoNivel,vlItem) · 52 $(idOpcaoNivel,dsImagem) · 167 trataSalvar() · 81 confirmaSalvar(idRestaurante) · 152 alteraExternalCode(idOpcaoNivel,dsExternoCode,idRestaurante) · 180 alteraEstoque(idOpcaoNivel,qtEstoque)
  - `action`: new, edt, cp, del

<a id="l-pedidosphp"></a>
### pedidos.php → redireciona p/ `pedidosk.php`
- título: Mais Delivery \| Meus Pedidos
- vista em: loja-frutos

<a id="l-pedidoskphp"></a>
### pedidosk.php
- título: Mais Delivery \| Meus Pedidos
- vista em: loja-frutos
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Meu pedidos lista [mudarTipolistagem(0)] · Meus Pedidos kanban [mudarTipolistagem(1)] · Lançar Pedido .addRegistro →tele_entrega.php · Ver filtro .btn-filtro [abriFiltro()] · Consultar .form-control [buscaPedidoPeriodoSituacao()] · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/pedidosk.js`** ops: 101 mudarTipolistagem(flgTipoTelaPedido,idMarketplace) · 157 atualizaSituacaoPagamentoOnlinePedido(idPedido) · 99 buscarSituacaoPedidos() · 100 buscaPedidos(dtInicio,dtFim) · 100 buscaDetalhesPedido(dtInicio,dtFim,idPedido) · 102 buscaEntregadoresOnline() · 65 verificaPedidoComanda(idComanda) · 24 mudaSituacaoPedido(idPedido,idSituacao,idRestaurante,flgAdministrador,dsMotivo,idFuncionario,flgPix,idMotivo) · 66 fechaComanda(idComanda) · 11 alteraEntregador(idPedido,idEntregador,flgAdministrador,flgConfirmou)
  - chama: ajax_estorno_pagamento_online.php ← ajaxEstornaPagamentoOnline

<a id="l-produto_detalhephp"></a>
### produto_detalhe.php
- título: Mais Delivery \| Detalhe Produto
- vista em: loja-frutos, loja-pizzaria
- **Form** `POST (mesma página)` #frmCadastro multipart — botões: Novo Sabor, Novo Adicional, Novo Nível, Voltar, Salvar
  - `action` hidden<br>`idCardapio` hidden<br>`idRestaurante` hidden<br>`idSubCategoriaEdt` hidden<br>`flgAdicionais` hidden<br>`flgSabores` hidden<br>`flgSalvaNiveis` hidden<br>`dsNome` textarea — ph:Informe o nome do produto (máx 45)<br>`dsDescricao` textarea — ph:Informe a descrição do produto<br>`dsExternoCode` hidden<br>`idCategoria` select {0=Selecione a Categoria; -1=Trazer todas as Categorias; -2=Trazer as do Estabelecimento}<br>`idSubCategoria` select {0=Selecione a Subcategoria}<br>`idTipoProduto` select {0=Normal; 1=Bebida}<br>`vlItem`<br>`qtEstoque` number<br>`nrOrdem` number<br>`qtSabores` number<br>`tpCalculoSabor` select {0=Média entres os sabores; 1=Maior valor entres os sabores}<br>`qtAdicionais` number<br>`flgNiveis` select {0=Não; 1=Sim}<br>`flgMaiorIdade` select {0=Não; 1=Sim, exibir descrição para entregador; 2=Sim, ocultar descrição para entregador}<br>`flgDescricaoProdutoImpressao` select {0=Não; 1=Sim}<br>`MAX_FILE_SIZE` hidden<br>`dsImagem` file<br>`flgAtivo` select {1=Ativo; 0=Inativo}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** `#tblSabores` Sabor · Descrição · Valor R$ · Ativo · Ação (0 linhas)
- **Tabela** `#tblAdicionais` Nome · Valor R$ · Ordem · Ativo · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Novo Sabor .addRegistro · Novo Adicional .addRegistro · Novo Nível .addNivel · Voltar →produtos.php · Salvar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/produto_detalhe.js`** ops: 15 trataCategoria(idRestaurante,idCategoria) · 209 RemoveSabor(idSabor) · 210 RemoveAdicional(idAdicional) · 207 RemoveNivel(idNivelCardapio) · 208 RemoveOpcaoNivel(idOpcaoNivel) · 45 trazerAdicionais(idCategoria,idSubCategoria) · 13 trazerSabores(idCategoria,idSubCategoria,flgAtivo) · 7 $(idCardapio,dsImagem) · 81 $(idRestaurante) · 167 validaSalvar() · 64 $(dsAbertura,dsNomeTela) · 171 verificaSeParticipaPromocao(idCardapio) · 177 verificaBebidaProduto(dsNome,dsCategoria,dsSubCategoria) · 206 verificaBebidaNivel(dsNome)
  - chama: ajax_novo_nivel.php ← montaHTMLNivel · ajax_nova_opcao.php ← montaHTMLOpcaoNivel · ajax_opcoes_niveis.php ← trazerNiveis

<a id="l-produtosphp"></a>
### produtos.php
- título: Mais Delivery \| Produtos
- vista em: loja-frutos, loja-pizzaria
- seções: Produtos + AÇÕES Ordenar Categorias Adicionar Produto Excluir Selecionados Ativa / Produtos
- **Form** `POST produtos.php` #form_actions
  - `action` hidden<br>`idCardapio` hidden<br>`flgAtivaDesativa` hidden<br>`qtCopias` hidden
- **Form** `POST produto_detalhe.php` #form_actions_detalhe
  - `action` hidden<br>`idCardapio` hidden
- **Form** `POST (mesma página)` #frmPedidos — botões: Consultar
  - `idCategoria` select — Categoria {0=Selecione a categoria; #=Açaí - Frutos do Goiás; #=Açaí na Tigela - Frutos de Goiás; #=Pote de sorvete - Frutos de Goiás; #=Pote - Frutos de Goiás; #=Bola de Sorvete - Frutos do Goiás; #=Picolé Especial - Frutos de Goiás; #=Paletas - Frutos de Goiás; #=Linha Proteica - Frutos do Goiás; #=Picolé Zero Açúcar - Frutos de Goiás; #=Picolé tradicional (Base água); #=Picolé tradicional (Base leite); #=Turbinado de Açaí - Milk Shake; #=Milk Shake Especial - Frutos de Goiás; #=Milk Shake 300ml - Frutos de Goiás; #=Milk Shake 500ml - Frutos de Goiás; #=MILK SHAKE 700 - Frutos de Goiás; #=Mix Ovomaltine - Frutos de Goiás; #=Casadinho de Açaí - Frutos de Goiás; #=Banana Split - Frutos de Goiás; #=Taça tentação - Frutos de Goiás; #=Taça La Passion - Frutos de Goiás; #=Taça Branca de Neve - Frutos de Goiás; #=Taça Óreo - Frutos de Goiás; #=Taça Avalanche - Frutos de Goiás; …}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Modal** modalOrdenarCategorias `#modalOrdenarCategorias` (form → `mesma`) — botões: Voltar, Salvar
- **Tabela**  · # ID · Categoria · Subcategoria · Nome · Ordem · Níveis · Sabores · Adicionais · Valor · Estoque · Ativo? · Disponível? · Ação (154 linhas)<br>  controles por linha: input:checkbox .rowCheckbox ; input:text n=nrOrdem[#] .nrOrdemListagem ; input:text n=vlItem[#] .vlItemListagem ; input:text n=qtEstoque[#] .qtEstoque ; input:checkbox n=flgAtivo .flgAtivo ; button:submit .edtRegistro ; button:submit .edtSugerido ; button:submit .cpRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Consultar .form-control · + AÇÕES · Salvar · Editar .edtRegistro · Sugeridos .edtSugerido.btn-sugeridos-produto · Copiar .cpRegistro · Remover .delRegistro
- **JS `assets/js/produtos.js`** ops: 27 alteraStatus(idCardapio,flgAtivo) · 171 verificaSeParticipaPromocao(idCardapio) · 31 alteraValor(idCardapio,vlItem) · 113 alteraEstoque(idCardapio,qtEstoque) · 153 alteraOrdem(idCardapio,nrOrdem) · 151 alteraExternalCode(idCardapio,dsExternoCode,idRestaurante)
  - chama: cardapio_sugeridos.php?id&tp ← $
  - `action`: new, edt, del, edtImpressaoDescricao, cp

<a id="l-promocao_detalhephp"></a>
### promocao_detalhe.php
- título: Mais Delivery \| Promoção
- vista em: loja-frutos, loja-pizzaria
- seções: Promoção
- **Form** `POST promocao_detalhe.php` #form_actions
  - `action` hidden<br>`idPromocao` hidden<br>`idRestaurante` hidden
- **Form** `POST (mesma página)` #frmCadastro multipart — botões: Adicionar Produto, Voltar, Salvar
  - `action` hidden<br>`idPromocao` hidden<br>`idRestaurante` hidden<br>`dsPromocao` — ph:Informe o título da promoção (máx 35)<br>`dsDescricao` textarea — ph:Informe a descrição da promoção (máx 200)<br>`dtInicio`<br>`hrInicio`<br>`dtFim`<br>`hrFim`<br>`idEntrega` select {1=Entrega; 2=Balcão; 0=Entrega e Balcão}<br>`flgFreteGratis` select {0=Não; 1=Sim}<br>`flgPrimeiraCompra` select {0=Não; 1=Sim}<br>`vlPercentualRepasse`<br>`qtLimiteCliente`<br>`qtUsoLimitePromo`<br>`arrPagamentosSel` hidden<br>`idPagamentos` multi — Pagamento: {0=Todos os pagamentos}<br>`MAX_FILE_SIZE` hidden<br>`dsImagem` file<br>`idCategoria` select {0=Selecione}<br>`idSubCategoria` select {0=Selecione}<br>`idCardapio` select {0=Selecione}<br>`idSabor` select {0=Selecione}<br>`vlNormalTotal`<br>`vlDescontoTotal`
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** `#tblPromocao` Categoria · Subcategoria · Cardápio · Sabor · Valor Normal (R$) · Valor Promocional (R$) · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Produto .addPromocao · Voltar →promocoes.php · Salvar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/promocao.js`** ops: 15 $(idRestaurante,idCategoria) · 12 $(idRestaurante,idCategoria,idSubCategoria) · 13 success(idRestaurante,idCategoria,idSubCategoria,flgAtivo) · 167 validaSalvar() · 14 removeCardapioItem(idPromocao,idCardapio,idSabor) · 64 $(dsAbertura,dsNomeTela)
  - `action`: new, del, edt

<a id="l-promocoesphp"></a>
### promocoes.php
- título: Mais Delivery \| Promoções
- vista em: loja-frutos, loja-pizzaria
- seções: Promoções Adicionar Promoção / Promoções
- **Form** `POST promocoes.php` #form_actions
  - `action` hidden<br>`idPromocao` hidden
- **Form** `POST promocao_detalhe.php` #form_actions_detalhe
  - `action` hidden<br>`idPromocao` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Dt. Início · Dt. Final · Título · Gerada por · Valores · Frete Grátis · Apenas 1.ero Pedido · Limite Cliente · Qt. Uso limite · Ação (3 linhas)<br>  controles por linha: button:submit .edtRegistro ; button:submit .delRegistro
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Promoção .addRegistro · Editar .edtRegistro · Remover .delRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/promocao.js`** ops: 15 $(idRestaurante,idCategoria) · 12 $(idRestaurante,idCategoria,idSubCategoria) · 13 success(idRestaurante,idCategoria,idSubCategoria,flgAtivo) · 167 validaSalvar() · 14 removeCardapioItem(idPromocao,idCardapio,idSabor) · 64 $(dsAbertura,dsNomeTela)
  - `action`: new, del, edt

<a id="l-relatoriophp"></a>
### relatorio.php
- título: Mais Delivery \| Relatórios
- vista em: loja-frutos
- seções: Relatórios
- **Form** `POST (mesma página)` #frmRelatorio — botões: Consultar
  - `hdnRelatorioSel` hidden<br>`idRelatorio` select — Relatório {0=--; 30=Adicionais mais vendidos; 40=Avaliação de entregadores; 5=Avaliações usuários; 29=Cancelamentos por tipo; 10=Cupons utilizados - detalhado; 52=Cupons utilizados - sintético; 9=Entregas por entregador analítico; 43=Entregas por entregador sintético; 55=Histórico Situação Pedidos; 59=Opções de nível sem estoque; 14=Pedidos Cancelados; 6=Pedidos concluídos - consolidado; 3=Pedidos concluídos - detalhado; 24=Pedidos concluídos analítico; 23=Pedidos concluídos sintético; 8=Produtos mais vendidos; 25=Produtos sem estoque; 45=Promoções mais vendidas; 34=Sabores mais vendidos; 12=Tempo de Entregas; 11=Usuarios mais fiéis}<br>`idTipoCupom` select — Escolha o tipo de cupom {0=Todos; 1=Cupom comum; 2=Cupom de CashBack e Indique Ganhe}<br>`arrEntregadoresSel` hidden<br>`idEntregadores` multi — Entregador {1 opções}<br>`tpEntregador` select — Tipo de Entregador {0=Todos os entregadores; 1=Interno; 2=Externo}<br>`arrBairrosSel` hidden<br>`idBairros` multi — Bairro {46 opções}<br>`arrPagamentosSel` hidden<br>`idPagamentos` multi — Pagamento {0=Todos os pagamentos; #=Cartão - Crédito; #=Cartão - Débito; #=Cartão de Crédito no App (Online); #=Dinheiro; #=Maquininha; #=PIX - copia e cola \| Empresa deve conferir; #=Pix no App (Online); #=Pagamento no balcão; #=Pagamento por QR CODE; #=Pedido Pago para o Estabelecimento; #=Pedido Pago para o Marketplace; #=PlX NA ENTREGA; #=PlX via Qr code na maquininha}<br>`dtCriacaoInicio` — Data Inicio Criação Usuário<br>`dtCriacaoFim` — Data Fim Criação Usuário<br>`arrOrigensSel` hidden<br>`idOrigens` multi — Origem {0=Todas as origens; 1=App Cliente Android; 2=App Cliente iOS; 3=App Empresa Android; 4=App Empresa iOS; 5=Web Cliente; 6=Web Painel Empresa; 7=App Empresa Windows; 8=Whatsapp; 9=PWA Web Cliente; 10=PWA Comanda; 11=API Integração V1; 12=Integração iFood; 13=API Integração V2}<br>`arrEntregasSel` hidden<br>`idEntregas` select — Entrega {0=Entregas grátis e pagas; 1=Entrega Grátis; 2=Entrega Paga}<br>`dtInicio` — Data inicial<br>`dtFim` — Data final<br>`diasSemana[]` multi — Dias da semana {1=Segunda-feira; 2=Terça-feira; 3=Quarta-feira; 4=Quinta-feira; 5=Sexta-feira; 6=Sábado; 7=Domingo}<br>`hrInicio` — Horário inicial<br>`hrFim` — Horário final<br>`idStatus` select — Status {0=TODOS; -2=PAGAMENTO NÃO REALIZADO; -1=AGUARDANDO PAGAMENTO; -2=PAGAMENTO NÃO REALIZADO; -1=AGUARDANDO PAGAMENTO; 1=VERIFICANDO; 2=NA FILA DE PREPARO; 3=EM ANDAMENTO; 4=PRONTO PRA ENTREGA; 5=SAIU PRA ENTREGA; 7=ENTREGADOR NA SUA PORTA; 6=ENTREGA REALIZADA; 9=CANCELADO}<br>`nrDias` number — Número de dias sem fazer pedido<br>`arrTpCalculoComissaoSel` hidden<br>`tpCalculoComissao` multi — Calcular comissão sobre? {0=Produtos; 1=Entregas; 2=Cupons; 3=Promoções}<br>`idFormatoSaida` select — Formato do arquivo de saída do relatório {0=Gerar relatório em formato PDF; 1=Gerar relatório em formato CSV; 2=Gerar relatório em formato Excel}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Consultar · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
  - chama: ajax_relatorio_filtro.php ← exibeCampos

<a id="l-saborphp"></a>
### sabor.php
- título: Mais Delivery \| Sabores
- vista em: loja-frutos, loja-pizzaria
- seções: Sabores dos Produtos Adicionar Sabor / Sabores dos Produtos
- **Form** `POST sabor.php` #form_actions
  - `action` hidden<br>`idSabor` hidden<br>`qtCopias` hidden
- **Form** `POST (mesma página)` #frmNivel — botões: Consultar
  - `idCategoria` select — Categoria de Produto {0=Selecione a Categoria}
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** # ID · Categoria · Subcategoria · Nome · Valor · Ativo? · Ação (0 linhas)
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Consultar .form-control · Adicionar Sabor .addRegistro · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/sabor.js`** ops: 27 $(idSabor,flgAtivo) · 15 $(idRestaurante,idCategoria) · 37 $(idSabor,vlItem) · 50 $(idSabor,dsImagem) · 167 trataSalvar() · 81 confirmaSalvar(idRestaurante)
  - `action`: new, edt, cp, del

<a id="l-sub_categoria_itemphp"></a>
### sub_categoria_item.php
- título: Mais Delivery \| Subcategorias
- vista em: loja-frutos, loja-pizzaria
- seções: Subcategoria Adicionar Subcategoria / Subcategoria
- **Form** `POST sub_categoria_item.php` #form_actions
  - `action` hidden<br>`idCategoria` hidden<br>`idSubCategoria` hidden<br>`dsSubCategoria` hidden
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Tabela** Status · Categoria · Subcategoria · Ação (4000 linhas)<br>  controles por linha: button:submit .edtSugeridos
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Adicionar Subcategoria .addRegistro · Sugeridos .edtSugeridos
- **JS `assets/js/sub_categoria_item.js`** ops: 167 $() · 122 $(idSubCategoria,dsImagem)
  - chama: cardapio_sugeridos.php?id&tp ← $
  - `action`: new, edt, del

<a id="l-tele_entregaphp"></a>
### tele_entrega.php
- título: Mais Delivery \| Novo Pedido
- vista em: loja-frutos
- seções: Novo Pedido
- **Form** `POST (mesma página)` #frmCadastro multipart — botões: Enviar Pedido
  - `idEndereco` hidden<br>`nrLatitude` hidden<br>`nrLongitude` hidden<br>`idRestaurante` select {2 opções}<br>`nrDDD` (máx 3)<br>`nrTelefone`<br>`dsNome`<br>`idEntrega` select {1=Delivery; 2=Retirada no Balcão}<br>`enderecos` select {}<br>`idCidade` hidden<br>`dsCidade` hidden<br>`idBairro` select {0=Selecione}<br>`dsRua`<br>`nrRua`<br>`dsComplemento`<br>`dsReferencia`<br>`vlPedido` (máx 7)<br>`vlEntrega` (máx 7)<br>`vlTotal` (máx 7)<br>`flgPedidoPago` select {0=Não foi pago; 1=Pedido Pago para o Estabelecimento; 2=Pedido Pago para o Marketplace}<br>`idPagamento` select {0=Selecione o estabelecimento primeiro}<br>`idSituacao` select {1=VERIFICANDO; 2=NA FILA DE PREPARO; 3=EM ANDAMENTO; 4=PRONTO PRA ENTREGA; 6=ENTREGA REALIZADA}<br>`dsObservacao` textarea
- **Modal** divAvisosPainel `#divAvisosPainel` — botões: ×Close, Fechar, Aceitar, Marca como lido
  - `#inputAvisosPainelID` hidden<br>`inputAvisosPainelTermo` checkbox=1
- **Botões**: ×Close .close · Fechar · Aceitar · Marca como lido · Voltar · Enviar Pedido · ? .md-panel-footer-info-mobile [mdExibeAvisoFinanceiroRodape(event);]
- **JS `assets/js/tele_entrega.js`** ops: 29 trazUsuario(nrDDD,nrTelefone,flgValidaCidade) · 28 trazerFormaPagamento(idRestaurante) · 154 carregaBairrosPorCidade(idCidade) · 105 obtemEntregaSemEndereco(idRestaurante,dsCidade,dsEstado,nrLatitude,nrLongitude,dsRua,nrRua,idBairro,flgPedidoLancado) · 68 obtemEntregaBairroOuKM(idRestaurante,idEndereco,flgPedidoLancado) · 58 enviaPedido(idRestaurante,dsNome,nrDDD,nrTelefone,idCidade,nrLatitude,nrLongitude,dsRua,nrRua,dsComplemento,dsReferencia,idBairro)
  - chama: pedidos.php ← success

<a id="operacoes"></a>
## Operações `ajax_operacao.php` (POST, campo `nrOperacao`)

| op | função(ões) no JS | parâmetros | onde aparece |
|---|---|---|---|
| 1 | buscaAtendimentos(pr_pagina, pr_limit, pr_draw, pr_callback, pr_cursor = null, pr_indo_para_frente = true)<br>buscarUsuarios() | nrLimit, cursor, direcao, next, idMarketplace, idSituacao, idPedido | assets/js/atendimento_suporte.js, assets/js/entregadores_mapa.js |
| 2 | enviaChamadoSuporte()<br>buscarEntregadores() | dsCategoria, dsNomeAbertura, nrDDD, nrTelefone, dsEstabelecimento, idPedido, dsDescricao, dsArquivos, idMarketplace, idEntregador | assets/js/atendimento_suporte.js, assets/js/entregadores_mapa.js |
| 3 | buscarEstabelecimentos() | idMarketplace, idSituacao, idPedido | assets/js/entregadores_mapa.js |
| 4 | buscarProntosPraEntrega() | idMarketplace | assets/js/entregadores_mapa.js |
| 5 | enviarArquivos()<br>on(change,textarea[name=) | idMarketplace, dsNomeArquivo, dsTipoMime, idAvaliacao, dsResposta | assets/js/atendimento_suporte.js, assets/js/avaliacao.js |
| 7 | $(.btnRemoverImagem).on(click) | idCardapio, dsImagem | assets/js/produto_detalhe.js |
| 8 | trataEventosBairro() |  | assets/js/valores_entrega_gerencial.js, assets/js/configuracao.js |
| 9 | $(#divBairro).on(click,.delRegistro) | idEntrega | assets/js/valores_entrega_gerencial.js, assets/js/configuracao.js |
| 10 | $(#divQuilometragem).on(click,.delRegistro) | idEntrega | assets/js/valores_entrega_gerencial.js, assets/js/configuracao.js |
| 11 | alteraEntregador(idEntregador, idPedido, flgConfirmou) | idPedido, idEntregador, flgAdministrador, flgConfirmou | assets/js/pedidosk.js |
| 12 | $(#idCategoria, #idSubCategoria).change | idRestaurante, idCategoria, idSubCategoria | assets/js/promocao.js |
| 13 | success(data)<br>trazerSabores() | idRestaurante, idCategoria, idSubCategoria, flgAtivo | assets/js/promocao.js, assets/js/produto_detalhe.js |
| 14 | removeCardapioItem(objColumn, idPromocao, idCardapio, idSabor) | idPromocao, idCardapio, idSabor | assets/js/promocao.js |
| 15 | $(#btnSalva).click<br>$(#idCategoria).change<br>trataCategoria() | idRestaurante, idCategoria | assets/js/sabor.js, assets/js/adicional.js, assets/js/nivel_cardapio.js, assets/js/promocao.js, assets/js/produto_detalhe.js |
| 16 | $(#idCategoria).on(change) | idMarketplace, idCidade, idCategoria | restaurante_ordem.php (inline) |
| 17 | mudaStatusCobranca(pr_flg_pago_sel, pr_id_cobranca, pr_id_restaurante, pr_flg_pago, pr_flg_ativar) | idCobranca, idRestaurante, flgPago, flgAtivar | assets/js/cobrancas.js |
| 18 | mudarStatusEstabelecimento(pr_id_restaurante, vr_flg_situacao)<br>mudarStatusEstabelecimento(pr_id_restaurante, vr_id_status) | idRestaurante, flgAtivo | assets/js/lista_estabelecimentos.js, assets/js/estabelecimentos_recebidos.js, assets/js/estabelecimentos_nacionais.js |
| 22 | $(#btnLimpar).click |  | assets/js/marketplace.js |
| 23 | buscarPedidos24H() | dtInicial | assets/js/mapa_cidades.js |
| 24 | mudaSituacaoPedido(pr_el, old_idSituacao, idPedido, idSituacao, idRestaurante, pr_flg_detalhe, pr_idPagamentoForma, pr_idRefundPagOn, pr_idM | idPedido, idSituacao, idRestaurante, flgAdministrador, dsMotivo, idFuncionario, flgPix, idMotivo | assets/js/pedidosk.js |
| 26 | $(.dataTables-example).on(click,.flgAtivo) | idNivelCardapio, flgAtivo, idOpcaoNivel | assets/js/nivel_cardapio.js, assets/js/opcoes_nivel_cardapio.js |
| 27 | alteraStatus(pr_id_cardapio , pr_flg_ativo, $checkbox)<br>$(.dataTables-example).on(click,.flgAtivo) | idCardapio, flgAtivo, idSabor, idAdicional | assets/js/produtos.js, assets/js/sabor.js, assets/js/adicional.js |
| 28 | trazerFormaPagamento(pr_id_restaurante) | idRestaurante | assets/js/tele_entrega.js |
| 29 | trazUsuario(pr_nr_dd, pr_nr_telefone) | nrDDD, nrTelefone, flgValidaCidade | assets/js/tele_entrega.js |
| 31 | alteraValor(pr_id_cardapio , pr_vl_item) | idCardapio, vlItem | assets/js/produtos.js |
| 32 | trazProdutos(pr_id_restaurante) | idRestaurante | assets/js/banner.js, assets/js/notificacao.js |
| 37 | $(.dataTables-example).on(change,.vlItemListagem) | idSabor, vlItem | assets/js/sabor.js |
| 38 | $(.dataTables-example).on(change,.vlItemListagem) | idOpcaoNivel, vlItem | assets/js/opcoes_nivel_cardapio.js |
| 39 | $(.dataTables-example).on(change,.vlItemListagem) | idAdicional, vlItem | assets/js/adicional.js |
| 45 | trazerAdicionais() | idCategoria, idSubCategoria | assets/js/produto_detalhe.js |
| 46 | $(#tbCobrancas).on(click,.lemMensagem) | idCobranca | assets/js/cobrancas.js |
| 47 | onchange_funcionario(e) | idRestaurante, idFuncionarioCobranca | assets/js/cobrancas.js |
| 48 | coordenadasCidade() | dsCidade | assets/js/entregadores_mapa.js |
| 50 | $(.btnRemoverImagem).on(click) | idSabor, dsImagem | assets/js/sabor.js |
| 51 | $(.btnRemoverImagem).on(click) | idAdicional, dsImagem | assets/js/adicional.js |
| 52 | $(.btnRemoverImagem).on(click) | idOpcaoNivel, dsImagem | assets/js/opcoes_nivel_cardapio.js |
| 58 | enviaPedido() | idRestaurante, dsNome, nrDDD, nrTelefone, idCidade, nrLatitude, nrLongitude, dsRua, nrRua, dsComplemento, dsReferencia, idBairro | assets/js/tele_entrega.js |
| 63 | alteraflag(pr_id_mesa, e) | idMesa, flgAtivo, 1 | assets/js/mesas.js |
| 64 | $(#frmCadastro).submit<br>validaHorarios() | dsAbertura, dsNomeTela | assets/js/banner.js, assets/js/bairro.js, assets/js/cupom.js, assets/js/marketplace.js, assets/js/estabelecimento.js, assets/js/promocao.js, assets/js/produto_detalhe.js |
| 65 | verificaPedidoComanda(pr_id_comanda) | idComanda | assets/js/pedidosk.js |
| 66 | fechaComanda(pr_id_comanda) | idComanda | assets/js/pedidosk.js |
| 68 | obtemEntregaBairroOuKM(pr_id_endereco) | idRestaurante, idEndereco, flgPedidoLancado | assets/js/tele_entrega.js |
| 75 | buscaSegmento(pr_ds_categoria) | dsCategoria | assets/js/segmentos.js |
| 76 | mudarStatusEntregador(pr_id_entregador, vr_flg_ativo) | idEntregador, flgAtivoEntregador | assets/js/entregador.js |
| 81 | confirmaSalvar()<br>confirmaDados()<br>$(#btnSalva).click | idRestaurante | assets/js/sabor.js, assets/js/adicional.js, assets/js/nivel_cardapio.js, assets/js/opcoes_nivel_cardapio.js, assets/js/produto_detalhe.js |
| 82 | validaCoordenadasCidade(pr_nr_latitude, pr_nr_longitude , pr_id_cidade, callback) | nrLatitude, nrLongitude, idCidade | assets/js/validacao.js |
| 85 | onchange_seleciona_empresa(obj) | idRestaurante, arrEmpresaIntegrada | assets/js/marketplace_api.js |
| 88 | $(#dsCep).on(blur) | dsCep | assets/js/entregador.js, assets/js/marketplace.js, assets/js/estabelecimento.js |
| 89 | verificaBairroExiste(pr_ds_bairro, pr_id_cidade)<br>buscaBairros(pr_id_cidade, pr_ds_bairro_sel = '') | dsBairro, idCidade | assets/js/bairro.js, assets/js/entregador.js |
| 93 | trazerPremiacaoGanhador() | idPremiacao, tpPremiacao | assets/js/premiacao.js |
| 94 | realizaSorteio() | idPremiacao | assets/js/premiacao.js |
| 97 | verificaSeMudouEmail(idLoginAcesso, dsEmail) |  | assets/js/marketplace_acesso.js |
| 98 | enviarCodigoValidacao(dsNome, dsEmail) |  | assets/js/marketplace_acesso.js |
| 99 | buscarSituacaoPedidos() |  | assets/js/pedidosk.js |
| 100 | buscaPedidos(pr_situacao, pr_dt_inicio, pr_dt_fim, pr_flg_alertar_app_windows)<br>buscaDetalhesPedido(pr_id_pedido) | dtInicio, dtFim, idPedido | assets/js/pedidosk.js |
| 101 | mudarTipolistagem(pr_tipo_tela_pedido) | flgTipoTelaPedido, idMarketplace | assets/js/pedidosk.js |
| 102 | buscaEntregadoresOnline() |  | assets/js/pedidosk.js |
| 105 | obtemEntregaSemEndereco() | idRestaurante, dsCidade, dsEstado, nrLatitude, nrLongitude, dsRua, nrRua, idBairro, flgPedidoLancado | assets/js/tele_entrega.js |
| 106 | autenticarGoogleDrive(pr_auto_autenticar = false) |  | assets/js/entregador.js, assets/js/marketplace.js |
| 107 | verificarAutenticacao(authWindow) |  | assets/js/entregador.js, assets/js/marketplace.js |
| 108 | listaArquivos() | idEntregador | assets/js/entregador.js |
| 109 | uploadArquivo() |  | assets/js/entregador.js |
| 110 | removerAcessoGoogleDrive() |  | assets/js/entregador.js, assets/js/marketplace.js |
| 111 | removeArquivo(pr_id_arquivo) | idArquivo | assets/js/entregador.js |
| 112 | salvarWhatsappGrupo() | dsGrupoWhatsapp | assets/js/whatsapp_grupo.js |
| 113 | alteraEstoque(pr_id_cardapio , pr_qt_estoque) | idCardapio, qtEstoque | assets/js/produtos.js |
| 114 | mudarCpfObrigatorio(e, pr_id_restaurante) | idRestaurante, flgCpfObrigato | assets/js/lista_estabelecimentos.js |
| 119 | verificaApiWhatsAppOnline() |  | assets/js/entregador.js, assets/js/marketplace.js, assets/js/marketplace_acesso.js, assets/js/funcionario.js |
| 122 | $(.btnRemoverImagem).on(click) | idSubCategoria, dsImagem | assets/js/sub_categoria_item.js |
| 129 | geraAccessToken(pr_id_integracao , pr_ds_authorizationCode, pr_ds_authorizationCodeVerifier) | idIntegracao, dsAuthorizationCode, dsAuthorizationCodeVerifier | assets/js/integracoes.js |
| 130 | desativarIntegracaoIFood() | idRestaurante, idIntegracao | assets/js/integracoes.js |
| 131 | ativarIntegracaoIFood() | idRestaurante, idIntegracao | assets/js/integracoes.js |
| 132 | removerIntegracaoIFood() | idIntegracao | assets/js/integracoes.js |
| 134 |  | idRestaurante | assets/js/integracoes.js |
| 139 | buscaSugestaoFeriados() |  | assets/js/feriados.js |
| 140 | insereFeriado(pr_ds_feriado, pr_dt_feriado, pr_flg_ativo, pr_tp_bloqueio) | dsFeriado, dtFeriado, tpBloqueio, flgAtivo | assets/js/feriados.js |
| 141 | confirmaExclusao(pr_id_marketplace_feriado)<br>mudarStatus(pr_this, pr_id_marketplace_feriado, pr_flg_status) | flgAtivo, idMarketplaceFeriado | assets/js/feriados.js |
| 142 | ativarTodosEstabelecimentos() |  | assets/js/lista_estabelecimentos.js |
| 143 | desativarTodosEstabelecimentos() |  | assets/js/lista_estabelecimentos.js |
| 144 | mudarTpBloqueio(pr_this, pr_id_marketplace_feriado, pr_tp_bloqueio) | tpBloqueio | assets/js/feriados.js |
| 150 | verificaExternoCodeExiste() | idRestaurante, dsExternoCode | assets/js/estabelecimento.js |
| 151 | alteraExternalCode(pr_id_cardapio, pr_id_restaurante, pr_ds_externo_code) | idCardapio, dsExternoCode, idRestaurante | assets/js/produtos.js |
| 152 | alteraExternalCode(pr_id_opcao_nivel, pr_id_restaurante, pr_ds_externo_code) | idOpcaoNivel, dsExternoCode, idRestaurante | assets/js/opcoes_nivel_cardapio.js |
| 153 | alteraOrdem(pr_id_cardapio , pr_nr_ordem) | idCardapio, nrOrdem | assets/js/produtos.js |
| 154 | carregaBairrosPorCidade() | idCidade | assets/js/tele_entrega.js |
| 155 | on(change,.uploadNotaFiscal) |  | assets/js/cobrancas.js |
| 156 | on(click,.btnRemoverImagem) | idCobranca, dsImagem | assets/js/cobrancas.js |
| 157 | atualizaSituacaoPagamentoOnlinePedido(pr_id_pedido) | idPedido | assets/js/pedidosk.js |
| 158 | $(.dltTodosBairros).on(click) | idRestaurante, arrIdEntregas | assets/js/valores_entrega_gerencial.js, assets/js/configuracao.js |
| 159 | on(click,.dltTodosKm) | arrIdEntregas, idRestaurante | assets/js/valores_entrega_gerencial.js, assets/js/configuracao.js |
| 160 | validarCodigoTelefoneServidor(idFuncionario, nrDDD, nrTelefone, nrCodigo) |  | assets/js/funcionario.js |
| 161 | validarCodigoTelefoneServidor(idEntregador, nrDDD, nrTelefone, nrCodigo) |  | assets/js/entregador.js |
| 162 | validarCodigoTelefoneServidor(idLoginAcesso, nrDDD, nrTelefone, nrCodigo) |  | assets/js/marketplace_acesso.js |
| 163 | validarCodigoTelefoneServidor(idMarketplace, nrDDD, nrTelefone, nrCodigo) |  | assets/js/marketplace.js |
| 164 | verificaSeMudouTelefone(idLoginAcesso, nrDDD, nrTelefone) |  | assets/js/marketplace_acesso.js |
| 165 | enviarCodigoValidacaoTelefone(idLoginAcesso, tpEnvio, nrDDD, nrTelefone) |  | assets/js/marketplace_acesso.js |
| 166 | trazUsuariosParticipantes() | idPremiacao, tpPremiacao, qtPaginas | assets/js/premiacao.js |
| 167 | salvaRegistro()<br>$(#btnSalva).click<br>validaNotificacao()<br>validaInfos()<br>trataSalvar()<br>validaSalvar() |  | assets/js/banner.js, assets/js/sub_categoria_item.js, assets/js/notificacao.js, assets/js/email_divulgacao.js, assets/js/sabor.js, assets/js/adicional.js, assets/js/opcoes_nivel_cardapio.js, assets/js/promocao.js … |
| 170 | abrePedidosUsuario(pr_id_usuario, pr_obj_link) | idPremiacao, idUsuario | assets/js/premiacao.js |
| 171 | verificaSeParticipaPromocao(pr_id_cardapio)<br>verificaSeParticipaPromocao() | idCardapio | assets/js/produtos.js, assets/js/produto_detalhe.js |
| 172 | sorteiaPremios(pr_arr_premios) | arrPremios | assets/js/premiacao.js |
| 173 | on(change,textarea[name=) | idRestaurante, dsObservacao | assets/js/estabelecimentos_recebidos.js |
| 174 | alteraStatus(pr_id_categoria , pr_flg_ativo, $checkbox) | idCategoria, flgAtivo | assets/js/categoria_item.js |
| 175 | alteraExternalCode(pr_id_nivel_cardapio, pr_id_restaurante, pr_ds_externo_code) | idNivelCardapio, dsExternoCode, idRestaurante | assets/js/nivel_cardapio.js |
| 176 | on(change,.chk-entrega) | idGanhadoresSorteio | assets/js/premiacao.js |
| 177 | verificaBebidaProduto() | dsNome, dsCategoria, dsSubCategoria | assets/js/produto_detalhe.js |
| 178 | excluiFuncionario(pr_id_funcionario, pr_id_restaurante) | idRestaurante | assets/js/funcionario.js |
| 179 | alteraTipoNivel(pr_id_nivel_cardapio, pr_id_restaurante, pr_tp_nivel, pr_valor_antigo) | idNivelCardapio, tpNivel, idRestaurante | assets/js/nivel_cardapio.js |
| 180 | alteraEstoque(pr_id_opcao_nivel , pr_qt_estoque) | idOpcaoNivel, qtEstoque | assets/js/opcoes_nivel_cardapio.js |
| 206 | verificaBebidaNivel(pr_obj_campo) | dsNome | assets/js/produto_detalhe.js |
| 207 | RemoveNivel(pr_obj_linha) | idNivelCardapio | assets/js/produto_detalhe.js |
| 208 | RemoveOpcaoNivel(pr_obj_linha) | idOpcaoNivel | assets/js/produto_detalhe.js |
| 209 | RemoveSabor(pr_obj_linha) | idSabor | assets/js/produto_detalhe.js |
| 210 | RemoveAdicional(pr_obj_linha) | idAdicional | assets/js/produto_detalhe.js |
| 212 | alteraStatus(pr_id_premiacao , pr_flg_ativo, $checkbox) | idPremiacao, flgAtivo | assets/js/premiacao.js |
| 214 | onchange_receber_por(e) | idCobranca, flgReceberOnline | assets/js/cobrancas.js |
| 215 | realizaEstornoCashBack(pr_id_extrato) | idExtrato | assets/js/configuracao_cb_ig.js |

## Fila não visitada / bloqueada de propósito
- gerencial: index.php, dashboard.php, pedidos.php, banners.php, segmentos.php, lista_estabelecimentos.php, bairro.php, valores_entregas_gerencial.php, categoria_item.php, sub_categoria_item.php, forma_pagamento.php, entregador.php, entregadores_em_analise.php, contratos.php, cupom.php, motivo_cancelamento_pedido.php, usuario.php, valor_comissao.php, cobrancas_avulsa.php, cobrancas.php, cobrancas_avencer.php, cobrancas_pagas.php, cobrancas_vencidas.php, marketplace.php, relatorio.php, avisos_estabelecimentos.php, lista_notificacoes.php, sms_divulgacao.php, email_divulgacao.php, estabelecimentos_recebidos.php, estabelecimentos_nacionais.php, estabelecimentos_desarquivar.php, marketplace_acesso.php, marketplace_api.php, minhas_notas.php, feriados.php, configuracao_cb_ig.php, premiacao.php, whatsapp_grupo.php, carrinhos_abandonados.php, contratos_texto.php, contratos_texto_restaurante.php, mapa_cidades.php, atendimento_suporte.php
- loja-frutos: 
- loja-pizzaria: index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, categoria_ordem.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php, index.php, dashboard.php, pedidos.php, estabelecimento.php, cupom.php, funcionario.php, entregador.php, mesas.php, avaliacao.php, relatorio.php, aviso_cobranca.php, listar_cobrancas_estabelecimento.php, integracoes.php, compartilhar_loja.php
