"use client";

import type * as Three from "three";
import { cssColor, renderer as makeRenderer, useGL, watch, type T3 } from "./gl";
import { jellies } from "./jelly";
import { manta } from "./manta";

type View = { w: number; h: number; top: number; k: number };

export type Creature = (ctx: {
  T: T3;
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

function start(T: T3, canvas: HTMLCanvasElement) {
  const layer = canvas.parentElement;
  const renderer = makeRenderer(T, canvas);
  if (!layer || !renderer) return () => {};

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 10, 6000);
  const blend: Partial<Three.ShaderMaterialParameters> = {
    transparent: true,
    depthWrite: false,
    blending: T.CustomBlending,
    blendSrc: T.OneFactor,
    blendDst: T.OneMinusSrcAlphaFactor,
  };
  const parts = kinds.map((k) => k({ T, scene, blend, color: cssColor }));

  const theme = () => {
    const night = document.documentElement.dataset.theme === "dark";
    parts.forEach((p) => p.theme(night));
  };

  const view: View = { w: 0, h: 0, top: 0, k: 1 };
  const resize = () => {
    view.w = canvas.clientWidth;
    view.h = canvas.clientHeight;
    view.k = Math.min(1, Math.max(0.6, view.w / 1200));
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

  theme();
  resize();
  const unwatch = watch(
    canvas,
    {
      visible: (v) => {
        visible = v;
        if (v) play();
        else halt();
      },
      resize,
      theme,
      tab: () => (document.hidden ? halt() : play()),
    },
    layer,
  );

  return () => {
    halt();
    unwatch();
    parts.forEach((p) => p.dispose());
    renderer.dispose();
  };
}

export function Creatures() {
  const ref = useGL(start, { decorative: true });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <canvas ref={ref} className="sticky top-0 h-screen w-full" />
    </div>
  );
}
