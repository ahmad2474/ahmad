# Ahmad Hassan — Portfolio V2

Six compact sections: Hero → Ahmad.AI → DevOps/Infrastructure → Agentic AI → Projects → Contact/footer. The same portrait particles disperse and reform into every visual, with reversible scrolling and project-selection morphs. CloudOps is clearly in development; its scope/counts stay planned and unknown results are omitted.

Live review: [ahmad-umber.vercel.app](https://ahmad-umber.vercel.app/).

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
- `src/components/assistant-section.tsx`, `profile-chat.tsx`: abstract agent symbol and grounded conversation interface.
- `src/app/api/ahmad/route.ts`: server-only Groq/Gemini failover, input limits and labeled profile-reference fallback.
- `src/lib/portfolio-knowledge.ts`: curated public facts and evidence links; no raw CV/private identifiers.
- `src/components/infrastructure-section.tsx`: concise DevOps story and connected topology.
- `src/components/projects-section.tsx`: keyboard-operable highlighted-project selection and details.
- `src/components/contact-section.tsx`: verified public contact links.
- `src/lib/portfolio-forms.ts`: non-identity bot/infrastructure/project destinations.
- `src/lib/cloudops-particles.ts`: shared architecture coordinates and procedural evidence-engine destinations.
- `src/lib/particle-renderer.ts`: Three.js rendering, GSAP scroll choreography and lifecycle cleanup.
- `src/lib/portrait-particles.ts`: adapter for the supplied point-cloud data.
- `tests/hero.spec.ts`: layout, anchor, keyboard, reduced-motion and no-JavaScript checks.
- `tests/context.spec.ts`: planned architecture remains populated at adaptive quality budgets.
- `tests/compact.spec.ts`: narrative order, all-section reversal, project morphing, profile answers and chat errors.
- `tests/assistant-api.spec.ts`: mocked provider failover and invalid-source rejection; no live model calls.
- `docs/`: persistent specification and evidence registers.

Read [compact portfolio review](docs/COMPACT-PORTFOLIO-REVIEW.md) for the latest milestone. Earlier reports/components describe retained historical versions.

## Vercel deployment

Repository: [ahmad2474/ahmad](https://github.com/ahmad2474/ahmad), selected by Ahmad. Deployment branch: `main`.

Connected to the existing Vercel project: Next.js preset, repository root, `npm ci`, `npm run build`, framework-default output. Pushes to `main` trigger deployments. Without model keys, the chat serves explicitly labeled direct profile-reference answers.

## Activating Ahmad.AI

Add `GROQ_API_KEY` in Vercel's server-side environment variables (Production and Preview as desired); optionally add `GEMINI_API_KEY` for fallback. Redeploy after adding variables. For local work, copy `.env.example` to `.env.local`. Never use a `NEXT_PUBLIC_` prefix for keys. Default models: Groq `openai/gpt-oss-20b`, Gemini `gemini-2.5-flash-lite`; override with `GROQ_MODEL` / `GEMINI_MODEL` if account availability changes. A Gemini key supplied locally was moved out of the tracked example into ignored local configuration. Vercel configuration and actual provider connectivity/answer quality remain unverified; live model testing is deferred.

Use free-tier accounts and verify quotas/billing settings in the provider dashboards: [Groq limits](https://console.groq.com/docs/rate-limits), [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing). This app does not enable billing or a paid fallback. Provider timeouts, bounded context/output, a process-local limiter and concurrency backpressure reduce usage; they are not distributed rate or spending guarantees. Configure provider account limits and Vercel Firewall as needed for public traffic.

The knowledge base is curated from public profile/project evidence, not a raw-CV upload. Rendered source IDs/links are allowlisted; this does not prove every generated statement accurate. No browsing/actions or persistent chat storage. Submitted context is sent to configured providers; the UI discloses that AI processing. Do not submit confidential information.

The site remains non-indexed while it is under visual review. Raw identity photographs and the original résumé stay local in ignored `references/`; the runtime portrait assets and `myhologram/portraitParticles.js` are included. Local dependencies, builds, environment files, browser reports and `.vercel/` configuration are ignored.

Latest configuration checkpoint: Ahmad reports both keys added in Vercel. The approved local Gemini request returned the labeled provider-unavailable profile fallback; a real model-generated answer remains unconfirmed. This supersedes the earlier setup deferral above.
