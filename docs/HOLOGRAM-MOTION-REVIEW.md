# Portrait hologram — motion review

Updated September 17, 2026. Local hero/transition checkpoint; not a completed portfolio or deployment.

## Latest visual refinement

Latest coverage/color revision: 160 desktop / 72 compact floating triangles distributed across the entire viewport, including around the hologram. The former central exclusion is removed. Portrait colors now include coherent violet side-lighting and 32% lilac/purple accents, retaining source geometry and intensity shading. Current fallback: `public/portraits/ahmad-particle-violet.png`. [Desktop](review/particle-violet-desktop.png) · [Phone](review/particle-violet-phone.png). Earlier counts and captures below are historical.

Validation repeated for this coverage/color revision: lint, typecheck, production build and all 16 browser tests passed. Desktop and phone renders inspected; production preview refreshed on port 3002. Previously recorded timing measurements do not certify this material/coverage revision.

Latest user request: doubled portrait glyphs and added 54 desktop / 20 compact floating background triangles at 3×, 4× and 5× the preceding base size. Opacity compensates for larger portrait coverage. Ambient accents share pause/visibility lifecycle, drift slowly, respond subtly to the cursor and fade as dispersion advances. Both geometries/materials are disposed on cleanup. Current fallback: `public/portraits/ahmad-particle-large.png`. [Desktop](review/particle-large-desktop.png) · [Phone](review/particle-large-phone.png). Earlier fallback/material descriptions below are historical.

Validation repeated for this size/ambient revision: lint, typecheck, production build and all 16 browser tests passed; desktop and phone captures inspected. Production preview refreshed on port 3002. The timing measurements below predate the doubled glyphs and ambient layer; they do not certify this revision's performance.

September 17: addressed grain and overlapping filled fragments through spatially even sampling of the supplied positions, cell-averaged brightness, derivative-antialiased triangular glyphs, normal alpha blending and restrained directional cyan/white shading. Counts are now **9,832 desktop / 3,022 compact**. Desktop supersamples at 2×; slow-frame adaptation retains 1.5× rather than dropping to 1×. Primary CTA is solid pale cyan; secondary contact and pause controls are quieter. Existing repulsion and reversible dispersion are preserved. Current fallback: `public/portraits/ahmad-particle-refined.png`. [Desktop](review/particle-refined-desktop.png) · [Phone](review/particle-refined-phone.png).

The selected source is still an estimated-depth portrait surface, not a complete volumetric head. This revision improves particle clarity and distribution; it does not establish Dala-equivalent depth or a user-approved final appearance. Earlier descriptions and timing measurements below are historical.

Final revision validation: lint, typecheck, production build and all 16 Playwright browser tests passed. Desktop and phone renders, pointer repulsion and dispersed background were inspected. No browser JavaScript errors appeared during the production capture. Local production preview: http://127.0.0.1:3002.

September 17 frame observation: production build, headless Chromium, 1440×960 on the available Intel Mac. The warm-up mean was 40.2ms and triggered reduced quality (1.5× drawing buffer, 65% point budget sampled evenly across the geometry). After eight seconds of settling, 180 requestAnimationFrame intervals measured median 16.8ms and p95 33.4ms. This is frame scheduling evidence, not GPU presentation timing or sustained 60fps certification. A separate measurement spanning adaptation had median 33.3ms / p95 50ms. Physical-device and Safari profiling remain outstanding.

Latest request: restore cursor repulsion and open up particle spacing. Render counts are now **24,000 desktop / 12,000 compact**, sampled from the complete original point cloud. Diamond size is retained. Repulsion eases within an 85px radius with a 16px maximum displacement and fades on pointer leave/scroll dispersion; head turns remain small. Current fallback: `public/portraits/ahmad-particle-spaced.png`. [Spacing](review/particle-spaced-front.png) · [Cursor response](review/particle-spaced-repulsion.png). Earlier counts and repulsion removal below describe prior revisions.

Validation repeated after the refinement: lint, typecheck, production build and all 16 browser tests passed. Phone/coarse-pointer rendering uses lower fragment opacity to prevent the larger particles from washing out facial shading; desktop and phone renders were visually inspected. Earlier frame-timing observations below predate this particle-size change.

In response to Ahmad's feedback: roughly 60% larger particles, antialiased diamond silhouettes, compensated opacity, maximum cursor yaw reduced to 5.4° and pitch to 2.6°, and small lateral tracking. Removed cursor repulsion, which could open gaps in the face. No side/back facial geometry was invented. The source is still an estimated-depth surface; true wide-angle rotation would require a fuller reconstruction. Current fallback: `public/portraits/ahmad-particle-diamonds.png`. [Front](review/diamond-front.png) · [Maximum right turn](review/diamond-turn.png).

