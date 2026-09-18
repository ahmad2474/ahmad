# Portfolio V2 — Master specification

Status: compact six-section portfolio approved and implemented for review. One original portrait particle system reforms into each narrative visual. Groq/Gemini Ahmad.AI structure is implemented. The user reports both keys added in Vercel; the approved local Gemini test returned the labeled provider-unavailable profile fallback. Working model generation remains unconfirmed. Current review site: https://ahmad-umber.vercel.app/.
Date: 2026-09-17.
Owner: Ahmad Hassan.

## Source of truth
Identity: **Ahmad Hassan — Agentic AI Developer × DevOps Engineer**.
The current user brief defines locked requirements. The referenced conversation, “Portfolio Redesign Plan,” supplies historical context; its suggestions are not automatically approved requirements.

Read alongside [Design system](DESIGN-SYSTEM.md), [Motion system](MOTION-SYSTEM.md), [Content](CONTENT.md) and [Projects](PROJECTS.md). AGENTS.md governs ongoing project work. Record changes here and in the relevant specialist document.

## Inspection baseline
The registered local project is `/Users/apple/Projects/Ahmad/AgenticAI-WebPortfolio` (app label: AgenticAI-Web-Portfolio). It was empty at inspection: no code, package manifest, assets, AGENTS.md, or .git directory. No existing implementation was replaced. The Phase 01 implementation now uses this registered folder directly. At Phase 01 inspection it contained AGENTS.md and five planning documents, but no application, package/config files, public assets or Git metadata. Existing documentation is preserved and reconciled with the new brief.

## Locked experience

September 18 latest detail direction: remove the visible pause button, show a back-to-top arrow below the hero, and add restrained desktop wheel easing. Native touch/precision input and reduced-motion fallbacks remain; no narrative or identity change.
Premium editorial/cinematic technical design inspired by Dala's restraint. High-end motion and WebGL support storytelling. Avoid generic AI templates, Matrix rain, excessive HUD clutter and cyberpunk dashboards.

The hero centers Ahmad's actual likeness, treated as an interactive hologram. `references/hero-layout-v1.png` guides composition, never identity. Dala guides continuous particle behavior, depth and scroll storytelling. The supplied portrait renders recognizably with bounded cursor response. The latest approved compact sequence carries those same particles into Ahmad.AI's abstract bot symbol, infrastructure, the agent network, the selected project, and contact ambience. Reverse scrolling reforms earlier forms and the original portrait. The user authorized this complete compact revision and GitHub/Vercel publishing; model keys are deferred by the user.

## Narrative sequence
1. Hero — Ahmad's existing recognizable portrait, identity and contact action.
2. Ahmad.AI — original particles become an abstract bot symbol left; chat right.
3. DevOps/Infrastructure — concise copy left, connected particle topology right.
4. Agentic AI — concise agent/RAG capabilities left, reasoning network right.
5. Highlighted Projects — changing particle visual left, OpsPilot / InsightLoop / in-development CloudOps selector right.
6. Contact/footer — compact close, verified WhatsApp/email/GitHub/LinkedIn links.

This approved sequence replaces the earlier nine-chapter plan. No separate context or full-length project chapters. Reserve the full-screen treatment for the hero; the rest stays in normal document flow.

WordPress belongs in earlier/supporting experience. Do not elevate it into the hero identity.

## Preferred architecture
- Next.js + TypeScript + Tailwind for application and design tokens.
- React Three Fiber/Three.js for an isolated, lazy-loaded client-side holographic scene.
- GSAP for section/scroll choreography; Framer Motion for small interface transitions.
- Vercel as deployment target; publishing the completed milestone through GitHub is now authorized by the September 17 publishing direction.
- Proposed: render text and primary navigation independently of the WebGL layer; mount the scene as progressive enhancement. A static verified portrait remains available on loading failure or unsupported devices.
- Select supported compatible library versions and package manager during implementation. No versions are locked by this document.
- Ahmad.AI: curated public facts with evidence links; Next.js server endpoint; Groq primary/Gemini fallback using server-only keys and bounded requests. No persistent conversations or assistant tools. Missing keys/provider failures produce visibly labeled direct profile answers. The user will add keys later. Provider quotas/account settings govern free-tier usage; local process limits are not a distributed quota.

## Quality requirements
Responsive from small phones to wide desktop; keyboard-operable controls; visible focus; meaningful document structure; accessible contrast; prefers-reduced-motion support; descriptive metadata; social sharing artwork deferred until requested; optimized portrait assets; lazy-loaded WebGL; production-quality error handling.

Performance target: smooth 60fps under normal interaction on agreed representative hardware. Proposed release budgets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, assessed with lab checks before release and field data when available. These are proposed targets, not measured results. Establish asset/JavaScript budgets after the first real portrait prototype; do not preload a heavy 3D scene ahead of essential content.

