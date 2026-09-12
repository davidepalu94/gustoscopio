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
    description: [
      'Hai mai cercato "quante calorie ha una banana" e ti sei perso tra mille informazioni contraddittorie? Non sei tu il problema: nessuno ti ha mai spiegato le basi in modo chiaro, senza tecnicismi e senza giudizi.',
      'Questo corso parte da zero — davvero da zero: cos\'è una caloria, come funzionano i macronutrienti, perché "dieta" non deve fare paura. Poi va dritto al punto: calcolare il tuo fabbisogno reale, costruire un piatto equilibrato, evitare gli errori più comuni, e renderlo qualcosa che mantieni nel tempo, non per due settimane.',
      '12 video, mai più di 5 minuti l\'uno. Nessun muro di teoria: ogni video ti porta a usare subito uno strumento reale di Gustoscopio, così applichi quello che impari invece di segnarlo su un quaderno che non riaprirai.',
      'Alla fine non avrai solo capito qualcosa in più sulla nutrizione. Avrai il metodo per costruire il tuo piano da solo, ogni volta che ti serve — senza doverti affidare a qualcun altro.',
    ],
    totalPlannedVideos: 12,
    salesOpen: false, // metti a true quando il corso è completo e pronto per la vendita
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
        videos: [
          { id: '7a607fb2-5d11-4586-8a2b-92df53e123b7', title: '2.1 Come si calcola il fabbisogno' },
          { id: '0fad79d7-f7b7-4521-857a-6cc15bbbdd3d', title: '2.2 Proteine: quante ne servono a te' },
        ],
      },
      {
        id: 'modulo-3',
        title: 'Modulo 3',
        videos: [
          { id: 'cd3ef792-2d72-49af-91c4-acf176b7eeee', title: '3.1 Il metodo del piatto' },
          { id: 'a3f43a14-b71c-4526-8f5e-c9f3f13dd3bc', title: '3.2 Usare il Plate Builder passo passo' },
        ],
      },
    ],
  },
];

export function getCorsoBySlug(slug) {
  return CORSI.find((c) => c.id === slug) ?? null;
}

export function countAvailableVideos(corso) {
  return corso.modules.reduce((sum, m) => sum + (m.videos?.length ?? 0), 0);
}
