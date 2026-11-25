"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export type Section = { id: string; label: string };

/** Tracks which section is under the header, for the nav, the depth gauge and the menu. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const on = () => {
      const line = innerHeight * 0.35;
      let cur: string | null = null;
      for (const el of els)
        if (el.getBoundingClientRect().top <= line) cur = el.id;
      setActive(cur);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, [ids]);
  return active;
}

export function SectionNav({
  sections,
  label,
}: {
  sections: Section[];
  label: string;
}) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);
  return (
    <nav
      aria-label={label}
      className="ml-auto hidden gap-6 whitespace-nowrap text-[15px] lg:flex"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-current={active === s.id ? "location" : undefined}
          className="relative opacity-65 transition-opacity after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform hover:opacity-100 aria-[current]:opacity-100 aria-[current]:after:scale-x-100"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

export function MobileMenu({
  sections,
  labels,
  cvHref,
  email,
}: {
  sections: Section[];
  labels: { menu: string; close: string; cv: string; email: string };
  cvHref: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.menu}
        onClick={() => setOpen((o) => !o)}
        className="grid size-9 place-items-center rounded-full border border-current/25 transition-colors hover:border-current"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden
          className="transition-transform"
        >
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" />
            )}
          </g>
        </svg>
      </button>
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-deep/97 px-[clamp(16px,4vw,48px)] pb-10 pt-6 text-foam backdrop-blur-xl"
          >
            <ul className="border-t border-rule">
              {sections.map((s, i) => (
                <li key={s.id} className="border-b border-rule">
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? "location" : undefined}
                    className="flex items-baseline justify-between py-4 text-[28px] font-semibold tracking-[-0.02em] aria-[current]:text-glow"
                  >
                    {s.label}
                    <span className="text-sm font-normal tabular-nums text-dim">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex h-12 items-center rounded-full bg-sun px-6 text-[15px] font-medium text-[#0b2230]"
              >
                {labels.email}
              </a>
              <a
                href={cvHref}
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center rounded-full border border-rule-2 px-6 text-[15px]"
              >
                {labels.cv}
              </a>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

/** Bottom bar on phones: appears once the hero buttons are off screen, hides at the contact section. */
export function MobileBar({
  labels,
  cvHref,
  email,
}: {
  labels: { email: string; cv: string };
  cvHref: string;
  email: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const start = document.getElementById("results-h");
      const end = document.getElementById("contact");
      if (!start || !end) return;
      const past = start.getBoundingClientRect().top < 0;
      const atEnd = end.getBoundingClientRect().top < innerHeight * 0.9;
      setShow(past && !atEnd);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-deep/90 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl transition-transform duration-300 lg:hidden ${show ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-[560px] gap-2.5">
        <a
          tabIndex={show ? 0 : -1}
          href={`mailto:${email}`}
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-sun text-[15px] font-medium text-[#0b2230]"
        >
          {labels.email}
        </a>
        <a
          tabIndex={show ? 0 : -1}
          href={cvHref}
          className="flex h-11 flex-1 items-center justify-center rounded-full border border-rule-2 text-[15px] text-foam"
        >
          {labels.cv}
        </a>
      </div>
    </div>
  );
}

/** Depth gauge: from the waterline to the bottom of the page, read as metres below the surface. */
const MAX_DEPTH = 2000;
export function DepthGauge({
  sections,
  label,
}: {
  sections: Section[];
  label: string;
}) {
  const [state, setState] = useState<{
    on: boolean;
    depth: number;
    marks: { id: string; at: number }[];
  }>({ on: false, depth: 0, marks: [] });
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);
  useEffect(() => {
    const line = document.getElementById("waterline");
    if (!line) return;
    const on = () => {
      const surface =
        line.getBoundingClientRect().top + scrollY + line.offsetHeight / 2;
      const bottom = document.documentElement.scrollHeight - innerHeight;
      const span = Math.max(1, bottom - surface + innerHeight * 0.5);
      const pos = scrollY + innerHeight * 0.5 - surface;
      const marks = ids.map((id) => {
        const el = document.getElementById(id);
        const y = el ? el.getBoundingClientRect().top + scrollY - surface : 0;
        return { id, at: Math.min(1, Math.max(0, y / span)) };
      });
      setState({
        on: pos > 0,
        depth:
          Math.round((Math.min(1, Math.max(0, pos / span)) * MAX_DEPTH) / 10) *
          10,
        marks,
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, [ids]);
  const frac = state.depth / MAX_DEPTH;
  return (
    <nav
      aria-label={label}
      className={`fixed right-5 top-1/2 z-30 hidden h-[52vh] -translate-y-1/2 transition-opacity duration-500 xl:block ${state.on ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="relative h-full w-px bg-foam/20">
        <div
          className="absolute left-0 top-0 w-px bg-glow transition-[height] duration-150"
          style={{ height: `${frac * 100}%` }}
        />
        {state.marks.map((m) => {
          const s = sections.find((x) => x.id === m.id)!;
          const cur = active === m.id;
          return (
            <a
              key={m.id}
              href={`#${m.id}`}
              tabIndex={state.on ? 0 : -1}
              aria-current={cur ? "location" : undefined}
              className="group absolute right-0 flex -translate-y-1/2 translate-x-[3.5px] items-center gap-3"
              style={{ top: `${m.at * 100}%` }}
            >
              <span
                className={`whitespace-nowrap text-xs transition-opacity ${cur ? "text-glow opacity-100" : "text-mist opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
              >
                {s.label}
              </span>
              <span
                className={`size-2 rounded-full border transition-colors ${cur ? "border-glow bg-glow" : "border-foam/40 bg-deep group-hover:border-foam"}`}
              />
            </a>
          );
        })}
        <span
          className="absolute right-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-deep/80 px-2 py-0.5 text-xs tabular-nums text-glow backdrop-blur"
          style={{ top: `${frac * 100}%` }}
          aria-hidden
        >
          −{state.depth.toLocaleString("en").replace(",", " ")} m
        </span>
      </div>
    </nav>
  );
}

/** Counts a figure like "−75%" up from 0 when it enters the screen. Static for reduced motion. */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  const [n, setN] = useState(m ? Number(m[2]) : 0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (
      !m ||
      !ref.current ||
      !matchMedia("(prefers-reduced-motion: no-preference)").matches
    )
      return;
    const target = Number(m[2]);
    const el = ref.current;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 900);
        setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  if (!m) return <>{value}</>;
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        {m[1]}
        {n}
        {m[3]}
      </span>
    </span>
  );
}

type Use = { label: string; href: string };

/** A skill group's tools. Clicking a tool shows one "Used at" line under the group, linking to roles and projects. */
export function ToolRow({
  lead,
  other,
  tone,
  uses,
  usedAt,
  more,
}: {
  lead: string[];
  other: string[];
  tone: string;
  uses: Record<string, Use[]>;
  usedAt: string;
  more: string;
}) {
  const [sel, setSel] = useState<string | null>(null);
  // Show the lead tools and the first few others; the rest stay in the HTML, folded behind "+N more".
  const SHOWN = 3;
  const [all, setAll] = useState(other.length <= SHOWN + 1);
  const chip = (name: string, cls: string) =>
    uses[name]?.length ? (
      <button
        key={name}
        type="button"
        aria-pressed={sel === name}
        onClick={() => setSel((s) => (s === name ? null : name))}
        className={`mr-4 inline-block ${cls} underline decoration-current/30 decoration-dotted underline-offset-4 transition-colors hover:decoration-current aria-pressed:decoration-solid`}
      >
        {name}
      </button>
    ) : (
      <span key={name} className={`mr-4 inline-block ${cls}`}>
        {name}
      </span>
    );
  return (
    <>
      <p className="mt-2 leading-relaxed">
        {lead.map((n) => chip(n, tone))}
        {other.slice(0, SHOWN).map((n) => chip(n, "text-mist"))}
        {other.length > SHOWN && (
          <span className={all ? "contents" : "hidden"}>{other.slice(SHOWN).map((n) => chip(n, "text-mist"))}</span>
        )}
        {!all && (
          <button
            type="button"
            onClick={() => setAll(true)}
            className="inline-block text-[15px] text-dim underline decoration-dotted underline-offset-4 transition-colors hover:text-foam"
          >
            +{other.length - SHOWN} {more}
          </button>
        )}
      </p>
      {sel && (
        <p
          role="status"
          className="mt-2 rounded-md border border-rule bg-deep/60 px-3 py-2 text-[14px] leading-snug text-mist"
        >
          <span className="text-foam">{sel}</span> · {usedAt}:{" "}
          {uses[sel].map((u, i) => (
            <span key={u.href}>
              {i > 0 && ", "}
              <a
                href={u.href}
                className="text-foam underline decoration-rule-2 underline-offset-4 hover:decoration-foam"
              >
                {u.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </>
  );
}

type Cmd = {
  id: string;
  label: string;
  group: string;
  run: () => void | Promise<void>;
};

export function CommandMenu({
  sections,
  t,
  other,
  cvHref,
  email,
  links,
}: {
  sections: Section[];
  t: {
    open: string;
    placeholder: string;
    empty: string;
    goto: string;
    theme: string;
    lang: string;
    copy: string;
    copied: string;
    cv: string;
    hint: string;
  };
  other: string;
  cvHref: string;
  email: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setSel(0);
  }, []);

  const cmds: Cmd[] = useMemo(
    () => [
      ...sections.map((s) => ({
        id: `s-${s.id}`,
        group: t.goto,
        label: s.label,
        run: () =>
          document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "theme",
        group: "",
        label: t.theme,
        run: () => {
          const next =
            document.documentElement.dataset.theme === "dark"
              ? "light"
              : "dark";
          document.documentElement.dataset.theme = next;
          try {
            localStorage.setItem("theme", next);
          } catch {}
        },
      },
      {
        id: "lang",
        group: "",
        label: t.lang,
        run: () => router.push(`/${other}`),
      },
      {
        id: "copy",
        group: "",
        label: t.copy,
        run: async () => {
          await navigator.clipboard?.writeText(email);
          setToast(t.copied);
          setTimeout(() => setToast(null), 1800);
        },
      },
      { id: "cv", group: "", label: t.cv, run: () => router.push(cvHref) },
      ...links.map((l) => ({
        id: `l-${l.label}`,
        group: "",
        label: l.label,
        run: () => void window.open(l.href, "_blank", "noopener"),
      })),
    ],
    [sections, t, other, cvHref, email, links, router],
  );

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s
      ? cmds.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(s))
      : cmds;
  }, [cmds, q]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  const run = async (c: Cmd | undefined) => {
    if (!c) return;
    close();
    await c.run();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        title={t.open}
        className="hidden h-9 items-center gap-1.5 rounded-full border border-current/25 px-3 text-[13px] opacity-80 transition hover:border-current hover:opacity-100 lg:flex"
      >
        <kbd className="font-sans">⌘</kbd>
        <kbd className="font-sans">K</kbd>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-trench/60 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.open}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] overflow-hidden rounded-xl border border-rule-2 bg-deep text-foam shadow-[0_24px_80px_rgb(0_0_0/0.5)]"
          >
            <input
              ref={input}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") close();
                else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSel((i) => Math.min(list.length - 1, i + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSel((i) => Math.max(0, i - 1));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  run(list[sel]);
                }
              }}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              aria-controls="cmd-list"
              aria-activedescendant={
                list[sel] ? `cmd-${list[sel].id}` : undefined
              }
              className="w-full border-b border-rule bg-transparent px-5 py-4 text-[17px] outline-none placeholder:text-dim"
            />
            <ul
              id="cmd-list"
              role="listbox"
              className="max-h-[50vh] overflow-y-auto p-2"
            >
              {list.length === 0 && (
                <li className="px-3 py-3 text-mist">{t.empty}</li>
              )}
              {list.map((c, i) => (
                <li
                  key={c.id}
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === sel}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => run(c)}
                  className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 aria-selected:bg-shallow"
                >
                  <span>
                    {c.group && <span className="text-dim">{c.group} </span>}
                    {c.label}
                  </span>
                  {i === sel && <span className="text-xs text-dim">↵</span>}
                </li>
              ))}
            </ul>
            <p className="border-t border-rule px-5 py-2.5 text-xs text-dim">
              {t.hint}
            </p>
          </div>
        </div>
      )}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-sun px-4 py-2 text-[15px] font-medium text-[#0b2230] shadow-lg"
        >
          {toast}
        </div>
      )}
    </>
  );
}
