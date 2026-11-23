export type Locale = "en" | "fr";
export type L = { en: string; fr: string };
export type Focus = { dev: number; ops: number };

export const site = {
  name: "Cyril de Lajudie",
  email: "cyril_de_lajudie@hotmail.fr",
  url: "https://cyrildelajudie.fr",
  cv: "/cv-fr.pdf",
  // Page images shown on /[lang]/cv. When the PDF changes, regenerate them:
  // pdftoppm -jpeg -jpegopt quality=85 -r 150 public/cv-fr.pdf public/cv/page
  cvPages: [{ src: "/cv/page-1.jpg", width: 1242, height: 1755 }],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cyrildelajudie" },
    { label: "GitHub", href: "https://github.com/Axoloot" },
  ],
};

export type Role = {
  company: L;
  role: L;
  start: string;
  end: string;
  when: L;
  focus: Focus | null;
  kind?: L;
  bullets?: { en: string[]; fr: string[] };
  tags?: string[];
  minor?: boolean;
  href?: string;
};

export const roles: Role[] = [
  {
    company: { en: "Freelance", fr: "Freelance" },
    role: { en: "DevOps & Full Stack Engineer", fr: "Ingénieur DevOps & Full Stack" },
    start: "2026-03", end: "2026-11",
    when: { en: "Mar–Nov 2026", fr: "Mars–nov. 2026" },
    focus: { dev: 35, ops: 65 },
    bullets: {
      en: [
        "Infiny’s LLMs ran on Azure and the rest of the platform on AWS, with no private link between them. I connected the two clouds with an IPsec tunnel written in Terraform and switched DNS over with no downtime.",
        "Audited the cloud resources and removed the unused ones from the Terraform code.",
        "Optimised the data schema: France Travail’s ROME job hierarchy, with each job tied to its sector.",
        "Wrote my own boilerplates (Node.js/TypeScript, Next.js, AWS CDK with projen) as the base for my client and personal projects.",
      ],
      fr: [
        "Les LLM d’Infiny tournaient sur Azure et le reste de la plateforme sur AWS, sans lien privé entre les deux. J’ai relié les deux clouds par un tunnel IPsec écrit en Terraform et basculé le DNS sans coupure.",
        "Audit des ressources cloud et suppression des ressources inutilisées dans le code Terraform.",
        "Optimisation du schéma de données : hiérarchie du référentiel métiers ROME de France Travail et rattachement de chaque métier à son secteur.",
        "Boilerplates maison (Node.js/TypeScript, Next.js, AWS CDK avec projen), base de mes projets clients et personnels.",
      ],
    },
    tags: ["Terraform", "Azure", "AWS", "IPsec", "DNS", "AWS CDK", "projen"],
  },
  {
    company: { en: "Bug bounty", fr: "Bug bounty" },
    role: { en: "Independent security researcher", fr: "Chercheur en sécurité indépendant" },
    start: "2026-03", end: "2026-11",
    when: { en: "Mar–Nov 2026", fr: "Mars–nov. 2026" },
    focus: null,
    kind: { en: "Security", fr: "Sécurité" },
    bullets: {
      en: [
        "Hunting web and API vulnerabilities on public and private YesWeHack programs: 3 valid reports so far, 1 of them high severity.",
        "My recon and fuzzing chain: subfinder, httpx, ffuf and nuclei, then manual testing in Caido and Burp Suite, with AI assistance.",
      ],
      fr: [
        "Recherche de vulnérabilités web et API sur des programmes publics et privés de YesWeHack : 3 rapports valides à ce jour, dont 1 de sévérité élevée.",
        "Chaîne de reconnaissance et de fuzzing : subfinder, httpx, ffuf et nuclei, puis tests manuels dans Caido et Burp Suite, assistés par IA.",
      ],
    },
    tags: ["Caido", "Burp Suite", "ffuf", "nuclei", "subfinder", "httpx"],
  },
  {
    company: { en: "Sézame", fr: "Sézame" },
    role: { en: "DevOps & Full Stack Engineer", fr: "Ingénieur DevOps & Full Stack" },
    start: "2025-04", end: "2026-01",
    when: { en: "Apr 2025–Jan 2026", fr: "Avr. 2025–janv. 2026" },
    focus: { dev: 55, ops: 45 },
    kind: { en: "Hotel services, Staycation-style, 15–20 people", fr: "Services hôteliers façon Staycation, 15 à 20 salariés" },
    bullets: {
      en: [
        "Time-slot search ran on Algolia. I moved it to Typesense, which cut its cost by ~75%, and automated product listings on Google Shopping (200+ offers).",
        "Built on a fully serverless, event-driven AWS architecture: Lambda, EventBridge and single-table DynamoDB (DynamoDB Toolbox), with services talking through Kinesis or SNS/SQS. Events are stored and queried in SQL with Athena.",
        "Rebuilt the search page (V2) in Next.js and Tailwind and shipped other front-end changes, on Hono APIs deployed with AWS CDK.",
        "Wired production errors to Slack alerts, opened fix PRs when needed, shipped an email service on Brevo and wrote unit tests in Jest.",
      ],
      fr: [
        "La recherche par créneaux tournait sur Algolia. Je l’ai migrée vers Typesense, ce qui a réduit son coût de ~75 %, et j’ai automatisé le référencement des produits sur Google Shopping (plus de 200 offres).",
        "Architecture entièrement serverless et événementielle sur AWS : Lambda, EventBridge et DynamoDB single-table (DynamoDB Toolbox), avec des services qui communiquent par Kinesis ou SNS/SQS. Événements stockés et consultés en SQL avec Athena.",
        "Refonte de la page de recherche (V2) en Next.js et Tailwind et autres évolutions de l’interface, sur des API Hono déployées en AWS CDK.",
        "Erreurs de production branchées sur des alertes Slack, PR correctives ouvertes au besoin, service d’emailing sur Brevo, tests unitaires en Jest.",
      ],
    },
    tags: ["Typesense", "Next.js", "Hono", "Lambda", "EventBridge", "DynamoDB", "AWS CDK", "Jest", "Kinesis", "Athena"],
  },
  {
    company: { en: "Sabbatical year", fr: "Année sabbatique" },
    role: { en: "Travel and diving", fr: "Voyages et plongée" },
    bullets: {
      en: ["I went through five years of study without a break. Once I had my degree, I took a year for myself: Croatia, Montenegro and Hungary, then three months in New Caledonia."],
      fr: ["J’ai enchaîné cinq ans d’études sans pause. Une fois mon diplôme obtenu, j’ai pris un an pour moi : Croatie, Monténégro et Hongrie, puis trois mois en Nouvelle-Calédonie."],
    },
    start: "2024-04", end: "2025-03",
    when: { en: "Apr 2024–Mar 2025", fr: "Avr. 2024–mars 2025" },
    focus: null,
    minor: true,
    href: "#diving",
  },
  {
    company: { en: "Pitchy", fr: "Pitchy" },
    role: { en: "DevOps Engineer", fr: "Ingénieur DevOps" },
    start: "2023-03", end: "2024-04",
    when: { en: "Mar 2023–Apr 2024", fr: "Mars 2023–avr. 2024" },
    focus: { dev: 15, ops: 85 },
    kind: { en: "B2B video SaaS (Accor, Orange, Danone), ~1,000 clients, €40M Series B, 150 people", fr: "SaaS vidéo B2B (Accor, Orange, Danone), ~1 000 clients, série B de 40 M€, 150 salariés" },
    bullets: {
      en: [
        "Pitchy rendered its videos on Windows Server. I moved rendering to headless macOS images built with Packer and AppleScript (~40% less generation time), and cut the AWS bill by 22% with right-sizing, autoscaling and on-demand services.",
        "I worked on performance, SRE, architecture and FinOps, in a DevOps team of three. Production ran on self-managed Kubernetes on EC2 with GitLab CI; the After Effects, Cavalry and Filmora render farm ran on an autoscaling EC2 fleet that we set up as a team of two.",
        "The motion designers rendered through an SVN “server”: a screenless laptop wired to several disks, and they lost about a day a week to slow renders. I found the cause, proposed the fix and moved them, on my own initiative, to Git LFS on our self-hosted GitLab, which also centralised the files.",
        "The production database went down. I traced it to a recursive query, then added an ORM for the developers, multi-AZ, multi-cluster and blue-green deploys.",
        "Wrote Python scripts with boto3 for cleanup and production tasks, and migrated Lambdas from Python 2.7 to Python 3.",
      ],
      fr: [
        "Pitchy rendait ses vidéos sur Windows Server. J’ai passé les rendus sur des images macOS headless construites avec Packer et AppleScript (~40 % de temps de génération en moins), et réduit la facture AWS de 22 % par le bon dimensionnement, l’autoscaling et les services à la demande.",
        "J’ai travaillé sur les performances, le SRE, l’architecture et le FinOps, dans une équipe DevOps de trois. Production sur Kubernetes autogéré sur EC2 avec GitLab CI ; la ferme de rendu After Effects, Cavalry et Filmora tournait sur une flotte d’EC2 en autoscaling, mise en place à deux.",
        "Les motion designers rendaient via un « serveur » SVN : un laptop sans écran relié à plusieurs disques, et perdaient au moins une journée par semaine. J’ai trouvé la cause, proposé la solution et migré seul vers Git LFS sur notre GitLab auto-hébergé, qui centralise aussi les fichiers.",
        "Panne de la base de production : j’ai trouvé la cause, une requête récursive, puis ajouté un ORM pour les développeurs, du multi-AZ, du multi-cluster et des déploiements blue-green.",
        "Scripts Python avec boto3 pour le nettoyage et la production ; migration des Lambdas de Python 2.7 vers Python 3.",
      ],
    },
    tags: ["AWS", "EC2", "Kubernetes", "GitLab CI", "Git LFS", "Terraform", "Packer", "Python", "Datadog", "FinOps"],
  },
  {
    company: { en: "RedPill", fr: "RedPill" },
    role: { en: "Full Stack & DevOps Developer", fr: "Développeur Full Stack & DevOps" },
    start: "2022-05", end: "2022-12",
    when: { en: "May–Dec 2022", fr: "Mai–déc. 2022" },
    focus: { dev: 50, ops: 50 },
    bullets: {
      en: [
        "A luxury house wanted to sell one-to-one over video. I built the live shopping platform and took it from prototype to production, infrastructure included.",
        "RedPill, the startup studio behind Quidol, ran the project. I designed the UX/UI and ran Docker microservices on GKE, CI/CD and SRE.",
      ],
      fr: [
        "Une maison de luxe voulait vendre en tête-à-tête par vidéo. J’ai construit la plateforme de live shopping et je l’ai menée du prototype à la production, infrastructure comprise.",
        "RedPill, startup studio éditeur de Quidol, portait le projet. J’ai conçu l’UX/UI et opéré les microservices Docker sur GKE, la CI/CD et le SRE.",
      ],
    },
    tags: ["React", "Node.js", "TypeScript", "GKE", "Docker", "Wowza"],
  },
  {
    company: { en: "RedPill Live", fr: "RedPill Live" },
    role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
    start: "2021-04", end: "2021-08",
    when: { en: "Apr–Aug 2021", fr: "Avr.–août 2021" },
    focus: { dev: 70, ops: 30 },
    kind: { en: "White-label live shopping; Carrefour lives averaged 4,500 viewers", fr: "Live shopping en marque blanche ; 4 500 spectateurs en moyenne par live Carrefour" },
    bullets: {
      en: [
        "Someone recorded every live replay by hand in OBS: 5 to 10 minutes per show on top of the show itself, and no replay at all if the computer failed. I automated recording through the Vonage and Wowza APIs, with the chat, polls and products.",
        "Built the self-service offer: customers subscribe to one of 3 plans to run their own live shopping, paid through Stripe with no card data stored on our side (GDPR).",
        "Cut live latency by tuning the HLS pipeline, and raised the Lighthouse score with webpack and a CDN.",
        "Deployed the main API and its microservices (quiz, users, chat, live, products, queues) on GKE with Helm charts, across dev, staging and production. Scrum team of developers, a DevOps, the CTO and a Product Owner.",
      ],
      fr: [
        "Quelqu’un enregistrait chaque replay de live à la main dans OBS : 5 à 10 minutes par émission en plus de l’émission, et pas de replay du tout si l’ordinateur avait un souci. J’ai automatisé l’enregistrement via les API Vonage et Wowza, avec le chat, les sondages et les produits.",
        "Offre self-service : inscription à l’un des 3 abonnements pour lancer son propre live shopping, paiement via Stripe sans stocker de données bancaires (RGPD).",
        "Latence des lives réduite en optimisant le flux HLS, score Lighthouse relevé avec webpack et un CDN.",
        "API principale et microservices (quiz, utilisateurs, chat, live, produits, files de messages) déployés sur GKE avec des charts Helm, sur 3 environnements. Équipe Scrum : développeurs, un DevOps, le CTO et une Product Owner.",
      ],
    },
    tags: ["React", "Node.js", "Vonage", "Wowza", "HLS", "Stripe", "GKE", "Helm"],
  },
  {
    company: { en: "Bel Group", fr: "Groupe Bel" },
    role: { en: "Full Stack Developer · Industrial & IoT", fr: "Développeur Full Stack · Industriel & IoT" },
    start: "2020-10", end: "2021-03",
    when: { en: "Oct 2020–Mar 2021", fr: "Oct. 2020–mars 2021" },
    focus: { dev: 90, ops: 10 },
    kind: { en: "Food group, 120 countries, 9 French factories", fr: "Groupe agroalimentaire, 120 pays, 9 usines en France" },
    bullets: {
      en: [
        "Bel wanted a paperless factory, where teams read one data source with no re-keying. With the DIP team, I developed on the framework that reads the PLCs: their data, errors and incidents went to SAP with alerts, replacing paper for the factory operators. The platform ran on Kubernetes with Traefik.",
        "Built a real-time dashboard on the SAP API for headquarters, in React and styled-components.",
        "Shipped the app as a PWA: offline mode, install, changelog and enforced versioning.",
      ],
      fr: [
        "Bel voulait une usine sans papier, où les équipes lisent une même source de données sans ressaisie. Avec l’équipe DIP, j’ai développé sur le framework qui lit les automates : leurs données, les erreurs et les incidents remontaient vers SAP avec des alertes, à la place du papier pour les opérateurs d’usine. La plateforme tournait sur Kubernetes avec Traefik.",
        "Dashboard temps réel sur l’API SAP pour le siège, en React et styled-components.",
        "Application livrée en PWA : mode hors ligne, installation, journal des versions et versioning imposé.",
      ],
    },
    tags: ["React", "styled-components", "PWA", "SAP API", "PLC", "IoT", "Kubernetes", "Traefik"],
  },
  {
    company: { en: "Quidol", fr: "Quidol" },
    role: { en: "Full Stack & Mobile Developer", fr: "Développeur Full Stack & Mobile" },
    start: "2019-07", end: "2019-12",
    when: { en: "Jul–Dec 2019", fr: "Juil.–déc. 2019" },
    focus: { dev: 80, ops: 20 },
    kind: { en: "Live quiz app; 450,000+ downloads and 20,000+ games a day in 2019", fr: "Quiz en direct ; 450 000+ téléchargements et 20 000+ parties par jour en 2019" },
    bullets: {
      en: [
        "Marketing asked developers for a promo card every day (homepage ads for events such as Christmas), 5 to 10 minutes of developer time each. I added a generator to the back office so marketing makes them alone, and wrote the production MongoDB scripts: data repair, fraud detection, statistics.",
        "Worked across the React Native app, the Node.js game server and the React back office, on GKE.",
        "Host-less blind tests: converted mp3 to multi-bitrate HLS with FFmpeg, so music plays within the question’s 10 seconds.",
        "Incident I caused: a badly scoped script, run against dev, reached production and wiped the Redis cluster, and a show was lost. My scripts now stay scoped to dev, with warnings and safeguards in production.",
      ],
      fr: [
        "Le marketing demandait chaque jour une carte promo aux développeurs (annonces d’événements comme Noël sur la page d’accueil), 5 à 10 minutes de développeur à chaque fois. J’ai ajouté un générateur au back-office pour que le marketing les crée seul, et j’ai écrit les scripts MongoDB de production : réparation de données, détection de fraude, statistiques.",
        "Développement sur l’app React Native, le serveur de jeu Node.js et le back-office React, sur GKE.",
        "Blind tests sans animateur : mp3 convertis en HLS multi-bitrate avec FFmpeg, la musique démarre dans les 10 secondes de la question.",
        "Incident de ma part : un script mal borné, lancé sur la dev, a touché la prod et supprimé le cluster Redis ; l’émission n’a pas pu avoir lieu. Depuis, mes scripts sont bornés à la dev, avec avertissement et protection en prod.",
      ],
    },
    tags: ["React Native", "Redux", "Node.js", "Go", "MongoDB", "Redis", "FFmpeg", "GKE"],
  },
  {
    company: { en: "GMODStore", fr: "GMODStore" },
    role: { en: "Freelance · Lua for Garry’s Mod", fr: "Freelance · Lua pour Garry’s Mod" },
    start: "2016-01", end: "2017-12",
    when: { en: "2016–2017", fr: "2016–2017" },
    focus: { dev: 100, ops: 0 },
    tags: ["Lua", "Game server hosting"],
    bullets: {
      en: [
        "My first paid code. Clients posted a job or offered me a mission on the platform, and I wrote it in Lua.",
        "Built the HUD for a Star Wars RP game mode.",
        "Built a custom Prison RP server: I hosted it and wrote its game add-ons.",
      ],
      fr: [
        "Mon premier code payé. Les clients publiaient une offre ou me proposaient une mission sur la plateforme, et je l’écrivais en Lua.",
        "HUD d’un mode de jeu Star Wars RP.",
        "Serveur Prison RP sur mesure : je l’ai hébergé et j’ai écrit ses addons de jeu.",
      ],
    },
    minor: true,
  },
];

