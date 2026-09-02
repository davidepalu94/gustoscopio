import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PORTIONS } from '../portions';
import Nav from '../components/Nav';

export default function QuantoPesaPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(PORTIONS.map((p) => p.category));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PORTIONS.filter((p) => {
      const matchesQuery = !q || p.foodName.toLowerCase().includes(q);
      const matchesCategory = !category || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div>
      <Nav />
      <div className="section">
        <Link to="/strumenti" className="breadcrumb">← Torna agli strumenti</Link>
        <div className="section-head">
          <h2>Quanto pesa?</h2>
          <p>Conversioni pratiche tra misure casalinghe e grammi, per quando non hai la bilancia a portata di mano.</p>
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
            Tutte ({PORTIONS.length})
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
            Nessuna conversione corrisponde alla ricerca.
          </div>
        ) : (
          <div className="alimenti-grid">
            {filtered.map((p) =>
              p.foodId ? (
                <Link to={`/alimenti/${p.foodId}`} key={p.id} className="alimenti-row">
                  <span style={{ fontSize: 22 }}>{p.emoji}</span>
                  <div className="alimenti-row-info">
                    <div className="alimenti-row-name">{p.foodName}</div>
                    <div className="alimenti-row-cat">{p.measure}</div>
                  </div>
                  <div className="alimenti-row-kcal">{p.grams}<span> g</span></div>
                </Link>
              ) : (
                <div key={p.id} className="alimenti-row" style={{ cursor: 'default' }}>
                  <span style={{ fontSize: 22 }}>{p.emoji}</span>
                  <div className="alimenti-row-info">
                    <div className="alimenti-row-name">{p.foodName}</div>
                    <div className="alimenti-row-cat">{p.measure}</div>
                  </div>
                  <div className="alimenti-row-kcal">{p.grams}<span> g</span></div>
                </div>
              )
            )}
          </div>
        )}

        <p className="calc-disclaimer" style={{ marginTop: 30 }}>
          Valori indicativi: le dimensioni reali di un cucchiaio, una fetta o un frutto variano.
          Per le ricette e il Plate Builder, quando serve precisione, usa sempre una bilancia.
        </p>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
