# Portfolio V2 — Master specification

Status: particle hero and consistent Agentic AI / context / planned CloudOps chapters implemented locally. Three-card rows sit below heading/visual compositions. Infrastructure and later narrative sections remain deferred.
Date: 2026-09-17.
Owner: Ahmad Hassan.

## Source of truth
Identity: **Ahmad Hassan — Agentic AI Developer × DevOps Engineer**.
The current user brief defines locked requirements. The referenced conversation, “Portfolio Redesign Plan,” supplies historical context; its suggestions are not automatically approved requirements.

Read alongside [Design system](DESIGN-SYSTEM.md), [Motion system](MOTION-SYSTEM.md), [Content](CONTENT.md) and [Projects](PROJECTS.md). AGENTS.md governs ongoing project work. Record changes here and in the relevant specialist document.

## Inspection baseline
The registered local project is `/Users/apple/Projects/Ahmad/AgenticAI-WebPortfolio` (app label: AgenticAI-Web-Portfolio). It was empty at inspection: no code, package manifest, assets, AGENTS.md, or .git directory. No existing implementation was replaced. The Phase 01 implementation now uses this registered folder directly. At Phase 01 inspection it contained AGENTS.md and five planning documents, but no application, package/config files, public assets or Git metadata. Existing documentation is preserved and reconciled with the new brief.

## Locked experience
Premium editorial/cinematic technical design inspired by Dala's restraint. High-end motion and WebGL support storytelling. Avoid generic AI templates, Matrix rain, excessive HUD clutter and cyberpunk dashboards.

The hero centers Ahmad's actual likeness, treated as an interactive hologram. `references/hero-layout-v1.png` guides composition, never identity. Dala guides continuous particle behavior, depth and scroll storytelling. The supplied portrait renders recognizably with bounded cursor response. Its particles disperse, gather into the agent loop, then become layered source documents in the context chapter. Reverse scrolling reforms the earlier forms. The latest September 17 instruction authorizes proceeding through RAG/context without waiting; it supersedes the prior stop after Agentic AI. Further chapters and deployment remain outside this slice.

## Narrative sequence
1. Identity — who Ahmad is and what he builds.
2. Agentic AI — systems that take useful actions, supported by verified examples.
3. RAG/Context — how knowledge and context inform those systems.
4. Infrastructure/DevOps — how systems are delivered and operated.
5. OpsPilot — evidence-based project case study.
6. InsightLoop — evidence-based project case study.
7. Engineering — implementation decisions, constraints and tradeoffs.
8. Ahmad.AI — portfolio assistant, with capabilities defined before implementation.
9. Contact — verified contact details and a clear next step.

WordPress belongs in earlier/supporting experience. Do not elevate it into the hero identity.

## Preferred architecture
- Next.js + TypeScript + Tailwind for application and design tokens.
- React Three Fiber/Three.js for an isolated, lazy-loaded client-side holographic scene.
- GSAP for section/scroll choreography; Framer Motion for small interface transitions.
- Vercel as deployment target; publishing the completed milestone through GitHub is now authorized by the September 17 publishing direction.
- Proposed: render text and primary navigation independently of the WebGL layer; mount the scene as progressive enhancement. A static verified portrait remains available on loading failure or unsupported devices.
- Select supported compatible library versions and package manager during implementation. No versions are locked by this document.
- Define Ahmad.AI data sources, privacy, hosting and cost limits in a later phase. No assistant backend is in Phase 01.

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

## Approved roadmap
01 Foundation + hero shell → 02 Ahmad hologram / identity → 03 Agentic AI → 04 RAG/context → 05 Infrastructure → 06 OpsPilot + InsightLoop → 07 Engineering/experience → 08 Ahmad.AI → 09 Contact/closing → 10 Performance/accessibility/responsive/SEO/QA → 11 Production deployment.
Historical default: review each major visual phase before advancing. The user explicitly authorized moving from the card/hero revision into the next RAG/context part without waiting, then separately authorized publishing the current work through GitHub/Vercel. An assistant backend remains deferred.

## Decision log
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
