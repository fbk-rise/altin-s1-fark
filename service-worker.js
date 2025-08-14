self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('altin-fark-cache-v2').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './service-worker.js',
        './icons/icon-192.png',
        './icons/icon-512.png'
      ]);
    })
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== 'altin-fark-cache-v2').map(k => caches.delete(k))))
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
