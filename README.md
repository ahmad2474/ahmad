# Ahmad Hassan — Portfolio V2

Ahmad's portrait responds to the cursor, disperses, gathers into an agent network, becomes context documents, then forms the planned CloudOps evidence engine. Agentic AI, context and CloudOps share a violet theme, heading/visual overview and three-card row. CloudOps remains clearly in development; public counts describe planned scope and unknown results are omitted. GitHub/Vercel publishing of this current milestone is authorized; infrastructure, other full case studies and the assistant backend remain deferred.

## Run locally

Requirements: Node.js 22+ and npm. Validated here with Node.js 26.4.0 and npm 11.17.0.

```sh
cd /Users/apple/Projects/Ahmad/AgenticAI-WebPortfolio
npm ci
npm run dev
```

If dependencies are already installed, just run `npm run dev`. Open http://127.0.0.1:3000 (use the address printed by Next.js if that port is occupied). The current working session retains a development server on port 3000.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The browser suite uses the production build and starts/stops its own server on port 3001. Run `npm run build` first. On a machine without Playwright Chromium, run `npx playwright install chromium` once. For a manual production preview: `npm run build` then `npm run start`.

## Structure

- `src/app/page.tsx`: server-rendered cinematic hero, navigation and WhatsApp contact action.
- `src/app/layout.tsx`: root document, self-hosted fonts, metadata and skip link.
- `src/app/globals.css`: Tailwind theme, design tokens, responsive composition and motion.
- `src/components/identity-field.tsx`: accessible static particle portrait and scene anchor.
- `src/components/agentic-scene.tsx`: lazy initialization, reduced-motion preference and pause control.
- `src/components/agentic-chapter.tsx`: semantic Agentic AI chapter, phase navigation and static SVG network.
- `src/lib/agentic-network.ts`: shared diagram layout and procedural particle destinations.
- `src/components/context-chapter.tsx`: semantic evidence-flow chapter, static document diagram and in-development project note.
- `src/lib/context-particles.ts`: procedural source-document destinations for the existing particles.
- `src/components/cloudops-chapter.tsx`: planned CloudOps architecture, source counts and engineering capabilities.
- `src/lib/cloudops-particles.ts`: shared architecture coordinates and procedural evidence-engine destinations.
- `src/lib/particle-renderer.ts`: Three.js rendering, GSAP scroll choreography and lifecycle cleanup.
- `src/lib/portrait-particles.ts`: adapter for the supplied point-cloud data.
- `tests/hero.spec.ts`: layout, anchor, keyboard, reduced-motion and no-JavaScript checks.
- `tests/context.spec.ts`: document gathering/reversal/pause, context loss and responsive context checks.
- `docs/`: persistent specification and evidence registers.

Read [unified chapter review](docs/UNIFIED-CHAPTERS-REVIEW.md) for the latest milestone. Earlier reports describe historical versions.

## Vercel deployment

Repository: [ahmad2474/ahmad](https://github.com/ahmad2474/ahmad), selected by Ahmad. Deployment branch: `main`.

Import this repository once in Vercel, select the Next.js preset, and use the repository root. Use `npm ci` for installation and `npm run build` for the build; leave the output directory at the framework default. No environment variables or backend services are required for the current site. Subsequent pushes to the connected branch trigger deployments.

The site remains non-indexed while it is under visual review. Raw identity photographs and the original résumé stay local in ignored `references/`; the runtime portrait assets and `myhologram/portraitParticles.js` are included. Local dependencies, builds, environment files, browser reports and `.vercel/` configuration are ignored.
