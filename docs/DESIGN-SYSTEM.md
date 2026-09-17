# Portfolio V2 — Design system

Status: creative principles locked; numerical tokens and exact styling proposed.

## Locked principles

Latest detail refinement: main navigation is one translucent violet glass surface with unboxed, warm off-white/lilac links inside. GitHub uses the same warm text palette. The hero's left kicker aligns with the right notes on full desktop. “Scroll to explore” is plain non-interactive text without a surface. Remove the right sign-off. Footer identifies Ahmad Hassan and shows “© [current year] All rights reserved.” The browser refreshes the year on load, hourly and on visibility change; server output provides the build-time fallback.

September 18 approved refinement: panels use 24px corners, controls/action-link boxes use 14px corners, and status/pause controls use pill shapes. Secondary CTAs, navigation, evidence/repository links, phase controls, source references and contact actions are visibly boxed with restrained violet borders. Capability prose stays editorial. Slow violet illumination concentrates around the active visual, with quiet copy areas and sparse particle trails; keep the dark ground readable. This supersedes previous 4px-panel/unboxed-secondary specifications.

Latest compact revision supersedes the historical layouts below: six sections, normal document flow, graphite/violet throughout. Hero stays unchanged. Ahmad.AI pairs the left abstract bot glyph with a single purpose-built conversation surface right. DevOps and agent capabilities are concise ruled lists left, contained visuals right. Projects pair one selected visual left with three keyboard-operable project tabs and details right. Contact closes in two columns. Mobile recomposes each pair; project controls precede its visual/details. Raw photographs and private résumé identifiers never enter assistant content. No new dashboard or generic feature-card grid.
Premium editorial/cinematic technical direction with Dala-inspired restraint. Lead with typography, negative space, hierarchy and Ahmad's likeness. Use technical detail sparingly and meaningfully. No generic AI-template design, Matrix rain, excessive HUD clutter or generic cyberpunk dashboards.

## Proposed starting system
- Palette: near-black/charcoal ground, warm off-white text, muted neutral secondary text and one restrained cool holographic accent. Validate contrast before choosing final values.
- Typography: an expressive, readable display face paired with a clear body face; mono only for small technical labels. Font selection and licensing remain pending.
- Layout: generous spacing, a consistent container and editorial grid; start with a 4px spacing base and fluid type. Set exact tokens during the hero prototype.
- Desktop hero: identity/copy left, dominant real-likeness portrait alongside; minimal supporting annotations. Mobile: identity and primary action in reading order, with a contained portrait that cannot obscure text.
- Surfaces: quiet separators and limited depth; avoid turning every paragraph into a glowing card.
- Controls: clear primary/secondary hierarchy, visible focus and consistent hover/active/disabled states. Proposed minimum touch area: 44×44px.

## Accessibility and responsive rules
Use semantic headings and landmarks, a skip link, natural reading order and keyboard-operable controls. Target WCAG AA contrast: 4.5:1 normal text and 3:1 large text; verify relevant UI boundaries and focus visibility. Do not communicate information through color alone.

Use content-driven breakpoints. Verify narrow 320px layouts, common phones, tablets, desktops and zoomed text without horizontal overflow. Pointer effects cannot be required for access. Retain the native cursor; any enhancement is optional and must not impair it.

## Hero imagery
Original identity photos are source of truth. Preserve facial proportions, hair, beard/mustache, eyes, nose and jaw. Holographic lighting/material is a treatment of Ahmad's image, not permission to replace his identity. Choose a verified still fallback before adding effects. Do not present an unverified mockup as an approved portrait.

## Phase 01 review checklist
Check type hierarchy, negative space, likeness, CTA visibility, small-screen reading order, focus, contrast and fallback appearance. Record chosen fonts, colors, spacing, breakpoints and component states here after review.

## Current particle revision — September 17

