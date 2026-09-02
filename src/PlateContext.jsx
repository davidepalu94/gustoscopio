import { createContext, useContext, useState, useMemo, useRef } from 'react';
import { FOODS, calc } from './foods';

const PlateContext = createContext(null);

export function PlateProvider({ children }) {
  const [plate, setPlate] = useState([]);
  const [toast, setToast] = useState('');
  const uidRef = useRef(0);
  const toastTimer = useRef(null);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  }

  function addToPlate(foodId, grams) {
    const food = FOODS.find((f) => f.id === foodId);
    if (!food) return;
    uidRef.current += 1;
    setPlate((p) => [...p, { uid: uidRef.current, foodId, grams: grams || 100 }]);
    showToast(`✓ ${food.name} aggiunta al tuo piatto`);
  }

  function removeFromPlate(uid) {
    setPlate((p) => p.filter((item) => item.uid !== uid));
  }

  function updatePlateGrams(uid, newGrams) {
    setPlate((p) => p.map((item) => (item.uid === uid ? { ...item, grams: Math.max(0, newGrams) } : item)));
  }

  const totals = useMemo(() => {
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

  return (
    <PlateContext.Provider value={{ plate, addToPlate, removeFromPlate, updatePlateGrams, totals, toast }}>
      {children}
    </PlateContext.Provider>
  );
}

export function usePlate() {
  return useContext(PlateContext);
}
