import type { MetadataRoute } from "next";
import { getAllCrops, getAllFish, getAllMoneyGuides, getAllVillagers } from "@/lib/stardew/data";

const siteUrl = "https://playercodex.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/villagers", "/crops", "/fish", "/community-center", "/money", "/about", "/privacy"];
  const villagerRoutes = getAllVillagers().map((villager) => `/villagers/${villager.slug}`);
  const cropRoutes = getAllCrops().map((crop) => `/crops/${crop.slug}`);
  const fishRoutes = getAllFish().map((fish) => `/fish/${fish.slug}`);
  const moneyRoutes = getAllMoneyGuides().map((guide) => `/money/${guide.slug}`);

  return [...staticRoutes, ...villagerRoutes, ...cropRoutes, ...fishRoutes, ...moneyRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