Latest chapter composition supersedes the sticky and mint-accent descriptions below: Agentic AI, context and CloudOps share graphite-black / violet, heading with supporting prose on the left, contained particle visual on the right, and three cards below. The agent figure is capped at 650px and occupies only the overview row; card height cannot stretch its visual area. All three agent cards remain visible. Context explanations share the same 4px-corner surface/border/edge accent. CloudOps has a matching planned evidence-engine particle diagram, three capability panels, planned corpus/evaluation counts and two delivery/evaluation panels. Mobile/zoom stack the visual and cards, and put diagram annotations into normal flow. No sticky/pinned agent viewport or hidden explanation. The only desktop lead is an environmental portrait-dispersion interval; it is not above/below padding imposed by cards.

Latest authorized revision: hero ground `#08070c`, surface `#14101e`, primary ink `#f0edf5`, accent `#c1a3ff`. Violet headline, button and environmental light align with the existing lilac/cyan portrait. The primary action is “Chat on WhatsApp”; email remains secondary. The standalone approach scene is removed. Intent / Plan / Evidence explanations use precise 4px-corner panels, a muted violet border, a narrow edge accent and restrained solid gradients; no blanket glass treatment. Desktop shows one active panel; static/mobile modes retain all three.

RAG/context chapter: “Context. Before confidence.” anchors the left; three layered source documents occupy the right. Quiet mint `#a9dfd8` distinguishes evidence flow. Retrieve / Authorize / Ground explanations form a ruled editorial row, stacking on phones. A separate in-development CloudOps project note describes intended architecture without performance claims. Source documents are conceptual geometry, never fabricated project screenshots or a live trace. Sticky agent sequencing applies at width ≥1200px / height ≥860px; short desktops/tablets show all explanations in normal flow. Text enlargement triggers the existing container recomposition.

Agentic AI chapter: left editorial headline “From intent. To impact.” and right particle orchestration sphere connected to three Reason / Act / Verify nodes. Cyan/violet is carried forward from the hero; precise SVG routes and labels explain the loop. The existing particles reform into this network, rather than introducing a disconnected visual. Phase navigation is keyboard-accessible; the supporting explanation changes with desktop scroll. Small screens and enlarged text recompose heading → network → phase navigation → all explanations → source-project links. Static mode keeps a clear SVG network and every explanation. No project metrics or invented live trace.

Phone pause/play control is a 48px circular icon with retained accessible text and title. Phase navigation wraps at enlarged text sizes; additional space below the mobile diagram separates its Verify label from the controls.

Latest background/color adjustment: increased ambient coverage to 160 desktop / 72 compact triangles, jittered evenly over the entire viewport with no central exclusion. This fills the space beside and behind the hologram while retaining subdued opacity. The portrait now has coherent violet side-lighting and 32% lilac/purple accents; original geometry, glyph sizes and brightness-derived facial shading remain. Current fallback: `public/portraits/ahmad-particle-violet.png`. The 54/20 counts and preceding captures below are historical.

Latest user-directed adjustment: double all portrait glyph sizes while compensating opacity to preserve facial shading. Add a sparse hero background of 54 desktop / 20 compact floating triangles at 3×, 4× and 5× the pre-enlargement base size. These drift slowly with subtle cursor depth response and fade during scroll dispersion. Portrait sampling and geometry remain unchanged. Current fallback: `public/portraits/ahmad-particle-large.png`.

In response to grainy rendering and the Dala comparison: spatial sampling now chooses one original point per XY cell, keeping existing positions and averaging brightness within each cell. This gives 9,832 desktop / 3,022 compact particles from the unchanged supplied dataset. Antialiased triangular glyphs replace diamonds; restrained cyan/white, fewer violet accents, directional shading and normal alpha blending prevent overlapping highlights from washing out. A 2× desktop drawing buffer improves edge quality; adaptation retains 1.5× sampling. The primary CTA is solid pale cyan, the secondary link is unboxed, and quiet separators/pause controls reduce visual clutter. Visual approval is pending.

