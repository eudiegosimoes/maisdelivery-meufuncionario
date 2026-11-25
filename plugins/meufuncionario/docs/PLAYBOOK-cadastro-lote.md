# Cadastro em lote: Mais Delivery (MD) + 1menu

> **Nota:** este playbook conta como foi feito em **Aripuanã (MT)**. Os nomes de lojas, ids e o 1menu são exemplos do autor.
> As ferramentas (`md-tools.js`) hoje leem a cidade, o CEP e a franquia do painel de quem está logado, então o mesmo roteiro vale para qualquer cidade.
> O **1menu** é outro produto do autor: quem não usa pode pular tudo que fala dele.

Passo a passo que funcionou em Aripuanã (09/11/2026), para preparar uma cidade
inteira antes de uma inauguração: achar as lojas, achar os cardápios, cadastrar
no MD e no 1menu com fotos, e deixar tudo pronto para "só ligar".

Tudo aqui foi feito pelo Claude Code, usando o Chrome do usuário (já logado no
painel do MD), o banco do 1menu (Supabase) e scripts locais. Esta pasta guarda
as ferramentas; o objetivo futuro é automatizar.

---

## 1. Regras do dono (decisões que valem sempre)

| Situação | Como fica |
|---|---|
| Loja nova **com** cardápio | MD = **Fechado**, 1menu = **visível** |
| Loja nova **sem** cardápio (pré-cadastro) | MD = **Fechado**, 1menu = **escondida** |
| Cardápio novo de uma loja que já existe | Troca tudo: marca os antigos como "(antigo)", cria os novos, **exclui os antigos** nos dois (perguntar antes de excluir) |
| Marca virtual (ex.: Pitel, marcas do Recanto) | MD **e** 1menu (mudou em 14/11/2026); no Painel de Pedidos da loja mãe, marcar as marcas |
| Logo | O oficial da loja; se não tiver, gerar no ChatGPT do usuário ou um logo simples (`logos.ps1`) |
| Taxas por bairro | Copiar de uma loja vizinha |
| Pagamento sem chave Pix conhecida | Dinheiro + Maquininha |
| Loja de outra cidade com mesmo nome | Confirmar a cidade (endereço no JSON da plataforma, Google Maps) |
| Lojas repetidas no MD | Ficar com a que tem chave Pix ativa |

Excluir é sempre permanente: o Claude pede um "sim" do usuário para cada loja.

---

## 2. Começo de sessão (checklist)
1. **Chrome:** o usuário fica logado no painel do MD como **gerencial da cidade**. Cada sessão do Claude tem o próprio grupo de abas, e os números das abas mudam: criar aba nova (`tabs_context_mcp` / `navigate`) e abrir `painel.maisdeliveryempresas.com.br/painel/lista_estabelecimentos.php`.
2. **Link de volta ao gerencial:** fica salvo em `localStorage.__voltar` (formato `login.php?index=...`). Se não existir, buscar em `pedidosk.php` o link `a[href*="login.php?index="]` cujo texto é `gerencial` e salvar:
   ```js
   const lk=[...new DOMParser().parseFromString(await (await fetch('pedidosk.php',{credentials:'include'})).text(),'text/html').querySelectorAll('a[href*="login.php?index="]')];
   localStorage.setItem('__voltar', lk.find(a=>a.textContent.trim()==='gerencial').getAttribute('href'));
   ```
   Os outros links da mesma lista entram em cada loja: é isso que `MD.entrar(id, inicioDoNome)` usa.
3. **Carregar `painel-md/md-tools.js`** (etapa 3, passo 1).
4. **Banco do 1menu:** Supabase `phyejnfwhnnkndrinxli`, pelo MCP `execute_sql`.
5. **Saída do JavaScript:** nunca imprimir a URL inteira com `index=` (é o login da loja). A saída fica bloqueada e é dado sensível.

---

## 3. Etapas

### Etapa 1: levantar as lojas da cidade
1. Ler a lista de lojas do MD (painel gerencial da cidade).
2. Pesquisar no Google:
   - **Por plataforma:** `site:pedido.anota.ai <cidade>`, Brendi, Ola.click, Cardápio Web, Goomer, InstaDelivery, Delivery Direto, MenuDino, Saipos, mandarpedido, WhatsMenu, DotFood, Takeat.
   - **Por nome:** `<nome> <cidade> cardápio`.
   - Abrir cada link e conferir a cidade.
