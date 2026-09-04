import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FOODS, calc } from '../foods';
import { getPortionReference } from '../calculators';
import Nav from '../components/Nav';

export default function PorzioniPage() {
  const [foodId, setFoodId] = useState('pasta');
  const food = FOODS.find((f) => f.id === foodId) || FOODS[0];
  const portion = getPortionReference(food.category);
  const [grams, setGrams] = useState(portion.grams);

  // Quando cambio alimento, riparto dalla porzione standard della sua categoria
  function handleFoodChange(id) {
    setFoodId(id);
    const f = FOODS.find((x) => x.id === id);
    setGrams(getPortionReference(f.category).grams);
  }

  const c = useMemo(() => calc(food, grams), [food, grams]);

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 640 }}>
        <Link to="/strumenti" className="breadcrumb">← Torna agli strumenti</Link>
        <div className="section-head" style={{ textAlign: 'left', marginBottom: 30 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Quanto pesa una porzione?</h2>
          <p>Un riferimento indicativo per categoria di alimento — non una regola fissa. Regola i grammi per vedere il tuo caso.</p>
        </div>

        <div className="panel-block">
          <div className="battle-selectors" style={{ marginBottom: 0 }}>
            <select className="battle-select" value={foodId} onChange={(e) => handleFoodChange(e.target.value)} style={{ minWidth: 260 }}>
              {FOODS.map((f) => <option key={f.id} value={f.id}>{f.emoji} {f.name}</option>)}
            </select>
          </div>
        </div>

        <div className="panel-block">
          <div style={{ textAlign: 'center' }}>
            <div className="calc-result-label">PORZIONE STANDARD — {food.category.toUpperCase()}</div>
            <div className="calc-result-big">{portion.grams}<span> g</span></div>
            <p style={{ color: '#8a8d97', fontSize: 13.5, marginTop: 6 }}>{portion.note}</p>
          </div>

          <div style={{ marginTop: 26 }}>
            <div className="slider-label"><span>Regola i grammi</span><span>{grams} g</span></div>
            <input
              type="range" min={10} max={400} value={grams}
              onChange={(e) => setGrams(+e.target.value)}
              style={{ width: '100%', accentColor: '#3155FF', height: 4 }}
            />
            <div className="portion-buttons">
              {[portion.grams, 100, 150, 200].filter((v, i, arr) => arr.indexOf(v) === i).map((p) => (
                <button key={p} className={`portion-btn ${grams === p ? 'active' : ''}`} onClick={() => setGrams(p)}>{p} g</button>
              ))}
              <input
                type="number" min={0} className="portion-custom" placeholder="g personalizzati"
                onChange={(e) => { const v = +e.target.value; if (v > 0) setGrams(v); }}
              />
            </div>
          </div>

          <div className="food-kcal" style={{ marginTop: 24, fontSize: 44, textAlign: 'center' }}>
            {c.kcal} <span style={{ fontSize: 16, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}>kcal per {grams} g</span>
          </div>
          <div className="macro-row" style={{ marginTop: 16 }}>
            <div className="macro-box"><div className="val">{c.protein}g</div><div className="lbl">PROTEINE</div></div>
            <div className="macro-box"><div className="val">{c.carbs}g</div><div className="lbl">CARBOIDRATI</div></div>
            <div className="macro-box"><div className="val">{c.fat}g</div><div className="lbl">GRASSI</div></div>
            <div className="macro-box"><div className="val">{c.fiber}g</div><div className="lbl">FIBRE</div></div>
          </div>

          <p className="calc-disclaimer">
            Le porzioni standard sono un riferimento generico per categoria di alimento (stile CREA/LARN),
            pensato per orientarsi — il peso reale di "una porzione" cambia in base a piatto, fame e abitudini
            personali. I valori nutrizionali sopra sono calcolati sui dati reali dell'alimento selezionato.
          </p>
        </div>

        <div className="teaser" style={{ padding: '30px 0' }}>
          <p style={{ fontSize: 14 }}>Vuoi vedere questo alimento dentro un pasto completo?</p>
          <Link to={`/alimenti/${food.id}`} className="teaser-cta" style={{ fontSize: 14 }}>Apri la scheda di {food.name} →</Link>
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
