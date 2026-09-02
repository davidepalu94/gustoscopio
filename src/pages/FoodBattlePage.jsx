import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FOODS, calc } from '../foods';
import Nav from '../components/Nav';

const PARAMS = [
  { id: 'kcal', label: 'Meno kcal', better: 'lower' },
  { id: 'protein', label: 'Più proteine', better: 'higher' },
  { id: 'fiber', label: 'Più fibre', better: 'higher' },
  { id: 'fat', label: 'Meno grassi', better: 'lower' },
  { id: 'carbs', label: 'Meno carboidrati', better: 'lower' },
];

const ROWS = [
  { key: 'kcal', label: 'Kcal', unit: '' },
  { key: 'protein', label: 'Proteine', unit: 'g' },
  { key: 'carbs', label: 'Carboidrati', unit: 'g' },
  { key: 'fat', label: 'Grassi', unit: 'g' },
  { key: 'fiber', label: 'Fibre', unit: 'g' },
];

export default function FoodBattlePage() {
  const [searchParams] = useSearchParams();
  const preselectedA = searchParams.get('a');

  const [foodAId, setFoodAId] = useState(preselectedA && FOODS.find((f) => f.id === preselectedA) ? preselectedA : 'pasta');
  const [foodBId, setFoodBId] = useState('riso');
  const [grams, setGrams] = useState(100);
  const [activeParam, setActiveParam] = useState(null);

  const foodA = FOODS.find((f) => f.id === foodAId);
  const foodB = FOODS.find((f) => f.id === foodBId);
  const cA = useMemo(() => calc(foodA, grams), [foodA, grams]);
  const cB = useMemo(() => calc(foodB, grams), [foodB, grams]);

  function swap() {
    setFoodAId(foodBId);
    setFoodBId(foodAId);
  }

  function winnerFor(param) {
    const def = PARAMS.find((p) => p.id === param);
    if (!def) return null;
    const vA = cA[param];
    const vB = cB[param];
    if (vA === vB) return 'tie';
    if (def.better === 'higher') return vA > vB ? 'A' : 'B';
    return vA < vB ? 'A' : 'B';
  }

  const activeWinner = activeParam ? winnerFor(activeParam) : null;

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 900 }}>
        <div className="section-head">
          <h2>Food Battle.</h2>
          <p>Due alimenti. Un confronto. Tu scegli cosa vuoi confrontare.</p>
        </div>

        <div className="battle-selectors">
          <select className="battle-select" value={foodAId} onChange={(e) => setFoodAId(e.target.value)}>
            {FOODS.map((f) => <option key={f.id} value={f.id}>{f.emoji} {f.name}</option>)}
          </select>
          <button className="swap-btn" onClick={swap} title="Scambia">⇄</button>
          <select className="battle-select" value={foodBId} onChange={(e) => setFoodBId(e.target.value)}>
            {FOODS.map((f) => <option key={f.id} value={f.id}>{f.emoji} {f.name}</option>)}
          </select>
        </div>

        <div className="battle-quantity">
          <span>Quantità confrontata</span>
          <input type="range" min={20} max={300} value={grams} onChange={(e) => setGrams(+e.target.value)} />
          <span className="battle-quantity-val">{grams} g</span>
        </div>

        <div className="battle-cards">
          <div className={`battle-card ${activeWinner === 'A' ? 'battle-winner' : ''}`}>
            <div className="food-emoji" style={{ fontSize: 40 }}>{foodA.emoji}</div>
            <div className="food-name" style={{ fontSize: 17, marginTop: 8 }}>{foodA.name}</div>
            <div className="food-kcal" style={{ marginTop: 6 }}>{cA.kcal}<span style={{ fontSize: 14, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}> kcal</span></div>
            {activeWinner === 'A' && <div className="winner-badge">Vince su questo parametro</div>}
          </div>
          <div className="battle-vs">VS</div>
          <div className={`battle-card ${activeWinner === 'B' ? 'battle-winner' : ''}`}>
            <div className="food-emoji" style={{ fontSize: 40 }}>{foodB.emoji}</div>
            <div className="food-name" style={{ fontSize: 17, marginTop: 8 }}>{foodB.name}</div>
            <div className="food-kcal" style={{ marginTop: 6 }}>{cB.kcal}<span style={{ fontSize: 14, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}> kcal</span></div>
            {activeWinner === 'B' && <div className="winner-badge">Vince su questo parametro</div>}
          </div>
        </div>

        <div className="battle-params">
          {PARAMS.map((p) => (
            <button
              key={p.id}
              className={`filter-btn ${activeParam === p.id ? 'active' : ''}`}
              onClick={() => setActiveParam(activeParam === p.id ? null : p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Confronto completo, per {grams} g</h3>
          <div className="battle-table">
            {ROWS.map((row) => {
              const vA = cA[row.key];
              const vB = cB[row.key];
              const max = Math.max(vA, vB, 1);
              return (
                <div className="battle-row" key={row.key}>
                  <div className="battle-row-label">{row.label}</div>
                  <div className="battle-row-bars">
                    <div className="battle-bar-wrap battle-bar-wrap-left">
                      <span className="battle-bar-val">{vA}{row.unit}</span>
                      <div className="battle-bar-track"><div className="battle-bar-fill battle-bar-fill-left" style={{ width: `${(vA / max) * 100}%` }} /></div>
                    </div>
                    <div className="battle-bar-wrap">
                      <div className="battle-bar-track"><div className="battle-bar-fill" style={{ width: `${(vB / max) * 100}%` }} /></div>
                      <span className="battle-bar-val">{vB}{row.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#8a8d97', fontSize: 13, marginTop: 20 }}>
          Nessun alimento è "migliore" in assoluto: dipende da cosa stai cercando in quel momento.
        </p>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
