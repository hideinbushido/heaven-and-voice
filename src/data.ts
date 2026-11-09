export const PAGES = ["accueil", "a-propos", "artistes", "equipe", "univers", "galerie", "prestations", "reservation", "contact"] as const;
export type PageKey = (typeof PAGES)[number];
export const NAV: { k: PageKey; t: string }[] = [
  { k: "accueil", t: "Accueil" }, { k: "a-propos", t: "À propos" }, { k: "artistes", t: "Nos artistes" }, { k: "equipe", t: "L'équipe" },
  { k: "univers", t: "Univers musical" },
  { k: "galerie", t: "Galerie" }, { k: "prestations", t: "Prestations" }, { k: "contact", t: "Contact" },
];
export const TITLES: Record<PageKey, string> = {
  accueil: "Heaven & Voice", "a-propos": "À propos", artistes: "Nos artistes", equipe: "L'équipe", univers: "Univers musical",
  galerie: "Galerie & médias", prestations: "Prestations & événements", reservation: "Réservations & devis", contact: "Contact",
};

export type Ref = { t: string; u: string; img: string[]; take: string; change: string };
export const NAV_REF = { t: "Menu de trevornoah.com (ta vidéo nav_bar_exemple)", u: "https://www.trevornoah.com", img: ["m/noah-menu.jpg"] };
export const REFS: Record<PageKey, Ref> = {
  accueil: { t: "Morrow (hero) + Monce (section suivante) + Expanding Cards (21st.dev)", u: "https://morrow-agency-template.vercel.app", img: ["m/morrow.jpg", "m/monce-1.jpg"],
    take: "Morrow : vidéo plein cadre étalonnée d'une seule teinte, traînées de lumière, petit texte d'intro en haut à gauche, liste 01/, nom géant en bas à droite. Monce : « Six ◯ voix » avec la vidéo dans la pastille et le badge qui tourne. Les cartes extensibles viennent du composant 21st.dev que tu m'as envoyé.",
    change: "Teinte bleu nuit, lumière champagne discrète ; HEAVEN en capitales fines (Cormorant Garamond) ; la pastille et le badge en or liquide (shader Paper) ; fond en dégradé animé bleu nuit (Mesh Gradient Paper) ; cartes en Cormorant italique, sans arrondis." },
  "a-propos": { t: "Utopia Orchestra (Awwwards) + Coverflow Carousel (21st.dev)", u: "https://www.awwwards.com/sites/utopia-orchestra", img: ["m/utopia.jpg"],
    take: "Grand titre éditorial, texte qui s'allume au défilement, valeurs en liste numérotée. Le carrousel en perspective vient du composant 21st.dev que tu m'as envoyé.",
    change: "Titre en Cormorant Garamond, « famille » en italique ; carrousel sur nos photos, avec légende (lieu, formation) ; fond bleu nuit profond." },
  artistes: { t: "Inherited Band (Awwwards) + ta vidéo d'exemple", u: "https://www.awwwards.com/sites/inherited-band", img: ["m/equipe-ref.jpg", "m/inherited.jpg"],
    take: "Un membre par écran, très gros plan, blocs de couleur unie qui portent le portrait, nom en grande capitale, seconde ligne décalée, rôles en petit, trois mises en page qui alternent.",
    change: "Blocs ivoire (le fond du shooting) sur bleu nuit ; nom en capitales fines : lettres qui basculent en 3D depuis le flou, reflet qui traverse le mot, lettres qui roulent au survol ; noms fictifs." },
  equipe: { t: "Jesper Landberg (portfolio)", u: "https://jesperlandberg.com", img: ["m/landberg-1.jpg", "m/landberg-3.jpg", "m/landberg-2.jpg"],
    take: "Un ruban de grandes cartes courbées autour du regard, au-dessus d'une grille au sol ; la molette fait défiler le ruban, les cartes se tordent avec la vitesse et la carte survolée se bombe ; certaines cartes sont des vidéos ou une phrase. Un clic : la carte s'agrandit en panneau, texte à gauche, médias qui défilent à droite.",
    change: "Une carte par membre (nom en Instrument Serif, cadre portrait ivoire à remplir), deux cartes vidéo du collectif et une carte phrase « Plus qu'un collectif, une famille. » ; panneau ivoire avec l'histoire, les rôles, les univers, puis les médias (provisoires, à remplacer par ceux du membre)." },
  univers: { t: "Voxenora (pochette + vinyle) + idée maison", u: "https://www.framer.com/marketplace/templates/voxenora/", img: ["m/voxenora-1.jpg", "m/voxenora-2.jpg"],
    take: "La pochette devant le nom, le vinyle comme objet.",
    change: "Six pochettes, une par genre ; le vinyle sort de la pochette et tourne ; le fond change de couleurs selon le genre (Mesh Gradient Paper) ; liste de titres jouables avec les vrais extraits." },
  galerie: { t: "Fly high (Dribbble, Dennis Snellenberg)", u: "https://dribbble.com/shots/7081312-Fly-high", img: ["m/flyhigh.jpg"],
    take: "Le titre géant, puis le passage au noir et la grille de médias.",
    change: "Titre rempli par la vidéo de concert ; grille filtrable ; lecteur en plein écran (Dialog shadcn)." },
  prestations: { t: "Storm Prod (liste) + trevornoah.com/about (autocollants)", u: "https://www.trevornoah.com/about", img: ["m/noah-about.jpg", "m/storm.jpg"],
    take: "Storm : grande liste de services. Trevor Noah : photos en autocollants inclinés, coin décollé, qui surgissent ; texte qui roule au survol.",
    change: "Au survol d'une prestation, un autocollant photo surgit en tournant, et le titre roule vers sa version champagne ; échelle des formations ; pas de prix affiché." },
  reservation: { t: "Diamo (Awwwards)", u: "https://www.awwwards.com/inspiration/interactive-multistep-form-diamo", img: ["m/diamo.jpg"],
    take: "Deux colonnes : promesse à gauche, formulaire par étapes à droite.",
    change: "Cinq étapes du cahier des charges (événement, date et lieu, artistes, besoins, coordonnées) ; bouton d'envoi en or liquide ; rappel que la demande n'est pas une réservation confirmée." },
  contact: { t: "Hallo Basis (Awwwards)", u: "https://www.awwwards.com/inspiration/big-typography-contact-page-hallobasis-com", img: ["m/hallo.jpg"],
    take: "Lignes géantes ; au survol, la valeur défile.",
    change: "WhatsApp, e-mail, Instagram, Dakar ; clic = copier (notification sonner)." },
};

