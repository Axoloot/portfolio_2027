import type * as Three from "three";
import type { Creature } from "./creatures";

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
  vec3 col = mix(uShade, uLift, abs(n.y) * 0.35);
  float a = uAlpha * (1.0 - smoothstep(0.75, 1.0, vEdge));
  gl_FragColor = vec4(col * a, a);
}
`;

function geometry(T: typeof Three) {
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
    grid(6, 2, (iu, v) => [26 + iu * 20, 0, side * (10 + v * 6 - iu * 2), 0, 0]);
  grid(24, 1, (iu, v) => {
    const w = 2.2 * (1 - iu * 0.7);
    return [-58 - iu * 110, 0, (v - 0.5) * 2 * w, 0, 0];
  });
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
  g.setAttribute("aSpan", new T.Float32BufferAttribute(span, 1));
  g.setAttribute("aEdge", new T.Float32BufferAttribute(edge, 1));
  g.setIndex(idx);
  return g;
}

export const manta: Creature = ({ T, scene, blend, color }) => {
  const u = {
    uTime: { value: 0 },
    uAlpha: { value: 0 },
    uShade: { value: new T.Vector3() },
    uLift: { value: new T.Vector3() },
  };
  const geo = geometry(T);
  const mat = new T.ShaderMaterial({ uniforms: u, vertexShader: vert, fragmentShader: frag, side: T.DoubleSide, ...blend });
  const mesh = new T.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.visible = false;
  mesh.scale.setScalar(1.05);
  scene.add(mesh);

  let peak = 0.5;
  let next = 0;
  let swim: { born: number; y: number; scroll: number; dir: 1 | -1 } | null = null;

  return {
    theme(night) {
      u.uShade.value.set(...color("--c-trench", "#061a26"));
      u.uLift.value.set(...color("--c-shallow", "#17506a"));
      peak = night ? 0.6 : 0.5;
    },
    reset(now) {
      swim = null;
      mesh.visible = false;
      next = now + FIRST;
    },
    update(now, { w, h, top }) {
      if (!swim) {
        if (now < next) return false;
        const lo = Math.max(top + 60, h * 0.25);
        const hi = h * 0.65;
        if (lo >= hi) {
          next = now + 5000;
          return false;
        }
        swim = { born: now, y: lo + Math.random() * (hi - lo), scroll: scrollY, dir: Math.random() < 0.5 ? 1 : -1 };
      }
      const t = (now - swim.born) / 1000;
      const k = t / CROSS;
      if (k >= 1) {
        swim = null;
        mesh.visible = false;
        next = now + EVERY[0] + Math.random() * (EVERY[1] - EVERY[0]);
        return false;
      }
      const sy = swim.y - (scrollY - swim.scroll) * PARALLAX - top;
      const reach = SPAN * 1.6;
      const travel = w + 2 * reach;
      const x = swim.dir > 0 ? -reach + travel * k : w + reach - travel * k;
      const beat = t * 1.4;
      mesh.visible = true;
      mesh.position.set(x + swim.dir * 6 * Math.sin(beat), -(sy + 10 * Math.sin(t * 0.35)), -260);
      mesh.rotation.set(-0.95 + 0.08 * Math.sin(t * 0.3), swim.dir > 0 ? 0.18 : Math.PI - 0.18, 0.04 * Math.sin(beat));
      u.uTime.value = t;
      u.uAlpha.value = peak * Math.min(1, k / 0.12, (1 - k) / 0.12);
      return true;
    },
    dispose() {
      scene.remove(mesh);
      geo.dispose();
      mat.dispose();
    },
  };
};
