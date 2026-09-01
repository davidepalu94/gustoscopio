import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FOODS, calc } from '../foods';
import { RECIPES, calcRecipeTotals } from '../recipes';
import { ARTICLES } from '../articles';
import { usePlate } from '../PlateContext';
import Nav from '../components/Nav';

export default function Home() {
  const navigate = useNavigate();
  const { plate, addToPlate, removeFromPlate, updatePlateGrams, totals } = usePlate();

  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [grams, setGrams] = useState({});
  const [plateQuery, setPlateQuery] = useState('');
  const [target, setTarget] = useState(null);

  const suggestions = ['Banana', 'Avocado', 'Pasta di semola', 'Cioccolato fondente', 'Uovo'];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const foodMatches = FOODS.filter((f) => f.name.toLowerCase().includes(q))
      .map((f) => ({ type: 'food', id: f.id, emoji: f.emoji, label: f.name, meta: `${f.kcal} kcal / 100 g` }));

    const recipeMatches = RECIPES.filter((r) => r.name.toLowerCase().includes(q))
      .map((r) => ({ type: 'recipe', id: r.id, emoji: r.emoji, label: r.name, meta: r.category }));

    const articleMatches = ARTICLES.filter((a) => a.title.toLowerCase().includes(q))
      .map((a) => ({ type: 'article', id: a.id, emoji: a.emoji, label: a.title, meta: a.category }));

    return [...foodMatches, ...recipeMatches, ...articleMatches].slice(0, 8);
  }, [query]);

  const FEATURED_IDS = ['banana', 'avocado', 'pasta', 'pollo', 'uova', 'mandorle', 'cioccolato', 'pomodoro'];
  const kcalGridFoods = FEATURED_IDS.map((id) => FOODS.find((f) => f.id === id)).filter(Boolean);

  const plateFilteredFoods = useMemo(() => {
    const q = plateQuery.toLowerCase();
    return FOODS.filter((f) => f.name.toLowerCase().includes(q));
  }, [plateQuery]);

  const diff = target ? totals.kcal - target : null;
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
    <div>
      <Nav />

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
              {searchResults.map((r) => (
                <div
                  key={`${r.type}-${r.id}`}
                  className="search-result-row"
                  onClick={() => {
                    setQuery('');
                    if (r.type === 'food') navigate(`/alimenti/${r.id}`);
                    else if (r.type === 'recipe') navigate(`/ricette/${r.id}`);
                    else navigate(`/articoli/${r.id}`);
                  }}
                >
                  <span>{r.emoji}</span>
                  <span>{r.label}</span>
                  <span className="search-result-kcal">{r.meta}</span>
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
                      <button onClick={(e) => { e.stopPropagation(); setExpandedId(null); }} className="close-x">✕</button>
                    </div>
                    <div className="expand-grid">
                      <div className="slider-row">
                        <div className="slider-label"><span>Quanta ne mangi?</span><span>{g} g</span></div>
                        <input
                          type="range" min={20} max={300} value={g}
                          onChange={(e) => setGrams({ ...grams, [f.id]: +e.target.value })}
                        />
                        <div className="food-kcal" style={{ marginTop: 14 }}>{c.kcal} <span style={{ fontSize: 15, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}>kcal</span></div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                          <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToPlate(f.id, g); }}>
                            + Aggiungi al piatto
                          </button>
                          <Link to={`/alimenti/${f.id}`} className="ghost-link-btn" onClick={(e) => e.stopPropagation()}>
                            Vedi scheda completa →
                          </Link>
                        </div>
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

      <div className="plate-section" id="plate-builder">
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
                  <div className="plate-food-row-info">
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
                    <div className="plate-item-actions">
                      <div className="stepper">
                        <button onClick={() => updatePlateGrams(item.uid, item.grams - 10)}>−</button>
                        <input
                          type="number"
                          className="stepper-input"
                          value={item.grams}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v === '') { updatePlateGrams(item.uid, 0); return; }
                            const n = parseInt(v, 10);
                            if (!Number.isNaN(n)) updatePlateGrams(item.uid, n);
                          }}
                          onBlur={(e) => { if (e.target.value === '') updatePlateGrams(item.uid, 0); }}
                        />
                        <span className="stepper-unit">g</span>
                        <button onClick={() => updatePlateGrams(item.uid, item.grams + 10)}>+</button>
                      </div>
                      <button className="remove-x" onClick={() => removeFromPlate(item.uid)}>✕</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="plate-total">
              <div className="big">{totals.kcal}<span>kcal totali</span></div>
              <div className="plate-macros">
                <div><div className="v">{totals.protein}g</div><div className="l">PROTEINE</div></div>
                <div><div className="v">{totals.carbs}g</div><div className="l">CARBOIDRATI</div></div>
                <div><div className="v">{totals.fat}g</div><div className="l">GRASSI</div></div>
                <div><div className="v">{totals.fiber}g</div><div className="l">FIBRE</div></div>
              </div>

              <div className="target-row">
                {[300, 400, 500, 600, 700].map((t) => (
                  <button key={t} className={`target-btn ${target === t ? 'active' : ''}`} onClick={() => setTarget(target === t ? null : t)}>
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

      <div className="section">
        <div className="section-head">
          <h2>Mangia bene. Davvero.</h2>
          <p>Ricette semplici, valori nutrizionali chiari e zero terrorismo alimentare.</p>
        </div>
        <div className="recipe-grid">
          {RECIPES.slice(0, 3).map((r) => {
            const totals = calcRecipeTotals(r, r.baseServings);
            return (
              <Link to={`/ricette/${r.id}`} key={r.id} className="recipe-card">
                <div className="recipe-card-emoji-banner">{r.emoji}</div>
                <div className="recipe-card-body">
                  <div className="recipe-card-name">{r.name}</div>
                  <div className="recipe-card-meta">
                    <span>⏱ {r.time} min</span>
                    <span>{r.difficulty}</span>
                  </div>
                  <div className="recipe-card-kcal">{totals.kcal} <span style={{ fontSize: 14, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}>kcal</span></div>
                </div>
              </Link>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <Link to="/ricette" className="ghost-link-btn" style={{ display: 'inline-flex' }}>Vedi tutte le ricette →</Link>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Palumbo Lab.</h2>
          <p>Strumenti interattivi e articoli per esplorare la nutrizione, non solo per leggerla.</p>
        </div>
        <div className="tools-grid">
          <Link to="/confronta" className="tool-card">
            <div className="tool-icon">⚔️</div>
            <div className="tool-title">Food Battle</div>
            <div className="tool-desc">Confronta due alimenti su kcal, proteine, carboidrati, grassi e fibre.</div>
            <div className="tool-cta">Prova →</div>
          </Link>
          <Link to="/mito-o-verita" className="tool-card">
            <div className="tool-icon">🧠</div>
            <div className="tool-title">Mito o Verità</div>
            <div className="tool-desc">Metti alla prova quello che pensi di sapere sulla nutrizione.</div>
            <div className="tool-cta">Prova →</div>
          </Link>
        </div>
        <div className="article-grid" style={{ marginTop: 16 }}>
          {ARTICLES.slice(0, 2).map((a) => (
            <Link to={`/articoli/${a.id}`} key={a.id} className="article-card">
              <div className="article-card-emoji">{a.emoji}</div>
              <div className="article-card-category">{a.category.toUpperCase()}</div>
              <div className="article-card-title">{a.title}</div>
              <div className="article-card-excerpt">{a.excerpt}</div>
              <div className="article-card-time">{a.readingTime} min di lettura</div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <Link to="/lab" className="ghost-link-btn" style={{ display: 'inline-flex' }}>Esplora tutto il Lab →</Link>
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
        <Link to="/percorsi-personalizzati" className="teaser-cta">Scopri i percorsi personalizzati →</Link>
      </div>

      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
