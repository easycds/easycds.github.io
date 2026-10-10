/* Réglementation : infractions courantes, simulateur de points, vitesses maximales, récupération des points.
   Sources : Code de la route (Légifrance), fiches service-public.gouv.fr. Barème vérifié le 27/02/2026,
   vitesses le 29/12/2025, récupération le 17/09/2025, peines des délits : loi n° 2025-622 du 9 juillet 2025. */
(function () {
  const racine = document.getElementById('vue-regl'), trame = document.getElementById('vue-trame'), nav = document.getElementById('sections');
  if (!racine || !trame || !nav) return;

  const C4 = { classe: 'Contravention 4e cl.', montant: '135 €', sous: '90 € minorée · 375 € majorée' };
  const C3 = { classe: 'Contravention 3e cl.', montant: '68 €', sous: '45 € minorée · 180 € majorée' };
  const C2 = { classe: 'Contravention 2e cl.', montant: '35 €', sous: '22 € minorée · 75 € majorée' };
  const D = (montant, sous) => ({ classe: 'Délit', montant: montant, sous: sous });
  const INFRACTIONS = [
    ['vitesse', 'Excès de vitesse de moins de 5 km/h', 'Limite au-dessus de 50 km/h', C3, 0],
    ['vitesse', 'Excès de vitesse de moins de 5 km/h', 'Limite de 50 km/h ou moins', C4, 0],
    ['vitesse', 'Excès de vitesse de 5 à 19 km/h', 'Limite au-dessus de 50 km/h', C3, 1],
    ['vitesse', 'Excès de vitesse de 5 à 19 km/h', 'Limite de 50 km/h ou moins', C4, 1],
    ['vitesse', 'Excès de vitesse de 20 à 29 km/h', 'Toutes les routes', C4, 2],
    ['vitesse', 'Excès de vitesse de 30 à 39 km/h', 'Suspension du permis possible', C4, 3],
    ['vitesse', 'Excès de vitesse de 40 à 49 km/h', 'Rétention et suspension du permis possibles', C4, 4],
    ['vitesse', 'Excès de vitesse de 50 km/h ou plus', 'Délit dès la première fois · confiscation du véhicule possible', D('300 €', 'AFD · tribunal : 3 750 € et 3 mois'), 6],
    ['alcool', 'Alcool de 0,5 à 0,8 g/l de sang', '0,25 à 0,4 mg/l d’air expiré', C4, 6],
    ['alcool', 'Alcool à 0,8 g/l ou plus, ou ivresse', '0,4 mg/l d’air ou plus', D('9 000 €', 'au tribunal · jusqu’à 3 ans de prison'), 6],
    ['alcool', 'Conduite après usage de stupéfiants', 'Analyse de salive ou de sang positive', D('9 000 €', 'au tribunal · jusqu’à 3 ans de prison'), 6],
    ['alcool', 'Stupéfiants + alcool en même temps', 'Seul cas au-delà du plafond de 8 points (art. L235-1)', D('15 000 €', 'au tribunal · jusqu’à 5 ans de prison'), 9],
    ['priorite', 'Feu rouge non respecté', 'Arrêt absolu au feu rouge', C4, 4],
    ['priorite', 'STOP non respecté', 'Arrêt complet à la ligne', C4, 4],
    ['priorite', 'Cédez-le-passage non respecté', '', C4, 4],
    ['priorite', 'Refus de priorité', 'Intersection, priorité à droite', C4, 4],
    ['priorite', 'Ne pas céder le passage à un piéton', 'Engagé ou qui montre qu’il va traverser', C4, 6],
    ['priorite', 'Circulation en sens interdit', '', C4, 4],
    ['comportement', 'Téléphone tenu en main', 'Oreillettes et écouteurs : même sanction', C4, 3],
    ['comportement', 'Ceinture non attachée', '', C4, 3],
    ['comportement', 'Distances de sécurité non respectées', '', C4, 3],
    ['comportement', 'Changement de direction sans clignotant', '', C2, 3],
    ['comportement', 'Circulation sur la bande d’arrêt d’urgence', '', C4, 3],
    ['lignes', 'Chevauchement d’une ligne continue', 'Les roues sont sur la ligne', C4, 1],
    ['lignes', 'Franchissement d’une ligne continue', 'Ligne passée entièrement', C4, 3],
    ['lignes', 'Dépassement dangereux', '', C4, 3],
    ['lignes', 'Circulation à gauche sur une route à double sens', '', C4, 3],
    ['lignes', 'Stationnement dangereux', 'Virage, sommet de côte, intersection…', C4, 3]
  ];
  const THEMES = [['tous', 'Tout'], ['vitesse', 'Vitesse'], ['alcool', 'Alcool & stupéfiants'], ['priorite', 'Priorités & feux'], ['comportement', 'Comportement'], ['lignes', 'Lignes & dépassement']];
  /* simulateur : [id, nom, points, gravité : 2 = 2e/3e classe, 4 = 4e classe ou délit] */
  const SIMU = [
    ['v1', 'Excès de vitesse de 5 à 19 km/h', 1, 2], ['v2', 'Excès de vitesse de 20 à 29 km/h', 2, 4], ['v3', 'Excès de vitesse de 30 à 39 km/h', 3, 4],
    ['v4', 'Excès de vitesse de 40 à 49 km/h', 4, 4], ['v5', 'Excès de vitesse de 50 km/h ou plus', 6, 4], ['lc', 'Chevauchement de ligne continue', 1, 4],
    ['cl', 'Changement de direction sans clignotant', 3, 2], ['tel', 'Téléphone tenu en main', 3, 4], ['ce', 'Ceinture non attachée', 3, 4],
    ['fr', 'Feu rouge non respecté', 4, 4], ['st', 'STOP non respecté', 4, 4], ['pi', 'Ne pas céder le passage à un piéton', 6, 4],
    ['al', 'Alcool de 0,5 à 0,8 g/l', 6, 4], ['as', 'Stupéfiants + alcool en même temps', 9, 4]
  ];
  const VITESSES = [
    ['Autoroute', 130, 110, 110], ['Route à chaussées séparées par un terre-plein central', 110, 100, 100],
    ['Route avec au moins 2 voies dans le même sens', 90, 80, 80], ['Route à double sens sans séparateur', 80, 80, 80], ['Agglomération', 50, 50, 50]
  ];
  const ONGLETS = [['infractions', 'Infractions'], ['simu', 'Simulateur de points'], ['vitesses', 'Vitesses'], ['recup', 'Récupérer ses points']];

  const etat = { vue: 'infractions', theme: 'tous', q: '', permis: 'conf', choix: {}, meme: true };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const sansAccent = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const pts = (p) => p + (p > 1 ? ' pts' : ' pt');
  const niveau = (p) => (p === 0 ? 'p0' : p <= 2 ? 'p1' : p <= 4 ? 'p2' : 'p3');
  const SOURCE = '<p class="r-source">Sources : Code de la route sur Légifrance, fiches service-public.gouv.fr. Peines des délits d’alcool et de stupéfiants relevées par la loi n° 2025-622 du 9 juillet 2025 ; grand excès de vitesse devenu délit le 29 décembre 2025.</p>';

  function lignes() {
    const zone = document.getElementById('r-lignes'); if (!zone) return;
    const q = sansAccent(etat.q.trim());
    const L = INFRACTIONS.filter((x) => (etat.theme === 'tous' || x[0] === etat.theme) && (!q || sansAccent(x[1] + ' ' + x[2]).includes(q)));
    document.getElementById('r-compte').textContent = L.length + (L.length > 1 ? ' infractions' : ' infraction');
    zone.innerHTML = L.length ? L.map((x) => '<div class="r-ligne"><div><b>' + esc(x[1]) + '</b>' + (x[2] ? '<small>' + esc(x[2]) + '</small>' : '') + '</div>' +
      '<span class="r-classe">' + esc(x[3].classe) + '</span><div class="r-montant"><b>' + esc(x[3].montant) + '</b><small>' + esc(x[3].sous) + '</small></div>' +
      '<span class="r-pts ' + niveau(x[4]) + '">' + pts(x[4]) + '</span></div>').join('') : '<p class="r-vide">Aucune infraction ne correspond.</p>';
  }

  function vueInfractions() {
    return '<h1>Infractions les plus courantes</h1><p class="intro">Amende forfaitaire et points retirés, infraction par infraction. Pour un délit, c’est le tribunal qui fixe la peine.</p>' +
      '<label class="r-cherche"><span class="r-cache">Rechercher une infraction</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
      '<input id="r-q" type="search" placeholder="Rechercher : feu rouge, téléphone, ligne continue…" value="' + esc(etat.q) + '"></label>' +
      '<div class="r-filtres" role="group" aria-label="Filtrer par thème">' + THEMES.map((t) => '<button type="button" data-act="theme" data-v="' + t[0] + '" aria-pressed="' + (etat.theme === t[0]) + '"' + (etat.theme === t[0] ? ' class="on"' : '') + '>' + t[1] + '</button>').join('') + '</div>' +
      '<section class="r-carte"><div class="r-ligne r-entete"><span>Infraction · <span id="r-compte"></span></span><span>Catégorie</span><span>Amende</span><span style="text-align:right">Points</span></div><div id="r-lignes"></div></section>' +
      '<div class="r-grille"><section class="r-bloc"><h2>Combien je paie, selon quand je paie</h2><div style="overflow-x:auto"><table><thead><tr><th>Classe</th><th>Minorée</th><th>Forfaitaire</th><th>Majorée</th></tr></thead><tbody>' +
      '<tr><th>2e classe</th><td>22 €</td><td><b>35 €</b></td><td>75 €</td></tr><tr><th>3e classe</th><td>45 €</td><td><b>68 €</b></td><td>180 €</td></tr>' +
      '<tr><th>4e classe</th><td>90 €</td><td><b>135 €</b></td><td>375 €</td></tr><tr><th>Délit (AFD)</th><td>250 €</td><td><b>300 €</b></td><td>600 €</td></tr></tbody></table></div>' +
      '<p class="r-petit">Minorée : payée tout de suite ou sous 15 jours. Majorée : non payée après 45 jours.</p></section>' +
      '<section class="r-bloc r-orange"><h2>Jeune conducteur</h2><p>Permis probatoire : <b>6 points</b> au départ. Une seule infraction à 6 points, et le permis est perdu.</p>' +
      '<p>Alcool : <b>0,2 g/l</b> de sang au maximum (en pratique, zéro verre), aussi en conduite accompagnée ou supervisée.</p></section></div>';
  }

  function vueSimu() {
    const pro = etat.permis === 'pro', capital = pro ? 6 : 12;
    const pris = SIMU.filter((x) => etat.choix[x[0]]);
    const brut = pris.reduce((t, x) => t + x[2], 0);
    const derogation = !!etat.choix.as; // L235-1 : 9 points de plein droit, par dérogation au plafond de 8 (L223-2)
    const retire = etat.meme ? (derogation ? Math.max(9, Math.min(brut, 8)) : Math.min(brut, 8)) : brut;
    const reste = Math.max(0, capital - retire);
    const msgs = [], msg = (t, al) => msgs.push('<p class="r-msg' + (al ? ' al' : '') + '">' + t + '</p>');
    if (!pris.length) msg('Aucune infraction cochée.');
    else if (reste === 0) msg('Plus aucun point : le permis n’est plus valable. Interdiction de conduire, examen médical, puis repasser le permis.', true);
    else {
      if (etat.meme && derogation) msg('Stupéfiants + alcool : 9 points retirés d’office, le plafond de 8 ne s’applique pas.');
      else if (etat.meme && brut > 8) msg('Au même contrôle, 8 points retirés au maximum (au lieu de ' + brut + ').');
      if (pro && retire >= 3) msg('Retrait de 3 points ou plus en probatoire : stage obligatoire dans les 4 mois.', true);
      else if (pro && retire === 2) msg('2 points perdus en probatoire : un stage est possible pour les récupérer.');
      if (retire === 1) msg('Ce point revient au bout de 6 mois sans nouvelle infraction.');
      else if (!pro) msg(pris.some((x) => x[3] === 4) ? 'Retour à 12 points au bout de 3 ans sans nouvelle infraction.' : 'Retour à 12 points au bout de 2 ans sans nouvelle infraction.');
    }
    let cases = ''; for (let i = 0; i < 12; i++) cases += '<i class="' + (i < reste ? 'pl' : i < capital ? 'pe' : '') + '"></i>';
    return '<h1>Simulateur de points</h1><p class="intro">Coche les infractions : le capital fond en direct.</p>' +
      '<div class="r-permis" role="group" aria-label="Type de permis">' + [['conf', 'Permis confirmé · 12 pts'], ['pro', 'Probatoire · 6 pts']].map((p) => '<button type="button" data-act="permis" data-v="' + p[0] + '" aria-pressed="' + (etat.permis === p[0]) + '"' + (etat.permis === p[0] ? ' class="on"' : '') + '>' + p[1] + '</button>').join('') + '</div>' +
      '<div class="r-simu"><section class="r-carte r-liste" aria-label="Infractions commises">' +
      SIMU.map((x) => { const on = !!etat.choix[x[0]]; return '<button type="button" class="r-coche' + (on ? ' on' : '') + '" data-act="coche" data-v="' + x[0] + '" aria-pressed="' + on + '"><span class="cc">' + (on ? '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>' : '') + '</span><span class="nm">' + esc(x[1]) + '</span><span class="pt">' + (on ? '− ' : '') + pts(x[2]) + '</span></button>'; }).join('') +
      '</section><aside class="r-carte r-solde" aria-live="polite"><div><span class="lbl">Points restants</span><div class="gros">' + reste + '<span> / ' + capital + '</span></div></div>' +
      '<div class="r-cases" aria-hidden="true">' + cases + '</div>' +
      '<label class="r-meme"><input type="checkbox" id="r-meme"' + (etat.meme ? ' checked' : '') + '><span>Commises au même instant (pas à quelques minutes d’écart) : <b>8 points</b> retirés au maximum, sauf stupéfiants + alcool (9)</span></label>' +
      msgs.join('') + '<button type="button" class="r-effacer" data-act="effacer">Tout effacer</button></aside></div>';
  }

  function vueVitesses() {
    const panneau = (v) => '<span class="panneau">' + v + '</span>';
    return '<h1>Vitesses maximales</h1><p class="intro">Sauf panneau qui fixe une autre limite.</p>' +
      '<section class="r-carte r-table"><table><thead><tr><th scope="col">Route</th><th scope="col">Temps sec</th><th scope="col">Pluie</th><th scope="col">Visibilité &lt; 50 m</th><th scope="col" class="jc-t">Jeune conducteur</th></tr></thead><tbody>' +
      VITESSES.map((v) => '<tr><th scope="row">' + esc(v[0]) + '</th><td>' + panneau(v[1]) + '</td><td>' + panneau(v[2]) + '</td><td>' + panneau(50) + '</td><td class="jc">' + panneau(v[3]) + '</td></tr>').join('') +
      '</tbody></table></section><div class="r-notes">' +
      '<p><b>Routes à 80 :</b> le département ou la commune peut relever certaines routes à 90 km/h. Elles repassent à 80 sous la pluie, et un jeune conducteur reste à 80.</p>' +
      '<p><b>Jeune conducteur sur autoroute :</b> 100 km/h là où la limite est inférieure à 130.</p>' +
      '<p><b>Voie de gauche sur autoroute :</b> au moins 80 km/h quand la circulation est fluide et la météo bonne.</p>' +
      '<p><b>Pluie et jeune conducteur :</b> pas de baisse en plus, c’est la plus basse des deux limites qui compte.</p></div>';
  }

  function vueRecup() {
    const delai = (n, c, titre, d) => '<section class="r-bloc r-delai"><span class="n ' + c + '">' + n + '</span><b>' + titre + '</b><span class="d">' + d + '</span></section>';
    return '<h1>Récupérer ses points</h1><p class="intro">Le délai part du jour où l’infraction est établie (amende payée, par exemple). Une nouvelle infraction le remet à zéro.</p>' +
      '<div class="r-grille r-grille-haut">' + delai('6 mois', 'c6', '1 seul point perdu', 'Le point revient. Ex. : excès de moins de 20 km/h.') +
      delai('2 ans', 'c2', 'Contravention de 2e ou 3e classe', 'Retour à 12 points. Ex. : changement de direction sans clignotant.') +
      delai('3 ans', 'c3', '4e ou 5e classe, ou délit', 'Retour à 12 points. Ex. : feu rouge, téléphone, ceinture.') + '</div>' +
      '<section class="r-bloc r-stage"><span class="n">+4 pts</span><div><b>Stage de sensibilisation à la sécurité routière</b><span class="d">Jusqu’à 4 points, un stage par an au plus, dans la limite du capital. Impossible une fois à 0 point.</span></div></section>' +
      '<section class="r-bloc r-orange"><h2>En permis probatoire</h2><div class="r-pro"><b>1 point perdu</b><span>Récupéré au bout de 6 mois sans nouvelle infraction.</span>' +
      '<b>2 points</b><span>Stage possible, au choix.</span><b>3 points ou plus</b><span>Stage obligatoire dans les 4 mois après la lettre recommandée (48N).</span>' +
      '<b>6 points en 1re année</b><span>Permis perdu, aucun rattrapage : 6 mois sans conduire, examen médical, code et conduite à repasser.</span></div>' +
      '<p>Sans infraction, le capital monte jusqu’à 12 points. Une infraction arrête cette progression.</p></section>' +
      '<section class="r-bloc r-sombre"><h2>À 0 point</h2><p>Plus le droit de conduire. Avant de repasser le permis : examen médical, puis le code (et la conduite si le permis avait moins de 3 ans).</p></section>';
  }

  function corps() {
    const c = document.getElementById('r-corps');
    c.innerHTML = (etat.vue === 'simu' ? vueSimu() : etat.vue === 'vitesses' ? vueVitesses() : etat.vue === 'recup' ? vueRecup() : vueInfractions()) + SOURCE;
    if (etat.vue === 'infractions') lignes();
  }
  function rendre() {
    racine.innerHTML = '<div class="r-onglets" role="tablist" aria-label="Réglementation">' + ONGLETS.map((o) => '<button type="button" role="tab" data-act="onglet" data-v="' + o[0] + '" aria-selected="' + (etat.vue === o[0]) + '"' + (etat.vue === o[0] ? ' class="on"' : '') + '>' + o[1] + '</button>').join('') + '</div><div id="r-corps"></div>';
    corps();
  }

  racine.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const v = b.dataset.v, a = b.dataset.act;
    if (a === 'onglet') { etat.vue = v; rendre(); }
    else if (a === 'theme') { etat.theme = v; corps(); }
    else if (a === 'permis') { etat.permis = v; corps(); }
    else if (a === 'coche') { etat.choix[v] = !etat.choix[v]; corps(); }
    else if (a === 'effacer') { etat.choix = {}; corps(); }
  });
  racine.addEventListener('input', (e) => { if (e.target.id === 'r-q') { etat.q = e.target.value; lignes(); } });
  racine.addEventListener('change', (e) => { if (e.target.id === 'r-meme') { etat.meme = e.target.checked; corps(); } });

  /* Trame / Réglementation / Chiffres */
  const HASH = { regl: '#reglementation', chiffres: '#chiffres' };
  function montrer(v) {
    const chiffres = document.getElementById('vue-chiffres');
    trame.hidden = v !== 'trame'; racine.hidden = v !== 'regl'; if (chiffres) chiffres.hidden = v !== 'chiffres';
    nav.querySelectorAll('button').forEach((b) => { const on = b.dataset.vue === v; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    try { history.replaceState(null, '', HASH[v] || location.pathname); } catch (er) {}
    if (v === 'regl' && !racine.firstChild) rendre();
    if (v === 'chiffres' && window.EasyChiffres) window.EasyChiffres.rendre();
  }
  nav.addEventListener('click', (e) => { const b = e.target.closest('button[data-vue]'); if (b) montrer(b.dataset.vue); });
  if (location.hash === '#reglementation') montrer('regl');
  else if (location.hash === '#chiffres') montrer('chiffres');
})();
