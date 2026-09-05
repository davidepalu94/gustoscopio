-- GUSTOSCOPIO — schema Supabase per account utenti e acquisti corsi
-- Da eseguire una sola volta in Supabase → SQL Editor → New query

-- Tabella profili: un record per ogni utente registrato
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  created_at timestamptz not null default now()
);

-- Crea automaticamente il profilo quando qualcuno si registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "Utenti leggono il proprio profilo" on public.profiles;
create policy "Utenti leggono il proprio profilo"
  on public.profiles for select
  using (auth.uid() = id);

-- Tabella acquisti: una riga per ogni corso comprato da un utente.
-- Verrà popolata dal webhook di Stripe (passo successivo), non
-- direttamente dagli utenti.
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  course_id text not null,
  stripe_session_id text,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.purchases enable row level security;

drop policy if exists "Utenti leggono i propri acquisti" on public.purchases;
create policy "Utenti leggono i propri acquisti"
  on public.purchases for select
  using (auth.uid() = user_id);

-- Nota: nessuna policy di INSERT/UPDATE per gli utenti su "purchases".
-- Le righe verranno inserite solo dal webhook di Stripe (passo
-- successivo), usando la service_role key, mai dal browser dell'utente.
