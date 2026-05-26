import type { Metadata } from "next";
import { AnimalDirectory } from "@/components/AnimalDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
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
    <PageShell
      eyebrow="Animals Database"
      title="Animals"
      kicker="Compare coop and barn animals, then follow the product and processing routes that matter for bundles, money, and farm planning."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Chicken product route",
              description: "Start with the simplest coop animal path: Chicken care, Egg collection, Mayonnaise processing, and the first barn-or-coop planning guide.",
              links: [
                { href: "/stardew/animals/chicken", label: "Chicken" },
                { href: "/stardew/animal-products/egg", label: "Egg" },
                { href: "/stardew/artisan-goods/mayonnaise", label: "Mayonnaise" },
                { href: "/stardew/guides/animals-first-barn-or-coop", label: "Animal guide" }
              ]
            },
            {
              title: "Pig income route",
              description: "Use this route when evaluating Deluxe Barn timing, Truffle collection, Truffle Oil processing, and the money-guide tradeoff.",
              links: [
                { href: "/stardew/animals/pig", label: "Pig" },
                { href: "/stardew/animal-products/truffle", label: "Truffle" },
                { href: "/stardew/artisan-goods/truffle-oil", label: "Truffle Oil" },
                { href: "/stardew/money/pig-truffle-oil-economy", label: "Money guide" }
              ]
            }
          ]}
          title="High-value animal routes"
        />
        <AnimalDirectory animals={animals} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for animal buildings and bundle planning" />
      </div>
    </PageShell>
  );
}
