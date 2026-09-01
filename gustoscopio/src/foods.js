export const FOODS = [
  { id: 'banana', name: 'Banana', emoji: '🍌', kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, category: 'Frutta' },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, category: 'Frutta' },
  { id: 'pasta', name: 'Pasta di semola', emoji: '🍝', kcal: 353, protein: 13, carbs: 72, fat: 1.5, fiber: 3, category: 'Cereali & derivati' },
  { id: 'riso', name: 'Riso basmati', emoji: '🍚', kcal: 360, protein: 7, carbs: 80, fat: 0.7, fiber: 1, category: 'Cereali & derivati' },
  { id: 'pollo', name: 'Petto di pollo', emoji: '🍗', kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, category: 'Carne' },
  { id: 'uova', name: 'Uovo', emoji: '🥚', kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.5, fiber: 0, category: 'Uova' },
  { id: 'mandorle', name: 'Mandorle', emoji: '🌰', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5, category: 'Frutta secca' },
  { id: 'cioccolato', name: 'Cioccolato fondente', emoji: '🍫', kcal: 546, protein: 7.8, carbs: 45.9, fat: 31, fiber: 11, category: 'Dolci & snack' },
  { id: 'pomodoro', name: 'Pomodoro', emoji: '🍅', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, category: 'Verdura' },
  { id: 'olio', name: 'Olio EVO', emoji: '🫒', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, category: 'Condimenti' },
  { id: 'yogurt', name: 'Yogurt greco', emoji: '🥣', kcal: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0, category: 'Latte & derivati' },
  { id: 'mela', name: 'Mela', emoji: '🍎', kcal: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, category: 'Frutta' },
  { id: 'pane', name: 'Pane integrale', emoji: '🍞', kcal: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 7, category: 'Cereali & derivati' },
  { id: 'tonno', name: 'Tonno al naturale', emoji: '🐟', kcal: 116, protein: 25.5, carbs: 0, fat: 1, fiber: 0, category: 'Pesce' },
  { id: 'spinaci', name: 'Spinaci', emoji: '🥬', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, category: 'Verdura' },
];

export function calc(food, grams) {
  const f = grams / 100;
  return {
    kcal: Math.round(food.kcal * f),
    protein: +(food.protein * f).toFixed(1),
    carbs: +(food.carbs * f).toFixed(1),
    fat: +(food.fat * f).toFixed(1),
    fiber: +(food.fiber * f).toFixed(1),
  };
}
