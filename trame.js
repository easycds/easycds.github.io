/* =====================================================================
   TRAME PÉDAGOGIQUE — données communes à pedagogie.html et livret.html.
   Modifier ici met à jour les deux pages.
   Chaque étape : titre + liste de points. **texte** = mis en valeur.
   ===================================================================== */
var COMPETENCES = [
  {
    code: "C1",
    titre: "Compétence 1",
    sousTitre: "Maîtriser le maniement du véhicule dans un trafic faible ou nul",
    etapes: [
      { titre: "Découverte de la formation et du véhicule", points: [
        "Explication du déroulement de la formation.",
        "Explication des différentes **commandes du véhicule**.",
        "**Installation au poste de conduite**.",
        "Entrer et sortir du véhicule."
      ]},
      { titre: "Regard et manipulation du volant", points: [
        "Explication de la **tâche aveugle**, vision à **180 degrés**.",
        "**Retour de volant**.",
        "Manipulation du volant : ligne droite, légère courbe, **12 h**.",
        "**Petit chevauchement**, **grand chevauchement**.",
        "**TAG / TAD** avec les repères."
      ]},
      { titre: "Repérer les intersections", points: [
        "Commencer à demander aux élèves de **repérer les intersections**."
      ]},
      { titre: "Chaîne cinématique, démarrer et s'arrêter", points: [
        "La **chaîne cinématique**, mettre le contact.",
        "**Démarrer, s'arrêter**.",
        "Manipulation du levier par l'élève **de 1 à 5**.",
        "Explication du **calage**, redémarrer après un calage.",
        "**1-2 arrêt précis** horizontal ou vertical.",
        "**Dosage du frein** sans caler en deuxième.",
        "**1-2-3 / 3-2** : frein moteur et **freinage dégressif** plus arrêt précis.",
        "**1-4 / 4-2**, **1-5 / 5-2**."
      ]},
      { titre: "Démarrage en côte", points: [
        "Avec le **frein à main**.",
        "Sans le frein à main.",
        "Le **point de stabilisation**."
      ]},
      { titre: "CCPA en TAG / TAD", points: [
        "**CCPA** en TAG et TAD.",
        "Les élèves doivent prendre l'habitude de faire les étapes **dans les règles**."
      ]},
      { titre: "Marche arrière et demi-tour", points: [
        "Marche arrière en **ligne droite**, en **courbe**.",
        "**Demi-tour**.",
        "Respecter l'ordre des **4 étapes** : mécanique, contrôle, clignotant, allure lente."
      ]},
      { titre: "Reprise de la première", points: [
        "**Reprise de la première**, uniquement quand le **moteur broute**."
      ]}
    ]
  },
  {
    code: "C2",
    titre: "Compétence 2",
    sousTitre: "Appréhender la route — conditions normales · Intersections, giratoires, manœuvres de stationnement",
    etapes: [
      { titre: "Vérification des connaissances du code de la route", points: [
        "Faire des dessins et questionner sur les formes et couleurs des panneaux : triangle = danger, rond rouge = interdiction, rond bleu = obligation, carré/rectangle = indication.",
        "Penser aux panneaux priorité à droite et priorité ponctuelle.",
        "Consolidation placements TAD/TAG, stop et CLP."
      ]},
      { titre: "Mise en place de la conduite commentée & détection", points: [
        "Expliquer le PADA pour la détection.",
        "Indices formels (panneaux, balises, marquages au sol).",
        "Indices informels (coupures trottoirs, puits de lumière).",
        "Importance des passages piétons pour la détection des intersections.",
        "Chercher le régime de priorité.",
        "OBLIGATION DE CONTRÔLER TOUTES LES INTERSECTIONS à gauche et à droite.",
        "L'objectif est d'anticiper en premier l'arrêt : contrôles défensifs et F/R en 2nd maxi.",
        "Expliquer les distances d'arrêt à 50 km/h — prise d'info à 30 m min (= 5 à 6 véhicules stationnés).",
        "Ne pas oublier le contrôle de l'intersection à gauche en premier.",
        "L'élève doit dire tous les panneaux, marquages et intersections — par ordre d'importance, sans dire ce qu'il fait.",
        "Si l'élève ne parle pas ou peu, faire soi-même et relancer l'élève durant toute la leçon.",
        "POUR CONTINUER DANS LA FORMATION, L'ÉLÈVE DOIT DÉJÀ SAVOIR JETER DES COUPS D'ŒIL À TOUTES LES INTERSECTIONS."
      ]},
      { titre: "Franchir des feux tricolores — tout droit", points: [
        "Faire un schéma pour savoir anticiper un feu orange en sécurité.",
        "Rôle des flèches au sol pour les distances : contrôles défensifs, pied devant le frein.",
        "La décision se fait à la dernière flèche (arrêt ou pas).",
        "Attention : le feu piéton n'est pas un absolu — certains feux piétons passent au rouge en même temps que le feu orange.",
        "Quand la décision est prise de repartir, penser contrôles intersections.",
        "Rappel : tourner à une intersection en 2nd maxi.",
        "Vérifier contrôles intersections avec un regard plus large sur le passage piéton."
      ]},
      { titre: "Feux TAD / TAG", points: [
        "TAD : redire que le 1er danger est le véhicule en face qui va tout droit.",
        "TAG : insister sur l'importance de la ligne médiane et du CCPA — si lignes face à face, on passe derrière ; si décalées, on passe devant ; si doute, on laisse faire les autres ou on passe derrière.",
        "Montrer l'importance d'une allure adaptée pour un TAG et ré-insister sur le danger des véhicules en face.",
        "Préciser l'attitude à avoir lors de l'embouteillage d'une intersection.",
        "Consolider la conduite commentée en pensant aux piétons, feux croix rouges."
      ]},
      { titre: "Différences entre sens giratoire et rond-point — CSG à une voie", points: [
        "Sens giratoire : signalisation particulière.",
        "Rond-point : c'est l'obstacle.",
        "Tous les CSG sont des ronds-points, mais tous les ronds-points ne sont pas des CSG (gérés par feux, stops, priorités à droite, panneau bleu permettant de ne pas contourner l'obstacle).",
        "Importance des panneaux.",
        "Pour les CSG à une voie, l'élève privilégie l'allure et la trajectoire et voit s'il pense qu'il y a des contrôles utiles à faire.",
        "Rappel : arriver en 2nd, pied gauche à gauche, pied droit toujours devant le frein.",
        "Règle implicite du quart du CSG pour la prise de décision."
      ]},
      { titre: "CSG TAD et tout droit", points: [
        "Se placer à droite — L'IMPOSER : importance des mains en haut et du chevauchement, dynamisme du regard.",
        "Contrôler rétroviseurs et angle mort à gauche un peu avant la sortie.",
        "Expliquer l'importance du champ de vision et des contrôles intersections, de l'anticipation des contrôles pour aborder le regard de fin uniquement sur la sortie."
      ]},
      { titre: "CSG TAG et demi-tour", points: [
        "Se placer à l'intérieur.",
        "L'élève s'occupe d'abord de son allure et doit la maintenir.",
        "Puis contrôler régulièrement tout le long du CSG : rétros intérieur, extérieur droit et angle mort à droite sans perdre de vue devant.",
        "Se rabattre sur le terre-plein de la sortie précédant sa sortie — le clignotant se met normalement presque en même temps.",
        "Si besoin angle mort à gauche un peu avant la sortie, mais l'élève doit privilégier sa sortie (placement, piétons)."
      ]},
      { titre: "CSG direction inconnue", points: [
        "L'élève se place à droite et met son clignotant à gauche.",
        "Il contrôle régulièrement ce qui se passe à gauche avec les rétroviseurs et l'angle mort.",
        "À l'approche d'un CSG connu, demander à l'élève la direction qui l'oblige à faire demi-tour et qui n'est donc pas inscrite sur le panneau diagrammatique."
      ]},
      { titre: "Choix de voies & parcours d'observation", points: [
        "Diagrammatique : savoir la direction et le placement.",
        "Triangulaire : détection, contrôles avec angle mort si bande cyclable.",
        "Avec un dessin, expliquer que les flèches prennent effet là où elles sont.",
        "Développer le dessin avec les deux voies pour tourner à gauche.",
        "Montrer l'importance de la largeur des traits au sol pour le placement autant que les flèches.",
        "Mise en situation avec des TAG à deux voies, des impasses, des sens interdits, en finissant avec des carrefours complexes (ronds-points)."
      ]},
      { titre: "Rangement en bataille arrière droit", points: [
        "Donner les critères examen : sécurité, allure, collision.",
        "L'objectif est de montrer que l'on juge une conduite de tous les jours plus que la manœuvre parfaite.",
        "Donner des repères même si l'élève maîtrise.",
        "Ne pas systématiser l'ouverture de la portière avant pour connaître son positionnement. 3 repères : roues arrières même hauteur que le début du véhicule ou que la ligne 2 / ligne 3 = moitié vitre avant / début du véhicule dans début vitre arrière.",
        "Penser à en faire avec un trottoir.",
        "L'élève peut utiliser ses rétroviseurs extérieurs.",
        "Surveiller ses contrôles vers l'arrière.",
        "Montrer l'importance du regard devant pour la trajectoire et les roues droites.",
        "Au moindre doute, correction."
      ]},
      { titre: "Rangement en bataille arrière gauche", points: [
        "En sens unique uniquement.",
        "Repère : roues arrières comme RBD.",
        "L'élève braque quand le bloc rétro passe la 1re ligne de la place où il doit se stationner puis il regarde droit devant au milieu de sa place et au loin.",
        "Pour la correction, ne pas hésiter à utiliser l'espace derrière en ligne droite pour manœuvrer ensuite en marche avant.",
        "Penser impérativement à en faire avec des trottoirs."
      ]},
      { titre: "Rangement bataille avant droit et gauche — Épi avant droit et gauche", points: [
        "Mêmes critères examen.",
        "Repères adaptés selon la configuration.",
        "Penser impérativement à en faire avec des trottoirs.",
        "Sortie d'un rangement bataille, épi ou créneau : il faut qu'au moins la moitié du véhicule soit sortie.",
        "L'élève doit vite projeter son regard au loin sinon il risque de revenir trop sur le véhicule stationné."
      ]},
      { titre: "Créneau à droite", points: [
        "L'élève s'arrête rétro à côté du rétro du véhicule où doit s'effectuer le créneau avec au moins un rétro imaginaire entre.",
        "Pour réussir, l'élève gère l'arrêt à la place précédente puis laisse \"glisser\" son véhicule, regard devant/bloc rétro.",
        "Laisser d'abord faire l'élève — s'il y arrive vérifier si ce n'est pas un coup de chance.",
        "Sinon diversité de repères : feu arrière du véhicule dans mi-vitre arrière puis mi-vitre avant, roue arrière droite dans la place ou montée sur le trottoir, 45°.",
        "Point mort et frein à main en fin de manœuvre."
      ]},
      { titre: "Créneau à gauche", points: [
        "Pour ceux en difficulté : en marche arrière, les roues arrières doivent dépasser l'arrière de l'autre véhicule au minimum — ne pas hésiter à reculer beaucoup plus.",
        "L'élève ne doit pas regarder ses rétros, chercher en vision directe.",
        "Vérifier son regard.",
        "Braquer à fond à gauche et se retourner dans la lunette arrière.",
        "Quand il ne voit plus le trottoir ou le véhicule derrière, s'arrêter puis mettre les roues droites.",
        "Se retourner tout à gauche derrière et s'adapter.",
        "L'élève peut se poser sur un trottoir sans le percuter.",
        "Idem rétro à côté rétro.",
        "Dépasser le véhicule en MA et en vision directe chercher si la roue arrière gauche est rentrée dans la place.",
        "Sinon se retourner dans la lunette arrière.",
        "Quand il ne voit plus le véhicule derrière, contrebraquer à fond.",
        "Si doute : roues droites et reculer un peu plus.",
        "Point mort et frein à main."
      ]},
      { titre: "Global C2 sur une heure — Bilan n°1", points: [
        "S'aider de l'application.",
        "Lire les consignes.",
        "Effectuer un parcours de 25 minutes environ.",
        "Relire les consignes et en même temps c'est l'élève qui indique si l'objectif est acquis, en cours ou non acquis.",
        "Le moniteur valide ou non le choix de l'élève.",
        "L'élève doit savoir ce que l'on attend de lui le jour du permis et donc dans la vie de tous les jours.",
        "Selon les élèves, on peut aussi faire les rues étroites (C3) et revenir ensuite refaire bilan n°1.",
        "Finir la leçon en insistant sur l'importance de tout ce qui a été fait avant (mécanique, contrôles) et la conduite commentée.",
        "Consolider le franchissement des intersections en vérifiant en 1er le contrôle de celles-ci.",
        "INSISTER sur l'approche : contrôles/clignotant.",
        "Sinon, refuser à l'élève de s'arrêter et redemander un autre arrêt plus loin.",
        "Si C1/C2 OK : valider les compétences dans l'application et la fiche de suivi.",
        "Prévoir avec la secrétaire : heure de mécanique, EB ou passage de permis, RDV préalable.",
        "Refaire un point sur les finances avec l'élève puis avec la secrétaire."
      ]}
    ],
    alertes: ["Si C1/C2 OK → colorier les cases dans la fiche de suivi ET valider dans l'application. Prévoir avec la secrétaire : heure méca, EB, RDV préalable. Refaire un point finances."],
    astuces: [
      "L'élève doit déjà savoir jeter des coups d'œil à toutes les intersections avant de passer en C2",
      "Créneau : rétro à côté rétro, laisser \"glisser\", regard devant/bloc rétro",
      "Choix de voies : les flèches prennent effet là où elles sont tracées",
      "TAG : ligne médiane + CCPA — si doute, passer derrière",
      "Sortie manœuvre : ½ véhicule sorti, regard loin immédiatement",
      "CSG direction inconnue : clignotant gauche, se placer à droite, contrôles à gauche"
    ]
  },
  {
    code: "C3",
    titre: "Compétence 3",
    sousTitre: "Circuler dans des conditions difficiles — à différentes allures · Rues étroites, campagne, voie rapide, centre-ville",
    etapes: [
      { titre: "Rues étroites", points: [
        "Exercices de gabarit : faire arrêter l'élève le plus près possible du trottoir puis d'un véhicule en lui cachant le rétroviseur extérieur droit.",
        "Regard dynamique : devant et ce que je serre (trottoir, bloc rétro).",
        "Expliquer les règles de priorités, le rôle de l'observation et l'anticipation des arrêts pour s'adapter vis-à-vis des zones de dégagements.",
        "S'entraîner dans des rues étroites.",
        "Ne pas oublier de vérifier CCPA quand écarts.",
        "Surveiller placements et contrôles dans les intersections.",
        "Les suivis de direction sont à travailler dès le début de la C1 !"
      ]},
      { titre: "Campagne & virages", points: [
        "Demander la principale différence entre ville et campagne (80 km/h).",
        "Signalisation pour les virages : triangulaire à 150 m (peut être mise quand cela change par rapport à avant, ou s'il existe un danger dans le virage), chevrons bleus et blancs, balises en montagne.",
        "Parler de l'énergie cinétique qui se transforme en force centrifuge.",
        "L'essentiel est fait avant d'arriver dans le virage : décélération, freinage, rétrogradation selon la configuration.",
        "Bien serrer à droite à l'entrée du virage.",
        "Une fois dedans, garder l'allure.",
        "Quand il voit la sortie (à mi-virage environ), réaccélérer.",
        "IL FAUT SURVEILLER VOIRE ORIENTER SON REGARD.",
        "Penser à signaler de se ré-écarter de l'accotement en sortie de virage si personne en face.",
        "Sur les rues étroites de campagne, ne pas coller l'accotement sauf à l'entrée des virages.",
        "Si croisement difficile, ralentir avant de se précipiter sur l'accotement.",
        "Regard dynamique : devant, le long de l'accotement, ce que je serre, là où je vais.",
        "Remonter les mains sur le volant pour de meilleures trajectoires.",
        "Signaler que la plupart des intersections sont signalées en campagne — parler des fils électriques."
      ]},
      { titre: "Arrêt de précision à 80 km/h", points: [
        "Aller en campagne et faire la démonstration d'un arrêt de précision à 80 km/h sur la poubelle d'un parking.",
        "Ne freiner fort qu'à l'intérieur.",
        "Procédure : au panneau qui annonce le parking à 250 m, contrôles et clignotant et on rétrograde d'une vitesse sans freiner.",
        "Au panneau d'entrée de parking, on freine fort et on rétrograde d'une vitesse à l'intérieur si possible, sans oublier la souplesse et la précision au niveau de la poubelle (hauteur de l'épaule).",
        "Faire pousser les rapports de vitesse plus forts et plus longtemps, notamment la 3e jusqu'à 80 km/h tout en prenant le temps lors des changements de vitesse.",
        "Objectif : préparer à la voie rapide.",
        "Penser à signaler lors du départ du parking que le danger vient aussi d'en face (véhicules qui effectuent un dépassement)."
      ]},
      { titre: "TAD en campagne & voies de stockage", points: [
        "Prendre la même procédure que l'arrêt de précision à 80 km/h, mais l'élève doit rétrograder jusqu'en 2nd avant de prendre une décision.",
        "Si hésitation, l'aider à y aller.",
        "Reprendre ensuite les commandes, lui demander de regarder le rétroviseur intérieur pour qu'il se rende compte du temps que le véhicule qui lui faisait peur a mis pour passer.",
        "On tourne normalement en 2nd.",
        "En roulant ou à l'arrêt, rappeler le rôle de la signalisation dans l'anticipation : panneaux à 150 m, balises signalant l'emplacement des intersections.",
        "Aider l'élève à faire les choses plus tôt pour ne pas subir la pression des autres."
      ]},
      { titre: "Voies d'accélération (VA)", points: [
        "Utiliser un schéma.",
        "Parler des limitations de vitesse sur autoroutes, voies à accès réglementées, rocades.",
        "Signifier que c'est 90 km/h pour tout le monde quand il y a un panneau à 90.",
        "Indices pour identifier la présence d'une VA avant d'arriver : panneaux bleus, CLP avec interdiction de TAD et TAG.",
        "Avant toute chose, l'élève pense au virage.",
        "Dans le virage : être en 3e ou 4e, ne changer de rapport qu'une fois inséré.",
        "En sortie de virage : l'élève est déjà à l'allure des véhicules devant.",
        "Si possible, effectuer un 1er angle mort ou regard sur la circulation dans/en sortie de virage.",
        "La majeure partie de l'info vers l'arrière se fera aux rétros extérieurs : alternance regard devant/rétros.",
        "Si à la bonne allure, il reste l'ensemble de la voie pour moduler.",
        "Objectif : s'insérer sans modifier l'allure des véhicules qui arrivent.",
        "Le clignotant peut être mis plus tôt (dans le virage) mais ce n'est pas un absolu.",
        "Avant l'insertion : AM à gauche.",
        "Une fois inséré : enlever clignotant et enchaîner les vitesses sans en sauter une.",
        "Si bouchon : s'insérer dès le début de la voie sans forcer.",
        "Si on suit un camion ou une file à l'approche d'une VA : laisser une distance avec le véhicule devant."
      ]},
      { titre: "Voies de décélération (VD)", points: [
        "Sur la voie rapide, parler de la signalisation avancée pour les directions.",
        "Pour trouver la VD : panneaux de confirmation d'affectation de voie.",
        "La flèche indique le début de la VD.",
        "Rentrer dès le début pour ne pas risquer d'être dépassé par la droite.",
        "Contrairement aux voies de stockage, garder l'accélérateur jusqu'à ce qu'il rentre dedans, puis même exercice que les voies de stockage.",
        "Montrer que la signalisation des limitations de vitesse aide à franchir le virage : panneau 70 = freiner et rétrograder d'une vitesse, 50 = idem.",
        "Gérer d'abord une distance d'arrêt."
      ]},
      { titre: "Voies d'entrecroisement & insertions pour les autres", points: [
        "Si l'élève veut sortir de la voie rapide : d'abord garder son allure puis s'adapter.",
        "Si rentrer : même chose qu'une VA, tout en surveillant l'allure des véhicules devant sur les deux voies.",
        "On n'est pas obligé de se jeter sur la voie de gauche — dans la majorité des cas, une anticipation de l'allure en amont suffit.",
        "L'élève doit contrôler ce qui se passe sur une VA avant son arrivée, pendant et après son passage.",
        "Ne pas arriver si possible côte à côte avec les autres véhicules qui veulent s'insérer (les camions sont plus forts)."
      ]},
      { titre: "Circuler sur la voie rapide — Distances de sécurité", points: [
        "Entre l'heure sur VA/VD et celle de confirmation, demander à l'élève de faire les exercices dans l'application sur les distances de sécurité.",
        "Sur voies rapides, demander comment il gère les distances : la réponse est souvent \"deux traits\".",
        "Signaler que cela fonctionne sur autoroute à 130 km/h.",
        "Faire la démonstration d'un repère fixe et du décompte de 2 secondes (un crocodile ou un Y).",
        "Signaler que durant les heures de pointe, on leur demande de ne pas coller les véhicules devant."
      ]},
      { titre: "Dépassements", points: [
        "Sur voies rapides, aller si possible à des endroits où on peut effectuer des dépassements de camions.",
        "Bien montrer que les distances de sécurité doivent être respectées avant, pendant et après le dépassement.",
        "Durant le dépassement, le regard se porte devant sur sa trajectoire et pas sur le véhicule dépassé.",
        "Pour savoir quand se rabattre : revoir le véhicule dépassé dans le rétroviseur intérieur.",
        "Pour les vélos en ville, ce sera plus le rétroviseur extérieur.",
        "Attention aux limitations de vitesse !"
      ]},
      { titre: "Régulateur & limiteur de vitesse", points: [
        "Expliquer le fonctionnement du régulateur à l'arrêt : comment l'activer, le désactiver, sélectionner une vitesse.",
        "L'élève devra le mettre en pratique ensuite seul.",
        "En roulant, parler des conditions pour l'utiliser : trafic, grandes routes.",
        "Préciser que le limiteur fonctionne sur le même principe.",
        "Parler aussi des régulateurs adaptatifs."
      ]},
      { titre: "Tunnel", points: [
        "Lors du franchissement d'un tunnel (celui d'Avrillé est parfait) : signaler la présence du panneau bleu qui oblige le fonctionnement des feux de croisement et des distances de sécurité plus grandes.",
        "Si le tunnel est éclairé et en agglomération, les feux de position suffisent (tunnel après le château d'Angers).",
        "Demander comment on gère les distances de sécurité (lumières bleues) et ce que l'on doit faire si présence de fumées à l'intérieur : arrêter le véhicule, laisser les clés, aller le plus rapidement possible aux abris ou issues de secours.",
        "Parler aussi de la sortie du tunnel : luminosité et pare-soleil si besoin."
      ]},
      { titre: "Voie rapide — Centre-ville (VR/CV)", points: [
        "L'objectif est que l'élève roule sur une même heure à des allures lentes et très rapides.",
        "En CV : montrer respect et courtoisie vis-à-vis des autres usagers, notamment les plus vulnérables.",
        "Multiplier les contrôles, angles morts parfois même sur les trottoirs, vérifier régulièrement si les deux roues ne remontent pas derrière.",
        "Anticiper et multiplier les arrêts (par exemple à chaque passage piéton) — la traversée d'un CV est nécessairement lente et tranquille.",
        "Parler du stop and start aux feux.",
        "Montrer que chaque usager a sa signalisation : tram, bus, vélos, piétons."
      ]}
    ],
    alertes: ["Les suivis de direction se travaillent dès le début de la C1 !"],
    astuces: [
      "TAD en campagne : anticiper grâce aux panneaux à 150 m et aux fils électriques",
      "Tunnels : Avrillé (feux croisement) · Château d'Angers (feux position suffisent)",
      "Distances de sécu : exercices dans l'application entre heure VA/VD et confirmation",
      "Camion = toujours plus fort… anticiper dès le début de la VA",
      "Ne pas coller l'accotement en campagne sauf à l'entrée des virages",
      "CV : remonter les mains sur le volant pour de meilleures trajectoires en rues étroites"
    ]
  },
  {
    code: "C4",
    titre: "Compétence 4",
    sousTitre: "Conduite autonome, sûre & économique — avec d'autres · Longue distance, risques, premiers secours, écoconduite, vérifications, examen",
    etapes: [
      { titre: "Objectifs transversaux C1/C2/C3/C4", points: [
        "Ces objectifs sont à travailler en transversale durant toute la formation : C4b/c/d/f = longue distance, risque au volant, premiers secours, entretiens.",
        "Heure de mécanique : si une situation le permet, en parler pendant la leçon (fatigue, alcool, drogues, vue).",
        "Durant C3/C4, revoir les questions sur les premiers secours notamment durant les pauses.",
        "Si situation, en parler — pas avant la C2, l'élève doit d'abord avoir acquis ses bases mécaniques.",
        "On peut parler de l'approche des feux, des CLP.",
        "On peut expliquer que l'on peut s'arrêter en 3e, 4e, 5e, sauter des vitesses — mais au cas par cas, pas un absolu."
      ]},
      { titre: "Vérifications & application", points: [
        "Les vérifications réglementaires sont accessibles dans l'application.",
        "Si AAC/CS : vérifier en premier que la mécanique est assimilée et prévoir le RDV préalable ou vérifier si celui-ci est posé.",
        "Ne pas hésiter à faire venir l'accompagnateur tout le long de la formation si difficultés.",
        "Il peut venir sur l'une des dernières heures en véhicule — on peut ainsi prendre une décision en commun pour la suite (RDV préalable ou non)."
      ]},
      { titre: "Écoconduite", points: [
        "Aborder l'écoconduite dans le contexte de la conduite : anticipation, gestion des rapports de vitesse, éviter les freinages inutiles.",
        "Régulateur adaptatif.",
        "Conduite souple = économique et sûre.",
        "Sauter des vitesses selon le contexte — mais attention, cela est au cas par cas, pas un absolu."
      ]},
      { titre: "Global & FFI — Fin de Formation Initiale", points: [
        "Tout revoir.",
        "Avant de se présenter à un EB ou un RDV préalable, l'élève doit avoir validé sa Fin de Formation Initiale (Bilan n°2).",
        "Les objectifs des 4 compétences étant assimilés, les cases des fiches de suivi ET de l'application sont validées, le bilan n°2 complété.",
        "On peut mixer EB et RDV préalable pour les CS en attente d'une date de permis.",
        "Si B : l'élève qui prétend à un EB a le niveau du permis — il a fini et assimilé sa formation.",
        "L'EB est là pour révéler le candidat et sa gestion du stress.",
        "Normalement il ne devra pas avoir plus de 6 h de préparations permis (c'est un maximum, pas une obligation)."
      ]},
      { titre: "Examen blanc (EB)", points: [
        "Présenter le déroulement de l'examen blanc.",
        "Demander à l'élève de venir avec sa carte d'identité.",
        "Vouvoyer l'élève.",
        "Vérifier document d'identité et suivi dans l'application (âge !).",
        "Donner les consignes.",
        "Parcours type examen difficile.",
        "Ne rien laisser passer en restant très froid.",
        "Remplir la page EB et expliquer en même temps la logique de la notation.",
        "Penser à dire à l'élève que ce n'est pas un concours mais un examen — l'inspecteur n'est là que pour faire un constat, pas l'éliminer.",
        "Laisser le moniteur référent faire un bilan avec son élève afin de déterminer le nombre d'heures de préparations permis et éventuellement le passage de l'examen.",
        "PRÉCISER LES DÉLAIS DE REPASSAGE."
      ]},
      { titre: "Préparations permis", points: [
        "Penser à vérifier dans l'application (surtout AAC), fiche de suivi, âge.",
        "Continuer à travailler type EB surtout les 2 premières heures.",
        "Ensuite être plus détendu en corrigeant le plus important si besoin.",
        "Penser à la conduite commentée pour les plus stressés — la faire soi-même si nécessaire et relancer l'élève tout le temps.",
        "Montrer le centre d'examen et expliquer le déroulement : pourquoi ils sont convoqués ensemble, présence d'un parking et d'une salle d'attente, quand se rapprocher du véhicule et attendre le signe pour s'installer.",
        "SIGNALER QU'IL EST INTERDIT DE FILMER OU DE PRENDRE DES PHOTOS SUR LE CENTRE D'EXAMEN.",
        "LES ACCOMPAGNATEURS NE DOIVENT PAS ALLER À LA RENCONTRE DES INSPECTEURS.",
        "Signaler que si problème, le moniteur a le numéro de l'élève."
      ]},
      { titre: "Le jour du permis", points: [
        "Le moniteur doit se présenter un quart d'heure avant et s'assurer que les élèves convoqués sont bien présents.",
        "Si absence : les appeler et laisser un message.",
        "Il est là pour les rassurer mais aussi pour les faire rentrer dans l'examen.",
        "Parler des inspecteurs, toujours en positif.",
        "Re-demander carte d'identité et suivi AAC dans l'application que l'on re-vérifie.",
        "Demander d'éteindre le téléphone.",
        "Si besoin, remontrer essuie-glaces, feux, désembuage.",
        "Pendant l'examen : c'est l'inspecteur qui parle, pas le moniteur qui engage la conversation.",
        "Si désaccord avec les décisions : attendre la fin de la session pour en parler avec l'inspecteur, et surtout faire remonter l'information au référent pédagogique.",
        "Après l'examen : le moniteur référent refait un débriefing avec les élèves (par téléphone par exemple)."
      ]}
    ],
    alertes: ["Interdit de filmer ou photographier sur le centre d'examen. Les accompagnateurs ne doivent pas aller à la rencontre des inspecteurs."],
    astuces: [
      "AAC/CS : possible de mixer EB et RDV préalable en attente d'une date",
      "Préparation permis : type EB les 2 premières heures, puis décompresser",
      "Préciser les délais de repassage dès la fin de l'EB",
      "Après l'examen : débriefing moniteur référent avec l'élève (téléphone)",
      "L'EB révèle le candidat et sa gestion du stress — max 6 h de préparation",
      "Inspecteurs : toujours en parler positivement aux élèves avant l'examen"
    ]
  },
];
