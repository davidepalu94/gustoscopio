import { createContext, useContext, useState, useMemo, useRef } from 'react';
import { FOODS, calc } from './foods';

const PlateContext = createContext(null);

export const MEALS = [
  { id: 'colazione', label: 'Colazione', emoji: '🌅' },
  { id: 'pranzo', label: 'Pranzo', emoji: '☀️' },
  { id: 'cena', label: 'Cena', emoji: '🌙' },
  { id: 'snack', label: 'Snack', emoji: '🍎' },
];

const EMPTY_TOTALS = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

function sumTotals(items) {
  return items.reduce((acc, item) => {
    const food = FOODS.find((f) => f.id === item.foodId);
    if (!food) return acc;
    const c = calc(food, item.grams);
    return {
      kcal: acc.kcal + c.kcal,
      protein: +(acc.protein + c.protein).toFixed(1),
      carbs: +(acc.carbs + c.carbs).toFixed(1),
      fat: +(acc.fat + c.fat).toFixed(1),
      fiber: +(acc.fiber + c.fiber).toFixed(1),
    };
  }, { ...EMPTY_TOTALS });
}

export function PlateProvider({ children }) {
  // Ogni voce ora ha anche un campo "meal": 'colazione' | 'pranzo' | 'cena' | 'snack'
  const [plate, setPlate] = useState([]);
  const [toast, setToast] = useState('');
  const uidRef = useRef(0);
  const toastTimer = useRef(null);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  }

  function addToPlate(foodId, grams, meal = 'pranzo') {
    const food = FOODS.find((f) => f.id === foodId);
    if (!food) return;
    uidRef.current += 1;
    setPlate((p) => [...p, { uid: uidRef.current, foodId, grams: grams || 100, meal }]);
    const mealLabel = MEALS.find((m) => m.id === meal)?.label || meal;
    showToast(`✓ ${food.name} aggiunta a ${mealLabel}`);
  }

  function removeFromPlate(uid) {
    setPlate((p) => p.filter((item) => item.uid !== uid));
  }

  function updatePlateGrams(uid, newGrams) {
    setPlate((p) => p.map((item) => (item.uid === uid ? { ...item, grams: Math.max(0, newGrams) } : item)));
  }

  function clearMeal(meal) {
    setPlate((p) => p.filter((item) => item.meal !== meal));
  }

  function clearDay() {
    setPlate([]);
  }

  // Totali del singolo pasto correntemente selezionato (retro-compatibilità
  // con il vecchio nome "totals" + "plate" usato altrove nel codice, qui
  // riferiti di default a tutta la giornata: chi vuole il totale di un
  // pasto specifico usa mealTotals(meal)).
  const totals = useMemo(() => sumTotals(plate), [plate]);

  const mealItems = useMemo(() => {
    const grouped = {};
    for (const m of MEALS) grouped[m.id] = plate.filter((item) => item.meal === m.id);
    return grouped;
  }, [plate]);

  const mealTotals = useMemo(() => {
    const grouped = {};
    for (const m of MEALS) grouped[m.id] = sumTotals(mealItems[m.id]);
    return grouped;
  }, [mealItems]);

  return (
    <PlateContext.Provider
      value={{
        plate,
        addToPlate,
        removeFromPlate,
        updatePlateGrams,
        clearMeal,
        clearDay,
        totals, // totale dell'intera giornata (tutti i pasti sommati)
        mealItems, // { colazione: [...], pranzo: [...], cena: [...], snack: [...] }
        mealTotals, // { colazione: {kcal,...}, pranzo: {...}, ... }
        toast,
      }}
    >
      {children}
    </PlateContext.Provider>
  );
}

export function usePlate() {
  return useContext(PlateContext);
}

