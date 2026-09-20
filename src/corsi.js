// Libreria video su Bunny.net Stream (bunny.net → Stream → gustoscopio-corsi)
export const BUNNY_LIBRARY_ID = '745119';

export function getBunnyEmbedUrl(videoId) {
  return `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${videoId}`;
}

export function getYoutubeEmbedUrl(videoId) {
  const params = new URLSearchParams({
    modestbranding: '1', // riduce il logo YouTube
    rel: '0', // niente video correlati di altri canali a fine riproduzione
    iv_load_policy: '3', // niente annotazioni/callout sovrapposti
    controls: '0', // nasconde la barra controlli: resta solo il play iniziale
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

// Sceglie l'URL giusto in base al campo "provider" del video.
// provider assente = Bunny (comportamento di prima, retrocompatibile).
export function getEmbedUrl(video) {
  return video.provider === 'youtube'
    ? getYoutubeEmbedUrl(video.id)
    : getBunnyEmbedUrl(video.id);
}

// Regola: come per foods.js, mai inventare contenuti dei corsi per
// "sembrare completi". I moduli non ancora pronti restano con
// comingSoon: true e nessun video, invece di essere riempiti a caso.

export const CORSI = [
  {
    id: 'da-zero-al-tuo-piano',
    title: 'Da Zero al Tuo Piano',
    price: 99,
    // Prezzo del videocorso per chi inizia un percorso di consulenza (incluso nel pacchetto).
    pathPrice: 29,
    priceLabel: '99€',
    coverEmoji: '🎯',
    subtitle: 'Il videocorso per iniziare a orientarti nella nutrizione, passo dopo passo.',
    hook: 'Hai mai cercato "quante calorie ha una banana" e ti sei perso tra mille informazioni contraddittorie? Non sei tu il problema: nessuno ti ha mai spiegato le basi in modo chiaro.',
    highlights: [
      { icon: '🧠', text: 'Parti da zero: caloria, macronutrienti, perché "dieta" non deve fare paura' },
      { icon: '🎯', text: 'Dritto al punto: fabbisogno reale, piatto equilibrato, errori più comuni' },
      { icon: '⏱️', text: '12 video, mai più di 5 minuti — zero muro di teoria' },
      { icon: '🛠️', text: 'Ogni lezione usa uno strumento reale di Gustoscopio: applichi subito' },
    ],
    totalPlannedVideos: 12,
    salesOpen: true,
    modules: [
      {
        id: 'modulo-1',
        title: 'Modulo 1',
        videos: [
          { id: 'yLmn16N5WYo', provider: 'youtube', title: "1.1 Cos'è davvero una caloria" },
          { id: 'Al5auUdasPw', provider: 'youtube', title: '1.2 Macronutrienti' },
          { id: 'vhRkzZfPl1E', provider: 'youtube', title: '1.3 Perché "dieta" non deve fare paura' },
        ],
      },
      {
        id: 'modulo-2',
        title: 'Modulo 2',
        videos: [
          { id: 'Kkei4wh7qX0', provider: 'youtube', title: '2.1 Come si calcola il fabbisogno' },
          { id: '_KsOI7mtAMo', provider: 'youtube', title: '2.2 Proteine: quante ne servono a te' },
        ],
      },
      {
        id: 'modulo-3',
        title: 'Modulo 3',
        videos: [
          { id: 'qfyE1kR3ivo', provider: 'youtube', title: '3.1 Il metodo del piatto' },
          { id: '4xJIyQz3lvo', provider: 'youtube', title: '3.2 Usare il Plate Builder passo passo' },
          { id: 'aSSDE4iiozw', provider: 'youtube', title: '3.3 Esempio pratico: una giornata intera' },
        ],
      },
      {
        id: 'modulo-4',
        title: 'Modulo 4',
        videos: [
          { id: 'ClMiK5UNULs', provider: 'youtube', title: '4.1 I 3 miti che rovinano i piani' },
          { id: 'tSWa01hH8vc', provider: 'youtube', title: '4.2 Perché "buono/cattivo" non esiste' },
        ],
      },
      {
        id: 'modulo-5',
        title: 'Modulo 5',
        videos: [
          { id: 'BqlmGGUMBXQ', provider: 'youtube', title: '5.1 Cosa fare quando non hai voglia' },
          { id: '8Q-ieTOWYe4', provider: 'youtube', title: '5.2 Come adattare il piano nel tempo' },
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
