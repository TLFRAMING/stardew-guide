import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { RogueCommandArticle, RogueCommandArticleBlock, RogueCommandArticleMeta, RogueCommandSource } from "./types";

const dataDirectory = path.resolve(process.cwd(), "data", "rogue-command");
const articleDirectory = path.join(dataDirectory, "articles");

function readJsonArray<T>(fileName: string): T[] {
  const filePath = path.join(dataDirectory, fileName);

  if (!existsSync(filePath)) {
    return [];
  }

  try {
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    return Array.isArray(data) ? (data as T[]) : [];
  } catch {
    return [];
  }
}

export function getAllRogueCommandSources(): RogueCommandSource[] {
  return readJsonArray<RogueCommandSource>("sources.json");
}

export function getAllRogueCommandArticles(): RogueCommandArticle[] {
  if (!existsSync(articleDirectory)) {
    return [];
  }

  const sourcesById = new Map(getAllRogueCommandSources().map((source) => [source.id, source]));

  return readdirSync(articleDirectory)
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
    .sort()
    .map((fileName) => parseArticle(fileName, sourcesById))
    .filter((article): article is RogueCommandArticle => Boolean(article));
}

export function getRogueCommandArticleBySlug(slug: string): RogueCommandArticle | undefined {
  return getAllRogueCommandArticles().find((article) => article.slug === slug);
}

export function getRogueCommandArticlesByCategory() {
  return getAllRogueCommandArticles().reduce<Record<string, RogueCommandArticle[]>>((groups, article) => {
    groups[article.category] = [...(groups[article.category] ?? []), article];
    return groups;
  }, {});
}

export function getRelatedRogueCommandArticles(article: RogueCommandArticle, limit = 3): RogueCommandArticle[] {
  const allArticles = getAllRogueCommandArticles();
  const relatedBySlug = article.relatedSlugs
    .map((relatedSlug) => allArticles.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is RogueCommandArticle => {
      if (!candidate) {
        return false;
      }

      return candidate.slug !== article.slug;
    });

  if (relatedBySlug.length >= limit) {
    return relatedBySlug.slice(0, limit);
  }

  const fallbackArticles = allArticles.filter(
    (candidate) => candidate.slug !== article.slug && candidate.category === article.category && !relatedBySlug.some((relatedArticle) => relatedArticle.slug === candidate.slug)
  );

  return [...relatedBySlug, ...fallbackArticles].slice(0, limit);
}

function parseArticle(fileName: string, sourcesById: Map<string, RogueCommandSource>): RogueCommandArticle | undefined {
  const filePath = path.join(articleDirectory, fileName);
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return undefined;
  }

  const meta = parseFrontmatter(match[1]);
  const blocks = parseMarkdownBlocks(match[2]);
  const fallbackSummary = blocks.find((block): block is Extract<RogueCommandArticleBlock, { type: "paragraph" }> => block.type === "paragraph")?.text ?? "";
  const summary = meta.summary || fallbackSummary;
  const sources = meta.sourceIds.map((sourceId) => sourcesById.get(sourceId)).filter((source): source is RogueCommandSource => Boolean(source));
  const readingTimeMinutes = estimateReadingTime(match[2]);

  return {
    ...meta,
    fileName,
    readingTimeMinutes,
    summary,
    blocks,
    sources
  };
}

function parseFrontmatter(frontmatter: string): RogueCommandArticleMeta {
  const meta: Record<string, string | string[]> = {};
  const lines = frontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!pair) {
      continue;
    }

    const [, key, rawValue] = pair;

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
    category: stringValue(meta.category),
    patchVersion: stringValue(meta.patchVersion),
    lastVerified: stringValue(meta.lastVerified),
    confidence: stringValue(meta.confidence) as RogueCommandArticleMeta["confidence"],
    patchSensitivity: stringValue(meta.patchSensitivity) as RogueCommandArticleMeta["patchSensitivity"],
    summary: stringValue(meta.summary),
    relatedSlugs: Array.isArray(meta.relatedSlugs) ? meta.relatedSlugs : [],
    sourceIds: Array.isArray(meta.sourceIds) ? meta.sourceIds : []
  };
}

function parseMarkdownBlocks(markdown: string): RogueCommandArticleBlock[] {
  const blocks: RogueCommandArticleBlock[] = [];
  const paragraphs: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;

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
      ordered: listOrdered,
      items: listItems
    });
    listItems = [];
    listOrdered = false;
  }

  for (const line of markdown.split(/\r?\n/)) {
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

    const unorderedListItem = line.match(/^\s*[-*]\s+(.+)$/);
    const orderedListItem = line.match(/^\s*\d+\.\s+(.+)$/);

    if (unorderedListItem || orderedListItem) {
      flushParagraph();

      const ordered = Boolean(orderedListItem);
      if (listItems.length > 0 && listOrdered !== ordered) {
        flushList();
      }

      listOrdered = ordered;
      listItems.push((unorderedListItem?.[1] ?? orderedListItem?.[1] ?? "").trim());
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraphs.push(line.trim());
  }

  flushParagraph();
  flushList();
  return blocks;
}

function estimateReadingTime(markdown: string) {
  const wordCount = markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, "")
    .replace(/[#>*_`-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 220));
}

function stringValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function unquote(value: string) {
  return value.replace(/^["']|["']$/g, "");
}
