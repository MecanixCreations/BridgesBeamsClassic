const cacheName = "Mecanix Creations-Bridges And Beams-1.6.DevBuild";
const contentToCache = [
    "Build/htmluild2.loader.js",
    "Build/cffa230cec04533b6ad738f98a30711f.js",
    "Build/c65cbb101beb912f7ca4347548cdabcb.data",
    "Build/7e6d658901a668c3eef6cc7c203ecc1b.wasm",
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
