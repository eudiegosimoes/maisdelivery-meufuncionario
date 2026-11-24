---
name: cardapio
description: Monta e sobe o cardápio de uma loja no Mais Delivery — a partir de panfleto, foto, PDF ou de outra plataforma (Anota AI, Saipos, MenuDino, mandarpedido, DotFood) — com fotos, descrições e ordem das categorias. Use para "sobe o cardápio", "troca o cardápio", "coloca as fotos" ou "as descrições podem ser essas".
---

# Cardápio

> Rascunho inicial: completar com o tour do painel.

## Formato (MD)
`[ ["Categoria", [ ["Nome", preco, "descrição", 1, [niveis]] ] ] ]` — detalhes no PLAYBOOK (etapa 2).

## Fontes
- Panfleto/foto/PDF: ler e montar o JSON à mão. Nomes com até 45 caracteres.
- Plataformas: `ferramentas/extratores/*.mjs`.

## Subir
1. `MD.entrar(id, inicioDoNome)` e `MD.subir(id, 'Nome da Loja', cardapio, R)`.
2. Ordem das categorias: POST `produtos.php` com `categoriaOrdem=[{"id":..}]` (o MD cai na alfabética se não definir).
3. Fotos: recortar no navegador (canvas → JPEG 800×800), colocar no `#__up` e rodar `MD.fotos(id, ini)` (casa pelo slug do nome).
4. Descrições: editar com `produto_detalhe.php` (action=edt), `flgSalvaNiveis=0`, sem `dsImagem` vazio.

## Como o MD monta cardápio (varredura 24/11/2026)
Na prática as lojas **não usam** as telas Sabores e Adicional: pizza, açaí,
combos e "monte seu lanche" são feitos com **níveis**.
- Produto (`produto_detalhe.php`): `idTipoProduto` 0 Normal / 1 Bebida,
  `flgNiveis` 1 = usa níveis, disponibilidade por dia da semana (Domingo…Sábado),
  `flgMaiorIdade` 0/1/2.
- Nível (`nivel_cardapio.php`, action new/edt): `dsTitulo` ("Escolha 4 sabores!"),
  `nivelPor` 1 Categoria (vale para todos os produtos da categoria) / 2 Produto,
  `idCategoria`, `idSubCategoria`, `idCardapio`, `qtMinOpcao`, `qtMaxOpcao`,
  `flgTipoPreco` 0 somar · 1 substituir · 2 média+somar · 3 média+substituir ·
  4 maior+somar · 5 maior+substituir · 6 nada, `flgMostrarPreco`,
  `flgControlaEstoque`, `flgAtivo`.
  - Pizza meio a meio: nível com min=max=nº de sabores e `flgTipoPreco` 3 (média) ou 5 (maior).
  - Adicionais pagos: min 0, max N, `flgTipoPreco` 0 (somar).
- Opção (`opcoes_nivel_cardapio.php`, multipart, action new/edt/cp/del):
  `idNivelCardapio`, `dsNome`, `dsDescricao`, `idTipoOpcao` 0/1 bebida, `vlItem`,
  `dsImagem`, `flgAtivo`. Para listar opções de um nível: POST `idNivelFiltro`.
- Botão Editar = POST `produto_detalhe.php` `action=edt&idCardapio=…` (só abre).
- Botão Sugeridos = `cardapio_sugeridos.php?id=btoa(idCardapio)&tp=btoa('cardapio')&info=<nome>`.

## Ajustes rápidos sem abrir o produto (tour 24/11/2026)
A lista `produtos.php` do lojista edita na própria linha, por `ajax_operacao.php`
(POST, uma chamada por produto — usar com a loja certa logada):

| nrOperacao | Função no `assets/js/produtos.js` | Dados |
|---|---|---|
| 27 | alteraStatus (Ativo) | `idCardapio`, `flgAtivo` — antes chama a 171 |
| 171 | verificaSeParticipaPromocao | `idCardapio` |
| 31 | alteraValor (preço) | `idCardapio`, `vlItem` |
| 113 | alteraEstoque | `idCardapio`, `qtEstoque` |
| 153 | alteraOrdem | `idCardapio`, `nrOrdem` |
| 151 | alteraExternalCode | `idCardapio`, `dsExternoCode`, `idRestaurante` |

Nas opções de nível: 26 ativo, 38 preço, 180 estoque, 152 código externo, 52 remove foto.
No nível: 26 ativo, 175 código externo, 179 tipo do nível.
Melhor que reenviar `produto_detalhe.php` só para trocar preço/ordem/ativo.
⚠️ 207–210 removem nível/opção/sabor/adicional de dentro do produto: pedir confirmação.
Referência completa: `docs/ROTAS-DO-PAINEL.md`.
Ações em lote (+ AÇÕES): Ordenar Categorias, Excluir/Ativar/Desativar Selecionados,
Ativar/Desativar descrição na impressão.

## Telas do cardápio (lojista)
`produtos.php`, `produto_detalhe.php` (25 campos: `idTipoProduto`, `vlItem`,
`qtEstoque`, `nrOrdem`, `qtSabores`, `tpCalculoSabor`, `qtAdicionais`, `flgNiveis`,
`flgMaiorIdade`, `dsImagem`, `flgAtivo`…), `sabor.php` (pizza), `adicional.php`,
`nivel_cardapio.php` (títulos de nível por produto), `opcoes_nivel_cardapio.php`
(opções, filtra por nível). Categorias e subcategorias são **da cidade inteira**
(milhares de linhas), por isso cada loja usa o sufixo no nome, ex.:
`LANCHES - L.A LANCHES`. Sempre filtrar pelo sufixo da loja.

## Cuidados
- Não inventar sabores/produtos: o que for deduzido (ex.: sabor pela foto) deve ser avisado ao franqueado.
- Produto sem preço: R$ 0,00 **inativo**.
