import type { MetadataRoute } from "next";
import { getAllNovaRomaGuideSlugs } from "@/lib/nova-roma/data";
import { getAllRogueCommandArticles } from "@/lib/rogue-command/data";
import { getAllAnimalProducts, getAllAnimals, getAllArtisanGoods, getAllCrops, getAllFish, getAllForage, getAllFruitTrees, getAllMinerals, getAllMoneyGuides, getAllVillagers } from "@/lib/stardew/data";
import { getAllStardewGuideArticles } from "@/lib/stardew/guides";

const siteUrl = "https://playercodex.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/database",
    "/nova-roma",
    "/nova-roma/guides",
    "/rogue-command",
    "/stardew",
    "/stardew/database",
    "/stardew/villagers",
    "/stardew/crops",
    "/stardew/fruit-trees",
    "/stardew/animals",
    "/stardew/animal-products",
    "/stardew/artisan-goods",
    "/stardew/forage",
    "/stardew/minerals",
    "/stardew/fish",
    "/stardew/community-center",
    "/stardew/money",
    "/stardew/guides",
    "/editorial-policy",
    "/about",
    "/privacy"
  ];
  const villagerRoutes = getAllVillagers().map((villager) => `/stardew/villagers/${villager.slug}`);
  const cropRoutes = getAllCrops().map((crop) => `/stardew/crops/${crop.slug}`);
  const fruitTreeRoutes = getAllFruitTrees().map((tree) => `/stardew/fruit-trees/${tree.slug}`);
  const animalRoutes = getAllAnimals().map((animal) => `/stardew/animals/${animal.slug}`);
  const animalProductRoutes = getAllAnimalProducts().map((product) => `/stardew/animal-products/${product.slug}`);
  const artisanGoodRoutes = getAllArtisanGoods().map((good) => `/stardew/artisan-goods/${good.slug}`);
  const forageRoutes = getAllForage().map((item) => `/stardew/forage/${item.slug}`);
  const mineralRoutes = getAllMinerals().map((item) => `/stardew/minerals/${item.slug}`);
  const fishRoutes = getAllFish().map((fish) => `/stardew/fish/${fish.slug}`);
  const moneyRoutes = getAllMoneyGuides().map((guide) => `/stardew/money/${guide.slug}`);
  const novaRomaGuideRoutes = getAllNovaRomaGuideSlugs().map((slug) => `/nova-roma/guides/${slug}`);
  const rogueCommandRoutes = getAllRogueCommandArticles().map((article) => `/rogue-command/${article.slug}`);
  const stardewGuideRoutes = getAllStardewGuideArticles().map((article) => `/stardew/guides/${article.slug}`);

  return [...staticRoutes, ...novaRomaGuideRoutes, ...rogueCommandRoutes, ...villagerRoutes, ...cropRoutes, ...fruitTreeRoutes, ...animalRoutes, ...animalProductRoutes, ...artisanGoodRoutes, ...forageRoutes, ...mineralRoutes, ...fishRoutes, ...moneyRoutes, ...stardewGuideRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
