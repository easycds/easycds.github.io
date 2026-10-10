/* Chiffres : 50 ans de sécurité routière (courbe des tués depuis 1970 + grandes mesures) et qui / où / pourquoi en 2025.
   Sources : ONISR — tués par mois en métropole 1970-2017 (décès à 6 jours jusqu'en 2004, à 30 jours depuis 2005),
   bilans annuels 2018-2025, chiffres clés 2025 définitifs (29/05/2026) et « L'accidentalité routière en France 2025 ». */
(function () {
  const racine = document.getElementById('vue-chiffres');
  if (!racine) return;

  const st = document.createElement('style');
  st.textContent =
    '.s-onglets{display:flex;gap:4px;border-bottom:2px solid var(--border);flex-wrap:wrap;margin-bottom:22px}' +
    '.s-onglets button{font-family:var(--police-titre);font-weight:600;font-size:16px;padding:12px 14px;min-height:46px;margin-bottom:-2px;border:0;border-bottom:3px solid transparent;background:transparent;color:var(--text-muted);cursor:pointer}' +
    '.s-onglets button.on{border-bottom-color:var(--easy-dark);color:var(--text)}' +
    '.s-cles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px}' +
    '.s-cle{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:14px 16px}' +
    '.s-cle small{display:block;font-size:13.5px;font-weight:600;color:var(--text-muted)}' +
    '.s-cle b{display:block;font-family:var(--police-titre);font-weight:600;font-size:30px;line-height:1.15}' +
    '.s-cle span{display:block;font-size:13.5px;color:var(--text-muted)}' +
    '.s-cle.rouge b{color:#c41a1a}body.dark .s-cle.rouge b{color:#ff8a80}' +
    '.s-cle.sombre{background:#1c2430;border-color:#1c2430;color:#fff}.s-cle.sombre small,.s-cle.sombre span{color:#c9cdd4}body.dark .s-cle.sombre{background:#2a2f40;border-color:#2a2f40}' +
    '.s-bloc{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:16px 18px;margin-bottom:16px;box-shadow:var(--shadow)}' +
    '.s-bloc h2{font-family:var(--police-titre);font-weight:600;font-size:21px;margin-bottom:10px}' +
    '.s-bloc p{font-size:14.5px;line-height:1.55;color:var(--text-muted);margin-top:10px}.s-bloc p b{color:var(--text)}' +
    '.s-filtres{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}' +
    '.s-filtres button{font:inherit;font-size:14px;font-weight:600;padding:8px 13px;min-height:42px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--text);cursor:pointer;display:inline-flex;align-items:center;gap:8px}' +
    '.s-filtres button.on{background:var(--text);border-color:var(--text);color:var(--bg)}' +
    '.s-pt{width:10px;height:10px;border-radius:50%;display:inline-block;flex:none}' +
    '.s-graph{position:relative}.s-graph svg{display:block;width:100%;height:auto}' +
    '.s-graph .ax{font:600 13px var(--police-texte);fill:var(--text-muted)}.s-graph .lab{font:700 14px var(--police-texte);fill:var(--text)}' +
    '.s-graph .gr{stroke:var(--border);stroke-width:1}.s-graph .base{stroke:var(--text-light);stroke-width:1.5}' +
    '.s-mk{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border:0;padding:0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
    '.s-mk i{width:16px;height:16px;border-radius:50%;border:3px solid var(--surface);box-shadow:0 1px 4px rgba(0,0,0,.35)}.s-mk.on i{width:22px;height:22px}' +
    '.s-fiche{border-radius:16px;background:var(--bg);padding:14px 16px;display:flex;flex-wrap:wrap;gap:14px;margin-top:12px}' +
    '.s-fiche .g{flex:3 1 300px;min-width:0}.s-fiche .d{flex:1 1 200px;min-width:0;background:var(--surface);border-radius:14px;padding:12px 14px;font-size:15px;line-height:1.6}' +
    '.s-fiche .dt{font-family:var(--police-titre);font-weight:600;font-size:23px;margin-right:8px}' +
    '.s-tag{display:inline-block;font-size:12.5px;font-weight:700;padding:3px 10px;border-radius:999px;color:#fff;vertical-align:4px}' +
    '.s-fiche h3{font-size:18.5px;line-height:1.3;margin:6px 0 4px}.s-fiche .g p{margin-top:0;color:var(--text)}' +
    '.s-fiche .d small{display:block;font-size:12.5px;font-weight:700;color:var(--text-muted)}' +
    '.s-nav{flex:1 1 100%;display:flex;gap:8px;flex-wrap:wrap}' +
    '.s-nav button{font:inherit;font-weight:600;font-size:14.5px;min-height:44px;padding:0 16px;border-radius:12px;border:1px solid var(--border);background:var(--surface);color:var(--text);cursor:pointer}' +
    '.s-nav button.pl{background:var(--text);border-color:var(--text);color:var(--bg)}' +
    '.s-liste button{width:100%;display:flex;align-items:center;gap:12px;min-height:46px;padding:8px 10px;border:0;border-radius:12px;background:transparent;font:inherit;color:var(--text);text-align:left;cursor:pointer}' +
    '.s-liste button.on{background:var(--easy-light)}.s-liste .an{flex:none;width:48px;font-family:var(--police-titre);font-weight:600;font-size:17px}.s-liste .tt{font-size:15px;font-weight:600}' +
    '.s-barres{display:flex;flex-direction:column;gap:8px}' +
    '.s-barre{display:grid;grid-template-columns:8.5em minmax(0,1fr) 3.4em;align-items:center;gap:10px;font-size:15px}' +
    '.s-barre b{font-weight:700}.s-barre em{font-style:normal;font-weight:700;text-align:right}' +
    '.s-barre .f{height:24px;background:var(--bg);border-radius:8px;overflow:hidden}.s-barre .f i{display:block;height:100%;border-radius:8px}' +
    '.s-duo{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;margin-top:12px}' +
    '.s-encart{border-radius:14px;padding:12px 14px;background:var(--bg);font-size:14.5px;line-height:1.5}.s-encart b{display:block;font-size:16px;margin-bottom:3px}' +
    '.s-encart.r{background:var(--easy-light)}.s-encart.r b{color:#b0141a}body.dark .s-encart.r b{color:#ff8a80}' +
    '.s-usagers{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}' +
    '.s-usager{background:var(--bg);border-radius:14px;padding:12px 14px}.s-usager b{display:block;font-family:var(--police-titre);font-weight:600;font-size:28px}' +
    '.s-usager strong{display:block;font-size:15.5px}.s-usager span{display:block;font-size:13.5px;color:var(--text-muted)}' +
    '.s-deux{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}.s-deux .s-bloc{margin-bottom:0}' +
    '.s-res{margin-bottom:10px}.s-res div{display:flex;justify-content:space-between;gap:8px;font-size:15px;margin-bottom:4px}.s-res .f{height:12px;background:var(--bg);border-radius:6px;overflow:hidden}.s-res .f i{display:block;height:100%}' +
    '.s-mois{display:flex;gap:10px}.s-mois div{flex:1;border-radius:14px;padding:12px 14px;background:var(--bg)}.s-mois small{display:block;font-size:13.5px;font-weight:600;color:var(--text-muted)}.s-mois b{font-family:var(--police-titre);font-weight:600;font-size:26px}' +
    '.s-mois .r{background:var(--easy-light)}.s-mois .r b{color:#c41a1a}body.dark .s-mois .r b{color:#ff8a80}' +
    '.s-source{font-size:12.5px;color:var(--text-muted);line-height:1.6;margin-top:6px}' +
    '@media print{.s-onglets,.s-filtres,.s-nav{display:none}}';
  document.head.appendChild(st);

  const TUES = {};
  [15036, 16061, 16545, 15469, 13327, 12996, 13577, 12961, 11956, 12197, 12514, 11953, 12030, 11675, 11525, 10447, 10959, 9855, 10548, 10528,
    10289, 9617, 9083, 9052, 8533, 8412, 8080, 7989, 8437, 8029, 7643, 7720, 7242, 5731, 5232, 5318, 4709, 4620, 4275, 4273,
    3992, 3963, 3653, 3268, 3384, 3461, 3477, 3448, 3248, 3244, 2541, 2944, 3267, 3167, 3193, 3263].forEach((n, i) => { TUES[1970 + i] = n; });
  const CATS = { vitesse: ['Vitesse', '#e01f1f'], alcool: ['Alcool', '#b35c00'], equipement: ['Équipement', '#2f6fd1'], permis: ['Permis', '#4a5568'], controle: ['Contrôles', '#7b3fb5'], contexte: ['Contexte', '#8a929b'] };
  const MESURES = [
    [1970, 'alcool', 'Juillet 1970', 'Premier taux légal d’alcool au volant', 'La loi fixe pour la première fois un taux d’alcool dans le sang au-delà duquel conduire est sanctionné.'],
    [1972, 'contexte', '1972', 'Le pire bilan, et le début d’une politique de sécurité routière', 'Record de tués sur les routes. L’État crée un comité interministériel et un délégué à la sécurité routière.'],
    [1973, 'equipement', '1er juillet 1973', 'Ceinture à l’avant hors agglomération, casque à moto', 'La ceinture devient obligatoire aux places avant hors agglomération, et le casque pour les motards.'],
    [1974, 'vitesse', 'Fin 1974', 'Limitations générales : 90 sur route, 130 sur autoroute', 'Après des limitations partielles en 1973, des vitesses maximales s’appliquent sur tout le réseau hors agglomération.'],
    [1978, 'alcool', 'Juillet 1978', 'Dépistages d’alcool préventifs', 'Les forces de l’ordre peuvent contrôler l’alcoolémie même sans accident ni infraction.'],
    [1990, 'vitesse', '1er décembre 1990', '50 km/h en ville et ceinture à l’arrière', 'La vitesse en agglomération passe de 60 à 50 km/h, avec la possibilité de zones 30. La ceinture devient aussi obligatoire aux places arrière.'],
    [1992, 'permis', '1er juillet 1992', 'Le permis à points', 'Chaque infraction retire des points. À zéro, le permis n’est plus valable.'],
    [1995, 'alcool', 'Septembre 1995', 'Taux d’alcool abaissé à 0,5 g/l', 'Le taux maximal autorisé est abaissé à 0,5 gramme d’alcool par litre de sang.'],
    [2002, 'contexte', 'Juillet 2002', 'La sécurité routière devient une grande priorité nationale', 'Le président de la République en fait l’un des grands chantiers du quinquennat, avec des contrôles et des sanctions renforcés.'],
    [2003, 'controle', 'Fin octobre 2003', 'Les premiers radars automatiques', 'Les excès de vitesse sont flashés et verbalisés automatiquement. Le nombre de tués baisse très fortement cette année-là.'],
    [2004, 'permis', '1er mars 2004', 'Le permis probatoire', 'Les nouveaux conducteurs démarrent avec 6 points et doivent faire leurs preuves pendant trois ans (deux avec la conduite accompagnée).'],
    [2008, 'equipement', '1er octobre 2008', 'Gilet et triangle obligatoires', 'Chaque voiture doit avoir un gilet de haute visibilité et un triangle de présignalisation.'],
    [2015, 'alcool', '1er juillet 2015', '0,2 g/l pour les jeunes conducteurs', 'Pendant le permis probatoire, le taux d’alcool autorisé est abaissé à 0,2 g/l : en pratique, zéro verre.'],
    [2018, 'vitesse', '1er juillet 2018', '80 km/h sur les routes sans séparateur', 'La vitesse maximale passe de 90 à 80 km/h sur les routes à double sens sans séparateur central. Depuis fin 2019, les départements peuvent revenir à 90 sur certaines routes.'],
    [2020, 'contexte', '2020', 'Les confinements', 'Le trafic s’effondre pendant les confinements : le nombre de tués tombe au plus bas, puis remonte quand la circulation reprend.'],
    [2025, 'permis', 'Juillet 2025', 'Création de l’homicide routier', 'Un conducteur qui tue quelqu’un, par exemple en ayant bu, consommé des stupéfiants ou commis un grand excès de vitesse, est poursuivi pour homicide routier, et non plus pour homicide involontaire.']
  ];
  const etat = { vue: 'courbe', cat: 'tous', sel: 5 };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = (n) => n.toLocaleString('fr-FR');
  const X = (an) => 60 + (an - 1970) / 55 * 920, Y = (n) => 380 - n / 18000 * 350;

  function vueCourbe() {
    const ans = Object.keys(TUES).map(Number);
    const d = 'M ' + ans.map((a) => X(a).toFixed(1) + ' ' + Y(TUES[a]).toFixed(1)).join(' L ');
    const m = MESURES[etat.sel], c = CATS[m[1]];
    const ligne = (a) => TUES[a] ? a + ' : <b>' + fmt(TUES[a]) + '</b> tués' : a + ' : pas encore de bilan';
    const grille = [0, 5000, 10000, 15000].map((v) => '<line class="' + (v ? 'gr' : 'base') + '" x1="60" x2="980" y1="' + Y(v).toFixed(1) + '" y2="' + Y(v).toFixed(1) + '"/><text class="ax" x="52" y="' + Y(v).toFixed(1) + '" text-anchor="end" dominant-baseline="central">' + fmt(v) + '</text>').join('');
    const annees = [1970, 1980, 1990, 2000, 2010, 2020].map((a) => '<text class="ax" x="' + X(a).toFixed(1) + '" y="404" text-anchor="middle">' + a + '</text>').join('') + '<text class="lab" x="980" y="404" text-anchor="end">2025</text>';
    let prevAn = -9, pile = 0;
    const points = MESURES.map((x, i) => {
      if (etat.cat !== 'tous' && x[1] !== etat.cat) return '';
      const n = TUES[x[0]] || TUES[2025];
      pile = x[0] - prevAn <= 1 ? pile + 1 : 0; prevAn = x[0]; /* années collées : on empile les points au-dessus de la courbe */
      return '<button type="button" class="s-mk' + (i === etat.sel ? ' on' : '') + '" data-act="sel" data-v="' + i + '" style="left:' + (X(x[0]) / 10).toFixed(2) + '%;top:calc(' + (Y(n) / 4.2).toFixed(2) + '% - ' + (pile * 26) + 'px)" aria-label="' + esc(x[2] + ' : ' + x[3]) + '"><i style="background:' + CATS[x[1]][1] + '"></i></button>';
    }).join('');
    const filtres = [['tous', 'Toutes', '#e01f1f']].concat(Object.keys(CATS).map((k) => [k, CATS[k][0], CATS[k][1]]))
      .map((f) => '<button type="button" data-act="cat" data-v="' + f[0] + '"' + (etat.cat === f[0] ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + '><span class="s-pt" style="background:' + f[2] + '"></span>' + f[1] + '</button>').join('');
    const liste = MESURES.map((x, i) => (etat.cat === 'tous' || x[1] === etat.cat) ? '<button type="button" data-act="sel" data-v="' + i + '"' + (i === etat.sel ? ' class="on"' : '') + '><span class="an">' + x[0] + '</span><span class="s-pt" style="background:' + CATS[x[1]][1] + '"></span><span class="tt">' + esc(x[3]) + '</span></button>' : '').join('');
    return '<div class="s-cles">' +
      '<div class="s-cle"><small>1972, le pire bilan</small><b style="color:#c41a1a">16 545 tués</b></div>' +
      '<div class="s-cle"><small>2025</small><b>3 263 tués</b><span>+2,2 % sur un an</span></div>' +
      '<div class="s-cle sombre"><small>En 50 ans</small><b>5 fois moins</b></div></div>' +
      '<section class="s-bloc"><div class="s-filtres">' + filtres + '</div>' +
      '<div class="s-graph"><svg viewBox="0 0 1000 420" role="img" aria-label="Nombre de tués par an de 1970 à 2025">' + grille + annees +
      '<line x1="' + X(m[0]).toFixed(1) + '" x2="' + X(m[0]).toFixed(1) + '" y1="30" y2="380" stroke="' + c[1] + '" stroke-width="2" stroke-dasharray="5 5"/>' +
      '<path d="' + d + ' L 980 380 L 60 380 Z" fill="#ff3131" opacity=".1"/><path d="' + d + '" fill="none" stroke="#e01f1f" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<text class="lab" x="150" y="92">1972 : 16 545</text><text class="lab" x="972" y="296" text-anchor="end">2025 : 3 263</text></svg>' + points + '</div>' +
      '<div class="s-fiche"><div class="g"><span class="dt">' + esc(m[2]) + '</span><span class="s-tag" style="background:' + c[1] + '">' + c[0] + '</span><h3>' + esc(m[3]) + '</h3><p>' + esc(m[4]) + '</p></div>' +
      '<div class="d"><small>Tués sur l’année</small>' + ligne(m[0] - 1) + '<br>' + ligne(m[0] + 1) + '</div>' +
      '<div class="s-nav"><button type="button" data-act="pas" data-v="-1">Mesure précédente</button><button type="button" class="pl" data-act="pas" data-v="1">Mesure suivante</button></div></div></section>' +
      '<section class="s-bloc"><h2>Toutes les mesures</h2><div class="s-liste">' + liste + '</div></section>' +
      '<p class="s-source">Chiffres ONISR, France métropolitaine. Jusqu’en 2004, on comptait les décès dans les 6 jours après l’accident ; depuis 2005, dans les 30 jours (compté à 30 jours, 1972 représente environ 18 000 tués). La courbe montre une tendance : une baisse ou une hausse d’une année ne s’explique jamais par une seule mesure.</p>';
  }

  function barres(L, max, couleur) {
    return '<div class="s-barres">' + L.map((x) => '<div class="s-barre"><b>' + x[0] + '</b><span class="f"><i style="width:' + (x[1] / max * 100).toFixed(1) + '%;background:' + (x[2] || couleur) + '"></i></span><em>' + x[3] + '</em></div>').join('') + '</div>';
  }

  function vueQui() {
    const ages = [['0-13 ans', 58], ['14-17 ans', 133], ['18-24 ans', 528], ['25-34 ans', 471], ['35-64 ans', 1153], ['65-74 ans', 382], ['75 ans et +', 538]]
      .map((a) => [a[0], a[1], a[0] === '18-24 ans' ? '#c41a1a' : '#e8a3a3', fmt(a[1])]);
    const causes = [['Vitesse', 29], ['Alcool', 21], ['Inattention', 13], ['Stupéfiants', 11], ['Malaise', 11], ['Manœuvre dangereuse', 10], ['Refus de priorité', 10], ['Contresens', 4]]
      .map((c, i) => [c[0], c[1], i < 2 ? '#c41a1a' : '#9aa2ab', c[1] + ' %']);
    const pct = (n) => Math.round(n / 3263 * 100) + ' %';
    const usagers = [['Voiture', 1543, 'occupants de voitures', '#1c2430'], ['Moto et scooter', 697, '579 motards, 118 cyclomoteurs', '#c41a1a'], ['Piétons', 503, '+47 en un an', '#b35c00'],
      ['Vélo', 235, 'cyclistes', '#2f6fd1'], ['Trottinette', 79, 'EDP motorisés, +34 en un an', '#7b3fb5'], ['Autres', 206, 'poids lourds, utilitaires, bus…', '#6b7179']];
    const reseaux = [['Routes hors agglomération', 1973, '#c41a1a'], ['En agglomération', 1031, '#4a5568'], ['Autoroutes', 259, '#9aa2ab']];
    return '<div class="s-cles">' +
      '<div class="s-cle sombre"><small>En 2025, chaque jour</small><b>près de 9 morts</b><span>3 263 sur l’année</span></div>' +
      '<div class="s-cle"><small>Blessés graves</small><b>17 000</b><span>sur 247 000 blessés</span></div>' +
      '<div class="s-cle rouge"><small>Parmi les morts</small><b>77 % d’hommes</b><span>2 523 hommes, 740 femmes</span></div></div>' +
      '<section class="s-bloc"><h2>Quel âge ?</h2>' + barres(ages, 1153) +
      '<div class="s-duo"><div class="s-encart r"><b>Les 18-24 ans : 2 fois plus de risque</b>96 tués par million de jeunes, contre 49 en moyenne. Ils sont 8 % de la population, mais 19 % des conducteurs responsables d’un accident mortel.</div>' +
      '<div class="s-encart"><b>Les 75 ans et plus : 73 tués par million</b>Le 2e risque de décès le plus élevé, juste après les 18-24 ans. 538 morts en 2025.</div></div></section>' +
      '<section class="s-bloc"><h2>Qui meurt sur la route ?</h2><div class="s-usagers">' +
      usagers.map((u) => '<div class="s-usager"><b style="color:' + u[3] + '">' + pct(u[1]) + '</b><strong>' + u[0] + '</strong><span>' + fmt(u[1]) + ' tués · ' + u[2] + '</span></div>').join('') +
      '</div><p>Piétons, cyclistes, deux-roues et trottinettes ne sont pas protégés par une carrosserie : ils représentent <b>près de la moitié des morts (47 %)</b> et deux tiers des blessés graves (67 %).</p></section>' +
      '<section class="s-bloc"><h2>Pourquoi ?</h2><p style="margin:0 0 12px">Ce qu’on retrouve chez les conducteurs responsables d’un accident mortel. Un même accident peut avoir plusieurs causes.</p>' + barres(causes, 29) +
      '<div class="s-duo"><div class="s-encart r"><b>La vitesse et l’alcool</b>sont les deux premières causes : on les retrouve chez près d’un responsable sur trois et d’un sur cinq.</div></div></section>' +
      '<div class="s-deux"><section class="s-bloc"><h2>Où ?</h2>' +
      reseaux.map((r) => '<div class="s-res"><div><b>' + r[0] + '</b><span>' + fmt(r[1]) + ' tués · ' + pct(r[1]) + '</span></div><span class="f"><i style="width:' + pct(r[1]).replace(' ', '') + ';background:' + r[2] + '"></i></span></div>').join('') +
      '<p>6 morts sur 10 ont lieu sur les routes hors agglomération, hors autoroutes.</p></section>' +
      '<section class="s-bloc"><h2>Quand ?</h2><div class="s-mois"><div class="r"><small>Août</small><b>340 tués</b></div><div><small>Février</small><b>195 tués</b></div></div>' +
      '<p>L’été est la période la plus meurtrière : 298 morts par mois en moyenne de mai à décembre, contre 220 de janvier à avril. La pire semaine de 2025 a été celle du 7 juillet : 91 morts.</p></section></div>' +
      '<p class="s-source">Chiffres définitifs 2025, France métropolitaine, ONISR (bilan publié le 29 mai 2026). Tués à 30 jours.</p>';
  }

  function rendre() {
    racine.innerHTML = '<h1>Les chiffres de la route</h1><p class="intro">50 ans de sécurité routière, et qui sont les victimes aujourd’hui.</p>' +
      '<div class="s-onglets" role="tablist" aria-label="Chiffres">' +
      [['courbe', 'La courbe depuis 1970'], ['qui', 'Qui, où, pourquoi en 2025']].map((o) => '<button type="button" role="tab" data-act="vue" data-v="' + o[0] + '" aria-selected="' + (etat.vue === o[0]) + '"' + (etat.vue === o[0] ? ' class="on"' : '') + '>' + o[1] + '</button>').join('') +
      '</div>' + (etat.vue === 'qui' ? vueQui() : vueCourbe());
  }

  racine.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act, v = b.dataset.v;
    if (a === 'vue') etat.vue = v;
    else if (a === 'sel') etat.sel = +v;
    else if (a === 'cat') {
      etat.cat = v;
      if (v !== 'tous' && MESURES[etat.sel][1] !== v) etat.sel = MESURES.findIndex((x) => x[1] === v);
    } else if (a === 'pas') {
      const vis = MESURES.map((x, i) => i).filter((i) => etat.cat === 'tous' || MESURES[i][1] === etat.cat);
      const k = vis.indexOf(etat.sel);
      etat.sel = vis[((k < 0 ? 0 : k) + +v + vis.length) % vis.length];
    }
    rendre();
  });

  window.EasyChiffres = { rendre: function () { if (!racine.firstChild) rendre(); } };
})();
