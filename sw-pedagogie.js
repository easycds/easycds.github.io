/* Service worker — Pédagogie (installation en appli)
   Réseau d'abord : toujours la dernière version en ligne.
   Copie de secours de la page Pédagogie, de la trame et du livret si pas de réseau. */
var CACHE = 'pedagogie-v7';
var FILES = ['/', '/index.html', '/fonts/polices.css', '/favicon-32.png', '/pedagogie.html', '/livret.html', '/trame.js', '/reglementation.js', '/chiffres.js', '/acces.js', '/pedagogie.webmanifest',
             '/pedagogie-192.png', '/pedagogie-512.png', '/pedagogie-apple-touch.png'];
var RESEAU_D_ABORD = ['/', '/index.html', '/fonts/polices.css', '/pedagogie.html', '/livret.html', '/trame.js', '/reglementation.js', '/chiffres.js', '/acces.js', '/pedagogie.webmanifest'];

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
  if (req.method === 'GET' && url.origin === self.location.origin && url.pathname.indexOf('/fonts/') === 0 && url.pathname.slice(-6) === '.woff2') { // polices : cache d'abord, elles ne changent pas
    e.respondWith(caches.match(url.pathname).then(function (r) { return r || fetch(req).then(function (res) { if (res.ok) { var c = res.clone(); caches.open(CACHE).then(function (k) { k.put(url.pathname, c); }); } return res; }); }));
    return;
  }
  if (req.method !== 'GET' || url.origin !== self.location.origin || FILES.indexOf(url.pathname) < 0) return; // le reste du site n'est pas touché
  if (RESEAU_D_ABORD.indexOf(url.pathname) < 0) {
    // Icônes : copie en cache d'abord, réseau sinon
    e.respondWith(caches.match(url.pathname).then(function (r) { return r || fetch(req); }));
    return;
  }
  e.respondWith(
    fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })).then(function (res) { // toujours la dernière version du serveur
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(url.pathname, copy); }); }
      return res;
    }).catch(function () { return caches.match(url.pathname); })
  );
});
