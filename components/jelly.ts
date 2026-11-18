import type * as Three from "three";
import type { Creature } from "./creatures";

const PARALLAX = 0.85;
const PULSE = 3.6;

const spots = [
  { anchor: "skills", x: 0.93, y: 150, r: 28, phase: 0 },
  { anchor: "skills", x: 0.055, y: 720, r: 19, phase: 0.45 },
  { anchor: "contact", x: 0.88, y: 190, r: 24, phase: 0.8 },
];

const vert = `
uniform float uTime;
uniform float uPulse;
attribute float aKind;
attribute float aAlong;
attribute float aPhase;
varying float vKind;
varying float vAlong;
varying vec3 vW;
void main() {
  vec3 p = position;
  float c = uPulse;
  if (aKind < 0.5) {
    p.xz *= 1.0 - 0.2 * c * smoothstep(0.2, 1.0, aAlong);
    p.y *= 1.0 + 0.12 * c;
  } else {
    p.x += sin(uTime * 1.1 + aPhase + aAlong * 3.5) * 0.22 * aAlong;
    p.z += cos(uTime * 0.9 + aPhase + aAlong * 3.0) * 0.18 * aAlong;
    p.xz *= 1.0 - 0.15 * c * (1.0 - aAlong);
    p.y -= c * 0.12 * aAlong;
  }
  vKind = aKind;
  vAlong = aAlong;
  vec4 w = modelMatrix * vec4(p, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const frag = `
uniform vec3 uTint;
uniform float uLevel;
varying float vKind;
varying float vAlong;
varying vec3 vW;
void main() {
  float a;
  if (vKind < 0.5) {
    vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
    vec3 v = normalize(cameraPosition - vW);
    float rim = 1.0 - abs(dot(n, v));
    a = 0.05 + rim * rim * 0.55 + 0.2 * smoothstep(0.85, 1.0, vAlong);
  } else if (vKind < 1.5) {
    a = 0.32 * (1.0 - vAlong);
  } else {
    a = 0.22 * (1.0 - vAlong * 0.8);
  }
  a *= uLevel;
  gl_FragColor = vec4(uTint * a, a);
}
`;

function geometry(T: typeof Three) {
  const pos: number[] = [];
  const kind: number[] = [];
  const along: number[] = [];
  const phase: number[] = [];
  const idx: number[] = [];
  const grid = (nu: number, nv: number, k: number, ph: number, at: (u: number, v: number) => [number, number, number]) => {
    const base = pos.length / 3;
    for (let i = 0; i <= nu; i++) {
      for (let j = 0; j <= nv; j++) {
        pos.push(...at(i / nu, j / nv));
        kind.push(k);
        along.push(k === 0 ? j / nv : i / nu);
        phase.push(ph);
        if (i < nu && j < nv) {
          const a = base + i * (nv + 1) + j;
          const b = a + nv + 1;
          idx.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
  };
  grid(40, 14, 0, 0, (u, v) => {
    const th = v * 1.75;
    const phi = u * Math.PI * 2;
    const r = Math.sin(th) * (v > 0.9 ? 0.96 : 1);
    return [r * Math.cos(phi), Math.cos(th) * 0.8, r * Math.sin(phi)];
  });
  for (let k = 0; k < 8; k++) {
    const phi = (k / 8) * Math.PI * 2 + 0.2;
    const cx = 0.86 * Math.cos(phi);
    const cz = 0.86 * Math.sin(phi);
    grid(24, 1, 1, k * 1.3, (t, s) => [cx + (s - 0.5) * 0.04, -0.12 - t * 3.2, cz]);
  }
  for (let k = 0; k < 4; k++) {
    const phi = (k / 4) * Math.PI * 2 + 0.6;
    const cx = 0.16 * Math.cos(phi);
    const cz = 0.16 * Math.sin(phi);
    grid(16, 1, 2, k * 2.1 + 0.5, (t, s) => [cx + (s - 0.5) * 0.14 * (1 - t * 0.6), -0.08 - t * 1.8, cz]);
  }
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
  g.setAttribute("aKind", new T.Float32BufferAttribute(kind, 1));
  g.setAttribute("aAlong", new T.Float32BufferAttribute(along, 1));
  g.setAttribute("aPhase", new T.Float32BufferAttribute(phase, 1));
  g.setIndex(idx);
  return g;
}

const pulse = (t: number, offset: number) => {
  const p = (((t / PULSE + offset) % 1) + 1) % 1;
  if (p < 0.3) {
    const x = p / 0.3;
    return x * x * (3 - 2 * x);
  }
  const x = (p - 0.3) / 0.7;
  return 1 - x * x * (3 - 2 * x);
};

export const jellies: Creature = ({ T, scene, blend }) => {
  const geo = geometry(T);
  const tint = new T.Vector3(0.47, 0.85, 0.89);
  const level = { value: 0.5 };
  const bodies = spots.map((s) => {
    const u = { uTime: { value: 0 }, uPulse: { value: 0 }, uTint: { value: tint }, uLevel: level };
    const mat = new T.ShaderMaterial({ uniforms: u, vertexShader: vert, fragmentShader: frag, side: T.DoubleSide, ...blend });
    const mesh = new T.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.visible = false;
    mesh.scale.setScalar(s.r);
    scene.add(mesh);
    return { s, u, mat, mesh };
  });

  return {
    theme(night) {
      level.value = night ? 0.85 : 0.5;
    },
    reset() {
      bodies.forEach((b) => (b.mesh.visible = false));
    },
    update(now, { w, h, top, k }) {
      const t = now / 1000;
      let any = false;
      for (const b of bodies) {
        const el = document.getElementById(b.s.anchor);
        if (!el) continue;
        const y = el.getBoundingClientRect().top * PARALLAX + b.s.y - top;
        const show = y > -260 && y < h + 260;
        b.mesh.visible = show;
        if (!show) continue;
        any = true;
        const c = pulse(t, b.s.phase);
        const drift = t * 0.13 + b.s.phase * 7;
        b.mesh.position.set(w * b.s.x + 14 * Math.sin(drift), -(y + 9 * Math.sin(drift * 1.6) - 6 * c), -150);
        b.mesh.rotation.set(0.28 + 0.06 * Math.sin(drift * 2.1), drift, 0.07 * Math.sin(drift * 1.3));
        b.u.uTime.value = t;
        b.u.uPulse.value = c;
        b.mesh.scale.setScalar(b.s.r * k);
      }
      return any;
    },
    dispose() {
      bodies.forEach((b) => {
        scene.remove(b.mesh);
        b.mat.dispose();
      });
      geo.dispose();
    },
  };
};
