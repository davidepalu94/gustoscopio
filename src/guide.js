// Guide PDF ESCLUSIVE dei Percorsi personalizzati: non si vendono separatamente.
// Vengono consegnate a chi ha un percorso attivo (via email, dal professionista).
// Gli id sono gli STESSI di tools/guide-pdf/common.py (CATALOG) e dei nomi dei file PDF.
// Pagine e capitoli riflettono i PDF realmente generati.

// Valore complessivo delle guide (non sono in vendita). Aggiornalo se ne aggiungi altre.
export const GUIDE_BUNDLE_VALUE_EUR = 46;

export const GUIDE = [
  {
    id: 'guida-proteine',
    title: 'Proteine: la guida pratica',
    coverEmoji: '🥚',
    subtitle: 'Quante ne servono, dove trovarle, come distribuirle nella giornata.',
    hook: 'Quante proteine ti servono davvero? Dipende da te. Questa guida ti fa fare il conto, poi ti mostra dove trovarle e come distribuirle, con i numeri veri del database di Gustoscopio.',
    pages: 15,
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
  {
    id: 'guida-fabbisogno',
    title: 'Il tuo fabbisogno',
    coverEmoji: '⚡',
    subtitle: "Come si stima l'energia che ti serve, cosa cambia con l'attività e come usare il numero senza farne un'ossessione.",
    hook: 'Un numero al giorno non si mangia, ma aiuta a orientarsi. Questa guida ti mostra come nasce la stima, come cambia da persona a persona e come capire, nel tempo, se per te è giusta.',
    pages: 10,
    chapters: [
      "Cos'è il fabbisogno",
      'La formula, passo per passo',
      'Quattro profili, cinque livelli',
      'Dai numeri ai pasti',
      'Come capire se il numero funziona',
      'Sei domande frequenti',
      'La tua scheda (stampabile)',
    ],
  },
  {
    id: 'guida-colazione-spuntini',
    title: 'Colazione e spuntini',
    coverEmoji: '🥣',
    subtitle: 'Idee bilanciate costruite su ricette reali: veloci, che saziano e facili da ripetere.',
    hook: 'Tre pezzi, molte varianti: carboidrato, proteine e qualcosa di fresco. Con ricette vere del sito, pronte in cinque minuti, e gli errori che fanno crollare la fame a metà mattina.',
    pages: 11,
    chapters: [
      'Una colazione che regge',
      'Tre schemi, molte varianti',
      'Quando hai cinque minuti',
      'Gli spuntini',
      'Piccoli errori, facili da correggere',
      'Sei domande frequenti',
      'La tua scheda (stampabile)',
    ],
  },
  {
    id: 'guida-settimana',
    title: 'Organizzare la settimana',
    coverEmoji: '🗓️',
    subtitle: 'Pianificare i pasti, cucinare in anticipo, fare una lista della spesa che regge.',
    hook: 'Una settimana di pranzi e cene con ricette reali, la lista della spesa calcolata dagli ingredienti e un piano B per quando salta tutto. Un planner da stampare per farla tua.',
    pages: 10,
    chapters: [
      'Perché pianificare',
      'Una settimana di pranzi e cene',
      'La lista della spesa, dalle ricette',
      'Cucinare in anticipo',
      'Quando salta tutto',
      'Sei domande frequenti',
      'Il tuo planner (stampabile)',
    ],
  },
  {
    id: 'guida-idratazione',
    title: 'Idratazione',
    coverEmoji: '💧',
    subtitle: 'Quanta acqua serve davvero, come cambia con attività e caldo, cosa conta come liquido.',
    hook: 'Non serve contare i bicchieri. Serve capire quanta acqua ti serve, cosa conta come liquido e quali segnali ascoltare, con le stime dello strumento Fabbisogno idrico.',
    pages: 10,
    chapters: [
      "Perché l'acqua conta",
      'Quanta ne serve',
      'Cosa conta come liquido',
      'Come capire se bevi abbastanza',
      'Sport, caldo e casi particolari',
      'Sei domande frequenti',
      'La tua scheda (stampabile)',
    ],
  },
];

export function getGuidaById(id) {
  return GUIDE.find((g) => g.id === id) || null;
}
