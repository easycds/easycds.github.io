/* Easy Auto-École — déverrouillage des pages chiffrées.
   Le contenu de chaque page est chiffré (AES-256-GCM). Sans la phrase d'accès, il est illisible.
   La phrase n'est stockée nulle part : elle déchiffre la clé de contenu (/cle.json, PBKDF2 600 000 tours),
   qui est ensuite gardée 30 jours sur l'appareil. */
(function () {
  var STOCK = 'easy-cle', DUREE = 30 * 24 * 3600 * 1000;
  var b64 = function (s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
  var vers64 = function (u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); };
  var css = 'html.easy-verrou body>*:not(#easy-acces){display:none!important}' +
    '#easy-acces{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#ff3131;font-family:"DM Sans",system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) 16px max(16px,env(safe-area-inset-bottom))}' +
    '#easy-acces form{background:#fff;color:#1c2430;border-radius:22px;padding:26px 22px;width:100%;max-width:360px;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.25)}' +
    '#easy-acces h1{font-size:20px;margin:0 0 4px}#easy-acces p{margin:0 0 16px;color:#5b6472;font-size:14px}' +
    '#easy-acces input{box-sizing:border-box;width:100%;height:52px;border-radius:14px;border:2px solid #d9d6d3;padding:0 14px;font:inherit;font-size:17px;color:#1c2430;background:#fff}' +
    '#easy-acces input:focus{outline:none;border-color:#1c2430}' +
    '#easy-acces button{margin-top:12px;width:100%;height:52px;border-radius:14px;border:0;background:#1c2430;color:#fff;font:inherit;font-size:17px;font-weight:700;cursor:pointer}' +
    '#easy-acces button[disabled]{opacity:.6}#easy-acces label{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:10px;font-size:14px;color:#5b6472}' +
    '#easy-acces label input{width:18px;height:18px}' +
    '#easy-acces .pts{display:flex;justify-content:center;gap:10px;margin:0 0 18px}#easy-acces .pts i{width:14px;height:14px;border-radius:50%;border:2px solid #c9c5c1}#easy-acces .pts i.on{background:#1c2430;border-color:#1c2430}' +
    '#easy-acces .clavier{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}#easy-acces .clavier button{margin:0;height:58px;font-size:22px;font-weight:600;background:#f0eeec;color:#1c2430}#easy-acces .clavier button:active{background:#e2dfdc}' +
    '#easy-acces .err{color:#c41a1a;font-weight:600;min-height:20px;margin:10px 0 0;font-size:14px}' +
    '#easy-acces .secoue{animation:easy-secoue .35s}@keyframes easy-secoue{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';

  function cleStockee() {
    try { var v = JSON.parse(localStorage.getItem(STOCK) || 'null'); if (v && v.k && Date.now() - v.t < DUREE) return v.k; } catch (e) {}
    return null;
  }
  function importer(k64) { return crypto.subtle.importKey('raw', b64(k64), 'AES-GCM', false, ['decrypt']); }

  async function ouvrir(k64) {
    var el = document.getElementById('easy-chiffre'); if (!el) return false;
    var d = b64(el.textContent.trim()), cle = await importer(k64);
    var brut = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: d.slice(0, 12) }, cle, d.slice(12));
    var html = await new Response(new Blob([brut]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    document.open(); document.write(html); document.close();
    return true;
  }

  var infos = null;
  async function lireCle() { if (!infos) { var r = await fetch('/cle.json', { cache: 'no-cache' }); infos = await r.json(); } return infos; }
  async function depuisPhrase(phrase) {
    var c = await lireCle();
    var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(phrase.normalize('NFC')), 'PBKDF2', false, ['deriveKey']);
    var kek = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(c.sel), iterations: c.tours, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    var k = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(c.iv) }, kek, b64(c.cle)));
    return vers64(k);
  }

  function formulaire(message) {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    document.documentElement.classList.add('easy-verrou');
    var d = document.createElement('div'); d.id = 'easy-acces'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Accès réservé');
    d.innerHTML = '<form autocomplete="on"><h1>Easy Auto-École</h1><p>Accès réservé aux moniteurs</p>' +
      '<input type="text" name="username" value="Easy Auto-École" autocomplete="username" hidden>' +
      '<input type="password" name="password" autocomplete="current-password" placeholder="Phrase d’accès" aria-label="Phrase d’accès" required>' +
      '<label><input type="checkbox"> Afficher</label><button type="submit">Entrer</button><div class="err" aria-live="polite"></div></form>';
    document.body.appendChild(d);
    var f = d.querySelector('form'), champ = f.querySelector('input[type=password]'), btn = f.querySelector('button'), err = f.querySelector('.err');
    if (message) err.textContent = message;
    f.querySelector('input[type=checkbox]').onchange = function (e) { champ.type = e.target.checked ? 'text' : 'password'; };
    setTimeout(function () { champ.focus(); }, 50);
    f.onsubmit = async function (e) {
      e.preventDefault(); btn.disabled = true; btn.textContent = 'Vérification…'; err.textContent = '';
      try {
        var k = await depuisPhrase(champ.value.trim());
        try { localStorage.setItem(STOCK, JSON.stringify({ k: k, t: Date.now() })); } catch (x) {}
        if (!(await ouvrir(k))) { d.remove(); document.documentElement.classList.remove('easy-verrou'); }
      } catch (x) {
        err.textContent = navigator.onLine === false ? 'Pas de connexion internet' : 'Phrase incorrecte';
        f.classList.remove('secoue'); void f.offsetWidth; f.classList.add('secoue');
        btn.disabled = false; btn.textContent = 'Entrer'; champ.select();
      }
    };
  }


  function clavier(message) {        // code à 6 chiffres (cle.json : saisie = code6)
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    document.documentElement.classList.add('easy-verrou');
    var d = document.createElement('div'); d.id = 'easy-acces'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Accès réservé');
    d.innerHTML = '<form><h1>Easy Auto-École</h1><p>Accès réservé aux moniteurs</p><div class="pts" aria-hidden="true"></div><div class="clavier"></div><div class="err" aria-live="polite"></div></form>';
    document.body.appendChild(d);
    var f = d.querySelector('form'), pts = f.querySelector('.pts'), cl = f.querySelector('.clavier'), err = f.querySelector('.err'), code = '', occupe = false;
    if (message) err.textContent = message;
    for (var i = 0; i < 6; i++) pts.appendChild(document.createElement('i'));
    ['1','2','3','4','5','6','7','8','9','','0','⌫'].forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = k; if (!k) b.style.visibility = 'hidden'; if (k === '⌫') b.setAttribute('aria-label', 'Effacer');
      b.onclick = function () { saisir(k); }; cl.appendChild(b);
    });
    function maj() { Array.prototype.forEach.call(pts.children, function (p, j) { p.classList.toggle('on', j < code.length); }); }
    async function saisir(k) {
      if (occupe) return;
      if (k === '⌫') code = code.slice(0, -1); else if (k && code.length < 6) code += k;
      err.textContent = ''; maj();
      if (code.length < 6) return;
      occupe = true; err.textContent = 'Vérification…';
      try {
        var cle = await depuisPhrase(code);
        try { localStorage.setItem(STOCK, JSON.stringify({ k: cle, t: Date.now() })); } catch (x) {}
        if (!(await ouvrir(cle))) { d.remove(); document.documentElement.classList.remove('easy-verrou'); }
      } catch (x) {
        err.textContent = navigator.onLine === false ? 'Pas de connexion internet' : 'Code incorrect';
        f.classList.remove('secoue'); void f.offsetWidth; f.classList.add('secoue'); code = ''; maj();
      }
      occupe = false;
    }
    document.addEventListener('keydown', function (e) { if (!document.getElementById('easy-acces')) return; if (/^[0-9]$/.test(e.key)) saisir(e.key); else if (e.key === 'Backspace') saisir('⌫'); });
  }
  async function demander(message) {
    try { var c = await lireCle(); if (c.saisie === 'code6') { clavier(message); return; } } catch (e) {}
    formulaire(message);
  }
  async function demarrer() {
    if (!window.crypto || !crypto.subtle || typeof DecompressionStream === 'undefined') {
      document.body.innerHTML = '<p style="font-family:system-ui;padding:24px">Ce navigateur est trop ancien pour ouvrir cette page. Mets-le à jour (Chrome, Safari, Edge ou Firefox récents).</p>'; return;
    }
    var k = cleStockee();
    if (k) { try { if (await ouvrir(k)) return; } catch (e) { try { localStorage.removeItem(STOCK); } catch (x) {} demander('Le code d’accès a changé'); return; } }
    if (!document.getElementById('easy-chiffre')) { if (k) return; }
    demander('');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer); else demarrer();
})();
