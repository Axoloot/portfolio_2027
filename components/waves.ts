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
export const glslSea = `
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
