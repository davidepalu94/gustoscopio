// Guide PDF a pagamento. Gli id sono gli STESSI di tools/guide-pdf/common.py (CATALOG)
// e coincidono con il nome del file nel bucket privato "guide" di Supabase
// (es. guida-proteine → guida-proteine.pdf).
//
// Regola come per corsi.js: niente contenuti inventati. Il prezzo non è ancora
// deciso, quindi price = null e salesOpen = false: le guide risultano
// "Prossimamente" finché non imposti price (in euro) e salesOpen: true.
// Le pagine e i capitoli riflettono i PDF realmente generati.

export const GUIDE = [
  {
    id: 'guida-proteine',
    title: 'Proteine: la guida pratica',
    coverEmoji: '🥚',
    subtitle: 'Quante ne servono, dove trovarle, come distribuirle nella giornata.',
    hook: 'Quante proteine ti servono davvero? Dipende da te. Questa guida ti fa fare il conto, poi ti mostra dove trovarle e come distribuirle, con i numeri veri del database di Gustoscopio.',
    pages: 15,
    price: null,
    priceLabel: null,
    salesOpen: false,
    chapters: [
      'A cosa servono le proteine',
      'Quante ne servono davvero',
      'Dove si trovano',
      'Animali e vegetali',
      'Come distribuirle nella giornata',
      'Sei domande frequenti',
      'La tua scheda (stampabile)',
    ],
  },
  {
    id: 'guida-piatto-bilanciato',
    title: 'Il piatto bilanciato',
    coverEmoji: '🍽️',
    subtitle: 'Il metodo del piatto e le porzioni, per mangiare bene senza pesare tutto.',
    hook: 'Un modo di mangiare bene non dovrebbe richiedere una bilancia a ogni pasto. Il metodo del piatto sposta il ragionamento dai grammi alle proporzioni, con piatti reali della sezione Ricette.',
    pages: 12,
    price: null,
    priceLabel: null,
    salesOpen: false,
    chapters: [
      'Il metodo del piatto',
      'Le porzioni, senza bilancia',
      'Il metodo in pratica',
      'Adattare il piatto',
      'Una giornata di piatti',
      'Sei domande frequenti',
      'La tua scheda (stampabile)',
    ],
  },
  {
    id: 'guida-spesa-etichette',
    title: 'La spesa intelligente',
    coverEmoji: '🛒',
    subtitle: 'Leggere le etichette, riempire la dispensa, uscire dal supermercato con le idee chiare.',
    hook: 'Ingredienti, tabella nutrizionale, claim sul fronte: in che ordine si leggono e cosa dicono davvero. Con le soglie del regolamento UE e cinque passi per confrontare due prodotti.',
    pages: 11,
    price: null,
    priceLabel: null,
    salesOpen: false,
    chapters: [
      "Anatomia di un'etichetta",
      'Per 100 g o per porzione?',
      'Le parole sul fronte',
      'Ingredienti, allergeni, date',
      'La dispensa e la lista della spesa',
      'Sei domande frequenti',
      'La tua scheda (stampabile)',
    ],
  },
];

export function getGuidaById(id) {
  return GUIDE.find((g) => g.id === id) || null;
}