3. Para cada loja nova, juntar: endereço, telefone/WhatsApp, horário, Instagram, nota do Google e CNPJ.
   - O CNPJ sai da busca do Google (Serasa, Econodata, cnpj.biz) e é conferido em `https://brasilapi.com.br/api/cnpj/v1/<cnpj>` (diz se está ATIVA, BAIXADA etc.).
   - A coordenada sai do Google Maps (o pin na URL `!3d<lat>!4d<lng>`; esperar ~8 s a página carregar).
4. Guardar numa planilha CSV (exemplo: `levantamento-aripuana/novos-estabelecimentos-2026-11-09.csv`).

### Etapa 2: ler o cardápio (extratores)

Cada extrator gera `cardapio.json` (formato do MD) e `fotos.txt` (`SID|slug|url`).

| Plataforma | Como ler | Extrator |
|---|---|---|
| **Anota AI** | `api.anota.ai/noauth/access//get-token/<slug>` → token → `clientauth/nm-category/menu-merchant` | `extratores/anota.mjs <slug> <SID_MD> <pasta>` |
| **mandarpedido / stbl** | `<slug>.stbl.com.br/estoque/v2/app/products/list/`, `product/details/?id=`, `pizza/size-details?size_id=`, `combo/details/?id=`; dados da loja (endereço, fone, horário, logo) em `core/v2/app/store/config/` (`opening_hours.day` 0 = domingo) | `extratores/stbl.mjs <slug> <SID_MD> <pasta>` (combos viram níveis obrigatórios com a diferença de preço) |
| **Saipos** | `delivery-api.saipos.com/v1/stores/<id>/sales/view-data?data={"saleModule":"delivery","idStoreSiteData":<n>}` (ids vêm da aba Network) | `extratores/saipos.mjs <view.json> <saida.json>` |
| **MenuDino** | `/api/bff/catalog/categories/<merchant>`, `items/<merchant>/<cat>/summary`, `items/detailed?...` | `extratores/menudino.mjs <pasta>` (merchant fixo no arquivo: trocar) |
| **DotFood** | `dotfood.com.br/publico/cardapio/<slug>/api/produtos?page=1..N` | `extratores/eskimo.mjs <pasta> <SID>` (filtra insumos de atacado) |
| **Brendi** | `useNuxtApp().payload.data['menu-<slug>']` na página (preço em centavos) | manual no navegador |
| **Canva, foto, PDF** | ler o texto e montar o JSON à mão | ver `exemplos/cardapio-manual-acacia.json` |

As APIs públicas respondem por `curl`/`node`, fora do navegador. O Anota AI às vezes devolve vazio; basta tentar de novo.

**Formato do cardápio (MD):**
```
[ ["Categoria", [ ["Nome", preco, "descrição", eBebida(0/1), [niveis]] ] ] ]
nivel = {titulo, min, max, tp, opcoes:[["Opção", preco]]}
tp: somar | substituir | media_somar | media_substituir | maior_somar | maior_substituir
```
- **Pizza:** sabor com preço cheio. 1 sabor = `substituir`; 2 ou mais = `media_substituir`. Borda = `somar`.
- **Tamanho obrigatório** (ex.: Mini/Grande): `min 1, max 1, substituir`. Nunca deixar produto a R$ 0 com tamanho opcional.
- **Conferir o que o extrator gerou** antes de subir: "5 esfihas por R$ 45 + R$ 9 cada" vem como base 45 + opções a 9 (cobraria 90) → virar "Escolha 5" (opções a 0) + "Extras" (a 9). Produto com opção obrigatória do mesmo preço (Água com/sem gás) soma em dobro → opções a 0.

### Etapa 3: cadastrar no MD (painel, pelo Chrome)
1. Carregar as ferramentas na aba do painel:
   - criar inputs de arquivo `#__up` e `#__upj`;
   - subir `painel-md/md-tools.js` no `#__upj`;
   - rodar `(0,eval)(texto)`.
   - Se a página recarregar sozinha, `window.MD` some: carregar de novo.
