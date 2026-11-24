import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { about, automations, careerMix, education, impact, lean, projects, roles, site, skills, type L, type Locale, type SkillGroup } from "@/content/data";
import { dictionaries, hasLocale } from "@/content/ui";
import { CopyEmail, FocusFilter, HeaderTone, RevealObserver, ThemeToggle } from "@/components/client";
import { LeanLabel, Mark, ProjectMedia, SplitBar, Swell, Tag } from "@/components/ui";
import { Sea } from "@/components/sea";
import { Gulls } from "@/components/gulls";
import { Creatures } from "@/components/creatures";

const wrap = "mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,48px)]";
const link = "underline decoration-1 underline-offset-[5px] transition-colors";
const dash = "relative pl-5 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2.5 before:bg-dim";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = dictionaries[lang];
  const mix = careerMix();
  const other: Locale = lang === "en" ? "fr" : "en";
  const tl = (x: L) => x[lang];

  return (
    <>

      <a href="#main" className="absolute -left-[9999px] top-2 z-[100] rounded bg-sun px-3 py-2 text-ink focus:left-2">
        {t.nav.skip}
      </a>

      <header
        id="top"
        className="on-surface sticky top-0 z-50 border-b border-transparent bg-sky-top/80 text-ink backdrop-blur-xl transition-colors duration-300 data-[deep]:border-rule data-[deep]:bg-header-deep data-[deep]:text-foam"
      >
        <div className={`${wrap} flex h-16 items-center gap-6`}>
          <a href="#main" className="flex items-center gap-2.5 whitespace-nowrap text-[17px] font-semibold tracking-tight">
            <Mark />
            {site.name}
          </a>
          <nav aria-label="Sections" className="ml-auto hidden gap-7 whitespace-nowrap text-[15px] lg:flex">
            {(["automation", "experience", "skills", "about", "contact"] as const).map((k) => (
              <a key={k} href={`#${k}`} className="opacity-65 transition-opacity hover:opacity-100">
                {t.nav[k]}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4 whitespace-nowrap text-[15px] lg:ml-6">
            <ThemeToggle labels={{ toDark: t.nav.toDark, toLight: t.nav.toLight }} />
            <Link href={`/${other}`} hrefLang={other} lang={other} className="opacity-65 transition-opacity hover:opacity-100">
              {other === "fr" ? "Français" : "English"}
            </Link>
            <Link href={`/${lang}/cv`} className="rounded-full border border-current/25 px-3.5 py-1.5 transition-colors hover:border-current">
              {t.nav.cv}
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <div className="sky on-surface overflow-x-clip text-ink">
          <div className="stars" aria-hidden />
          <div className="sun right-[-24px] top-[72px] size-[clamp(72px,10vw,140px)] sm:right-[7%]" aria-hidden />
          <div className="moon right-[-24px] top-[72px] size-[clamp(72px,10vw,140px)] sm:right-[7%]" aria-hidden />
          <Gulls />
          <div className={`${wrap} relative pb-16 pt-[clamp(48px,9vw,112px)]`}>
            <div className="flex items-center gap-4">
              <Image
                src="/avatar.jpg"
                alt={t.meta.photoAlt}
                width={240}
                height={240}
                priority
                className="size-16 shrink-0 rounded-full object-cover ring-2 ring-ink/10"
              />
              <p className="flex items-center gap-2.5 text-[15px] text-ink-soft">
                <span className="size-2 shrink-0 rounded-full bg-sun ring-4 ring-sun/25" />
                {t.status}
              </p>
            </div>
            <h1 className="stretch-125 mt-6 text-[clamp(48px,9.2vw,132px)] font-bold leading-[0.88] tracking-[-0.04em]">
              Cyril{" "}
              <br />
              de Lajudie
            </h1>
            <p className="mt-4 text-[clamp(18px,1.8vw,22px)] font-semibold tracking-tight text-ink-soft">{t.hero.keywords}</p>

            <div className="mt-[clamp(40px,6vw,72px)] grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
              <div>
                <p className="stretch-112 text-[clamp(24px,2.8vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">{t.hero.role}</p>
                <p className="mt-4 max-w-[34em] text-[clamp(17px,1.5vw,19px)] text-ink-soft">{t.hero.lede}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${site.email}`} className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-surface transition-colors hover:bg-shallow">
                    {t.hero.email}
                  </a>
                  <Link
                    href={`/${lang}/cv`}
                    className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-[15px] font-medium transition-colors hover:border-ink"
                  >
                    {t.hero.cv}
                  </Link>
                </div>
              </div>

              <section aria-labelledby="results-h">
                <h2 id="results-h" className="text-[15px] text-ink-soft">
                  {t.results.title}
                </h2>
                <ul className="mt-3">
                  {impact.map((m) => (
                    <li key={m.delta} className="grid grid-cols-[96px_1fr] items-baseline gap-4 border-t border-rule-ink py-4">
                      <span className="stretch-112 text-[34px] font-semibold leading-none tracking-[-0.03em] tabular-nums">{m.delta}</span>
                      <span>
                        <span className="block font-medium">{tl(m.name)}</span>
                        <span className="block text-[15px] leading-snug text-ink-soft">{tl(m.how)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="relative z-10">
            <div className={`${wrap} flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-3 pt-4`}>
              <p className="stretch-112 flex items-baseline gap-2 text-[clamp(28px,3.2vw,40px)] font-bold leading-none tracking-[-0.03em] tabular-nums">
                {mix.dev}%<span className="stretch-100 text-[17px] font-semibold tracking-tight text-sun-ink">{t.waterline.devTitle}</span>
              </p>
              <p className="text-[15px] text-ink-soft">{t.waterline.devText}</p>
            </div>
          </div>
          <div id="waterline" className="relative h-12" aria-hidden>
            <div className="swells absolute inset-0 overflow-hidden">
              <div className="swell-slow absolute inset-x-0 bottom-0 flex">
                <Swell stroke="transparent" fill="color-mix(in srgb, var(--c-shallow) 40%, transparent)" />
              </div>
              <div className="swell absolute inset-x-0 bottom-0 flex">
                <Swell stroke="var(--color-glow)" fill="var(--c-shallow)" />
              </div>
            </div>
            <Sea />
          </div>
        </div>
        <div className="bg-shallow text-foam" role="group" aria-label={t.waterline.label}>
            <div className={`${wrap} relative z-10 flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-6 pt-2`}>
              <p className="stretch-112 flex items-baseline gap-2 text-[clamp(28px,3.2vw,40px)] font-bold leading-none tracking-[-0.03em] tabular-nums text-glow">
                {mix.ops}%<span className="stretch-100 text-[17px] font-semibold tracking-tight">{t.waterline.opsTitle}</span>
              </p>
              <p className="text-[15px] text-foam/85">{t.waterline.opsText}</p>
              <p className="w-full text-sm text-mist">{t.waterline.label}</p>
            </div>
        </div>

        <div className="relative isolate bg-[linear-gradient(to_bottom,var(--color-shallow)_0,var(--color-deep)_900px,var(--color-abyss)_45%,var(--color-trench)_100%)] text-foam">
          <Creatures />
          <section id="automation" className={`${wrap} pb-16 pt-20`}>
            <h2 className="stretch-112 text-[clamp(40px,6vw,76px)] font-bold leading-[0.95] tracking-[-0.035em]">{t.automation.title}</h2>
            <p className="mt-4 max-w-[34em] text-mist">{t.automation.intro}</p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {automations.map((a) => (
                <article key={a.where.en} className="rv flex flex-col rounded-lg border border-rule bg-deep/40 p-6">
                  <h3 className="font-semibold">{tl(a.where)}</h3>
                  <dl className="mt-5 space-y-4 text-[15px] leading-snug">
                    <div>
                      <dt className="text-sm text-dim">{t.automation.before}</dt>
                      <dd className="mt-1 text-mist">{tl(a.before)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-sun">{t.automation.after}</dt>
                      <dd className="mt-1 text-foam">{tl(a.after)}</dd>
                    </div>
                    {a.gain && <dd className="stretch-112 text-[24px] font-semibold tracking-[-0.02em] text-sun">{tl(a.gain)}</dd>}
                  </dl>
                  <p className="mt-auto pt-6 text-sm text-dim">
                    {t.automation.runs}: <span className="text-mist">{tl(a.runs)}</span>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className={`${wrap} pb-28 pt-16`}>
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="stretch-112 text-[clamp(40px,6vw,76px)] font-bold leading-[0.95] tracking-[-0.035em]">{t.experience.title}</h2>
                <p className="mt-4 max-w-[34em] text-mist">{t.experience.intro}</p>
              </div>
              <FocusFilter labels={{ label: t.experience.filterLabel, all: t.experience.all, dev: t.experience.dev, ops: t.experience.ops }} />
            </div>


            <ol className="mt-14 border-t border-rule">
              {roles.map((r, i) => (
                <li
                  key={r.start + i}
                  data-lean={lean(r.focus) ?? "none"}
                  className="grid gap-3 border-b border-rule py-9 transition-opacity duration-300 md:grid-cols-[220px_1fr] md:gap-10"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:flex-col md:items-start">
                    <span className="text-[15px] tabular-nums text-mist">{tl(r.when)}</span>
                    {r.focus && !r.minor && (
                      <div className="flex w-28 flex-col gap-2">
                        <SplitBar focus={r.focus} />
                        <LeanLabel focus={r.focus} labels={t.experience} />
                      </div>
                    )}
                    {r.kind && <span className="text-sm text-mist">{tl(r.kind)}</span>}
                  </div>
                  <div>
                    <h3 className="stretch-100 text-[clamp(22px,2.2vw,28px)] font-semibold leading-tight tracking-[-0.02em]">
                      {tl(r.company)}
                      <span className="sr-only">, </span>
                      {tl(r.role) &&
                        (r.href ? (
                          <a href={r.href} className={`${link} ml-3 text-[17px] font-normal tracking-normal text-mist decoration-glow hover:text-glow`}>
                            {tl(r.role)}
                          </a>
                        ) : (
                          <span className="ml-3 text-[17px] font-normal tracking-normal text-mist">{tl(r.role)}</span>
                        ))}
                    </h3>
                    {r.bullets && (
                      <ul className="mt-4 max-w-[44em] space-y-2 text-foam/85">
                        {r.bullets[lang].map((b) => (
                          <li key={b} className={dash}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {r.tags && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {r.tags.map((x) => (
                          <Tag key={x}>{x}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-8 md:ml-[260px] md:grid-cols-3">
              {education.map((e) => (
                <div key={e.title}>
                  <p className="text-sm tabular-nums text-dim">{e.when}</p>
                  <h4 className="mt-1.5 font-semibold">{e.title}</h4>
                  <p className="mt-1 text-[15px] leading-snug text-mist">{tl(e.text)}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 md:ml-[260px]">
              <Link href={`/${lang}/cv`} className={`${link} decoration-sun hover:text-sun`}>
                {t.experience.resume}
              </Link>
            </p>
          </section>

          <section id="projects" className={`${wrap} pb-28 pt-12`}>
            <h2 className="stretch-100 text-[clamp(40px,6vw,76px)] font-bold leading-[0.95] tracking-[-0.035em]">{t.projects.title}</h2>
            <p className="mt-4 max-w-[34em] text-mist">{t.projects.intro}</p>
            <div className="mt-14 space-y-16">
              {projects.map((p, i) => (
                <article key={p.slug} id={`project-${p.slug}`} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={`aspect-[16/10] overflow-hidden rounded-lg ${i % 2 ? "lg:order-2" : ""}`}>
                    <ProjectMedia p={p} lang={lang} empty={t.projects.noMedia} />
                  </div>
                  <div>
                    <p className="text-[15px] text-mist">
                      {tl(p.kind)}
                      {p.when && <>, {p.when}</>}
                    </p>
                    <h3 className="stretch-100 mt-2 text-[clamp(28px,3vw,40px)] font-bold leading-none tracking-[-0.03em]">{tl(p.title)}</h3>
                    {p.badge && <p className="mt-4 text-sun">{tl(p.badge)}</p>}
                    <p className="mt-4 text-foam/85">{tl(p.summary)}</p>
                    {p.bullets && (
                      <ul className="mt-3 space-y-2 text-foam/85">
                        {p.bullets[lang].map((b) => (
                          <li key={b} className={dash}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((x) => (
                        <Tag key={x}>{x}</Tag>
                      ))}
                    </div>
                    {p.links.length > 0 && (
                      <p className="mt-6 flex flex-wrap gap-6">
                        {p.links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noopener" className={`${link} decoration-glow hover:text-glow`}>
                            {tl(l.label)}
                          </a>
                        ))}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className={`${wrap} pb-28 pt-12`}>
            <h2 className="stretch-88 text-[clamp(40px,6vw,76px)] font-bold leading-[0.95] tracking-[-0.035em]">{t.skills.title}</h2>
            <p className="mt-4 max-w-[34em] text-mist">{t.skills.intro}</p>
            <div className="mt-14 grid gap-14 lg:grid-cols-3 lg:gap-12">
              <SkillColumn title={t.skills.automate} sub={t.skills.automateSub} tone="sun" groups={skills.automate} lang={lang} />
              <SkillColumn title={t.skills.host} sub={t.skills.hostSub} tone="glow" groups={skills.host} lang={lang} />
              <SkillColumn title={t.skills.secure} sub={t.skills.secureSub} tone="foam" groups={skills.secure} lang={lang} />
            </div>
            <p className="mt-10 text-foam/85">
              <span className="font-semibold text-foam">{t.skills.spoken}</span> · {t.skills.spokenValue}
            </p>
          </section>

          <section id="about" className={`${wrap} pb-20 pt-12`}>
            <h2 className="stretch-100 text-[clamp(40px,6vw,76px)] font-bold leading-[0.95] tracking-[-0.035em]">{t.about.title}</h2>
            <div className="mt-12 grid gap-x-20 border-t border-rule md:grid-cols-2">
              {about.map((a) => (
                <div key={a.id} id={a.id} className="scroll-mt-20 border-b border-rule py-6">
                  <h3 className="font-semibold">{tl(a.title)}</h3>
                  <p className="mt-2 max-w-[34em] whitespace-pre-line text-foam/85">{tl(a.text)}</p>
                </div>
              ))}
            </div>
          </section>


          <section id="contact" className={`${wrap} pb-14 pt-16`}>
            <h2 className="stretch-75 max-w-[11em] text-[clamp(44px,8vw,112px)] font-bold leading-[0.9] tracking-[-0.03em]">{t.contact.title}</h2>
            <p className="mt-6 max-w-[34em] text-mist">{t.contact.sub}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-12 block break-all text-[clamp(22px,3.4vw,44px)] font-semibold tracking-[-0.02em] underline decoration-sun decoration-2 underline-offset-[10px] transition-colors hover:text-sun"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CopyEmail email={site.email} label={t.contact.copy} done={t.contact.copied} />
              <Link href={`/${lang}/cv`} className="inline-flex h-12 items-center rounded-full border border-rule-2 px-5 text-[15px] transition-colors hover:border-foam/40">
                {t.hero.cv}
              </Link>
            </div>
            <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {site.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className={`${link} decoration-rule-2 hover:decoration-foam`}>
                  {l.label}
                </a>
              ))}
            </p>
            <footer className="mt-28 flex flex-col justify-between gap-3 border-t border-rule pt-6 text-sm text-dim sm:flex-row">
              <span className="flex items-center gap-2.5">
                <Mark size={16} /> © 2026 {site.name}
              </span>
              <span className="flex gap-6">
                <a href="/old" className={`${link} decoration-rule-2 hover:decoration-foam`}>{t.old}</a>
                <span>{t.footer}</span>
              </span>
            </footer>
          </section>
        </div>
      </main>

      <RevealObserver />
      <HeaderTone />
    </>
  );
}

function SkillColumn({ title, sub, tone, groups, lang }: { title: string; sub: string; tone: "sun" | "glow" | "foam"; groups: SkillGroup[]; lang: Locale }) {
  const dot = { sun: "bg-sun", glow: "bg-glow", foam: "bg-foam" }[tone];
  const lead = { sun: "text-sun", glow: "text-glow", foam: "text-foam" }[tone];
  return (
    <div>
      <div className="border-b border-rule pb-4">
        <div className="flex items-baseline gap-3">
          <span className={`size-2.5 rounded-full ${dot}`} />
          <h3 className="stretch-112 text-[28px] font-bold tracking-[-0.02em]">{title}</h3>
        </div>
        <p className="mt-1 text-[15px] text-mist">{sub}</p>
      </div>
      {groups.map((g) => (
        <SkillRow key={g.title.en} g={g} lang={lang} lead={lead} />
      ))}
    </div>
  );
}

function SkillRow({ g, lang, lead }: { g: SkillGroup; lang: Locale; lead: string }) {
  return (
    <div className="border-b border-rule py-6">
      <h4 className="font-semibold">{g.title[lang]}</h4>
      <p className="mt-2 leading-relaxed">
        {g.lead.map((s) => (
          <span key={s} className={`mr-4 inline-block ${lead}`}>
            {s}
          </span>
        ))}
        {g.other.map((s) => (
          <span key={s} className="mr-4 inline-block text-mist">
            {s}
          </span>
        ))}
      </p>
      <p className="mt-2 text-[15px] leading-snug text-dim">{g.proof[lang]}</p>
    </div>
  );
}
