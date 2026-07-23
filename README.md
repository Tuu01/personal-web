# Personal Portfolio — Trong Tu Luu

A fast, animated portfolio built with React 19, Vite, and Tailwind CSS v4. Features full-page transitions, a 3D hero scene, and case-study pages for each project.

[![CI](https://github.com/Tuu01/personal-web/actions/workflows/ci.yml/badge.svg)](https://github.com/Tuu01/personal-web/actions/workflows/ci.yml)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| 3D | React Three Fiber / Drei |
| Smooth scroll | Lenis |
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
  components/   # Shared primitives (Reveal, GridLines, 3D Mac)
  sections/     # Page-level sections (Hero, Navbar, Footer, About)
  pages/        # Route-level pages and case studies
  __tests__/    # Vitest + Testing Library tests
```

## Testing

Tests live in `src/__tests__/` and cover:

- **Reveal** — renders children, custom className, reduced-motion fallback
- **About accordion** — sections start closed, toggle open/closed on click
- **ScrollToTop** — renders children, calls `scrollTo` on navigation

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