2. **Loja nova:** `MD.criarLoja(L, logo)`.
   - Precisa de logo, coordenada e **horário em todos os dias**.
   - Liga sozinho o integrador CHEFÃO PDV (op 83 + op 85, empresa 38).
   - Depois: `MD.configurar(id, nomeInicio, bairros, ['dinheiro','maquininha'], entrega)`; entrega: 1 = entrega, 2 = balcão, 3 = ambos.
   - Por fim, Fechado: `ajax_operacao.php` com `nrOperacao=18, idRestaurante=<id>, flgAtivo=2` (é o que o seletor da lista faz; 1 Ativo, 2 Fechado, 0 Inativo).
   - Logo para o 1menu: a `<img>` de `estabelecimento.php` da loja (`maisdeliveryfranquia.com.br/api/imagens/...`).
3. **Cardápio:**
   - `MD.entrar(id, nomeInicio)`, depois `MD.subir(id, 'Nome da Loja', cardapio, R)`. As categorias ficam como "Categoria - Nome da Loja".
4. **Fotos:**
   - Baixar com `baixar.sh <pasta> fotos.txt`.
   - Subir no `#__up`, no máximo ~9 MB por vez.
   - Rodar `MD.fotos(id, nomeInicio)`; ele casa o arquivo com o produto pelo slug do nome.
5. **Trocar cardápio de loja existente:**
   - `MD.marcarAntigos(id, ini, R)` marca os antigos como "(antigo)" e inativos.
   - Subir os novos e as fotos, e puxar no 1menu.
   - Depois `MD.excluirAntigos(qtd)`.

### Etapa 4: cadastrar no 1menu (banco)
- **Loja nova:** `sql/criar-lojas-1menu.sql` (troca cidade, marketplace e bairros).
- **Com cardápio:** puxar pela função `sync-mais-delivery-catalog-pull` (o SQL está no fim do arquivo).
- **Sem cardápio:** carimbar `mais_delivery_last_pull_at`. Sem isso, o robô fica tentando, dá erro e trava a fila das outras lojas.
- **Trocar cardápio:**
  - **Antes de puxar:** renomear os antigos no 1menu também (`UPDATE products SET name='(antigo) '||name`). O pull liga produtos pelo NOME e misturaria os novos com os antigos.
  - **Depois do pull:** guardar cópia (`CREATE TABLE backup.products_antigos_<loja>_<data> AS ...`), apagar o vínculo em `product_external_mappings` e os produtos, e apagar as categorias que ficaram vazias.

### Etapa 4b: produtos sugeridos ("peça junto" do app MD)
- Regras do MD: máx 5 por produto, mín 3 para aparecer, sugerido sem foto não aparece.
- `sugeridos/montar.mjs <produtos.json> <saida.json>`: produtos vêm do 1menu (`products` + `product_external_mappings.external_product_id` = id do MD + se tem foto). Comida → bebida família + lata + batata/porção + doce + 2º acompanhamento; bebida → comidas mais em conta; tudo da própria loja, com foto, mais barato que o alvo.
- `sugeridos/aplicar.js` no Chrome (com md-tools carregado): `aplicarSugeridos(idLoja, inicioDoNome)`. Só completa até 5, não apaga os do lojista. Testado no Fornão Express (40 produtos, 200 sugeridos, 13/11/2026).
- **Cidade inteira** (`sugeridos/cidade.js` + `regra.js`, no gerencial): `window.__fotos = {idLojaMD: "ids com foto"}` (SQL: `product_external_mappings.external_product_id` dos produtos ativos com `image`), `planejarCidade(ids)` (entra em cada loja, lê `produtos.php`, monta `__planos`, NÃO grava; ~9 min/60 lojas), revisar amostras, depois `gravarRapido(ids)`.
  - **145/149 funcionam do gerencial só com `idRestaurante`** — não precisa entrar na loja (55 ms/chamada). Entrando loja por loja levava 2 s por sugerido.
  - `produtos.php`: colunas 1 id, 2 categoria, 4 nome, 9 valor, 10 estoque, **11 ativo**, 12 disponível.
  - Link de entrada pode ter o nome antigo da loja; `MD.entrar` compara o início do texto com `MD.norm` — nunca passar nome cortado com espaço no fim.
  - Aripuanã 13/11/2026: 48 lojas, 1.567 produtos (1.346 com 5, 181 com 3-4); depois a regra passou a completar até 5 com qualquer produto com foto da loja (outra categoria primeiro, inclusive R$ 0) — 59 lojas cobertas.

