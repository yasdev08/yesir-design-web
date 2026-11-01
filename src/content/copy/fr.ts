import type { ContentCopy } from "./types";

const fr: ContentCopy = {
  categories: {
    web: {
      name: "Développement digital",
      tagline: "Sites, boutiques et applications",
      description:
        "Des sites et des applications rapides, bilingues et pensés pour convertir : la base de votre présence et de vos ventes en ligne.",
      items: [
        "Sites web d'entreprise",
        "Sites e-commerce",
        "Landing pages",
        "Applications web",
        "Design UI/UX",
        "Refonte de site",
        "Maintenance de site",
      ],
    },
    signage: {
      name: "Communication visuelle & signalétique",
      tagline: "Enseignes, façades et print",
      description:
        "Votre façade est votre première publicité. Enseignes lumineuses, lettres 3D, habillage de vitrine et supports imprimés conçus avec la même exigence que votre site.",
      items: [
        "Signalétique professionnelle",
        "Habillage de devanture",
        "Enseignes lumineuses",
        "Lettres 3D",
        "Design de façade",
        "Supports promotionnels",
        "Cartes et stickers QR",
        "Design print et publicitaire",
      ],
    },
    marketing: {
      name: "Marketing digital",
      tagline: "Publicité, Google et réseaux sociaux",
      description:
        "Être trouvé au bon moment par les bonnes personnes : campagnes Meta et Google, référencement local et stratégie social media.",
      items: [
        "Meta Ads (Facebook & Instagram)",
        "Google Ads",
        "Optimisation Google Business Profile",
        "SEO local",
        "Stratégie social media",
        "Création de campagnes publicitaires",
      ],
    },
    automation: {
      name: "Automatisation",
      tagline: "WhatsApp, leads et workflows",
      description:
        "Moins de tâches répétitives, aucune demande oubliée : nous automatisons la réception, le suivi et la relance de vos clients.",
      items: [
        "Automatisation WhatsApp Business",
        "Systèmes de gestion des leads",
        "Automatisation des workflows",
        "Intégrations n8n",
        "Workflows assistés par l'IA",
        "Expérience client digitale",
      ],
    },
    products: {
      name: "Produits digitaux",
      tagline: "Menus, catalogues et outils",
      description:
        "Des produits digitaux prêts à l'emploi ou sur mesure : menus QR, écrans TV, catalogues interactifs, cartes de visite digitales et outils métier.",
      items: [
        "Menus digitaux QR",
        "Systèmes de menus TV",
        "Catalogues interactifs",
        "Cartes de visite digitales",
        "Commande en ligne",
        "Outils métier sur mesure",
      ],
    },
  },

  services: {
    "creation-site-web": {
      name: "Création de site web",
      short: "Sites vitrines, landing pages et refontes, rapides et bilingues, conçus pour générer des demandes.",
      seoTitle: "Création de site web en Algérie — Mascara, Oran, Alger",
      metaDescription:
        "Création de sites web professionnels en Algérie : sites vitrines, landing pages, refonte et maintenance. Bilingues français/arabe, rapides, optimisés pour Google et pour WhatsApp.",
      headline: "Un site web qui travaille",
      headlineAccent: "pour votre entreprise.",
      lead: "Nous concevons des sites rapides, clairs et bilingues, qui présentent votre activité avec sérieux et transforment les visiteurs en demandes concrètes.",
      problems: [
        { title: "Une image en ligne qui ne reflète pas votre sérieux", text: "Un site daté ou une simple page Facebook ne rassurent pas les clients qui comparent avant de vous contacter." },
        { title: "Des visiteurs qui repartent sans vous contacter", text: "Sans message clair ni bouton d'action visible, l'intérêt se perd. Nous structurons chaque page autour d'une prise de contact simple." },
        { title: "Invisible sur Google", text: "Un site lent ou mal structuré n'apparaît pas dans les recherches locales. Nous construisons sur des bases techniques solides dès le départ." },
      ],
      deliverables: [
        "Arborescence et contenus structurés",
        "Design sur mesure, adapté au mobile",
        "Version française et arabe (et anglaise si besoin)",
        "Boutons WhatsApp, appel et formulaires reliés",
        "Référencement technique de base (balises, sitemap, données structurées)",
        "Mise en ligne, nom de domaine et formation à la prise en main",
      ],
      process: [
        { title: "Cadrage", text: "Objectifs, cibles, pages nécessaires et contenus disponibles." },
        { title: "Maquettes", text: "Design des pages clés sur mobile et ordinateur, validé avec vous." },
        { title: "Développement", text: "Intégration, contenus, traductions, formulaires et tests." },
        { title: "Lancement", text: "Mise en ligne, vérifications, formation et suivi." },
      ],
      clients: ["PME et entreprises de services", "Commerces et showrooms", "Professions libérales", "Cliniques et cabinets", "Entreprises qui refondent un site existant"],
      includes: ["Sites web d'entreprise", "Landing pages", "Refonte de site", "Maintenance de site", "Design UI/UX"],
    },
    "site-e-commerce": {
      name: "Site e-commerce",
      short: "Boutiques en ligne adaptées à l'Algérie : paiement à la livraison, livraison par wilaya, commandes WhatsApp.",
      seoTitle: "Création de site e-commerce en Algérie",
      metaDescription:
        "Création de boutiques en ligne en Algérie : paiement à la livraison, tarifs par wilaya, confirmation WhatsApp, gestion des commandes et du catalogue. Par YESIR DESIGN.",
      headline: "Vendre en ligne,",
      headlineAccent: "à l'algérienne.",
      lead: "Une boutique pensée pour la façon dont on achète réellement en Algérie : sur mobile, avec paiement à la livraison et confirmation par téléphone ou WhatsApp.",
      problems: [
        { title: "Des commandes perdues dans les messages", text: "Gérer les ventes en commentaires et en messages privés fait perdre du temps et des clients. Une boutique centralise tout." },
        { title: "Des retours et des commandes non confirmées", text: "Un parcours clair, des frais de livraison affichés et une confirmation systématique réduisent les mauvaises surprises." },
        { title: "Un catalogue difficile à tenir à jour", text: "Stocks, prix, variantes : un back-office simple vous laisse la main sans dépendre d'un développeur." },
      ],
      deliverables: [
        "Boutique responsive avec catalogue et variantes",
        "Paiement à la livraison et frais par wilaya",
        "Confirmation de commande par WhatsApp ou appel",
        "Tableau de bord des commandes et des stocks",
        "Pixel Meta et suivi des conversions",
        "Formation et documentation",
      ],
      process: [
        { title: "Analyse", text: "Catalogue, logistique, zones de livraison et processus de confirmation." },
        { title: "Conception", text: "Parcours d'achat et fiches produits pensés pour le mobile." },
        { title: "Développement", text: "Boutique, back-office, intégrations et tests de commande." },
        { title: "Lancement", text: "Mise en ligne, import du catalogue, formation et suivi." },
      ],
      clients: ["Marques et boutiques de prêt-à-porter", "Cosmétique et parapharmacie", "Électronique et accessoires", "Artisans et producteurs", "Vendeurs Instagram qui veulent se structurer"],
      includes: ["Sites e-commerce", "Commande en ligne", "Landing pages produit", "Maintenance de site"],
    },
    "applications-web": {
      name: "Applications web & UI/UX",
      short: "Outils métier, plateformes et interfaces sur mesure, de la conception UX au développement.",
      seoTitle: "Développement d'applications web sur mesure en Algérie",
      metaDescription:
        "Applications web sur mesure, outils de gestion, plateformes et design UI/UX par YESIR DESIGN, agence digitale en Algérie.",
      headline: "Des outils sur mesure",
      headlineAccent: "pour vos opérations.",
      lead: "Quand un tableur ou un logiciel générique ne suffit plus, nous concevons des applications web adaptées à vos processus : gestion, réservation, catalogue, espace client.",
      problems: [
        { title: "Des processus gérés sur papier ou sur Excel", text: "Erreurs, doublons, informations introuvables : un outil dédié fiabilise votre quotidien." },
        { title: "Des logiciels inadaptés à votre métier", text: "Les solutions génériques imposent leur logique. Une application sur mesure suit la vôtre." },
        { title: "Une interface que personne n'a envie d'utiliser", text: "Nous concevons des interfaces claires, testées avec les futurs utilisateurs avant le développement." },
      ],
      deliverables: [
        "Atelier de cadrage et spécifications fonctionnelles",
        "Parcours utilisateurs et maquettes UI/UX",
        "Prototype interactif",
        "Application web développée et testée",
        "Gestion des rôles et des accès",
        "Hébergement, documentation et maintenance",
      ],
      process: [
        { title: "Découverte", text: "Compréhension des processus, des utilisateurs et des priorités." },
        { title: "UX & prototype", text: "Parcours, maquettes et prototype validés avant tout développement." },
        { title: "Développement itératif", text: "Livraisons par étapes avec démonstrations régulières." },
        { title: "Déploiement", text: "Mise en production, formation des équipes et maintenance." },
      ],
      clients: ["PME avec des processus internes à digitaliser", "Commerces multi-points de vente", "Entreprises de services et de distribution", "Porteurs de projets numériques"],
      includes: ["Applications web", "Design UI/UX", "Outils métier sur mesure", "Maintenance"],
    },
    "enseignes-lumineuses": {
      name: "Enseignes & signalétique",
      short: "Enseignes lumineuses, lettres 3D et façades conçues comme une extension de votre identité.",
      seoTitle: "Enseigne lumineuse et lettres 3D en Algérie",
      metaDescription:
        "Conception d'enseignes lumineuses, lettres 3D, habillage de façade et signalétique professionnelle en Algérie. Visualisation avant fabrication par YESIR DESIGN.",
      headline: "Votre façade est",
      headlineAccent: "votre première publicité.",
      lead: "Enseignes lumineuses, lettres boîtier, habillage de devanture et signalétique intérieure : nous concevons une présence physique qui se voit de loin et reste cohérente avec votre image digitale.",
      problems: [
        { title: "Une devanture qui passe inaperçue", text: "Une enseigne peu lisible ou vieillissante fait perdre des clients chaque jour, sans que vous le sachiez." },
        { title: "Un rendu final différent de ce qui était prévu", text: "Nous préparons une visualisation précise du projet pour valider dimensions, couleurs et éclairage avant la fabrication." },
        { title: "Une image incohérente entre la rue et les réseaux", text: "Logo, couleurs et typographies sont repris fidèlement, de la façade jusqu'aux réseaux sociaux." },
      ],
      deliverables: [
        "Relevé et étude de la façade",
        "Design de l'enseigne et de la devanture",
        "Visualisation 3D / photomontage avant fabrication",
        "Choix des matériaux et de l'éclairage LED",
        "Suivi de fabrication et coordination de la pose",
        "Signalétique intérieure et directionnelle",
      ],
      process: [
        { title: "Étude", text: "Dimensions, contraintes, visibilité et identité existante." },
        { title: "Design & visualisation", text: "Propositions graphiques et rendu réaliste sur votre façade." },
        { title: "Fabrication", text: "Production selon le devis validé : matériaux, LED, finitions." },
        { title: "Installation", text: "Pose et contrôle final, selon la localisation du projet." },
      ],
      clients: ["Commerces et boutiques", "Restaurants, cafés et pâtisseries", "Pharmacies et cliniques", "Showrooms et agences", "Centres de formation"],
      includes: ["Signalétique professionnelle", "Enseignes lumineuses", "Lettres 3D", "Design de façade", "Habillage de devanture"],
    },
    "print-supports": {
      name: "Print & supports publicitaires",
      short: "Cartes, flyers, kakemonos, stickers QR et PLV, avec une direction artistique cohérente.",
      seoTitle: "Design print et supports publicitaires en Algérie",
      metaDescription:
        "Design de supports imprimés et publicitaires : cartes de visite, flyers, kakemonos, stickers et cartes QR, PLV. Agence YESIR DESIGN, Algérie.",
      headline: "Des supports imprimés",
      headlineAccent: "qui servent vos ventes.",
      lead: "Chaque support imprimé doit avoir un rôle : informer, rassurer ou faire agir. Nous concevons des supports cohérents avec votre identité et reliés à vos canaux digitaux.",
      problems: [
        { title: "Des supports conçus au coup par coup", text: "Formats, couleurs et messages différents d'un support à l'autre affaiblissent votre image." },
        { title: "Un print déconnecté du digital", text: "Un QR code bien placé transforme un flyer ou un sticker en point d'entrée vers votre site, votre menu ou votre WhatsApp." },
        { title: "Des fichiers non conformes à l'impression", text: "Nous livrons des fichiers prêts à imprimer : fonds perdus, profils colorimétriques, résolution." },
      ],
      deliverables: [
        "Cartes de visite et papeterie",
        "Flyers, dépliants et affiches",
        "Kakemonos, roll-ups et PLV",
        "Cartes et stickers QR",
        "Visuels publicitaires print et digitaux",
        "Fichiers prêts à imprimer et suivi d'impression",
      ],
      process: [
        { title: "Brief", text: "Objectif du support, cible, format et contexte de diffusion." },
        { title: "Création", text: "Propositions graphiques et ajustements." },
        { title: "Finalisation", text: "Préparation technique des fichiers pour l'impression." },
        { title: "Production", text: "Impression et livraison selon le devis." },
      ],
      clients: ["Commerces et restaurants", "Entreprises lors d'un salon ou d'un lancement", "Entreprises en changement d'identité", "Événements et promotions"],
      includes: ["Supports promotionnels", "Design print et publicitaire", "Cartes et stickers QR"],
    },
    "publicite-meta-google": {
      name: "Publicité Meta & Google",
      short: "Campagnes Facebook, Instagram et Google Ads ciblées, créées et suivies avec méthode.",
      seoTitle: "Publicité Facebook, Instagram et Google Ads en Algérie",
      metaDescription:
        "Création et gestion de campagnes Meta Ads (Facebook, Instagram) et Google Ads en Algérie. Ciblage local, visuels, suivi des conversions et stratégie social media.",
      headline: "De la visibilité",
      headlineAccent: "qui devient des clients.",
      lead: "Nous créons et pilotons vos campagnes Facebook, Instagram et Google : un ciblage précis, des visuels conçus pour arrêter le défilement et un suivi honnête de ce qui fonctionne.",
      problems: [
        { title: "Un budget dépensé sans savoir ce qu'il rapporte", text: "Booster des publications au hasard coûte cher. Nous mettons en place le suivi des messages, appels et commandes générés." },
        { title: "Des visuels qui ne se démarquent pas", text: "Chaque campagne repose sur un message clair et des créations pensées pour le format et l'audience." },
        { title: "Des demandes qui ne sont pas traitées", text: "Nous relions les campagnes à WhatsApp ou à un formulaire pour qu'aucun contact ne se perde." },
      ],
      deliverables: [
        "Stratégie de campagne et ciblage",
        "Création des visuels et des textes publicitaires",
        "Configuration du Pixel Meta et du suivi des conversions",
        "Campagnes Meta Ads et Google Ads",
        "Optimisation continue",
        "Rapport clair et recommandations",
      ],
      process: [
        { title: "Audit", text: "Offre, audience, historique publicitaire et outils de suivi." },
        { title: "Stratégie", text: "Objectifs, budget, ciblage et plan de création." },
        { title: "Lancement", text: "Création des campagnes, des visuels et du suivi." },
        { title: "Optimisation", text: "Analyse des résultats, ajustements et rapports." },
      ],
      clients: ["Commerces et e-commerces", "Restaurants et lieux de loisirs", "Écoles et centres de formation", "Promoteurs immobiliers", "Entreprises de services locaux"],
      includes: ["Meta Ads (Facebook & Instagram)", "Google Ads", "Création de campagnes publicitaires", "Stratégie social media"],
    },
    "seo-local": {
      name: "SEO local & Google Business",
      short: "Apparaître sur Google Maps et dans les recherches locales quand vos clients vous cherchent.",
      seoTitle: "SEO local et Google Business Profile en Algérie",
      metaDescription:
        "Référencement local et optimisation de fiche Google Business Profile en Algérie : apparaître sur Google Maps et dans les recherches de votre ville.",
      headline: "Être trouvé",
      headlineAccent: "là où l'on vous cherche.",
      lead: "« Pharmacie près de moi », « restaurant à Oran », « imprimerie Mascara » : nous optimisons votre fiche Google et votre site pour que vous apparaissiez dans ces recherches.",
      problems: [
        { title: "Une fiche Google incomplète ou inexistante", text: "Horaires faux, photos absentes, catégorie mal choisie : autant de raisons pour un client de choisir un concurrent." },
        { title: "Un site absent des résultats locaux", text: "Structure, contenus et données locales doivent être travaillés pour que Google associe votre entreprise à votre ville." },
        { title: "Des avis sans réponse", text: "Nous mettons en place une routine simple pour solliciter et répondre aux avis de vos vrais clients." },
      ],
      deliverables: [
        "Audit de la présence locale",
        "Création ou optimisation de la fiche Google Business Profile",
        "Catégories, services, horaires et photos",
        "Optimisation SEO locale du site",
        "Données structurées LocalBusiness",
        "Méthode de collecte et de réponse aux avis",
      ],
      process: [
        { title: "Audit", text: "Fiche Google, site, concurrents locaux et recherches cibles." },
        { title: "Optimisation", text: "Fiche, contenus, données structurées et cohérence des informations." },
        { title: "Contenus", text: "Pages et publications adaptées aux recherches locales." },
        { title: "Suivi", text: "Évolution de la visibilité et recommandations." },
      ],
      clients: ["Pharmacies et cabinets médicaux", "Restaurants et cafés", "Commerces de proximité", "Artisans et prestataires de services", "Agences et showrooms"],
      includes: ["Optimisation Google Business Profile", "SEO local"],
    },
    "automatisation-whatsapp": {
      name: "Automatisation WhatsApp & workflows",
      short: "Réponses, suivi des demandes et relances automatisés avec WhatsApp Business, n8n et l'IA.",
      seoTitle: "Automatisation WhatsApp et workflows pour entreprises en Algérie",
      metaDescription:
        "Automatisation WhatsApp Business, gestion des leads, workflows n8n et IA pour les entreprises en Algérie. Ne perdez plus aucune demande client.",
      headline: "Aucune demande",
      headlineAccent: "ne se perd plus.",
      lead: "Vos clients écrivent sur WhatsApp, Instagram et par formulaire. Nous centralisons ces demandes, automatisons les réponses répétitives et organisons le suivi de chaque contact.",
      problems: [
        { title: "Des messages qui restent sans réponse", text: "Les mêmes questions reviennent sans cesse et les demandes importantes se noient dans le flux." },
        { title: "Aucune vision sur vos prospects", text: "Qui a demandé un devis ? Qui faut-il relancer ? Un système de suivi des leads répond à ces questions." },
        { title: "Des tâches répétitives qui mobilisent votre équipe", text: "Saisies, copier-coller, notifications : nous automatisons ce qui peut l'être pour libérer du temps." },
      ],
      deliverables: [
        "Cartographie de vos flux de demandes",
        "Messages automatiques et catalogue WhatsApp Business",
        "Centralisation des leads (formulaires, WhatsApp, réseaux)",
        "Workflows n8n : notifications, relances, synchronisations",
        "Assistants IA encadrés pour les réponses fréquentes",
        "Documentation et formation de l'équipe",
      ],
      process: [
        { title: "Cartographie", text: "Canaux, volumes, tâches répétitives et points de perte." },
        { title: "Conception", text: "Scénarios d'automatisation et règles de traitement." },
        { title: "Mise en place", text: "Configuration, intégrations et tests sur des cas réels." },
        { title: "Accompagnement", text: "Formation, ajustements et évolution des workflows." },
      ],
      clients: ["Entreprises recevant beaucoup de messages", "E-commerces et vendeurs en ligne", "Cliniques, écoles et centres de formation", "Agences immobilières", "Équipes commerciales"],
      includes: ["Automatisation WhatsApp Business", "Systèmes de gestion des leads", "Automatisation des workflows", "Intégrations n8n", "Workflows assistés par l'IA", "Expérience client digitale"],
    },
    "menu-digital": {
      name: "Menu digital & écrans TV",
      short: "Menus QR et menus TV faciles à mettre à jour, en français et en arabe, pour restaurants et cafés.",
      seoTitle: "Menu digital QR et menu TV pour restaurant en Algérie",
      metaDescription:
        "Menu digital QR code et menus sur écrans TV pour restaurants, cafés et fast-foods en Algérie. Bilingue, mise à jour instantanée, commande en ligne en option.",
      headline: "Un menu qui se met à jour",
      headlineAccent: "en quelques secondes.",
      lead: "Menu QR sur table, menu sur écrans TV en salle, commande en ligne : vos prix et vos plats se mettent à jour instantanément, sans réimpression.",
      problems: [
        { title: "Des menus imprimés vite dépassés", text: "Chaque changement de prix ou de plat impose une réimpression. Un menu digital se modifie en un instant." },
        { title: "Des plats mal mis en valeur", text: "Photos, descriptions et mise en avant des suggestions aident vos clients à choisir — et à commander davantage." },
        { title: "Une clientèle bilingue", text: "Menus en français et en arabe, avec une mise en page arabe de droite à gauche soignée." },
      ],
      deliverables: [
        "Menu digital accessible par QR code",
        "Design aux couleurs de votre établissement",
        "Version française et arabe",
        "Affichage sur écrans TV en salle",
        "Espace de mise à jour des plats et des prix",
        "Supports QR imprimés (chevalets, stickers)",
      ],
      process: [
        { title: "Contenu", text: "Récupération de la carte, des prix et des photos." },
        { title: "Design", text: "Mise en page du menu et des écrans à votre image." },
        { title: "Mise en service", text: "Configuration, QR codes, écrans et supports imprimés." },
        { title: "Prise en main", text: "Formation à la mise à jour et accompagnement." },
      ],
      clients: ["Restaurants et fast-foods", "Cafés et salons de thé", "Pâtisseries et boulangeries", "Hôtels et lieux de réception"],
      includes: ["Menus digitaux QR", "Systèmes de menus TV", "Commande en ligne", "Cartes et stickers QR"],
    },
    "outils-digitaux": {
      name: "Catalogues & outils digitaux",
      short: "Catalogues interactifs, cartes de visite digitales et outils métier pour moderniser votre activité.",
      seoTitle: "Catalogue interactif, carte de visite digitale et outils métier",
      metaDescription:
        "Catalogues produits interactifs, cartes de visite digitales NFC/QR et outils métier sur mesure pour les entreprises algériennes. Par YESIR DESIGN.",
      headline: "Des produits digitaux",
      headlineAccent: "simples et utiles.",
      lead: "Un catalogue partageable sur WhatsApp, une carte de visite digitale toujours à jour, un petit outil qui simplifie une tâche quotidienne : des produits concrets, rapidement opérationnels.",
      problems: [
        { title: "Des catalogues PDF lourds et vite obsolètes", text: "Un catalogue en ligne se partage d'un lien, se consulte sur mobile et se met à jour sans renvoyer de fichier." },
        { title: "Des cartes de visite perdues ou dépassées", text: "Une carte digitale (QR ou NFC) regroupe vos coordonnées, vos réseaux et votre WhatsApp en un seul geste." },
        { title: "Des tâches simples sans outil adapté", text: "Prise de commande, suivi de stock, formulaires internes : un outil ciblé fait gagner du temps chaque jour." },
      ],
      deliverables: [
        "Catalogue produits interactif",
        "Partage par lien et par WhatsApp",
        "Cartes de visite digitales (QR / NFC)",
        "Formulaires et parcours de commande",
        "Outils métier ciblés",
        "Mise à jour autonome des contenus",
      ],
      process: [
        { title: "Besoin", text: "Usage visé, contenus et personnes concernées." },
        { title: "Conception", text: "Maquette et parcours sur mobile." },
        { title: "Réalisation", text: "Développement, contenus et tests." },
        { title: "Diffusion", text: "Mise en ligne, QR codes et prise en main." },
      ],
      clients: ["Grossistes et distributeurs", "Showrooms et fabricants", "Commerciaux et indépendants", "Commerces avec un large catalogue"],
      includes: ["Catalogues interactifs", "Cartes de visite digitales", "Commande en ligne", "Outils métier sur mesure"],
    },
  },

  projects: {
    "mb-pub": {
      name: "MB Pub",
      kind: "Présence digitale & site web",
      summary: "Développement du site web et structuration de la présence digitale de MB Pub.",
      context:
        "MB Pub souhaitait disposer d'une présence en ligne professionnelle, capable de présenter clairement son activité et de faciliter la prise de contact.",
      approach:
        "Nous avons travaillé sur l'organisation des contenus, la conception d'un site adapté au mobile et la mise en avant des moyens de contact, en cohérence avec l'identité de l'entreprise.",
      scope: ["Structure et contenus du site", "Design responsive", "Développement et mise en ligne", "Mise en avant des canaux de contact"],
      coverAlt: "Illustration d'une interface de site web sur fond bleu nuit, en référence au projet MB Pub.",
    },
    "menus-digitaux-restaurants": {
      name: "Menus digitaux pour restaurants",
      kind: "Menu QR & affichage",
      summary: "Conception de menus digitaux accessibles par QR code pour des établissements de restauration.",
      context:
        "Les menus imprimés sont coûteux à renouveler à chaque changement de prix ou de carte. Les restaurateurs avaient besoin d'un menu consultable sur mobile et facile à mettre à jour.",
      approach:
        "Nous avons conçu des menus lisibles sur smartphone, organisés par catégories, aux couleurs de chaque établissement, accessibles par QR code depuis la table.",
      scope: ["Design du menu digital", "Organisation de la carte par catégories", "QR codes et supports de table", "Mise à jour des contenus"],
      coverAlt: "Illustration d'un menu digital sur smartphone avec un QR code et un écran de menu.",
    },
    "signcraft-3d": {
      name: "SignCraft 3D",
      kind: "Éditeur de signalétique 3D",
      summary: "Éditeur qui transforme un logo ou un texte vectoriel (SVG) en lettres 3D pour prévisualiser une enseigne.",
      context:
        "Valider une enseigne sur la base d'un simple dessin à plat laisse trop d'incertitudes : épaisseur, relief, éclairage. Nous avons voulu un outil pour visualiser le volume avant la fabrication.",
      approach:
        "SignCraft 3D importe des tracés SVG, les extrude en volume et permet d'ajuster profondeur, matériaux et éclairage. C'est un produit interne qui sert de base à nos visualisations de signalétique.",
      scope: ["Import de fichiers SVG", "Extrusion et rendu 3D", "Réglages de profondeur et de matériaux", "Interface d'édition"],
      coverAlt: "Illustration de lettres en volume dans un éditeur 3D, avec axes et grille de construction.",
    },
    storeiq: {
      name: "StoreIQ",
      kind: "Logiciel de stock & caisse",
      summary: "Logiciel de gestion de stock et de point de vente (POS) conçu pour les commerces.",
      context:
        "De nombreux commerces suivent encore leurs stocks et leurs ventes à la main. StoreIQ vise à leur offrir un outil simple pour encaisser, suivre les stocks et consulter leur activité.",
      approach:
        "Nous développons StoreIQ comme un produit interne : une interface de caisse rapide, une gestion des articles et des stocks, et des tableaux de bord lisibles.",
      scope: ["Caisse (POS)", "Gestion des articles et des stocks", "Tableaux de bord des ventes", "Interface pensée pour un usage quotidien"],
      coverAlt: "Illustration d'un tableau de bord de caisse et de stock avec graphiques et liste d'articles.",
    },
    "pharmacie-digitale": {
      name: "Pharmacie : transformation digitale",
      kind: "Concept",
      summary: "Concept de transformation digitale pour une officine : visibilité locale, information patient et signalétique.",
      context:
        "Une pharmacie de quartier dépend de sa visibilité locale et de la confiance de ses patients. Ce concept explore ce qu'une démarche digitale cohérente pourrait lui apporter.",
      approach:
        "Le concept relie une fiche Google optimisée, une page d'information (horaires, gardes, services), un canal WhatsApp pour les questions de disponibilité et une signalétique modernisée.",
      scope: ["Stratégie de visibilité locale", "Parcours patient sur WhatsApp", "Page d'information", "Principes de signalétique"],
      coverAlt: "Illustration conceptuelle d'une croix de pharmacie lumineuse reliée à des écrans d'information.",
    },
    "yesir-design": {
      name: "YESIR DESIGN",
      kind: "Identité, web & publicité",
      summary: "Notre propre identité : site web, supports et campagnes publicitaires de l'agence.",
      context:
        "Une agence se juge d'abord à sa propre image. Nous appliquons à YESIR DESIGN les mêmes exigences que pour nos clients.",
      approach:
        "Identité visuelle, site multilingue, visuels publicitaires et supports imprimés sont conçus comme un seul système, du pixel à la façade.",
      scope: ["Identité visuelle", "Site web multilingue", "Visuels publicitaires", "Supports imprimés"],
      coverAlt: "Illustration de la marque YESIR DESIGN déclinée sur un écran et un support publicitaire.",
    },
  },
};

export default fr;
