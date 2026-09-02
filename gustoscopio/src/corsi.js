// Regola: come per foods.js, mai inventare contenuti dei corsi per
// "sembrare completi". Finché un modulo non è pronto, ometterlo o
// segnarlo come comingSoon: true — non riempire con testo generico.

export const CORSI = [
  // Esempio di struttura — sostituire con i corsi reali:
  // {
  //   id: 'basi-alimentazione',
  //   title: 'Le basi dell\'alimentazione',
  //   subtitle: 'Una riga che spiega cosa impari',
  //   coverEmoji: '🎓',
  //   modules: [
  //     {
  //       id: 'modulo-1',
  //       title: 'Titolo modulo 1',
  //       type: 'testo', // 'testo' | 'video' | 'pdf'
  //       content: null,
  //       comingSoon: true,
  //     },
  //   ],
  // },
];

export function getCorsoBySlug(slug) {
  return CORSI.find((c) => c.id === slug) ?? null;
}
