# Plugin Meu Funcionário (casca)

O que o franqueado instala. Não contém regras nem ferramentas: tudo vem do servidor,
com licença ativa.

## Instalação do cliente
1. Ter Claude Code e a extensão Claude in Chrome; fazer login no painel do Mais Delivery no Chrome.
2. Definir a chave recebida na variável de ambiente `MEUFUNC_LICENCA` (e, se for outro servidor, `MEUFUNC_URL`).
   - Windows (PowerShell): `setx MEUFUNC_LICENCA "MF-XXXXXX-XXXXXX-XXXXXX"` e reabrir o Claude Code.
3. Instalar o plugin pelo marketplace e pedir: "sobe esse cardápio", "troca o preço do X-Bacon", "libera o motoboy".

Sem licença, ou com licença vencida/suspensa, as ferramentas respondem com o motivo e o Claude para.
