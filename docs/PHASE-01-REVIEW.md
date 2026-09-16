# Phase 01 — implementation and visual review

Historical record: this composition was rejected by Ahmad. See [September 16 still revision](HERO-STILL-REVIEW.md) for the current implementation. Measurements and asset availability below describe the earlier version only.

Date: 2026-09-15. Status: implemented and locally validated; awaiting Ahmad's visual approval. Phase 02 has not started. No deployment or external service was created.

## 1. Repository findings

The entire initial file inventory was `.DS_Store`, `AGENTS.md` and the five source-of-truth documents. No `.git`, application source, manifest, dependencies, configuration or public assets existed. `git status --short` returned “not a git repository.” There was no earlier portfolio/chatbot code to preserve or migrate; all useful documentation was preserved and reconciled with the approved implementation brief. Historical identity photos and résumé references are not present as usable workspace assets.

## 2. What changed

Built the Next.js foundation and a single route with semantic navigation, approved identity/headline, fluid typography, responsive hero composition, neutral abstract identity field, usable approach anchor, small narrative transition and footer. Added focus/selection/hover/active language, skip navigation, local fonts and descriptive metadata. The native cursor is retained.

The field contains no person, facial reconstruction, stock imagery or inferred likeness. CSS owns its finite entrance and control feedback; one client component adds bounded, event-driven pointer movement. Text is readable immediately and the page works with JavaScript disabled. All page links have real local destinations; no unsupported project features, contact addresses, metrics or credentials were added.

The brief's Phase 01 replaces the older proposed portrait/hologram prototype scope. Updated all five original documents plus AGENTS.md, locking the headline and roadmap while retaining unknowns as unknowns. Numerical styling and supporting copy await review.

## 3. Architecture decisions