function months(a: string, b: string) {
  const [ya, ma] = a.split("-").map(Number);
  const [yb, mb] = b.split("-").map(Number);
  return (yb - ya) * 12 + (mb - ma) + 1;
}

export function careerMix() {
  let dev = 0, ops = 0;
  for (const r of roles) {
    if (!r.focus || r.minor) continue;
    const m = months(r.start, r.end);
    dev += r.focus.dev * m;
    ops += r.focus.ops * m;
  }
  const d = Math.round((dev / (dev + ops)) * 100);
  return { dev: d, ops: 100 - d };
}

export function lean(f: Focus | null): "dev" | "ops" | "both" | null {
  if (!f) return null;
  if (f.dev >= 60) return "dev";
  if (f.ops >= 60) return "ops";
  return "both";
}

export const education = [
  {
    when: "2018–2023",
    title: "EPITECH",
    text: {
      en: "Master’s-level degree (RNCP 7), Information Technology Expert, after a Bachelor in IT (Programme Grande École).",
      fr: "Titre RNCP niveau 7 (Bac+5), expert en technologies de l’information, après un Bachelor (Programme Grande École).",
    },
  },
  {
    when: "2021–2022",
    title: "Université Laval, Québec",
    text: { en: "International exchange year within the Epitech curriculum.", fr: "Année d’échange international dans le cursus Epitech." },
  },
  {
    when: "2021",
    title: "Google · Explore ML",
    text: { en: "Intermediate machine learning certification.", fr: "Certification Machine Learning, niveau intermédiaire." },
  },
  {
    when: "2018–2021",
    title: "PoC Innovation · PoC Services",
    text: {
      en: "Head of Electronics, Treasurer, then Vice-President; set up the PoC Services junior enterprise (2021) after Epitech’s previous one was struck off.",
      fr: "Responsable électronique, Trésorier, puis Vice-Président ; création de la Junior-Entreprise PoC Services (2021) après la radiation de la précédente JE d’Epitech.",
    },
  },
];

