/* Accès réservé aux moniteurs Easy Auto-École : code à 6 chiffres, retenu 30 jours sur l'appareil.
   À inclure en premier dans le head de chaque page (balise script vers /acces.js).
   Attention : protection légère (site statique). Pour des données personnelles, utiliser Cloudflare Access. */
(function () {
  var EMPREINTE = 'a562a250cc1e35504ad1f2f89e2bc13c7b6bb19dcf7db1597aba7cc9132df73b'; // SHA-256 du code, jamais le code en clair
  var CLE = 'easy-acces', DUREE = 30 * 24 * 3600 * 1000;
  try { var v = JSON.parse(localStorage.getItem(CLE) || 'null'); if (v && v.e === EMPREINTE && Date.now() - v.t < DUREE) return; } catch (e) {}
  var st = document.createElement('style');
  st.textContent = 'html.easy-verrou body>*:not(#easy-acces){display:none!important}' +
    '#easy-acces{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#ff3131;font-family:"DM Sans",system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) 16px max(16px,env(safe-area-inset-bottom))}' +
    '#easy-acces .boite{background:#fff;color:#1c2430;border-radius:22px;padding:26px 22px;width:100%;max-width:340px;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.25)}' +
    '#easy-acces h1{font-size:20px;margin:0 0 4px}#easy-acces p{margin:0 0 16px;color:#5b6472;font-size:14px}' +
    '#easy-acces .pts{display:flex;justify-content:center;gap:10px;margin:0 0 18px}#easy-acces .pts i{width:14px;height:14px;border-radius:50%;border:2px solid #c9c5c1}#easy-acces .pts i.on{background:#1c2430;border-color:#1c2430}' +
    '#easy-acces .clavier{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}#easy-acces button{font:inherit;font-size:22px;font-weight:600;height:58px;border-radius:14px;border:0;background:#f0eeec;color:#1c2430;cursor:pointer}' +
    '#easy-acces button:active{background:#e2dfdc}#easy-acces .err{color:#c41a1a;font-weight:600;min-height:20px;margin:10px 0 0;font-size:14px}' +
    '#easy-acces .secoue{animation:easy-secoue .35s}@keyframes easy-secoue{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
  document.documentElement.classList.add('easy-verrou');
  (document.head || document.documentElement).appendChild(st);
  function sha256(t) { return crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)).then(function (b) { return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join(''); }); }
  function monter() {
    var d = document.createElement('div'); d.id = 'easy-acces'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Accès réservé');
    d.innerHTML = '<div class="boite"><h1>Easy Auto-École</h1><p>Accès réservé aux moniteurs</p><div class="pts" aria-hidden="true"></div>' +
      '<div class="clavier"></div><div class="err" aria-live="polite"></div></div>';
    document.body.appendChild(d);
    var code = '', pts = d.querySelector('.pts'), err = d.querySelector('.err'), boite = d.querySelector('.boite'), cl = d.querySelector('.clavier');
    for (var i = 0; i < 6; i++) pts.appendChild(document.createElement('i'));
    ['1','2','3','4','5','6','7','8','9','','0','⌫'].forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = k; if (!k) { b.style.visibility = 'hidden'; } if (k === '⌫') b.setAttribute('aria-label', 'Effacer');
      b.onclick = function () { saisir(k); }; cl.appendChild(b);
    });
    function maj() { Array.prototype.forEach.call(pts.children, function (p, j) { p.classList.toggle('on', j < code.length); }); }
    function saisir(k) {
      if (k === '⌫') code = code.slice(0, -1); else if (k && code.length < 6) code += k;
      err.textContent = ''; maj();
      if (code.length === 6) sha256(code).then(function (h) {
        if (h === EMPREINTE) { try { localStorage.setItem(CLE, JSON.stringify({ e: EMPREINTE, t: Date.now() })); } catch (e) {} d.remove(); document.documentElement.classList.remove('easy-verrou'); }
        else { err.textContent = 'Code incorrect'; boite.classList.remove('secoue'); void boite.offsetWidth; boite.classList.add('secoue'); code = ''; maj(); }
      });
    }
    document.addEventListener('keydown', function (e) { if (!document.getElementById('easy-acces')) return; if (/^[0-9]$/.test(e.key)) saisir(e.key); else if (e.key === 'Backspace') saisir('⌫'); });
  }
  if (document.body) monter(); else document.addEventListener('DOMContentLoaded', monter);
})();
