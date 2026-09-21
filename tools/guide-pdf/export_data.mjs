// Esporta i dati REALI del progetto (src/foods.js, src/recipes.js, src/calculators.js)
// in data.json, così le guide PDF non contengono mai valori nutrizionali scritti a mano.
// Uso: node export_data.mjs   (nessuna dipendenza esterna)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '../../src');

// I file in src/ importano senza estensione (stile Vite): li copiamo in una
// cartella temporanea aggiungendo ".js" agli import, solo per poterli leggere con Node.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gusto-'));
fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');
for (const f of ['foods', 'recipes', 'calculators']) {
  const code = fs.readFileSync(path.join(src, `${f}.js`), 'utf8').replace(/from '\.\/(\w+)'/g, "from './$1.js'");
  fs.writeFileSync(path.join(tmp, `${f}.js`), code);
}
const foods = await import(pathToFileURL(path.join(tmp, 'foods.js')));
const recipes = await import(pathToFileURL(path.join(tmp, 'recipes.js')));
const calcs = await import(pathToFileURL(path.join(tmp, 'calculators.js')));

// Range proteici calcolati con la funzione REALE dello strumento (mai duplicare formule).
const weights = [55, 65, 75, 85, 95];
const proteinTable = {};
for (const lvl of calcs.ACTIVITY_LEVELS) {
  proteinTable[lvl.id] = weights.map((w) => calcs.calculateProteinRange({ weightKg: w, activityLevel: lvl.id }));
}

// g/kg per livello di attività: si ricavano dalla funzione reale su un peso di 100 kg.
const gPerKg = {};
for (const lvl of calcs.ACTIVITY_LEVELS) {
  const r = calcs.calculateProteinRange({ weightKg: 100, activityLevel: lvl.id });
  gPerKg[lvl.id] = [r.low / 100, r.high / 100];
}

// Fabbisogno energetico e idrico calcolati con le funzioni REALI dello strumento.
const profiles = [
  { id: 'F60', sex: 'F', age: 35, heightCm: 165, weightKg: 60 },
  { id: 'F70', sex: 'F', age: 35, heightCm: 165, weightKg: 70 },
  { id: 'M75', sex: 'M', age: 40, heightCm: 178, weightKg: 75 },
  { id: 'M85', sex: 'M', age: 40, heightCm: 178, weightKg: 85 },
];
const energyTable = { profiles, byProfile: {} };
for (const pr of profiles) {
  energyTable.byProfile[pr.id] = {};
  for (const lvl of calcs.ACTIVITY_LEVELS) {
    energyTable.byProfile[pr.id][lvl.id] = calcs.calculateEnergyNeeds({ ...pr, activityLevel: lvl.id });
  }
}
const waterWeights = [55, 65, 75, 85];
const waterTable = { weights: waterWeights, mild: {}, hot: {} };
for (const lvl of calcs.ACTIVITY_LEVELS) {
  waterTable.mild[lvl.id] = waterWeights.map((w) => calcs.calculateWaterNeeds({ weightKg: w, activityLevel: lvl.id, hotClimate: false }));
  waterTable.hot[lvl.id] = waterWeights.map((w) => calcs.calculateWaterNeeds({ weightKg: w, activityLevel: lvl.id, hotClimate: true }));
}

const out = {
  foods: foods.FOODS,
  recipes: recipes.RECIPES.map((r) => ({ ...r, totals: recipes.calcRecipeTotals(r, 1) })),
  portionRef: calcs.PORTION_REFERENCE,
  activityLevels: calcs.ACTIVITY_LEVELS,
  proteinTable: { weights, byLevel: proteinTable, gPerKg },
  energyTable,
  waterTable,
};
fs.writeFileSync(path.join(here, 'data.json'), JSON.stringify(out));
console.log(`data.json: ${out.foods.length} alimenti, ${out.recipes.length} ricette`);