export type Media =
  | { type: "image"; src: string; alt: L; width: number; height: number }
  | { type: "video"; src: string; poster?: string; alt: L };

export type Project = {
  slug: string;
  title: L;
  kind: L;
  when?: string;
  badge?: L;
  summary: L;
  bullets?: { en: string[]; fr: string[] };
  tags: string[];
  media: Media[];
  links: { label: L; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "printer-lab",
    title: { en: "3D-printer lab", fr: "Labo d’impression 3D" },
    kind: { en: "PoC Innovation, Epitech", fr: "PoC Innovation, Epitech" },
    when: "2018–2021",
    summary: {
      en: "Three networked 3D printers on OctoPrint for PoC Innovation, monitored with Prometheus and Grafana.",
      fr: "Trois imprimantes 3D en réseau sous OctoPrint pour PoC Innovation, supervisées avec Prometheus et Grafana.",
    },
    tags: ["OctoPrint", "Prometheus", "Grafana", "Jenkins"],
    media: [],
    links: [],
  },
  {
    slug: "fundy",
    title: { en: "Fundy", fr: "Fundy" },
    kind: { en: "Crowdfunding app, EPITECH EIP", fr: "App de crowdfunding, EIP EPITECH" },
    when: "2019–2022",
    badge: { en: "EPITECH Experience 2022 finalist", fr: "Finaliste EPITECH Expérience 2022" },
    summary: {
      en: "Fundy rounds up your card payments and gives the spare change to associations and project owners. Team project taken to the final of EPITECH Experience 2022.",
      fr: "Fundy arrondit vos paiements par carte et reverse la monnaie à des associations et porteurs de projets. Projet d’équipe arrivé en finale d’EPITECH Expérience 2022.",
    },
    bullets: {
      en: ["Express and Prisma API, React web app, Expo mobile app.", "The live demo runs on a mocked API: log in with the prefilled account."],
      fr: ["API Express et Prisma, app web React, app mobile Expo.", "La démo en ligne tourne sur une API simulée : connectez-vous avec le compte prérempli."],
    },
    tags: ["React", "Expo", "Express", "Prisma", "PostgreSQL", "Cypress"],
    media: [
      { type: "image", src: "/projects/fundy/associations.jpg", alt: { en: "Fundy associations page: categories and the associations you can support", fr: "Page associations de Fundy : catégories et associations à soutenir" }, width: 1903, height: 1022 },
      { type: "image", src: "/projects/fundy/home.jpg", alt: { en: "Fundy home page: round-up crowdfunding", fr: "Accueil de Fundy : le crowdfunding par l’arrondi" }, width: 1440, height: 900 },
    ],
    links: [
      { label: { en: "Live demo", fr: "Démo en ligne" }, href: "https://fundy.cyrildelajudie.fr/" },
      { label: { en: "Source on GitHub", fr: "Code sur GitHub" }, href: "https://github.com/Axoloot/FundyEIP" },
    ],
  },
  {
    slug: "wechoose",
    title: { en: "WeChoose", fr: "WeChoose" },
    kind: { en: "Personal mobile app", fr: "App mobile perso" },
    when: "2025–2026",
    summary: {
      en: "Interactive stories with generative narration: the reader makes the choices, an LLM writes what happens next.",
      fr: "Des histoires interactives à narration générative : le lecteur fait les choix, un LLM écrit la suite.",
    },
    bullets: {
      en: [
        "Expo / React Native app on a serverless AWS backend, deployed with AWS CDK.",
        "Prototyped on the OpenAI API, then moved generation to AWS Bedrock to cut model costs.",
      ],
      fr: [
        "App Expo / React Native sur un back-end AWS serverless, déployé avec AWS CDK.",
        "Prototype sur l’API OpenAI, puis génération migrée vers AWS Bedrock pour réduire les coûts.",
      ],
    },
    tags: ["Expo", "React Native", "AWS CDK", "Cognito", "Bedrock"],
    media: [],
    links: [],
  },
];

