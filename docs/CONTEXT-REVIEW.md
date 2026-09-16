# Hero, agent cards and context — review

Historical checkpoint. The later [unified chapter revision](UNIFIED-CHAPTERS-REVIEW.md) removes the sticky agent composition, unifies violet colors/cards and expands planned CloudOps into its own animated architecture chapter. Measurements/screenshots below describe this preceding version.

September 17, 2026. User authorized the hero/card revision and proceeding into the next RAG/context part without waiting. Local-only; infrastructure, full case studies, assistant backend and deployment are outside this slice.

## Changes

- Primary hero button: **Chat on WhatsApp**, targeting the supplied `+923026849341`. Opens a new tab with an accessible announcement; no message is sent automatically. Email remains available.
- Hero palette: graphite-black, off-white and violet/lilac. Environmental lighting and the button match the existing portrait's violet highlights; identity geometry and supplied originals are unchanged.
- Removed the redundant “Intelligence. In motion.” approach scene. A short environmental interval preserves portrait dispersion before particles gather into the agent network. Work/navigation reaches the stage directly.
- Intent / Plan / Evidence: defined panels with a quiet border, edge accent, restrained gradient and GSAP depth reveal. Desktop swaps the active explanation; mobile/static retain all three. Tablet/short desktop simplify to normal document flow. Short cinematic desktops use tighter spacing without reducing main text below 16px.
- New **Context. Before confidence.** chapter: the same point cloud becomes three layered source documents. SVG outlines, source/answer annotations and a moving evidence trace complement the particles. Retrieve → Authorize → Ground explanations lead to an explicitly **IN DEVELOPMENT** CloudOps Knowledge Assistant note.

## Content boundaries

The source documents and agent loop are conceptual diagrams, not product screenshots, retrieval results or a live agent execution. CloudOps copy describes the user's intended end product. No unknown accuracy, retrieval, latency, cost or deployment measurement appears publicly. The portfolio does not implement a RAG backend. OpsPilot/InsightLoop links come from the supplied résumé; repository case-study evidence remains future work.

## Motion and fallback

One lazy Three.js renderer carries the original portrait particles through dispersion, agent gathering and document gathering. One additional destination attribute defines procedural documents, independent of likeness. GSAP controls narrative progress, phase/card reveals and context reveals. CSS supplies the static responsive layout and native interface feedback. No new dependency.

Cinematic agent mode requires at least 1200px width and 860px height, plus the existing container-width check for enlarged text. A 75svh environmental lead precedes the 260svh sticky agent span. Native anchors target the stage, avoiding an empty anchor landing. Source/answer annotations move into document flow on phones so 200% text cannot collide with the visual or each other.

Pause freezes the particle uniforms; phase navigation still permits reading. Reduced motion/no JavaScript/context loss retain the portrait fallback, SVG diagrams and every explanation. GSAP contexts/media queries, scroll triggers, listeners, observers and GPU resources clean up when disposed. Existing adaptive quality tiers remain in place. Physical-device and Safari verification are still outstanding; no universal 60fps claim.

## Validation

Final lint, typecheck and production build passed. All **23 Playwright tests passed** in 35.9 seconds. Coverage includes six widths (320–1920px), real contact/anchor destinations, visible keyboard focus, retained canvas, scatter/gather/document reversal, pause, mobile touch scrolling, 200% text, no JavaScript, live reduced-motion changes, initialization failure and actual context loss. Added regressions verify every active card fits a 1440×860 stage, live tablet resizing restores all explanations, and phone source/answer annotations remain separated from the visual at enlarged text sizes.

Final production desktop, short-desktop, tablet, phone, project-note and 320px/200%-text captures were inspected. Corrected cramped tablet cards, SVG/particle layer misalignment and enlarged-text label collisions during this pass. Current production preview runs on port 3002; no browser JavaScript errors were observed in the final inspection.

Current context scene observation: Chromium 153.0.8010.12, 1440×960, SwiftShader software WebGL on the available Intel Mac environment. After settling/adaptation, 179 requestAnimationFrame intervals measured median **16.7ms**, p95 **33.4ms**; the renderer reported a 19.7ms averaging window in economy quality (1.25× drawing resolution / 45% evenly sampled points). This measures software-browser scheduling, not native GPU presentation or a sustained 60fps guarantee. [Raw observation](review/context-performance.json). Physical-device and Safari profiling remain outstanding.

## Inspect

Open http://127.0.0.1:3002. Check the hero color/WhatsApp button, scroll through all three agent cards, and continue into the layered source-document field and the CloudOps note. Reverse back to the portrait. Try Work, the phase links, Pause motion, reduced motion and a narrow viewport.

[Hero](review/context-hero-desktop.png) · [Agent card](review/context-agent-card.png) · [Context](review/context-desktop.png) · [CloudOps](review/context-project.png) · [Phone](review/context-mobile-live.png) · [320px / 200% text](review/context-mobile-zoom-320.png).
