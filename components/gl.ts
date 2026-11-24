"use client";

import { useEffect, useRef } from "react";

export type T3 = typeof import("./three");
type Start = (T: T3, canvas: HTMLCanvasElement) => () => void;

export const motionOk = () => matchMedia("(prefers-reduced-motion: no-preference)").matches;

export function cssColor(name: string, fallback: string) {
  const s = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const v = parseInt(s.slice(1), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255] as const;
}

export function renderer(T: T3, canvas: HTMLCanvasElement) {
  try {
    const r = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    r.setClearColor(0x000000, 0);
    return r;
  } catch {
    return null;
  }
}

export function watch(
  canvas: HTMLCanvasElement,
  on: { visible: (v: boolean) => void; resize: () => void; theme: () => void; tab: () => void },
  target: Element = canvas,
) {
  const io = new IntersectionObserver(([e]) => on.visible(e.isIntersecting));
  const ro = new ResizeObserver(on.resize);
  const mo = new MutationObserver(on.theme);
  io.observe(target);
  ro.observe(canvas);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("visibilitychange", on.tab);
  return () => {
    io.disconnect();
    ro.disconnect();
    mo.disconnect();
    document.removeEventListener("visibilitychange", on.tab);
  };
}

export function useGL(start: Start) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !motionOk()) return;
    let stop = () => {};
    let dead = false;
    const load = () =>
      import("./three")
        .then((T) => {
          if (!dead) stop = start(T, canvas);
        })
        .catch(() => {});
    // Load three.js once the page is idle, so it never competes with the first paint.
    const idle = "requestIdleCallback" in window;
    const id = idle ? requestIdleCallback(load, { timeout: 2000 }) : window.setTimeout(load, 300);
    return () => {
      dead = true;
      if (idle) cancelIdleCallback(id);
      else clearTimeout(id);
      stop();
    };
  }, [start]);
  return ref;
}