export type SkillGroup = { title: L; lead: string[]; other: string[]; proof: L };

export const skills: { automate: SkillGroup[]; host: SkillGroup[]; secure: SkillGroup[] } = {
  automate: [
    {
      title: { en: "Backend & APIs", fr: "Back-end & API" },
      lead: ["Node.js", "Hono", "Microservices"], other: ["Express", "REST", "Jest", "Stripe", "Cognito", "Brevo", "HLS", "FFmpeg", "Vonage (WebRTC)", "Wowza"],
      proof: { en: "Microservices at RedPill and Sézame, Stripe subscriptions and automated replays at RedPill Live, the Quidol game server.", fr: "Microservices chez RedPill et Sézame, abonnements Stripe et replays automatisés chez RedPill Live, serveur de jeu Quidol." },
    },
    {
      title: { en: "Business apps: web & mobile", fr: "Applications métier : web & mobile" },
      lead: ["React", "Next.js", "Tailwind"], other: ["React Native", "Expo", "Redux", "PWA", "styled-components", "webpack"],
      proof: { en: "Sézame’s search page V2, live shopping fronts for a luxury house and Carrefour, the Quidol app (450k+ downloads).", fr: "Recherche V2 de Sézame, fronts live shopping pour une maison de luxe et Carrefour, app Quidol (450k+ téléchargements)." },
    },
    {
      title: { en: "AI integration", fr: "Intégration IA" },
      lead: ["Claude Code"], other: ["MCP", "Cursor", "Multi-agent workflows", "AWS Bedrock", "OpenAI API", "LLM integration"],
      proof: { en: "Agentic coding daily; LLMs integrated in two mobile apps.", fr: "Codage agentique au quotidien ; LLM intégrés dans deux apps mobiles." },
    },
    {
      title: { en: "Languages", fr: "Langages" },
      lead: ["TypeScript", "JavaScript", "Python"], other: ["C", "Bash", "Go", "Lua"],
      proof: { en: "TypeScript on every recent project. Python is my first language: boto3 scripts and a Python 2.7 → 3 Lambda migration at Pitchy, prototypes and data work.", fr: "TypeScript sur tous les projets récents. Python est mon premier langage : scripts boto3 et migration des Lambdas de Python 2.7 vers 3 chez Pitchy, prototypes et données." },
    },
    {
      title: { en: "Data & search", fr: "Données & recherche" },
      lead: ["DynamoDB", "MongoDB"], other: ["Redis", "PostgreSQL", "Typesense", "Kinesis", "Athena"],
      proof: { en: "Single-table DynamoDB at Sézame; production MongoDB scripts for fraud detection at Quidol.", fr: "DynamoDB single-table chez Sézame ; scripts MongoDB de détection de fraude chez Quidol." },
    },
  ],
  host: [
    {
      title: { en: "Cloud & IaC", fr: "Cloud & IaC" },
      lead: ["AWS", "Terraform", "AWS CDK"], other: ["Azure", "GCP", "projen", "CloudFormation", "Packer", "FinOps"],
      proof: { en: "An Azure ↔ AWS IPsec tunnel in Terraform for Infiny, FinOps on AWS at Pitchy.", fr: "Tunnel IPsec Azure ↔ AWS en Terraform pour Infiny, FinOps sur AWS chez Pitchy." },
    },
    {
      title: { en: "Containers & CI/CD", fr: "Conteneurs & CI/CD" },
      lead: ["Docker", "Kubernetes", "GitLab CI"], other: ["GitHub Actions", "GKE", "Helm", "Docker Compose", "Git LFS", "Traefik", "Jenkins"],
      proof: { en: "Kubernetes in production at Pitchy, microservices on GKE at RedPill and Quidol.", fr: "Kubernetes en production chez Pitchy, microservices sur GKE chez RedPill et Quidol." },
    },
    {
      title: { en: "Serverless & events", fr: "Serverless & événements" },
      lead: ["AWS Lambda", "EventBridge"], other: ["SQS/SNS", "API Gateway"],
      proof: { en: "Fully serverless, event-driven architecture at Sézame.", fr: "Architecture serverless et événementielle chez Sézame." },
    },
    {
      title: { en: "SRE & observability", fr: "SRE & observabilité" },
      lead: ["Linux & Bash", "CloudWatch", "Datadog"], other: ["Honeycomb", "Mixpanel", "Slack alerting", "Prometheus", "Grafana"],
      proof: { en: "Incident tracing at Pitchy, Slack alerts on production errors at Sézame.", fr: "Analyse d’incidents chez Pitchy, alertes Slack sur les erreurs de production chez Sézame." },
    },
  ],
  secure: [
    {
      title: { en: "Network", fr: "Réseau" },
      lead: ["IPsec"], other: ["VPC", "VNet", "DNS", "CDN"],
      proof: { en: "Site-to-site VPN between Azure and AWS, DNS cutover off OVH with no downtime.", fr: "VPN site-à-site entre Azure et AWS, bascule DNS depuis OVH sans interruption." },
    },
    {
      title: { en: "Security", fr: "Sécurité" },
      lead: [], other: ["Bug bounty", "Burp Suite", "Caido", "ffuf", "nuclei", "nmap", "CTF"],
      proof: { en: "Web and API bug bounty; CTFs on Root-Me, HTB and TryHackMe.", fr: "Bug bounty web et API ; CTF sur Root-Me, HTB et TryHackMe." },
    },
  ],
};