## Supplied-folder findings

Both `hologram/` and `myhologram/` contain identical `HologramHead.jsx` and `hologramCore.js` files. Their hashes were compared. They implement the portrait, not two different models. `hologram/` is incomplete because it imports a missing `portraitParticles.js`. The described separate 24,000-point humanoid with projector rings is not in these files.

`myhologram/` contains a complete 44,000-point portrait dataset: 528,000 decoded bytes, 12 bytes per point. The user describes it as based on photo 5 with estimated depth. The source generation cannot be verified from these files, and it is not a 3D scan. Both original folders remain untouched.

The complete supplied core rendered successfully in isolated Chromium: a recognizable portrait, bounded head turn and scattering, with no JavaScript errors. Captures: [front](review/supplied-portrait-front.png), [turn](review/supplied-portrait-turn.png), [scatter](review/supplied-portrait-scatter.png). After this review, the user chose “Use my portrait if the preview looks good.”

## Integrated behavior

- Uses the supplied positions, facial brightness, neck/shoulder weights and opacity data. No substitute facial geometry.
- 44,000 points on desktop; 22,000 on narrow/coarse-pointer devices. Point density drops further if sustained frame intervals exceed the adaptation threshold.
- Small cursor-driven head turns, subdued breathing and gentle lateral tracking. Cyan/white with restrained violet replaces the supplied hot magenta, fitting the existing hero.
- One GPU point cloud interpolates from the portrait into a dispersed background as native page scrolling advances. Reverse scroll reconstructs it. The canvas is retained throughout; it is not swapped for a separate background effect.
- A minimal editorial transition scene provides room to review the change. No agent graph, RAG case study, infrastructure section or assistant has been built.
- Removed bright scan sweeps, rapid shimmer, glitch slices and projection-ring styling. This keeps facial shading readable and the scene calmer.
- Pause/resume control; static captured portrait for reduced motion, no JavaScript, initialization failure or WebGL context loss. Live preference changes dispose and recreate the scene correctly.

## Architecture and provenance

Three.js 0.186.0 and GSAP 3.15.0 were checked against the registry and added with exact versions; `@types/three` 0.186.0 is a development dependency. Existing Next/React versions and the single npm lockfile remain. No R3F or additional interface animation library was needed for this one-scene adapter.

`agentic-scene.tsx` lazily imports the renderer and supplied data. `portrait-particles.ts` decodes the data. `particle-renderer.ts` owns GPU animation and lifecycle; GSAP owns scroll progress and text reveals. The source data loads separately but still incurs approximately 704 KB of uncompressed module text when enabled.

The renderer caps pixel ratio, suspends requestAnimationFrame while the document is hidden or main content is offscreen, and releases listeners, observers, timelines and GPU resources on disposal. A captured still in `public/portraits/ahmad-particle-diamonds.png` keeps identity visible without the renderer. No external font, model or particle-data service is used.

## Browser review

Validation: `npm run lint`, `npm run typecheck`, `npm run build` and all **16 Playwright tests** passed. Coverage includes six widths (320–1920px), keyboard navigation, live cursor response, reversible scroll, a retained canvas, pause/resume, 22,000-point phone initialization, live reduced-motion changes, WebGL initialization failure, actual context loss, JavaScript-disabled use and 200% root text size. A live preference test caught GSAP restoring inline smooth scrolling; the reduced-motion rule now overrides it.

Final captures: [live desktop](review/particle-desktop-live.png), [live phone](review/particle-mobile-live.png), [dispersed background](review/particle-background.png), [static desktop](review/particle-static-1440.png), [static phone](review/particle-static-390.png).

Local frame observation: 180 requestAnimationFrame intervals during synthetic pointer input, 1440×960, DPR 1, headless Chromium 153.0.8010.12 on the available Intel Mac environment (four reported logical processors). Median **16.8ms**, p95 **33.4ms**; the scene's warm-up averaging window reported **24.8ms** with the full point budget. This does not establish a sustained 60fps result or GPU presentation timing. Physical-device profiling remains outstanding; the runtime reduces pixel density and drawn points when its 100-sample mean exceeds 30ms after warm-up.

Open http://127.0.0.1:3000. Move the cursor around the first viewport, scroll slowly down, and reverse direction. Check that the facial features remain recognizable under the small turns and that dispersion feels continuous. Try Pause motion, a phone-sized window and your system's reduced-motion setting.

The portrait's depth remains approximate, so large rotations are deliberately excluded. Visual approval of likeness and feel belongs to Ahmad; local technical validation does not establish a likeness guarantee. Browser automation is Chromium-only and does not replace physical-phone or Safari testing. Performance observations are lab evidence, not universal 60fps claims.
