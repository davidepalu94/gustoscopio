import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Variabili Supabase mancanti: controlla VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (.env.local in locale, Environment Variables su Vercel in produzione).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
