import type { Metadata } from "next";
import { FishDirectory } from "@/components/FishDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllFish } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Fish Calendar | Stardew Guide | Player Codex",
  description: "Find Stardew Valley fish by season, weather, location, and time."
};

export default function FishPage() {
  const fish = getAllFish();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "fishing-early-game-cash",
    "rainy-day-planning",
    "first-winter-preparation",
    "beginner-energy-management"
  ]);

  return (
    <PageShell
      eyebrow="Fish Calendar"
      title="Fish"
      kicker="Use fish pages with season, weather, time, and bundle planning guides so each catch has a clear next step."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Common search fish",
              description: "Open high-interest fish pages that players often search for when checking time windows, locations, and bundle relevance.",
              links: [
                { href: "/stardew/fish/bream", label: "Bream" },
                { href: "/stardew/fish/halibut", label: "Halibut" },
                { href: "/stardew/fish/tiger-trout", label: "Tiger Trout" },
                { href: "/stardew/fish/bullhead", label: "Bullhead" }
              ]
            },
            {
              title: "Weather and bundle planning",
              description: "Use these pages when a fish depends on rain, a season deadline, or Community Center tracking.",
              links: [
                { href: "/stardew/fish/shad", label: "Shad" },
                { href: "/stardew/fish/sardine", label: "Sardine" },
                { href: "/stardew/guides/fishing-season-weather-planning", label: "Fishing guide" },
                { href: "/stardew/community-center", label: "Community Center" }
              ]
            }
          ]}
          title="Fish routes to check first"
        />
        <FishDirectory fish={fish} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for fishing, rain, and early cash" />
      </div>
    </PageShell>
  );
}
