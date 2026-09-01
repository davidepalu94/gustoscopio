// Ogni articolo è composto da "blocchi" (block-based content), non un
// muro di testo unico. Tipi di blocco: quickAnswer, paragraph, quiz,
// foodLink, toolLink. Questo permette di inserire elementi interattivi
// dentro il flusso dell'articolo, come richiesto dal brief originale.

export const ARTICLES = [
  {
    id: 'quante-calorie-banana',
    title: 'Quante calorie ha davvero una banana?',
    excerpt: 'Un numero semplice, ma che dice più di quanto sembri sulla frutta e sul suo posto nell\'alimentazione.',
    category: 'Calorie',
    readingTime: 4,
    emoji: '🍌',
    blocks: [
      { type: 'quickAnswer', text: 'Una banana media (circa 120 g) contiene circa 107 kcal. Il valore cambia con la dimensione, non con la varietà: più la banana è grande, più kcal apporta, in proporzione diretta.' },
      { type: 'paragraph', text: 'Il numero da solo dice poco. Quello che conta è cosa c\'è dentro quelle calorie: la banana è fatta soprattutto di carboidrati (circa 23 g per 100 g), con una piccola quota di fibre che rallenta l\'assorbimento degli zuccheri naturali.' },
      { type: 'foodLink', foodId: 'banana', label: 'Vedi la scheda completa della banana' },
      { type: 'paragraph', text: 'Il timore diffuso è che "troppo zucchero" nella frutta faccia ingrassare. In realtà il contesto conta più della singola etichetta: una banana non ha lo stesso impatto metabolico di una bibita zuccherata, anche a parità di zuccheri, perché porta con sé fibra, acqua e micronutrienti.' },
      { type: 'quiz', question: 'Quante kcal pensi abbiano 100 g di mandorle?', options: ['320 kcal', '450 kcal', '579 kcal'], correctIndex: 2, explanation: 'Le mandorle sono un alimento molto energetico: 579 kcal per 100 g, quasi 6,5 volte quelle della banana. Non "cattive": semplicemente molto dense, quindi la porzione conta più che mai.' },
      { type: 'paragraph', text: 'Ecco perché confrontare due alimenti solo per le kcal totali, senza guardare la porzione reale che si mangia, porta spesso a conclusioni sbagliate.' },
      { type: 'toolLink', to: '/confronta?a=banana', label: 'Confronta la banana con un altro alimento' },
    ],
  },
  {
    id: 'deficit-calorico',
    title: 'Come funziona davvero il deficit calorico',
    excerpt: 'Il concetto più citato (e più frainteso) quando si parla di perdita di peso.',
    category: 'Dimagrimento',
    readingTime: 5,
    emoji: '🔥',
    blocks: [
      { type: 'quickAnswer', text: 'Il deficit calorico significa consumare meno energia di quella che il corpo utilizza in un giorno. È il meccanismo alla base della perdita di peso, indipendentemente dal tipo di dieta seguita.' },
      { type: 'paragraph', text: 'Il tuo corpo brucia energia anche da fermo, per mantenere le funzioni vitali: è il metabolismo basale. A questo si aggiunge l\'energia spesa muovendosi durante la giornata e allenandosi. La somma di tutto è il tuo "fabbisogno di mantenimento".' },
      { type: 'toolLink', to: '/strumenti/fabbisogno', label: 'Calcola una stima del tuo fabbisogno' },
      { type: 'paragraph', text: 'Un deficit moderato (circa 300-500 kcal sotto il mantenimento) è generalmente più sostenibile nel tempo rispetto a un deficit drastico, che tende a portare a fame eccessiva e difficoltà a mantenere il percorso nel lungo periodo.' },
      { type: 'quiz', question: 'Saltare completamente un pasto per aumentare il deficit è generalmente una strategia sostenibile?', options: ['Sì, più deficit è sempre meglio', 'No, spesso porta a fame eccessiva dopo'], correctIndex: 1, explanation: 'Un deficit troppo aggressivo o pasti saltati spesso portano a una fame che si "ripaga" nei pasti successivi, rendendo il percorso più difficile da mantenere nel tempo.' },
      { type: 'paragraph', text: 'Il deficit calorico è un principio, non una ricetta: come raggiungerlo (quali alimenti, quanti pasti, quale distribuzione) dipende dalla situazione di ciascuno.' },
    ],
  },
  {
    id: 'quante-proteine-servono',
    title: 'Quante proteine servono davvero?',
    excerpt: 'Un intervallo, non un numero magico: dipende da peso e livello di attività.',
    category: 'Proteine',
    readingTime: 4,
    emoji: '💪',
    blocks: [
      { type: 'quickAnswer', text: 'Non esiste un numero unico valido per tutti: l\'intervallo indicativo va da circa 0,8 g per kg di peso corporeo (sedentari) fino a 2,2 g/kg per chi si allena intensamente.' },
      { type: 'paragraph', text: 'Le proteine servono soprattutto per il mantenimento e la costruzione della massa muscolare, ma anche per moltissime altre funzioni dell\'organismo. L\'idea che "più proteine mangi, più muscoli metti su" è una semplificazione: senza un adeguato stimolo allenante, l\'eccesso proteico non si trasforma automaticamente in muscolo.' },
      { type: 'toolLink', to: '/strumenti/proteine', label: 'Calcola il tuo intervallo indicativo' },
      { type: 'quiz', question: 'Un alimento con molte proteine viene automaticamente convertito in massa muscolare?', options: ['Sì, in proporzione diretta', 'No, serve anche un adeguato allenamento'], correctIndex: 1, explanation: 'La sintesi proteica muscolare richiede uno stimolo allenante (di solito di resistenza) oltre a un apporto proteico adeguato. Mangiare più proteine da solo non basta.' },
      { type: 'paragraph', text: 'Alcuni alimenti particolarmente proteici, per farsi un\'idea: petto di pollo, tonno, uova, albume, yogurt greco, legumi, tofu e tempeh.' },
      { type: 'foodLink', foodId: 'pollo', label: 'Vedi la scheda del petto di pollo' },
    ],
  },
  {
    id: 'carboidrati-sera',
    title: 'Carboidrati la sera: fanno ingrassare?',
    excerpt: 'Uno dei falsi miti più diffusi sull\'alimentazione, messo alla prova.',
    category: 'Metabolismo',
    readingTime: 3,
    emoji: '🌙',
    blocks: [
      { type: 'quickAnswer', text: 'No: l\'aumento di peso dipende dal bilancio calorico complessivo della giornata (o della settimana), non dall\'orario in cui si mangiano i carboidrati.' },
      { type: 'paragraph', text: 'L\'idea che il corpo "processi" i carboidrati in modo diverso la sera rispetto al mattino non trova conferma solida: quello che conta è quante calorie totali si assumono rispetto a quante se ne consumano, indipendentemente dalla distribuzione oraria dei pasti.' },
      { type: 'quiz', question: 'Mangiare pasta a cena invece che a pranzo, a parità di calorie totali della giornata, cambia il risultato sul peso?', options: ['Sì, significativamente', 'No, non in modo significativo'], correctIndex: 1, explanation: 'A parità di bilancio calorico complessivo, l\'orario del pasto non è il fattore determinante. Contano di più le abitudini sostenibili nel tempo.' },
      { type: 'paragraph', text: 'Questo non significa che l\'orario dei pasti non conti mai per nessuno (ad esempio per chi soffre di reflusso, o per chi si allena la mattina presto): significa solo che non esiste una regola universale "carboidrati vietati dopo una certa ora".' },
      { type: 'toolLink', to: '/mito-o-verita', label: 'Metti alla prova altri falsi miti' },
    ],
  },
];
