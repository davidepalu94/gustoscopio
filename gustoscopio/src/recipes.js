import { FOODS, calc } from './foods';

export const RECIPES = [
  {
    id: 'pasta-tonno-pomodoro',
    name: 'Pasta al tonno e pomodoro',
    emoji: '🍝',
    description: 'Un piatto veloce e proteico, pronto in 15 minuti con pochi ingredienti.',
    category: 'Pranzo',
    tags: ['proteico', 'veloce'],
    time: 15,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'pasta', grams: 80 },
      { foodId: 'tonno', grams: 100 },
      { foodId: 'pomodoro', grams: 150 },
      { foodId: 'olio', grams: 10 },
    ],
    steps: [
      'Porta a bollore l\'acqua e cuoci la pasta secondo i tempi indicati sulla confezione.',
      'Nel frattempo scalda l\'olio in padella e aggiungi il pomodoro tagliato a pezzi.',
      'Aggiungi il tonno sgocciolato e scalda per 2-3 minuti.',
      'Scola la pasta e saltala in padella con il condimento per un minuto.',
    ],
  },
  {
    id: 'toast-avocado-uovo',
    name: 'Toast con avocado e uovo',
    emoji: '🥑',
    description: 'Colazione salata bilanciata tra grassi buoni e proteine.',
    category: 'Colazione',
    tags: ['vegetariano', 'veloce'],
    time: 10,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'pane', grams: 60 },
      { foodId: 'avocado', grams: 70 },
      { foodId: 'uova', grams: 100 },
    ],
    steps: [
      'Tosta le fette di pane integrale.',
      'Schiaccia l\'avocado con una forchetta e distribuiscilo sul pane.',
      'Cuoci l\'uovo come preferisci (in camicia, sodo o strapazzato) e adagialo sopra.',
    ],
  },
  {
    id: 'pollo-riso-spinaci',
    name: 'Pollo, riso e spinaci',
    emoji: '🍗',
    description: 'Il classico piatto post-allenamento: semplice, completo, senza sorprese.',
    category: 'Cena',
    tags: ['proteico'],
    time: 25,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'pollo', grams: 150 },
      { foodId: 'riso', grams: 80 },
      { foodId: 'spinaci', grams: 100 },
      { foodId: 'olio', grams: 5 },
    ],
    steps: [
      'Cuoci il riso in acqua bollente salata secondo i tempi indicati.',
      'Cuoci il petto di pollo in padella o al forno fino a completa cottura.',
      'Salta velocemente gli spinaci in padella con un filo d\'olio.',
      'Componi il piatto con riso, pollo a fette e spinaci.',
    ],
  },
  {
    id: 'yogurt-banana-mandorle',
    name: 'Yogurt, banana e mandorle',
    emoji: '🥣',
    description: 'Uno snack o una colazione pronta in cinque minuti, senza cottura.',
    category: 'Colazione',
    tags: ['vegetariano', 'veloce'],
    time: 5,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'yogurt', grams: 150 },
      { foodId: 'banana', grams: 100 },
      { foodId: 'mandorle', grams: 15 },
    ],
    steps: [
      'Versa lo yogurt greco in una ciotola.',
      'Taglia la banana a rondelle e aggiungila.',
      'Completa con le mandorle, intere o tritate grossolanamente.',
    ],
  },
  {
    id: 'insalata-mediterranea',
    name: 'Insalata mediterranea con tonno',
    emoji: '🥗',
    description: 'Fresca, leggera, perfetta per un pranzo estivo o una cena veloce.',
    category: 'Pranzo',
    tags: ['leggero', 'veloce'],
    time: 10,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'pomodoro', grams: 200 },
      { foodId: 'tonno', grams: 80 },
      { foodId: 'olio', grams: 10 },
      { foodId: 'pane', grams: 40 },
    ],
    steps: [
      'Taglia il pomodoro a spicchi e disponilo in una ciotola.',
      'Aggiungi il tonno sgocciolato.',
      'Condisci con l\'olio EVO.',
      'Servi con il pane a fette, tostato o a crostini.',
    ],
  },
];

export function calcRecipeTotals(recipe, servings) {
  const scale = servings / recipe.baseServings;
  return recipe.ingredients.reduce(
    (acc, ing) => {
      const food = FOODS.find((f) => f.id === ing.foodId);
      const grams = ing.grams * scale;
      const c = calc(food, grams);
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
}

export function scaledIngredients(recipe, servings) {
  const scale = servings / recipe.baseServings;
  return recipe.ingredients.map((ing) => {
    const food = FOODS.find((f) => f.id === ing.foodId);
    return { food, grams: Math.round(ing.grams * scale) };
  });
}
