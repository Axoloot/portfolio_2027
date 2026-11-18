import Image from "next/image";
import type { Focus, Locale, Project } from "@/content/data";
import { lean } from "@/content/data";

export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <clipPath id="mark-c">
        <circle cx="12" cy="12" r="11" />
      </clipPath>
      <g clipPath="url(#mark-c)">
        <rect width="24" height="12.6" fill="var(--color-sun)" />
        <rect y="12.6" width="24" height="12" fill="var(--color-glow)" />
      </g>
      <path d="M0 12.6 Q3 11.2 6 12.6 T12 12.6 T18 12.6 T24 12.6" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
    </svg>
  );
}

export function Swell({ className = "", stroke, fill }: { className?: string; stroke: string; fill?: string }) {
  const seg = "q 60 -18 120 0 t 120 0";
  const d = `M0 24 ${Array(20).fill(seg).join(" ")}`;
  return (
    <svg viewBox="0 0 4800 48" preserveAspectRatio="none" className={`h-12 w-[200%] max-w-none shrink-0 ${className}`} aria-hidden>
      {fill && <path d={`${d} V48 H0Z`} fill={fill} />}
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-rule px-2.5 py-1 text-[13px] leading-none text-mist">{children}</span>;
}

export function SplitBar({ focus }: { focus: Focus }) {
  return (
    <div className="flex h-1 w-full gap-0.5 overflow-hidden rounded-full" aria-hidden>
      {focus.dev > 0 && <span className="bg-sun" style={{ width: `${focus.dev}%` }} />}
      {focus.ops > 0 && <span className="bg-glow" style={{ width: `${focus.ops}%` }} />}
    </div>
  );
}

export function LeanLabel({ focus, labels }: { focus: Focus; labels: { dev: string; ops: string; both: string } }) {
  const l = lean(focus);
  const cls = l === "dev" ? "text-sun" : l === "ops" ? "text-glow" : "text-foam";
  return <span className={`text-sm ${cls}`}>{l === "dev" ? labels.dev : l === "ops" ? labels.ops : labels.both}</span>;
}

export function ProjectMedia({ p, lang, empty }: { p: Project; lang: Locale; empty: string }) {
  const m = p.media[0];
  if (m?.type === "image")
    return <Image src={m.src} alt={m.alt[lang]} width={m.width} height={m.height} className="h-full w-full object-cover" sizes="(max-width: 1024px) 100vw, 640px" />;
  if (m?.type === "video")
    return <video src={m.src} poster={m.poster} aria-label={m.alt[lang]} className="h-full w-full object-cover" autoPlay muted loop playsInline />;
  return (
    <div className="flex h-full w-full flex-col justify-between bg-shallow/60 p-6">
      <span className="text-sm text-dim">{empty}</span>
      <span className="stretch-75 text-[clamp(44px,7vw,84px)] font-bold leading-[0.9] tracking-[-0.03em] text-foam/15">{p.title[lang]}</span>
    </div>
  );
}
