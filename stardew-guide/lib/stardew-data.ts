import cropsJson from "@/data/stardew/crops.json";
import fishJson from "@/data/stardew/fish.json";
import villagersJson from "@/data/stardew/villagers.json";

export type Season = "Spring" | "Summer" | "Fall" | "Winter" | "needs verification";

export type DataSource = {
  sourceUrls: string[];
  lastChecked: string;
};

export type Villager = DataSource & {
  slug: string;
  name: string;
  birthday: string;
  lovedGifts: string[];
  likedGifts: string[];
  beginnerNote: string;
};

export type Crop = DataSource & {
  slug: string;
  name: string;
  seasons: Season[];
  seedPrice: number | "needs verification";
  sellPrice: number | "needs verification";
  growthDays: number | "needs verification";
  regrowthDays: number | "needs verification";
  beginnerNote: string;
};

export type Fish = DataSource & {
  slug: string;
  name: string;
  seasons: Season[];
  locations: string[];
  time: string;
  weather: string[];
  difficulty: number | "needs verification";
  beginnerNote: string;
};

export const villagers = villagersJson as Villager[];
export const crops = cropsJson as Crop[];
export const fish = fishJson as Fish[];

export function getVillager(slug: string) {
  return villagers.find((villager) => villager.slug === slug);
}

export function getCrop(slug: string) {
  return crops.find((crop) => crop.slug === slug);
}

export function getFish(slug: string) {
  return fish.find((item) => item.slug === slug);
}
