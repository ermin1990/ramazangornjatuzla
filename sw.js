const CACHE_NAME = "vaktija-cache-v1";
const urlsToCache = [
  "/",
  "index.html",
  "manifest.json",
  "index.js",
  "ramadan.json",
  "index.css"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
