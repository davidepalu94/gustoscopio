// Formule centralizzate per gli strumenti. Nessun calcolo va duplicato nei componenti.
// Tutti i risultati sono STIME a scopo informativo, mai prescrizioni.

const ACTIVITY_MULTIPLIERS = {
  sedentario: 1.2,
  leggero: 1.375,
  moderato: 1.55,
  intenso: 1.725,
  atleta: 1.9,
};

export const ACTIVITY_LEVELS = [
  { id: 'sedentario', label: 'Sedentario (poco o nessun esercizio)' },
  { id: 'leggero', label: 'Leggero (1-3 giorni/settimana)' },
  { id: 'moderato', label: 'Moderato (3-5 giorni/settimana)' },
  { id: 'intenso', label: 'Intenso (6-7 giorni/settimana)' },
  { id: 'atleta', label: 'Atleta (allenamento intenso quotidiano)' },
];

// Formula di Mifflin-St Jeor
export function calculateEnergyNeeds({ age, sex, weightKg, heightCm, activityLevel }) {
  let bmr;
  if (sex === 'M') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  const maintenance = bmr * multiplier;
  return {
    bmr: Math.round(bmr),
    maintenance: Math.round(maintenance),
    deficit: Math.round(maintenance - 500),
    surplus: Math.round(maintenance + 500),
  };
}

const PROTEIN_RANGES = {
  sedentario: [0.8, 1.2],
  leggero: [1.0, 1.4],
  moderato: [1.2, 1.6],
  intenso: [1.6, 2.0],
  atleta: [1.8, 2.2],
};

export function calculateProteinRange({ weightKg, activityLevel }) {
  const [lo, hi] = PROTEIN_RANGES[activityLevel] || [0.8, 1.2];
  return {
    low: Math.round(weightKg * lo),
    high: Math.round(weightKg * hi),
  };
}

export function calculateBMI({ weightKg, heightCm }) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category;
  if (bmi < 18.5) category = 'Sottopeso';
  else if (bmi < 25) category = 'Normopeso';
  else if (bmi < 30) category = 'Sovrappeso';
  else category = 'Obesità';
  return { bmi: +bmi.toFixed(1), category };
}
