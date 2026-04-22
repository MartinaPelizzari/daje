const CACHE_NAME = 'daje-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Installazione: salvataggio file in cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
});

// Strategia di fetch: Network first, fallback on cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});