export const impact = [
  { delta: "−75%", name: { en: "search costs at Sézame", fr: "de coûts de recherche chez Sézame" }, how: { en: "I moved product search from Algolia to Typesense.", fr: "J’ai migré la recherche d’Algolia vers Typesense." } },
  { delta: "−40%", name: { en: "video generation time at Pitchy", fr: "de temps de génération vidéo chez Pitchy" }, how: { en: "I moved rendering from Windows Server to headless macOS images built with Packer.", fr: "J’ai passé le rendu de Windows Server à des images macOS headless construites avec Packer." } },
  { delta: "−22%", name: { en: "on Pitchy’s AWS bill", fr: "sur la facture AWS de Pitchy" }, how: { en: "Autoscaling, right-sizing and on-demand services.", fr: "Autoscaling, bon dimensionnement et services à la demande." } },
];

// Manual processes I turned into tools. Before/after come from the master DC.
// `gain` stays empty until a measured figure lands in the DC; the card hides the line when it is missing.
export type Automation = { where: L; before: L; after: L; runs: L; gain?: L };

export const automations: Automation[] = [
  {
    where: { en: "RedPill Live · Carrefour live shopping", fr: "RedPill Live · live shopping Carrefour" },
    before: {
      en: "Someone recorded each replay by hand in OBS: 5 to 10 minutes per show, and no replay at all if the computer failed.",
      fr: "Quelqu’un enregistrait chaque replay à la main dans OBS : 5 à 10 minutes par émission, et pas de replay du tout si l’ordinateur avait un souci.",
    },
    after: {
      en: "The platform records the replay through the Vonage and Wowza APIs, with the chat, polls and product clicks.",
      fr: "La plateforme enregistre le replay via les API Vonage et Wowza, avec le chat, les sondages et les clics produits.",
    },
    runs: { en: "Microservices on GKE, deployed with Helm", fr: "Microservices sur GKE, déployés avec Helm" },
  },
  {
    where: { en: "Quidol · marketing team", fr: "Quidol · équipe marketing" },
    before: {
      en: "Marketing asked a developer for a new promo card every day: 5 to 10 minutes of developer time each.",
      fr: "Le marketing demandait chaque jour une carte promo à un développeur : 5 à 10 minutes de développeur à chaque fois.",
    },
    after: {
      en: "Marketing builds the cards in the back office, without a developer.",
      fr: "Le marketing crée les cartes dans le back-office, sans développeur.",
    },
    runs: { en: "React back office on GKE", fr: "Back-office React sur GKE" },
  },
  {
    where: { en: "Pitchy · motion design team", fr: "Pitchy · équipe motion design" },
    before: {
      en: "Renders went through an SVN “server”, a screenless laptop wired to several disks. Designers lost about a day a week.",
      fr: "Les rendus passaient par un « serveur » SVN, un laptop sans écran relié à plusieurs disques. Les designers perdaient environ une journée par semaine.",
    },
    after: {
      en: "Their files live in Git LFS on the company’s self-hosted GitLab.",
      fr: "Leurs fichiers sont dans Git LFS, sur le GitLab auto-hébergé de l’entreprise.",
    },
    runs: { en: "Self-hosted GitLab, on the company’s own infrastructure", fr: "GitLab auto-hébergé, sur l’infrastructure de l’entreprise" },
  },
  {
    where: { en: "Bel Group · paperless factory", fr: "Groupe Bel · usine sans papier" },
    before: {
      en: "Factory operators tracked production, errors and incidents on paper.",
      fr: "Les opérateurs d’usine suivaient la production, les erreurs et les incidents sur papier.",
    },
    after: {
      en: "Our DIP team relayed PLC data, errors and incidents to SAP, with alerts. Everyone reads the same live source.",
      fr: "Notre équipe DIP a relayé les données des automates, les erreurs et les incidents vers SAP, avec des alertes. Tout le monde lit la même source en temps réel.",
    },
    runs: { en: "Bel’s DIP platform on Kubernetes with Traefik", fr: "Plateforme DIP de Bel sur Kubernetes avec Traefik" },
  },
];

