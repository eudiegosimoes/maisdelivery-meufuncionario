---
name: divulgacao
description: Faz a divulgação dos parceiros da cidade — arte "Parceiro Confirmado" com o logo de cada loja, stories e posts no feed do Instagram/Facebook pelo Meta Business Suite, com legenda pensada para o Google. Use para "faz a arte dos parceiros", "posta nos stories", "posta no feed".
---

# Divulgação

## Arte "Parceiro Confirmado"
- Modelo: `ferramentas/artes/modelo-parceiro-confirmado.webp` (941×1672). Logo no círculo: centro (464,5; 929,5), raio 299.
- Logo: usar o **atual do MD** (`estabelecimento.php` edt → `img` em `api/imagens/v2/...`). Baixar com cabeçalho de navegador (`curl -L -A ...`).
- Logo quadrado: cobrir o círculo; logo retangular: caber inteiro com fundo branco.
- Só lojas **Ativas e Fechadas** no MD (Inativas ficam de fora).
- Gerar no Chrome e baixar num zip só (o Chrome bloqueia vários downloads por aba).
- Montar folha de conferência (`ferramentas/artes/folha.ps1`) e mostrar ao franqueado antes de publicar.

## Stories (Meta Business Suite)
- `latest/story_composer`, até 10 imagens por envio, 1080×1920 (`jpg.ps1`).
- O botão "Adicionar foto/vídeo" cria um input solto: interceptar `HTMLInputElement.prototype.click`, anexar ao body e usar o upload de arquivo.
- Conferir na agenda (`latest/content_calendar`): o Instagram às vezes perde algum; repostar só no IG.

## Feed
- Arte 4:5 (1080×1350, `feed.ps1`).
- Legenda: nome + "em <nome da cidade>" na 1ª linha (perguntar a cidade ao franqueado ou ler com `MD.cidade()`), produtos reais do cardápio, bairro, chamada para o app e hashtags locais. Nada inventado (sem horário, preço ou "melhor da cidade").
- Colar a legenda com Ctrl+V real (`clip.ps1` coloca na área de transferência); colar por script embaralha o editor.
- Perguntar o ritmo ao franqueado (tudo de uma vez derruba o alcance).

## Caminhos no painel (varredura 24/11/2026)
- Link da loja para divulgar: lojista → Outros → Divulgar Loja (`compartilhar_loja.php`).
- Banners do app: `banners.php` (op 32 traz os produtos da loja escolhida).
- Push: `lista_notificacoes.php` → `notificacao.php`; e-mail `email_divulgacao.php`; SMS `sms_divulgacao.php`
  (op 167 valida/salva). ⚠️ Envio chega aos clientes: sempre pedir confirmação.
- Cupom da cidade `cupom.php` (gerencial) ou da loja (lojista); promoções `promocoes.php` → `promocao_detalhe.php`.
- Carrinhos abandonados (`carrinhos_abandonados.php`) e relatório 57 (acessou e não pediu) para remarketing.

## Regras confirmadas em teste (24/11/2026)
- Promoção (`promocao_detalhe.php`): exige imagem, pelo menos 1 produto e preço menor que o original.
  Itens `idCardapio[]`, `idSabor[]`, `qtItem[]`, `vlNormal[]`, `vlDesconto[]` — **valores com vírgula**
  (com ponto o painel multiplica por 100). Datas `dd/mm/aaaa`, horas `hh:mm`.
- Cupom da loja (`cupom.php`): `idTpDesconto` 1 = %, 0 = R$, 2 = frete grátis; `flgAtivo` 0 deixa pronto sem valer.
- Sugeridos ("peça também", até 5 por produto): ops 149/145/147/148 — bom para aumentar o ticket.
