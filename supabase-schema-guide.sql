-- GUSTOSCOPIO — bucket privato per le guide PDF
-- Da eseguire una sola volta in Supabase → SQL Editor → New query.
--
-- Gli acquisti delle guide usano la tabella "purchases" già esistente:
-- course_id contiene l'id della guida (es. 'guida-proteine'), quindi il
-- webhook di Stripe funziona senza modifiche.

insert into storage.buckets (id, name, public)
values ('guide', 'guide', false)
on conflict (id) do nothing;

-- Nessuna policy per gli utenti: il bucket è PRIVATO e i file si leggono solo
-- tramite /api/guide-download, che verifica l'acquisto e genera un link
-- temporaneo (60 secondi) con la service_role key.
--
-- Poi: Supabase → Storage → guide → Upload file, caricando esattamente:
--   guida-proteine.pdf
--   guida-piatto-bilanciato.pdf
--   guida-spesa-etichette.pdf
