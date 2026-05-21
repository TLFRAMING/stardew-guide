import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { StardewGuideArticle, StardewGuideArticleBlock, StardewGuideArticleMeta } from "./types";

const articleDirectory = path.resolve(process.cwd(), "data", "stardew", "guides", "articles");

export function getAllStardewGuideArticles(): StardewGuideArticle[] {
  if (!existsSync(articleDirectory)) {
    return [];
  }

  return readdirSync(articleDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort()
    .map(parseArticle)
    .filter((article): article is StardewGuideArticle => Boolean(article));
}

export function getStardewGuideArticleBySlug(slug: string): StardewGuideArticle | undefined {
  return getAllStardewGuideArticles().find((article) => article.slug === slug);
}

export function getStardewGuideArticlesBySlugs(slugs: string[]): StardewGuideArticle[] {
  const articles = getAllStardewGuideArticles();

  return slugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is StardewGuideArticle => Boolean(article));
}

function parseArticle(fileName: string): StardewGuideArticle | undefined {
  const filePath = path.join(articleDirectory, fileName);
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return undefined;
  }

  const meta = parseFrontmatter(match[1]);
  const markdown = match[2];
  const blocks = parseMarkdownBlocks(markdown);

  return {
    ...meta,
    fileName,
    readingTimeMinutes: getReadingTimeMinutes(markdown),
    blocks
  };
}

type RelatedDataLink = NonNullable<StardewGuideArticleMeta["relatedDataLinks"]>[number];
type FrontmatterValue = string | string[] | RelatedDataLink[];

function parseFrontmatter(frontmatter: string): StardewGuideArticleMeta {
  const meta: Record<string, FrontmatterValue> = {};
  const lines = frontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!pair) {
      continue;
    }

    const [, key, rawValue] = pair;

    if (rawValue === "" && key === "relatedDataLinks") {
      const values: RelatedDataLink[] = [];

      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        const firstPair = lines[index].trim().replace(/^- /, "").match(/^(label|href):\s*(.*)$/);
        const link: Partial<RelatedDataLink> = {};

        if (firstPair) {
          link[firstPair[1] as keyof RelatedDataLink] = unquote(firstPair[2]);
        }

        while (lines[index + 1]?.match(/^\s+(label|href):\s*/)) {
          index += 1;
          const nestedPair = lines[index].trim().match(/^(label|href):\s*(.*)$/);

          if (nestedPair) {
            link[nestedPair[1] as keyof RelatedDataLink] = unquote(nestedPair[2]);
          }
        }

        if (link.label && link.href) {
          values.push({ label: link.label, href: link.href });
        }
      }

      meta[key] = values;
      continue;
    }

    if (rawValue === "") {
      const values: string[] = [];

      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        values.push(unquote(lines[index].trim().replace(/^- /, "")));
      }

      meta[key] = values;
      continue;
    }

    meta[key] = unquote(rawValue);
  }

  return {
    slug: stringValue(meta.slug),
    title: stringValue(meta.title),
    category: stringValue(meta.category) as StardewGuideArticleMeta["category"],
    summary: stringValue(meta.summary),
    lastChecked: stringValue(meta.lastChecked),
    confidence: stringValue(meta.confidence) as StardewGuideArticleMeta["confidence"],
    patchSensitivity: stringValue(meta.patchSensitivity) as StardewGuideArticleMeta["patchSensitivity"],
    sourceUrls: stringArrayValue(meta.sourceUrls),
    relatedDataLinks: relatedDataLinkValue(meta.relatedDataLinks)
  };
}

function parseMarkdownBlocks(markdown: string): StardewGuideArticleBlock[] {
  const blocks: StardewGuideArticleBlock[] = [];
  const paragraphs: string[] = [];
  let listItems: string[] = [];
  let orderedList = false;

  function flushParagraph() {
    if (paragraphs.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphs.join(" ")
    });
    paragraphs.length = 0;
  }

  function flushList() {
    if (listItems.length === 0) {
      return;
    }

    blocks.push({
      type: "list",
      ordered: orderedList,
      items: listItems
    });
    listItems = [];
    orderedList = false;
  }

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    const unorderedItem = trimmed.match(/^-\s+(.+)$/);
    const orderedItem = trimmed.match(/^\d+\.\s+(.+)$/);

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: line.replace(/^## /, "") });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, text: line.replace(/^### /, "") });
      continue;
    }

    if (unorderedItem || orderedItem) {
      flushParagraph();
      const isOrdered = Boolean(orderedItem);

      if (listItems.length > 0 && orderedList !== isOrdered) {
        flushList();
      }

      orderedList = isOrdered;
      listItems.push((orderedItem ?? unorderedItem)?.[1] ?? "");
      continue;
    }

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraphs.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function getReadingTimeMinutes(markdown: string) {
  const words = markdown
    .replace(/^#.*$/gm, "")
    .split(/\s+/)
    .filter(Boolean);

  return Math.max(1, Math.ceil(words.length / 220));
}

function stringValue(value: FrontmatterValue | undefined) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return "";
}

function stringArrayValue(value: FrontmatterValue | undefined) {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function relatedDataLinkValue(value: FrontmatterValue | undefined) {
  return Array.isArray(value) && value.every(isRelatedDataLink) ? value : undefined;
}

function isRelatedDataLink(value: string | RelatedDataLink): value is RelatedDataLink {
  return typeof value !== "string" && typeof value.label === "string" && typeof value.href === "string";
}

function unquote(value: string) {
  return value.replace(/^["']|["']$/g, "");
}
