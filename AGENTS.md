# Portfolio V2 — Project instructions

## Identity and scope
Latest assistant authorization: the user supplied full résumé text and explicitly requested all skills, years, employers/job dates, project history, education, public contact links and additional WordPress/Digital Marketing/Business Communication skills. These owner-authorized public facts supersede earlier exclusions of employer/years claims. Omit certification IDs and secrets; don't invent metrics, marketing outcomes or current employment/availability. Ahmad.AI is only about Ahmad; unrelated questions receive a friendly scope redirect, also in profile fallback. Publishing through existing GitHub/Vercel remains authorized.
Ahmad Hassan — Agentic AI Developer × DevOps Engineer.
This repository is the source of truth for Portfolio V2. Current milestone: the user-approved compact six-section portfolio, preserving a single reversible portrait particle system throughout. Ahmad.AI UI/backend with Groq and Gemini is authorized; the user will add server-side keys later. Publishing through the existing GitHub/Vercel connection is authorized.

## Read before working
- docs/MASTER-SPEC.md: scope, architecture, decisions, Phase 01 and acceptance criteria.
- docs/DESIGN-SYSTEM.md: visual language, layout and accessible interaction.
- docs/MOTION-SYSTEM.md: choreography, WebGL lifecycle and fallbacks.
- docs/CONTENT.md: narrative, copy status and asset provenance.
- docs/PROJECTS.md: case-study evidence and missing information.

The user's latest explicit direction takes precedence. Preserve useful existing work and inspect files and Git status before edits. Update these documents when decisions change; mark proposals and unknowns instead of silently treating them as approved. Do not invent credentials, project features, outcomes, metrics or links.

## Locked creative rules
- September 18 visual revision: custom AH monogram favicon. For review, Ahmad.AI's cartoon bot becomes a four-point sculptural agent sigil; InsightLoop bars become a continuous feedback ribbon; CloudOps cylinder becomes evidence pages and a faceted grounding core. Preserve original portrait particles and matching SVG fallbacks. Chat response improvements are the next task; backend behavior stays unchanged in this visual revision.
- Latest September 18 control direction: remove the visible Pause/Resume motion button; show a 48px back-to-top arrow only after the hero leaves the viewport. Preserve OS reduced motion. Desktop stepped wheel input has brief 160ms easing through native document coordinates; small precision deltas, touch, keyboard, modifiers and nested panels bypass it. No additional scroll library or transformed container.
- September 18 refinement: the user approved slow violet background illumination with slight cursor response, sparse fading trails on existing ambient particles, and glow during reformation. Reuse the existing canvas/clock/pause/lifecycle; simplify on phones and at adaptive economy quality. Reduced motion/no WebGL receives static illumination. Round existing boxes/buttons, and give action links rounded boxed styling. Preserve the six-section composition and verified likeness. The user reports the deployed chatbot works; Gemini fallback remains separately unconfirmed.
- Premium editorial/cinematic technical design, inspired by Dala's restraint.
- Sophisticated high-end motion and WebGL should explain the work.
- Avoid generic AI-template aesthetics, Matrix rain, excessive HUD clutter and generic cyberpunk dashboards.
- Hero: Ahmad's real likeness as an interactive holographic centerpiece. Identity reference photos are authoritative. Never replace him with a generic generated face. Apply visual treatment to verified likeness; do not invent facial geometry.
- Narrative: Hero → Ahmad.AI → DevOps/Infrastructure → Agentic AI (including RAG/context) → highlighted Projects → Contact/footer.
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

Latest compact-portfolio authorization supersedes the earlier chapter/assistant restrictions: the user approved Hero → Ahmad.AI → Infrastructure → Agentic AI → Projects → Contact/footer, explicitly retaining the same original particles as each visual reforms. Hero likeness remains unchanged. Ahmad.AI has an abstract non-human bot symbol left and chat right. Infrastructure and agent capabilities use copy left/visual right; projects use visual left/selection right. Merge RAG into agent capabilities and CloudOps into the projects selector; do not add separate long case-study sections. Source-verified OpsPilot/InsightLoop descriptions may be used without inventing production adoption or outcomes. Groq primary and Gemini fallback are approved, using the user's free-tier keys, to be configured later. Until configured, chat must visibly identify direct profile-reference answers. No fake model activity, private CV data, assistant tools/actions, conversation persistence or paid infrastructure. Per-instance rate limits are best-effort, not a distributed spending guarantee. Current live review URL: https://ahmad-umber.vercel.app/; repository https://github.com/ahmad2474/ahmad on main.

