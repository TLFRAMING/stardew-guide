import type { Metadata } from "next";
import { FruitTreeDirectory } from "@/components/FruitTreeDirectory";
import { PageShell } from "@/components/PageShell";
import { getAllFruitTrees } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Fruit Trees | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley fruit trees, sapling prices, growth time, seasons, and fruit values."
};

export default function FruitTreesPage() {
  const fruitTrees = getAllFruitTrees();

  return (
    <PageShell eyebrow="Fruit Trees" title="Fruit Trees">
      <FruitTreeDirectory fruitTrees={fruitTrees} />
    </PageShell>
  );
}
