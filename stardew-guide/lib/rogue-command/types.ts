export type RogueCommandSource = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  sourceType: "store" | "announcement" | "official-site" | "wiki" | "other";
  lastChecked: string;
  confidence: "high" | "medium" | "needs verification";
  notes: string;
};

export type RogueCommandArticleMeta = {
  slug: string;
  title: string;
  category: string;
  patchVersion: string;
  lastVerified: string;
  confidence: "official" | "wiki" | "mixed" | "needs verification";
  patchSensitivity: "low" | "medium" | "high";
  summary: string;
  relatedSlugs: string[];
  sourceIds: string[];
};

export type RogueCommandArticleBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      ordered: boolean;
      items: string[];
    };

export type RogueCommandArticle = RogueCommandArticleMeta & {
  fileName: string;
  readingTimeMinutes: number;
  summary: string;
  blocks: RogueCommandArticleBlock[];
  sources: RogueCommandSource[];
};
