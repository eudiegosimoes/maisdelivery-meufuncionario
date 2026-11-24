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
- [ ] Gerencial da cidade (menu completo)
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

## Telas a mapear
(preencher no tour)
