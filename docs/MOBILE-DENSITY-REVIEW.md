# Mobile navigation and desktop particle density

September 18, 2026. User requested a three-line mobile toggle and a 25% reduction in desktop portrait particles.

## Result

- Below the existing 53.125rem container breakpoint, navigation uses a 48px native disclosure toggle and violet glass dropdown. Desktop retains inline navigation.
- Escape returns focus to the toggle; outside clicks dismiss the panel; section links dismiss it and focus their destination. Native disclosure and anchors remain useful without JavaScript. Enhanced controls report their expanded state.
- Desktop spatial sampling decreases from 9,832 to 7,374 particles, exactly 25%. Compact sampling remains 3,022. Original geometry, desktop glyph/material settings and mobile appearance are preserved. These same particles still form all later visuals.
- The existing static portrait fallback is preserved; the density change applies to live WebGL.

## Validation

Production build, ESLint and TypeScript pass. All 30 Playwright checks pass, including 320–1920px layouts, 200% text, keyboard menu controls, no JavaScript, reduced motion, WebGL failure/context loss, pointer response, reversible transitions and compact particle count. Provider keys were disabled for local browser tests; provider behavior uses mocks.

Reviewed desktop portrait at 1440×960 and mobile menu at 390×844. The open mobile dropdown measures 288px wide and stays inside the viewport. Captures: `review/mobile-menu-desktop-density.png`, `review/mobile-menu-closed.png`, `review/mobile-menu-open.png`.

Browser rendering uses Chromium software WebGL in this environment; this review does not establish native-device frame rate or universal sharpness. Desktop density is a visual experiment requested by the user; final aesthetic preference remains subjective.
