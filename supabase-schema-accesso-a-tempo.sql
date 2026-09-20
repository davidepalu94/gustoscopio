-- GUSTOSCOPIO — accesso a tempo ai videocorsi (prima visita: 30 giorni; percorsi: per la durata)
-- Da eseguire UNA volta in Supabase → SQL Editor → New query.
--
-- Aggiunge la scadenza alla tabella "purchases". expires_at vuoto = accesso permanente
-- (chi acquista il corso con Stripe non scade mai; le righe già presenti restano permanenti).

alter table public.purchases add column if not exists expires_at timestamptz;

-- ------------------------------------------------------------------------------------
-- COME DARE ACCESSO A UN CLIENTE (il cliente deve prima registrarsi su /accedi)
-- Sostituisci l'email e scegli la durata:
--   prima visita  → interval '30 days'
--   percorso 3 m  → interval '3 months'   (6 m: '6 months' · 12 m: '12 months')
--
-- insert into public.purchases (user_id, course_id, expires_at)
-- select id, 'da-zero-al-tuo-piano', now() + interval '30 days'
-- from auth.users where email = 'email.del.cliente@example.com'
-- on conflict (user_id, course_id) do update
--   set expires_at = case
--     when public.purchases.stripe_session_id is not null then null   -- ha pagato: resta permanente
--     else excluded.expires_at end;
--
-- PER PROLUNGARE (es. dalla prima visita a un percorso): rilancia lo stesso comando con la nuova durata.