## Original Phase 01 scope — historical

The neutral-field implementation below was rejected visually. It is superseded by the September 16 still checkpoint described above and in [the current review](HERO-STILL-REVIEW.md).
1. Inspect all current files and preserve existing documentation; no earlier portfolio source is present to import.
2. Initialize Next.js App Router, TypeScript and Tailwind with npm and one lockfile. Add lint, typecheck and production build commands.
3. Establish typography, color/spacing/motion tokens, responsive layout, navigation, accessible links, background and metadata.
4. Build the approved hero headline and identity layout with an abstract neutral field. No invented face, portrait requirement or WebGL prototype in Phase 01.
5. Use CSS for modest interface transitions and a small isolated client component for pointer enhancement. Reserve GSAP, Motion and R3F for phases that need them.
6. Include only a minimal approach transition below the hero to review composition and scrolling. Do not invent contact URLs or project evidence.
7. Validate the rendered site, mobile/desktop layout, keyboard navigation, reduced motion and no-JavaScript fallback. Report measured checks and remaining limitations.
8. Stop for the user's major visual milestone review before Phase 02.

### Phase 01 completion criteria
- Clear identity, approved headline, strong hierarchy, premium spacing and intentional negative space.
- Neutral field reserves space for future likeness; no fabricated face or technical claims.
- Text and links work independently of client enhancement; no layout shift from loading graphics.
- Keyboard, touch and reduced motion remain usable; pointer listeners and scheduled frames clean up.
- Actual lint/typecheck/build checks pass; browser observations and performance limitations are documented.
- No later sections in full, assistant backend, external service or deployment.

## Historical phased roadmap
01 Foundation + hero shell → 02 Ahmad hologram / identity → 03 Agentic AI → 04 RAG/context → 05 Infrastructure → 06 OpsPilot + InsightLoop → 07 Engineering/experience → 08 Ahmad.AI → 09 Contact/closing → 10 Performance/accessibility/responsive/SEO/QA → 11 Production deployment.
The approved compact six-section revision above supersedes this longer chapter-by-chapter roadmap. Ahmad.AI's server structure is authorized; real-provider activation/validation awaits keys. Final native-device performance, complete SEO/indexing approval and the final domain remain future release checks.

