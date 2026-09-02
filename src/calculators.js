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

// Stima pratica: 35ml per kg di peso corporeo, con un margine aggiuntivo
// legato al livello di attività fisica (sudorazione, allenamento).
const WATER_BASE_ML_PER_KG = 35;
const WATER_ACTIVITY_EXTRA_ML = {
  sedentario: 0,
  leggero: 300,
  moderato: 500,
  intenso: 700,
  atleta: 1000,
};

export function calculateWaterNeeds({ weightKg, activityLevel }) {
  const baseMl = weightKg * WATER_BASE_ML_PER_KG;
  const extraMl = WATER_ACTIVITY_EXTRA_ML[activityLevel] || 0;
  const totalMl = baseMl + extraMl;
  return {
    totalMl: Math.round(totalMl),
    totalLiters: +(totalMl / 1000).toFixed(1),
  };
}
