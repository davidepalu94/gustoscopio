// Cosa si ottiene, in più, iniziando un Percorso personalizzato.
// Legge i cataloghi reali (corsi.js e guide.js): se aggiungi un corso o una guida,
// pagina Percorsi e modale si aggiornano da soli. Nessun prezzo scritto a mano.
import { CORSI } from './corsi';
import { GUIDE } from './guide';

export function getIncludedContent() {
  const courses = CORSI.filter((c) => typeof c.price === 'number');
  const total = courses.reduce((sum, c) => sum + c.price, 0);
  const one = courses.length === 1;
  return {
    courses,
    guides: GUIDE,
    guidePages: GUIDE.reduce((sum, g) => sum + g.pages, 0),
    // "29€ se acquistato da solo" / "58€ se acquistati da soli"
    coursesValue: courses.length
      ? `${total}€ ${one ? 'se acquistato da solo' : 'se acquistati da soli'}`
      : '',
  };
}
