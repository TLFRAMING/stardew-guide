# SOCM-2 Intro Page Plan

## Stage

SOCM-2: intro page feasibility review for Songs of Conquest Mobile.

## Scope

This plan evaluates whether Player Codex can safely publish a low-risk `/songs-of-conquest-mobile` intro page. It does not create routes, code, sitemap entries, navigation buttons, guides, faction pages, tier lists, database pages, images, or advertising changes.

## Source Registry Used

Production source registry:

- `stardew-guide/data/songs-of-conquest-mobile/sources.json`

Registered sources:

- `app-store`
- `google-play`
- `official-site`
- `steam-store`
- `lavapotion`

## Recommended Page Status

Recommended: create one intro page in SOCM-3.

Recommended route:

- `/songs-of-conquest-mobile`

Recommended sitemap status:

- Add `/songs-of-conquest-mobile` only after SOCM-3 creates the route and build confirms static export.

Recommended navigation status:

- Do not add to SiteNav in SOCM-3 unless the user explicitly approves a new top-level game nav item.

Recommended homepage status:

- A homepage card can be considered after the intro page exists, but SOCM-3 should keep homepage changes separate unless explicitly approved.

## What The Intro Page Can Safely Say

The page can safely say, using the registered sources:

- Songs of Conquest Mobile has App Store and Google Play store pages.
- It is a mobile version of Songs of Conquest.
- The game is an adventure strategy / turn-based strategy experience with kingdom or empire building, resource management, Wielders, armies, and tactical battles.
- The official game ecosystem includes Lavapotion and Coffee Stain Publishing context, subject to the exact wording shown by each source.
- Mobile availability facts should come from `app-store` and `google-play`.
- Broad game identity and system framing can come from `official-site`.
- Steam can support only desktop/PC baseline context and must not be treated as mobile proof.

## What The Intro Page Must Not Say Yet

Do not publish:

- best faction
- best Wielder
- faction tier list
- troop tier list
- strongest build
- best campaign route
- current meta
- multiplayer balance conclusions
- exact resource formulas
- exact combat damage formulas
- mobile vs PC balance differences
- DLC availability assumptions
- PC-only controls or workshop assumptions
- store review sentiment or quoted reviews
- player consensus
- image, logo, icon, screenshot, or press-kit usage rights

## Recommended Intro Page Sections

1. Hero / identity card
   - Name: Songs of Conquest Mobile
   - Label: mobile strategy guide coverage
   - Short copy: turn-based adventure strategy, Wielders, armies, resource and kingdom planning.

2. Beginner-safe overview
   - Explain the guide coverage direction: first campaign, faction choice framework, resource and town planning, combat positioning, Wielder and magic basics, mobile session planning.
   - Avoid specific build or faction recommendations.

3. Mobile verification boundary
   - Do not show this as an internal QA disclaimer.
   - Player-facing wording should be practical: "Mobile pages will focus on controls, session planning, and decisions verified against mobile store or official sources."

4. Planned guide topics
   - Non-link cards only in SOCM-3, unless detail routes are created later.
   - Candidate topics:
     - Beginner first campaign
     - Faction choice framework
     - Resource and town building basics
     - Combat positioning basics
     - Wielder and magic basics
     - Mobile controls and session planning

5. Verified source links
   - Display source title, publisher, source type, and URL.
   - Do not display internal notes.

## Data Model Recommendation

No new production article data in SOCM-3.

Keep only:

- `stardew-guide/data/songs-of-conquest-mobile/sources.json`

If SOCM-3 needs a small local data helper, it should read `sources.json` only.

## Risk Assessment

Thin content risk: medium if the page only says the game exists. Reduce this by adding a clear coverage roadmap, beginner-safe decision framing, and source cards.

Mobile/PC mismatch risk: high if Steam or PC guide knowledge is used as mobile proof. Reduce this by using `app-store` and `google-play` for mobile facts, while treating `steam-store` only as broad PC baseline context.

AdSense risk: low if the page is original, useful, source-backed, and does not use official assets or copied store text.

SEO risk: low to medium. A single intro page is acceptable, but guide detail pages should not be created until production article drafts are available.

## SOCM-3 Implementation Recommendation

If approved, SOCM-3 should:

- Create `/songs-of-conquest-mobile`
- Read `sources.json`
- Show identity, coverage roadmap, beginner-safe overview, planned guide topics, and source cards
- Add `/songs-of-conquest-mobile` to sitemap
- Run `npm.cmd run build`

SOCM-3 should not:

- create `/songs-of-conquest-mobile/guides`
- create guide detail routes
- create database pages
- alter AdSense
- alter SiteNav unless explicitly approved
- alter Stardew, Rogue Command, or Nova Roma
- use official images or screenshots

## Production-Ready Judgment

This review plan is production-ready as a planning artifact. The intro page itself is not created yet and should only be considered production-ready after SOCM-3 implementation, build, export, and sitemap verification.

