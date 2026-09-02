import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RECIPES, calcRecipeTotals, scaledIngredients } from '../recipes';
import { usePlate } from '../PlateContext';
import Nav from '../components/Nav';

export default function RecipePage() {
  const { slug } = useParams();
  const recipe = RECIPES.find((r) => r.id === slug);
  const { addToPlate } = usePlate();
  const [servings, setServings] = useState(recipe ? recipe.baseServings : 1);

  if (!recipe) {
    return (
      <div>
        <Nav />
        <div className="section" style={{ textAlign: 'center' }}>
          <h2>Ricetta non trovata</h2>
          <Link to="/ricette" className="teaser-cta" style={{ marginTop: 20, display: 'inline-block' }}>← Torna alle ricette</Link>
        </div>
      </div>
    );
  }

  const totals = calcRecipeTotals(recipe, servings);
  const ingredients = scaledIngredients(recipe, servings);
  const related = RECIPES.filter((r) => r.category === recipe.category && r.id !== recipe.id).slice(0, 3);

  function addAllToPlate() {
    ingredients.forEach((ing) => addToPlate(ing.food.id, ing.grams));
  }

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 820 }}>
        <Link to="/ricette" className="breadcrumb">← Torna alle ricette</Link>

        <div className="recipe-hero">
          <div className="recipe-hero-emoji">{recipe.emoji}</div>
          <div>
            <div className="food-header-category">{recipe.category.toUpperCase()} · ⏱ {recipe.time} MIN · {recipe.difficulty.toUpperCase()}</div>
            <h1 className="food-header-name" style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{recipe.name}</h1>
            <p style={{ color: '#575a68', marginTop: 10, fontSize: 15 }}>{recipe.description}</p>
          </div>
        </div>

        <div className="panel-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div className="servings-control">
              <span style={{ fontWeight: 700, fontSize: 14 }}>Porzioni</span>
              <button className="qty-btn" onClick={() => setServings(Math.max(1, servings - 1))}>−</button>
              <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{servings}</span>
              <button className="qty-btn" onClick={() => setServings(servings + 1)}>+</button>
            </div>
            <div className="food-kcal" style={{ fontSize: 36 }}>
              {totals.kcal} <span style={{ fontSize: 14, fontFamily: 'Manrope', fontWeight: 700, color: '#8a8d97' }}>kcal totali</span>
            </div>
          </div>
          <div className="macro-row" style={{ marginTop: 20 }}>
            <div className="macro-box"><div className="val">{totals.protein}g</div><div className="lbl">PROTEINE</div></div>
            <div className="macro-box"><div className="val">{totals.carbs}g</div><div className="lbl">CARBOIDRATI</div></div>
            <div className="macro-box"><div className="val">{totals.fat}g</div><div className="lbl">GRASSI</div></div>
            <div className="macro-box"><div className="val">{totals.fiber}g</div><div className="lbl">FIBRE</div></div>
          </div>
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Ingredienti</h3>
          <div className="ingredient-list">
            {ingredients.map((ing) => (
              <div className="ingredient-row" key={ing.food.id}>
                <Link to={`/alimenti/${ing.food.id}`}>{ing.food.emoji} {ing.food.name}</Link>
                <span>{ing.grams} g</span>
              </div>
            ))}
          </div>
          <button className="add-btn" style={{ marginTop: 18 }} onClick={addAllToPlate}>
            + Aggiungi tutto al piatto
          </button>
        </div>

        <div className="panel-block">
          <h3 className="panel-title">Preparazione</h3>
          <div className="steps-list">
            {recipe.steps.map((s, i) => (
              <div className="step-item" key={i}>
                <div className="step-num">{i + 1}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5, paddingTop: 3 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="panel-block">
            <h3 className="panel-title">Potrebbe piacerti</h3>
            <div className="related-grid">
              {related.map((r) => (
                <Link to={`/ricette/${r.id}`} key={r.id} className="related-card">
                  <span style={{ fontSize: 22 }}>{r.emoji}</span>
                  <span className="related-name">{r.name}</span>
                  <span className="related-kcal">⏱ {r.time} min</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
