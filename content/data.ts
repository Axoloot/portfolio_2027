export type Locale = "en" | "fr";
export type L = { en: string; fr: string };
export type Focus = { dev: number; ops: number };

export const site = {
  name: "Cyril de Lajudie",
  email: "cyril_de_lajudie@hotmail.fr",
  url: "https://cyrildelajudie.fr",
  cv: "/cv-fr.pdf",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cyrildelajudie" },
    { label: "GitHub", href: "https://github.com/Axoloot" },
    { label: "Malt", href: "https://www.malt.fr/profile/cyrildelajudie1" },
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
        "Infiny, a recruitment platform, runs its CV-parsing LLMs on Azure and the rest of its backend on AWS. I linked the two clouds with a site-to-site IPsec tunnel (VPN Gateway to Virtual Private Gateway), written in Terraform.",
        "Moved Infiny’s DNS off OVH with no downtime, and cut unused resources from the Terraform code.",
        "Designed a hierarchical job data model on France Travail’s ROME reference.",
        "Wrote my own boilerplates (Node.js/TypeScript, Next.js, AWS CDK with projen) to start client projects in hours.",
      ],
      fr: [
        "Infiny, plateforme de recrutement, analyse les CV avec des LLM sur Azure et fait tourner le reste du backend sur AWS. J’ai relié les deux clouds par un tunnel IPsec site-à-site (VPN Gateway vers Virtual Private Gateway), écrit en Terraform.",
        "Bascule DNS d’Infiny depuis OVH sans interruption, et nettoyage des ressources inutilisées dans le code Terraform.",
        "Schéma de données métiers hiérarchique construit sur le référentiel ROME de France Travail.",
        "Boilerplates maison (Node.js/TypeScript, Next.js, AWS CDK avec projen) pour lancer un projet client en quelques heures.",
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
        "Hunting web and API vulnerabilities on public and private programs.",
        "My recon and fuzzing chain: subfinder, httpx, ffuf and nuclei, then manual testing in Caido and Burp Suite.",
      ],
      fr: [
        "Recherche de vulnérabilités web et API sur des programmes publics et privés.",
        "Chaîne de reconnaissance et de fuzzing : subfinder, httpx, ffuf et nuclei, puis tests manuels dans Caido et Burp Suite.",
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
    kind: { en: "Hotel services marketplace, 15–20 people", fr: "Marketplace de services hôteliers, 15 à 20 personnes" },
    bullets: {
      en: [
        "Moved time-slot product search from Algolia to Typesense and cut search costs by ~75%.",
        "Built standalone event-driven services on AWS: Lambda, EventBridge, SQS/SNS and single-table DynamoDB (DynamoDB Toolbox).",
        "Rebuilt the search page (V2) in Next.js and Tailwind, on Hono APIs deployed with AWS CDK.",
        "Shipped automatic Google Shopping listings and Brevo transactional emails.",
        "Wired production errors to Slack alerts and opened the fixing PRs myself.",
      ],
      fr: [
        "Migration de la recherche par créneaux d’Algolia vers Typesense : ~75 % de coûts de recherche en moins.",
        "Services événementiels autonomes sur AWS : Lambda, EventBridge, SQS/SNS et DynamoDB single-table (DynamoDB Toolbox).",
        "Refonte de la page de recherche (V2) en Next.js et Tailwind, sur des API Hono déployées en AWS CDK.",
        "Référencement automatique sur Google Shopping et emails transactionnels Brevo.",
        "Erreurs de production branchées sur des alertes Slack, et PR correctives ouvertes dans la foulée.",
      ],
    },
    tags: ["Typesense", "Next.js", "Hono", "Lambda", "EventBridge", "DynamoDB", "AWS CDK", "Kinesis", "Athena"],
  },
  {
    company: { en: "Sabbatical year", fr: "Année sabbatique" },
    role: { en: "Travel and diving", fr: "Voyages et plongée" },
    bullets: {
      en: ["Croatia, Montenegro and Hungary, then three months in New Caledonia. Scuba diving, plus motorbike and car licences."],
      fr: ["Croatie, Monténégro et Hongrie, puis trois mois en Nouvelle-Calédonie. Plongée sous-marine, permis moto et voiture."],
    },
    start: "2024-04", end: "2025-03",
    when: { en: "Apr 2024–Mar 2025", fr: "Avr. 2024–mars 2025" },
    focus: null,
    minor: true,
  },
  {
    company: { en: "Pitchy", fr: "Pitchy" },
    role: { en: "DevOps Engineer", fr: "Ingénieur DevOps" },
    start: "2023-03", end: "2024-04",
    when: { en: "Mar 2023–Apr 2024", fr: "Mars 2023–avr. 2024" },
    focus: { dev: 15, ops: 85 },
    kind: { en: "B2B video SaaS, ~1,000 clients, €40M Series B", fr: "SaaS vidéo B2B, ~1 000 clients, série B de 40 M€" },
    bullets: {
      en: [
        "Pitchy renders motion-design videos for clients like Accor, Orange and Danone on an autoscaling farm of After Effects machines.",
        "Cut video generation time by ~40% by moving rendering from Windows Server to macOS. Apple dropped macOS Server, so I built headless macOS desktop images with Packer and AppleScript.",
        "Cut the AWS bill by 22% with right-sizing, autoscaling and on-demand services.",
        "Ran production on Kubernetes with GitLab CI, and set up GitLab LFS for the motion designers’ heavy assets.",
        "Wrote a tool that turns the production Docker image into a local Docker Compose stack, so developers run the platform on their laptop.",
        "Benchmarked After Effects v19 against v23 before the upgrade (v23 renders 5% slower), and traced incidents across CloudWatch, Datadog and Honeycomb.",
      ],
      fr: [
        "Pitchy rend des vidéos en motion design pour des clients comme Accor, Orange et Danone, sur une ferme de machines After Effects en autoscaling.",
        "Temps de génération vidéo réduit de ~40 % en passant les rendus de Windows Server à macOS. macOS Server n’existant plus, j’ai construit des images macOS desktop headless avec Packer et AppleScript.",
        "Facture AWS réduite de 22 % : bon dimensionnement, autoscaling et services à la demande.",
        "Production sur Kubernetes avec GitLab CI, et GitLab LFS pour les assets lourds des motion designers.",
        "Outil qui transforme l’image Docker de production en stack Docker Compose locale : les développeurs lancent la plateforme sur leur poste.",
        "Benchmark d’After Effects v19 contre v23 avant la montée de version (v23 rend 5 % plus lentement), analyse d’incidents sur CloudWatch, Datadog et Honeycomb.",
      ],
    },
    tags: ["AWS", "Kubernetes", "GitLab CI", "Terraform", "Packer", "Docker Compose", "Datadog", "FinOps"],
  },
  {
    company: { en: "RedPill", fr: "RedPill" },
    role: { en: "Full Stack & DevOps Developer", fr: "Développeur Full Stack & DevOps" },
    start: "2022-05", end: "2022-12",
    when: { en: "May–Dec 2022", fr: "Mai–déc. 2022" },
    focus: { dev: 50, ops: 50 },
    bullets: {
      en: [
        "Built a one-to-one live shopping platform, a web FaceTime for luxury sales, at Hermès’s request.",
        "Owned the full cycle: prototype, release, hosting, Docker microservices on GKE, CI/CD and on-call during live events.",
        "Tracked a bug that appeared with a new iOS release down to a race condition in a JavaScript class.",
      ],
      fr: [
        "Plateforme de live shopping en tête-à-tête, un FaceTime web pour la vente de luxe, construite à la demande d’Hermès.",
        "Cycle complet : prototype, mise en production, hébergement, microservices Docker sur GKE, CI/CD et astreinte pendant les lives.",
        "Bug apparu avec une nouvelle version d’iOS, remonté jusqu’à une race condition dans une classe JavaScript.",
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
    kind: { en: "White-label live shopping, 4,500 viewers per Carrefour live", fr: "Live shopping en marque blanche, 4 500 spectateurs par live Carrefour" },
    bullets: {
      en: [
        "Automated replays, recorded by hand in OBS until then: I drove recording through the Vonage (WebRTC) and Wowza (HLS) APIs and replayed chat, polls and product clicks.",
        "Built the self-service offer: brands pick one of 3 plans and pay through Stripe, with no card data stored on our side.",
        "Cut live latency by tuning the HLS pipeline, and raised the Lighthouse score with webpack and a CDN.",
        "Deployed microservices on GKE with Helm charts, in a Scrum team with Jira.",
      ],
      fr: [
        "Replays automatisés, enregistrés à la main dans OBS jusque-là : pilotage de l’enregistrement via les API Vonage (WebRTC) et Wowza (HLS), replay du chat, des sondages et des clics produits.",
        "Offre self-service : les marques choisissent l’un des 3 abonnements et paient via Stripe, sans stocker de données bancaires.",
        "Latence des lives réduite en optimisant le flux HLS, score Lighthouse relevé avec webpack et un CDN.",
        "Microservices déployés sur GKE avec des charts Helm, en équipe Scrum avec Jira.",
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
        "Paperless factory: built on DIP, Bel’s framework that reads PLC data and serves it as live reports and apps.",
        "Relayed PLC data and wired alerting on it.",
        "Built a real-time animated dashboard on the SAP API, shown at headquarters (React, styled-components).",
        "Shipped the app as a PWA: offline mode, install, changelog and enforced versioning.",
      ],
      fr: [
        "Usine sans papier : développement sur DIP, le framework de Bel qui lit les automates (PLC) et sert les données en rapports et applications temps réel.",
        "Relais des données d’automates et alerting.",
        "Dashboard animé temps réel sur l’API SAP, diffusé au siège (React, styled-components).",
        "Application livrée en PWA : mode hors ligne, installation, journal des versions et versioning imposé.",
      ],
    },
    tags: ["React", "styled-components", "PWA", "SAP API", "PLC", "IoT"],
  },
  {
    company: { en: "Quidol", fr: "Quidol" },
    role: { en: "Full Stack & Mobile Developer", fr: "Développeur Full Stack & Mobile" },
    start: "2019-07", end: "2019-12",
    when: { en: "Jul–Dec 2019", fr: "Juil.–déc. 2019" },
    focus: { dev: 80, ops: 20 },
    kind: { en: "Live quiz app, 350,000+ downloads, 20,000+ daily players", fr: "Quiz en direct, 350 000+ téléchargements, 20 000+ joueurs par jour" },
    bullets: {
      en: [
        "Worked across the React Native app, the Node.js game server and the React back office, on GKE.",
        "Host-less blind tests: converted mp3 to multi-bitrate HLS with FFmpeg, so music plays within the question’s 10 seconds.",
        "Wrote production MongoDB scripts: data repair after a bad update, payment-fraud detection, weekly marketing stats.",
        "Built a promo-card generator in the back office, which marketing had asked developers for every day.",
      ],
      fr: [
        "Développement sur l’app React Native, le serveur de jeu Node.js et le back-office React, sur GKE.",
        "Blind tests sans animateur : mp3 convertis en HLS multi-bitrate avec FFmpeg, la musique démarre dans les 10 secondes de la question.",
        "Scripts MongoDB en production : réparation de données après une mise à jour, détection de fraude au paiement, statistiques marketing hebdomadaires.",
        "Générateur de cartes promotionnelles dans le back-office, que le marketing demandait chaque jour aux développeurs.",
      ],
    },
    tags: ["React Native", "Node.js", "MongoDB", "Redis", "FFmpeg", "GKE"],
  },
  {
    company: { en: "GMODStore", fr: "GMODStore" },
    role: { en: "Freelance · Lua plugins for Garry’s Mod", fr: "Freelance · plugins Lua pour Garry’s Mod" },
    start: "2016-01", end: "2017-12",
    when: { en: "2016–2017", fr: "2016–2017" },
    focus: { dev: 100, ops: 0 },
    bullets: {
      en: ["First paid code: custom game-server plugins sold on a freelance platform."],
      fr: ["Premier code payé : des plugins sur mesure vendus sur une plateforme freelance."],
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
    when: "2018–2021",
    title: "PoC Innovation · PoC Services",
    text: {
      en: "Head of Electronics, Treasurer, then Vice-President; set up the PoC Services junior enterprise (2021).",
      fr: "Responsable électronique, Trésorier, puis Vice-Président ; création de la Junior-Entreprise PoC Services (2021).",
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
    slug: "wechoose",
    title: { en: "WeChoose", fr: "WeChoose" },
    kind: { en: "Mobile app", fr: "App mobile" },
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
      { type: "image", src: "/projects/fundy/projects.jpg", alt: { en: "Fundy projects page: categories and crowdfunding projects with their goals", fr: "Page projets de Fundy : catégories et projets avec leurs objectifs" }, width: 1440, height: 900 },
      { type: "image", src: "/projects/fundy/home.jpg", alt: { en: "Fundy home page: round-up crowdfunding", fr: "Accueil de Fundy : le crowdfunding par l’arrondi" }, width: 1440, height: 900 },
    ],
    links: [
      { label: { en: "Live demo", fr: "Démo en ligne" }, href: "https://fundy.cyrildelajudie.fr/" },
      { label: { en: "Source on GitHub", fr: "Code sur GitHub" }, href: "https://github.com/Axoloot/FundyEIP" },
    ],
  },
  {
    slug: "flipper",
    title: { en: "Flipper Zero app", fr: "App Flipper Zero" },
    kind: { en: "Embedded", fr: "Embarqué" },
    when: "2026",
    summary: {
      en: "A personal embedded application for the Flipper Zero.",
      fr: "Une application embarquée personnelle pour le Flipper Zero.",
    },
    tags: ["C", "Embedded", "Reverse engineering"],
    media: [],
    links: [],
  },
];

export type SkillGroup = { title: L; lead: string[]; other: string[]; proof: L };

export const skills: { dev: SkillGroup[]; ops: SkillGroup[]; also: SkillGroup[] } = {
  dev: [
    {
      title: { en: "Languages", fr: "Langages" },
      lead: ["TypeScript", "JavaScript", "Python"], other: ["C", "Bash", "Go", "Lua"],
      proof: { en: "TypeScript on every project since 2019; Python for scripting and ML.", fr: "TypeScript sur tous les projets depuis 2019 ; Python pour le scripting et le ML." },
    },
    {
      title: { en: "Frontend & mobile", fr: "Frontend & mobile" },
      lead: ["React", "Next.js", "Tailwind"], other: ["React Native", "Expo", "PWA", "styled-components", "webpack"],
      proof: { en: "Sézame’s search page V2, live shopping fronts for Hermès and Carrefour, the Quidol app (350k+ downloads).", fr: "Recherche V2 de Sézame, fronts live shopping pour Hermès et Carrefour, app Quidol (350k+ téléchargements)." },
    },
    {
      title: { en: "Backend & APIs", fr: "Back-end & API" },
      lead: ["Node.js", "Hono", "Microservices"], other: ["Express", "REST", "Stripe", "Cognito", "Brevo"],
      proof: { en: "Microservices at RedPill and Sézame, Stripe subscriptions at RedPill Live, the Quidol game server.", fr: "Microservices chez RedPill et Sézame, abonnements Stripe chez RedPill Live, serveur de jeu Quidol." },
    },
    {
      title: { en: "Data & search", fr: "Données & recherche" },
      lead: ["DynamoDB", "MongoDB"], other: ["Redis", "PostgreSQL", "Typesense", "Kinesis", "Athena"],
      proof: { en: "Single-table DynamoDB at Sézame; production MongoDB scripts for fraud detection at Quidol.", fr: "DynamoDB single-table chez Sézame ; scripts MongoDB de détection de fraude chez Quidol." },
    },
    {
      title: { en: "Video & real time", fr: "Vidéo & temps réel" },
      lead: ["HLS", "FFmpeg"], other: ["Vonage (WebRTC)", "Wowza", "After Effects"],
      proof: { en: "Lives for 4,500 viewers at Carrefour, automated replays, a macOS render farm at Pitchy.", fr: "Lives à 4 500 spectateurs chez Carrefour, replays automatisés, ferme de rendu macOS chez Pitchy." },
    },
  ],
  ops: [
    {
      title: { en: "Cloud & IaC", fr: "Cloud & IaC" },
      lead: ["AWS", "Terraform", "AWS CDK"], other: ["Azure", "GCP", "projen", "CloudFormation", "Packer", "FinOps"],
      proof: { en: "−22% on Pitchy’s AWS bill, an Azure ↔ AWS IPsec tunnel in Terraform for Infiny.", fr: "−22 % sur la facture AWS de Pitchy, tunnel IPsec Azure ↔ AWS en Terraform pour Infiny." },
    },
    {
      title: { en: "Containers & CI/CD", fr: "Conteneurs & CI/CD" },
      lead: ["Docker", "Kubernetes", "GitLab CI"], other: ["GitHub Actions", "GKE", "Helm", "Docker Compose", "GitLab LFS"],
      proof: { en: "Kubernetes in production at Pitchy, microservices on GKE at RedPill and Quidol.", fr: "Kubernetes en production chez Pitchy, microservices sur GKE chez RedPill et Quidol." },
    },
    {
      title: { en: "Serverless & events", fr: "Serverless & événements" },
      lead: ["AWS Lambda", "EventBridge"], other: ["SQS/SNS", "API Gateway"],
      proof: { en: "Standalone event-driven services at Sézame.", fr: "Services événementiels autonomes chez Sézame." },
    },
    {
      title: { en: "SRE & observability", fr: "SRE & observabilité" },
      lead: ["Linux & Bash", "CloudWatch", "Datadog"], other: ["Honeycomb", "Mixpanel", "Slack alerting", "On-call"],
      proof: { en: "On-call during live events at RedPill; incident tracing at Pitchy; Slack alerts at Sézame.", fr: "Astreinte pendant les lives chez RedPill ; analyse d’incidents chez Pitchy ; alertes Slack chez Sézame." },
    },
    {
      title: { en: "Network", fr: "Réseau" },
      lead: ["IPsec"], other: ["VPC", "VNet", "DNS", "CDN"],
      proof: { en: "Site-to-site VPN between Azure and AWS, DNS cutover off OVH with no downtime.", fr: "VPN site-à-site entre Azure et AWS, bascule DNS depuis OVH sans interruption." },
    },
  ],
  also: [
    {
      title: { en: "AI", fr: "IA" },
      lead: ["Claude Code"], other: ["MCP", "Cursor", "Multi-agent workflows", "AWS Bedrock", "OpenAI API", "LLM integration"],
      proof: { en: "Agentic coding daily; LLMs integrated in two mobile apps.", fr: "Codage agentique au quotidien ; LLM intégrés dans deux apps mobiles." },
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
  { delta: "4.5k", name: { en: "viewers per Carrefour live", fr: "spectateurs par live Carrefour" }, how: { en: "On the live shopping platform where I automated replays and built Stripe self-service.", fr: "Sur la plateforme de live shopping où j’ai automatisé les replays et le self-service Stripe." } },
];
