export type VerificationValue = "needs verification";

export type Season = "Spring" | "Summer" | "Fall" | "Winter" | "Special" | VerificationValue;

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
