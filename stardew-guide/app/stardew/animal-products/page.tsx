import type { Metadata } from "next";
import { AnimalProductDirectory } from "@/components/AnimalProductDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
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
    <PageShell
      eyebrow="Animal Products Database"
      title="Animal Products"
      kicker="Trace each product back to its animal source and forward to its machine output before deciding what to sell, save, or process."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Egg to Mayonnaise",
              description: "Check the basic coop product chain from Chicken unlocks to Egg value and Mayonnaise Machine output.",
              links: [
                { href: "/stardew/animal-products/egg", label: "Egg" },
                { href: "/stardew/animals/chicken", label: "Chicken" },
                { href: "/stardew/artisan-goods/mayonnaise", label: "Mayonnaise" },
                { href: "/stardew/guides/animals-first-barn-or-coop", label: "Animal guide" }
              ]
            },
            {
              title: "Truffle to Truffle Oil",
              description: "Follow the late-barn product chain from Pig ownership to raw Truffles, Oil Maker processing, and the money route.",
              links: [
                { href: "/stardew/animal-products/truffle", label: "Truffle" },
                { href: "/stardew/animals/pig", label: "Pig" },
                { href: "/stardew/artisan-goods/truffle-oil", label: "Truffle Oil" },
                { href: "/stardew/money/pig-truffle-oil-economy", label: "Money guide" }
              ]
            }
          ]}
          title="Product chains to open next"
        />
        <AnimalProductDirectory products={products} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for animal products, bundles, and processing" />
      </div>
    </PageShell>
  );
}
