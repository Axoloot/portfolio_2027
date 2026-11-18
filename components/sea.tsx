"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";

const ABOVE = 110;
const BELOW = 170;
const HORIZON = 56;
const DEPTH = 9000;

const waves = [
  { len: 540, amp: 7, deg: 8, speed: 0.9, phase: 0 },
  { len: 310, amp: 4, deg: -32, speed: 1.25, phase: 1.7 },
  { len: 180, amp: 2.2, deg: 22, speed: 1.7, phase: 3.1 },
  { len: 110, amp: 1.2, deg: -56, speed: 2.2, phase: 4.6 },
  { len: 760, amp: 5, deg: 162, speed: 0.7, phase: 0.8 },
].map((w) => {
  const r = (w.deg * Math.PI) / 180;
  return { k: (2 * Math.PI) / w.len, a: w.amp, dx: Math.cos(r), dz: Math.sin(r), w: w.speed, p: w.phase };
});

export function sea(x: number, z: number, t: number) {
  let h = 0;
  for (const w of waves) h += w.a * Math.sin((w.dx * x + w.dz * z) * w.k - w.w * t + w.p);
  return h;
}

export function seaGrad(x: number, z: number, t: number) {
  let gx = 0;
  let gz = 0;
  for (const w of waves) {
    const c = w.a * w.k * Math.cos((w.dx * x + w.dz * z) * w.k - w.w * t + w.p);
    gx += c * w.dx;
    gz += c * w.dz;
  }
  return [gx, gz] as const;
}

const n = (v: number) => v.toFixed(6);
const phase = (w: (typeof waves)[number]) => `(dot(vec2(${n(w.dx)}, ${n(w.dz)}), p) * ${n(w.k)} - ${n(w.w)} * t + ${n(w.p)})`;
const glslSea = `
float sea(vec2 p, float t) {
  float h = 0.0;
  ${waves.map((w) => `h += ${n(w.a)} * sin(${phase(w)});`).join("\n  ")}
  return h;
}
vec2 seaGrad(vec2 p, float t) {
  vec2 g = vec2(0.0);
  ${waves.map((w) => `g += vec2(${n(w.dx)}, ${n(w.dz)}) * ${n(w.a * w.k)} * cos(${phase(w)});`).join("\n  ")}
  return g;
}
`;

const surfaceVert = `
uniform float uTime;
varying vec3 vP;
${glslSea}
void main() {
  vec3 p = position;
  p.y = sea(p.xz, uTime);
  vP = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}
`;

const surfaceFrag = `
uniform float uTime;
uniform float uDepth;
uniform vec3 uSky;
uniform vec3 uFog;
uniform vec3 uWater;
uniform vec3 uLight;
uniform vec3 uLightDir;
varying vec3 vP;
${glslSea}
void main() {
  float dist = -vP.z;
  float near = 1.0 - smoothstep(0.0, 700.0, dist);
  float lod = 1.0 - smoothstep(400.0, 5000.0, dist) * 0.85;
  vec2 g = seaGrad(vP.xz, uTime) * lod;
  vec2 d1 = vec2(0.9, 0.4);
  vec2 d2 = vec2(-0.5, 0.85);
  g += d1 * cos(dot(d1, vP.xz) * 0.16 - uTime * 3.1) * 0.10 * near;
  g += d2 * cos(dot(d2, vP.xz) * 0.23 - uTime * 3.7 + 1.0) * 0.08 * near;
  vec3 nrm = normalize(vec3(-g.x, 1.0, -g.y));
  vec3 v = normalize(cameraPosition - vP);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(nrm, v), 0.0), 5.0);
  vec3 r = reflect(-v, nrm);
  vec3 sky = mix(uFog, uSky, smoothstep(0.0, 0.35, r.y));
  vec3 col = mix(uWater * 1.12, sky, fres * 0.8);
  float s = max(dot(r, uLightDir), 0.0);
  col += uLight * (pow(s, 500.0) * 2.0 * near + pow(s, 40.0) * 0.3 * lod);
  col = mix(col, uFog, smoothstep(600.0, uDepth * 0.75, dist));
  gl_FragColor = vec4(col, 1.0 - smoothstep(uDepth * 0.3, uDepth * 0.85, dist));
}
`;

const faceVert = `
uniform float uTime;
uniform float uBelow;
varying vec2 vP;
${glslSea}
void main() {
  vec3 p = position;
  p.y = p.y > -0.5 ? sea(vec2(p.x, 0.0), uTime) : -uBelow * 1.5;
  vP = p.xy;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}
`;

const faceFrag = `
uniform float uTime;
uniform float uBelow;
uniform vec3 uWater;
uniform vec3 uGlow;
uniform vec3 uLight;
varying vec2 vP;
${glslSea}
void main() {
  float d = sea(vec2(vP.x, 0.0), uTime) - vP.y;
  float fade = 1.0 - smoothstep(uBelow * 0.4, uBelow * 0.8, d);
  vec3 col = uWater + uGlow * 0.16 * exp(-d / 34.0) * fade;
  float x = vP.x + d * 0.5;
  float r = sin(x * 0.019 + uTime * 0.35) + sin(x * 0.043 - uTime * 0.27 + 1.3) + sin(x * 0.011 + uTime * 0.19 + 2.1);
  col += uLight * 0.10 * pow(max(r / 3.0, 0.0), 2.0) * exp(-d / 90.0) * fade;
  col = mix(col, uGlow, 1.0 - smoothstep(0.6, 2.2, d));
  gl_FragColor = vec4(col, 1.0);
}
`;

