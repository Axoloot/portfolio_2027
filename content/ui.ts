import type { Locale } from "./data";

const en = {
  meta: {
    title: "Cyril de Lajudie, developer and DevOps engineer",
    description:
      "Paris-based engineer who builds products in React and Node and runs them on AWS, Terraform and Kubernetes. Available for a permanent role.",
  },
  nav: { experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact", skip: "Skip to content", cv: "CV", toDark: "Switch to night", toLight: "Switch to day" },
  status: "Available now for a permanent role in Paris",
  hero: {
    role: "Developer and DevOps engineer.",
    lede: "I build the product, then I run the platform it sits on. Ten years of shipped code, four of them in production teams.",
    email: "Email me",
    cv: "Download my CV",
  },
  results: {
    title: "Recent results",
  },
  waterline: {
    label: "How my working time splits since 2019, weighted by how long each role lasted",
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
    chart: "Dev share above the line, DevOps share below, oldest role on the left",
    resume: "Full résumé, PDF in French",
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
  about: { title: "Off the clock", intro: "What I do away from a terminal." },
  joke: {
    caption: "I’ve held all three jobs.",
    lines: [
      { who: "Dev", says: "It works on my machine." },
      { who: "Ops", says: "We’re not shipping your machine." },
      { who: "DevOps", says: "We are now. It’s called Docker." },
    ],
  },
  contact: {
    title: "Hiring for a team that ships and runs its own product?",
    sub: "I’m available now for a permanent role or similar. I live in Paris and have a car.",
    copy: "Copy email",
    copied: "Copied",
    email: "Write to me",
  },
  footer: "Built with Next.js, hosted on Vercel.",
};

const fr: typeof en = {
  meta: {
    title: "Cyril de Lajudie, développeur et ingénieur DevOps",
    description:
      "Ingénieur à Paris : je construis des produits en React et Node, puis je les opère sur AWS, Terraform et Kubernetes. Disponible pour un CDI.",
  },
  nav: { experience: "Parcours", projects: "Projets", skills: "Compétences", contact: "Contact", skip: "Aller au contenu", cv: "CV", toDark: "Passer en mode nuit", toLight: "Passer en mode jour" },
  status: "Disponible pour un CDI à Paris",
  hero: {
    role: "Développeur et ingénieur DevOps.",
    lede: "Je construis le produit, puis j’opère la plateforme qui le porte. Dix ans de code livré, dont quatre en équipe de production.",
    email: "M’écrire",
    cv: "Télécharger mon CV",
  },
  results: {
    title: "Résultats récents",
  },
  waterline: {
    label: "Répartition de mon temps de travail depuis 2019, pondérée par la durée de chaque poste",
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
    chart: "Part dev au-dessus de la ligne, part DevOps en dessous, du plus ancien au plus récent",
    resume: "CV complet en PDF",
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
  about: { title: "Hors du code", intro: "Ce que je fais loin d’un terminal." },
  joke: {
    caption: "J’ai occupé les trois postes.",
    lines: [
      { who: "Dev", says: "Ça marche sur ma machine." },
      { who: "Ops", says: "On ne va pas livrer ta machine." },
      { who: "DevOps", says: "Si, maintenant. Ça s’appelle Docker." },
    ],
  },
  contact: {
    title: "Votre équipe construit et opère son propre produit ?",
    sub: "Je suis disponible pour un CDI ou équivalent. J’habite à Paris et je suis véhiculé.",
    copy: "Copier l’e-mail",
    copied: "Copié",
    email: "M’écrire",
  },
  footer: "Construit avec Next.js, hébergé sur Vercel.",
};

export const dictionaries = { en, fr };
export type Dict = typeof en;
export const locales: Locale[] = ["en", "fr"];
export const hasLocale = (l: string): l is Locale => l === "en" || l === "fr";
