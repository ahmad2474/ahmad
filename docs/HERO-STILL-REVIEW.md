# Revised Phase 01 — photographic still review

Historical checkpoint, superseded by [the interactive particle review](HOLOGRAM-MOTION-REVIEW.md). The user subsequently authorized motion and supplied portrait particle data.

September 16, 2026. Current checkpoint: visual approval of composition and actual likeness. Cursor response, scroll particles, later sections and deployment are not part of this checkpoint.

## What was wrong before

The earlier hero gave the slogan priority and placed a small geometric object beside it. It did not have the reference's dominant central identity, strongly anchored name, spatial distribution or photographic depth. The user rejected that direction.

## Current revision

- Single real Ahmad portrait centered in a near-black environment. His name anchors the left; headline and actions sit below; sparse AI/context/infrastructure narrative sits on the right.
- Original `references/7.jpg` is the likeness source. No replacement face is used. Browser masking, color treatment, static scan texture, lower-body fade and restrained projection rings create a still material study.
- Quiet navigation and environmental lines, locally served Space Grotesk/Inter, readable secondary labels and fewer competing elements.
- Tablet narrows to two columns before switching to the mobile reading order: identity → headline → portrait → CTA. Enlarged text triggers the same recomposition.
- Approach links target the narrative within the hero; email and GitHub come from the supplied CV. No invented project metrics or dead future-section navigation.

## Intentional differences and limitations

One actual Ahmad replaces the reference's three unrelated portraits. Globe, mountains and elaborate HUD frames are omitted. The current image is a treated flat photograph, not a volumetric reconstruction; scan/dot textures are static, not live particles. The manually traced matte and holographic material remain subject to visual approval. No facial rotation, animated reveal or scroll dissolution is represented as complete.

An AI background-removal attempt was rejected after it altered facial details; the shipped source JPG is byte-identical to the selected original. See [asset provenance](CONTENT.md).

## Review in the browser

Open http://127.0.0.1:3000. Start around 1440px wide, then inspect a narrow phone and tablet. Assess likeness, head-and-shoulder scale, left-name hierarchy, portrait lighting, negative space, and CTA placement. Moving the cursor over the portrait will not rotate it at this still checkpoint.

Screenshots:
- [Desktop 1440px](review/hero-still-v2-1440.png)
- [Mobile 390px](review/hero-still-v2-390.png)
- [Tablet 768px](review/hero-still-v2-768.png)
- [Tablet 1024px](review/hero-still-v2-1024.png)
- [Enlarged text 1280px](review/hero-still-text-200-1280.png)

## Validation

Final result: `npm run lint`, `npm run typecheck`, `npm run build` and all 12 Playwright tests passed. Core text contrast against the ground token: ink 17.56:1, muted 8.62:1, accent 12.97:1; these token calculations are not a full accessibility audit.

Production build, lint and TypeScript checks; Playwright Chromium checks cover six widths (320–1920px), horizontal overflow, working anchors, keyboard skip/focus behavior, loaded portrait, reduced motion, JavaScript-disabled rendering and doubled root text size. Visual inspection caught crowded enlarged-text and narrow-tablet compositions; container-based recomposition and spacing assertions address them.

This is local Chromium validation, not physical-device/Safari/Firefox certification. There is no WebGL context to fail yet, and no animation performance claim is made. No deployment, dependencies or external services were added. Git status remains unavailable because this folder has no `.git` directory.

## Next gate

Review this still before cursor-driven head/lighting response and reversible particle dissolution into the agent graph. That work must preserve the verified likeness and provide reduced-motion/static fallbacks. CloudOps Knowledge Assistant remains marked in progress in the evidence register; future capabilities and unmeasured metrics are not published as achievements.
