import type { Metadata } from "next";
import { MineralDirectory } from "@/components/MineralDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllMinerals } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Minerals | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley minerals by location, sell price, uses, and museum donation status."
};

export default function MineralsPage() {
  const minerals = getAllMinerals();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "mining-first-month",
    "rainy-day-planning",
    "tool-upgrade-timing",
    "first-winter-preparation"
  ]);

  return (
    <PageShell eyebrow="Minerals" title="Minerals">
      <div className="space-y-5">
        <MineralDirectory minerals={minerals} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for mining, tools, and ore planning" />
      </div>
    </PageShell>
  );
}
