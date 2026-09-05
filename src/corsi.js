// Libreria video su Bunny.net Stream (bunny.net → Stream → gustoscopio-corsi)
export const BUNNY_LIBRARY_ID = '745119';

export function getBunnyEmbedUrl(videoId) {
  return `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${videoId}`;
}

// Regola: come per foods.js, mai inventare contenuti dei corsi per
// "sembrare completi". I moduli non ancora pronti restano con
// comingSoon: true e nessun video, invece di essere riempiti a caso.

export const CORSI = [
  {
    id: 'da-zero-al-tuo-piano',
    title: 'Da Zero al Tuo Piano',
    price: 29,
    priceLabel: '29€',
    coverEmoji: '🎯',
    subtitle: 'Il videocorso per iniziare a orientarti nella nutrizione, passo dopo passo.',
    modules: [
      {
        id: 'modulo-1',
        title: 'Modulo 1',
        videos: [
          { id: '972d9550-6593-49b4-9c49-661721f24c40', title: "1.1 Cos'è davvero una caloria" },
          { id: '6c05d6c2-e635-4e65-a3a8-eb4e9cd59e0c', title: '1.2 Macronutrienti' },
          { id: '2dfce485-bbf7-403f-aefe-86c9b377265c', title: '1.3 Perché "dieta" non deve fare paura' },
        ],
      },
      {
        id: 'modulo-2',
        title: 'Modulo 2',
        videos: [],
        comingSoon: true,
      },
    ],
  },
];

export function getCorsoBySlug(slug) {
  return CORSI.find((c) => c.id === slug) ?? null;
}
