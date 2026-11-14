# Personal Portfolio — Trong Tu Luu

Portfolio of Trong Tu Luu (Tuu), brand [tuu]¹⁰|1024. The landing page is an interactive isometric 3D room in four zones (Engineering, Design & visual, Lab, About); each object in the room opens a kind of work. Built with React 19, Vite, Tailwind CSS v4 and React Three Fiber.

[![CI](https://github.com/Tuu01/personal-web/actions/workflows/ci.yml/badge.svg)](https://github.com/Tuu01/personal-web/actions/workflows/ci.yml)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| 3D | React Three Fiber / Drei |
| Routing | React Router v7 |
| Hosting | Vercel |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm test` | Run Vitest unit tests |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build locally |

## Project structure

```
src/
  room/         # The 3D room: data (objects.json, cameras.json from the handoff),
                # camera maths, the R3F scene (lazy-loaded) and the panel
  pages/        # Routes: home, /work/*, /about, /contact, /visual
  components/   # Page shell, case-study primitives, scroll handling
  sections/     # Header and footer
  brand/        # Wordmark, monogram, arrow
  lib/          # Theme (day / night) and public contact details
  __tests__/    # Vitest + Testing Library tests
public/room/    # tuu-room.glb (meshopt) and the overview posters
```

The room model and camera data come from `tuu-portfolio-handoff/` (built in Blender with
`room/tuu_room_blender.py`). To update the room, export a new `tuu-room.opt.glb` and copy it to
`public/room/tuu-room.glb`; if cameras or objects change, copy `data/objects.json` and
`data/cameras.json` to `src/room/data/`.

Old project URLs `/P1`–`/P5` redirect to the new `/work/...` pages.

## Testing

Tests live in `src/__tests__/` and cover:

- **Camera maths** — window fitting, frustum placement, shot blending
- **Room data** — every object has cameras, every room link points at a real page and anchor
- **Routes** — legacy redirects, page anchors, 404
- **Reveal**, **ScrollToTop**

```bash
npm test
```

## CI

GitHub Actions runs on every push and pull request to `main`:

1. Install dependencies (`npm ci`)
2. Lint (`npm run lint`)
3. Test (`npm test`)
4. Build (`npm run build`)

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
