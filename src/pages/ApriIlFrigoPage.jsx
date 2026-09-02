import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FOODS } from '../foods';
import { RECIPES, calcRecipeTotals } from '../recipes';
import Nav from '../components/Nav';

const KCAL_OPTIONS = [
  { id: null, label: 'Nessun limite' },
  { id: 300, label: '≤ 300 kcal' },
  { id: 500, label: '≤ 500 kcal' },
  { id: 700, label: '≤ 700 kcal' },
];

export default function ApriIlFrigoPage() {
  const [selected, setSelected] = useState([]);
  const [maxKcal, setMaxKcal] = useState(null);

  function toggleFood(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const matches = useMemo(() => {
    if (selected.length === 0) return [];
    return RECIPES.map((r) => {
      const ingredientIds = r.ingredients.map((i) => i.foodId);
      const matchedIds = ingredientIds.filter((id) => selected.includes(id));
      const missingIds = ingredientIds.filter((id) => !selected.includes(id));
      const totals = calcRecipeTotals(r, r.baseServings);
      return {
        recipe: r,
        totals,
        matchedCount: matchedIds.length,
        totalCount: ingredientIds.length,
        percentage: matchedIds.length / ingredientIds.length,
        missingNames: missingIds.map((id) => FOODS.find((f) => f.id === id)?.name).filter(Boolean),
      };
    })
      .filter((m) => m.matchedCount > 0)
      .filter((m) => !maxKcal || m.totals.kcal <= maxKcal)
      .sort((a, b) => {
        if (b.percentage !== a.percentage) return b.percentage - a.percentage;
        if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount;
        return a.recipe.time - b.recipe.time;
      });
  }, [selected, maxKcal]);

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 900 }}>
        <div className="section-head">
          <h2>Cosa c'è nel tuo frigo?</h2>
          <p>Seleziona quello che hai. Al resto pensiamo noi.</p>
        </div>

        <div className="fridge-grid">
          {FOODS.map((f) => (
            <button
              key={f.id}
              className={`fridge-chip ${selected.includes(f.id) ? 'active' : ''}`}
              onClick={() => toggleFood(f.id)}
            >
              <span style={{ fontSize: 20 }}>{f.emoji}</span>
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="fridge-kcal-filter">
            <span>Filtra per calorie</span>
            <div className="filter-group">
              {KCAL_OPTIONS.map((o) => (
                <button
                  key={o.label}
                  className={`filter-btn ${maxKcal === o.id ? 'active' : ''}`}
                  onClick={() => setMaxKcal(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="section-head" style={{ marginTop: 50, marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 700 }}>
            {selected.length === 0 ? 'In attesa dei tuoi ingredienti' : matches.length > 0 ? 'Hai questo.' : 'Nessuna ricetta corrisponde'}
          </h3>
        </div>

        {selected.length === 0 && (
          <div className="stub-card" style={{ textAlign: 'center' }}>
            Seleziona almeno un ingrediente qui sopra per scoprire cosa puoi preparare.
          </div>
        )}

        {selected.length > 0 && matches.length === 0 && (
          <div className="stub-card" style={{ textAlign: 'center' }}>
            Con questi ingredienti (e questo limite di calorie) non abbiamo ancora una ricetta pronta.
          </div>
        )}

        <div className="fridge-results">
          {matches.map((m, i) => (
            <Link to={`/ricette/${m.recipe.id}`} key={m.recipe.id} className="fridge-result-card">
              <div className="fridge-result-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="fridge-result-emoji">{m.recipe.emoji}</div>
              <div className="fridge-result-body">
                <div className="fridge-result-name">{m.recipe.name}</div>
                <div className="fridge-result-meta">
                  <span>{m.matchedCount}/{m.totalCount} ingredienti</span>
                  <span>⏱ {m.recipe.time} min</span>
                  <span>{m.totals.kcal} kcal</span>
                </div>
                {m.missingNames.length > 0 && m.missingNames.length <= 2 && (
                  <div className="fridge-missing">Ti manca: {m.missingNames.join(', ')}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
