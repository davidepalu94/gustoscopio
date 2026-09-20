// Cosa si ottiene, in più, fin dalla prima visita.
// Legge i cataloghi reali (corsi.js e guide.js): se aggiungi un corso o una guida,
// pagina Percorsi e modale si aggiornano da soli. Nessun prezzo scritto a mano qui.
import { CORSI } from './corsi';
import { GUIDE, GUIDE_BUNDLE_VALUE_EUR } from './guide';
import { PREZZO_SINGOLO_DAL } from './percorsiData';

const GIORNO_MS = 24 * 60 * 60 * 1000;

export function getIncludedContent() {
  const courses = CORSI.filter((c) => typeof c.price === 'number');
  const coursesTotal = courses.reduce((sum, c) => sum + c.price, 0);
  const coursesPathTotal = courses.reduce((sum, c) => sum + (typeof c.pathPrice === 'number' ? c.pathPrice : c.price), 0);
  const one = courses.length === 1;
  // Il confronto "prezzo singolo → prezzo con il percorso" è mostrato solo se c'è davvero
  // una differenza e il prezzo singolo è in vigore da almeno 30 giorni.
  const strike =
    coursesPathTotal < coursesTotal &&
    Date.now() >= new Date(PREZZO_SINGOLO_DAL).getTime() + 30 * GIORNO_MS;
  return {
    courses,
    guides: GUIDE,
    guidePages: GUIDE.reduce((sum, g) => sum + g.pages, 0),
    coursesTotal,
    coursesPathTotal,
    strike,
    guidesValue: GUIDE_BUNDLE_VALUE_EUR,
    totalValue: coursesTotal + GUIDE_BUNDLE_VALUE_EUR,
    // "99€ se acquistato da solo" / "198€ se acquistati da soli"
    coursesValue: courses.length
      ? `${coursesTotal}€ ${one ? 'se acquistato da solo' : 'se acquistati da soli'}`
      : '',
  };
}
