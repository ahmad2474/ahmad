# Agentic AI — chapter review

September 17, 2026. Historical checkpoint: hologram → Agentic AI. Superseded by the later authorized [hero/cards/context revision](CONTEXT-REVIEW.md), including removal of the approach scene and addition of RAG/context. Measurements below describe this preceding version.

## Experience

The existing portrait disperses into a field, then the same particles gather into a procedural orchestration sphere, three Reason / Act / Verify nodes, and their connecting routes. The sphere turns slowly and responds subtly to the cursor. Scrolling traces a signal around the loop, brightens the current node and reveals its explanation. Reverse scrolling returns through the field to the portrait without replacing the canvas.

The chapter uses a left editorial headline, “From intent. To impact.”, and a large network alongside it. A 260svh desktop scroll span holds the scene using CSS sticky. Phase links are native anchors enhanced to select their matching scroll positions. While paused, they still select readable explanations without advancing particle uniforms.

Mobile, short viewports and enlarged text use normal document flow: heading → network → phase navigation → all explanations → source-project links. Small phones use a compact pause/play control with an accessible text label. Reduced motion, no JavaScript or WebGL failure retain a static SVG diagram and all copy. Context loss/disposal restore hidden stories and navigation attributes.

## Content and implementation

Copy describes engineering principles, not a live execution trace. OpsPilot AI / InsightLoop links match the supplied résumé; detailed case-study claims still need repository inspection. The résumé was re-read with PDFKit and visually checked; both contact links now use the correct `ahmad_warraich@outlook.com` address.

`agentic-network.ts` shares diagram coordinates with particle destinations. `agentic-chapter.tsx` renders semantic HTML/SVG. The existing lazy renderer owns gathering, phase highlighting, signals and cleanup; GSAP owns scroll/reveal choreography. Supplied portrait geometry, originals and dependency versions remain unchanged. No new library or external service.

## Validation and performance

Final validation: lint, typecheck, production build and all **19 Playwright tests passed**, including the compact-control refinement. Coverage includes six widths, keyboard navigation, paused phase selection, retained canvas, dispersion/gather reversal, mobile reading order, 200% text, reduced motion, no JavaScript, initialization failure and actual context loss. Final desktop, phone, zoom and static captures were inspected; the phone pause button retains its accessible name and a 48×48px target. Local production preview is running on port 3002.

Production frame observation: Chromium 153.0.8010.12, 1440×960, SwiftShader software WebGL backend on the available Intel Mac environment. After settling and adaptation, 180 requestAnimationFrame intervals measured median **16.7ms**, p95 **33.4ms**. The renderer's averaging window reported 23.8ms in reduced quality. This measures frame scheduling in a software-rendered browser, not native GPU presentation or sustained universal 60fps. [Raw observation](review/agentic-performance.json).

The first quality tier uses 1.5× drawing resolution / 65% evenly sampled points after a 100-frame mean >30ms. If a second settled window stays >26ms, the economy tier uses 1.25× / 45%. Native SVG routes/labels retain their precision. Physical-device and Safari profiling remain outstanding.

## Inspect

Open http://127.0.0.1:3002 and scroll slowly past “Intelligence. In motion.” Watch the particles gather, trace all three phases, then reverse. Try phase navigation, Pause motion and a phone-sized viewport.

[Reason](review/agentic-desktop-reason.png) · [Verify](review/agentic-desktop-verify.png) · [Phone](review/agentic-mobile-390.png) · [200% text](review/agentic-mobile-320.png) · [Static](review/agentic-static-desktop.png).

Stop here for Ahmad's visual review. No RAG, infrastructure, full case studies, assistant backend or deployment.
