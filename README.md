# cyrildelajudie.fr

Portfolio of Cyril de Lajudie. Next.js 16 (App Router, Cache Components), Tailwind v4, TypeScript, three.js for the sea. Deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000, redirects to /en or /fr
npm run build
npm run lint
```

## Layout

- `app/[lang]/`: the page, the CV viewer (`cv/`) and the root layout. `en` and `fr` are prerendered; `proxy.ts` redirects `/` from `Accept-Language`.
- `content/data.ts`: roles, projects, skills, education, automations, about. `content/ui.ts`: EN/FR interface strings. Components hold no copy.
- `components/ui.tsx`, `client.tsx`: server and client UI pieces.
- `components/gl.ts`: shared WebGL plumbing (renderer, observers, lazy three.js import, reduced-motion gate).
- `components/three.ts`: the subset of three.js the site uses. Add a class here before using it, so the lazy chunk stays small.
- `components/sea.tsx` (waterline, with `buoy.ts` and `fish.ts` addons), `gulls.tsx`, `creatures.tsx` (`manta.ts`, `jelly.ts`): the ambient WebGL layers. All load after paint, pause off-screen and fall back to the static SVG swell on reduced motion or missing WebGL.

## Content notes

- Automations (`automations` in `data.ts`): before/after come from the master CV doc. `gain` stays empty until a measured figure exists; the card hides the line when it is missing.
- About (`about`): from the master CV doc and the owner's own answers.

## CV

`public/cv-fr.pdf` is the download. `/[lang]/cv` shows page images from `public/cv/`. When the PDF changes, regenerate them and update `site.cvPages` in `data.ts`:

```bash
pdftoppm -jpeg -jpegopt quality=85 -r 150 public/cv-fr.pdf public/cv/page
```

## /old

`/old` serves the 2024 portfolio, a static single-page app built with base path `/old`, through rewrites in `next.config.ts`. Its files live in `public/portfolio-2024`, because a `public/old` folder would shadow the `/old` route.
