# Portfolio V2 — Project instructions

## Identity and scope
Ahmad Hassan — Agentic AI Developer × DevOps Engineer.
This repository is the source of truth for Portfolio V2. Current milestone: consistent Agentic AI / RAG / CloudOps composition, three-card rows and expanded planned CloudOps architecture, authorized on 2026-09-17. Publishing this completed milestone through GitHub/Vercel is now authorized. Infrastructure, other case studies and the assistant backend remain future work.

## Read before working
- docs/MASTER-SPEC.md: scope, architecture, decisions, Phase 01 and acceptance criteria.
- docs/DESIGN-SYSTEM.md: visual language, layout and accessible interaction.
- docs/MOTION-SYSTEM.md: choreography, WebGL lifecycle and fallbacks.
- docs/CONTENT.md: narrative, copy status and asset provenance.
- docs/PROJECTS.md: case-study evidence and missing information.

The user's latest explicit direction takes precedence. Preserve useful existing work and inspect files and Git status before edits. Update these documents when decisions change; mark proposals and unknowns instead of silently treating them as approved. Do not invent credentials, project features, outcomes, metrics or links.

## Locked creative rules
- Premium editorial/cinematic technical design, inspired by Dala's restraint.
- Sophisticated high-end motion and WebGL should explain the work.
- Avoid generic AI-template aesthetics, Matrix rain, excessive HUD clutter and generic cyberpunk dashboards.
- Hero: Ahmad's real likeness as an interactive holographic centerpiece. Identity reference photos are authoritative. Never replace him with a generic generated face. Apply visual treatment to verified likeness; do not invent facial geometry.
- Narrative: Identity → Agentic AI → RAG/Context → Infrastructure/DevOps → OpsPilot → InsightLoop → Engineering → Ahmad.AI → Contact.
- WordPress is supporting/earlier experience, never the core identity.

## Engineering direction
Preferred stack: Next.js, TypeScript, Tailwind, React Three Fiber/Three.js, GSAP, Framer Motion; Vercel deployment target. Confirm compatible versions at implementation time and commit a single package-manager lockfile. Phase 01 permits deliberate foundation dependency installation. The September 17 GitHub/Vercel authorization below supersedes the earlier deployment restriction for publishing the current work.

Use semantic, responsive HTML; keyboard access and visible focus; reduced-motion behavior; SEO metadata; lazy-loaded WebGL and a useful static fallback. Keep primary content readable before JavaScript/WebGL is ready. Target smooth 60fps motion on a documented representative device, measure it, and degrade effects when needed. Do not claim universal 60fps.

Keep server secrets out of browser code and public assets. Implement production-quality types, error states and cleanup. Scope GSAP to narrative motion and Framer Motion to interface interactions; never let both animate the same property on the same element. Defer expensive effects and unnecessary libraries.

## Working practice and validation
The user authorized cursor-responsive particle hologram and reversible scroll dispersion on 2026-09-16. They briefly chose an abstract agentic form, then supplied Claude-created folders and explicitly said “Use my portrait if the preview looks good.” The supplied portrait rendered recognizably and is the selected basis. `myhologram/portraitParticles.js` is authoritative for this particle geometry; preserve supplied originals in both folders. `hologram/` currently duplicates the portrait code but lacks its data file; it does not contain the described separate AI bust. Scope includes one minimal transition scene to demonstrate particles becoming the background, not full later sections. No extra approval is required for routine work within this scope. No deployment or external service is authorized.
The user proceeded on 2026-09-17 after the proposed next milestone: the same portrait particles may gather into an agent reasoning network, with a reversible scroll-driven Reason → Act → Verify sequence. The earlier minimal-transition-only scope is superseded for this chapter. Its diagram illustrates engineering principles, not a live agent run. Supporting copy and project links come from the supplied résumé; repository case-study verification remains later work.
Latest September 17 direction: connect `+923026849341` as the hero WhatsApp CTA, change the hero palette, give the Intent / Plan / Evidence explanations a card treatment with GSAP, and proceed to the next narrative part without waiting for approval. RAG/context may describe the supplied CloudOps Knowledge Assistant intended architecture, clearly in development. Never publish unmeasured metrics or claim that its planned features are already shipped. The redundant standalone approach scene is removed; an environmental scroll interval preserves the portrait dispersion before gathering.
Subsequent September 17 revision: globe alongside the heading/supporting text, all three cards below in a desktop row, one violet theme across Agentic AI and context, matching context cards, and a comparable animated CloudOps visual with fuller supplied project details. Agentic AI now uses normal document flow, without the prior 260svh sticky span. CloudOps uses a procedural evidence-engine architecture visual and public planned corpus/evaluation counts, explicitly labeled as intended scope; no completed deployment or measured results are asserted.
When code exists, use its actual lint/typecheck/build commands, add meaningful tests for behavior, and verify keyboard navigation, mobile layouts, reduced motion and WebGL failure. Do not document fictional commands as runnable today. Report changes, validation and remaining limitations.

September 17 publishing direction: the user requested putting the completed work into GitHub so their Vercel account can deploy updates without relying on localhost. Creating a repository, committing/pushing the current source, and connecting the current site to Vercel are authorized. This does not authorize new narrative chapters or assistant services. Preserve original references locally; track runtime portrait assets and the authoritative particle dataset. Keep deployment previews non-indexed until the final production domain and full content are approved.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
