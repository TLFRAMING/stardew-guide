import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type {
  SongsOfConquestMobileGuideArticle,
  SongsOfConquestMobileGuideArticleBlock,
  SongsOfConquestMobileGuideRelatedDataLink,
  SongsOfConquestMobileSource
} from "./types";

const dataDirectory = path.resolve(process.cwd(), "data", "songs-of-conquest-mobile");
const articleDirectory = path.join(dataDirectory, "guides", "articles");
const preferredGuideOrder = [
  "beginner-first-campaign",
  "faction-choice-framework",
  "combat-positioning-basics",
  "essence-spellcasting-basics",
  "wielder-role-and-skill-basics",
  "mobile-vs-pc-content-differences",
  "does-mobile-have-multiplayer",
  "resource-town-building-basics",
  "arleon-beginner-guide",
  "rana-beginner-guide",
  "mobile-session-planning"
] as const;
const preferredGuideOrderIndex = new Map<string, number>(preferredGuideOrder.map((slug, index) => [slug, index]));

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

export function getAllSongsOfConquestMobileSources(): SongsOfConquestMobileSource[] {
  return readJsonArray<SongsOfConquestMobileSource>("sources.json");
}

export function getAllSongsOfConquestMobileGuideArticles(): SongsOfConquestMobileGuideArticle[] {
  if (!existsSync(articleDirectory)) {
    return [];
  }

  return readdirSync(articleDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort()
    .map(parseArticle)
    .filter((article): article is SongsOfConquestMobileGuideArticle => Boolean(article))
    .sort((left, right) => {
      const leftIndex = preferredGuideOrderIndex.get(left.slug) ?? Number.MAX_SAFE_INTEGER;
      const rightIndex = preferredGuideOrderIndex.get(right.slug) ?? Number.MAX_SAFE_INTEGER;

      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }

      return left.slug.localeCompare(right.slug);
    });
}

export function getSongsOfConquestMobileGuideArticleBySlug(slug: string): SongsOfConquestMobileGuideArticle | undefined {
  return getAllSongsOfConquestMobileGuideArticles().find((article) => article.slug === slug);
}

export function getAllSongsOfConquestMobileGuideSlugs(): string[] {
  return getAllSongsOfConquestMobileGuideArticles().map((article) => article.slug);
}

type FrontmatterValue = string | string[] | SongsOfConquestMobileGuideRelatedDataLink[];

function parseArticle(fileName: string): SongsOfConquestMobileGuideArticle | undefined {
  const filePath = path.join(articleDirectory, fileName);
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return undefined;
  }

  const meta = parseFrontmatter(match[1]);
  const content = match[2];
  const blocks = parseMarkdownBlocks(content);

  return {
    ...meta,
    content,
    fileName,
    readingTimeMinutes: getReadingTimeMinutes(content),
    blocks
  };
}

function parseFrontmatter(frontmatter: string) {
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
      const values: SongsOfConquestMobileGuideRelatedDataLink[] = [];

      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        const firstPair = lines[index].trim().replace(/^- /, "").match(/^(label|href):\s*(.*)$/);
        const link: Partial<SongsOfConquestMobileGuideRelatedDataLink> = {};

        if (firstPair) {
          link[firstPair[1] as keyof SongsOfConquestMobileGuideRelatedDataLink] = unquote(firstPair[2]);
        }

        while (lines[index + 1]?.match(/^\s+(label|href):\s*/)) {
          index += 1;
          const nestedPair = lines[index].trim().match(/^(label|href):\s*(.*)$/);

          if (nestedPair) {
            link[nestedPair[1] as keyof SongsOfConquestMobileGuideRelatedDataLink] = unquote(nestedPair[2]);
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
    category: stringValue(meta.category),
    summary: stringValue(meta.summary),
    lastChecked: stringValue(meta.lastChecked),
    confidence: stringValue(meta.confidence) as SongsOfConquestMobileGuideArticle["confidence"],
    patchSensitivity: stringValue(meta.patchSensitivity) as SongsOfConquestMobileGuideArticle["patchSensitivity"],
    sourceUrls: stringArrayValue(meta.sourceUrls),
    relatedDataLinks: relatedDataLinkValue(meta.relatedDataLinks)
  };
}

function parseMarkdownBlocks(markdown: string): SongsOfConquestMobileGuideArticleBlock[] {
  const blocks: SongsOfConquestMobileGuideArticleBlock[] = [];
  const paragraphs: string[] = [];
  let listItems: string[] = [];
  let orderedList = false;

  function flushParagraph() {
    if (paragraphs.length === 0) {
      return;
    }

    blocks.push({ type: "paragraph", text: paragraphs.join(" ") });
    paragraphs.length = 0;
  }

  function flushList() {
    if (listItems.length === 0) {
      return;
    }

    blocks.push({ type: "list", ordered: orderedList, items: listItems });
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

function isRelatedDataLink(value: string | SongsOfConquestMobileGuideRelatedDataLink): value is SongsOfConquestMobileGuideRelatedDataLink {
  return typeof value !== "string" && typeof value.label === "string" && typeof value.href === "string";
}

function unquote(value: string) {
  return value.replace(/^["']|["']$/g, "");
}
