#!/usr/bin/env python3
"""Extract public webpage structure into raw JSON and review Markdown.

This script intentionally uses only Python standard library modules so it can run
in constrained project environments. It is a first-pass extractor, not a crawler
or anti-bot bypass tool.
"""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


SKIP_TAGS = {"script", "style", "noscript", "svg", "canvas"}


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


class PageParser(HTMLParser):
    def __init__(self, base_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.base_url = base_url
        self.title_parts: list[str] = []
        self.meta: dict[str, str] = {}
        self.canonical_url = ""
        self.headings: list[dict[str, Any]] = []
        self.links: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.json_ld_raw: list[str] = []
        self.visible_parts: list[str] = []
        self.tables: list[dict[str, Any]] = []

        self._skip_depth = 0
        self._current_tag_stack: list[str] = []
        self._current_heading: dict[str, Any] | None = None
        self._current_link: dict[str, str] | None = None
        self._current_script_type = ""
        self._current_json_ld: list[str] | None = None
        self._in_title = False

        self._current_table: dict[str, Any] | None = None
        self._current_row: list[str] | None = None
        self._current_cell: list[str] | None = None
        self._current_cell_tag = ""
        self._current_caption: list[str] | None = None

    def handle_starttag(self, tag: str, attrs_raw: list[tuple[str, str | None]]) -> None:
        attrs = {key.lower(): value or "" for key, value in attrs_raw}
        tag = tag.lower()
        self._current_tag_stack.append(tag)

        if tag in SKIP_TAGS:
            if tag == "script" and attrs.get("type", "").lower() == "application/ld+json":
                self._current_script_type = attrs.get("type", "").lower()
                self._current_json_ld = []
            else:
                self._skip_depth += 1

        if tag == "title":
            self._in_title = True

        if tag == "meta":
            name = attrs.get("name") or attrs.get("property")
            content = attrs.get("content", "")
            if name and content:
                self.meta[name.lower()] = normalize_text(content)

        if tag == "link" and attrs.get("rel", "").lower() == "canonical":
            self.canonical_url = urllib.parse.urljoin(self.base_url, attrs.get("href", ""))

        if re.fullmatch(r"h[1-6]", tag):
            self._current_heading = {"level": int(tag[1]), "parts": []}

        if tag == "a" and attrs.get("href"):
            self._current_link = {
                "href": urllib.parse.urljoin(self.base_url, attrs["href"]),
                "text": "",
            }

        if tag == "img":
            self.images.append(
                {
                    "src": urllib.parse.urljoin(self.base_url, attrs.get("src", "")),
                    "alt": normalize_text(attrs.get("alt", "")),
                }
            )

        if tag == "table":
            self._current_table = {
                "index": len(self.tables),
                "caption": "",
                "headers": [],
                "rows": [],
                "confidence": "high",
            }

        if self._current_table is not None and tag == "caption":
            self._current_caption = []

        if self._current_table is not None and tag == "tr":
            self._current_row = []

        if self._current_table is not None and tag in {"td", "th"}:
            self._current_cell = []
            self._current_cell_tag = tag

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()

        if tag == "title":
            self._in_title = False

        if tag in SKIP_TAGS:
            if tag == "script" and self._current_json_ld is not None:
                self.json_ld_raw.append("".join(self._current_json_ld).strip())
                self._current_json_ld = None
                self._current_script_type = ""
            elif self._skip_depth > 0:
                self._skip_depth -= 1

        if re.fullmatch(r"h[1-6]", tag) and self._current_heading is not None:
            text = normalize_text("".join(self._current_heading["parts"]))
            if text:
                self.headings.append({"level": self._current_heading["level"], "text": text})
            self._current_heading = None

        if tag == "a" and self._current_link is not None:
            self._current_link["text"] = normalize_text(self._current_link["text"])
            if self._current_link["href"]:
                self.links.append(self._current_link)
            self._current_link = None

        if self._current_table is not None and tag == "caption" and self._current_caption is not None:
            self._current_table["caption"] = normalize_text("".join(self._current_caption))
            self._current_caption = None

        if self._current_table is not None and tag in {"td", "th"} and self._current_cell is not None:
            text = normalize_text("".join(self._current_cell))
            if self._current_row is not None:
                self._current_row.append(text)
            if tag == "th":
                self._current_table.setdefault("_header_candidate", []).append(text)
            self._current_cell = None
            self._current_cell_tag = ""

        if self._current_table is not None and tag == "tr" and self._current_row is not None:
            if self._current_row:
                header_candidate = self._current_table.pop("_header_candidate", [])
                if header_candidate and not self._current_table["headers"]:
                    self._current_table["headers"] = self._current_row
                else:
                    self._current_table["rows"].append(self._current_row)
            self._current_row = None

        if tag == "table" and self._current_table is not None:
            self._current_table.pop("_header_candidate", None)
            self.tables.append(self._current_table)
            self._current_table = None

        if self._current_tag_stack:
            self._current_tag_stack.pop()

    def handle_data(self, data: str) -> None:
        if self._current_json_ld is not None:
            self._current_json_ld.append(data)
            return

        if self._skip_depth > 0:
            return

        if self._in_title:
            self.title_parts.append(data)

        if self._current_heading is not None:
            self._current_heading["parts"].append(data)

        if self._current_link is not None:
            self._current_link["text"] += data

        if self._current_caption is not None:
            self._current_caption.append(data)

        if self._current_cell is not None:
            self._current_cell.append(data)

        text = normalize_text(data)
        if text:
            self.visible_parts.append(text)


def fetch_url(url: str, timeout: int) -> tuple[str, str]:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; PlayerCodexExtractor/1.0)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        body = response.read().decode(charset, errors="replace")
        return body, response.geturl()


