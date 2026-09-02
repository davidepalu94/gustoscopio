-- GUSTOSCOPIO — schema Supabase per l'accesso premium ai Corsi
-- Da eseguire una sola volta in Supabase → SQL Editor → New query

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  is_premium boolean not null default false,
  premium_since timestamptz,
  created_at timestamptz not null default now()
);

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

-- Nota: non esiste una policy di UPDATE per gli utenti.
-- is_premium va cambiato SOLO manualmente da:
-- Supabase → Table Editor → profiles → is_premium = true
-- dopo che il cliente ha acquistato un Percorso Personalizzato.
