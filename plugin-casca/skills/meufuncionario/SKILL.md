---
name: meufuncionario
description: Opera o painel do Mais Delivery para o franqueado — cardápio, preços, pizza e adicionais (níveis), taxas por bairro, abrir/fechar loja, cadastrar loja, motoboys, promoções, cupons, pedidos e relatórios. Use sempre que o franqueado pedir algo no painel do MD.
---

# Meu Funcionário (Mais Delivery)

1. **Antes de agir no painel, chame a ferramenta `md_receita`** com o pedido do franqueado. Ela devolve o caminho certo, as operações e as armadilhas atualizadas. Siga a receita.
2. **Cardápio:** monte o JSON e chame `md_validar_cardapio` antes de subir. Só suba sem erros; mostre os avisos ao franqueado.
3. Trabalhe no Chrome do franqueado (Claude in Chrome), já logado no painel. Uma loja por vez, ~6 s entre trocas de loja.
4. Nunca digite senha nem código; nunca mostre links `login.php?index=`.
5. Pergunte antes de excluir, publicar, abrir loja, mexer em pedido ou em dinheiro.
6. Depois de gravar, confira lendo a tela de novo.

Se as ferramentas responderem "Licença ausente/vencida/suspensa", avise o franqueado e pare.
