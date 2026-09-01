import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RECIPES, calcRecipeTotals } from '../recipes';
import Nav from '../components/Nav';

const KCAL_BUCKETS = [
  { id: 'lt300', label: '< 300', test: (k) => k < 300 },
  { id: '300-500', label: '300–500', test: (k) => k >= 300 && k <= 500 },
  { id: '500-700', label: '500–700', test: (k) => k > 500 && k <= 700 },
  { id: 'gt700', label: '700+', test: (k) => k > 700 },
];
const TIME_BUCKETS = [
  { id: 'lt15', label: '< 15 min', test: (t) => t < 15 },
  { id: '15-30', label: '15–30 min', test: (t) => t >= 15 && t <= 30 },
  { id: 'gt30', label: '30+ min', test: (t) => t > 30 },
];
const CATEGORIES = ['Colazione', 'Pranzo', 'Cena'];

export default function RecipesPage() {
  const [kcalFilter, setKcalFilter] = useState(null);
  const [timeFilter, setTimeFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const recipesWithTotals = useMemo(
    () => RECIPES.map((r) => ({ ...r, totals: calcRecipeTotals(r, r.baseServings) })),
    []
  );

  const filtered = recipesWithTotals.filter((r) => {
    if (kcalFilter && !KCAL_BUCKETS.find((b) => b.id === kcalFilter).test(r.totals.kcal)) return false;
    if (timeFilter && !TIME_BUCKETS.find((b) => b.id === timeFilter).test(r.time)) return false;
    if (categoryFilter && r.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div>
      <Nav />
      <div className="section">
        <div className="section-head">
          <h2>Mangia bene. Davvero.</h2>
          <p>Ricette semplici, valori nutrizionali chiari e zero terrorismo alimentare.</p>
        </div>

        <div className="recipe-filters">
          <div className="filter-group">
            {KCAL_BUCKETS.map((b) => (
              <button key={b.id} className={`filter-btn ${kcalFilter === b.id ? 'active' : ''}`} onClick={() => setKcalFilter(kcalFilter === b.id ? null : b.id)}>
                {b.label}
              </button>
            ))}
          </div>
          <div className="filter-group">
            {TIME_BUCKETS.map((b) => (
              <button key={b.id} className={`filter-btn ${timeFilter === b.id ? 'active' : ''}`} onClick={() => setTimeFilter(timeFilter === b.id ? null : b.id)}>
                {b.label}
              </button>
            ))}
          </div>
          <div className="filter-group">
            {CATEGORIES.map((c) => (
              <button key={c} className={`filter-btn ${categoryFilter === c ? 'active' : ''}`} onClick={() => setCategoryFilter(categoryFilter === c ? null : c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#8a8d97', padding: '40px 0' }}>
            Nessuna ricetta corrisponde a questi filtri. Prova a rimuoverne qualcuno.
          </div>
        ) : (
          <div className="recipe-grid">
            {filtered.map((r) => (
              <Link to={`/ricette/${r.id}`} key={r.id} className="recipe-card">
                <div className="recipe-card-emoji-banner">{r.emoji}</div>
                <div className="recipe-card-body">
                  <div className="recipe-card-name">{r.name}</div>
                  <div className="recipe-card-meta">
                    <span>⏱ {r.time} min</span>
                    <span>{r.difficulty}</span>
                    <span>{r.category}</span>
                  </div>
                  <div className="recipe-card-kcal">{r.totals.kcal} <span style={{ fontSize: 14, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}>kcal</span></div>
                </div>
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
