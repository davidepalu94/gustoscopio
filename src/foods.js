// NOTA SULLA QUALITÀ DEI DATI:
// I valori nutrizionali qui sotto sono valori di riferimento standard,
// comunemente usati e coerenti con le tabelle nutrizionali più diffuse
// (tipo USDA/CREA), inseriti manualmente per popolare la piattaforma.
// Prima di una pubblicazione pubblica definitiva, andrebbero collegati
// singolarmente a una fonte ufficiale verificabile (campo "source"),
// come previsto dall'architettura del database originale.
// Per centinaia o migliaia di alimenti servirà un vero import da una
// fonte esterna strutturata, non l'inserimento manuale.

export const FOODS = [
  // FRUTTA
  { id: 'banana', name: 'Banana', emoji: '🍌', kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, category: 'Frutta' },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, category: 'Frutta' },
  { id: 'mela', name: 'Mela', emoji: '🍎', kcal: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, category: 'Frutta' },
  { id: 'arancia', name: 'Arancia', emoji: '🍊', kcal: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, category: 'Frutta' },
  { id: 'kiwi', name: 'Kiwi', emoji: '🥝', kcal: 61, protein: 1.1, carbs: 14.7, fat: 0.5, fiber: 3, category: 'Frutta' },
  { id: 'fragole', name: 'Fragole', emoji: '🍓', kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, category: 'Frutta' },
  { id: 'mirtilli', name: 'Mirtilli', emoji: '🫐', kcal: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4, category: 'Frutta' },
  { id: 'pesca', name: 'Pesca', emoji: '🍑', kcal: 39, protein: 0.9, carbs: 9.5, fat: 0.3, fiber: 1.5, category: 'Frutta' },
  { id: 'uva', name: 'Uva', emoji: '🍇', kcal: 69, protein: 0.7, carbs: 18.1, fat: 0.2, fiber: 0.9, category: 'Frutta' },
  { id: 'ananas', name: 'Ananas', emoji: '🍍', kcal: 50, protein: 0.5, carbs: 13.1, fat: 0.1, fiber: 1.4, category: 'Frutta' },
  { id: 'mango', name: 'Mango', emoji: '🥭', kcal: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, category: 'Frutta' },
  { id: 'pompelmo', name: 'Pompelmo', emoji: '🍊', kcal: 42, protein: 0.8, carbs: 10.7, fat: 0.1, fiber: 1.6, category: 'Frutta' },
  { id: 'anguria', name: 'Anguria', emoji: '🍉', kcal: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4, category: 'Frutta' },

  // VERDURA
  { id: 'pomodoro', name: 'Pomodoro', emoji: '🍅', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, category: 'Verdura' },
  { id: 'spinaci', name: 'Spinaci', emoji: '🥬', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, category: 'Verdura' },
  { id: 'zucchine', name: 'Zucchine', emoji: '🥒', kcal: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, category: 'Verdura' },
  { id: 'melanzane', name: 'Melanzane', emoji: '🍆', kcal: 25, protein: 1, carbs: 5.7, fat: 0.2, fiber: 3, category: 'Verdura' },
  { id: 'carote', name: 'Carote', emoji: '🥕', kcal: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, category: 'Verdura' },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6, category: 'Verdura' },
  { id: 'cavolfiore', name: 'Cavolfiore', emoji: '🥦', kcal: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, category: 'Verdura' },
  { id: 'lattuga', name: 'Insalata (lattuga)', emoji: '🥬', kcal: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, category: 'Verdura' },
  { id: 'peperoni', name: 'Peperoni', emoji: '🫑', kcal: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, category: 'Verdura' },
  { id: 'finocchi', name: 'Finocchi', emoji: '🥬', kcal: 31, protein: 1.2, carbs: 7.3, fat: 0.2, fiber: 3.1, category: 'Verdura' },
  { id: 'patate', name: 'Patate lesse', emoji: '🥔', kcal: 87, protein: 1.9, carbs: 20.1, fat: 0.1, fiber: 1.8, category: 'Verdura' },
  { id: 'cetrioli', name: 'Cetrioli', emoji: '🥒', kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, category: 'Verdura' },
  { id: 'cipolla', name: 'Cipolla', emoji: '🧅', kcal: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, category: 'Verdura' },
  { id: 'zucca', name: 'Zucca', emoji: '🎃', kcal: 26, protein: 1, carbs: 6.5, fat: 0.1, fiber: 0.5, category: 'Verdura' },

  // CEREALI & DERIVATI
  { id: 'pasta', name: 'Pasta di semola', emoji: '🍝', kcal: 353, protein: 13, carbs: 72, fat: 1.5, fiber: 3, category: 'Cereali & derivati' },
  { id: 'riso', name: 'Riso basmati', emoji: '🍚', kcal: 360, protein: 7, carbs: 80, fat: 0.7, fiber: 1, category: 'Cereali & derivati' },
  { id: 'riso-integrale', name: 'Riso integrale, cotto', emoji: '🍚', kcal: 123, protein: 2.7, carbs: 25.8, fat: 1, fiber: 1.8, category: 'Cereali & derivati' },
  { id: 'pane', name: 'Pane integrale', emoji: '🍞', kcal: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 7, category: 'Cereali & derivati' },
  { id: 'pane-bianco', name: 'Pane bianco', emoji: '🍞', kcal: 289, protein: 8.8, carbs: 56, fat: 2, fiber: 2.7, category: 'Cereali & derivati' },
  { id: 'farro', name: 'Farro, cotto', emoji: '🌾', kcal: 118, protein: 4.5, carbs: 25, fat: 0.8, fiber: 3.8, category: 'Cereali & derivati' },
  { id: 'orzo', name: 'Orzo perlato, cotto', emoji: '🌾', kcal: 123, protein: 2.3, carbs: 28.2, fat: 0.4, fiber: 3.8, category: 'Cereali & derivati' },
  { id: 'avena', name: 'Avena in fiocchi', emoji: '🌾', kcal: 379, protein: 13.5, carbs: 67.7, fat: 6.9, fiber: 10.1, category: 'Cereali & derivati' },
  { id: 'couscous', name: 'Cous cous, cotto', emoji: '🍚', kcal: 112, protein: 3.8, carbs: 23.2, fat: 0.2, fiber: 1.4, category: 'Cereali & derivati' },
  { id: 'quinoa', name: 'Quinoa, cotta', emoji: '🌾', kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8, category: 'Cereali & derivati' },
  { id: 'crackers', name: 'Crackers', emoji: '🍘', kcal: 428, protein: 10, carbs: 68, fat: 13, fiber: 3, category: 'Cereali & derivati' },
  { id: 'fette-biscottate', name: 'Fette biscottate', emoji: '🍞', kcal: 408, protein: 10.4, carbs: 76, fat: 6.9, fiber: 3.9, category: 'Cereali & derivati' },
  { id: 'farina', name: 'Farina 00', emoji: '🌾', kcal: 340, protein: 10, carbs: 76, fat: 1, fiber: 2.2, category: 'Cereali & derivati' },

  // CARNE
  { id: 'pollo', name: 'Petto di pollo', emoji: '🍗', kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, category: 'Carne' },
  { id: 'manzo', name: 'Manzo magro', emoji: '🥩', kcal: 158, protein: 21.3, carbs: 0, fat: 8, fiber: 0, category: 'Carne' },
  { id: 'tacchino', name: 'Tacchino (fesa)', emoji: '🍗', kcal: 104, protein: 24, carbs: 0, fat: 0.7, fiber: 0, category: 'Carne' },
  { id: 'maiale', name: 'Maiale (lonza)', emoji: '🥩', kcal: 143, protein: 21.6, carbs: 0, fat: 5.9, fiber: 0, category: 'Carne' },
  { id: 'vitello', name: 'Vitello', emoji: '🥩', kcal: 109, protein: 20.7, carbs: 0, fat: 2.8, fiber: 0, category: 'Carne' },
  { id: 'prosciutto-cotto', name: 'Prosciutto cotto', emoji: '🥓', kcal: 109, protein: 18, carbs: 1.5, fat: 3.3, fiber: 0, category: 'Carne' },
  { id: 'bresaola', name: 'Bresaola', emoji: '🥩', kcal: 151, protein: 32, carbs: 0.4, fat: 2.6, fiber: 0, category: 'Carne' },

  // PESCE
  { id: 'tonno', name: 'Tonno al naturale', emoji: '🐟', kcal: 116, protein: 25.5, carbs: 0, fat: 1, fiber: 0, category: 'Pesce' },
  { id: 'salmone', name: 'Salmone', emoji: '🐟', kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, category: 'Pesce' },
  { id: 'merluzzo', name: 'Merluzzo', emoji: '🐟', kcal: 82, protein: 17.8, carbs: 0, fat: 0.7, fiber: 0, category: 'Pesce' },
  { id: 'gamberi', name: 'Gamberi', emoji: '🦐', kcal: 71, protein: 15, carbs: 0.9, fat: 0.5, fiber: 0, category: 'Pesce' },
  { id: 'sgombro', name: 'Sgombro', emoji: '🐟', kcal: 205, protein: 19, carbs: 0, fat: 13.9, fiber: 0, category: 'Pesce' },

  // UOVA
  { id: 'uova', name: 'Uovo', emoji: '🥚', kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.5, fiber: 0, category: 'Uova' },

  // LEGUMI
  { id: 'ceci', name: 'Ceci, cotti', emoji: '🫘', kcal: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6, category: 'Legumi' },
  { id: 'lenticchie', name: 'Lenticchie, cotte', emoji: '🫘', kcal: 116, protein: 9, carbs: 20.1, fat: 0.4, fiber: 7.9, category: 'Legumi' },
  { id: 'fagioli', name: 'Fagioli borlotti, cotti', emoji: '🫘', kcal: 127, protein: 8.7, carbs: 22, fat: 0.5, fiber: 6.4, category: 'Legumi' },
  { id: 'piselli', name: 'Piselli', emoji: '🫛', kcal: 81, protein: 5.4, carbs: 14.5, fat: 0.4, fiber: 5.1, category: 'Legumi' },
  { id: 'edamame', name: 'Edamame (soia)', emoji: '🫛', kcal: 121, protein: 11, carbs: 8.9, fat: 5.2, fiber: 5.2, category: 'Legumi' },

  // LATTE & DERIVATI
  { id: 'yogurt', name: 'Yogurt greco (5% grassi)', emoji: '🥣', kcal: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0, category: 'Latte & derivati' },
  { id: 'yogurt-bianco', name: 'Yogurt bianco intero', emoji: '🥣', kcal: 66, protein: 3.5, carbs: 4.7, fat: 3.6, fiber: 0, category: 'Latte & derivati' },
  { id: 'latte-intero', name: 'Latte intero', emoji: '🥛', kcal: 64, protein: 3.3, carbs: 4.9, fat: 3.6, fiber: 0, category: 'Latte & derivati' },
  { id: 'latte-scremato', name: 'Latte scremato', emoji: '🥛', kcal: 36, protein: 3.4, carbs: 5, fat: 0.2, fiber: 0, category: 'Latte & derivati' },
  { id: 'mozzarella', name: 'Mozzarella', emoji: '🧀', kcal: 253, protein: 18.7, carbs: 0.7, fat: 19.5, fiber: 0, category: 'Latte & derivati' },
  { id: 'parmigiano', name: 'Parmigiano', emoji: '🧀', kcal: 392, protein: 33, carbs: 0, fat: 28, fiber: 0, category: 'Latte & derivati' },
  { id: 'ricotta', name: 'Ricotta', emoji: '🧀', kcal: 146, protein: 8.8, carbs: 3.5, fat: 10.9, fiber: 0, category: 'Latte & derivati' },

  // FRUTTA SECCA
  { id: 'mandorle', name: 'Mandorle', emoji: '🌰', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5, category: 'Frutta secca' },
  { id: 'noci', name: 'Noci', emoji: '🌰', kcal: 654, protein: 15.2, carbs: 13.7, fat: 65.2, fiber: 6.7, category: 'Frutta secca' },
  { id: 'nocciole', name: 'Nocciole', emoji: '🌰', kcal: 628, protein: 15, carbs: 16.7, fat: 60.8, fiber: 9.7, category: 'Frutta secca' },
  { id: 'pistacchi', name: 'Pistacchi', emoji: '🌰', kcal: 562, protein: 20.6, carbs: 27.5, fat: 45.4, fiber: 10.3, category: 'Frutta secca' },
  { id: 'anacardi', name: 'Anacardi', emoji: '🌰', kcal: 553, protein: 18.2, carbs: 30.2, fat: 43.9, fiber: 3.3, category: 'Frutta secca' },
  { id: 'chia', name: 'Semi di chia', emoji: '⚫', kcal: 486, protein: 16.5, carbs: 42.1, fat: 30.7, fiber: 34.4, category: 'Frutta secca' },
  { id: 'lino', name: 'Semi di lino', emoji: '🟤', kcal: 534, protein: 18.3, carbs: 28.9, fat: 42.2, fiber: 27.3, category: 'Frutta secca' },
  { id: 'semi-zucca', name: 'Semi di zucca', emoji: '🟢', kcal: 559, protein: 30.2, carbs: 10.7, fat: 49, fiber: 6, category: 'Frutta secca' },

  // CONDIMENTI
  { id: 'olio', name: 'Olio EVO', emoji: '🫒', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, category: 'Condimenti' },
  { id: 'olio-girasole', name: 'Olio di semi di girasole', emoji: '🫗', kcal: 899, protein: 0, carbs: 0, fat: 100, fiber: 0, category: 'Condimenti' },
  { id: 'burro', name: 'Burro', emoji: '🧈', kcal: 758, protein: 0.7, carbs: 0.5, fat: 83.4, fiber: 0, category: 'Condimenti' },
  { id: 'aceto-balsamico', name: 'Aceto balsamico', emoji: '🍶', kcal: 88, protein: 0.5, carbs: 17, fat: 0, fiber: 0, category: 'Condimenti' },

  // DOLCI & SNACK
  { id: 'cioccolato', name: 'Cioccolato fondente', emoji: '🍫', kcal: 546, protein: 7.8, carbs: 45.9, fat: 31, fiber: 11, category: 'Dolci & snack' },
  { id: 'biscotti', name: 'Biscotti secchi', emoji: '🍪', kcal: 458, protein: 7, carbs: 71, fat: 16, fiber: 2.5, category: 'Dolci & snack' },
  { id: 'gelato', name: 'Gelato alla crema', emoji: '🍨', kcal: 216, protein: 3.8, carbs: 24, fat: 11, fiber: 0, category: 'Dolci & snack' },
  { id: 'barretta-cereali', name: 'Barretta ai cereali', emoji: '🍫', kcal: 384, protein: 6, carbs: 68, fat: 9, fiber: 5, category: 'Dolci & snack' },
  { id: 'marmellata', name: 'Marmellata', emoji: '🍯', kcal: 246, protein: 0.4, carbs: 61, fat: 0.1, fiber: 1, category: 'Dolci & snack' },

  // BEVANDE
  { id: 'succo-arancia', name: 'Succo d\'arancia', emoji: '🧃', kcal: 45, protein: 0.7, carbs: 10.4, fat: 0.2, fiber: 0.2, category: 'Bevande' },
  { id: 'bevanda-soia', name: 'Bevanda di soia', emoji: '🥛', kcal: 33, protein: 3.3, carbs: 0.9, fat: 1.8, fiber: 0.6, category: 'Bevande' },

  // PROTEINE VEGETALI
  { id: 'seitan', name: 'Seitan', emoji: '🌾', kcal: 120, protein: 21, carbs: 4, fat: 2, fiber: 0.6, category: 'Proteine vegetali' },
  { id: 'tofu', name: 'Tofu', emoji: '⬜', kcal: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, category: 'Proteine vegetali' },
  { id: 'tofu-affumicato', name: 'Tofu affumicato', emoji: '🟫', kcal: 148, protein: 16, carbs: 1.5, fat: 9, fiber: 0.5, category: 'Proteine vegetali' },
  { id: 'tempeh', name: 'Tempeh', emoji: '🟤', kcal: 192, protein: 20.3, carbs: 7.6, fat: 10.8, fiber: 9, category: 'Proteine vegetali' },
  { id: 'affettato-vegetale', name: 'Affettato vegetale', emoji: '🥪', kcal: 236, protein: 33, carbs: 8, fat: 8, fiber: 1, category: 'Proteine vegetali' },

  // PESCE (aggiunte)
  { id: 'tonno-olio', name: 'Tonno sott\'olio, sgocciolato', emoji: '🐟', kcal: 189, protein: 25, carbs: 0, fat: 9, fiber: 0, category: 'Pesce' },
  { id: 'salmone-selvaggio', name: 'Salmone selvaggio', emoji: '🐟', kcal: 116, protein: 20, carbs: 0, fat: 3.4, fiber: 0, category: 'Pesce' },

  // UOVA (aggiunte)
  { id: 'albume', name: 'Albume d\'uovo', emoji: '🥚', kcal: 52, protein: 10.9, carbs: 0.7, fat: 0.2, fiber: 0, category: 'Uova' },

  // INTEGRATORI
  { id: 'proteine-isolate', name: 'Proteine in polvere isolate', emoji: '🥤', kcal: 360, protein: 90, carbs: 0, fat: 0, fiber: 0, category: 'Integratori' },
  { id: 'proteine-vegetali', name: 'Proteine vegetali (riso e pisello)', emoji: '🥤', kcal: 345, protein: 75, carbs: 0, fat: 5, fiber: 0, category: 'Integratori' },

  // LATTE & DERIVATI (aggiunte)
  { id: 'latte-proteico', name: 'Latte proteico vaccino scremato', emoji: '🥛', kcal: 48, protein: 7, carbs: 4.9, fat: 0, fiber: 0, category: 'Latte & derivati' },
  { id: 'yogurt-greco-0', name: 'Yogurt greco bianco 0% grassi', emoji: '🥣', kcal: 57, protein: 10, carbs: 3.6, fat: 0.2, fiber: 0, category: 'Latte & derivati' },
  { id: 'yogurt-greco-2', name: 'Yogurt greco bianco 2% grassi', emoji: '🥣', kcal: 73, protein: 9, carbs: 3.8, fat: 2, fiber: 0, category: 'Latte & derivati' },

  // CEREALI & DERIVATI (aggiunte)
  { id: 'gallette-riso', name: 'Gallette di riso', emoji: '🍘', kcal: 387, protein: 8.2, carbs: 81.5, fat: 2.8, fiber: 4.2, category: 'Cereali & derivati' },
  { id: 'gallette-mais', name: 'Gallette di mais', emoji: '🌽', kcal: 383, protein: 7.5, carbs: 82, fat: 2.5, fiber: 3.5, category: 'Cereali & derivati' },

  // NUOVI ALIMENTI
  { id: 'riso-soffiato-kelloggs', name: "Riso soffiato Kellogg's", emoji: '🍚', kcal: 381, protein: 6, carbs: 87, fat: 0.9, fiber: 2.7, category: 'Cereali & derivati' },
  { id: 'cornflakes-mais', name: 'Cornflakes di mais', emoji: '🌽', kcal: 378, protein: 7, carbs: 84, fat: 0.9, fiber: 3, category: 'Cereali & derivati' },
  { id: 'muesli', name: 'Muesli', emoji: '🥣', kcal: 362, protein: 10, carbs: 66, fat: 6, fiber: 8, category: 'Cereali & derivati' },
  { id: 'patate-dolci', name: 'Patate dolci', emoji: '🍠', kcal: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3, category: 'Verdura' },
  { id: 'funghi', name: 'Funghi champignon', emoji: '🍄', kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, category: 'Verdura' },
  { id: 'hummus', name: 'Hummus di ceci', emoji: '🧆', kcal: 166, protein: 7.9, carbs: 14.3, fat: 9.6, fiber: 6, category: 'Legumi' },
  { id: 'popcorn', name: 'Popcorn al naturale', emoji: '🍿', kcal: 387, protein: 12.9, carbs: 78, fat: 4.5, fiber: 14.5, category: 'Dolci & snack' },
  { id: 'salmone-affumicato', name: 'Salmone affumicato', emoji: '🍣', kcal: 117, protein: 18.3, carbs: 0, fat: 4.5, fiber: 0, category: 'Pesce' },
  { id: 'kefir', name: 'Kefir', emoji: '🥛', kcal: 41, protein: 3.4, carbs: 4.5, fat: 1, fiber: 0, category: 'Latte & derivati' },
  { id: 'formaggio-spalmabile-light', name: 'Formaggio spalmabile light', emoji: '🧀', kcal: 155, protein: 11, carbs: 4, fat: 10.5, fiber: 0, category: 'Latte & derivati' },
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
