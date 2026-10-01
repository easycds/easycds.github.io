/* Service worker — Pédagogie (installation en appli)
   Réseau d'abord : toujours la dernière version en ligne.
   Copie de secours de la page Pédagogie et du livret si pas de réseau. */
var CACHE = 'pedagogie-v1';
var FILES = ['/pedagogie.html', '/livret.html', '/pedagogie.webmanifest'];
var PAGES = ['/pedagogie.html', '/livret.html'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).catch(function () {}));
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('pedagogie-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || PAGES.indexOf(url.pathname) < 0) return;   // le reste du site n'est pas touché
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(url.pathname, copy); });
      return res;
    }).catch(function () { return caches.match(url.pathname); })
  );
});
