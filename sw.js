const CACHE_NAME = 'vaktija-gtz-v1';
const urlsToCache = [
  "/",
  "index.html",
  "manifest.json",
  "index.js",
  "ramadan.json",
  "index.css",
  "./Vaktija-GornjaTuzla-2023.png"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Cache opened');
          return cache.addAll(urlsToCache);
        })
    );
  });
  

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  });
  