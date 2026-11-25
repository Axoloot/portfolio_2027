import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/content/data";
import { Mark, Swell } from "@/components/ui";
import "./[lang]/globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], axes: ["wdth"] });

export const metadata: Metadata = {
  title: "404 · Cyril de Lajudie",
  robots: { index: false },
};

// Same theme as the site, and the visitor's language: /fr/… or a French browser shows French, the rest English.
// Without JavaScript, both languages show.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t}catch(e){d.dataset.theme="light"}var p=location.pathname,l=/^\\/fr(\\/|$)/.test(p)?"fr":/^\\/en(\\/|$)/.test(p)?"en":((navigator.language||"").toLowerCase().indexOf("fr")===0?"fr":"en");d.lang=l;d.dataset.l=l})()`;

const wrap = "mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,48px)]";
const button = "inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium transition-colors";

const copy = {
  en: {
    title: "Page not found",
    text: "No page lives at this address. It may have moved when the site was rebuilt.",
    home: "Back to the portfolio",
    cv: "See my CV",
    or: "Or write to me:",
  },
  fr: {
    title: "Page introuvable",
    text: "Aucune page ne se trouve à cette adresse. Elle a peut-être changé lors de la refonte du site.",
    home: "Retour au portfolio",
    cv: "Voir mon CV",
    or: "Ou écrivez-moi :",
  },
} as const;

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-trench font-sans text-[17px] leading-relaxed">
        <div className="sky on-surface overflow-x-clip text-ink">
          <div className="stars" aria-hidden />
          <div className="sun right-[-24px] top-[72px] size-[clamp(72px,10vw,140px)] sm:right-[7%]" aria-hidden />
          <div className="moon right-[-24px] top-[72px] size-[clamp(72px,10vw,140px)] sm:right-[7%]" aria-hidden />
          <header className={`${wrap} relative flex h-16 items-center`}>
            <a href="/" className="flex items-center gap-2.5 whitespace-nowrap text-[17px] font-semibold tracking-tight">
              <Mark />
              {site.name}
            </a>
          </header>
          <div className={`${wrap} relative pb-10 pt-[clamp(32px,7vw,88px)]`}>
            <p className="stretch-125 text-[clamp(96px,20vw,240px)] font-bold leading-[0.8] tracking-[-0.05em]">404</p>
          </div>
          <div className="relative h-12" aria-hidden>
            <div className="absolute inset-0 overflow-hidden">
              <div className="swell-slow absolute inset-x-0 bottom-0 flex">
                <Swell stroke="transparent" fill="color-mix(in srgb, var(--c-shallow) 40%, transparent)" />
              </div>
              <div className="swell absolute inset-x-0 bottom-0 flex">
                <Swell stroke="var(--color-glow)" fill="var(--c-shallow)" />
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 bg-[linear-gradient(to_bottom,var(--color-shallow)_0,var(--color-deep)_45%,var(--color-trench)_100%)] text-foam">
          <div className={`${wrap} grid gap-x-16 gap-y-14 pb-24 pt-12 md:grid-cols-[auto_1fr]`}>
            <p className="stretch-112 text-[15px] font-semibold tabular-nums text-glow" aria-hidden>
              −404 m
            </p>
            <div className="grid gap-14 not-found-langs">
              {(["en", "fr"] as const).map((l) => (
                <section key={l} lang={l} data-only={l} className="max-w-[36em]">
                  <h1 className="stretch-112 text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.05] tracking-[-0.03em]">{copy[l].title}</h1>
                  <p className="mt-4 text-mist">{copy[l].text}</p>
                  <p className="mt-8 flex flex-wrap gap-3">
                    <a href={`/${l}`} className={`${button} bg-sun text-[#0b2230] hover:opacity-90`}>
                      {copy[l].home}
                    </a>
                    <a href={`/${l}/cv`} className={`${button} border border-rule-2 hover:border-foam/40`}>
                      {copy[l].cv}
                    </a>
                  </p>
                  <p className="mt-8 text-[15px] text-mist">
                    {copy[l].or}{" "}
                    <a href={`mailto:${site.email}`} className="text-foam underline decoration-glow underline-offset-[5px] hover:text-glow">
                      {site.email}
                    </a>
                  </p>
                </section>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
