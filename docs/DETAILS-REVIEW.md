# Navigation, hero and footer details

September 18, 2026. User-requested detail refinement.

Main navigation now uses one rounded translucent glass surface, 14px backdrop blur, and warm off-white/lilac text. Individual navigation links have no outlines. GitHub matches the text palette. The desktop left/right hero text containers begin at the same vertical position (204.4px at 1440×960). The right sign-off is removed; the scroll cue is a plain paragraph without a link or box. Mobile reading order is preserved.

Footer branding is Ahmad Hassan, followed by “© [current year] All rights reserved.” `CopyrightYear` receives a server-rendered build-year fallback, then refreshes from the browser clock on mount, hourly and on visibility change. A simulated 2030 browser date correctly replaced the 2026 build value; year changes require no source edit. No-JavaScript output retains the build-time year.

Lint, typecheck and production build passed. All 29 existing browser checks passed in 32.0 seconds. After fixing production CSS prefix ordering so Chromium retains the glass blur, all nine width/enlarged-text checks passed again in 7.0 seconds; actual computed blur was confirmed as 14px. Desktop and phone captures were inspected. No new provider requests or particle geometry/choreography changes.

[Desktop hero](review/details-hero-desktop.png) · [Phone hero](review/details-hero-mobile.png) · [Footer](review/details-footer-desktop.png).

Live review: https://ahmad-umber.vercel.app/.
