import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/data";
import { dictionaries, hasLocale } from "@/content/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaries[lang].cvPage;
  return { title: t.title, alternates: { canonical: `/${lang}/cv` } };
}

export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = dictionaries[lang].cvPage;

  return (
    <main className="flex h-dvh flex-col bg-deep text-foam">
      <header className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule px-[clamp(16px,4vw,48px)] py-3">
        <Link href={`/${lang}`} className="text-[15px] text-mist transition-colors hover:text-foam">
          ← {site.name}
        </Link>
        <p className="text-sm text-dim">{t.note}</p>
        <a
          href={site.cv}
          download="Cyril-de-Lajudie-CV.pdf"
          className="ml-auto inline-flex h-10 items-center rounded-full bg-sun px-5 text-[15px] font-medium text-[#0b2230] transition-opacity hover:opacity-90"
        >
          {t.download}
        </a>
      </header>
      <div className="flex-1 overflow-y-auto bg-shallow/40 px-[clamp(16px,4vw,48px)] py-8">
        <div className="mx-auto flex max-w-[860px] flex-col gap-6">
          {site.cvPages.map((pg, i) => (
            <Image
              key={pg.src}
              src={pg.src}
              width={pg.width}
              height={pg.height}
              alt={`${t.title}, page ${i + 1}`}
              priority={i === 0}
              sizes="(max-width: 900px) 100vw, 860px"
              className="h-auto w-full rounded-sm bg-white shadow-[0_8px_40px_rgb(0_0_0/0.35)]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
