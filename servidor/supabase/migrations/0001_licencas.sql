-- Licenças do Meu Funcionário. A chave nunca é guardada: só o hash SHA-256.
create table if not exists public.licencas (
  chave_hash     text primary key,
  cliente        text not null,                 -- nome do franqueado
  cidade         text,                          -- cidade que a licença cobre
  id_marketplace text,                          -- id da franquia no painel do MD (amarração futura)
  status         text not null default 'ativa' check (status in ('ativa', 'suspensa', 'cancelada')),
  validade       date,                          -- null = sem vencimento
  limite_lojas   integer,
  criado_em      timestamptz not null default now(),
  observacao     text
);

create table if not exists public.uso (
  id          bigint generated always as identity primary key,
  chave_hash  text not null references public.licencas (chave_hash) on delete cascade,
  ferramenta  text not null,
  em          timestamptz not null default now()
);
create index if not exists uso_chave_em on public.uso (chave_hash, em desc);

-- Só o servidor (service role) lê e escreve. Sem políticas = ninguém de fora acessa.
alter table public.licencas enable row level security;
alter table public.uso enable row level security;
