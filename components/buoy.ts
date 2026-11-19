import type { ThreeLib } from "./load-three";
import type { SeaAddon } from "./sea";
import { glslSea, sea, seaGrad } from "./waves";

const profile: [number, number][] = [
  [0, -26],
  [9, -25],
  [16, -21],
  [20.5, -12],
  [22, -3],
  [22, 3],
  [20.5, 7],
  [15, 11],
  [6, 13],
  [3.2, 13.5],
  [3.2, 39],
  [5.2, 39.5],
  [5.2, 48.5],
  [3, 50],
  [1.2, 52.5],
  [0, 53],
];

const vert = `
varying vec3 vL;
varying vec3 vW;
varying vec3 vN;
void main() {
  vL = position;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const frag = `
uniform float uTime;
uniform float uFlash;
uniform float uNight;
uniform vec3 uSun;
uniform vec3 uGlow;
uniform vec3 uInk;
uniform vec3 uWater;
uniform vec3 uLight;
uniform vec3 uLightDir;
varying vec3 vL;
varying vec3 vW;
varying vec3 vN;
${glslSea}
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(cameraPosition - vW);
  float lamp = step(39.6, vL.y) * step(vL.y, 48.4);
  vec3 base = vL.y > 13.2 ? uInk : (vL.y > 0.0 ? uSun : uGlow);
  base = mix(base, uInk, 1.0 - smoothstep(0.9, 1.5, abs(vL.y)));
  float diff = max(dot(n, uLightDir), 0.0);
  float amb = mix(0.5, 0.78, n.y * 0.5 + 0.5) * mix(1.0, 0.55, uNight);
  vec3 col = base * (amb + diff * uLight * 0.75);
  vec3 h = normalize(uLightDir + v);
  col += uLight * pow(max(dot(n, h), 0.0), 48.0) * 0.35;
  vec3 glass = mix(vec3(0.62, 0.66, 0.64), vec3(0.16, 0.19, 0.22), uNight);
  col = mix(col, mix(glass, vec3(1.0, 0.93, 0.78) * 1.6, uFlash), lamp);
  float d = sea(vW.xz, uTime) - vW.y;
  if (d > 0.0) col = mix(col, uWater + uGlow * 0.08, clamp(0.12 + d / 120.0, 0.0, 0.6));
  gl_FragColor = vec4(col, 1.0);
}
`;

const rgb = (h: number) => [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255] as const;

function haloTexture(T: ThreeLib) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  [
    [0, 1],
    [0.08, 0.7],
    [0.2, 0.3],
    [0.4, 0.1],
    [0.7, 0.025],
    [1, 0],
  ].forEach(([o, a]) => r.addColorStop(o, `rgba(255,232,190,${a})`));
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new T.CanvasTexture(c);
}

const flash = (t: number) => {
  const m = t % 4;
  return Math.exp(-(((m - 0.35) / 0.2) ** 2));
};

export const buoy: SeaAddon = ({ T, scene, u }) => {
  const v3 = (h: number) => ({ value: new T.Vector3(...rgb(h)) });
  const bu = {
    uTime: { value: 0 },
    uFlash: { value: 0 },
    uNight: { value: 0 },
    uSun: v3(0xf2b83b),
    uGlow: v3(0x4fd1d9),
    uInk: v3(0x0b2230),
    uWater: u.uWater,
    uLight: u.uLight,
    uLightDir: u.uLightDir,
  };
  const geo = new T.LatheGeometry(
    profile.map(([r, y]) => new T.Vector2(r, y)),
    56,
  );
  const mat = new T.ShaderMaterial({ uniforms: bu, vertexShader: vert, fragmentShader: frag });
  const body = new T.Mesh(geo, mat);
  const tex = haloTexture(T);
  const halo = new T.Sprite(new T.SpriteMaterial({ map: tex, blending: T.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  halo.scale.set(110, 110, 1);
  halo.position.y = 44;
  const rig = new T.Group();
  rig.add(body, halo);
  scene.add(rig);

  let x = 0;
  let night = false;
  let tiltX = 0;
  let tiltZ = 0;
  let last = 0;

  return {
    resize(w) {
      x = Math.min(w / 2 - 64, 520);
    },
    theme() {
      night = document.documentElement.dataset.theme === "dark";
      bu.uNight.value = night ? 1 : 0;
    },
    frame(t) {
      const dt = last ? Math.min(t - last, 0.1) : 0.016;
      last = t;
      const y = (sea(x - 14, 0, t) + sea(x + 14, 0, t) + sea(x, -14, t) + sea(x, 14, t)) / 4;
      const [gx, gz] = seaGrad(x, 0, t);
      const k = 1 - Math.exp(-dt * 2.5);
      tiltZ += (Math.atan(gx) * 0.8 - tiltZ) * k;
      tiltX += (-Math.atan(gz) * 0.8 - tiltX) * k;
      rig.position.set(x, y - 2, 4);
      rig.rotation.set(tiltX, 0, tiltZ);
      const f = night ? flash(t) : 0;
      bu.uTime.value = t;
      bu.uFlash.value = f;
      halo.material.opacity = f;
      rig.updateMatrixWorld();
      const top = rig.localToWorld(new T.Vector3(0, 44, 0));
      u.uLamp.value.set(top.x, top.z, f, 0);
    },
    dispose() {
      scene.remove(rig);
      geo.dispose();
      mat.dispose();
      tex.dispose();
      halo.material.dispose();
    },
  };
};
