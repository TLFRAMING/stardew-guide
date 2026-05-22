import type { Metadata } from "next";
import { AnimalDirectory } from "@/components/AnimalDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllAnimals } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Animals Database | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley coop and barn animals by building, unlock path, products, and beginner care notes."
};

export default function AnimalsPage() {
  const animals = getAllAnimals();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "animals-first-barn-or-coop",
    "community-center-priority-route",
    "first-winter-preparation"
  ]);

  return (
    <PageShell eyebrow="Animals Database" title="Animals">
      <div className="space-y-5">
        <AnimalDirectory animals={animals} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for animal buildings and bundle planning" />
      </div>
    </PageShell>
  );
}
