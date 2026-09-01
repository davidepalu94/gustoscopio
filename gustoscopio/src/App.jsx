import { useState, useMemo } from 'react';

const FOODS = [
  { id: 'banana', name: 'Banana', emoji: '🍌', kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6 },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
  { id: 'pasta', name: 'Pasta di semola', emoji: '🍝', kcal: 353, protein: 13, carbs: 72, fat: 1.5, fiber: 3 },
  { id: 'riso', name: 'Riso basmati', emoji: '🍚', kcal: 360, protein: 7, carbs: 80, fat: 0.7, fiber: 1 },
  { id: 'pollo', name: 'Petto di pollo', emoji: '🍗', kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  { id: 'uova', name: 'Uovo', emoji: '🥚', kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.5, fiber: 0 },
  { id: 'mandorle', name: 'Mandorle', emoji: '🌰', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5 },
  { id: 'cioccolato', name: 'Cioccolato fondente', emoji: '🍫', kcal: 546, protein: 7.8, carbs: 45.9, fat: 31, fiber: 11 },
  { id: 'pomodoro', name: 'Pomodoro', emoji: '🍅', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
  { id: 'olio', name: 'Olio EVO', emoji: '🫒', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  { id: 'yogurt', name: 'Yogurt greco', emoji: '🥣', kcal: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0 },
  { id: 'mela', name: 'Mela', emoji: '🍎', kcal: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4 },
];

function calc(food, grams) {
  const f = grams / 100;
  return {
    kcal: Math.round(food.kcal * f),
    protein: +(food.protein * f).toFixed(1),
    carbs: +(food.carbs * f).toFixed(1),
    fat: +(food.fat * f).toFixed(1),
    fiber: +(food.fiber * f).toFixed(1),
  };
}

let uidCounter = 0;

export default function App() {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [grams, setGrams] = useState({});
  const [plate, setPlate] = useState([]);
  const [plateQuery, setPlateQuery] = useState('');
  const [target, setTarget] = useState(null);
  const [toast, setToast] = useState('');

  const suggestions = ['Banana', 'Avocado', 'Pasta di semola', 'Cioccolato fondente', 'Uovo'];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return FOODS.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const kcalGridFoods = FOODS.slice(0, 8);

  const plateFilteredFoods = useMemo(() => {
    const q = plateQuery.toLowerCase();
    return FOODS.filter((f) => f.name.toLowerCase().includes(q));
  }, [plateQuery]);

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(''), 2200);
  }

  function addToPlate(foodId, g) {
    const food = FOODS.find((f) => f.id === foodId);
    uidCounter += 1;
    setPlate((p) => [...p, { uid: uidCounter, foodId, grams: g || 100 }]);
    showToast(`✓ ${food.name} aggiunta al tuo piatto`);
  }

  function removeFromPlate(uidToRemove) {
    setPlate((p) => p.filter((item) => item.uid !== uidToRemove));
  }

  function updatePlateGrams(uidToUpdate, newGrams) {
    setPlate((p) =>
      p.map((item) => (item.uid === uidToUpdate ? { ...item, grams: Math.max(0, newGrams) } : item))
    );
  }

  const plateTotals = useMemo(() => {
    return plate.reduce(
      (acc, item) => {
        const food = FOODS.find((f) => f.id === item.foodId);
        const c = calc(food, item.grams);
        return {
          kcal: acc.kcal + c.kcal,
          protein: +(acc.protein + c.protein).toFixed(1),
          carbs: +(acc.carbs + c.carbs).toFixed(1),
          fat: +(acc.fat + c.fat).toFixed(1),
          fiber: +(acc.fiber + c.fiber).toFixed(1),
        };
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  }, [plate]);

  const diff = target ? plateTotals.kcal - target : null;
  let targetLabel = null;
  if (target) {
    if (Math.abs(diff) <= 15) targetLabel = 'Sei vicino al tuo obiettivo.';
    else if (diff > 0) targetLabel = `Sei sopra di ${diff} kcal rispetto a ${target}.`;
    else targetLabel = `Sei sotto di ${Math.abs(diff)} kcal rispetto a ${target}.`;
  }

  let suggestion = null;
  if (target && diff > 30 && plate.length > 0) {
    const richest = plate
      .map((item) => {
        const food = FOODS.find((f) => f.id === item.foodId);
        return { item, food, fatKcal: food.fat * 9 * (item.grams / 100) };
      })
      .sort((a, b) => b.fatKcal - a.fatKcal)[0];
    if (richest && richest.item.grams > 10 && richest.fatKcal > 0) {
      const reduced = Math.max(5, Math.round(richest.item.grams * 0.6));
      suggestion = `Per avvicinarti a ${target} kcal, potresti ridurre ${richest.food.name.toLowerCase()} da ${richest.item.grams} g a circa ${reduced} g.`;
    }
  }

  return (
    <div className="ppl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        .ppl {
          --blue: #3155FF;
          --blue-dim: #24409e;
          --red: #C94B3C;
          --offwhite: #F8F7F3;
          --night: #10131C;
          --night-2: #1a1e2b;
          --white: #FFFFFF;
          --ink: #10131C;
          font-family: 'Manrope', sans-serif;
          background: var(--offwhite);
          color: var(--ink);
          min-height: 100vh;
        }
        .ppl * { box-sizing: border-box; }
        .ppl h1, .ppl h2, .ppl h3 {
          font-family: 'Cormorant Garamond', serif;
          margin: 0;
          line-height: 0.98;
          letter-spacing: -0.01em;
        }
        .ppl a { text-decoration: none; color: inherit; }
        .ppl button { font-family: inherit; cursor: pointer; }

        /* NAVBAR */
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 40px; position: sticky; top: 0; z-index: 50;
          background: rgba(248,247,243,0.88); backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(16,19,28,0.08);
        }
        .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: 0.02em; }
        .nav-links { display: flex; gap: 32px; font-size: 14px; font-weight: 600; color: #3d4152; }
        .nav-links span:hover { color: var(--ink); }
        .nav-cta { font-size: 14px; font-weight: 600; color: var(--blue); }
        @media (max-width: 780px) { .nav-links { display: none; } .nav { padding: 18px 20px; } }

        /* HERO */
        .hero { padding: 90px 24px 60px; text-align: center; max-width: 900px; margin: 0 auto; }
        .hero h1 { font-size: clamp(48px, 9vw, 96px); font-weight: 700; }
        .hero p.sub { font-size: 18px; color: #4b4f5e; max-width: 520px; margin: 26px auto 0; line-height: 1.5; }

        .search-wrap { max-width: 640px; margin: 44px auto 0; position: relative; }
        .search-box {
          display: flex; align-items: center; gap: 12px;
          background: var(--white); border: 1.5px solid rgba(16,19,28,0.12);
          border-radius: 14px; padding: 18px 22px; font-size: 17px;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .search-box:focus-within { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(49,85,255,0.12); }
        .search-box input { flex: 1; border: none; outline: none; font-size: 17px; font-family: inherit; background: transparent; }
        .search-results {
          position: absolute; top: calc(100% + 8px); left: 0; right: 0;
          background: var(--white); border-radius: 14px; box-shadow: 0 12px 32px rgba(16,19,28,0.14);
          padding: 10px; text-align: left; z-index: 20;
        }
        .search-result-row {
          display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px;
          font-size: 15px; font-weight: 600;
        }
        .search-result-row:hover { background: var(--offwhite); }
        .search-result-kcal { margin-left: auto; color: #7a7d89; font-weight: 500; font-size: 13px; }

        .chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 22px; }
        .chip {
          background: var(--white); border: 1px solid rgba(16,19,28,0.1); border-radius: 999px;
          padding: 8px 16px; font-size: 14px; font-weight: 600; transition: transform 140ms ease, border-color 140ms ease;
        }
        .chip:hover { border-color: var(--blue); transform: translateY(-1px); }

        /* SECTION HEADERS */
        .section { padding: 70px 24px; max-width: 1180px; margin: 0 auto; }
        .section-head { text-align: center; margin-bottom: 44px; }
        .section-head h2 { font-size: clamp(38px, 6vw, 58px); font-weight: 700; }
        .section-head p { color: #575a68; font-size: 16px; margin-top: 14px; }

        /* KCAL GRID */
        .kcal-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 900px) { .kcal-grid { grid-template-columns: repeat(2, 1fr); } }
        .food-card {
          background: var(--white); border-radius: 12px; padding: 22px;
          border: 1px solid rgba(16,19,28,0.07);
          transition: transform 180ms ease, box-shadow 180ms ease;
          cursor: pointer;
        }
        .food-card:hover { transform: translateY(-4px); box-shadow: 0 14px 28px rgba(16,19,28,0.1); }
        .food-emoji { font-size: 30px; }
        .food-name { font-weight: 700; margin-top: 10px; font-size: 15px; }
        .food-kcal { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 700; margin-top: 6px; }
        .food-kcal-label { font-size: 12px; color: #8a8d97; font-weight: 600; letter-spacing: 0.03em; }
        .food-card-expanded { grid-column: 1 / -1; cursor: default; }
        .food-card-expanded:hover { transform: none; }

        .expand-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 18px; align-items: center; }
        @media (max-width: 720px) { .expand-grid { grid-template-columns: 1fr; } }
        .slider-row input[type=range] { width: 100%; accent-color: var(--blue); height: 4px; }
        .slider-label { display: flex; justify-content: space-between; font-size: 13px; color: #6a6d79; margin-bottom: 8px; font-weight: 600; }
        .macro-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 18px; }
        .macro-box { background: var(--offwhite); border-radius: 10px; padding: 12px; text-align: center; }
        .macro-box .val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; }
        .macro-box .lbl { font-size: 11px; color: #8a8d97; font-weight: 700; letter-spacing: 0.03em; margin-top: 2px; }
        .add-btn {
          margin-top: 20px; background: var(--blue); color: white; border: none; border-radius: 10px;
          padding: 13px 22px; font-weight: 700; font-size: 14px; transition: background 140ms ease;
        }
        .add-btn:hover { background: var(--blue-dim); }

        /* PLATE BUILDER - dark signature section */
        .plate-section { background: var(--night); color: var(--white); border-radius: 28px; margin: 70px 20px; padding: 70px 40px; }
        @media (max-width: 720px) { .plate-section { padding: 40px 20px; border-radius: 18px; } }
        .plate-section .section-head p { color: #a9abb8; }
        .plate-section .section-head h2 { color: var(--white); }
        .plate-layout { display: grid; grid-template-columns: 1fr 1.1fr; gap: 40px; }
        @media (max-width: 900px) { .plate-layout { grid-template-columns: 1fr; } }

        .plate-search { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 14px 18px; display: flex; gap: 10px; align-items: center; }
        .plate-search input { background: transparent; border: none; outline: none; color: white; font-family: inherit; font-size: 15px; flex: 1; }
        .plate-food-list { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; max-height: 420px; overflow-y: auto; }
        .plate-food-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.04); }
        .plate-food-row .name { font-weight: 600; font-size: 14.5px; }
        .plate-food-row .meta { font-size: 12px; color: #9a9caa; }
        .plate-food-row button { margin-left: auto; background: var(--blue); border: none; color: white; width: 30px; height: 30px; border-radius: 8px; font-size: 17px; font-weight: 700; }

        .plate-panel { background: var(--night-2); border-radius: 16px; padding: 26px; }
        .plate-items { display: flex; flex-direction: column; gap: 10px; min-height: 60px; }
        .empty-plate { color: #7d7f8c; font-size: 14px; padding: 20px 0; text-align: center; }
        .plate-item { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; padding: 10px 12px; }
        .plate-item .info { flex: 1; }
        .plate-item .info .n { font-weight: 700; font-size: 14px; }
        .plate-item .info .k { font-size: 12px; color: #9a9caa; }
        .stepper { display: flex; align-items: center; gap: 6px; }
        .stepper button { width: 24px; height: 24px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; font-size: 13px; }
        .stepper span { min-width: 44px; text-align: center; font-size: 13px; font-weight: 600; }
        .remove-x { background: transparent; border: none; color: #7d7f8c; font-size: 16px; padding: 0 4px; }

        .plate-total { margin-top: 22px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,0.12); }
        .plate-total .big { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 700; }
        .plate-total .big span { font-size: 20px; color: #9a9caa; font-family: 'Manrope', sans-serif; font-weight: 600; margin-left: 4px; }
        .plate-macros { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-top: 14px; }
        .plate-macros div { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px; text-align: center; }
        .plate-macros .v { font-weight: 700; font-size: 15px; }
        .plate-macros .l { font-size: 10.5px; color: #9a9caa; margin-top: 2px; }

        .target-row { display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap; }
        .target-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 999px; padding: 7px 14px; font-size: 13px; font-weight: 600; }
        .target-btn.active { background: var(--blue); border-color: var(--blue); }
        .target-msg { margin-top: 14px; font-size: 13.5px; color: #d5d6de; }
        .suggestion-box { margin-top: 12px; background: rgba(201,75,60,0.14); border: 1px solid rgba(201,75,60,0.4); border-radius: 10px; padding: 12px 14px; font-size: 13px; color: #f0d3ce; }
        .suggestion-note { font-size: 11.5px; color: #9a9caa; margin-top: 6px; }

        /* TEASER */
        .teaser { text-align: center; padding: 80px 24px; max-width: 640px; margin: 0 auto; }
        .teaser .kicker { font-size: 14px; font-weight: 700; color: #7a7d89; }
        .teaser h2 { font-size: clamp(30px, 5vw, 42px); margin-top: 10px; }
        .teaser p { color: #575a68; margin-top: 16px; font-size: 15.5px; line-height: 1.6; }
        .teaser-cta { display: inline-block; margin-top: 24px; font-weight: 700; color: var(--blue); font-size: 15px; border-bottom: 2px solid var(--blue); padding-bottom: 3px; }

        footer.foot { text-align: center; padding: 40px 24px; color: #8a8d97; font-size: 12.5px; border-top: 1px solid rgba(16,19,28,0.08); }

        /* TOAST */
        .toast {
          position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
          background: var(--ink); color: white; padding: 12px 22px; border-radius: 999px;
          font-size: 14px; font-weight: 600; z-index: 100; box-shadow: 0 10px 24px rgba(0,0,0,0.2);
        }
      `}</style>

      {toast && <div className="toast">{toast}</div>}

      <nav className="nav">
        <div className="nav-logo">GUSTOSCOPIO</div>
        <div className="nav-links">
          <span>ALIMENTI</span>
          <span>RICETTE</span>
          <span>LAB</span>
          <span>STRUMENTI</span>
        </div>
        <div className="nav-cta">Percorsi personalizzati →</div>
      </nav>

      <header className="hero">
        <h1>Mangia.<br />Esplora.<br />Capisci.</h1>
        <p className="sub">
          La nutrizione non dovrebbe essere complicata. Calorie, alimenti e ricette,
          trasformati in un'esperienza da esplorare.
        </p>
        <div className="search-wrap">
          <div className="search-box">
            <span>🔎</span>
            <input
              placeholder="Cerca un alimento, una ricetta o un argomento..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((f) => (
                <div
                  key={f.id}
                  className="search-result-row"
                  onClick={() => {
                    setExpandedId(f.id);
                    setQuery('');
                    document.getElementById('kcal-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>{f.emoji}</span>
                  <span>{f.name}</span>
                  <span className="search-result-kcal">{f.kcal} kcal / 100 g</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="chips">
          {suggestions.map((s) => {
            const f = FOODS.find((x) => x.name === s);
            return (
              <button key={s} className="chip" onClick={() => { setExpandedId(f.id); document.getElementById('kcal-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                {f.emoji} {s}
              </button>
            );
          })}
        </div>
      </header>

      <section className="section" id="kcal-section">
        <div className="section-head">
          <h2>Quante kcal?</h2>
          <p>Tocca un alimento per scoprire i valori nutrizionali e regolare la porzione.</p>
        </div>
        <div className="kcal-grid">
          {kcalGridFoods.map((f) => {
            const isOpen = expandedId === f.id;
            const g = grams[f.id] ?? 100;
            const c = calc(f, g);
            return (
              <div
                key={f.id}
                className={`food-card ${isOpen ? 'food-card-expanded' : ''}`}
                onClick={() => !isOpen && setExpandedId(f.id)}
              >
                {!isOpen && (
                  <>
                    <div className="food-emoji">{f.emoji}</div>
                    <div className="food-name">{f.name}</div>
                    <div className="food-kcal">{f.kcal}</div>
                    <div className="food-kcal-label">KCAL / 100 G</div>
                  </>
                )}
                {isOpen && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="food-emoji">{f.emoji}</div>
                        <div className="food-name" style={{ fontSize: 20, marginTop: 8 }}>{f.name}</div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                        style={{ background: 'none', border: 'none', fontSize: 20, color: '#8a8d97' }}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="expand-grid">
                      <div className="slider-row">
                        <div className="slider-label"><span>Quanta ne mangi?</span><span>{g} g</span></div>
                        <input
                          type="range"
                          min={20}
                          max={300}
                          value={g}
                          onChange={(e) => setGrams({ ...grams, [f.id]: +e.target.value })}
                        />
                        <div className="food-kcal" style={{ marginTop: 14 }}>{c.kcal} <span style={{ fontSize: 15, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}>kcal</span></div>
                        <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToPlate(f.id, g); }}>
                          + Aggiungi al piatto
                        </button>
                      </div>
                      <div className="macro-row">
                        <div className="macro-box"><div className="val">{c.protein}g</div><div className="lbl">PROTEINE</div></div>
                        <div className="macro-box"><div className="val">{c.carbs}g</div><div className="lbl">CARBOIDRATI</div></div>
                        <div className="macro-box"><div className="val">{c.fat}g</div><div className="lbl">GRASSI</div></div>
                        <div className="macro-box"><div className="val">{c.fiber}g</div><div className="lbl">FIBRE</div></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="plate-section">
        <div className="section-head">
          <h2>Costruisci il tuo piatto</h2>
          <p>Aggiungi alimenti e guarda calorie e macronutrienti aggiornarsi in tempo reale.</p>
        </div>
        <div className="plate-layout">
          <div>
            <div className="plate-search">
              <span>🔎</span>
              <input placeholder="Cerca un alimento..." value={plateQuery} onChange={(e) => setPlateQuery(e.target.value)} />
            </div>
            <div className="plate-food-list">
              {plateFilteredFoods.map((f) => (
                <div key={f.id} className="plate-food-row">
                  <span style={{ fontSize: 20 }}>{f.emoji}</span>
                  <div>
                    <div className="name">{f.name}</div>
                    <div className="meta">{f.kcal} kcal / 100 g</div>
                  </div>
                  <button onClick={() => addToPlate(f.id, 100)}>+</button>
                </div>
              ))}
            </div>
          </div>

          <div className="plate-panel">
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 0.02, color: '#c7c8d2', marginBottom: 4 }}>IL TUO PIATTO</div>
            <div className="plate-items">
              {plate.length === 0 && <div className="empty-plate">Il piatto è vuoto. Aggiungi un alimento dalla lista.</div>}
              {plate.map((item) => {
                const food = FOODS.find((f) => f.id === item.foodId);
                const c = calc(food, item.grams);
                return (
                  <div key={item.uid} className="plate-item">
                    <span style={{ fontSize: 18 }}>{food.emoji}</span>
                    <div className="info">
                      <div className="n">{food.name}</div>
                      <div className="k">{c.kcal} kcal</div>
                    </div>
                    <div className="stepper">
                      <button onClick={() => updatePlateGrams(item.uid, item.grams - 10)}>−</button>
                      <span>{item.grams} g</span>
                      <button onClick={() => updatePlateGrams(item.uid, item.grams + 10)}>+</button>
                    </div>
                    <button className="remove-x" onClick={() => removeFromPlate(item.uid)}>✕</button>
                  </div>
                );
              })}
            </div>

            <div className="plate-total">
              <div className="big">{plateTotals.kcal}<span>kcal totali</span></div>
              <div className="plate-macros">
                <div><div className="v">{plateTotals.protein}g</div><div className="l">PROTEINE</div></div>
                <div><div className="v">{plateTotals.carbs}g</div><div className="l">CARBOIDRATI</div></div>
                <div><div className="v">{plateTotals.fat}g</div><div className="l">GRASSI</div></div>
                <div><div className="v">{plateTotals.fiber}g</div><div className="l">FIBRE</div></div>
              </div>

              <div className="target-row">
                {[300, 400, 500, 600, 700].map((t) => (
                  <button
                    key={t}
                    className={`target-btn ${target === t ? 'active' : ''}`}
                    onClick={() => setTarget(target === t ? null : t)}
                  >
                    {t} kcal
                  </button>
                ))}
              </div>
              {targetLabel && <div className="target-msg">{targetLabel}</div>}
              {suggestion && (
                <div className="suggestion-box">
                  {suggestion}
                  <div className="suggestion-note">Suggerimento matematico, non una prescrizione nutrizionale.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="teaser">
        <div className="kicker">TUTTO QUESTO È GRATUITO</div>
        <h2>Ma se vuoi qualcosa di personale...</h2>
        <p>
          Gli strumenti possono aiutarti a capire meglio la nutrizione. Un percorso
          personalizzato parte invece dalla tua situazione, dai tuoi obiettivi e dalle
          tue esigenze.
        </p>
        <div className="teaser-cta">Scopri i percorsi personalizzati →</div>
      </div>

      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
