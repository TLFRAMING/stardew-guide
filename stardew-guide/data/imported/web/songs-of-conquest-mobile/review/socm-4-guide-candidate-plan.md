# SOCM-4 Guide Candidate Plan

## Stage

SOCM-4: Songs of Conquest Mobile guide candidate planning.

## Scope

This stage creates review and clean candidate artifacts only. It does not create production guide articles, routes, guide hubs, database pages, sitemap entries, navigation entries, homepage cards, images, or AdSense changes.

## Source Registry Used

Production source registry:

- `stardew-guide/data/songs-of-conquest-mobile/sources.json`

Approved sourceIds for this stage:

- `app-store`
- `google-play`
- `official-site`
- `steam-store`
- `lavapotion`

## Game Type And Core Pressure

```json
{
  "gameType": "turn-based strategy / adventure strategy",
  "corePressure": [
    "resource accumulation",
    "map exploration",
    "army preservation",
    "town development",
    "combat positioning",
    "Wielder development",
    "mobile session planning"
  ],
  "priorityReviewSignals": [
    "onboarding confusion",
    "faction choice uncertainty",
    "losing too many troops in early battles",
    "unclear resource priorities",
    "large-map fatigue on mobile",
    "not knowing how Wielders, armies, and towns connect"
  ],
  "lowPriorityReviewSignals": [
    "graphics preference",
    "PC versus mobile taste complaints",
    "unsupported balance claims",
    "faction power rankings",
    "multiplayer meta claims"
  ]
}
```

## Candidate Strategy

The first guide layer should be mobile-first but not mobile-overclaimed. It can use App Store and Google Play for mobile release surface and official site / Steam for broad game identity. It should not treat PC-only mechanics, DLC state, control schemes, workshop, or live balance as mobile facts.

Good early topics:

- decision frameworks
- beginner mistakes
- resource and town planning
- army preservation
- combat positioning
- Wielder role basics
- mobile session readability

Rejected for now:

- faction rankings
- Wielder rankings
- troop tier lists
- exact combat formulas
- exact build orders
- multiplayer meta
- campaign walkthroughs
- PC/mobile difference verdicts

## Recommended Production Entry Order

If moving into SOCM-5, start with 3 articles:

1. `beginner-first-campaign`
2. `faction-choice-framework`
3. `combat-positioning-basics`

Then add:

4. `resource-town-building-basics`
5. `wielder-magic-basics`
6. `mobile-session-planning`

Reason: the first three answer the most immediate beginner questions without requiring exact formulas or ranking claims.

## Route Recommendation

Do not create `/songs-of-conquest-mobile/guides` in SOCM-4.

In SOCM-5, if production articles are created, use the existing Player Codex pattern:

- `/songs-of-conquest-mobile/guides`
- `/songs-of-conquest-mobile/guides/[slug]`

Only add routes after articles exist and build confirms static export.

## Internal Link Plan

Future article frontmatter should include:

- Songs of Conquest Mobile Home -> `/songs-of-conquest-mobile`
- Songs of Conquest Mobile Guides -> `/songs-of-conquest-mobile/guides` after the guide hub exists
- 2-3 related guide links once sibling guides exist

Do not link to non-existent detail routes in SOCM-4.

## Safety Notes For Writers

Keep these controls internal. Do not turn them into visible article sections:

- source confidence
- PC/mobile mismatch warnings
- "not enough evidence for ranking"
- source-boundary language
- "this guide uses..." explanations

Public article bodies should read as practical guides: what to check, what to do, why it matters, what mistake to avoid, and when to slow down.

