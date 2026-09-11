import { useState, useRef, useEffect } from 'react';
import { FOODS } from '../foods';

// Combobox con ricerca: al posto di un <select> con centinaia di opzioni,
// l'utente digita e filtra in tempo reale, poi clicca per scegliere.
export default function FoodSearchSelect({ value, onChange, className = '' }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const selected = FOODS.find((f) => f.id === value);

  const results = query.trim()
    ? FOODS.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
    : FOODS.slice(0, 8);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(foodId) {
    onChange(foodId);
    setOpen(false);
    setQuery('');
  }

  return (
    <div className={`food-search-select ${className}`} ref={wrapRef}>
      <div
        className="food-search-select-display"
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 0); }}
      >
        {open ? (
          <input
            ref={inputRef}
            autoFocus
            placeholder="Cerca un alimento..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : (
          <span>{selected ? `${selected.emoji} ${selected.name}` : 'Scegli un alimento'}</span>
        )}
        <span className="food-search-select-arrow">▾</span>
      </div>
      {open && (
        <div className="food-search-select-dropdown">
          {results.length === 0 && <div className="food-search-select-empty">Nessun alimento trovato.</div>}
          {results.map((f) => (
            <div
              key={f.id}
              className={`food-search-select-option ${f.id === value ? 'selected' : ''}`}
              onClick={() => handleSelect(f.id)}
            >
              <span>{f.emoji}</span> {f.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