export const MEMBERS = [
  { f: "Awa", l: "Ndiaye", r: ["Soprano", "Voix lead"], L: "a" },
  { f: "Moussa", l: "Diop", r: ["Ténor", "Arrangements"], L: "b" },
  { f: "Fatou", l: "Sarr", r: ["Alto", "Harmonies"], L: "c" },
  { f: "Ibrahima", l: "Faye", r: ["Basse", "Direction vocale"], L: "a" },
  { f: "Mariama", l: "Sow", r: ["Mezzo-soprano", "Composition"], L: "b" },
  { f: "Daniel", l: "Mendy", r: ["Claviers", "Direction musicale"], L: "c" },
] as const;

export const GENRES = [
  { k: "gospel", t: "Gospel", s: "& chants spirituels", n: "01", colors: ["#02050D", "#0B1F4F", "#A88A55", "#FFF0C2"], label: "#C9B48C",
    d: "Le cœur du collectif. Chœurs à plusieurs voix, harmonies serrées, montées qui portent une salle entière.", when: ["Cultes et célébrations", "Mariages", "Concerts"] },
  { k: "soul", t: "Soul", s: "& R&B", n: "02", colors: ["#05030A", "#3A0718", "#7A1530", "#E8B65A"], label: "#B23A48",
    d: "Lead posée, chœurs en réponse, grooves lents. Pour les soirées où l'on écoute autant qu'on danse.", when: ["Galas", "Dîners", "Cocktails"] },
  { k: "pop", t: "Pop", s: "& variété internationale", n: "03", colors: ["#02050D", "#1F47A8", "#9AA6C2", "#F3EDE1"], label: "#C9D2E6",
    d: "Les titres que tout le monde connaît, réarrangés pour six voix.", when: ["Soirées privées", "Événements d'entreprise"] },
  { k: "acoustique", t: "Acoustique", s: "clavier, guitare, voix", n: "04", colors: ["#0A0603", "#3B2410", "#8A5A28", "#E8C890"], label: "#C79A5E",
    d: "Formation réduite, assise, au plus près du public. Le format de nos sessions filmées.", when: ["Cérémonies intimes", "Salons", "Studio"] },
  { k: "mbalax", t: "Mbalax", s: "& musiques africaines", n: "05", colors: ["#060201", "#5C1404", "#D2490F", "#F2B33D"], label: "#F2793D",
    d: "Sabar, percussions, danse. La couleur sénégalaise du collectif, celle de Gloria Dakar.", when: ["Mariages", "Concerts", "Festivals"] },
  { k: "zouk", t: "Zouk", s: "& musiques caribéennes", n: "06", colors: ["#010608", "#053A43", "#0E7C7B", "#F3D9A4"], label: "#3FB8AF",
    d: "Balancement lent, voix à deux, chœurs doux. Pour la fin de soirée.", when: ["Soirées", "Mariages"] },
] as const;

