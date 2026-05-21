import type { Metadata } from "next";
import { ForageDirectory } from "@/components/ForageDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllForage } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Forage | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley forage items by season, location, sell price, and Community Center bundle use."
};

export default function ForagePage() {
  const forage = getAllForage();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "early-foraging-habits",
    "spring-year-one-first-week",
    "first-winter-preparation",
    "year-one-fall-preparation"
  ]);

  return (
    <PageShell eyebrow="Forage" title="Forage">
      <div className="space-y-5">
        <ForageDirectory forage={forage} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for foraging and seasonal planning" />
      </div>
    </PageShell>
  );
}