// About me. From the master DC and Axo’s own answers.
export const about: { id: string; title: L; text: L }[] = [
  {
    id: "work",
    title: { en: "How I work", fr: "Ma façon de travailler" },
    text: {
      en: "Initiative: I spot a problem and fix it without waiting to be asked (Git LFS at Pitchy).\nOwnership: I own my incidents and add the guardrail that stops them coming back (Quidol Redis cluster, Pitchy database).\nTeaching: I gave electronics classes at Epitech.\nMaking teams autonomous: Quidol’s marketing team builds its promo cards without a developer.\nCuriosity: I keep a tech watch and I’m moving from web to industry, one subject at a time.",
      fr: "Initiative : je repère un problème et je le règle sans attendre qu’on me le demande (Git LFS chez Pitchy).\nResponsabilité : j’assume mes incidents et j’ajoute le garde-fou qui les empêche de revenir (cluster Redis chez Quidol, base de données chez Pitchy).\nTransmission : j’ai donné des cours d’électronique à Epitech.\nAutonomie des équipes : le marketing de Quidol crée ses cartes promo sans développeur.\nCuriosité : je fais de la veille et je passe du web à l’industriel, un sujet à la fois.",
    },
  },
  {
    id: "ai",
    title: { en: "How I use AI", fr: "Comment j’utilise l’IA" },
    text: {
      en: "Every day: Cursor in 2025, Claude Code and multi-agent workflows since 2026. AI speeds up my work; I keep the architecture choices, the review and the production release. I follow daily.dev, Reddit and RSS feeds.",
      fr: "Au quotidien : Cursor en 2025, Claude Code et des workflows multi-agents depuis 2026. L’IA accélère mon travail ; je garde les choix d’architecture, la relecture et la mise en production. Ma veille : daily.dev, Reddit et flux RSS.",
    },
  },
  {
    id: "electronics",
    title: { en: "Electronics", fr: "Électronique" },
    text: {
      en: "Electronics gives software a concrete, physical side. My 3D-printer lab at PoC Innovation is in the Lab section.",
      fr: "L’électronique donne au logiciel une couche concrète, physique. Mon labo d’impression 3D à PoC Innovation est dans la section Labo.",
    },
    // Axo may add a separate hobby/electronics portfolio later.
  },
  {
    id: "printing",
    title: { en: "3D printing", fr: "Impression 3D" },
    text: {
      en: "I use my 3D printer for side projects and for small improvements around the house.",
      fr: "Mon imprimante 3D me sert pour mes projets perso et pour améliorer le quotidien à la maison.",
    },
  },
  {
    id: "diving",
    title: { en: "Under water", fr: "Sous l’eau" },
    text: {
      en: "I’ve dived since I was 11 and hold Level 2. During my sabbatical I dived a lot in New Caledonia, wrecks and night dives included.",
      fr: "Je plonge depuis mes 11 ans, niveau 2. Pendant mon année sabbatique, j’ai beaucoup plongé en Nouvelle-Calédonie, sur épaves et de nuit.",
    },
  },
  {
    id: "motorbike",
    title: { en: "Motorbike", fr: "Moto" },
    text: { en: "I passed my motorbike licence in New Caledonia and have ridden ever since.", fr: "J’ai passé mon permis moto en Nouvelle-Calédonie et je roule depuis." },
  },
];
