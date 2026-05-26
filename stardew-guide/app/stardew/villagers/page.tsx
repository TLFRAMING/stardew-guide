import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { VillagerDirectory } from "@/components/VillagerDirectory";
import { getAllVillagers } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Villager Gift Finder | Stardew Guide | Player Codex",
  description: "Search Stardew Valley villagers by name, gifts, and marriage candidate status."
};

export default function VillagersPage() {
  const villagers = getAllVillagers();
  const relatedGuides = getStardewGuideArticlesBySlugs([
    "friendship-and-gifts-basics",
    "stardew-valley-festivals-overview",
    "festival-planning-for-beginners"
  ]);

  return (
    <PageShell
      eyebrow="Villager Gift Finder"
      title="Villagers"
      kicker="Open villager pages with gift, birthday, festival, and friendship guides so each search has a clear next step."
    >
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "High-interest villager gift pages",
              description: "Start with villagers currently getting search impressions, then use the gift guide before planning birthdays or weekly gifts.",
              links: [
                { href: "/stardew/villagers/wizard", label: "Wizard" },
                { href: "/stardew/villagers/evelyn", label: "Evelyn" },
                { href: "/stardew/villagers/george", label: "George" },
                { href: "/stardew/villagers/haley", label: "Haley" },
                { href: "/stardew/villagers/penny", label: "Penny" },
                { href: "/stardew/guides/friendship-and-gifts-basics", label: "Gift guide" }
              ]
            }
          ]}
          title="Gift routes to check first"
        />
        <VillagerDirectory villagers={villagers} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for gifts, birthdays, and festivals" />
      </div>
    </PageShell>
  );
}
