export type VerificationValue = "needs verification";

export type Season = "Spring" | "Summer" | "Fall" | "Winter" | "Special" | "All" | VerificationValue;

export type StardewDataSource = {
  sourceUrls: string[];
  lastChecked: string;
};

export type Villager = StardewDataSource & {
  id?: string;
  slug: string;
  name: string;
  description?: string | VerificationValue;
  birthday: string;
  location?: string | VerificationValue;
  marriageCandidate?: boolean | VerificationValue;
  lovedGifts: string[];
  likedGifts: string[];
  dislikedGifts?: string[];
  hatedGifts?: string[];
  scheduleNotes?: string[] | string | VerificationValue;
  beginnerNote?: string;
  /** Migration compatibility: use beginnerNote for new data. */
  beginnerTip?: string;
};

export type Crop = StardewDataSource & {
  id?: string;
  slug: string;
  name: string;
  description?: string | VerificationValue;
  /** Migration compatibility: use seasons for new data. */
  season?: Season[];
  seasons: Season[];
  seedSource?: string | string[] | VerificationValue;
  seedPrice: number | VerificationValue;
  sellPrice: number | VerificationValue;
  growthDays: number | VerificationValue;
  /** Migration compatibility: some rows still use regrowDays. */
  regrowDays?: number | VerificationValue;
  regrowthDays: number | VerificationValue;
  profitNotes?: string | VerificationValue;
  bestUses?: string[] | string | VerificationValue;
  beginnerNote: string;
};

export type Fish = StardewDataSource & {
  id?: string;
  slug: string;
  name: string;
  description?: string | VerificationValue;
  seasons: Season[];
  locations: string[];
  time: string;
  weather: string[];
  difficulty: number | VerificationValue;
  sellPrice?: number | VerificationValue;
  bundleUsage?: string[] | string | VerificationValue;
  beginnerNote: string;
};

export type FruitTree = StardewDataSource & {
  id: string;
  slug: string;
  name: string;
  seasons: Season[];
  saplingPrice: number | VerificationValue;
  growthDays: number | VerificationValue;
  fruitName: string;
  fruitSellPrice: number | VerificationValue;
  beginnerNote: string;
};

export type ForageItem = StardewDataSource & {
  id: string;
  slug: string;
  name: string;
  seasons: Season[];
  locations: string[];
  sellPrice: number | VerificationValue;
  bundleUsage: string[];
  beginnerNote: string;
};

export type Mineral = StardewDataSource & {
  id: string;
  slug: string;
  name: string;
  locations: string[];
  sellPrice: number | VerificationValue;
  uses: string[];
  museumDonation: boolean;
  beginnerNote: string;
};

export type Animal = StardewDataSource & {
  id: string;
  slug: string;
  name: string;
  building: "Coop" | "Barn";
  unlock: string;
  purchaseSource: string;
  products: string[];
  careNotes: string[];
  beginnerNote: string;
};

export type AnimalProduct = StardewDataSource & {
  id: string;
  slug: string;
  name: string;
  producedBy: string[];
  sourceBuilding: "Coop" | "Barn" | "Mixed";
  sellPrice: number | VerificationValue;
  processingUses: string[];
  bundleUsage: string[];
  beginnerNote: string;
};

export type BundleItem = {
  id: string;
  name: string;
  quantity: number | VerificationValue;
  notes: string | VerificationValue;
};

export type Bundle = StardewDataSource & {
  id?: string;
  slug: string;
  name: string;
  /** Migration compatibility: use name for new data. */
  bundleName?: string;
  room: string;
  reward: string | VerificationValue;
  items: BundleItem[];
  beginnerNote?: string;
};

export type ProfitEstimate = {
  label: string;
  assumption: string;
  value: string;
  confidence: string | VerificationValue;
};

export type MoneyGuide = StardewDataSource & {
  slug: string;
  title: string;
  shortName: string;
  summary: string;
  bestStage: string;
  category: string;
  profitPotential: string;
  laborCost: string;
  automation: string;
  versionRisk: string;
  bestFor: string[];
  whyItWorks: string[];
  setupSteps: string[];
  profitEstimates: ProfitEstimate[];
  caveats: string[];
  articleAngles: string[];
  seoKeywords: string[];
  confidence: string | VerificationValue;
  notes: string;
};

export type StardewGuideArticleCategory = "beginner" | "progression" | "farming" | "mining" | "fishing" | "community-center" | "friendship" | "animals";

export type StardewGuideArticleConfidence = "high" | "medium" | VerificationValue;

export type StardewGuideArticlePatchSensitivity = "low" | "medium" | "high";

export type StardewGuideArticleBlock =
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

export type StardewGuideRelatedDataLink = {
  label: string;
  href: string;
};

export type StardewGuideArticleMeta = StardewDataSource & {
  slug: string;
  title: string;
  category: StardewGuideArticleCategory;
  summary: string;
  confidence: StardewGuideArticleConfidence;
  patchSensitivity: StardewGuideArticlePatchSensitivity;
  relatedDataLinks?: StardewGuideRelatedDataLink[];
};

export type StardewGuideArticle = StardewGuideArticleMeta & {
  fileName: string;
  readingTimeMinutes: number;
  blocks: StardewGuideArticleBlock[];
};
