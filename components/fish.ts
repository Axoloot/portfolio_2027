import type * as Three from "three";
import type { SeaAddon } from "./sea";

const GATE = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const COUNT = 22;
const DELAY = 6;
const CROSS = 16;

const vert = `
uniform float uTime;
attribute float aPhase;
varying float vBelly;
void main() {
  vec3 p = position;
  float tail = smoothstep(-0.2, -1.0, p.x);
  p.y += sin(uTime * 11.0 + aPhase) * 0.18 * tail;
  p.x += sin(uTime * 11.0 + aPhase + 1.5) * 0.04 * tail;
  vBelly = p.y;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(p, 1.0);
}
`;

const frag = `
uniform vec3 uShade;
uniform vec3 uWater;
uniform float uAlpha;
varying float vBelly;
void main() {
  vec3 col = mix(uShade, uWater * 1.4, smoothstep(0.1, -0.35, vBelly) * 0.35);
  gl_FragColor = vec4(col * uAlpha, uAlpha);
}
`;

function body(T: typeof Three) {
  const s = new T.Shape();
  s.moveTo(1, 0);
  s.bezierCurveTo(0.8, 0.34, 0.1, 0.42, -0.45, 0.14);
  s.lineTo(-1, 0.38);
  s.lineTo(-0.82, 0);
  s.lineTo(-1, -0.38);
  s.lineTo(-0.45, -0.14);
  s.bezierCurveTo(0.1, -0.38, 0.8, -0.3, 1, 0);
  return new T.ShapeGeometry(s, 10);
}

export const fish: SeaAddon = ({ T, scene, u }) => {
  const idle = { frame() {}, theme() {}, resize() {}, dispose() {} };
  if (!matchMedia(GATE).matches) return idle;

  const geo = body(T);
  const phases = new Float32Array(COUNT).map(() => Math.random() * Math.PI * 2);
  geo.setAttribute("aPhase", new T.InstancedBufferAttribute(phases, 1));
  const fu = {
    uTime: { value: 0 },
    uAlpha: { value: 0 },
    uShade: { value: new T.Vector3() },
    uWater: u.uWater,
  };
  const mat = new T.ShaderMaterial({
    uniforms: fu,
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
    depthWrite: false,
    blending: T.CustomBlending,
    blendSrc: T.OneFactor,
    blendDst: T.OneMinusSrcAlphaFactor,
  });
  const school = new T.InstancedMesh(geo, mat, COUNT);
  school.frustumCulled = false;
  school.visible = false;
  scene.add(school);

  const slots = Array.from({ length: COUNT }, () => {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());
    return { x: Math.cos(a) * r * 120, y: Math.sin(a) * r * 34, size: 7 + Math.random() * 3, pace: 0.94 + Math.random() * 0.12, seed: Math.random() * 10 };
  });

  const m = new T.Matrix4();
  const q = new T.Quaternion();
  const pos = new T.Vector3();
  const scl = new T.Vector3();
  const axis = new T.Vector3(0, 0, 1);
  let w = 0;
  let born = -1;
  let done = false;
  const dir = Math.random() < 0.5 ? 1 : -1;

  return {
    resize(width) {
      w = width;
    },
    theme() {
      const s = getComputedStyle(document.documentElement).getPropertyValue("--c-trench").trim() || "#061a26";
      const v = parseInt(s.slice(1), 16);
      fu.uShade.value.set(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
    },
    frame(t) {
      if (done) return;
      if (born < 0) born = t + DELAY;
      const k = (t - born) / CROSS;
      if (k < 0) return;
      if (k >= 1) {
        done = true;
        school.visible = false;
        return;
      }
      school.visible = true;
      const reach = w / 2 + 220;
      const cx = dir * (-reach + 2 * reach * k);
      const cy = -78 + 12 * Math.sin(k * Math.PI * 2);
      for (let i = 0; i < COUNT; i++) {
        const s = slots[i];
        const lag = (s.pace - 1) * 2 * reach * k;
        const x = cx + dir * (s.x + lag) + 8 * Math.sin(t * 0.7 + s.seed);
        const y = cy + s.y + 5 * Math.sin(t * 0.9 + s.seed * 1.7);
        const tilt = 0.12 * Math.cos(t * 0.9 + s.seed * 1.7);
        pos.set(x, y, 20);
        q.setFromAxisAngle(axis, dir * tilt);
        scl.set(s.size * dir, s.size * 0.9, 1);
        school.setMatrixAt(i, m.compose(pos, q, scl));
      }
      school.instanceMatrix.needsUpdate = true;
      fu.uTime.value = t;
      fu.uAlpha.value = 0.55 * Math.min(1, k / 0.1, (1 - k) / 0.1);
    },
    dispose() {
      scene.remove(school);
      geo.dispose();
      mat.dispose();
      school.dispose();
    },
  };
};
