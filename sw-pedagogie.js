/* Service worker — Pédagogie (installation en appli)
   Réseau d'abord : toujours la dernière version en ligne.
   Copie de secours de la page Pédagogie, de la trame et du livret si pas de réseau. */
var CACHE = 'pedagogie-v33';
var FILES = ['/outils/', '/outils/index.html', '/fonts/polices.css', '/favicon-32.png', '/pedagogie.html', '/livret.html', '/cours.html', '/situations-de-conduite.html', '/verrou.js', '/pedagogie.webmanifest',
             '/pedagogie-192.png', '/pedagogie-512.png', '/pedagogie-apple-touch.png'];
var RESEAU_D_ABORD = ['/outils/', '/outils/index.html', '/fonts/polices.css', '/pedagogie.html', '/livret.html', '/cours.html', '/situations-de-conduite.html', '/verrou.js', '/pedagogie.webmanifest'];

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
  if (req.method === 'GET' && (url.href.indexOf('https://cdnjs.cloudflare.com/ajax/libs/leaflet/') === 0 || url.href.indexOf('https://www.gstatic.com/firebasejs/') === 0)) {
    // bibliothèques versionnées (carte, Firebase) : copie de secours pour le hors ligne
    e.respondWith(caches.match(req).then(function (r) { return r || fetch(req).then(function (res) { if (res && (res.ok || res.type === 'opaque')) { var c = res.clone(); caches.open(CACHE).then(function (k) { k.put(req, c); }); } return res; }); }));
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

/* Notifications (7/11/2026) : messages de la direction, envoyés par le robot du dépôt privé (Firebase Cloud Messaging, message « data »).
   Toujours afficher une notification à chaque message reçu (obligatoire sur iPhone/iPad). */
self.addEventListener('push', function (e) {
  var d = {};
  try { var j = e.data ? e.data.json() : {}; d = j.data || j || {}; } catch (x) {}
  var titre = d.titre || 'Easy';
  e.waitUntil(self.registration.showNotification(titre, {
    body: d.corps || '',
    icon: '/easy-192.png', badge: '/notif-badge.png', tag: 'easy-' + Date.now(),
    data: { lien: d.lien || '/outils/' }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var lien = new URL((e.notification.data && e.notification.data.lien) || '/outils/', self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (l) {
    for (var i = 0; i < l.length; i++) if ('navigate' in l[i]) return l[i].navigate(lien).then(function (c) { return c && c.focus(); });
    return self.clients.openWindow(lien);
  }));
});
