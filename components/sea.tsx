"use client";

import type * as Three from "three";
import { buoy } from "./buoy";
import { fish } from "./fish";
import { cssColor, renderer as makeRenderer, useGL, watch, type T3 } from "./gl";
import { glslSea } from "./waves";

const ABOVE = 110;
const BELOW = 170;
const HORIZON = 56;
const DEPTH = 9000;

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
uniform vec4 uLamp;
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
  vec2 dl = vP.xz - uLamp.xy;
  col += vec3(1.0, 0.86, 0.6) * uLamp.z * 0.35 * exp(-dot(dl, dl) / 3200.0);
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
uniform vec4 uLamp;
varying vec2 vP;
${glslSea}
void main() {
  float d = sea(vec2(vP.x, 0.0), uTime) - vP.y;
  float fade = 1.0 - smoothstep(uBelow * 0.4, uBelow * 0.8, d);
  vec3 col = uWater + uGlow * 0.16 * exp(-d / 34.0) * fade;
  float x = vP.x + d * 0.5;
  float r = sin(x * 0.019 + uTime * 0.35) + sin(x * 0.043 - uTime * 0.27 + 1.3) + sin(x * 0.011 + uTime * 0.19 + 2.1);
  col += uLight * 0.10 * pow(max(r / 3.0, 0.0), 2.0) * exp(-d / 90.0) * fade;
  float lx = vP.x - uLamp.x;
  col += vec3(1.0, 0.86, 0.6) * uLamp.z * 0.3 * exp(-lx * lx / 8100.0) * exp(-d / 45.0);
  col = mix(col, uGlow, 1.0 - smoothstep(0.6, 2.2, d));
  gl_FragColor = vec4(col, 1.0);
}
`;

type SeaUniforms = Record<"uSky" | "uFog" | "uWater" | "uGlow" | "uLight" | "uLightDir", { value: Three.Vector3 }> & {
  uLamp: { value: Three.Vector4 };
};

type SeaScene = {
  T: T3;
  scene: Three.Scene;
  u: SeaUniforms;
  night: boolean;
};

export type SeaAddon = (s: SeaScene) => {
  frame: (t: number) => void;
  theme: () => void;
  resize: (w: number) => void;
  dispose: () => void;
};

function surfaceGeometry(T: T3, w: number, f: number) {
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

function faceGeometry(T: T3, w: number) {
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

const addons: SeaAddon[] = [buoy, fish];

function start(T: T3, canvas: HTMLCanvasElement) {
  const line = canvas.parentElement;
  const renderer = makeRenderer(T, canvas);
  if (!line || !renderer) return () => {};

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
    uLamp: { value: new T.Vector4() },
  };

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 1, DEPTH * 2);
  const surface = new T.Mesh(new T.BufferGeometry(), new T.ShaderMaterial({ uniforms: u, vertexShader: surfaceVert, fragmentShader: surfaceFrag, transparent: true }));
  const face = new T.Mesh(new T.BufferGeometry(), new T.ShaderMaterial({ uniforms: u, vertexShader: faceVert, fragmentShader: faceFrag }));
  surface.frustumCulled = false;
  face.frustumCulled = false;
  scene.add(face, surface);

  const ctx: SeaScene = { T, scene, u, night: false };
  const parts = addons.map((a) => a(ctx));

  const theme = () => {
    ctx.night = document.documentElement.dataset.theme === "dark";
    u.uSky.value.set(...cssColor("--c-sky-top", "#c9e3ec"));
    u.uFog.value.set(...cssColor("--c-surface", "#edf1ee"));
    u.uWater.value.set(...cssColor("--c-shallow", "#17506a"));
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
    parts.forEach((p) => p.resize(w));
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

  const onLost = (e: Event) => {
    e.preventDefault();
    pause();
    line.removeAttribute("data-gl");
  };

  theme();
  resize();
  draw(performance.now());
  line.setAttribute("data-gl", "");
  const unwatch = watch(canvas, {
    visible: (v) => {
      visible = v;
      if (v) play();
      else pause();
    },
    resize: () => {
      resize();
      draw(performance.now());
    },
    theme: () => {
      theme();
      draw(performance.now());
    },
    tab: () => (document.hidden ? pause() : play()),
  });
  canvas.addEventListener("webglcontextlost", onLost);

  return () => {
    pause();
    unwatch();
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
  const ref = useGL(start);
  return <canvas ref={ref} aria-hidden className="sea pointer-events-none absolute inset-x-0" style={{ top: `calc(50% - ${ABOVE}px)`, height: ABOVE + BELOW }} />;
}
