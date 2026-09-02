import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FOODS } from '../foods';
import Nav from '../components/Nav';

export default function AlimentiPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(FOODS.map((f) => f.category));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return FOODS.filter((f) => {
      const matchesQuery = !q || f.name.toLowerCase().includes(q);
      const matchesCategory = !category || f.category === category;
      return matchesQuery && matchesCategory;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, category]);

  return (
    <div>
      <Nav />
      <div className="section">
        <div className="section-head">
          <h2>Il database del cibo.</h2>
          <p>Cerca un alimento e scopri cosa contiene davvero.</p>
        </div>

        <div className="search-wrap" style={{ marginTop: 0, marginBottom: 30 }}>
          <div className="search-box">
            <span>🔎</span>
            <input
              placeholder="Cerca un alimento..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group" style={{ marginBottom: 40 }}>
          <button className={`filter-btn ${category === null ? 'active' : ''}`} onClick={() => setCategory(null)}>
            Tutte ({FOODS.length})
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(category === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="stub-card" style={{ textAlign: 'center' }}>
            Nessun alimento corrisponde alla ricerca.
          </div>
        ) : (
          <div className="alimenti-grid">
            {filtered.map((f) => (
              <Link to={`/alimenti/${f.id}`} key={f.id} className="alimenti-row">
                <span style={{ fontSize: 22 }}>{f.emoji}</span>
                <div className="alimenti-row-info">
                  <div className="alimenti-row-name">{f.name}</div>
                  <div className="alimenti-row-cat">{f.category}</div>
                </div>
                <div className="alimenti-row-kcal">{f.kcal}<span> kcal/100g</span></div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
