const CACHE_NAME = "sofalio";

const urlsToCache = [
    "/",
    "/index.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/app.js",
    "/pages/sofa.html",
    "/manifest.json",
    "/icon.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