### Etapa 4c: fotos genéricas (cardápio de papel, sem fotos)
- Pasta `fotos-genericas/` (feito em 16/11/2026 no Valdir e no Sandro): `alvos.txt` (loja|produto|termo de busca) → SQL em `products` de outras lojas (nome normalizado `like '%termo%'`, com foto, só `maisdeliveryfranquia.com.br`, ordenado pela foto usada em mais lojas) → 4 candidatas por produto.
- Olhar antes de escolher: abrir uma aba no Chrome em qualquer página do domínio e montar a grade de `<img>` com URL absoluta (o painel interno não desenhou a página local). Fotos com marca/texto de outra loja ficam de fora.
- `escolhas.txt` → `fotos.txt` (`sid|slug|url`) → `baixar.sh` → subir no `#__up` → `MD.fotos(id, ini)` (demora ~1,5 s por produto: rodar em segundo plano e ler `window.__resultado`) → repuxar no 1menu. O MD aceita webp. O `photo_album` quase não tem lanches (X-…), por isso a busca é direto em `products`.

### Etapa 5: conferir
- **MD:** quantidade de produtos, produtos com adicionais, fotos, bairros e status Fechado.
- **1menu:** produtos ativos, com foto e com grupo, sem preço zero, bairros e loja visível/escondida.

---

