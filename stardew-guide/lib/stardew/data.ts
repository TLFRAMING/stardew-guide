import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Animal, AnimalProduct, Artifact, ArtisanGood, Bundle, BundleItem, CookingRecipe, CraftingRecipe, Crop, Fish, ForageItem, FruitTree, Mineral, MoneyGuide, Season, Villager } from "./types";

type BundleJson = Omit<Bundle, "items" | "name" | "slug"> & {
  slug?: string;
  name?: string;
  bundleName?: string;
  items?: BundleItem[] | string[];
};

const dataDirectory = getDataDirectory();

function getDataDirectory() {
  return path.resolve(process.cwd(), "data", "stardew");
}

function readJsonFile<T>(fileName: string, fallback: T): T {
  const filePath = path.join(dataDirectory, fileName);

  if (!existsSync(filePath)) {
    return fallback;
  }

  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function readJsonArray<T>(fileName: string): T[] {
  const data = readJsonFile<unknown>(fileName, []);

  if (!Array.isArray(data)) {
    return [];
  }

  return data as T[];
}

export function getAllVillagers(): Villager[] {
  return readJsonArray<Villager>("villagers.json").map(normalizeVillager);
}

export function getVillagerBySlug(slug: string): Villager | undefined {
  return getAllVillagers().find((villager) => villager.slug === slug);
}

export function getAllCrops(): Crop[] {
  return readJsonArray<Crop>("crops.json").map(normalizeCrop);
}

export function getCropBySlug(slug: string): Crop | undefined {
  return getAllCrops().find((crop) => crop.slug === slug);
}

export function getAllFish(): Fish[] {
  return readJsonArray<Fish>("fish.json");
}

export function getFishBySlug(slug: string): Fish | undefined {
  return getAllFish().find((fish) => fish.slug === slug);
}

export function getAllFruitTrees(): FruitTree[] {
  return readJsonArray<FruitTree>("fruit-trees.json");
}

export function getFruitTreeBySlug(slug: string): FruitTree | undefined {
  return getAllFruitTrees().find((tree) => tree.slug === slug);
}

export function getAllForage(): ForageItem[] {
  return readJsonArray<ForageItem>("forage.json");
}

export function getForageBySlug(slug: string): ForageItem | undefined {
  return getAllForage().find((item) => item.slug === slug);
}

export function getAllMinerals(): Mineral[] {
  return readJsonArray<Mineral>("minerals.json");
}

export function getMineralBySlug(slug: string): Mineral | undefined {
  return getAllMinerals().find((item) => item.slug === slug);
}

export function getAllArtifacts(): Artifact[] {
  return readJsonArray<Artifact>("artifacts.json");
}

export function getArtifactBySlug(slug: string): Artifact | undefined {
  return getAllArtifacts().find((item) => item.slug === slug);
}

export function getAllCookingRecipes(): CookingRecipe[] {
  return readJsonArray<CookingRecipe>("cooking-recipes.json");
}

export function getCookingRecipeBySlug(slug: string): CookingRecipe | undefined {
  return getAllCookingRecipes().find((recipe) => recipe.slug === slug);
}

export function getAllCraftingRecipes(): CraftingRecipe[] {
  return readJsonArray<CraftingRecipe>("crafting-recipes.json");
}

export function getCraftingRecipeBySlug(slug: string): CraftingRecipe | undefined {
  return getAllCraftingRecipes().find((recipe) => recipe.slug === slug);
}

export function getAllAnimals(): Animal[] {
  return readJsonArray<Animal>("animals.json");
}

export function getAnimalBySlug(slug: string): Animal | undefined {
  return getAllAnimals().find((animal) => animal.slug === slug);
}

export function getAllAnimalProducts(): AnimalProduct[] {
  return readJsonArray<AnimalProduct>("animal-products.json");
}

export function getAnimalProductBySlug(slug: string): AnimalProduct | undefined {
  return getAllAnimalProducts().find((product) => product.slug === slug);
}

export function getAllArtisanGoods(): ArtisanGood[] {
  return readJsonArray<ArtisanGood>("artisan-goods.json");
}

export function getArtisanGoodBySlug(slug: string): ArtisanGood | undefined {
  return getAllArtisanGoods().find((good) => good.slug === slug);
}

export function getArtisanGoodsForInput(itemName: string): ArtisanGood[] {
  return getAllArtisanGoods().filter((good) => good.inputs.some((input) => input.itemName === itemName));
}

export function getAllBundles(): Bundle[] {
  return readJsonArray<BundleJson>("bundles.json").map(normalizeBundle);
}

export function getAllMoneyGuides(): MoneyGuide[] {
  return readJsonArray<MoneyGuide>("money-guides.json");
}

export function getMoneyGuideBySlug(slug: string): MoneyGuide | undefined {
  return getAllMoneyGuides().find((guide) => guide.slug === slug);
}

function normalizeVillager(villager: Villager): Villager {
  return {
    ...villager,
    beginnerNote: villager.beginnerNote ?? villager.beginnerTip ?? villager.description ?? "needs verification"
  };
}

function normalizeCrop(crop: Crop): Crop {
  const rawSeasons = crop.seasons ?? crop.season ?? [];
  const regrowthDays = crop.regrowthDays ?? crop.regrowDays ?? "needs verification";
  const seasons = rawSeasons.map((season) => (season === "All" ? "Special" : season)) as Season[];

  return {
    ...crop,
    seasons,
    regrowthDays,
    beginnerNote: crop.beginnerNote ?? crop.description ?? "needs verification"
  };
}

function normalizeBundle(bundle: BundleJson): Bundle {
  const name = bundle.name ?? bundle.bundleName ?? bundle.id ?? "needs verification";
  const slug = bundle.slug ?? bundle.id ?? slugify(name);

  return {
    ...bundle,
    name,
    slug,
    items: normalizeBundleItems(bundle.items ?? [], slug)
  };
}

function normalizeBundleItems(items: NonNullable<BundleJson["items"]>, bundleSlug: string): BundleItem[] {
  return items.map((item, index) => {
    if (typeof item !== "string") {
      return {
        ...item,
        id: item.id ?? `${bundleSlug}-${index + 1}`,
        notes: item.notes ?? "needs verification"
      };
    }

    return {
      id: `${bundleSlug}-${slugify(item)}`,
      name: item,
      quantity: 1,
      notes: "needs verification"
    };
  });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