export const TRACKS = [
  { n: "01", t: "Session acoustique — extrait I", g: "Acoustique", src: "m/session.mp4", dur: "0:57" },
  { n: "02", t: "Session acoustique — extrait II", g: "Acoustique", src: "m/session-2.mp4", dur: "0:57" },
  { n: "03", t: "Session acoustique — extrait III", g: "Acoustique", src: "m/session-3.mp4", dur: "0:56" },
  { n: "04", t: "Gloria Dakar — live", g: "Gospel", src: "m/gloria.mp4", dur: "0:41" },
  { n: "05", t: "Titre de reprise — à fournir", g: "Reprise", src: "", dur: "—" },
  { n: "06", t: "Création originale — à fournir", g: "Original", src: "", dur: "—" },
];

export const PRESTA = [
  { t: "Mariages & cérémonies", d: "Entrée des mariés, cérémonie religieuse ou civile, cocktail, première danse.", img: "m/trio.jpg" },
  { t: "Événements privés", d: "Anniversaires, baptêmes, dîners, célébrations en famille.", img: "m/still-session.jpg" },
  { t: "Événements professionnels", d: "Lancements, séminaires, cérémonies d'entreprise et d'institution.", img: "m/six.jpg" },
  { t: "Galas & soirées", d: "Un programme qui suit la soirée : accueil, dîner, montée en puissance.", img: "m/still-groupe.jpg" },
  { t: "Concerts & spectacles", d: "Le collectif au complet, avec musiciens et invités, sur scène.", img: "m/ensemble.jpg" },
  { t: "Collaborations artistiques", d: "Chœurs pour un album, un clip, une création ou un autre artiste.", img: "m/still-chant.jpg" },
];

export const BIOS: Record<string, { since: string; story: string[]; genres: string[]; media: { img?: string; vid?: string; cap: string }[] }> = {
  Awa: { since: "à fournir", genres: ["Gospel", "Soul"], story: ["Voix lead du collectif. Elle porte les solos des grands moments : entrée des mariés, final de concert.", "Son parcours, ses débuts et ses influences : texte à fournir."],
    media: [{ img: "m/still-chant.jpg", cap: "Gloria Dakar · voix lead" }, { vid: "m/session.mp4", img: "m/poster-s1.jpg", cap: "Session acoustique · extrait" }, { img: "m/trio.jpg", cap: "En trio" }] },
  Moussa: { since: "à fournir", genres: ["Gospel", "Pop"], story: ["Ténor et arrangeur. Il réécrit les titres pour six voix et adapte chaque reprise à l'événement.", "Son parcours : texte à fournir."],
    media: [{ vid: "m/session-2.mp4", img: "m/poster-s2.jpg", cap: "Session acoustique · extrait II" }, { img: "m/six.jpg", cap: "Le collectif" }, { img: "m/still-session.jpg", cap: "En répétition" }] },
  Fatou: { since: "à fournir", genres: ["Soul & R&B", "Zouk"], story: ["Alto, gardienne des harmonies. C'est elle qui tient la ligne du milieu quand tout le monde monte.", "Son parcours : texte à fournir."],
    media: [{ img: "m/trio.jpg", cap: "Trio · tenues de scène" }, { vid: "m/session-3.mp4", img: "m/poster-s3.jpg", cap: "Session acoustique · extrait III" }, { img: "m/still-nuit.jpg", cap: "Avant le concert" }] },
  Ibrahima: { since: "à fournir", genres: ["Gospel", "Mbalax"], story: ["Basse et direction vocale. Il fait répéter le collectif et donne les départs sur scène.", "Son parcours : texte à fournir."],
    media: [{ img: "m/still-groupe.jpg", cap: "Gloria Dakar · Grand Théâtre National" }, { vid: "m/gloria.mp4", img: "m/still-danse.jpg", cap: "Gloria Dakar · live" }, { img: "m/ensemble.jpg", cap: "Grand ensemble" }] },
  Mariama: { since: "à fournir", genres: ["Soul", "Acoustique"], story: ["Mezzo-soprano et compositrice. Les créations originales du collectif partent souvent de ses maquettes.", "Son parcours : texte à fournir."],
    media: [{ vid: "m/session.mp4", img: "m/poster-s1.jpg", cap: "Session acoustique" }, { img: "m/six.jpg", cap: "Le collectif" }, { img: "m/still-chant.jpg", cap: "Sur scène" }] },
  Daniel: { since: "à fournir", genres: ["Acoustique", "Pop"], story: ["Claviers et direction musicale. Il relie les voix et les musiciens invités.", "Son parcours : texte à fournir."],
    media: [{ img: "m/still-session.jpg", cap: "Au clavier" }, { vid: "m/session-2.mp4", img: "m/poster-s2.jpg", cap: "Session acoustique" }, { img: "m/ensemble.jpg", cap: "Avec les musiciens" }] },
};
