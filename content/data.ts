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
        "DevOps mission for Infiny: designed a site-to-site IPsec tunnel between Azure and AWS for a recruitment platform, provisioned with Terraform.",
        "Custom boilerplates to speed up the start of client and personal projects.",
      ],
      fr: [
        "Mission DevOps pour Infiny : conception d’un tunnel IPsec site-à-site entre Azure et AWS pour une plateforme de recrutement, provisionné en Terraform.",
        "Boilerplates sur mesure pour accélérer le démarrage des projets clients et personnels.",
      ],
    },
    tags: ["Terraform", "Azure", "AWS", "IPsec", "TypeScript"],
  },
  {
    company: { en: "Bug bounty", fr: "Bug bounty" },
    role: { en: "Independent security researcher", fr: "Chercheur en sécurité indépendant" },
    start: "2026-03", end: "2026-11",
    when: { en: "Mar–Nov 2026", fr: "Mars–nov. 2026" },
    focus: null,
    kind: { en: "Security", fr: "Sécurité" },
    bullets: {
      en: ["Hunting web and API vulnerabilities on public and private programs."],
      fr: ["Recherche de vulnérabilités web et API sur des programmes publics et privés."],
    },
    tags: ["Caido", "ffuf", "nuclei", "subfinder", "httpx"],
  },
  {
    company: { en: "Sézame", fr: "Sézame" },
    role: { en: "DevOps & Full Stack Engineer", fr: "Ingénieur DevOps & Full Stack" },
    start: "2025-04", end: "2025-12",
    when: { en: "Apr–Dec 2025", fr: "Avr.–déc. 2025" },
    focus: { dev: 55, ops: 45 },
    bullets: {
      en: [
        "Migrated time-slot product search from Algolia to Typesense, cutting search costs by ~75%.",
        "Built standalone event-driven services on AWS (Lambda, EventBridge, SQS/SNS, DynamoDB).",
        "Optimized and redesigned the frontend (search page V2).",
        "Built an automated Google Shopping listing solution.",
      ],
      fr: [
        "Migration de la recherche de produits par créneaux d’Algolia vers Typesense : ~75 % de coûts de recherche en moins.",
        "Services événementiels autonomes sur AWS (Lambda, EventBridge, SQS/SNS, DynamoDB).",
        "Optimisation et refonte du frontend (V2 de la page de recherche).",
        "Solution automatique de référencement Google Shopping.",
      ],
    },
    tags: ["Typesense", "Next.js", "Hono", "Lambda", "EventBridge", "DynamoDB"],
  },
  {
    company: { en: "Sabbatical year", fr: "Année sabbatique" },
    role: { en: "A year off, spent diving", fr: "Une année de pause, passée à plonger" },
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
    bullets: {
      en: [
        "Cut AWS costs by 22% through resource optimization, autoscaling and on-demand services.",
        "Cut video generation time by ~40% by moving processing from Windows Server to macOS.",
        "Ran production services on Kubernetes, with GitLab CI pipelines and GitLab LFS for heavy assets.",
        "Built an internal tool to run stacks locally, addressing technical debt.",
      ],
      fr: [
        "Coûts AWS réduits de 22 % : optimisation des ressources, autoscaling et services à la demande.",
        "Temps de génération vidéo réduit d’environ 40 % en migrant les traitements de Windows Server vers macOS.",
        "Exploitation des services sur Kubernetes, pipelines GitLab CI et GitLab LFS pour les assets lourds.",
        "Outil interne pour lancer les stacks en local, en réponse à la dette technique.",
      ],
    },
    tags: ["AWS", "Kubernetes", "GitLab CI", "Autoscaling", "FinOps"],
  },
  {
    company: { en: "RedPill", fr: "RedPill" },
    role: { en: "Full Stack & DevOps Developer", fr: "Développeur Full Stack & DevOps" },
    start: "2022-05", end: "2022-12",
    when: { en: "May–Dec 2022", fr: "Mai–déc. 2022" },
    focus: { dev: 50, ops: 50 },
    bullets: {
      en: [
        "Designed and built a real-time interactive live shopping platform with a strong UX/UI focus.",
        "Owned the full cycle: prototyping, production release, hosting, cloud infrastructure, CI/CD and SRE.",
      ],
      fr: [
        "Conception et développement d’une plateforme de live shopping interactif en temps réel, à forte composante UX/UI.",
        "Prise en charge du cycle complet : prototypage, mise en production, hébergement, infrastructure cloud, CI/CD et SRE.",
      ],
    },
    tags: ["React", "Node.js", "GKE", "Docker", "CI/CD"],
  },
  {
    company: { en: "RedPill Live", fr: "RedPill Live" },
    role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
    start: "2021-04", end: "2021-08",
    when: { en: "Apr–Aug 2021", fr: "Avr.–août 2021" },
    focus: { dev: 70, ops: 30 },
    bullets: {
      en: [
        "Reduced live-stream latency by optimizing the HLS pipeline, integrated Stripe payments, built microservices on GKE.",
        "Added an interactive replay of past lives (chat, products).",
      ],
      fr: [
        "Latence des lives réduite par l’optimisation du flux HLS, intégration des paiements Stripe, microservices sur GKE.",
        "Replay interactif des lives (chat, produits).",
      ],
    },
    tags: ["HLS", "Stripe", "GKE", "Helm"],
  },
  {
    company: { en: "Bel Group", fr: "Groupe Bel" },
    role: { en: "Full Stack Developer · Industrial & IoT", fr: "Développeur Full Stack · Industriel & IoT" },
    start: "2020-10", end: "2021-03",
    when: { en: "Oct 2020–Mar 2021", fr: "Oct. 2020–mars 2021" },
    focus: { dev: 90, ops: 10 },
    bullets: {
      en: [
        "Paperless factory: real-time PLC data turned into reports and apps (Bel’s DIP framework).",
        "Real-time animated dashboard connected to the SAP API, displayed at headquarters.",
      ],
      fr: [
        "Usine sans papier : données temps réel des automates transformées en rapports et applications (framework DIP).",
        "Dashboard animé temps réel connecté à l’API SAP, diffusé au siège social.",
      ],
    },
    tags: ["React", "SAP API", "IoT"],
  },
  {
    company: { en: "Quidol", fr: "Quidol" },
    role: { en: "Full Stack & Mobile Developer", fr: "Développeur Full Stack & Mobile" },
    start: "2019-07", end: "2019-12",
    when: { en: "Jul–Dec 2019", fr: "Juil.–déc. 2019" },
    focus: { dev: 80, ops: 20 },
    bullets: {
      en: [
        "Live quiz app with 350,000+ downloads: React Native app, Node.js server and React back office, on GKE.",
        "Music for host-less blind tests: mp3 converted to multi-bitrate HLS streams with FFmpeg.",
        "Production MongoDB scripts: data repair, payment-fraud detection, weekly marketing stats.",
      ],
      fr: [
        "Quiz en direct, plus de 350 000 téléchargements : app React Native, serveur Node.js et back-office React, sur GKE.",
        "Musique des blind tests sans animateur : mp3 convertis en flux HLS multi-bitrate avec FFmpeg.",
        "Scripts MongoDB en production : réparation de données, détection de fraude au paiement, statistiques marketing.",
      ],
    },
    tags: ["React Native", "Node.js", "MongoDB", "FFmpeg", "GKE"],
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

export const about: { id: string; title: L; text: L }[] = [
  {
    id: "diving",
    title: { en: "Diving", fr: "Plongée" },
    text: {
      en: "I spent most of my 2024–2025 sabbatical diving. The sea on this site comes from there.",
      fr: "J’ai passé l’essentiel de mon année sabbatique 2024–2025 à plonger. La mer de ce site vient de là.",
    },
  },
  {
    id: "printing",
    title: { en: "3D printing", fr: "Impression 3D" },
    text: { en: "I have a 3D printer at home.", fr: "J’ai une imprimante 3D à la maison." },
  },
  {
    id: "motorbike",
    title: { en: "Motorbike", fr: "Moto" },
    text: { en: "I ride a motorbike.", fr: "Je roule à moto." },
  },
];

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
      lead: ["TypeScript", "JavaScript", "Python"], other: ["C", "C++"],
      proof: { en: "TypeScript on every recent project; Python for scripting and ML.", fr: "TypeScript sur tous les projets récents ; Python pour le scripting et le ML." },
    },
    {
      title: { en: "Frontend & mobile", fr: "Frontend & mobile" },
      lead: ["React", "Next.js", "Tailwind"], other: ["React Native", "Expo"],
      proof: { en: "Sézame’s search page V2, RedPill’s live shopping front, the Quidol app.", fr: "Recherche V2 de Sézame, front live shopping RedPill, app Quidol." },
    },
    {
      title: { en: "Backend & APIs", fr: "Back-end & API" },
      lead: ["Node.js", "Hono"], other: ["Express", "REST", "Cognito"],
      proof: { en: "Microservices at RedPill and Sézame, the Quidol game server.", fr: "Microservices chez RedPill et Sézame, serveur de jeu Quidol." },
    },
    {
      title: { en: "Data", fr: "Données" },
      lead: ["DynamoDB"], other: ["MongoDB", "Redis", "PostgreSQL"],
      proof: { en: "Single-table DynamoDB with optimized queries at Sézame.", fr: "DynamoDB single-table avec requêtes optimisées chez Sézame." },
    },
  ],
  ops: [
    {
      title: { en: "Cloud & IaC", fr: "Cloud & IaC" },
      lead: ["AWS", "Terraform", "AWS CDK"], other: ["CloudFormation", "GCP", "Azure", "FinOps"],
      proof: { en: "−22% AWS bill at Pitchy, an Azure ↔ AWS IPsec tunnel in Terraform.", fr: "−22 % sur la facture AWS chez Pitchy, tunnel IPsec Azure ↔ AWS en Terraform." },
    },
    {
      title: { en: "Containers & CI/CD", fr: "Conteneurs & CI/CD" },
      lead: ["Docker", "GitHub Actions", "GitLab CI"], other: ["Kubernetes", "GKE", "Helm"],
      proof: { en: "Kubernetes in production at Pitchy, microservices on GKE at RedPill and Quidol.", fr: "Kubernetes en production chez Pitchy, microservices sur GKE chez RedPill et Quidol." },
    },
    {
      title: { en: "Serverless & events", fr: "Serverless & événements" },
      lead: ["AWS Lambda"], other: ["EventBridge", "SQS/SNS", "API Gateway"],
      proof: { en: "Standalone event-driven services at Sézame.", fr: "Services événementiels autonomes chez Sézame." },
    },
    {
      title: { en: "Systems & observability", fr: "Système & observabilité" },
      lead: ["Linux & Bash", "CloudWatch"], other: [],
      proof: { en: "Advanced Linux and shell on every job; CloudWatch at Pitchy and Sézame.", fr: "Linux et shell avancés sur chaque poste ; CloudWatch chez Pitchy et Sézame." },
    },
  ],
  also: [
    {
      title: { en: "AI", fr: "IA" },
      lead: ["Claude Code"], other: ["MCP", "Multi-agent workflows", "AWS Bedrock", "OpenAI API", "LLM integration"],
      proof: { en: "Agentic coding daily; LLMs integrated in two mobile apps.", fr: "Codage agentique au quotidien ; LLM intégrés dans deux apps mobiles." },
    },
    {
      title: { en: "Security", fr: "Sécurité" },
      lead: [], other: ["Bug bounty", "Burp Suite", "Caido", "nmap", "Metasploit", "CTF", "Reverse engineering"],
      proof: { en: "Web and API pentesting; CTFs on Root-Me, HTB and TryHackMe.", fr: "Pentest web et API ; CTF sur Root-Me, HTB et TryHackMe." },
    },
  ],
};

export const impact = [
  { delta: "−75%", name: { en: "search costs at Sézame", fr: "de coûts de recherche chez Sézame" }, how: { en: "I moved product search from Algolia to Typesense.", fr: "J’ai migré la recherche d’Algolia vers Typesense." } },
  { delta: "−40%", name: { en: "video generation time at Pitchy", fr: "de temps de génération vidéo chez Pitchy" }, how: { en: "I moved rendering off Windows Server onto macOS.", fr: "J’ai déplacé le rendu de Windows Server vers macOS." } },
  { delta: "−22%", name: { en: "on Pitchy’s AWS bill", fr: "sur la facture AWS de Pitchy" }, how: { en: "Autoscaling, right-sizing and on-demand services.", fr: "Autoscaling, bon dimensionnement et services à la demande." } },
];
