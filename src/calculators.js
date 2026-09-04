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

// Fabbisogno idrico: stima basata su ml/kg di peso corporeo (linea guida generica
// 30-35 ml/kg), con una maggiorazione per attività fisica e per clima caldo /
// sudorazione intensa. Non tiene conto di condizioni cliniche specifiche.
const ACTIVITY_WATER_BONUS_ML = {
  sedentario: 0,
  leggero: 300,
  moderato: 500,
  intenso: 750,
  atleta: 1000,
};

export function calculateWaterNeeds({ weightKg, activityLevel, hotClimate }) {
  const bonus = ACTIVITY_WATER_BONUS_ML[activityLevel] || 0;
  const climateBonus = hotClimate ? 500 : 0;
  const lowMl = weightKg * 30 + bonus + climateBonus;
  const highMl = weightKg * 35 + bonus + climateBonus;
  return {
    lowL: +(lowMl / 1000).toFixed(1),
    highL: +(highMl / 1000).toFixed(1),
    bonusL: +(bonus / 1000).toFixed(1),
    climateBonusL: +(climateBonus / 1000).toFixed(1),
  };
}

// Porzioni standard di riferimento per categoria (stile CREA/LARN, indicative).
// Il peso reale di "una porzione" varia molto da persona a persona e da piatto
// a piatto: qui offriamo un punto di partenza, non una regola fissa.
export const PORTION_REFERENCE = {
  'Frutta': { grams: 150, note: 'un frutto fresco di media grandezza' },
  'Verdura': { grams: 200, note: 'cruda o cotta, come contorno' },
  'Cereali & derivati': { grams: 80, note: 'pasta, riso o cereali a crudo; pane ~50 g' },
  'Legumi': { grams: 150, note: 'cotti; 30-50 g se secchi' },
  'Carne': { grams: 100, note: 'un secondo piatto standard' },
  'Pesce': { grams: 150, note: 'un secondo piatto standard' },
  'Uova': { grams: 50, note: 'un uovo di media grandezza' },
  'Latte & derivati': { grams: 125, note: 'un bicchiere di latte o uno yogurt' },
  'Frutta secca': { grams: 30, note: 'una manciata' },
  'Dolci & snack': { grams: 30, note: 'varia molto in base al prodotto' },
  'Condimenti': { grams: 10, note: 'circa un cucchiaio' },
  'Bevande': { grams: 200, note: 'un bicchiere' },
  'Proteine vegetali': { grams: 100, note: 'tofu, tempeh o simili' },
  'Integratori': { grams: 30, note: 'controlla sempre l\'etichetta del prodotto' },
};

export function getPortionReference(category) {
  return PORTION_REFERENCE[category] || { grams: 100, note: 'riferimento generico' };
}
