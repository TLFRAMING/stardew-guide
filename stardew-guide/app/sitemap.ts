import type { MetadataRoute } from "next";
import { getAllCrops, getAllFish, getAllForage, getAllFruitTrees, getAllMoneyGuides, getAllVillagers } from "@/lib/stardew/data";

const siteUrl = "https://playercodex.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/database", "/villagers", "/crops", "/fruit-trees", "/forage", "/fish", "/community-center", "/money", "/about", "/privacy"];
  const villagerRoutes = getAllVillagers().map((villager) => `/villagers/${villager.slug}`);
  const cropRoutes = getAllCrops().map((crop) => `/crops/${crop.slug}`);
  const fruitTreeRoutes = getAllFruitTrees().map((tree) => `/fruit-trees/${tree.slug}`);
  const forageRoutes = getAllForage().map((item) => `/forage/${item.slug}`);
  const fishRoutes = getAllFish().map((fish) => `/fish/${fish.slug}`);
  const moneyRoutes = getAllMoneyGuides().map((guide) => `/money/${guide.slug}`);

  return [...staticRoutes, ...villagerRoutes, ...cropRoutes, ...fruitTreeRoutes, ...forageRoutes, ...fishRoutes, ...moneyRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
