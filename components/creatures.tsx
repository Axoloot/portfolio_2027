"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";
import { jellies } from "./jelly";
import { manta } from "./manta";

const GATE = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export type View = { w: number; h: number; top: number };

export type Creature = (ctx: {
  T: typeof Three;
  scene: Three.Scene;
  blend: Partial<Three.ShaderMaterialParameters>;
  color: (name: string, fallback: string) => readonly [number, number, number];
}) => {
  theme: (night: boolean) => void;
  reset: (now: number) => void;
  update: (now: number, view: View) => boolean;
  dispose: () => void;
};

const kinds: Creature[] = [manta, jellies];

function color(name: string, fallback: string) {
  const s = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const v = parseInt(s.slice(1), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255] as const;
}

function start(T: typeof Three, canvas: HTMLCanvasElement, layer: HTMLElement) {
  let renderer: Three.WebGLRenderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "low-power" });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 10, 6000);
  const blend: Partial<Three.ShaderMaterialParameters> = {
    transparent: true,
    depthWrite: false,
    blending: T.CustomBlending,
    blendSrc: T.OneFactor,
    blendDst: T.OneMinusSrcAlphaFactor,
  };
  const parts = kinds.map((k) => k({ T, scene, blend, color }));

  const theme = () => {
    const night = document.documentElement.dataset.theme === "dark";
    parts.forEach((p) => p.theme(night));
  };

  const view: View = { w: 0, h: 0, top: 0 };
  const resize = () => {
    view.w = canvas.clientWidth;
    view.h = canvas.clientHeight;
    if (!view.w || !view.h) return;
    renderer.setSize(view.w, view.h, false);
    const f = view.h / 2 / Math.tan((15 * Math.PI) / 180);
    camera.aspect = view.w / view.h;
    camera.position.set(view.w / 2, -view.h / 2, f);
    camera.lookAt(view.w / 2, -view.h / 2, 0);
    camera.updateProjectionMatrix();
  };

  let raf = 0;
  let visible = false;
  let drawn = false;

  const frame = (now: number) => {
    view.top = canvas.getBoundingClientRect().top;
    let any = false;
    for (const p of parts) if (p.update(now, view)) any = true;
    if (any) {
      renderer.render(scene, camera);
      drawn = true;
    } else if (drawn) {
      renderer.clear();
      drawn = false;
    }
    raf = requestAnimationFrame(frame);
  };

  const play = () => {
    if (raf || !visible || document.hidden) return;
    const now = performance.now();
    parts.forEach((p) => p.reset(now));
    raf = requestAnimationFrame(frame);
  };
  const halt = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    if (drawn) {
      renderer.clear();
      drawn = false;
    }
  };

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) play();
    else halt();
  });
  const ro = new ResizeObserver(resize);
  const mo = new MutationObserver(theme);
  const onVis = () => (document.hidden ? halt() : play());

  theme();
  resize();
  io.observe(layer);
  ro.observe(canvas);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("visibilitychange", onVis);

  return () => {
    halt();
    io.disconnect();
    ro.disconnect();
    mo.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    parts.forEach((p) => p.dispose());
    renderer.dispose();
  };
}

export function Creatures() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const layer = canvas?.parentElement;
    if (!canvas || !layer || !matchMedia(GATE).matches) return;
    let stop = () => {};
    let dead = false;
    import("three")
      .then((T) => {
        if (!dead) stop = start(T, canvas, layer);
      })
      .catch(() => {});
    return () => {
      dead = true;
      stop();
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
      <canvas ref={ref} className="sticky top-0 h-screen w-full" />
    </div>
  );
}
