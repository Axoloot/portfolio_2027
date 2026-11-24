"use client";

import { useEffect, useState } from "react";

const BUILD = process.env.NEXT_PUBLIC_BUILD_TIME ?? "";
const COMMIT = process.env.NEXT_PUBLIC_COMMIT ?? "";

function ago(iso: string, lang: string) {
  const s = (Date.parse(iso) - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [u, n] of units) if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u);
  return rtf.format(Math.round(s), "second");
}

/** Footer status line in the style of an ops status page, with the build's real deploy time and commit. */
export function SiteStatus({ lang, t, repo }: { lang: string; t: { ok: string; deployed: string; how: string; steps: [string, string][] }; repo: string }) {
  const [when, setWhen] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!BUILD) return;
    const tick = () => setWhen(ago(BUILD, lang));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [lang]);
  return (
    <div className="w-full">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-glow opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-glow" />
        </span>
        <span className="text-mist">{t.ok}</span>
        {when && (
          <>
            <span aria-hidden>·</span>
            <span>
              {t.deployed} {when}
            </span>
          </>
        )}
        {COMMIT && (
          <>
            <span aria-hidden>·</span>
            <a href={`${repo}/commit/${COMMIT}`} target="_blank" rel="noopener" className="font-mono text-[12px] underline decoration-rule-2 underline-offset-4 hover:decoration-foam">
              {COMMIT}
            </a>
          </>
        )}
        <span aria-hidden>·</span>
        <button type="button" aria-expanded={open} aria-controls="ops-panel" onClick={() => setOpen((o) => !o)} className="underline decoration-rule-2 underline-offset-4 hover:decoration-foam">
          {t.how}
        </button>
      </p>
      {open && (
        <ol id="ops-panel" className="mt-5 grid gap-3 text-[14px] leading-snug md:grid-cols-4 md:gap-0">
          {t.steps.map(([k, v], i) => (
            <li key={k} className="relative rounded-md border border-rule bg-deep/50 p-4 md:mr-6">
              <p className="font-mono text-[13px] text-glow">
                {String(i + 1).padStart(2, "0")} · {k}
              </p>
              <p className="mt-2 text-mist">{v}</p>
              {i < t.steps.length - 1 && (
                <span aria-hidden className="absolute -right-[22px] top-1/2 hidden -translate-y-1/2 text-dim md:block">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