- Next.js App Router with server-rendered layout/page. `/` is prerendered as static content by the production build.
- TypeScript strict mode; npm with one synchronized lockfile and exact direct dependency versions.
- Tailwind 4 theme tokens plus custom CSS for the editorial composition. The custom `.shell` name avoids Tailwind's default container widths.
- Self-hosted Inter and Space Grotesk from Fontsource packages; SIL Open Font License verified in each package. No runtime font CDN dependency.
- One client boundary for pointer enhancement; no continuous React state updates or idle render loop. Pointer/preferences/visibility listeners and scheduled frames clean up on unmount.
- No WebGL, GSAP, Motion or assistant backend in this phase. Their intended ownership remains documented for the phases that need them.
- Local-only metadata uses `noindex, nofollow` pending release. Canonical URL, contact URLs and social artwork await verified inputs/explicit scope.
- Framework conventions were checked against the installed Next.js docs (`node_modules/next/dist/docs/`) and the [official installation guidance](https://nextjs.org/docs/app/getting-started/installation). Next.js appended its own version-aware guidance block to AGENTS.md; the project's original instructions remain intact.

## 4. Dependencies

| Added | Version | Purpose |
| --- | --- | --- |
| next | 16.3.5 | App Router/application runtime |
| react / react-dom | 19.3.0 | Rendering and isolated pointer lifecycle |
| @fontsource-variable/inter / space-grotesk | 5.3.0 | Local licensed typography |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | Theme/utilities and CSS compilation |
| typescript | 5.9.3 | Strict type checking |
| @types/node | 22.20.2 | Node types |
| @types/react / react-dom | 19.3.0 | React types |
| eslint | 9.39.5 | Compatible lint runtime |
| eslint-config-next | 16.3.5 | Next/React/TypeScript lint rules |
| @playwright/test | 1.63.0 | Development-only browser validation |

No pre-existing dependency was removed. ESLint 10.10.0 was tested but fails within the bundled React lint plugin (`contextOrFilename.getFilename is not a function`); final version is pinned to compatible ESLint 9.39.5. npm marks that version unsupported/deprecated: revisit when Next's lint plugins support ESLint 10. The final installation reported zero known vulnerabilities. npm also reported an unapproved `unrs-resolver` postinstall; no scripts were broadly approved and lint/build completed successfully.

## 5. Files created/modified

Created:
- `package.json`, `package-lock.json`, `.gitignore`, `README.md`.
- `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`.
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`.
- `src/components/identity-field.tsx`.
- `playwright.config.ts`, `tests/hero.spec.ts`.
- `docs/PHASE-01-REVIEW.md`, five screenshots in `docs/review/`, and `docs/review/performance.json`.

Modified: `AGENTS.md`, `docs/MASTER-SPEC.md`, `docs/DESIGN-SYSTEM.md`, `docs/MOTION-SYSTEM.md`, `docs/CONTENT.md`, `docs/PROJECTS.md`.

Generated local dependencies, build output and test results are ignored. The empty `public/` directory reserves future assets; no identity assets were copied or published.

## 6. Validation results

Environment: macOS 15.7.9 x86_64, Intel Core i7-8569U @ 2.80GHz, Node 26.4.0, npm 11.17.0, headless Chromium 153.0.8010.12.

| Check | Result |
| --- | --- |
| Repository inventory / Git status | Documentation only; Git absent |
| npm registry version/peer check | Next 16.3.5 supports installed React 19; Node requirement met |
| npm install / lockfile synchronization | Passed; exact versions and one lockfile |
| `npm run lint` | Passed without warnings after config fix |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; `/` and default not-found prerendered |
| Local development HTTP request | 200 OK at port 3000 |
| `npm run test:e2e` | 12 passed against final production build |
| Responsive bounds and anchor destination | Passed at 320, 390, 768, 1024, 1440, 1920px |
| Keyboard skip link, CTA activation and focus outline | Passed |
| Bounded pointer response and live reduced-motion preference | Passed |
| JavaScript disabled | Headline, field and approach navigation usable; no canvas/WebGL dependency |
| 200% root text size | Passed at 320, 390, 1280px, checking element bounds and internal overflow |
| Runtime page errors | None recorded in viewport tests |
| Visual inspection | Desktop/mobile and enlarged-text screenshots reviewed |

Visual refinement addressed tight headline spacing, the default Tailwind container constraint, and clipping at enlarged text sizes. The latter was found in screenshots despite an initial page-width test passing; regression checks now also inspect individual content bounds. Enlarged narrow layouts intentionally wrap long words rather than clip content.

Calculated solid-color contrast: primary text 17.57:1, secondary text 8.53:1, accent 11.29:1 against the ground; CTA label 15.28:1; secondary field annotation against the surface 7.08:1. Decorative low-contrast linework does not carry essential information. These token checks are not a full accessibility certification.

### Performance observation

One fresh-context local production observation at 1440×960, no throttling:
- FCP and LCP: 124ms.
- Observed layout shift sum: 0.00185.
- Loaded script encoded bodies: 128,303 bytes.
- 120 requestAnimationFrame intervals during synthetic pointer events: median 16.7ms, p95 16.7ms, max 16.8ms.

Raw values and environment: [performance.json](review/performance.json). These are a single headless localhost observation, not production network performance, GPU presentation timings, field INP or a universal 60fps guarantee. Real representative-device profiling remains required before the advanced identity experience is accepted.

## 7. Known limitations

- The connected browser surface was unavailable; actual rendered review used local Playwright Chromium screenshots. Safari/Firefox, real touch hardware, screen-reader narration, throttled mobile performance and a complete Phase 10 audit remain untested.
- `200%` checks enlarge CSS root text, not the browser's zoom UI; real-browser zoom should also be reviewed.
- ESLint 9 maintenance warning remains as described above; no lint or build failures remain.
- Identity reference selection, résumé/project evidence, final contact details, domain and approved visual reference are still required for relevant later phases.
- No Git history or remote existed; none was assumed. No deployment was performed.

## 8. View locally

Dependencies are installed. Run:

```sh
cd /Users/apple/Projects/Ahmad/AgenticAI-WebPortfolio
npm run dev
```

Open http://127.0.0.1:3000. This task retains its development server there, so you can open that address directly now. If starting another server while it is running, use the address Next prints. For a clean install on another checkout run `npm ci` first.

## 9. Visual review checkpoint

- [Desktop screenshot](review/hero-1440.png)
- [Mobile screenshot](review/hero-390.png)
- [Enlarged text, 320px](review/hero-text-200-320.png)
- [Enlarged text, 390px](review/hero-text-200-390.png)
- [Enlarged text, 1280px](review/hero-text-200-1280.png)

Inspect typography/line breaks, headline-to-field balance, whitespace, blue accent restraint, CTA prominence, mobile reading order, gentle pointer response and the small approach transition. Use Tab to inspect focus and enable system reduced motion to verify the static presentation. Decide whether this hero composition is the right foundation before moving on.

## 10. Proposed Phase 02 — not implemented

After explicit approval, locate and inspect the authoritative reference photographs and accepted hero reference. Select a recognizable portrait and derive a lightweight optimized static fallback, retaining private originals separately. Begin with a photo-derived depth/material treatment that preserves facial geometry; evaluate genuine 3D reconstruction only if the assets and desired interaction justify it. Mount the lazy-loaded scene inside the existing field boundary, with measured quality tiers, context-loss/loading failure fallback, offscreen/hidden suspension and reduced-motion behavior. Review likeness and desktop/mobile performance at a separate visual checkpoint before authorizing Phase 03.
