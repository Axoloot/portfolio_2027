import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import { dictionaries, hasLocale, locales } from "@/content/ui";
import { site } from "@/content/data";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], axes: ["wdth"] });

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

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
    alternates: { canonical: `/${lang}`, languages: { en: "/en", fr: "/fr" } },
    openGraph: {
      type: "profile",
      siteName: site.name,
      title: t.title,
      description: t.description,
      url: `/${lang}`,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans text-[17px] leading-relaxed">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: "Full Stack Developer & DevOps Engineer",
              address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
              url: site.url,
              sameAs: site.links.map((l) => l.href),
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
