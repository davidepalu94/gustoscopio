-- GUSTOSCOPIO — tabella per i suggerimenti alimenti
-- Da eseguire UNA SOLA VOLTA in Supabase → SQL Editor → New query
-- (è uno script separato da supabase-schema.sql: eseguilo in aggiunta,
-- non serve ri-eseguire il file principale)

create table if not exists public.food_suggestions (
  id uuid primary key default gen_random_uuid(),
  food_name text not null,
  note text,
  created_at timestamptz not null default now()
);

alter table public.food_suggestions enable row level security;

-- Chiunque (anche senza account) può inviare un suggerimento.
drop policy if exists "Chiunque può suggerire un alimento" on public.food_suggestions;
create policy "Chiunque può suggerire un alimento"
  on public.food_suggestions for insert
  with check (true);

-- Nota: nessuna policy di SELECT per il pubblico. Senza di essa, la Row
-- Level Security blocca ogni lettura dal sito — nessun utente può vedere
-- i suggerimenti inviati da altri. Tu puoi comunque leggerli in qualsiasi
-- momento da Supabase → Table Editor → food_suggestions, perché la
-- dashboard usa i tuoi permessi di proprietario del progetto, non le
-- policy RLS pensate per il browser degli utenti.
