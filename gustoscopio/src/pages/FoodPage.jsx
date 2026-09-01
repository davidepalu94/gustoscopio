import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FOODS, calc } from '../foods';
import { RECIPES } from '../recipes';
import { usePlate } from '../PlateContext';
import Nav from '../components/Nav';

export default function FoodPage() {
  const { slug } = useParams();
  const food = FOODS.find((f) => f.id === slug);
  const { addToPlate } = usePlate();
  const [grams, setGrams] = useState(100);

  if (!food) {
    return (
      <div>
        <Nav />
        <div className="section" style={{ textAlign: 'center' }}>
          <h2>Alimento non trovato</h2>
          <p style={{ color: '#575a68', marginTop: 12 }}>Non abbiamo ancora questo alimento nel database.</p>
          <Link to="/" className="teaser-cta" style={{ marginTop: 20, display: 'inline-block' }}>← Torna alla home</Link>
        </div>
      </div>
    );
  }

  const c = calc(food, grams);
  const base = { protein: food.protein, carbs: food.carbs, fat: food.fat, fiber: food.fiber };
  const maxMacro = Math.max(base.protein, base.carbs, base.fat, base.fiber, 1);

  const otherFoods = FOODS.filter((f) => f.category === food.category && f.id !== food.id).slice(0, 3);
  const relatedRecipes = RECIPES.filter((r) => r.ingredients.some((ing) => ing.foodId === food.id)).slice(0, 4);

  return (
    <div>
      <Nav />

      <div className="section" style={{ maxWidth: 820 }}>
        <Link to="/" className="breadcrumb">← Torna al Lab</Link>

        <div className="food-header">
          <div className="food-header-emoji">{food.emoji}</div>
          <div>
            <div className="food-header-category">{food.category.toUpperCase()}</div>
            <h1 className="food-header-name">{food.name}</h1>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-box stat-box-main">
            <div className="stat-val">{food.kcal}</div>
            <div className="stat-lbl">KCAL / 100 G</div>
          </div>
          <div className="stat-box"><div className="stat-val">{food.protein}g</div><div className="stat-lbl">PROTEINE</div></div>
          <div className="stat-box"><div className="stat-val">{food.carbs}g</div><div className="stat-lbl">CARBOIDRATI</div></div>
          <div className="stat-box"><div className="stat-val">{food.fat}g</div><div className="stat-lbl">GRASSI</div></div>
          <div className="stat-box"><div className="stat-val">{food.fiber}g</div><div className="stat-lbl">FIBRE</div></div>
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Cosa c'è dentro?</h3>
          <div className="breakdown-bars">
            {[
              { label: 'Proteine', value: base.protein },
              { label: 'Carboidrati', value: base.carbs },
              { label: 'Grassi', value: base.fat },
              { label: 'Fibre', value: base.fiber },
            ].map((row) => (
              <div className="bar-row" key={row.label}>
                <div className="bar-label"><span>{row.label}</span><span>{row.value}g</span></div>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${(row.value / maxMacro) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Quanta ne mangi?</h3>
          <div className="slider-label"><span>Regola la porzione</span><span>{grams} g</span></div>
          <input type="range" min={20} max={300} value={grams} onChange={(e) => setGrams(+e.target.value)} style={{ width: '100%', accentColor: '#3155FF', height: 4 }} />
          <div className="portion-buttons">
            {[100, 150, 200, 250].map((p) => (
              <button key={p} className={`portion-btn ${grams === p ? 'active' : ''}`} onClick={() => setGrams(p)}>{p} g</button>
            ))}
            <input
              type="number" min={0} className="portion-custom" placeholder="g personalizzati"
              onChange={(e) => { const v = +e.target.value; if (v > 0) setGrams(v); }}
            />
          </div>

          <div className="food-kcal" style={{ marginTop: 24, fontSize: 44 }}>
            {c.kcal} <span style={{ fontSize: 16, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}>kcal per {grams} g</span>
          </div>
          <div className="macro-row" style={{ marginTop: 16 }}>
            <div className="macro-box"><div className="val">{c.protein}g</div><div className="lbl">PROTEINE</div></div>
            <div className="macro-box"><div className="val">{c.carbs}g</div><div className="lbl">CARBOIDRATI</div></div>
            <div className="macro-box"><div className="val">{c.fat}g</div><div className="lbl">GRASSI</div></div>
            <div className="macro-box"><div className="val">{c.fiber}g</div><div className="lbl">FIBRE</div></div>
          </div>
          <button className="add-btn" style={{ marginTop: 20 }} onClick={() => addToPlate(food.id, grams)}>
            + Aggiungi al piatto
          </button>
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Nella stessa categoria</h3>
          {otherFoods.length > 0 ? (
            <div className="related-grid">
              {otherFoods.map((f) => (
                <Link to={`/alimenti/${f.id}`} key={f.id} className="related-card">
                  <span style={{ fontSize: 22 }}>{f.emoji}</span>
                  <span className="related-name">{f.name}</span>
                  <span className="related-kcal">{f.kcal} kcal</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="stub-card">Non ci sono ancora altri alimenti in questa categoria.</div>
          )}
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Ricette con {food.name.toLowerCase()}</h3>
          {relatedRecipes.length > 0 ? (
            <div className="related-grid">
              {relatedRecipes.map((r) => (
                <Link to={`/ricette/${r.id}`} key={r.id} className="related-card">
                  <span style={{ fontSize: 22 }}>{r.emoji}</span>
                  <span className="related-name">{r.name}</span>
                  <span className="related-kcal">⏱ {r.time} min</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="stub-card">Non ci sono ancora ricette con questo alimento.</div>
          )}
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Confronta</h3>
          <div className="stub-grid">
            <div className="stub-card">
              <span className="stub-badge">Presto disponibile</span>
              Confronta {food.name.toLowerCase()} con un altro alimento
            </div>
          </div>
        </div>
      </div>

      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
