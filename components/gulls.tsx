"use client";

import { renderer as makeRenderer, useGL, watch, type T3 } from "./gl";

const HALF = 18;

const flock = [
  { cx: 0.76, cy: 165, r: 120, w: 0.15, ph: 0, size: 1.25 },
  { cx: 0.85, cy: 235, r: 80, w: -0.2, ph: 2.2, size: 1 },
  { cx: 0.7, cy: 120, r: 120, w: 0.11, ph: 4.1, size: 1.1 },
];

const vert = `
uniform float uFlap;
uniform float uBeat;
attribute float aS;
varying vec3 vW;
void main() {
  vec3 p = position;
  float wrist = 0.42;
  float m = aS < wrist ? aS : wrist - (aS - wrist) * 1.2;
  p.y += m * ${HALF.toFixed(1)} * 0.32 + uFlap * sin(uBeat) * aS * ${HALF.toFixed(1)} * 0.6;
  vec4 w = modelMatrix * vec4(p, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const frag = `
uniform vec3 uInk;
uniform float uAlpha;
varying vec3 vW;
void main() {
  vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
  float a = uAlpha * (0.7 + 0.3 * abs(n.y));
  gl_FragColor = vec4(uInk * a, a);
}
`;

function geometry(T: T3) {
  const pos: number[] = [];
  const span: number[] = [];
  const idx: number[] = [];
  const quad = (a: number[], b: number[], c: number[], d: number[], s: number[]) => {
    const base = pos.length / 3;
    pos.push(...a, ...b, ...c, ...d);
    span.push(...s);
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  for (const side of [-1, 1]) {
    const n = 10;
    for (let i = 0; i < n; i++) {
      const s0 = i / n;
      const s1 = (i + 1) / n;
      const le = (s: number) => 3 - 3.5 * Math.pow(s, 1.3);
      const te = (s: number) => -4 + 3.2 * Math.pow(s, 1.2);
      quad([side * s0 * HALF, 0, le(s0)], [side * s1 * HALF, 0, le(s1)], [side * s1 * HALF, 0, te(s1)], [side * s0 * HALF, 0, te(s0)], [s0, s1, s1, s0]);
    }
  }
  quad([0, 0, 7], [1.2, 0, 0], [0, 0, -9], [-1.2, 0, 0], [0, 0, 0, 0]);
  quad([0, 0, 7], [0, 1.1, 0], [0, 0, -9], [0, -1.1, 0], [0, 0, 0, 0]);
  quad([0, 0, -8], [1.6, 0, -12], [0, 0, -11], [-1.6, 0, -12], [0, 0, 0, 0]);
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
  g.setAttribute("aS", new T.Float32BufferAttribute(span, 1));
  g.setIndex(idx);
  return g;
}

function start(T: T3, canvas: HTMLCanvasElement) {
  const renderer = makeRenderer(T, canvas);
  if (!renderer) return () => {};

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 10, 6000);
  const geo = geometry(T);
  const ink = new T.Vector3(0x0b / 255, 0x22 / 255, 0x30 / 255);
  const birds = flock.map((b) => {
    const u = { uFlap: { value: 0 }, uBeat: { value: 0 }, uInk: { value: ink }, uAlpha: { value: 0.5 } };
    const mat = new T.ShaderMaterial({
      uniforms: u,
      vertexShader: vert,
      fragmentShader: frag,
      side: T.DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: T.CustomBlending,
      blendSrc: T.OneFactor,
      blendDst: T.OneMinusSrcAlphaFactor,
    });
    const mesh = new T.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.rotation.order = "YXZ";
    mesh.scale.setScalar(b.size);
    scene.add(mesh);
    return { b, u, mat, mesh, burst: 3 + Math.random() * 6 };
  });

  let w = 0;
  const resize = () => {
    w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    const f = h / 2 / Math.tan((15 * Math.PI) / 180);
    camera.aspect = w / h;
    camera.position.set(w / 2, -h / 2, f);
    camera.lookAt(w / 2, -h / 2, 0);
    camera.updateProjectionMatrix();
  };

  const frame = (now: number) => {
    const t = now / 1000;
    const fit = Math.min(1, Math.max(0.6, w / 1200));
    for (const g of birds) {
      const { b } = g;
      const r = b.r * fit;
      g.mesh.scale.setScalar(b.size * fit);
      const th = b.ph + b.w * t;
      const depth = r * 2;
      const x = w * b.cx + r * Math.cos(th);
      const z = depth * Math.sin(th);
      const dx = -r * Math.sin(th) * Math.sign(b.w);
      const dz = depth * Math.cos(th) * Math.sign(b.w);
      if (t > g.burst + 1.6) g.burst = t + 5 + Math.random() * 4;
      const k = (t - g.burst) / 1.6;
      g.u.uFlap.value = k > 0 && k < 1 ? Math.sin(Math.PI * k) : 0;
      g.u.uBeat.value = t * 9;
      g.mesh.position.set(x, -(b.cy + 8 * Math.sin(t * 0.5 + b.ph)), z);
      g.mesh.rotation.set(0.25, Math.atan2(dx, dz), 0.35 * Math.sign(b.w));
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  let raf = 0;
  let visible = false;
  const day = () => document.documentElement.dataset.theme !== "dark";
  const play = () => {
    if (!raf && visible && day() && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const halt = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    renderer.clear();
  };
  const sync = () => (visible && day() && !document.hidden ? play() : halt());

  resize();
  const unwatch = watch(canvas, {
    visible: (v) => {
      visible = v;
      sync();
    },
    resize,
    theme: sync,
    tab: sync,
  });

  return () => {
    halt();
    unwatch();
    birds.forEach((g) => g.mat.dispose());
    geo.dispose();
    renderer.dispose();
  };
}

export function Gulls() {
  const ref = useGL(start, { decorative: true });
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
