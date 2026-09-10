import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Form per suggerire un alimento non presente nel database. Chiunque può
// inviare un suggerimento (anche senza account): viene salvato nella
// tabella Supabase "food_suggestions" (vedi supabase-schema-food-suggestions.sql).
// Nessuno può leggerli dal sito pubblico — solo tu dalla dashboard Supabase
// (Table Editor), perché non esiste una policy di SELECT pubblica.
export default function SuggestFoodForm({ initialQuery = '', embedded = false }) {
  const [name, setName] = useState(initialQuery);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    setName(initialQuery);
  }, [initialQuery]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus('sending');
    const { error } = await supabase
      .from('food_suggestions')
      .insert({ food_name: name.trim(), note: note.trim() || null });
    if (error) {
      console.error(error);
      setStatus('error');
      return;
    }
    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <div className={`suggest-food-form suggest-food-sent ${embedded ? 'suggest-food-form--embedded' : ''}`}>
        ✓ Grazie! Abbiamo ricevuto il tuo suggerimento per <strong>{name}</strong>.
      </div>
    );
  }

  return (
    <form className={`suggest-food-form ${embedded ? 'suggest-food-form--embedded' : ''}`} onSubmit={handleSubmit}>
      <div className="suggest-food-title">Non hai trovato quello che cercavi?</div>
      <p className="suggest-food-sub">Suggericelo: valutiamo di aggiungerlo al database.</p>
      <input
        type="text"
        placeholder="Nome dell'alimento"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Dettagli utili (marca, dove lo trovi, valori se li conosci) — facoltativo"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
      />
      <button type="submit" disabled={status === 'sending' || !name.trim()}>
        {status === 'sending' ? 'Invio...' : 'Suggerisci alimento'}
      </button>
      {status === 'error' && (
        <div className="suggest-food-error">Qualcosa è andato storto, riprova tra poco.</div>
      )}
    </form>
  );
}
