import type { Locale } from "./data";

const en = {
  meta: {
    title: "Cyril de Lajudie, I automate your manual processes",
    description:
      "Paris-based developer and DevOps engineer. I turn manual processes into tools and host them on your cloud or your own servers. Available for a permanent role.",
  },
  nav: { automation: "Automation", experience: "Experience", projects: "Projects", skills: "Skills", about: "About", contact: "Contact", skip: "Skip to content", cv: "CV", toDark: "Switch to night", toLight: "Switch to day" },
  status: "Available now for a permanent role in Paris",
  hero: {
    role: "I automate your manual processes and host them where your data has to live.",
    lede: "Developer and DevOps engineer. I write the tool, then run it on your cloud or on your own servers. Ten years of shipped code, four of them in production teams.",
    email: "Email me",
    cv: "See my CV",
  },
  results: {
    title: "Recent results",
  },
  automation: {
    title: "Manual work I automated",
    intro: "Each case started with a person repeating the same task by hand.",
    before: "Before",
    after: "After",
    runs: "Runs on",
  },
  about: {
    title: "About me",
  },
  waterline: {
    label: "My working time since 2019, weighted by how long each role lasted",
    devTitle: "dev",
    devText: "Interfaces, mobile apps and the APIs behind them.",
    opsTitle: "DevOps",
    opsText: "Cloud, infrastructure as code, CI/CD and on-call.",
  },
  experience: {
    title: "Experience",
    intro: "I started as a developer, then moved toward DevOps from 2022. Yellow marks dev work, cyan marks DevOps work.",
    filterLabel: "Show roles",
    all: "All roles",
    dev: "Dev-heavy",
    ops: "DevOps-heavy",
    both: "Even split",
    resume: "See the full résumé (PDF in French)",
  },
  projects: {
    title: "Side projects",
    intro: "Things I designed, built and host on my own time.",
    noMedia: "Screenshots coming",
  },
  skills: {
    title: "Skills",
    intro: "Bright items are the ones I lead with.",
    dev: "Dev",
    devSub: "Product engineering",
    ops: "DevOps",
    opsSub: "Platform engineering",
    also: "Also in the toolbox",
    spoken: "Languages",
    spokenValue: "French (native), English (C1, TOEIC 950/990)",
  },
  joke: {
    caption: "I’ve held all three jobs.",
    lines: [
      { who: "Dev", says: "It works on my machine." },
      { who: "Ops", says: "We’re not shipping your machine." },
      { who: "DevOps", says: "We are now. It’s called Docker." },
    ],
  },
  contact: {
    title: "Tell me which process your team still runs by hand.",
    sub: "I’m available now for a permanent role or similar. I live in Paris and have a car.",
    copy: "Copy email",
    copied: "Copied",
    email: "Write to me",
  },
  footer: "Built with Next.js, hosted on Vercel.",
  old: "2024 portfolio",
  wip: { label: "WIP", text: "Still in progress: some content isn’t final yet." },
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
      "Développeur et ingénieur DevOps à Paris. Je transforme vos process manuels en outils, hébergés sur votre cloud ou sur vos propres serveurs. Disponible pour un CDI.",
  },
  nav: { automation: "Automatisation", experience: "Parcours", projects: "Projets", skills: "Compétences", about: "À propos", contact: "Contact", skip: "Aller au contenu", cv: "CV", toDark: "Passer en mode nuit", toLight: "Passer en mode jour" },
  status: "Disponible pour un CDI à Paris",
  hero: {
    role: "J’automatise vos process manuels et je les héberge là où vos données doivent rester.",
    lede: "Développeur et ingénieur DevOps. J’écris l’outil, puis je le fais tourner sur votre cloud ou sur vos propres serveurs. Dix ans de code livré, dont quatre en équipe de production.",
    email: "M’écrire",
    cv: "Voir mon CV",
  },
  results: {
    title: "Résultats récents",
  },
  automation: {
    title: "Du manuel que j’ai automatisé",
    intro: "Chaque cas part d’une personne qui répétait la même tâche à la main.",
    before: "Avant",
    after: "Après",
    runs: "Tourne sur",
  },
  about: {
    title: "À propos",
  },
  waterline: {
    label: "Mon temps de travail depuis 2019, pondéré par la durée de chaque poste",
    devTitle: "dev",
    devText: "Interfaces, apps mobiles et les API derrière.",
    opsTitle: "DevOps",
    opsText: "Cloud, infrastructure as code, CI/CD et astreinte.",
  },
  experience: {
    title: "Parcours",
    intro: "J’ai commencé développeur, puis je suis allé vers le DevOps à partir de 2022. Le jaune marque le dev, le cyan le DevOps.",
    filterLabel: "Afficher",
    all: "Tous les postes",
    dev: "Orienté dev",
    ops: "Orienté DevOps",
    both: "Équilibré",
    resume: "Voir le CV complet en PDF",
  },
  projects: {
    title: "Projets perso",
    intro: "Ce que j’ai conçu, développé et hébergé sur mon temps libre.",
    noMedia: "Captures à venir",
  },
  skills: {
    title: "Compétences",
    intro: "En clair, celles que je mets en avant.",
    dev: "Dev",
    devSub: "Développement produit",
    ops: "DevOps",
    opsSub: "Ingénierie plateforme",
    also: "Aussi dans la boîte à outils",
    spoken: "Langues",
    spokenValue: "Français (natif), anglais (C1, TOEIC 950/990)",
  },
  joke: {
    caption: "J’ai occupé les trois postes.",
    lines: [
      { who: "Dev", says: "Ça marche sur ma machine." },
      { who: "Ops", says: "On ne va pas livrer ta machine." },
      { who: "DevOps", says: "Si, maintenant. Ça s’appelle Docker." },
    ],
  },
  contact: {
    title: "Dites-moi quel process votre équipe fait encore à la main.",
    sub: "Je suis disponible pour un CDI ou équivalent. J’habite à Paris et je suis véhiculé.",
    copy: "Copier l’e-mail",
    copied: "Copié",
    email: "M’écrire",
  },
  footer: "Construit avec Next.js, hébergé sur Vercel.",
  old: "Portfolio 2024",
  wip: { label: "WIP", text: "En cours : certains contenus ne sont pas encore finalisés." },
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
