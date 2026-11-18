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

export function Diver() {
  return (
    <div className="diver pointer-events-none absolute inset-x-0 top-[22%] -z-10" aria-hidden>
      <div className="diver-body">
        <svg width="150" height="52" viewBox="0 0 150 52">
          <g className="diver-bubbles" fill="none" stroke="var(--color-glow)" strokeWidth="1.2">
            <circle cx="10" cy="12" r="2.2" />
            <circle cx="6" cy="6" r="1.6" />
            <circle cx="13" cy="2.5" r="1.2" />
          </g>
          <g fill="var(--c-trench)">
            <ellipse cx="17" cy="26" rx="6.2" ry="5.6" />
            <path d="M22 24 C30 20.5 52 20 70 22.5 C76 23.3 80 25 80 27.5 C80 30.5 74 32 66 32 C48 32.5 30 32 23 30.5Z" />
            <rect x="33" y="15.5" width="30" height="7" rx="3.5" />
            <path d="M26 29 C22 31 18 33.5 14.5 36.2 L16.4 38.4 C20 36 24.5 33.6 28.6 32Z" />
            <g className="diver-kick">
              <path d="M78 25.5 C88 24 98 22.6 106 22 L107 26.4 C99 27.4 89 28.6 79.5 29.5Z" />
              <path d="M105 21.6 C116 20.4 128 18.6 141 16.6 C143 16.4 143.4 18.4 141.6 19 C130 21.8 119 24.4 107.6 26.6Z" />
            </g>
            <g className="diver-kick diver-kick-b">
              <path d="M78.5 28.5 C88 29.6 97 30.6 104 31.4 L103.4 35.6 C95 34.6 86.5 33 78 31.5Z" />
              <path d="M103 31 C114 32.4 126 34.2 138 36.6 C140 37 139.6 39.2 137.6 39.2 C125 38.6 113 37.6 102.6 35.8Z" />
            </g>
          </g>
          <path d="M10.5 23.2 h5 v6 h-5 a2 2 0 0 1 -1.6 -2 v-2 a2 2 0 0 1 1.6 -2z" fill="var(--color-glow)" opacity="0.55" />
        </svg>
      </div>
    </div>
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
