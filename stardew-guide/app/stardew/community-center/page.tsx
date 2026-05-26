import type { Metadata } from "next";
import { CommunityCenterTracker } from "@/components/CommunityCenterTracker";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllBundles } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Community Center Tracker | Stardew Guide | Player Codex",
  description: "Track Stardew Valley Community Center bundle items with local browser progress."
};

export default function CommunityCenterPage() {
  const bundles = getAllBundles();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "spring-year-one-first-week",
    "year-one-fall-preparation",
    "first-winter-preparation",
    "festival-planning-for-beginners"
  ]);

  return (
    <PageShell
      eyebrow="Community Center"
      title="Community Center Tracker"
      kicker="Track bundle pressure, then open the crop, fish, animal, and guide pages that explain why each item matters."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Bundle item lookups",
              description: "Use these pages for common bundle-related searches that need direct item context before a season passes.",
              links: [
                { href: "/stardew/crops/red-cabbage", label: "Red Cabbage" },
                { href: "/stardew/fish/tiger-trout", label: "Tiger Trout" },
                { href: "/stardew/fish/shad", label: "Shad" },
                { href: "/stardew/animal-products/large-egg", label: "Large Egg" }
              ]
            },
            {
              title: "Bundle planning guides",
              description: "Use these guides to decide what to save, what to plant, and when to check bundles during the year.",
              links: [
                { href: "/stardew/guides/community-center-priority-route", label: "Priority route" },
                { href: "/stardew/guides/year-one-fall-preparation", label: "Fall prep" },
                { href: "/stardew/guides/fishing-season-weather-planning", label: "Fish timing" },
                { href: "/stardew/guides/animals-first-barn-or-coop", label: "Animal products" }
              ]
            }
          ]}
          title="Community Center routes to check first"
        />
        <CommunityCenterTracker bundles={bundles} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for seasonal planning and bundle pressure" />
      </div>
    </PageShell>
  );
}
