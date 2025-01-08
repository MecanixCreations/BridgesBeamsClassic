const cacheName = "Mecanix Creations-Bridges And Beams-1.6.DevBuild";
const contentToCache = [
    "Build/htmluild2.loader.js",
    "Build/4b9c05154d89a472555d0e176c761146.js.unityweb",
    "Build/a01c0d1c4824c84e9fde66e8f9c21ce2.data.unityweb",
    "Build/1fdf6ca9f2ce3dcfb02b0b77e5b96214.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
