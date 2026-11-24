import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import { dictionaries, hasLocale, locales } from "@/content/ui";
import { site, skills, type Locale } from "@/content/data";
import { ThemeSync } from "@/components/client";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], axes: ["wdth"] });

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}try{if(matchMedia("(prefers-reduced-motion: no-preference)").matches)document.documentElement.classList.add("count-js")}catch(e){}})()`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c9e3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#050d1f" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaries[lang].meta;
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    authors: [{ name: site.name }],
    alternates: { canonical: `/${lang}`, languages: { en: "/en", fr: "/fr", "x-default": "/en" } },
    openGraph: {
      type: "profile",
      siteName: site.name,
      title: t.title,
      description: t.description,
      url: `/${lang}`,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      images: [{ url: `/og-${lang}.png`, width: 1200, height: 630, alt: t.ogAlt }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans text-[17px] leading-relaxed">
        <ThemeSync lang={lang} />
        <ViewTransition>{children}</ViewTransition>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(lang)).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}

function personSchema(lang: Locale) {
  const t = dictionaries[lang];
  const url = `${site.url}/${lang}`;
  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    givenName: "Cyril",
    familyName: "de Lajudie",
    jobTitle: lang === "fr" ? "Ingénieur automatisation & infrastructure" : "Automation & Infrastructure Engineer",
    description: t.meta.description,
    image: `${site.url}${site.photo}`,
    email: `mailto:${site.email}`,
    url: site.url,
    sameAs: site.links.map((l) => l.href),
    address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "EPITECH" },
      { "@type": "CollegeOrUniversity", name: "Université Laval" },
    ],
    knowsLanguage: ["fr", "en"],
    knowsAbout: [...skills.automate, ...skills.host, ...skills.secure].flatMap((g) => g.lead),
    hasOccupation: {
      "@type": "Occupation",
      name: lang === "fr" ? "Ingénieur DevOps" : "DevOps Engineer",
      occupationLocation: { "@type": "City", name: "Paris" },
    },
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: ["en", "fr"] },
      { "@type": "ProfilePage", "@id": `${url}#page`, url, name: t.meta.title, inLanguage: lang, isPartOf: { "@id": `${site.url}/#website` }, mainEntity: { "@id": `${site.url}/#person` } },
      person,
    ],
  };
}
