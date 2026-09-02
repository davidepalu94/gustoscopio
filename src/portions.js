// Conversioni pratiche misura casalinga -> grammi.
// Valori indicativi (le dimensioni reali variano): utili per stimare le
// porzioni senza bilancia, non per sostituire una pesata quando serve
// precisione (es. nel Plate Builder o nelle ricette).
// foodId, quando presente, deve esistere in foods.js: collega alla scheda
// alimento completa.

export const PORTIONS = [
  { id: 'olio-cucchiaino', foodName: 'Olio EVO', foodId: 'olio', emoji: '🫒', measure: '1 cucchiaino', grams: 5, category: 'Condimenti' },
  { id: 'olio-cucchiaio', foodName: 'Olio EVO', foodId: 'olio', emoji: '🫒', measure: '1 cucchiaio', grams: 10, category: 'Condimenti' },
  { id: 'burro-noce', foodName: 'Burro', foodId: 'burro', emoji: '🧈', measure: '1 noce', grams: 10, category: 'Condimenti' },
  { id: 'marmellata-cucchiaio', foodName: 'Marmellata', foodId: 'marmellata', emoji: '🍯', measure: '1 cucchiaio', grams: 20, category: 'Dolci & snack' },
  { id: 'zucchero-cucchiaino', foodName: 'Zucchero', foodId: null, emoji: '🥄', measure: '1 cucchiaino', grams: 5, category: 'Dolci & snack' },
  { id: 'zucchero-cucchiaio', foodName: 'Zucchero', foodId: null, emoji: '🥄', measure: '1 cucchiaio', grams: 12, category: 'Dolci & snack' },
  { id: 'miele-cucchiaio', foodName: 'Miele', foodId: null, emoji: '🍯', measure: '1 cucchiaio', grams: 20, category: 'Dolci & snack' },
  { id: 'farina-cucchiaio', foodName: 'Farina 00', foodId: 'farina', emoji: '🌾', measure: '1 cucchiaio', grams: 10, category: 'Cereali & derivati' },
  { id: 'pasta-porzione', foodName: 'Pasta di semola (cruda)', foodId: 'pasta', emoji: '🍝', measure: '1 porzione media', grams: 80, category: 'Cereali & derivati' },
  { id: 'riso-porzione', foodName: 'Riso (crudo)', foodId: 'riso', emoji: '🍚', measure: '1 porzione media', grams: 80, category: 'Cereali & derivati' },
  { id: 'pane-integrale-fetta', foodName: 'Pane integrale', foodId: 'pane', emoji: '🍞', measure: '1 fetta media', grams: 30, category: 'Cereali & derivati' },
  { id: 'pane-bianco-fetta', foodName: 'Pane bianco', foodId: 'pane-bianco', emoji: '🍞', measure: '1 fetta media', grams: 25, category: 'Cereali & derivati' },
  { id: 'gallette-riso-unita', foodName: 'Gallette di riso', foodId: 'gallette-riso', emoji: '🍘', measure: '1 galletta', grams: 9, category: 'Cereali & derivati' },
  { id: 'gallette-mais-unita', foodName: 'Gallette di mais', foodId: 'gallette-mais', emoji: '🌽', measure: '1 galletta', grams: 9, category: 'Cereali & derivati' },
  { id: 'avena-porzione', foodName: 'Avena in fiocchi', foodId: 'avena', emoji: '🌾', measure: '1 porzione (per porridge)', grams: 40, category: 'Cereali & derivati' },
  { id: 'muesli-porzione', foodName: 'Muesli', foodId: 'muesli', emoji: '🥣', measure: '1 porzione', grams: 40, category: 'Cereali & derivati' },
  { id: 'uovo-medio', foodName: 'Uovo', foodId: 'uova', emoji: '🥚', measure: '1 uovo medio (sgusciato)', grams: 50, category: 'Uova' },
  { id: 'latte-tazza', foodName: 'Latte intero', foodId: 'latte-intero', emoji: '🥛', measure: '1 tazza', grams: 200, category: 'Latte & derivati' },
  { id: 'mozzarella-ciliegina', foodName: 'Mozzarella', foodId: 'mozzarella', emoji: '🧀', measure: '1 ciliegina piccola', grams: 30, category: 'Latte & derivati' },
  { id: 'parmigiano-cucchiaio', foodName: 'Parmigiano grattugiato', foodId: 'parmigiano', emoji: '🧀', measure: '1 cucchiaio', grams: 10, category: 'Latte & derivati' },
  { id: 'ricotta-cucchiaio', foodName: 'Ricotta', foodId: 'ricotta', emoji: '🧀', measure: '1 cucchiaio colmo', grams: 30, category: 'Latte & derivati' },
  { id: 'mandorle-manciata', foodName: 'Mandorle', foodId: 'mandorle', emoji: '🌰', measure: '1 manciata (circa 15 mandorle)', grams: 15, category: 'Frutta secca' },
  { id: 'noci-manciata', foodName: 'Noci', foodId: 'noci', emoji: '🌰', measure: '1 manciata (circa 4 noci)', grams: 15, category: 'Frutta secca' },
  { id: 'banana-media', foodName: 'Banana', foodId: 'banana', emoji: '🍌', measure: '1 banana media (senza buccia)', grams: 120, category: 'Frutta' },
  { id: 'mela-media', foodName: 'Mela', foodId: 'mela', emoji: '🍎', measure: '1 mela media', grams: 150, category: 'Frutta' },
];
