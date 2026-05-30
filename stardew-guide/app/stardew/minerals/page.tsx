import type { Metadata } from "next";
import { MineralDirectory } from "@/components/MineralDirectory";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllMinerals } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Stardew Valley Minerals Guide: Museum Donations, Locations, and Uses",
  description: "Browse Stardew Valley minerals by location, sell price, museum donation status, fish pond use, and early-game save-or-sell decisions."
};

export default function MineralsPage() {
  const minerals = getAllMinerals();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "mining-first-month",
    "rainy-day-planning",
    "tool-upgrade-timing",
    "first-winter-preparation"
  ]);

  return (
    <PageShell
      eyebrow="Minerals Database"
      title="Stardew Valley Minerals"
      kicker="Use mineral pages to decide what to donate first, what to keep for later uses, and what can be sold after the museum copy is safe."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Minerals players often search first",
              description: "Open high-interest mineral pages before selling uncertain geode rewards or museum candidates.",
              links: [
                { href: "/stardew/minerals/basalt", label: "Basalt" },
                { href: "/stardew/minerals/diamond", label: "Diamond" },
                { href: "/stardew/minerals/earth-crystal", label: "Earth Crystal" },
                { href: "/stardew/minerals/frozen-tear", label: "Frozen Tear" }
              ]
            },
            {
              title: "Museum and mining guides",
              description: "Use these guides when deciding whether a mineral should be donated, saved, gifted, or sold.",
              links: [
                { href: "/stardew/guides/first-museum-donations", label: "Museum donations" },
                { href: "/stardew/guides/mining-first-month", label: "Mining first month" },
                { href: "/stardew/guides/tool-upgrade-timing", label: "Tool upgrades" },
                { href: "/stardew/database", label: "Stardew Database" }
              ]
            }
          ]}
          title="Mineral routes to check first"
        />
        <MineralDirectory minerals={minerals} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for mining, tools, and ore planning" />
      </div>
    </PageShell>
  );
}
