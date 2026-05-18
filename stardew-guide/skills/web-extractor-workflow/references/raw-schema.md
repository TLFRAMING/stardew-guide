# Web Extraction Raw Schema

Use this schema for raw extraction artifacts. Production schemas may differ; do not write raw artifacts directly into production data.

## Top-Level Fields

- `sourceUrl`: original requested URL.
- `finalUrl`: final URL after redirects, if known.
- `fetchedAt`: ISO timestamp.
- `title`: page title from `<title>` or first `h1`.
- `description`: meta description, if present.
- `canonicalUrl`: canonical link, if present.
- `headings`: array of `{ level, text }`.
- `tables`: array of extracted tables.
- `links`: array of `{ text, href }`.
- `images`: array of `{ alt, src }`.
- `jsonLd`: parsed JSON-LD blocks, or raw text if parsing failed.
- `visibleText`: normalized visible page text.
- `confidence`: `low`, `medium`, or `high`.
- `warnings`: parser warnings and limitations.

## Table Shape

```json
{
  "index": 0,
  "caption": "",
  "headers": ["Name", "Value"],
  "rows": [
    ["Parsnip", "Spring"]
  ],
  "confidence": "high"
}
```

## Review Decisions

Use:

- `approve`: source structure is clear and data can be cleaned.
- `needs manual review`: relevant data exists but has ambiguity.
- `reject`: page is unsuitable, blocked, empty, or mostly unrelated.
