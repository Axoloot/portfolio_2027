export type ThreeLib = typeof import("./three");

let lib: Promise<ThreeLib> | undefined;

// Waits until the page has loaded and the main thread is idle, so the three.js
// chunk never competes with the HTML, CSS, fonts or hydration. Every scene
// shares the same request.
export function loadThree(): Promise<ThreeLib> {
  return (lib ??= idle().then(() => import("./three")));
}

function idle() {
  return new Promise<void>((resolve) => {
    const go = () => ("requestIdleCallback" in window ? requestIdleCallback(() => resolve(), { timeout: 2000 }) : setTimeout(resolve, 200));
    if (document.readyState === "complete") go();
    else addEventListener("load", go, { once: true });
  });
}
