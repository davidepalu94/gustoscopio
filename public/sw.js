// GUSTOSCOPIO — Service Worker
// Rende il sito installabile come app e utilizzabile offline per le pagine
// già visitate. Strategia: "network first" per la navigazione tra pagine
// (con fallback alla shell in cache se manca la rete), "cache first con
// aggiornamento in background" per gli altri file (JS, CSS, immagini).
// Nessun tool esterno: è scritto a mano per restare semplice da capire e
// modificare in futuro.

const CACHE_NAME = 'gustoscopio-v1';
const APP_SHELL = ['/', '/index.html', '/site.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Cambio pagina/route: prova sempre la rete per avere contenuti
  // aggiornati; se manca la connessione, mostra la shell salvata in cache
  // (React Router gestisce poi la route corretta lato client).
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          return response;
        })
        .catch(() =>
          caches.match('/index.html').then((cached) => cached || caches.match('/'))
        )
    );
    return;
  }

  // Altre risorse (script, stili, immagini, font): rispondi subito dalla
  // cache se disponibile, e nel frattempo aggiorna la cache in background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
