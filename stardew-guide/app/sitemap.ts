import type { MetadataRoute } from "next";
import { getAllRogueCommandArticles } from "@/lib/rogue-command/data";
import { getAllCrops, getAllFish, getAllForage, getAllFruitTrees, getAllMinerals, getAllMoneyGuides, getAllVillagers } from "@/lib/stardew/data";

const siteUrl = "https://playercodex.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/database",
    "/rogue-command",
    "/stardew",
    "/stardew/database",
    "/stardew/villagers",
    "/stardew/crops",
    "/stardew/fruit-trees",
    "/stardew/forage",
    "/stardew/minerals",
    "/stardew/fish",
    "/stardew/community-center",
    "/stardew/money",
    "/about",
    "/privacy"
  ];
  const villagerRoutes = getAllVillagers().map((villager) => `/stardew/villagers/${villager.slug}`);
  const cropRoutes = getAllCrops().map((crop) => `/stardew/crops/${crop.slug}`);
  const fruitTreeRoutes = getAllFruitTrees().map((tree) => `/stardew/fruit-trees/${tree.slug}`);
  const forageRoutes = getAllForage().map((item) => `/stardew/forage/${item.slug}`);
  const mineralRoutes = getAllMinerals().map((item) => `/stardew/minerals/${item.slug}`);
  const fishRoutes = getAllFish().map((fish) => `/stardew/fish/${fish.slug}`);
  const moneyRoutes = getAllMoneyGuides().map((guide) => `/stardew/money/${guide.slug}`);
  const rogueCommandRoutes = getAllRogueCommandArticles().map((article) => `/rogue-command/${article.slug}`);

  return [...staticRoutes, ...rogueCommandRoutes, ...villagerRoutes, ...cropRoutes, ...fruitTreeRoutes, ...forageRoutes, ...mineralRoutes, ...fishRoutes, ...moneyRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