Final configuration note: a Gemini key appeared in `.env.example` during the compact revision and was moved into ignored local configuration; tracked example keys remain blank. Do not commit local keys. Automatic approval review initially rejected a live-provider test because setup had been deferred. The user subsequently approved one local Gemini test and reported adding both keys in Vercel. That test returned the labeled provider-unavailable profile fallback; a Gemini-generated answer remains unconfirmed. This supersedes earlier key deferrals. Do not claim functioning providers merely from key detection.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## September 18 — conversational assistant refinement

Suggested questions appear only in an empty conversation and disappear as soon as the first question is sent, including pending/error states. Grounding references remain validated internally but are not rendered as answer tags. Show only relevant contact actions or explicitly requested external links. Ordinary answers are focused and brief; introductions do not dump the résumé. Employment/education dates appear only when explicitly requested. Hiring uncertainty offers email/WhatsApp without unrelated project-metric caveats. Preserve all verified knowledge and honest availability/project-status distinctions.


## September 18 — production indexing

The user requested making the existing Vercel portfolio indexable/crawlable. `https://ahmad-umber.vercel.app/` is the approved canonical public URL for search; a custom domain is not required. Production builds opt into index/follow, while preview/local/custom review environments remain noindex. Noncanonical hosts and API routes also receive an X-Robots-Tag exclusion. Robots allows homepage/assets (so crawlers can read noindex on reviews), excluding `/api/`; only production publishes the canonical homepage in its sitemap. Location is owner-verified Lahore, Pakistan. The user supplied Google's HTML verification file, served unchanged from `public/google9a20f096034427a6.html`. Retain this file to preserve ownership verification. Clicking Verify and sitemap/indexing submission remain account steps in Search Console; no HTML-tag token is required for this file method. No Gmail credentials, fabricated keyword difficulty or guaranteed indexing/ranking.


## September 18 — content SEO

User approved the proposed content SEO pass. Title: “Ahmad Hassan | Agentic AI Developer in Lahore”; DevOps remains a visible role and in the description. Hero adds one compact “Based in Lahore, Pakistan.” line. Existing agent/project descriptions name AI agents, RAG, AWS cost investigation and BigQuery analysis naturally; CloudOps remains in development/planned. All three accessible project tab panels are server-rendered, with only the selected one visible, preserving the six-section length. ProfilePage/Person JSON-LD identifies Ahmad, both roles, Lahore and verified GitHub/LinkedIn URLs; no current employer, private credentials, metrics, ratings or invented dates. JSON-LD is escaped before rendering.

The user reports Google live tests passed for the homepage/sitemap and the sitemap report now shows Success. Indexing and ranking remain unconfirmed. Keyword demand/difficulty are not measured. Linking this site from external GitHub/LinkedIn profiles and ongoing Search Console monitoring are account tasks, not changes to those accounts in this pass.

## September 20 — project and journal pages

The user authorized a matching page structure after approving separate project case studies and a future AI engineering blog. Public routes are `/projects`, three verified-status case studies, and `/blog`; a reusable `/blog/[slug]` article route is ready. Inner pages extend the homepage’s near-black/violet editorial system with shared navigation, footer, responsive technical glyphs and reduced-motion-safe CSS ambience. Project pages distinguish repository-supported facts from unverified outcomes; CloudOps remains in development. The journal launches empty and noindex, excluded from the sitemap until at least one sourced, owner-reviewed article exists. Never create automated news rewrites merely to fill it.

## September 22 — search site name

User-provided Google result screenshot `01.png` shows the small site-name label as “Vercel” while the page title is separate. Preferred site name is “Agentic AI Developer”. Add homepage `WebSite` JSON-LD and `og:site_name`, and avoid em dashes in published UI and assistant answers, using `|` for compact labels. Google chooses the displayed label after recrawling; metadata is a preference, not a guarantee. Keep `01.png` local and untracked.