## Decision log
- 2026-09-18 (assistant résumé): User authorizes full public résumé skills, experience/employer/date history, projects, education/certification names and contacts, plus WordPress/Digital Marketing/Business Communication. Expanded curated knowledge, honest year/date/status distinctions, polite off-topic boundaries for AI and fallback, and contact source links. No private certificate IDs, fabricated results or current-employment claim. See [assistant review](ASSISTANT-RESUME-REVIEW.md).
- 2026-09-18 (favicon/visuals): User requested a custom favicon and redesign of Ahmad.AI, InsightLoop and CloudOps animations before improving chat responses. Implemented for review: AH monogram, four-point agent sigil, continuous feedback ribbon, evidence pages and faceted core. Same portrait particle system and static fallback strategy. No chatbot backend change or model request. See [sculpture review](SCULPTURES-REVIEW.md).
- 2026-09-18 (mobile/density): User requested a mobile three-line navigation toggle and a 25% reduction in desktop hologram particles to improve clarity. Added native disclosure with keyboard/Escape/outside/selection dismissal enhancement. Desktop keeps the inline glass nav. Desktop spatial samples are 7,374, compact remains 3,022; source anatomy, glyph sizing, material and one-canvas narrative are preserved.
- 2026-09-18 (detail refinement): User requested a single glass navigation surface with corrected text colors, removal of the hero sign-off, aligned desktop left/right text starts, plain non-linked/non-boxed scroll text, and footer name/copyright with an automatic current year. Implemented within the existing composition; no narrative, backend or particle changes.
- 2026-09-18: User reports the live chatbot works and approves the recommended atmospheric refinement: soft violet movement/cursor response, occasional particle trails and reformation glow. Adds rounded boxes/buttons and boxed action links. Implemented inside the existing renderer with mobile/economy simplification and static fallback; the six-section narrative and portrait source remain unchanged. Publishing authorization continues through the existing GitHub/Vercel connection. See [atmosphere review](ATMOSPHERE-REVIEW.md).
- 2026-09-17 (compact revision): User approved shortening the portfolio to six sections, with Ahmad.AI directly after the hero, and explicitly locked the same portrait particles reforming across every animation. Added infrastructure, condensed agent/RAG explanations, an interactive three-project selector, and contact. Read OpsPilot/InsightLoop public READMEs and selected source artifacts before writing descriptions. The user approved Groq/Gemini structure and will add keys later; no paid service or actual model activation is asserted. Earlier narrative/assistant deferrals are superseded for this scope. Review: [compact portfolio](COMPACT-PORTFOLIO-REVIEW.md).
- 2026-09-17 (publishing): User requested committing the completed milestone to GitHub so their Vercel account can deploy future changes, and selected the existing empty public repository [ahmad2474/ahmad](https://github.com/ahmad2474/ahmad). GitHub push and Vercel connection are now authorized, superseding the earlier local-only deployment restriction. Later narrative chapters remain deferred. Keep raw references local and deployment previews non-indexed. Record a deployment URL only after verification.
- 2026-09-17 (current layout revision): User requested the agent globe beside heading/supporting copy, three cards below in a row, the same violet theme/cards in context, and a comparable animated CloudOps section with fuller supplied details. Removed the tall sticky agent composition; every explanation remains visible. The same point cloud gains a procedural evidence-engine destination for the planned CloudOps architecture. Public 222 / 115 / 315 counts are labeled planned scope, not measured performance. See [unified chapter review](UNIFIED-CHAPTERS-REVIEW.md).
- 2026-09-17 (current): User supplied WhatsApp `+923026849341`, requested a changed hero palette, card styling with GSAP for Intent / Plan / Evidence, and instructed proceeding to the next part without waiting. Adopted near-black graphite / violet, retained the portrait material and geometry, linked the primary CTA to WhatsApp, removed the redundant approach copy, and implemented the RAG/context chapter with the same particles becoming source documents. CloudOps is explicitly in development; no unknown metrics or live retrieval simulation. See [context review](CONTEXT-REVIEW.md).
- 2026-09-17 (latest milestone): User authorized the proposed next slice, hologram → Agentic AI, saying “go for it and surprise me.” Extended the existing canvas so the supplied portrait particles gather into a procedural orchestration sphere and Reason / Act / Verify nodes. Desktop uses a sticky scroll sequence; mobile and static modes show the complete reading order. Stop after this chapter for visual review before RAG or later chapters. Rechecked the résumé and corrected the prior email transcription to `ahmad_warraich@outlook.com`.
- 2026-09-17 (latest): User requested more background particles everywhere, including beside the hologram, and more purple in the portrait. Removed the ambient central exclusion, increased evenly distributed coverage and strengthened violet/lilac material highlights. Motion slice scope remains unchanged.
- 2026-09-17 (latest): User said the revision looks better and requested doubled portrait particles plus floating 3×/4×/5× hero background particles. Implemented within the existing motion slice, preserving geometry, repulsion, reversal and accessible fallbacks.
- 2026-09-17: User rejected the grainy/cheap particle material and cited Dala's crispness and overall restraint. Revised sampling, material, drawing resolution and control hierarchy within the existing hero/transition slice. Supplied portrait geometry and originals remain unchanged; no broader sections or deployment. Visual approval remains pending.
- 2026-09-16 (latest): User supplied `hologram/` and `myhologram/`. Inspection found identical portrait code in both; only `myhologram/` has data. User chose “Use my portrait if the preview looks good,” superseding the brief abstract-agent direction. Integrated the supplied point cloud after live desktop tests; original folders remain unchanged. See [motion review](HOLOGRAM-MOTION-REVIEW.md).
- 2026-09-16: User resumed development after alignment. Single actual Ahmad replaces the neutral field. Still composition first; future cursor head/lighting response and reversible scroll dissolution into an agent graph follow visual approval. No later section or deployment authorized.
- 2026-09-16: Inspected all eight JPG identity references and CV. Selected original `7.jpg` for the still. CloudOps Knowledge Assistant is an in-progress project with intended capabilities, not completed or measured results.
- 2026-09-15: User locked identity, narrative, creative constraints and preferred stack.
- 2026-09-15: Empty registered folder inspected; documentation-only initialization selected.
- Pending: visual feedback on the current chapter revisions, verified case-study evidence, final later-chapter copy and choreography, deployment domain, native-device performance baseline and assistant scope. Current RAG/context work is authorized; it does not require waiting for the earlier Agentic AI approval checkpoint.

- 2026-09-15: New implementation brief authorizes Phase 01 only and locks the hero headline. Real hologram moves to Phase 02, gated by reference assets and explicit phase authorization.
- 2026-09-15: Creative balance: approximately 70% editorial/product restraint, 20% technical/system visualization, 10% futuristic experimentation. Motion remains a defining quality; the neutral shell is the baseline, not the final visual experience.
- Implementation choices for review: App Router/server-rendered content; self-hosted Space Grotesk and Inter; CSS geometry and transitions; no WebGL/GSAP/Motion dependencies yet; local-only delivery. No Git history existed, so no baseline commit or remote was fabricated.

## Phase 01 implementation record
See [unified chapter review](UNIFIED-CHAPTERS-REVIEW.md) for the latest milestone and [hero motion review](HOLOGRAM-MOTION-REVIEW.md) for its foundation. Other reports describe earlier checkpoints.
