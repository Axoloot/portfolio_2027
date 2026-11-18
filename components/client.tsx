"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("in"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

export function HeaderTone() {
  useEffect(() => {
    const h = document.getElementById("top");
    const line = document.getElementById("waterline");
    if (!h || !line) return;
    const on = () => {
      const deep = line.getBoundingClientRect().top + line.offsetHeight / 2 < h.offsetHeight;
      h.toggleAttribute("data-deep", deep);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);
  return null;
}

type Theme = "light" | "dark";

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, readTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "dark" ? labels.toDark : labels.toLight;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
      className="grid size-9 place-items-center rounded-full border border-current/25 transition-colors hover:border-current"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
          </g>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard?.writeText(email).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        })
      }
      className="h-12 rounded-full border border-rule-2 px-5 text-[15px] text-foam transition-colors hover:border-foam/40"
    >
      {copied ? done : label}
    </button>
  );
}

type Filter = "all" | "dev" | "ops";

export function FocusFilter({ labels }: { labels: { label: string; all: string; dev: string; ops: string } }) {
  const [f, setF] = useState<Filter>("all");
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-lean]").forEach((el) => {
      const lean = el.dataset.lean;
      const match = f === "all" || lean === f || lean === "both";
      el.style.opacity = match ? "" : "0.22";
    });
  }, [f]);
  const opts: { k: Filter; t: string; dot?: string }[] = [
    { k: "all", t: labels.all },
    { k: "dev", t: labels.dev, dot: "bg-sun" },
    { k: "ops", t: labels.ops, dot: "bg-glow" },
  ];
  return (
    <div role="group" aria-label={labels.label} className="flex flex-wrap gap-2">
      {opts.map((o) => (
        <button
          key={o.k}
          type="button"
          aria-pressed={f === o.k}
          onClick={() => setF(o.k)}
          className="flex items-center gap-2 rounded-full border border-rule-2 px-4 py-2 text-[15px] text-mist transition-colors hover:text-foam aria-pressed:border-foam aria-pressed:text-foam"
        >
          {o.dot && <span className={`size-2 rounded-full ${o.dot}`} />}
          {o.t}
        </button>
      ))}
    </div>
  );
}

const WIP_KEY = "wip-hidden";

function subscribeWip(cb: () => void) {
  addEventListener("storage", cb);
  addEventListener(WIP_KEY, cb);
  return () => {
    removeEventListener("storage", cb);
    removeEventListener(WIP_KEY, cb);
  };
}
const readWip = () => {
  try {
    return localStorage.getItem(WIP_KEY) === "1";
  } catch {
    return false;
  }
};

export function WipNote({ text, hide }: { text: string; hide: string }) {
  const hidden = useSyncExternalStore(subscribeWip, readWip, () => true);
  if (hidden) return null;
  return (
    <div role="note" className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-32px)] items-center gap-3 rounded-full bg-ink/90 py-2 pl-4 pr-2 text-[13px] leading-snug text-surface shadow-lg backdrop-blur">
      <span className="size-1.5 shrink-0 rounded-full bg-sun" />
      <span>{text}</span>
      <button
        type="button"
        aria-label={hide}
        title={hide}
        onClick={() => {
          try {
            localStorage.setItem(WIP_KEY, "1");
          } catch {}
          dispatchEvent(new Event(WIP_KEY));
        }}
        className="grid size-6 shrink-0 place-items-center rounded-full opacity-70 transition-opacity hover:opacity-100"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
          <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