## 4. Armadilhas já conhecidas
- **Uma loja por vez no MD:** a sessão tem só uma loja aberta de cada vez. Nunca rodar duas em paralelo.
- **Cloudflare do MD:** esperar uns 6 s entre trocas de loja.
- **Nome cortado:** o MD corta o nome do produto em **45 caracteres** e tira apóstrofo (Hershey's → Hersheys). Renomear o arquivo da foto para casar.
- **Renomear categoria no MD:** as categorias são da cidade (compartilhadas) e só o gerencial edita: `categoria_item.php` com `action=edt, idCategoria` traz o `frmCadastro` (`action=upd`); trocar `dsCategoria` e postar. Renomear loja: `estabelecimento.php` de dentro da loja (`frmCadastro`, `action=upd`), tirar `dsImagem` do FormData para não mexer no logo.
- **Categoria repetida:** o MD não cria categoria igual ignorando maiúsculas ("BEBIDAS - LAST BURGUER"). Usar a grafia que já existe.
- **Trocar taxas de loja que JÁ tem bairros:** o form tem `nrBairros[][<idLinha>]`/`vlEntrega[][<idLinha>]`; apagar essas chaves e mandar `nrBairros[]` novos SOMA linhas (não substitui). Ou edita o valor na própria chave `vlEntrega[][<idLinha>]`, ou apaga a linha com `ajax_operacao.php nrOperacao=9, idEntrega=<idLinha>` (de dentro da loja). `MD.configurar` só serve para loja nova.
- **Ordem das categorias:** o `MD.subir` não define ordem e o app do MD cai na alfabética (Bebidas primeiro). Definir de dentro da loja: POST `produtos.php` com `categoriaOrdem=[{"id":<idCategoria>},...]` (é o "Ordenar Categorias" da tela Produtos; confere em `categoria_ordem.php`). No 1menu é `categories.order_position` (o pull não mexe; categoria nova nasce 0 e vai pro topo). Ler a ordem do app: op 21 (`nrOrdem` da categoria). Feito em Aripuanã 14/11/2026 (21 lojas no MD, 73 no 1menu).
- **Segmentos da cidade (`segmentos.php`, gerencial):** o MD recusa EM SILÊNCIO salvar segmento com número de ordem já usado por outro (nome e ordem vão juntos no `frmCadastro action=upd`; ordem sozinha = `action=ord, idCategoria, nrOrdem`). Para reordenar: jogar todos para 101+ e depois aplicar a ordem final. Excluir = `action=del, idCategoria`.
- **NUNCA reenviar o form_post de configuracao.php sem tratar as taxas:** o form traz `vlEntrega[][<idLinha>]` como "6.00" (ponto) e o MD lê como 600 (ou 999,99, o teto). Sempre que postar a configuração (Painel de Pedidos, Pix, mínimo etc.), regravar TODAS as taxas com `MD.virg` (vírgula). Em 14/11/2026 isso deixou o Recanto (aberto) e a Pitel com taxa R$ 999,99 por ~1 dia; corrigido em 15/11.
- **Emojis:** tirar dos nomes (o MD pode não aceitar).
- **Adicionais no MD:** é obrigatório mandar `flgControlaEstoque[]=0` por nível e `qtEstoqueOpcao[]=999.999` por opção, senão dá erro 500.
- **Editar produto no MD:** o formulário não traz os níveis, então salvar foto/nome/preço com `flgSalvaNiveis=0`. Para mudar níveis: criar o produto de novo e excluir o antigo.
- **Barra invertida:** gerar arquivo `.js` por `node -e` no bash come a `\` (ex.: `\d` vira `d`). Escrever em arquivo.
- **Acentos no PowerShell 5.1:** script com acento precisa estar salvo em UTF-8 **com BOM**.
- **Imagens de outros sites:** não abrem dentro do painel (CORS). Baixar para o disco e subir pelo input.
- **Saída bloqueada:** a saída do JavaScript que contém `?`, `=` ou `&` (cookies/URLs) é bloqueada. Trocar esses caracteres antes de imprimir.
- **Loja que o lojista criou sozinho no MD** (ex.: Valdir Salgados 131069, 16/11/2026): não aparece na lista de acesso do gerencial (`pedidosk.php`) até o usuário **sair e entrar de novo** no painel; o link de volta muda (texto "Gerencial", maiúsculo) e o `__voltar` precisa ser refeito. Ela vem sem integrador: rodar op 83 + op 85 (como no `criarLoja`) antes do pull, senão o 1menu diz "não autorizou a loja". Vem também sem bairros e sem pagamento: usar `MD.configurar`.
- **Telefones:** o WhatsApp de pedidos (placa/fachada) vai na loja e no 1menu; o número do funcionário/dono no MD fica como está.
- **Produto sem preço:** lançar a R$ 0,00 **inativo** (6º campo `1` no JSON); o pull do 1menu não traz os grupos de produto inativo, eles chegam quando o lojista ativa.
- **Slug da loja no 1menu:** a edição antiga trocava o slug (corrigido nos PRs #207/#208).
- **Bairro novo na cidade:** gerencial `bairro.php` com `FormData(frmCadastro)`, `action=ins`, `idCidade`, `dsBairro`. Depois, em cada loja, `configuracao.php`: regravar todas as `vlEntrega[][<linha>]` com `MD.virg` e ACRESCENTAR `nrBairros[]`/`vlEntrega[]` (22/11/2026, 95 lojas). **`MD.links()` traz também o link "Gerencial"** (config com 2.000+ bairros de várias cidades): pular, senão grava nele. Conferir o id da loja depois de entrar (às vezes não troca e repete a anterior). Loja que não está na lista de acesso pode estar ARQUIVADA (`estabelecimentos_desarquivar.php`).

---

## 5. Para automatizar depois (ideias)
1. **Um comando por loja:** `cadastrar.mjs <link-do-cardapio> <loja>` que detecta a plataforma, roda o extrator, baixa as fotos e gera o pacote (cardápio, fotos, logo, dados).
2. **Extensão do Chrome (Turbo):** recebe o pacote e roda no MD o que hoje é `md-tools.js` (criar loja, configurar, subir, fotos, Fechado).
3. **Função no 1menu:** "criar loja a partir do MD" (o SQL acima) e a troca de cardápio com cópia de segurança.
4. **Pesquisa de cidade:** gera a planilha de levantamento (Google + BrasilAPI + Maps) sozinha.
5. **Robô:** corrigir o erro de "cardápio vazio" que trava a fila (hoje contornado carimbando `last_pull_at`).
