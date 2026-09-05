import { createClient } from '@supabase/supabase-js';

// Questi valori sono pubblici per progetto: l'anon key è pensata per
// essere esposta nel codice del browser, la sicurezza vera sta nelle
// regole (Row Level Security) impostate sulle tabelle in Supabase, non
// nel nascondere questa chiave. La service_role key (quella davvero
// segreta) non va MAI messa qui.
const SUPABASE_URL = 'https://bphlhasignetikelmfnl.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwaGxoYXNpZ25ldGlrZWxtZm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2MTc5MjcsImV4cCI6MjEwNDE5MzkyN30.u-S0DxbLfCxXPmiYx_M7AybBhWJaSORuf1vU2aaiAxk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
