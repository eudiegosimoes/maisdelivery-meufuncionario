# Meu Funcionário — Mais Delivery

Um "funcionário" de IA que opera o painel do Mais Delivery para o franqueado:
cadastra lojas, sobe cardápios com fotos, ajusta taxas e bairros, ativa
motoboys, faz a divulgação nas redes e audita a cidade.

Funciona como **plugin do Claude Code** (skills) e serve de laboratório para o
que depois vira botão na extensão **Turbo Cardápio**.

## Estrutura

```
.claude-plugin/marketplace.json   marketplace (o franqueado instala daqui)
plugins/meufuncionario/           o plugin
  .claude-plugin/plugin.json
  skills/
    cadastrar-loja/               loja nova no MD (+ 1menu)
    cardapio/                     extratores, subir cardápio, fotos, ordem
    taxas-bairros/                taxas por bairro, bairro novo, taxa mínima
    motoboys/                     cadastrar e ativar entregadores (a mapear)
    divulgacao/                   artes "Parceiro Confirmado", stories, feed com SEO
    auditoria/                    conferência da cidade (horários, pagamentos, logos)
  ferramentas/                    scripts usados pelas skills (md-tools.js etc.)
docs/
  MAPA-DO-PAINEL.md               tour tela por tela do painel (base de tudo)
  PLAYBOOK-cadastro-lote.md       playbook herdado do PASTATOTEM
  PLANO-DE-NEGOCIO.md             como vender para outros franqueados
```

## Instalar (para quem comprou)

```
/plugin marketplace add <usuario>/maisdelivery-meufuncionario
/plugin install meufuncionario@maisdelivery-meufuncionario
```

Precisa de: Claude Code, extensão Claude in Chrome e login no painel do Mais Delivery.

## Regras de segurança

- Nunca guardar login, senha, token ou link `login.php?index=` neste repositório.
- O Claude nunca digita senha; o franqueado faz o login no próprio Chrome.
- Ações que publicam, excluem ou mexem em dinheiro pedem confirmação.
