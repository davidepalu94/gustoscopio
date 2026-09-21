// Prezzi e modalità dei Percorsi: UN SOLO posto da modificare (pagina Percorsi e modale leggono da qui).
//
// Logica dei prezzi (listino dello studio + contenuti Gustoscopio):
//   listino studio: prima visita 105€ · controllo 85€ · 3 incontri 250€ · 3 incontri successivi 220€
//   + 75€ di contenuti inclusi (videocorso, guide PDF, scheda di allenamento): 180€ = 105€ + 75€
//   → prima visita completa 180€ · 3 mesi 330€ · 6 mesi 550€ · 12 mesi 990€
//   (3 mesi = 3 incontri, 6 mesi = 3+3, 12 mesi = 3+3+3+3; valori arrotondati)
// La prima visita è INCLUSA in ogni percorso.

// Data (AAAA-MM-GG) da cui il prezzo singolo del videocorso (src/corsi.js) è in vigore.
// Il confronto "99€ barrato → 29€ con il percorso" compare da solo 30 giorni dopo questa data,
// perché un annuncio di riduzione deve riferirsi al prezzo più basso applicato negli ultimi 30
// giorni (art. 17-bis Codice del Consumo). Se il prezzo singolo è già a 99€ da più di 30 giorni,
// metti una data passata e il confronto compare subito.
export const PREZZO_SINGOLO_DAL = '2026-09-21';

export const MODALITA_LABEL = 'In presenza a Roma oppure online';

export const PACKAGES = [
  { id: 'visita', icon: '🎯', label: 'Prima visita completa', price: 180, months: null, isPath: false, access: '30 giorni', controls: 0, whatsapp: false,
    desc: 'Un incontro per valutare la tua situazione e i tuoi obiettivi, con tutto il materiale incluso.' },
  { id: '3m', icon: '🌱', label: 'Percorso 3 mesi', price: 330, months: 3, isPath: true, access: 'per tutta la durata del percorso', controls: 2, whatsapp: true,
    desc: 'La base per costruire le prime abitudini sostenibili.' },
  { id: '6m', icon: '🔄', label: 'Percorso 6 mesi', price: 550, months: 6, isPath: true, access: 'per tutta la durata del percorso', controls: 5, whatsapp: true,
    desc: 'Il tempo per consolidare i risultati e adattare il percorso.' },
  { id: '12m', icon: '🏆', label: 'Percorso 12 mesi', price: 990, months: 12, isPath: true, access: 'per tutta la durata del percorso', controls: 11, whatsapp: true,
    desc: 'Un accompagnamento esteso, pensato per cambiamenti duraturi.' },
];

// Il videocorso è ad accesso a tempo (le guide PDF invece restano tue).
export const ACCESSO_GENERICO = '30 giorni con la prima visita, per tutta la durata con i percorsi';

// Elenco "cosa è incluso" per ogni opzione (stesso ordine per tutte, così si confrontano a colpo d'occhio).
// on = incluso · note = dettaglio piccolo sotto la voce.
export function packageFeatures(pkg) {
  return [
    { label: "Visita nutrizionale in sede o online, con nutrizionista iscritto all'albo", on: true },
    { label: 'Infinite sostituzioni alimentari', on: true },
    pkg.controls > 0
      ? { label: `Fino a ${pkg.controls} visite di controllo`, on: true, note: 'oltre alla prima visita, se il piano le prevede' }
      : { label: 'Visite di controllo', on: false },
    { label: 'Scheda di allenamento personalizzata', on: true },
    { label: 'Videocorso', on: true, note: `accesso ${pkg.months ? pkg.access : `per ${pkg.access}`}` },
    { label: 'Guide PDF esclusive', on: true, note: 'restano tue' },
    pkg.whatsapp
      ? { label: 'Supporto via WhatsApp', on: true }
      : { label: 'Supporto via WhatsApp', on: false },
  ];
}

export function perMonth(pkg) {
  return pkg.months ? Math.round(pkg.price / pkg.months) : null;
}
