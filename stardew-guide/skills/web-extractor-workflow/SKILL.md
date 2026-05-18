---
name: web-extractor-workflow
description: Extract webpages into reviewable structured data before adding content to a site or JSON dataset. Use when Codex needs to gather information from public webpages, wiki pages, game databases, documentation pages, articles, tables, JSON-LD, or repeated source URLs, especially when the result must preserve source URLs, confidence, raw extraction, review notes, and human approval before writing production data.
---

# Web Extractor Workflow

## Core Rule

Never write extracted webpage content directly into production data or articles.

Use this sequence:

1. Extract raw webpage structure.
2. Save raw JSON.
3. Generate a review Markdown file.
4. Mark uncertain fields.
5. Wait for human approval before updating production JSON, MDX, or pages.

Prefer HTML, DOM, tables, lists, definition lists, JSON-LD, and page metadata over screenshot/OCR. Use screenshot/OCR only when text is not available in HTML.

## Output Locations

For this project, use:

```text
data/imported/web/raw/
data/imported/web/review/
data/imported/web/clean/
```

Do not write to `data/stardew/**` until the user approves the reviewed data.

## Quick Start

Run the bundled extractor for public pages that do not require login:

```powershell
python skills/web-extractor-workflow/scripts/extract_page.py `
  --url "https://example.com/page" `
  --out data/imported/web/raw/example.json `
  --review data/imported/web/review/example.md
```

If network access fails because of sandbox restrictions, request approval to run the same command with network access.

## Extraction Priority

Use this order:

1. HTML source and metadata.
2. DOM semantics: headings, tables, lists, links, images, `dl/dt/dd`.
3. JSON-LD and structured scripts.
4. Known page API responses, if obvious and allowed.
5. Screenshot/OCR only as fallback.

Do not treat sidebar widgets, ads, recommendations, comments, or navigation as main content unless the user explicitly asks for them.

## Raw JSON Requirements

Each raw extraction must include:

```json
{
  "sourceUrl": "...",
  "fetchedAt": "...",
  "title": "...",
  "description": "...",
  "canonicalUrl": "...",
  "headings": [],
  "tables": [],
  "links": [],
  "images": [],
  "jsonLd": [],
  "visibleText": "...",
  "confidence": "low|medium|high",
  "warnings": []
}
```

For repeated extraction across multiple pages, save one raw JSON file per source URL.

## Review Markdown Requirements

Every extraction must produce a review file with:

- Source URL.
- Extracted title/canonical URL.
- Tables found and row counts.
- Candidate facts.
- Uncertain or missing values.
- Warnings about parsing limitations.
- Recommendation: approve, reject, or needs manual review.

The review file is for human inspection. Keep it concise and factual.

## Confidence Rules

Use `high` only when data came from structured table rows, JSON-LD, or clearly labeled fields.

Use `medium` when data came from visible text near relevant headings but required interpretation.

Use `low` when data came from ambiguous prose, inferred context, OCR, or incomplete HTML.

Mark unknown data as `"needs verification"` rather than guessing.

## Production Write Gate

Before updating production files:

1. Confirm the raw JSON exists.
2. Confirm the review file exists.
3. Confirm each production field has a source URL.
4. Confirm uncertain fields are marked.
5. Ask the user for approval if the data changes public site content.

For Stardew Guide, production data means:

```text
data/stardew/*.json
```

## When a Plugin Is Needed

Use this skill alone for public, static HTML pages.

Escalate to a custom plugin or browser automation when extraction needs:

- Login/session cookies.
- Rendered DOM after client-side JavaScript.
- Repeated authenticated sources.
- Screenshots tied to DOM coordinates.
- Browser network request capture.

Do not build a plugin before the extraction workflow is stable with scripts.

## Bundled Resources

- `scripts/extract_page.py`: no-dependency public page extractor that writes raw JSON and review Markdown.
- `references/raw-schema.md`: schema notes for extracted artifacts.
