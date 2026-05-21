import type { Metadata } from "next";
import { FishDirectory } from "@/components/FishDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllFish } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Fish Calendar | Stardew Guide | Player Codex",
  description: "Find Stardew Valley fish by season, weather, location, and time."
};

export default function FishPage() {
  const fish = getAllFish();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "fishing-early-game-cash",
    "rainy-day-planning",
    "first-winter-preparation",
    "beginner-energy-management"
  ]);

  return (
    <PageShell eyebrow="Fish Calendar" title="Fish">
      <div className="space-y-5">
        <FishDirectory fish={fish} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for fishing, rain, and early cash" />
      </div>
    </PageShell>
  );
}
