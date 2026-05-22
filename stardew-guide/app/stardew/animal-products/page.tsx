import type { Metadata } from "next";
import { AnimalProductDirectory } from "@/components/AnimalProductDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllAnimalProducts } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Animal Products Database | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley animal products by source animal, building, sell price, processing use, and bundle relevance."
};

export default function AnimalProductsPage() {
  const products = getAllAnimalProducts();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "animals-first-barn-or-coop",
    "community-center-priority-route",
    "preserve-jars-vs-kegs"
  ]);

  return (
    <PageShell eyebrow="Animal Products Database" title="Animal Products">
      <div className="space-y-5">
        <AnimalProductDirectory products={products} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for animal products, bundles, and processing" />
      </div>
    </PageShell>
  );
}