function hex(css: CSSStyleDeclaration, name: string, fallback: string) {
  const s = css.getPropertyValue(name).trim() || fallback;
  const v = parseInt(s.slice(1), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255] as const;
}

export type SeaScene = {
  T: typeof Three;
  scene: Three.Scene;
  camera: Three.PerspectiveCamera;
  night: boolean;
};

export type SeaAddon = (s: SeaScene) => { frame: (t: number) => void; theme: () => void; dispose: () => void };

function surfaceGeometry(T: typeof Three, w: number, f: number) {
  const nx = 160;
  const nz = 120;
  const pos = new Float32Array((nx + 1) * (nz + 1) * 3);
  const idx: number[] = [];
  for (let j = 0; j <= nz; j++) {
    const z = -DEPTH * Math.pow(j / nz, 2.2);
    const half = (w / 2) * 1.15 * ((f - z) / f);
    for (let i = 0; i <= nx; i++) {
      const o = (j * (nx + 1) + i) * 3;
      pos[o] = -half + (2 * half * i) / nx;
      pos[o + 2] = z;
      if (i < nx && j < nz) {
        const a = j * (nx + 1) + i;
        const b = a + nx + 1;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

function faceGeometry(T: typeof Three, w: number) {
  const nx = 480;
  const pos = new Float32Array((nx + 1) * 2 * 3);
  const idx: number[] = [];
  for (let i = 0; i <= nx; i++) {
    const x = -w * 0.6 + (w * 1.2 * i) / nx;
    pos.set([x, 0, 0, x, -1, 0], i * 6);
    if (i < nx) idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  }
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

const addons: SeaAddon[] = [];

function start(T: typeof Three, canvas: HTMLCanvasElement, line: HTMLElement) {
  let renderer: Three.WebGLRenderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const v3 = () => ({ value: new T.Vector3() });
  const u = {
    uTime: { value: 0 },
    uDepth: { value: DEPTH },
    uBelow: { value: BELOW },
    uSky: v3(),
    uFog: v3(),
    uWater: v3(),
    uGlow: { value: new T.Vector3(0x4f / 255, 0xd1 / 255, 0xd9 / 255) },
    uLight: v3(),
    uLightDir: { value: new T.Vector3(0.35, 0.2, -1).normalize() },
  };

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 1, DEPTH * 2);
  const surface = new T.Mesh(new T.BufferGeometry(), new T.ShaderMaterial({ uniforms: u, vertexShader: surfaceVert, fragmentShader: surfaceFrag, transparent: true }));
  const face = new T.Mesh(new T.BufferGeometry(), new T.ShaderMaterial({ uniforms: u, vertexShader: faceVert, fragmentShader: faceFrag }));
  surface.frustumCulled = false;
  face.frustumCulled = false;
  scene.add(face, surface);

  const ctx: SeaScene = { T, scene, camera, night: false };
  const parts = addons.map((a) => a(ctx));

  const theme = () => {
    const css = getComputedStyle(document.documentElement);
    ctx.night = document.documentElement.dataset.theme === "dark";
    u.uSky.value.set(...hex(css, "--c-sky-top", "#c9e3ec"));
    u.uFog.value.set(...hex(css, "--c-surface", "#edf1ee"));
    u.uWater.value.set(...hex(css, "--c-shallow", "#17506a"));
    if (ctx.night) u.uLight.value.set(0.78, 0.75, 0.66);
    else u.uLight.value.set(1, 0.9, 0.68);
    parts.forEach((p) => p.theme());
  };

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    const f = h / 2 / Math.tan((15 * Math.PI) / 180);
    camera.aspect = w / h;
    camera.position.set(0, HORIZON, f);
    camera.lookAt(0, 0, 0);
    camera.setViewOffset(w, h, 0, h / 2 - ABOVE, w, h);
    camera.updateProjectionMatrix();
    surface.geometry.dispose();
    face.geometry.dispose();
    surface.geometry = surfaceGeometry(T, w, f);
    face.geometry = faceGeometry(T, w);
  };

  const draw = (now: number) => {
    const t = now / 1000;
    u.uTime.value = t;
    parts.forEach((p) => p.frame(t));
    renderer.render(scene, camera);
  };

  let raf = 0;
  let visible = false;
  const loop = (now: number) => {
    draw(now);
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
  };
  const pause = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) play();
    else pause();
  });
  const ro = new ResizeObserver(() => {
    resize();
    draw(performance.now());
  });
  const mo = new MutationObserver(() => {
    theme();
    draw(performance.now());
  });
  const onVis = () => (document.hidden ? pause() : play());
  const onLost = (e: Event) => {
    e.preventDefault();
    pause();
    line.removeAttribute("data-gl");
  };

  theme();
  resize();
  draw(performance.now());
  line.setAttribute("data-gl", "");
  io.observe(canvas);
  ro.observe(canvas);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("visibilitychange", onVis);
  canvas.addEventListener("webglcontextlost", onLost);

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    mo.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    canvas.removeEventListener("webglcontextlost", onLost);
    parts.forEach((p) => p.dispose());
    surface.geometry.dispose();
    face.geometry.dispose();
    (surface.material as Three.Material).dispose();
    (face.material as Three.Material).dispose();
    renderer.dispose();
    line.removeAttribute("data-gl");
  };
}

export function Sea() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const line = canvas?.parentElement;
    if (!canvas || !line || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let dead = false;
    import("three")
      .then((T) => {
        if (!dead) stop = start(T, canvas, line);
      })
      .catch(() => {});
    return () => {
      dead = true;
      stop();
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="sea pointer-events-none absolute inset-x-0" style={{ top: `calc(50% - ${ABOVE}px)`, height: ABOVE + BELOW }} />;
}
