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

## Cuidados
- Não inventar sabores/produtos: o que for deduzido (ex.: sabor pela foto) deve ser avisado ao franqueado.
- Produto sem preço: R$ 0,00 **inativo**.
