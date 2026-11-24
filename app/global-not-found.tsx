import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./[lang]/globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], axes: ["wdth"] });

export const metadata: Metadata = {
  title: "404 · Cyril de Lajudie",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" className={`${archivo.variable} antialiased`}>
      <body className="flex min-h-screen items-center bg-trench font-sans text-[17px] leading-relaxed text-foam">
        <main className="mx-auto w-full max-w-[720px] px-[clamp(16px,4vw,48px)] py-20">
          <p className="stretch-112 text-[clamp(72px,14vw,160px)] font-bold leading-none tracking-[-0.04em] text-glow">404</p>
          <h1 className="mt-6 text-[clamp(24px,3vw,32px)] font-semibold tracking-tight">This page sank.</h1>
          <p className="mt-2 text-mist" lang="fr">Cette page a coulé.</p>
          <p className="mt-10 flex flex-wrap gap-6">
            <a href="/en" className="underline decoration-glow underline-offset-[5px] hover:text-glow">
              Back to the portfolio
            </a>
            <a href="/fr" lang="fr" className="underline decoration-glow underline-offset-[5px] hover:text-glow">
              Retour au portfolio
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
