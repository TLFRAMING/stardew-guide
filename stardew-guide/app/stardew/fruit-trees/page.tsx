import type { Metadata } from "next";
import { FruitTreeDirectory } from "@/components/FruitTreeDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllFruitTrees } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Fruit Trees | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley fruit trees, sapling prices, growth time, seasons, and fruit values."
};

export default function FruitTreesPage() {
  const fruitTrees = getAllFruitTrees();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "year-one-fall-preparation",
    "first-winter-preparation",
    "sprinklers-and-farm-scaling",
    "backpack-upgrade-timing"
  ]);

  return (
    <PageShell eyebrow="Fruit Trees" title="Fruit Trees">
      <div className="space-y-5">
        <FruitTreeDirectory fruitTrees={fruitTrees} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for long-term farm planning" />
      </div>
    </PageShell>
  );
}
