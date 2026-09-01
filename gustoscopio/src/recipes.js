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
  {
    id: 'buddha-bowl-quinoa-ceci',
    name: 'Buddha bowl con quinoa e ceci',
    emoji: '🥗',
    description: 'Una ciotola completa, colorata e completamente vegetale.',
    category: 'Pranzo',
    tags: ['vegano', 'vegetariano', 'proteico'],
    time: 20,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'quinoa', grams: 80 },
      { foodId: 'ceci', grams: 100 },
      { foodId: 'avocado', grams: 50 },
      { foodId: 'pomodoro', grams: 100 },
      { foodId: 'olio', grams: 10 },
    ],
    steps: [
      'Cuoci la quinoa secondo i tempi indicati sulla confezione.',
      'Scola i ceci se in barattolo, oppure scaldali se già cotti.',
      'Componi la bowl con quinoa, ceci, avocado a fette e pomodoro a cubetti.',
      'Condisci con un filo d\'olio EVO.',
    ],
  },
  {
    id: 'salmone-forno-patate',
    name: 'Salmone al forno con patate',
    emoji: '🐟',
    description: 'Un secondo completo, ricco di omega-3 e facile da preparare.',
    category: 'Cena',
    tags: ['proteico'],
    time: 30,
    difficulty: 'Media',
    baseServings: 1,
    ingredients: [
      { foodId: 'salmone', grams: 150 },
      { foodId: 'patate', grams: 200 },
      { foodId: 'spinaci', grams: 100 },
      { foodId: 'olio', grams: 10 },
    ],
    steps: [
      'Taglia le patate a tocchetti e cuocile in forno a 200°C per circa 25 minuti.',
      'Inforna il salmone condito con un filo d\'olio per gli ultimi 15 minuti.',
      'Salta velocemente gli spinaci in padella con un filo d\'olio.',
      'Componi il piatto con salmone, patate e spinaci.',
    ],
  },
  {
    id: 'tofu-saltato-verdure',
    name: 'Tofu saltato con verdure',
    emoji: '🧊',
    description: 'Veloce, leggero, completamente vegetale.',
    category: 'Pranzo/Cena',
    tags: ['vegano', 'vegetariano', 'veloce'],
    time: 15,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'tofu', grams: 150 },
      { foodId: 'zucchine', grams: 150 },
      { foodId: 'carote', grams: 100 },
      { foodId: 'olio', grams: 10 },
    ],
    steps: [
      'Taglia il tofu a cubetti e rosolalo in padella con un filo d\'olio finché non è dorato.',
      'Aggiungi le verdure tagliate a listarelle sottili.',
      'Salta tutto insieme per 8-10 minuti a fuoco medio-alto.',
    ],
  },
  {
    id: 'farro-mozzarella-pomodoro',
    name: 'Insalata di farro con mozzarella e pomodoro',
    emoji: '🥣',
    description: 'Fresca e sazia, perfetta anche portata fuori casa.',
    category: 'Pranzo',
    tags: ['vegetariano', 'leggero'],
    time: 20,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'farro', grams: 100 },
      { foodId: 'mozzarella', grams: 100 },
      { foodId: 'pomodoro', grams: 150 },
      { foodId: 'olio', grams: 10 },
    ],
    steps: [
      'Cuoci il farro e lascialo raffreddare.',
      'Taglia la mozzarella a cubetti e il pomodoro a pezzi.',
      'Unisci tutto e condisci con olio EVO, sale e origano a piacere.',
    ],
  },
  {
    id: 'porridge-avena-mirtilli',
    name: 'Porridge di avena con mirtilli e mandorle',
    emoji: '🥣',
    description: 'Colazione calda, sazia a lungo grazie alle fibre dell\'avena.',
    category: 'Colazione',
    tags: ['vegetariano', 'veloce'],
    time: 10,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'avena', grams: 50 },
      { foodId: 'latte-scremato', grams: 200 },
      { foodId: 'mirtilli', grams: 50 },
      { foodId: 'mandorle', grams: 10 },
    ],
    steps: [
      'Cuoci l\'avena nel latte a fuoco basso per circa 5 minuti, mescolando spesso.',
      'Versa in una ciotola.',
      'Completa con mirtilli freschi e mandorle.',
    ],
  },
  {
    id: 'seitan-piastra-verdure',
    name: 'Seitan alla piastra con verdure miste',
    emoji: '🌾',
    description: 'Un secondo vegetale ricco di proteine, pronto in venti minuti.',
    category: 'Cena',
    tags: ['vegano', 'vegetariano', 'proteico'],
    time: 20,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'seitan', grams: 150 },
      { foodId: 'zucchine', grams: 100 },
      { foodId: 'peperoni', grams: 100 },
      { foodId: 'olio', grams: 10 },
    ],
    steps: [
      'Taglia il seitan a fette non troppo sottili.',
      'Cuocilo alla piastra 3-4 minuti per lato.',
      'Nel frattempo salta le verdure in padella con un filo d\'olio.',
      'Servi il seitan con le verdure a fianco.',
    ],
  },
  {
    id: 'lenticchie-stufate',
    name: 'Lenticchie stufate',
    emoji: '🫘',
    description: 'Un classico confortante, ricco di fibre e proteine vegetali.',
    category: 'Pranzo/Cena',
    tags: ['vegano', 'vegetariano', 'leggero'],
    time: 25,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'lenticchie', grams: 200 },
      { foodId: 'cipolla', grams: 50 },
      { foodId: 'pomodoro', grams: 100 },
      { foodId: 'olio', grams: 10 },
    ],
    steps: [
      'Soffriggi la cipolla tritata nell\'olio finché non appassisce.',
      'Aggiungi il pomodoro a pezzi e cuoci 5 minuti.',
      'Unisci le lenticchie già cotte e scalda insieme per altri 5 minuti.',
    ],
  },
  {
    id: 'smoothie-proteico-banana',
    name: 'Smoothie proteico alla banana',
    emoji: '🥤',
    description: 'Pronto in cinque minuti, comodo dopo l\'allenamento.',
    category: 'Snack',
    tags: ['proteico', 'veloce'],
    time: 5,
    difficulty: 'Facile',
    baseServings: 1,
    ingredients: [
      { foodId: 'banana', grams: 100 },
      { foodId: 'proteine-isolate', grams: 30 },
      { foodId: 'latte-scremato', grams: 200 },
    ],
    steps: [
      'Metti tutti gli ingredienti nel frullatore.',
      'Frulla fino a ottenere una consistenza liscia e omogenea.',
      'Servi subito.',
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
