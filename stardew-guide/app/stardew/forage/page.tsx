import type { Metadata } from "next";
import { ForageDirectory } from "@/components/ForageDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllForage } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Stardew Valley Forage Guide: Seasons, Locations, Bundles, and Uses",
  description: "Find Stardew Valley forage items by season, location, sell price, Community Center bundle use, and beginner save-or-sell decisions."
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
    <PageShell
      eyebrow="Forage Database"
      title="Stardew Valley Forage"
      kicker="Check seasonal forage locations, bundle pressure, sell value, and whether an item should be saved before the season ends."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Forage pages players often need first",
              description: "Open common seasonal and bundle-related forage pages before selling every pickup or letting a season end.",
              links: [
                { href: "/stardew/forage/blackberry", label: "Blackberry" },
                { href: "/stardew/forage/common_mushroom", label: "Common Mushroom" },
                { href: "/stardew/forage/fiddlehead_fern", label: "Fiddlehead Fern" },
                { href: "/stardew/forage/magma_cap", label: "Magma Cap" }
              ]
            },
            {
              title: "Forage planning guides",
              description: "Use these guides when deciding what to save, what to sell, and how forage fits bundles and seasonal planning.",
              links: [
                { href: "/stardew/guides/early-foraging-habits", label: "Foraging habits" },
                { href: "/stardew/community-center", label: "Community Center" },
                { href: "/stardew/guides/year-one-fall-preparation", label: "Fall prep" },
                { href: "/stardew/database", label: "Stardew Database" }
              ]
            }
          ]}
          title="Forage routes to check first"
        />
        <ForageDirectory forage={forage} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for foraging and seasonal planning" />
      </div>
    </PageShell>
  );
}
