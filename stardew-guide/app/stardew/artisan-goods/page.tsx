import type { Metadata } from "next";
import { ArtisanGoodDirectory } from "@/components/ArtisanGoodDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllArtisanGoods } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Artisan Goods Database | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley animal artisan goods by machine, input item, processing time, output value, and beginner use."
};

export default function ArtisanGoodsPage() {
  const goods = getAllArtisanGoods();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "animals-first-barn-or-coop",
    "sprinklers-and-farm-scaling",
    "year-one-fall-preparation"
  ]);

  return (
    <PageShell
      eyebrow="Artisan Goods Database"
      title="Artisan Goods"
      kicker="Use this database to connect machines, animal inputs, processed outputs, and the beginner guides that explain when processing is worth the routine."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Mayonnaise chain",
              description: "A compact coop route for checking Chicken products, Egg inputs, and Mayonnaise Machine value in one path.",
              links: [
                { href: "/stardew/artisan-goods/mayonnaise", label: "Mayonnaise" },
                { href: "/stardew/animal-products/egg", label: "Egg" },
                { href: "/stardew/animals/chicken", label: "Chicken" },
                { href: "/stardew/guides/animals-first-barn-or-coop", label: "Animal guide" }
              ]
            },
            {
              title: "Truffle Oil chain",
              description: "A late-barn route for comparing Pig setup cost, Truffle collection, Oil Maker processing, and money-guide tradeoffs.",
              links: [
                { href: "/stardew/artisan-goods/truffle-oil", label: "Truffle Oil" },
                { href: "/stardew/animal-products/truffle", label: "Truffle" },
                { href: "/stardew/animals/pig", label: "Pig" },
                { href: "/stardew/money/pig-truffle-oil-economy", label: "Money guide" }
              ]
            }
          ]}
          title="Processing chains to compare"
        />
        <ArtisanGoodDirectory goods={goods} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for processing, farm scaling, and animal planning" />
      </div>
    </PageShell>
  );
}
