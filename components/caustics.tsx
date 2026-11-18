"use client";

import { useEffect, useRef } from "react";

const HEIGHT = 1100;

const vert = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const frag = `
precision mediump float;
uniform vec2 uSize;
uniform float uTime;
uniform float uLevel;
uniform vec3 uTint;
varying vec2 vUv;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float edge(vec2 p, float t) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = 0.5 + 0.42 * sin(t + 6.2831 * hash(i + g));
      float d = length(g + o - f);
      if (d < f1) {
        f2 = f1;
        f1 = d;
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  return f2 - f1;
}

void main() {
  vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  vec2 p = px / 170.0;
  p += 0.35 * vec2(sin(p.y * 1.7 + uTime * 0.23), sin(p.x * 1.3 - uTime * 0.19));
  float a = edge(p, uTime * 0.4);
  float b = edge(p * 1.45 + 7.3 + 0.2 * sin(p.yx * 2.1 + uTime * 0.3), uTime * 0.55 + 2.0);
  float c = pow(smoothstep(0.14, 0.0, a), 1.6) * 0.75 + pow(smoothstep(0.11, 0.0, b), 1.6) * 0.45;
  float depth = px.y / uSize.y;
  float fade = (1.0 - smoothstep(0.0, 1.0, depth)) * smoothstep(0.0, 0.14, depth);
  float k = c * fade * uLevel;
  gl_FragColor = vec4(uTint * k, k);
}
`;

function start(canvas: HTMLCanvasElement, still: boolean) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return () => {};
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {};
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uSize = gl.getUniformLocation(prog, "uSize");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uLevel = gl.getUniformLocation(prog, "uLevel");
  const uTint = gl.getUniformLocation(prog, "uTint");

  const theme = () => {
    const night = document.documentElement.dataset.theme === "dark";
    gl.uniform1f(uLevel, night ? 0.11 : 0.16);
    if (night) gl.uniform3f(uTint, 0.72, 0.82, 0.9);
    else gl.uniform3f(uTint, 0.55, 0.92, 0.95);
  };
  const resize = () => {
    const scale = Math.min(devicePixelRatio, 1) * 0.6;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uSize, w, h);
  };
  const draw = (now: number) => {
    gl.uniform1f(uTime, still ? 12 : now / 1000);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let raf = 0;
  let visible = false;
  const loop = (now: number) => {
    draw(now);
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    if (!still && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
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

  theme();
  resize();
  draw(performance.now());
  canvas.dataset.on = "";
  io.observe(canvas);
  ro.observe(canvas);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("visibilitychange", onVis);

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    mo.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    gl.deleteBuffer(buf);
    gl.deleteProgram(prog);
    delete canvas.dataset.on;
  };
}

export function Caustics() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    return start(canvas, matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return <canvas ref={ref} aria-hidden className="caustics pointer-events-none absolute inset-x-0 top-0 -z-10 w-full" style={{ height: HEIGHT }} />;
}
