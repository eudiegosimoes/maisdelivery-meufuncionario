// Base de conhecimento do Meu Funcionário: "pedido do franqueado -> caminho no painel do MD".
// É aqui que mora o valor do produto. Fica só no servidor; o plugin do cliente nunca recebe o arquivo inteiro.
// Fonte: docs/MAPA-DO-PAINEL.md e skills (varredura e testes de 24/11/2026).

export const RECEITAS = [
  {
    id: 'preco-produto',
    titulo: 'Trocar o preço de um produto',
    palavras: ['preco', 'preço', 'valor', 'trocar preco', 'reajuste', 'aumentar', 'baixar'],
    onde: 'Painel do lojista (dentro da loja)',
    passos: [
      'Entrar na loja (link da loja no pedidosk.php do gerencial; 6 s entre trocas de loja).',
      'Achar o idCardapio na lista produtos.php (botão .edtRegistro, atributo idCardapio).',
      'POST ajax_operacao.php nrOperacao=31, idCardapio, vlItem="12,50" (sempre com vírgula).',
      'Conferir lendo produtos.php de novo (coluna Valor).',
    ],
    cuidados: ['Valor com vírgula. Com ponto o painel multiplica por 100.'],
  },
  {
    id: 'ativar-produto',
    titulo: 'Pausar / ativar produto (ou vários)',
    palavras: ['pausar', 'desativar', 'ativar', 'acabou', 'esgotado', 'tirar do cardapio', 'sem estoque'],
    onde: 'Painel do lojista',
    passos: [
      'Um produto: op 171 (idCardapio) para saber se está em promoção; depois op 27 (idCardapio, flgAtivo 0/1).',
      'Vários: POST produtos.php action="Ativa/DesativaProduto", idCardapio[] (um por produto), flgAtivaDesativa 0/1.',
      'Conferir as colunas Ativo e Disponível em produtos.php.',
    ],
    cuidados: ['"Disponível: Não" também acontece com estoque 0 ou com horário do produto fora do dia.'],
  },
  {
    id: 'estoque',
    titulo: 'Produto aparece como indisponível / estoque',
    palavras: ['indisponivel', 'indisponível', 'nao aparece', 'não aparece', 'estoque', 'sumiu do app'],
    onde: 'Painel do lojista',
    passos: [
      'Ver em produtos.php as colunas Estoque, Ativo e Disponível.',
      'Estoque 0 ou vazio = indisponível. Ajustar com op 113 (idCardapio, qtEstoque="999999").',
      'Se o produto tem horário próprio (sun_1_open…sat_2_close), ele só vende nesses dias/horas: limpar os horários em produto_detalhe.php (action=edt → salvar sem dsImagem).',
      'Opção de nível com controle de estoque: op 180 (idOpcaoNivel, qtEstoque).',
    ],
    cuidados: ['Padrão das lojas: 999999 = sem limite.'],
  },
  {
    id: 'pizza-meio-a-meio',
    titulo: 'Criar pizza com sabores (meio a meio) / "escolha X sabores"',
    palavras: ['pizza', 'sabores', 'meio a meio', 'escolha 2 sabores', 'sabor'],
    onde: 'Painel do lojista → Produto → Níveis Cardápio',
    passos: [
      'Criar/abrir o produto (ex.: "Pizza Grande") e ligar flgNiveis=1 nele (não liga sozinho).',
      'nivel_cardapio.php action=new: dsTitulo "Escolha 2 sabores", nivelPor=2 (Produto), idCategoria=0, idSubCategoria=0, idCardapio=<id>, qtMinOpcao=2, qtMaxOpcao=2, flgTipoPreco=3 (média e substitui) ou 5 (maior valor e substitui), flgMostrarPreco=1, flgAtivo=1.',
      'opcoes_nivel_cardapio.php (multipart) action=ins: idNivelCardapio, dsNome do sabor, vlItem com vírgula, flgAtivo=1. Uma por sabor.',
      'Conferir: nivel_cardapio.php mostra o produto na coluna Produto; opções com POST idNivelFiltro.',
    ],
    cuidados: [
      'Nível por produto com idCategoria preenchida vira nível da CATEGORIA inteira.',
      'As telas antigas Sabores/Adicional quase não são usadas: o padrão é nível.',
      'Copiar o produto NÃO copia os níveis; copiar o nível (action=cp) copia as opções.',
    ],
  },
  {
    id: 'adicionais',
    titulo: 'Adicionais pagos / "escolha até N" (açaí, lanche)',
    palavras: ['adicional', 'adicionais', 'acai', 'açaí', 'complemento', 'escolha ate', 'turbinar', 'monte seu'],
    onde: 'Painel do lojista → Níveis Cardápio',
    passos: [
      'Nível por produto (nivelPor=2, idCategoria=0) ou por categoria (nivelPor=1, idCardapio=0) se vale para todos.',
      'qtMinOpcao=0, qtMaxOpcao=N, flgTipoPreco=0 (somar ao produto).',
      'Opções em opcoes_nivel_cardapio.php; preço rápido op 38, ativo op 26, estoque op 180.',
    ],
    cuidados: ['Se flgControlaEstoque=1, as opções nascem com estoque 0 (indisponíveis): ajustar.'],
  },
  {
    id: 'subir-cardapio',
    titulo: 'Subir cardápio completo de uma loja',
    palavras: ['subir cardapio', 'cadastrar cardapio', 'cardápio novo', 'cardapio', 'panfleto', 'anota ai', 'saipos', 'menudino'],
    onde: 'Painel do lojista (entrar na loja)',
    passos: [
      'Montar o JSON no formato [[categoria,[[nome,preço,descrição,bebida(0/1),níveis,foto]]]] e validar com a ferramenta md_validar_cardapio.',
      'Categorias com sufixo da loja ("Lanches - Nome da Loja"): as categorias são da cidade inteira.',
      'Para cada produto: produto_detalhe.php action=ins (multipart), vlItem com vírgula, qtEstoque=999999, horários vazios, níveis juntos (flgSalvaNiveis=1).',
      'Ordem das categorias: POST produtos.php categoriaOrdem=[{"id":..},…] (lista completa).',
      'Fotos: editar cada produto com dsImagem (JPEG 800×800); sem dsImagem a foto atual fica.',
      'Conferir lendo produtos.php e nivel_cardapio.php.',
    ],
    cuidados: ['Nome até 45 caracteres.', 'Produto sem preço: R$ 0,00 e inativo.', 'Não inventar sabor/produto: avisar o que foi deduzido.'],
  },
  {
    id: 'taxas',
    titulo: 'Taxas de entrega por bairro / taxa mínima',
    palavras: ['taxa', 'entrega', 'bairro', 'frete', 'taxa minima', 'taxa mínima', 'valor da entrega'],
    onde: 'Loja: configuracao.php · Cidade: valores_entregas_gerencial.php',
    passos: [
      'Ler o form #form_post de configuracao.php inteiro (FormData).',
      'Reenviar TODAS as vlEntrega[][<linha>] com vírgula (o form traz "6.00").',
      'Bairro novo na loja: repostar com nrBairros[] + vlEntrega[] novos. Remover linha: op 9 (idEntrega).',
      'Conferir lendo de novo e comparando.',
    ],
    cuidados: ['BUG confirmado: "4.00" com ponto grava R$ 400,00.', 'Uma loja por vez, 6 s entre lojas.'],
  },
  {
    id: 'abrir-fechar',
    titulo: 'Abrir / fechar / inativar loja',
    palavras: ['abrir loja', 'fechar loja', 'status da loja', 'inativar loja', 'loja fechada'],
    onde: 'Gerencial ou lojista',
    passos: ['op 18: idRestaurante, flgAtivo 1 Aberto / 2 Fechado / 0 Inativo.', 'Conferir em estabelecimento.php (flgAtivo).'],
    cuidados: ['Nunca abrir loja sem ordem do lojista.', 'Ops 142/143 ativam/desativam TODAS as lojas da cidade: nunca usar sem ordem expressa.'],
  },
  {
    id: 'cadastrar-loja',
    titulo: 'Cadastrar loja nova',
    palavras: ['loja nova', 'cadastrar loja', 'novo estabelecimento', 'empresa nova', 'chegou uma empresa'],
    onde: 'Gerencial',
    passos: [
      'Conferir se já existe: lista_estabelecimentos.php, estabelecimentos_recebidos.php (cadastradas sozinhas) e estabelecimentos_nacionais.php (redes, botão OBTER).',
      'estabelecimento.php action=new: nome, descrição, e-mail, DDD/telefone, segmentos (idCategoria_1..4), endereço, nrLatLong, horários (3 turnos/dia), logo PNG 800×800, flgAtivo=0.',
      'Integrador: op 83 (idMarketplace, idRestaurante, flgApi=1) e op 85 (arrEmpresaIntegrada[]=38).',
      'Taxas copiadas de uma vizinha; pagamentos; status Fechado (op 18, 2).',
    ],
    cuidados: ['Horário em todos os dias; dia fechado = 00:01–00:02 e limpar depois.'],
  },
  {
    id: 'motoboy',
    titulo: 'Cadastrar / liberar motoboy (entregador)',
    palavras: ['motoboy', 'entregador', 'liberar motoboy', 'ativar entregador', 'cadastrar entregador'],
    onde: 'Gerencial → Cadastros → Entregadores (externo, atende a cidade)',
    passos: [
      'Novo: preencher nome, e-mail (único entre funcionários e entregadores), DDD/telefone, cidade, status "Em análise". A SENHA é digitada pelo motoboy ou pelo franqueado.',
      'Filtros do externo: lojas permitidas/proibidas, pagamentos que não aceita, bairros (vazio = tudo).',
      'Liberar/bloquear: op 76 (idEntregador, flgAtivoEntregador 1 Online / 2 Offline / 0 Inativo / -2 Em análise).',
    ],
    cuidados: [
      'Inativo some de todas as listas: anotar o ID antes.',
      'Editar exige validar o telefone por SMS/WhatsApp (código vai para o motoboy).',
      'Listas com títulos trocados: entregador.php = ativos; entregadores_em_analise.php = todos.',
      'Entregador interno (da loja) só com tpEntregadores=1 na configuração da loja.',
    ],
  },
  {
    id: 'promocao',
    titulo: 'Criar promoção',
    palavras: ['promocao', 'promoção', 'oferta', 'desconto em produto', 'combo promocional'],
    onde: 'Lojista → Promoções → promocao_detalhe.php',
    passos: [
      'Exige imagem, pelo menos 1 produto e preço menor que o original.',
      'Itens: idCardapio[], idSabor[], qtItem[], vlNormal[], vlDesconto[] — valores COM VÍRGULA.',
      'Datas dd/mm/aaaa, horas hh:mm; totais vlNormalTotal/vlDescontoTotal com vírgula.',
    ],
    cuidados: ['Itens com ponto viram ×100 (13.90 → 1390).'],
  },
  {
    id: 'cupom',
    titulo: 'Criar cupom',
    palavras: ['cupom', 'codigo de desconto', 'código promocional'],
    onde: 'Lojista (só a loja) ou gerencial (todas as lojas)',
    passos: ['cupom.php action=ins: dsCupom, qtUsoLimite, idTpDesconto (1 %, 0 R$, 2 frete grátis), vlDesconto com vírgula, datas, flgAtivo.'],
    cuidados: ['Cupom da cidade vale para todas as lojas: confirmar com o franqueado.'],
  },
  {
    id: 'pedido-situacao',
    titulo: 'Mudar situação / cancelar pedido',
    palavras: ['pedido', 'cancelar pedido', 'situacao do pedido', 'status do pedido', 'pedido travado'],
    onde: 'detalhes_pedido.php?id=<base64(idPedido)>',
    passos: [
      'O select Situação grava na hora (op 24) e recarrega.',
      'Cancelar: motivo da lista + texto com 20+ caracteres (o cliente vê).',
    ],
    cuidados: ['Mexe com cliente e dinheiro: sempre pedir confirmação.'],
  },
  {
    id: 'relatorio',
    titulo: 'Gerar relatório',
    palavras: ['relatorio', 'relatório', 'vendas', 'mais vendidos', 'cancelados', 'quanto vendeu'],
    onde: 'relatorio.php',
    passos: [
      'POST só com hdnRelatorioSel, idRelatorio, dtInicio, dtFim (dd/mm/aaaa), hrInicio, hrFim.',
      'Período máximo de 1 ano.',
      'Relatórios 23, 24 e 40 só saem como arquivo (idFormatoSaida 0 PDF, 1 CSV, 2 Excel).',
    ],
    cuidados: ['Mandar outros filtros com "0" zera o resultado.'],
  },
  {
    id: 'funcionario',
    titulo: 'Funcionário da loja e permissões',
    palavras: ['funcionario', 'funcionário', 'permissao', 'permissão', 'acesso da loja', 'garcom'],
    onde: 'Lojista → Configurações → Funcionários',
    passos: [
      'Criar: nome, e-mail único, DDD/telefone; a SENHA é digitada pelo franqueado.',
      'Permissões: funcionario_permissoes.php?id=<b64>, POST arr_telas_sistema_sel e arr_relatorios_sistema_sel (ids com vírgula). Novo nasce com todas.',
    ],
    cuidados: ['Excluir o último funcionário ativo tira o acesso da loja (op 178 avisa).', 'O Chrome autopreenche a senha salva: limpar o campo.'],
  },
];

const norm = (t) =>
  String(t ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

export function buscarReceita(pedido) {
  const p = norm(pedido);
  const notas = RECEITAS.map((r) => {
    let n = 0;
    for (const w of r.palavras) if (p.includes(norm(w))) n += norm(w).split(' ').length + 1;
    for (const w of norm(r.titulo).split(/\W+/)) if (w.length > 3 && p.includes(w)) n += 1;
    return { r, n };
  })
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  return notas;
}

export function formatarReceita(r) {
  return [
    `# ${r.titulo}`,
    `Onde: ${r.onde}`,
    '',
    'Passos:',
    ...r.passos.map((s, i) => `${i + 1}. ${s}`),
    '',
    'Cuidados:',
    ...r.cuidados.map((c) => `- ${c}`),
    '',
    'Regras gerais: uma loja por vez (~6 s entre trocas), nunca digitar senha, nunca imprimir links login.php?index=, perguntar antes de excluir/publicar/mexer em dinheiro, conferir lendo de novo depois de gravar.',
  ].join('\n');
}
