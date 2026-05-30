export type SongsOfConquestMobileSource = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  sourceType: "store" | "announcement" | "official-site" | "wiki" | "database" | "other";
  lastChecked: string;
  confidence: "high" | "medium" | "needs verification";
  notes: string;
};

export type SongsOfConquestMobileGuideRelatedDataLink = {
  label: string;
  href: string;
};

export type SongsOfConquestMobileGuideArticleBlock =
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

export type SongsOfConquestMobileGuideArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  lastChecked: string;
  confidence: "high" | "medium" | "needs verification";
  patchSensitivity: "low" | "medium" | "high";
  sourceUrls: string[];
  relatedDataLinks?: SongsOfConquestMobileGuideRelatedDataLink[];
  content: string;
  fileName: string;
  readingTimeMinutes: number;
  blocks: SongsOfConquestMobileGuideArticleBlock[];
};
