import type { Locale } from "./data";

const en = {
  meta: {
    title: "Cyril de Lajudie, I automate your manual processes",
    description:
      "Paris-based automation & infrastructure engineer. I turn manual processes into tools and host them on your cloud or your own servers. Available for a permanent role.",
  },
  nav: { automation: "Automation", experience: "What I shipped", projects: "Lab", skills: "Tools",  about: "About", contact: "Contact", skip: "Skip to content", cv: "CV", toDark: "Switch to night", toLight: "Switch to day" },
  status: "Available now for a permanent role in Paris",
  hero: {
    role: "I automate your manual processes and host them where your data has to live.",
    lede: "Automation & infrastructure engineer. I write the tool, then run it on your cloud or on your own servers. Ten years of shipped code, four of them in production teams.",
    email: "Email me",
    cv: "See my CV",
  },
  results: {
    title: "Recent results",
  },
  automation: {
    title: "Manual work I automated",
    intro: "Each case started with time lost every day or every week.",
    before: "Before",
    after: "After",
    runs: "Runs on",
  },
  about: {
    title: "About me",
  },
  waterline: {
    label: "My working time since 2019, weighted by how long each role lasted",
    devTitle: "build",
    devText: "Making the tool: interfaces, mobile apps and the APIs behind them.",
    opsTitle: "run",
    opsText: "Keeping it running: cloud, infrastructure as code, CI/CD and monitoring.",
  },
  experience: {
    title: "What I shipped",
    intro: "I started on the build side, then moved toward running platforms from 2022. Yellow marks build work, cyan marks run work.",
    filterLabel: "Show roles",
    all: "All roles",
    dev: "Mostly build",
    ops: "Mostly run",
    both: "Even split",
    resume: "See the full résumé (PDF in French)",
  },
  projects: {
    title: "Lab",
    intro: "Projects outside work: things I designed and built.",
    noMedia: "Screenshots coming",
  },
  skills: {
    title: "Tools I operate",
    intro: "Grouped by the problem they solve. Bright items are the ones I lead with.",
    automate: "Automate",
    automateSub: "Business applications that replace manual work",
    host: "Host",
    hostSub: "On your cloud or your own servers",
    secure: "Secure",
    secureSub: "Private networks and security testing",
    spoken: "Languages",
    spokenValue: "French (native), English (C1, TOEIC 950/990)",
  },
  contact: {
    title: "Tell me which process your team still runs by hand.",
    sub: "I’m available now for a permanent role in Paris and Île-de-France. I live in Paris and have a car.",
    copy: "Copy email",
    copied: "Copied",
    email: "Write to me",
  },
  footer: "Built with Next.js, hosted on Vercel.",
  old: "2024 portfolio",
  cvPage: {
    title: "CV, Cyril de Lajudie",
    note: "PDF in French",
    download: "Download the PDF",
  },
};

const fr: typeof en = {
  meta: {
    title: "Cyril de Lajudie, j’automatise vos process manuels",
    description:
      "Ingénieur automatisation & infrastructure à Paris. Je transforme vos process manuels en outils, hébergés sur votre cloud ou sur vos propres serveurs. Disponible pour un CDI.",
  },
  nav: { automation: "Automatisation", experience: "Ce que j’ai livré", projects: "Labo", skills: "Outils",  about: "À propos", contact: "Contact", skip: "Aller au contenu", cv: "CV", toDark: "Passer en mode nuit", toLight: "Passer en mode jour" },
  status: "Disponible pour un CDI à Paris",
  hero: {
    role: "J’automatise vos process manuels et je les héberge là où vos données doivent rester.",
    lede: "Ingénieur automatisation & infrastructure. J’écris l’outil, puis je le fais tourner sur votre cloud ou sur vos propres serveurs. Dix ans de code livré, dont quatre en équipe de production.",
    email: "M’écrire",
    cv: "Voir mon CV",
  },
  results: {
    title: "Résultats récents",
  },
  automation: {
    title: "Du manuel que j’ai automatisé",
    intro: "Chaque cas part d’un temps perdu chaque jour ou chaque semaine.",
    before: "Avant",
    after: "Après",
    runs: "Tourne sur",
  },
  about: {
    title: "À propos",
  },
  waterline: {
    label: "Mon temps de travail depuis 2019, pondéré par la durée de chaque poste",
    devTitle: "construire",
    devText: "Fabriquer l’outil : interfaces, apps mobiles et les API derrière.",
    opsTitle: "faire tourner",
    opsText: "Le garder en service : cloud, infrastructure as code, CI/CD et supervision.",
  },
  experience: {
    title: "Ce que j’ai livré",
    intro: "J’ai commencé côté construire, puis je suis allé vers l’exploitation des plateformes à partir de 2022. Le jaune marque ce que je construis, le cyan ce que je fais tourner.",
    filterLabel: "Afficher",
    all: "Tous les postes",
    dev: "Surtout construire",
    ops: "Surtout faire tourner",
    both: "Équilibré",
    resume: "Voir le CV complet en PDF",
  },
  projects: {
    title: "Labo",
    intro: "Projets hors travail : ce que j’ai conçu et construit.",
    noMedia: "Captures à venir",
  },
  skills: {
    title: "Outils que j’opère",
    intro: "Rangés par problème résolu. En clair, ceux que je mets en avant.",
    automate: "Automatiser",
    automateSub: "Des applications métier qui remplacent le travail manuel",
    host: "Héberger",
    hostSub: "Sur votre cloud ou sur vos propres serveurs",
    secure: "Sécuriser",
    secureSub: "Réseaux privés et tests de sécurité",
    spoken: "Langues",
    spokenValue: "Français (natif), anglais (C1, TOEIC 950/990)",
  },
  contact: {
    title: "Dites-moi quel process votre équipe fait encore à la main.",
    sub: "Je suis disponible pour un CDI à Paris et en Île-de-France. J’habite à Paris et je suis véhiculé.",
    copy: "Copier l’e-mail",
    copied: "Copié",
    email: "M’écrire",
  },
  footer: "Construit avec Next.js, hébergé sur Vercel.",
  old: "Portfolio 2024",
  cvPage: {
    title: "CV, Cyril de Lajudie",
    note: "PDF en français",
    download: "Télécharger le PDF",
  },
};

export const dictionaries = { en, fr };
export type Dict = typeof en;
export const locales: Locale[] = ["en", "fr"];
export const hasLocale = (l: string): l is Locale => l === "en" || l === "fr";
