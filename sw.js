const CACHE_NAME = 'vaktija-gtz-v2';
const urlsToCache = [
  "/",
  "index.html",
  "manifest.json",
  "app.js",
  "ramadan.json",
  "index.css",
  "./Vaktija-GornjaTuzla-2023.png"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Old caches deleted');
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
  