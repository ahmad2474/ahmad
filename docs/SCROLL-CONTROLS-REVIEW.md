# Scroll controls review

September 18, 2026. Requested: remove Pause motion, add an up-arrow below the hero, and gently smooth scrolling.

## Changes

- Removed the visible Pause/Resume button and its unused UI styles/state. Reduced-motion preferences still switch WebGL to static fallbacks and native instant anchor navigation.
- Added a 48px rounded violet glass back-to-top link, visible only when the hero's bottom is above the viewport. Native anchor navigation returns to the top; keyboard focus transfers to the header home identity after the anchor default action.
- Added 160ms cubic easing for stepped desktop wheel input using actual document scroll coordinates. Small precision deltas, touch, keyboard, horizontal/modifier input and nested scrolling panels bypass the handler. Input/navigation/resize/preference changes cancel pending frames. No dependency or transformed scrolling container.

## Validation

Production build, ESLint and TypeScript passed. The 30 existing integration checks passed with the pause-specific assertions removed and live project/phase selection retained. Final three control tests passed after correcting anchor focus timing: desktop/mobile arrow visibility and keyboard return, wheel distance preservation, nested-panel and reduced-motion bypass. Local provider keys were disabled; provider tests use mocks.

Reviewed the arrow at 390×960 and 1440×960 using reduced-motion static scenes. Captures: `review/back-to-top-390.png`, `review/back-to-top-1440.png`. Prior tests also retain live single-canvas reversible morphology and mobile touch checks. Software Chromium WebGL is used here; no new native-device performance claim.
