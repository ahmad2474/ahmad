# Atmosphere and rounded controls

September 18, 2026. Authorized visual refinement of the compact portfolio.

## Changes

- A slow violet light field follows the active portrait/bot/infrastructure/network/project visual, with slight eased pointer depth and restrained glow during gathering or project changes.
- Occasional fading tails follow 18 existing ambient particles on desktop / 6 on compact devices. Subdued background particles now continue throughout the page. No second canvas or new animation loop.
- Soft lighting is evaluated on a 32×24-segment mesh and interpolated, avoiding expensive exponential calculations for every retina pixel. Economy quality removes trails and uses static CSS lighting to preserve the particle animation's budget; phones use lower intensity and shorter tails. Very slow frame windows can go straight to economy.
- Pause freezes the shared clock, including light/trails. Visibility suspension, reduced-motion disposal and WebGL failure cleanup apply to all resources. Reduced motion/no JavaScript/WebGL failure receive static violet illumination.
- Panels have 24px corners; buttons and boxed action links have 14px corners. Navigation, evidence/repository, source, phase and contact links share quiet violet borders. Project controls are rounded outlined selections. Secondary hero CTA and chat input are boxed. Capability prose stays editorial; portrait geometry and content stay unchanged.

## Validation

Production build, lint and typecheck passed. All 29 Playwright checks passed in 32.9 seconds. Browser coverage includes mobile/desktop, enlarged text, keyboard controls, one-canvas reversible transitions, pause/resume, reduced motion and actual WebGL context loss. New assertions cover atmosphere-clock pause and static illumination restoration. No model-provider requests are part of this revision.

Desktop 1440×960, phone 390×844 and 320px with 200% root text were visually reviewed. No browser JavaScript errors or narrow-layout overflow were observed. An initial full-screen analytic shader was replaced with interpolated vertex lighting after performance review. Software-browser observations are environment-specific; native-phone/Safari validation remains outstanding.

Quiet final Chromium 153.0.8010.12 observation at 1440×960: 179 animation-frame intervals, median 16.7ms and p95 16.8ms; renderer averaging window 16.8ms. The SwiftShader software renderer adapted to economy/static lighting. This confirms scheduling after simplification, not the performance of full animated atmosphere on a native GPU or universal 60fps. [Raw observation](review/atmosphere-performance.json).

## Inspect

Open [the live portfolio](https://ahmad-umber.vercel.app/). Move the pointer gently around the hero, then scroll through the bot, infrastructure, reasoning and projects. Look for slow soft illumination and brief reformation glow, while text stays clear. Try project changes, pause and reduced motion. Check the rounded WhatsApp/email actions, chat panel/prompts/input, project controls and contact links.

[Desktop hero](review/atmosphere-hero-desktop.png) · [Ahmad.AI](review/atmosphere-assistant-desktop.png) · [Projects](review/atmosphere-projects-desktop.png) · [Phone hero](review/atmosphere-hero-mobile.png) · [Phone chat](review/atmosphere-chat-mobile.png) · [320px/200% chat](review/atmosphere-chat-zoom.png).
