const CACHE_NAME = "2023-11-13 00:25";
const urlsToCache = [
  "/rensole-ja/",
  "/rensole-ja/index.js",
  "/rensole-ja/pronounce.tsv",
  "/rensole-ja/sql.js-httpvfs/sql-wasm.wasm",
  "/rensole-ja/sql.js-httpvfs/sqlite.worker.js",
  "/rensole-ja/mp3/incorrect1.mp3",
  "/rensole-ja/mp3/correct3.mp3",
  "/rensole-ja/favicon/favicon.svg",
  "https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
