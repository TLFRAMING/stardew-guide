import type { Metadata } from "next";
import { CropDirectory } from "@/components/CropDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllCrops } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Crops Database | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley crops by name and season with growth, sell price, and use notes."
};

export default function CropsPage() {
  const crops = getAllCrops();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "first-sprinkler-transition",
    "sprinklers-and-farm-scaling",
    "spring-year-one-first-week",
    "year-one-fall-preparation"
  ]);

  return (
    <PageShell eyebrow="Crops Database" title="Crops">
      <div className="space-y-5">
        <CropDirectory crops={crops} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for crop planning and farm scaling" />
      </div>
    </PageShell>
  );
}
