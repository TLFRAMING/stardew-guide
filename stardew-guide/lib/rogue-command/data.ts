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

function parseArticle(fileName: string, sourcesById: Map<string, RogueCommandSource>): RogueCommandArticle | undefined {
  const filePath = path.join(articleDirectory, fileName);
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return undefined;
  }

  const meta = parseFrontmatter(match[1]);
  const blocks = parseMarkdownBlocks(match[2]);
  const summary = blocks.find((block): block is Extract<RogueCommandArticleBlock, { type: "paragraph" }> => block.type === "paragraph")?.text ?? "";
  const sources = meta.sourceIds.map((sourceId) => sourcesById.get(sourceId)).filter((source): source is RogueCommandSource => Boolean(source));

  return {
    ...meta,
    fileName,
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
    sourceIds: Array.isArray(meta.sourceIds) ? meta.sourceIds : []
  };
}

function parseMarkdownBlocks(markdown: string): RogueCommandArticleBlock[] {
  const blocks: RogueCommandArticleBlock[] = [];
  const paragraphs: string[] = [];

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

  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith("# ")) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push({ type: "heading", level: 2, text: line.replace(/^## /, "") });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push({ type: "heading", level: 3, text: line.replace(/^### /, "") });
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      continue;
    }

    paragraphs.push(line.trim());
  }

  flushParagraph();
  return blocks;
}

function stringValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function unquote(value: string) {
  return value.replace(/^["']|["']$/g, "");
}
