"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";

const GATE = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const CROSS = 24;
const FIRST = 4000;
const EVERY = [32000, 48000];
const PARALLAX = 0.85;
const SPAN = 120;

const vert = `
uniform float uTime;
attribute float aSpan;
attribute float aEdge;
varying float vEdge;
varying vec3 vW;
void main() {
  vec3 p = position;
  float s = abs(p.z) / ${SPAN.toFixed(1)};
  float beat = uTime * 1.4;
  p.y += ${(SPAN * 0.3).toFixed(1)} * pow(s, 1.5) * sin(beat - s * 1.3) * aSpan;
  p.y += 3.0 * sin(beat * 0.5 - p.x * 0.02);
  vEdge = aEdge;
  vec4 w = modelMatrix * vec4(p, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const frag = `
uniform vec3 uShade;
uniform vec3 uLift;
uniform float uAlpha;
varying float vEdge;
varying vec3 vW;
void main() {
  vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
  float top = abs(n.y);
  vec3 col = mix(uShade, uLift, top * 0.35);
  float a = uAlpha * (1.0 - smoothstep(0.75, 1.0, vEdge));
  gl_FragColor = vec4(col * a, a);
}
`;

function mantaGeometry(T: typeof Three) {
  const pos: number[] = [];
  const span: number[] = [];
  const edge: number[] = [];
  const idx: number[] = [];
  const grid = (nu: number, nv: number, at: (u: number, v: number) => [number, number, number, number, number]) => {
    const base = pos.length / 3;
    for (let i = 0; i <= nu; i++) {
      for (let j = 0; j <= nv; j++) {
        const [x, y, z, s, e] = at(i / nu, j / nv);
        pos.push(x, y, z);
        span.push(s);
        edge.push(e);
        if (i < nu && j < nv) {
          const a = base + i * (nv + 1) + j;
          const b = a + nv + 1;
          idx.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
  };
  grid(72, 8, (iu, v) => {
    const u = iu * 2 - 1;
    const au = Math.abs(u);
    const le = 30 - 52 * Math.pow(au, 1.15);
    const te = -62 + 40 * Math.pow(au, 0.75);
    return [te + (le - te) * v, 0, u * SPAN, 1, au];
  });
  for (const side of [-1, 1])
    grid(6, 2, (iu, v) => {
      const x = 26 + iu * 20;
      const z = side * (10 + v * 6 - iu * 2);
      return [x, 0, z, 0, 0];
    });
  grid(24, 1, (iu, v) => {
    const x = -58 - iu * 110;
    const w = 2.2 * (1 - iu * 0.7);
    return [x, 0, (v - 0.5) * 2 * w, 0, 0];
  });
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
  g.setAttribute("aSpan", new T.Float32BufferAttribute(span, 1));
  g.setAttribute("aEdge", new T.Float32BufferAttribute(edge, 1));
  g.setIndex(idx);
  return g;
}

function hex(name: string, fallback: string) {
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

  const u = {
    uTime: { value: 0 },
    uAlpha: { value: 0 },
    uShade: { value: new T.Vector3() },
    uLift: { value: new T.Vector3() },
  };
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 10, 6000);
  const geo = mantaGeometry(T);
  const mat = new T.ShaderMaterial({
    uniforms: u,
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
    depthWrite: false,
    side: T.DoubleSide,
    blending: T.CustomBlending,
    blendSrc: T.OneFactor,
    blendDst: T.OneMinusSrcAlphaFactor,
  });
  const manta = new T.Mesh(geo, mat);
  manta.frustumCulled = false;
  manta.scale.setScalar(1.05);
  scene.add(manta);

  let peak = 0.5;
  const theme = () => {
    const night = document.documentElement.dataset.theme === "dark";
    u.uShade.value.set(...hex("--c-trench", "#061a26"));
    u.uLift.value.set(...hex("--c-shallow", "#17506a"));
    peak = night ? 0.6 : 0.5;
  };

  let w = 0;
  let h = 0;
  const resize = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    const f = h / 2 / Math.tan((15 * Math.PI) / 180);
    camera.aspect = w / h;
    camera.position.set(w / 2, -h / 2, f);
    camera.lookAt(w / 2, -h / 2, 0);
    camera.updateProjectionMatrix();
  };

  type Swim = { born: number; y: number; scroll: number; dir: 1 | -1 };
  let swim: Swim | null = null;
  let raf = 0;
  let timer = 0;
  let visible = false;

  const clear = () => {
    renderer.clear();
  };

  const frame = (now: number) => {
    if (!swim) return;
    const t = (now - swim.born) / 1000;
    const k = t / CROSS;
    if (k >= 1) {
      swim = null;
      raf = 0;
      clear();
      schedule(EVERY[0] + Math.random() * (EVERY[1] - EVERY[0]));
      return;
    }
    const top = canvas.getBoundingClientRect().top;
    const sy = swim.y - (scrollY - swim.scroll) * PARALLAX - top;
    const travel = w + 2 * SPAN * 1.6;
    const x = swim.dir > 0 ? -SPAN * 1.6 + travel * k : w + SPAN * 1.6 - travel * k;
    const beat = t * 1.4;
    manta.position.set(x + swim.dir * 6 * Math.sin(beat), -(sy + 10 * Math.sin(t * 0.35)), -260);
    manta.rotation.set(-0.95 + 0.08 * Math.sin(t * 0.3), swim.dir > 0 ? 0.18 : Math.PI - 0.18, 0.04 * Math.sin(beat));
    u.uTime.value = t;
    u.uAlpha.value = peak * Math.min(1, k / 0.12, (1 - k) / 0.12);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const spawn = () => {
    timer = 0;
    if (!visible || document.hidden) return;
    const top = canvas.getBoundingClientRect().top;
    const lo = Math.max(top + 60, h * 0.25);
    const hi = h * 0.65;
    if (lo >= hi) return schedule(5000);
    swim = { born: performance.now(), y: lo + Math.random() * (hi - lo), scroll: scrollY, dir: Math.random() < 0.5 ? 1 : -1 };
    raf = requestAnimationFrame(frame);
  };

  function schedule(ms: number) {
    clearTimeout(timer);
    timer = window.setTimeout(spawn, ms);
  }

  const halt = () => {
    clearTimeout(timer);
    timer = 0;
    cancelAnimationFrame(raf);
    raf = 0;
    if (swim) {
      swim = null;
      clear();
    }
  };

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (!visible) halt();
    else if (!swim && !timer) schedule(FIRST);
  });
  const ro = new ResizeObserver(resize);
  const mo = new MutationObserver(theme);
  const onVis = () => {
    if (document.hidden) halt();
    else if (visible && !swim && !timer) schedule(FIRST);
  };

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
    geo.dispose();
    mat.dispose();
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
