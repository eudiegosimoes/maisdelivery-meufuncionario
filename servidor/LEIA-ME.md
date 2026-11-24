# Servidor do Meu Funcionário (protótipo de licença)

O produto de verdade. Fica **só com você** (repositório privado). O cliente instala
o `plugin-casca/`, que não tem conhecimento nenhum: ele chama este servidor, que só
responde com licença ativa.

```
Cliente: Claude Code + Claude in Chrome (logado no painel do MD)
   └─ plugin-casca  ──(Authorization: Bearer MF-XXXX)──►  servidor MCP (Supabase Edge Function)
                                                           ├─ confere licença (tabela licencas, só hash)
                                                           ├─ registra uso (tabela uso)
                                                           └─ responde: md_receita / md_validar_cardapio
O Claude executa no Chrome do cliente. O servidor nunca entra no painel nem guarda login.
```

## Pastas
- `supabase/functions/meufuncionario/` — a Edge Function (`index.ts`) e o núcleo (`nucleo/`):
  - `receitas.js` — base "pedido → caminho no painel" (o valor do produto).
  - `validar.js` — confere cardápio antes de subir.
  - `mcp.js` — protocolo MCP (JSON-RPC por HTTP) + regras da licença. Sem dependências.
- `supabase/migrations/0001_licencas.sql` — tabelas `licencas` e `uso` (RLS ligado, sem acesso público).
- `ferramentas/gerar-chave.mjs` — cria chave `MF-XXXXXX-XXXXXX-XXXXXX` e o SQL de cadastro.
- `local/` — servidor de teste (Node) e teste de ponta a ponta.

## Testar no computador
```
node servidor/ferramentas/gerar-chave.mjs "Teste" "Juína" 2027-12-31 --local
node servidor/local/servidor-local.mjs
MEUFUNC_LICENCA=MF-... node servidor/local/teste.mjs
```
Resultado de 24/11/2026: 17/17 testes OK e conexão OK com o cliente oficial do SDK MCP.

## Publicado (24/11/2026)
- Projeto Supabase `maisdelivery-meufuncionario` (`fjyibbybafufmfudawxu`), organização "oferteirosapp", **plano Free**.
- URL: `https://fjyibbybafufmfudawxu.supabase.co/functions/v1/meufuncionario` (Verify JWT **desligado**).
- Teste de ponta a ponta contra a URL real: 17/17 OK; cliente oficial do SDK MCP conectou; tabela `uso` registrando.
- Licença do dono cadastrada (a chave está só em `servidor/local/minha-chave.txt`, fora do git).
- ⚠️ Plano Free pausa o projeto após 7 dias sem uso: antes de ter cliente pagando, passar para plano pago
  (ou manter uma chamada diária).
- Publicação foi feita pelo painel (editor de funções) colando `dist/meufuncionario-index.ts`, gerado por
  `node servidor/ferramentas/empacotar.mjs`. Para atualizar: editar o núcleo → empacotar → colar → Deploy.

## Publicar no Supabase (pela CLI, alternativa)
1. Aplicar `supabase/migrations/0001_licencas.sql` no projeto.
2. Publicar a função **sem verificação de JWT** (a autenticação é a licença):
   `supabase functions deploy meufuncionario --no-verify-jwt`
3. Gerar a chave do cliente e rodar o `insert` que o `gerar-chave.mjs` mostra.
4. URL final: `https://<projeto>.supabase.co/functions/v1/meufuncionario`.

## Ciclo de vida da licença
- Suspender: `update licencas set status='suspensa' where cliente='...'` (o cliente para na hora).
- Renovar: `update licencas set validade='2027-12-31' ...`.
- Uso por cliente: `select ferramenta, count(*) from uso where chave_hash=... group by 1`.

## Próximos passos (fora do protótipo)
- Pagamento (Asaas/Mercado Pago) → webhook que ativa/suspende a licença sozinho.
- Amarrar a chave à cidade: o plugin manda o `idMarketplace` do painel e o servidor confere com `licencas.id_marketplace`.
- Mais ferramentas: `md_script` (devolve o código da tarefa), `md_extrair_cardapio` (extratores rodando no servidor).
- Separar `plugin-casca/` num repositório próprio (pode ser público) para o marketplace de instalação.