def parse_json_ld(blocks: list[str]) -> tuple[list[Any], list[str]]:
    parsed: list[Any] = []
    warnings: list[str] = []

    for index, block in enumerate(blocks):
        if not block:
            continue
        try:
            parsed.append(json.loads(block))
        except json.JSONDecodeError:
            parsed.append({"raw": block})
            warnings.append(f"JSON-LD block {index} could not be parsed.")

    return parsed, warnings


def build_result(url: str, html_text: str, final_url: str) -> dict[str, Any]:
    parser = PageParser(final_url or url)
    parser.feed(html_text)
    json_ld, warnings = parse_json_ld(parser.json_ld_raw)

    title = normalize_text("".join(parser.title_parts))
    if not title and parser.headings:
        title = parser.headings[0]["text"]

    description = parser.meta.get("description", "")
    visible_text = normalize_text(" ".join(parser.visible_parts))

    if parser.tables or json_ld:
        confidence = "high"
    elif parser.headings and visible_text:
        confidence = "medium"
    else:
        confidence = "low"
        warnings.append("No tables or structured data found; extraction relies on visible text.")

    return {
        "sourceUrl": url,
        "finalUrl": final_url,
        "fetchedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "title": title,
        "description": description,
        "canonicalUrl": parser.canonical_url,
        "headings": parser.headings,
        "tables": parser.tables,
        "links": parser.links,
        "images": parser.images,
        "jsonLd": json_ld,
        "visibleText": visible_text[:50000],
        "confidence": confidence,
        "warnings": warnings,
    }


def write_review(result: dict[str, Any], review_path: Path) -> None:
    table_lines = []
    for table in result["tables"]:
        table_lines.append(
            f"- Table {table['index']}: {len(table.get('headers', []))} headers, "
            f"{len(table.get('rows', []))} rows, caption: {table.get('caption') or 'none'}"
        )

    decision = "needs manual review"
    if result["confidence"] == "high" and not result["warnings"]:
        decision = "approve for cleaning"
    if result["confidence"] == "low":
        decision = "reject or manually inspect"

    content = "\n".join(
        [
            "# Web Extraction Review",
            "",
            f"- Source URL: {result['sourceUrl']}",
            f"- Final URL: {result.get('finalUrl') or 'n/a'}",
            f"- Title: {result.get('title') or 'n/a'}",
            f"- Canonical URL: {result.get('canonicalUrl') or 'n/a'}",
            f"- Confidence: {result['confidence']}",
            f"- Recommendation: {decision}",
            "",
            "## Tables",
            *(table_lines or ["- No tables found."]),
            "",
            "## JSON-LD",
            f"- Blocks parsed: {len(result['jsonLd'])}",
            "",
            "## Headings",
            *[f"- h{item['level']}: {item['text']}" for item in result["headings"][:30]],
            "",
            "## Warnings",
            *(f"- {warning}" for warning in result["warnings"]),
            *([] if result["warnings"] else ["- None."]),
            "",
            "## Candidate Facts",
            "- Review raw JSON before converting any value into production data.",
            "- Mark uncertain or missing values as `needs verification`.",
        ]
    )

    review_path.parent.mkdir(parents=True, exist_ok=True)
    review_path.write_text(content + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract a public webpage into raw JSON and review Markdown.")
    parser.add_argument("--url", required=True)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--review", required=True, type=Path)
    parser.add_argument("--timeout", default=20, type=int)
    args = parser.parse_args()

    try:
        body, final_url = fetch_url(args.url, args.timeout)
        result = build_result(args.url, body, final_url)
    except Exception as exc:  # noqa: BLE001 - CLI should serialize extraction errors.
        result = {
            "sourceUrl": args.url,
            "finalUrl": "",
            "fetchedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
            "title": "",
            "description": "",
            "canonicalUrl": "",
            "headings": [],
            "tables": [],
            "links": [],
            "images": [],
            "jsonLd": [],
            "visibleText": "",
            "confidence": "low",
            "warnings": [f"Fetch or parse failed: {exc}"],
        }

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    write_review(result, args.review)
    print(f"Wrote {args.out}")
    print(f"Wrote {args.review}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
