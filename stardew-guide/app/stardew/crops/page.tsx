import type { Metadata } from "next";
import { CropDirectory } from "@/components/CropDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
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
    <PageShell
      eyebrow="Crops Database"
      title="Crops"
      kicker="Compare crop timing, seed access, regrowth, bundle pressure, and the guides that explain how each crop fits a season plan."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "High-interest crop pages",
              description: "Open crops currently getting search impressions, then connect them to season and bundle planning guides.",
              links: [
                { href: "/stardew/crops/cranberries", label: "Cranberries" },
                { href: "/stardew/crops/red-cabbage", label: "Red Cabbage" },
                { href: "/stardew/crops/wheat", label: "Wheat" },
                { href: "/stardew/community-center", label: "Community Center" }
              ]
            },
            {
              title: "Crop planning guides",
              description: "Use these guides when deciding whether a crop needs scarecrow coverage, sprinkler scaling, or late-season planning.",
              links: [
                { href: "/stardew/guides/first-scarecrow-crop-protection", label: "Scarecrow guide" },
                { href: "/stardew/guides/sprinklers-and-farm-scaling", label: "Sprinklers guide" },
                { href: "/stardew/guides/year-one-fall-preparation", label: "Fall prep" }
              ]
            }
          ]}
          title="Crop routes to check first"
        />
        <CropDirectory crops={crops} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for crop planning and farm scaling" />
      </div>
    </PageShell>
  );
}
