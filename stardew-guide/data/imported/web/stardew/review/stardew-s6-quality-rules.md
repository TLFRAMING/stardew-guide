# Stardew-S6 Guide Quality Rules

Last checked: 2026-05-21

## Scope

This file records the rules learned from Stardew-S1 through Stardew-S5. It is a project-specific quality layer for future Stardew guide batches. It does not change production data, routes, sitemap, layout, ads, or navigation.

Use this file with the `game-guide-research-writer` skill before writing or reviewing any new Stardew guide articles.

## Durable Rules From S1-S5

### 1. Keep Review, Clean, And Production Separate

Future guide work must keep these roles distinct:

- `data/imported/web/stardew/review/`: planning, risk review, QA, and editorial notes.
- `data/imported/web/stardew/clean/`: clean candidates and draft articles that are not live.
- `data/stardew/guides/articles/`: approved production guide articles only.

Do not let review files enter production readers, sitemap, or route generation.

### 2. Use Markdown For Long-Form Guides

Long guide articles should stay as Markdown files, not long JSON strings. JSON remains better for structured reference data such as crops, fish, villagers, money guide comparison records, and future index metadata.

Current production path:

- `stardew-guide/data/stardew/guides/articles/*.md`

Current production route:

- `/stardew/guides`
- `/stardew/guides/[slug]`

Do not create category routes until there is enough depth per category.

### 3. Start From Player Decisions

Every guide must answer a real player decision, not summarize a wiki page.

Good guide promise examples:

- "This guide helps a new player decide how much to plant before energy becomes the bottleneck."
- "This guide helps a first-month player decide when a mine trip is worth ending early."
- "This guide helps a beginner decide whether a route is a cash bridge or a long-term farm plan."

Weak guide promises:

- "This guide explains Energy."
- "This guide lists all gifts."
- "This guide covers the best route."

### 4. Advice Must Be Playable

Each practical recommendation should include at least two of:

- condition: when the advice applies;
- action: what to do in-game;
- reason: why it helps;
- failure mode: when it stops working;
- boundary: what needs verification.

If a sentence cannot change what a player does in a save, rewrite it.

### 5. Avoid False Precision

Do not publish exact profit, date, route, or output claims unless the source and calculation are explicit.

Keep these topics conditional unless tested:

- fishing daily income;
- animal yearly profit;
- exact crop route profit;
- Community Center speed routes;
- weather-dependent tool upgrades;
- layout-dependent honey or sprinkler plans.

Use language such as "cash bridge", "tempo tool", "good when", "fails when", or "depends on setup" instead of universal ranking language.

### 6. Protect High-Risk Stardew Topics

The following topics need extra verification before production:

- Community Center: use standard bundles only unless remixed support is explicitly designed.
- Animals: avoid profit ranking unless building, animal, product, and processing costs are verified.
- Friendship and gifts: do not turn universal gift rules or partially verified gift fields into full factual tables.
- Ginger Island and late-game systems: defer until source review and route scope are explicit.
- Skull Cavern optimization: do not publish route/meta claims without testing.

### 7. Keep Source URLs Clean

Production `sourceUrls` must contain real external URLs only.

Forbidden in `sourceUrls`:

- `turnXX`
- `local-content-workspace`
- local file paths
- image URLs
- wiki media/static asset URLs
- Reddit, Discord, forum, or community claims used as facts

Wiki/database pages are acceptable for mechanics, but the guide should still use original structure and player reasoning.

### 8. Frontmatter Requirements

Production Stardew guide Markdown must include:

```yaml
---
slug: "stable-slug"
title: "Player-facing title"
category: "beginner"
summary: "Original one-sentence guide summary."
lastChecked: "YYYY-MM-DD"
confidence: "medium"
patchSensitivity: "low"
sourceUrls:
  - "https://stardewvalleywiki.com/..."
---
```

Allowed confidence values:

- `high`
- `medium`
- `needs verification`

Allowed patch sensitivity values:

- `low`
- `medium`
- `high`

Use `medium` by default for strategy content unless it has direct in-game testing or highly stable mechanics.

### 9. Production Batch Size

Do not publish every draft just because it exists. A batch should be small enough to review, build, deploy, and watch in Search Console.

Recommended production batch size:

- 5 to 10 articles for a new category;
- fewer for high-risk categories such as gifts, animal economy, Community Center routing, or late-game optimization.

### 10. Sitemaps Come After Build

Add guide routes to `sitemap.ts` only after:

- production article files exist;
- route builds;
- `generateStaticParams()` produces the intended slugs;
- temporarily deferred articles are confirmed absent;
- `npm.cmd run build` passes.

Do not add review or clean candidates to sitemap.

### 11. AdSense Stability Rule

Do not change AdSense while publishing content batches unless the user explicitly asks. Content expansion should not add:

- ad scripts;
- Auto Ads scripts;
- ad slots;
- layout ad wrappers.

### 12. Internal Linking Rule

New guide surfaces need at least one stable internal discovery path. For S4/S5, `/stardew` now links to `/stardew/guides`. Future batches should prefer:

- guide hub cards;
- article-to-database links;
- database-to-guide links only when genuinely useful.

Do not add every new guide to global navigation.

## Review Checklist For Each Future Batch

Before approving production, confirm:

- files are in the correct stage directory;
- frontmatter fields are complete;
- slugs are stable and unique;
- source URLs are real and clean;
- no image URLs or hotlinks are present;
- no copied wiki/guide structure is present;
- no "best route", "most optimal", "current meta", or unsupported ranking claim is present;
- high-risk topics are either deferred or explicitly bounded;
- sitemap includes only approved production pages;
- `npm.cmd run build` passes;
- deployment commands use explicit paths and never `git add .`.

## Next Batch Guidance

The next Stardew guide batch should expand beginner and early-mid progression before high-risk route optimization.

Preferred topics:

- stable, decision-first, beginner-friendly;
- supported by existing project data and wiki mechanics;
- useful without exact profit math;
- good for internal links to current data modules.

Defer:

- full gift guides;
- detailed animal profit rankings;
- Community Center speed routes;
- Skull Cavern and Ginger Island optimization;
- perfection routing;
- remixed bundle logic.
