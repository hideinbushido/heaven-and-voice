# Atelier — H&V Family (Heaven & Voice)

Mode : nouveau site
Direction : fond noir, ivoire (fond des photos), textes or — décidé le 2026-11-09 (budget photo)
Polices : à proposer (étape 1)
Branche : `main`

## Sections
Plan à faire à l'étape 2.

## Assets
| Asset | Origine | Inspiré de | Utilisé où |
|---|---|---|---|
| 3 photos de scène | fournies par l'utilisateur | — | à placer |
| Vidéo Gloria Dakar (41 s) | fournie | — | candidate pour l'accueil |
| Session acoustique (2 min 50) | fournie | — | candidate pour l'équipe ou la vitrine |
| Scène de nuit (3 s) | fournie | — | transition, ambiance |

## Décisions
- 2026-11-09 : 3e référence de l'utilisateur pour l'équipe : Awwwards « Inherited Band » — https://www.awwwards.com/sites/inherited-band (un membre à la fois en plein écran : gros plan + petit cadre photo, nom en lettres espacées, rôles en petit).
- 2026-11-09 : vidéos utilisées **telles quelles** (pas de détourage, pas de recadrage des personnes). Seule la session de 2 min 50 est découpée en 3 extraits (~57 s). Conversion .mov → .mp4 pour le web uniquement.
- 2026-11-09 : outil = **Framer** (compte de l'utilisateur, connecté). Exigence : rendu « masterclass », niveau outil de design, pas un rendu codé.
- 2026-11-09 : référence donnée par l'utilisateur : Dribbble « Accessories Website Home Page » (tubik, site Monce) — https://dribbble.com/shots/22156786-Accessories-Website-Home-Page
- 2026-11-09 : 2e référence de l'utilisateur : Dribbble « Fly high. » (Dennis Snellenberg) — https://dribbble.com/shots/7081312-Fly-high (titre derrière le sujet, passage au noir, grille 2×2 d'univers).
- 2026-11-09 : faire les 3 directions (A Grand soir, B Velours, C Pochette) dans Framer, on choisira. Palette stricte de l'amie : bleu nuit, gris argenté, ivoire. Pas d'or (logo décliné en argent).
- 2026-11-09 : basé à Dakar, Sénégal (tarifs en FCFA, site en français). Maquette d'abord, la technique (avis, devis, rendez-vous) se décide après. Nom : H&V Family | Heaven & Voice (@heavenandvoice), collectif de six voix.
- 2026-11-09 : démarrage. Brief reçu (contact, avis, tarifs par prestation, devis, réservation d'entretien, à propos, méthode, équipe, vitrine). Premier site, à améliorer ensuite.

## Projet Framer
H&V Family — Directions : https://framer.com/projects/aSset935ae42KmTejQqx
- `/` A · Grand soir (Big Shoulders + Instrument Serif) — Monce + équipe façon Inherited
- `/velours` B · Velours (Cormorant Garamond + JetBrains Mono) — Utopia Orchestra + passage au noir et grille 2×2 de Fly high
- `/pochette` C · Pochette (Bricolage Grotesque + Instrument Serif) — Voxenora (pochette devant le nom, vinyle)
Version ordinateur seulement. Médias placés le 2026-11-09 (domaine mcp.framer.com autorisé par l'utilisateur) : vidéo Gloria en accueil A, en cadre B, en vignette C ; extraits de session dans A (fiche voix), B (cadre) ; photos ensemble/trio/six. Contenus manquants marqués « à fournir ».

## Accueil en code (2026-11-09, après rejet des pages Framer)
Retour utilisateur : « j'aime aucun », références pas utilisées, « comme sur Framer » = niveau de finition, pas l'appli. On repart en code, section par section.
Démo : https://claude.ai/artifact/PY2ZcMBnNa9d5ArmtiagL8 — 4 accueils, bouton « Voir la référence » sur chacun.
- V1 Monce (Anton + Archivo) · V2 Fly high (Plus Jakarta Sans) · V3 Inherited (Archivo large) · V4 Mélange Fly high → Monce.
- Vidéo Gloria lue de 5 s à 36 s en fond pour éviter les cartons titres (fichier intact).

## Site complet v1 (2026-11-09)
https://claude.ai/artifact/U9w3T45jXRow8NBLSjrxDw — une page, ordinateur + téléphone.
| Section | Source | État |
|---|---|---|
| Accueil + « Six ◯ voix » | Monce (Dribbble tubik) | v1, à valider |
| À propos (texte qui s'allume, petits cadres) | Utopia Orchestra (Awwwards) | v1, à valider |
| Équipe (scènes épinglées, noms brouillés, blocs bleus) | Inherited (Awwwards) | v1, photos/vidéos/noms à fournir |
| Prestations & tarifs (liste géante + photo) | Monce (liste EARRINGS…) | v1, tarifs à fournir |
| Comment on travaille (4 cartes) | Monce (cartes portraits) | v1 |
| Vitrine (plan → noir → grille 2×2, lecteur) + moments forts + compositions | Fly high (Dribbble) | v1, titres à fournir |
| Avis (formulaire, aucun faux avis) | — | v1 |
| Réserver (entretien : format/jour/heure ; devis) | — | v1, à brancher (Cal.com / e-mail) |
| Contact | Monce (wordmark) | v1, coordonnées à fournir |

## Site multi-pages (2026-11-09) — version en cours
https://claude.ai/artifact/Wj6ZeCH9BiyV3sEYL5VGgi — fichier `hv/index.html`, médias `hv/m/`.
Le site d'une page a été refusé : l'utilisateur veut un vrai site avec plusieurs pages, chaque page ayant sa référence. Cahier des charges reçu (8 pages, genres, évolutions futures, pas de prix affichés, demande ≠ réservation confirmée).

| Page | Référence | État |
|---|---|---|
| Accueil | 3 versions au choix (bouton A/B/C en bas à droite) : A Morrow (morrow-agency-template.vercel.app), B ZEN (zen-…-agency-template-v2.21st.app), C Monce (Dribbble tubik) | l'utilisateur choisit |
| À propos | Utopia Orchestra (Awwwards) | v1, à modifier ensemble |
| Nos artistes | Inherited (Awwwards) + vidéo exemple_partie_equipe.mp4 : un écran par membre, 3 mises en page qui alternent, blocs ivoire, noms en or qui se brouillent | v1, noms fictifs, photos à fournir |
| Univers musical | Voxenora (Framer) | v1 |
| Galerie & médias | Fly high (Dribbble) | v1 |
| Prestations & événements | Storm Prod (Awwwards) | v1, pas de tarifs |
| Réservations & devis | Diamo (Awwwards) | v1, formulaire 5 étapes, rien n'est envoyé |
| Contact | Hallo Basis (Awwwards) | v1, coordonnées à fournir |

Noms fictifs (à remplacer) : Awa Ndiaye, Moussa Diop, Fatou Sarr, Ibrahima Faye, Mariama Sow, Daniel Mendy.

### Brief photo des membres (mis à jour)
Fond uni **ivoire / blanc cassé** (drap ou mur peint, papier de fond), lumière douce de face ou de côté, tenues sombres ou ivoire unies. Par membre : portrait buste, très gros plan (regard), profil serré, et si possible une vidéo de 5 à 10 s (regard caméra, léger mouvement). Un téléphone récent + une fenêtre suffisent si le fond est le même pour les six.

## Décisions (suite)
- 2026-11-09 : palette passée à **fond noir, ivoire pour les fonds de photo, textes or** (le cahier des charges cite l'or ; budget photo limité).
- 2026-11-09 : site multi-pages (routeur par #page), une référence par page, cadres « à fournir » quand il manque des images.
- 2026-11-09 : correctif — le rideau de transition restait fermé (décalage CSS lu par GSAP), corrigé.

## Site v2 — React + shadcn (2026-11-09)
https://claude.ai/artifact/7a9B2MmFLgFRy1xRK1wywy — projet `hv-app/` (Vite, React, TS, Tailwind, structure shadcn `src/components/ui`), build en un seul fichier (`./build.sh` puis `python3 publish.py`).
Retour utilisateur : l'esthétique v1 faisait « trop IA, trop pastel ». Demandes : shadcn + 21st.dev, dégradés profonds, matière (métal, reflets), typo à caractère, meilleure animation des noms, univers musical refait.
- Palette : **bleu nuit + or liquide**, choisie par l'utilisateur. La braise que j'avais ajoutée est retirée. Ensuite, demande d'**atténuer l'or** : passage au champagne (#C9B48C), plus aucun dégradé or sur le texte.
- Matière : bouton en or liquide (shader Paper LiquidMetal en anneau + métal brossé en CSS) ; fonds en Mesh Gradient (Paper Shaders, vus sur 21st.dev).
- Composants 21st fournis par l'utilisateur : Expanding Cards (accueil), Coverflow Carousel (À propos).
- Accueil : hero Morrow + section « Six ◯ voix » Monce + bandeau des genres + cartes extensibles.
- Univers : 6 pochettes, vinyle qui sort et tourne, fond qui change de couleur par genre, liste de titres jouables.
- Nouvelle page **L'équipe** (référence jesperlandberg.com) : couloir 3D (three.js), une carte par membre, un clic ouvre un panneau avec le texte fixe à gauche et les médias qui défilent à droite.
- Polices : Syne + Bodoni (refusées : « trop robuste », « l'or sur la police, non »), puis Cormorant + Manrope (refusées). **Choix de l'utilisateur : Getai Grotesk** (Sylvester Tan, licence OFL, un seul style d'affichage). En attente du fichier, que je ne peux pas télécharger depuis ici.

- 2026-11-09 : **Getai Grotesk intégrée** (fichier fourni par l'utilisateur, un seul style Black). La police n'a pas d'accents : j'ai ajouté les lettres accentuées françaises (é è ê à â ç ô ù É È À Ç ·) par glyphes composites, et renommé la version modifiée « HV Getai » (OFL). Le crédit est dans le pied de page. Elle sert aux titres et aux noms ; Manrope pour le texte et les étiquettes ; les accents sont en champagne, sans italique.
- 2026-11-09 : page L'équipe refaite d'après la vidéo exemple_onglet_equipe.mp4 (Landberg) : ruban de cartes courbées (shader), molette ou glisser, cartes qui se tordent avec la vitesse et se bombent au survol, cartes vidéo et carte phrase ; au clic, la carte s'agrandit en panneau ivoire. Pas de pied de page sur cette page.

- 2026-11-09 : **menu** refait d'après la vidéo nav_bar_exemple (menu de trevornoah.com), version musique. Ouverture plein écran depuis le bouton rond ; photo en autocollant à coin décollé et bulle « On chante quoi ? » ; pastille ivoire qui glisse sous le lien survolé, objet de musique qui surgit au bout ; une note de chœur au survol (Web Audio, volume bas, interrupteur dans le menu, coupée si l'utilisateur réduit les animations).
- 2026-11-09 : **Prestations** : l'image qui suivait la souris est retirée (« un peu chiante »). À la place, un autocollant photo qui surgit en tournant, et le titre qui roule vers sa version champagne (référence trevornoah.com/about).
- 2026-11-09 : nouvelle demande de police : **Subjectivity** (famille de 16 styles, sœur d'Objectivity, gratuite sur Behance). En attente du zip.

- 2026-11-09 : **police finale choisie par l'utilisateur : Work Sans** (zip fourni ; licence OFL, Wei Huang). Polices variables, normale et italique, réduites au latin et intégrées au fichier. Titres en graisse légère (200–300) avec l'italique champagne pour les mots en avant ; étiquettes en 500 capitales ; texte en 400. Getai et Manrope sont retirées. Subjectivity est abandonnée.
- 2026-11-09 : bulle « On chante quoi ? » retirée, à la demande de l'utilisateur (barre du haut et menu).

- 2026-11-09 : animation des noms (Nos artistes) refaite en **rouleaux de lettres**, façon tableau d'affichage (d'après Random Letter Swap, 21st.dev), avec un trait champagne dessous ; le nom rejoue au survol. Équipe : le ruban suit maintenant le sens du glisser, avec de l'élan.
- 2026-11-09 : **une animation de texte différente par endroit**, toutes reprises de 21st.dev : Stroke Draw (HEAVEN), Fluid Text Morph (mille formats → en duo → en trio → à six → et plus), Word Pull Up (Entrez par la bonne porte), Vertical Cut Reveal (Un collectif, une famille), Layered Text (L'équipe), Motion Blur Text (genres), Text Shimmer Wave (tout de suite), Text Rotate (Pour quel mariage / gala / concert…), Text Highlight (votre événement), Gradual Spacing (lignes de contact).
- 2026-11-09 : **police finale : Instrument Serif** (titres et noms, avec l'italique pour les accents ; choix B sur la planche de 6 polices), et Work Sans pour le texte et les étiquettes. Fichiers OFL intégrés au site.

- 2026-11-09 : **mis en ligne**. Dépôt privé GitHub hideinbushido/heaven-and-voice (branche `main`), projet Vercel heaven-and-voice relié au dépôt (chaque push sur main redéploie). Lien public : https://heaven-and-voice.vercel.app . La version en ligne n'a pas le bouton « Référence » ni les captures des sites de référence (VITE_SHOW_REFS non défini) ; la maquette en artefact les garde.

## Prochaine étape
Retours du groupe ; vraies photos, noms, textes et coordonnées des membres.
