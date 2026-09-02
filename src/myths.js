// Ogni affermazione ha una risposta (mito/verita) e una spiegazione breve,
// basata su principi nutrizionali generali. Tono: mai assoluto, sempre
// contestuale, mai colpevolizzante.
export const MYTHS = [
  {
    id: 'carbo-sera',
    claim: 'Mangiare carboidrati la sera fa ingrassare.',
    answer: 'mito',
    explanation: 'L\'aumento di peso dipende dal bilancio calorico complessivo della giornata, non dall\'orario in cui si mangiano i carboidrati. Non esiste un "coprifuoco" biologico per i carboidrati.',
  },
  {
    id: 'frutta-zucchero',
    claim: 'La frutta contiene troppo zucchero, meglio evitarla.',
    answer: 'mito',
    explanation: 'La frutta contiene zuccheri naturali insieme a fibre, acqua e micronutrienti. Il contesto — quantità e alimentazione complessiva — conta più della singola etichetta "zucchero".',
  },
  {
    id: 'olio-illimitato',
    claim: 'L\'olio extravergine d\'oliva è sano, quindi posso usarne quanto voglio.',
    answer: 'mito',
    explanation: 'È comunque un grasso puro, molto calorico (circa 884 kcal per 100 g). "Sano" non significa "senza impatto calorico" se consumato in grandi quantità.',
  },
  {
    id: 'colazione-obbligatoria',
    claim: 'La colazione è un pasto obbligatorio per tutti.',
    answer: 'mito',
    explanation: 'Non c\'è un\'evidenza che imponga la colazione a chiunque: conta di più la qualità complessiva dell\'alimentazione nell\'arco della giornata che un pasto specifico.',
  },
  {
    id: 'saltare-pasti',
    claim: 'Saltare i pasti è il modo più efficace per dimagrire.',
    answer: 'mito',
    explanation: 'Può creare un deficit calorico nel breve periodo, ma spesso porta a fame eccessiva nei pasti successivi e non è una strategia sostenibile a lungo termine.',
  },
  {
    id: 'fibre-sazieta',
    claim: 'Le fibre aiutano a mantenere più a lungo il senso di sazietà.',
    answer: 'verita',
    explanation: 'Le fibre rallentano la digestione e l\'assorbimento dei nutrienti, contribuendo a un senso di sazietà più prolungato rispetto ad alimenti poveri di fibre.',
  },
  {
    id: 'acqua-idratazione',
    claim: 'Bere a sufficienza durante il giorno aiuta a mantenersi idratati.',
    answer: 'verita',
    explanation: 'Sembra scontato, ma è uno dei pochi principi su cui c\'è pieno accordo: l\'acqua è la fonte di idratazione più diretta ed efficiente che abbiamo.',
  },
  {
    id: 'pane-integrale-calorie',
    claim: 'Il pane integrale ha sempre molte meno calorie del pane bianco.',
    answer: 'mito',
    explanation: 'Le differenze caloriche tra pane integrale e bianco sono in realtà minime. Il vantaggio del pane integrale sta soprattutto nel contenuto di fibre, non nelle calorie.',
  },
];