The portrait remains an estimated-depth surface, unlike a fully volumetric abstract brain. No side/back facial geometry has been invented. Existing small turns, repulsion and reversible dispersion remain.

## Previous particle revisions — September 16

Latest spacing adjustment: retained larger diamond fragments, reduced rendering to 24,000 desktop / 12,000 compact points, and restored gentle cursor repulsion at Ahmad's request. The portrait is sampled across the whole original dataset so lower density does not crop away a region. Earlier removal of repulsion below is historical.

Latest refinement: particles are roughly 60% larger in diameter and rendered as antialiased diamond fragments rather than circular dots. Opacity is compensated to preserve facial shading. Smaller head turns and subtle lateral tracking reduce exposure of missing side geometry; pointer repulsion is removed. No inferred side/back face has been added.

The supplied portrait point cloud replaces the tinted photograph. It uses icy cyan/white points with violet accents, natural brightness and dark facial features, keeping the source proportions. Projection rings, scan overlays and decorative planes have been removed. The left identity and sparse right narrative remain; one additional transition viewport demonstrates the same particles spreading into the background behind oversized editorial text. The rendering is an estimated-depth portrait, not a verified 3D scan.

Dala supplies behavioral inspiration. [Refero's Dala style reference](https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648) provides design tokens and typography/layout guidance, not executable particle source. Do not treat its generic instructions as overriding Ahmad's approved identity/composition.

## Previous still revision — historical

- Primary reference: `references/hero-layout-v1.png`, composition only. One actual Ahmad replaces its three unrelated portraits.
- Left name is the typographic anchor; the center contains the dominant head-and-shoulders portrait; technical narrative sits on the right. Navigation and environmental lines stay quiet.
- Ground `#030709`, surface `#09121a`, ink `#e9f0f4`, muted `#98acbb`, cyan `#91d8ff`. Space Grotesk display weight 400, Inter secondary type. Minimum label size 12px.
- Maximum scene width 1920px; gutter `clamp(1.5rem, 3.4vw, 4rem)`. Full three-part composition above 1100px. Tablet moves technical narrative below; narrow tablets/mobile follow identity → headline → portrait → CTA → supporting narrative below a 53.125rem container width (850px at default text size). This threshold also recomposes the scene when the root text size grows.
- Original photo plus a hand-traced browser SVG matte, cyan color matrix, static scan texture and lower-body fade. No synthetic face, animated reconstruction or live particles.
- Thin environmental planes and projection rings support depth. No cards, dashboard, globe, mountains or additional portraits.
- Accessible native links, visible focus, 44px navigation targets and 48px CTA targets remain.

## Original Phase 01 implementation — historical, rejected
- Display: Space Grotesk variable, weight 500; body: Inter variable, weights 400–500. Both locally served, SIL OFL.
- Tokens: ground `#080c12`, surface `#101720`, primary text `#f2f3ee`, secondary `#a1acbc`, accent `#9bc8ff`, separator `#29323e`.
- Content max-width 1440px; gutter `clamp(1.25rem, 5vw, 5rem)`; 4px spacing base. Hero typography is fluid, with explicit mobile sizing and normal-flow text.
- Breakpoints: 700px stacked hero, 1000px compact desktop/tablet, 1600px expanded hero height. Below 700px the field sits after copy and CTA in a reserved aspect ratio.
- Links and buttons retain native cursor, 44px minimum target, visible 2px accent focus outline, hover and active feedback. No fake contact links, disabled navigation or custom cursor.
- Hero has no panels/cards: the open abstract identity field is the reserved future portrait surface. Technical details are sparse and decorative.
- Phase 01 label/secondary metadata minimum is 12px; body is 16px. Numerical styling remains reviewable rather than an approved final design.

Visual QA: corrected default-container width interference and overly tight headline tracking. Headline tracking is now -0.045em; the custom `.shell` honors the intended content width. Narrow enlarged text reflows navigation/buttons/long headings instead of clipping. See [Phase 01 review](PHASE-01-REVIEW.md) for screenshots and measured token contrast.
