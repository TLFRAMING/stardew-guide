import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewReferenceDirectory } from "@/components/StardewReferenceDirectory";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllArtifacts } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const metadata: Metadata = {
  title: "Stardew Valley Artifacts Guide: Museum Donations and Duplicate Uses",
  description: "Browse Stardew Valley artifacts by museum status, sell price, tailoring, Bone Mill use, and first-copy donation planning."
};

export default function ArtifactsPage() {
  const artifacts = getAllArtifacts();
  const relatedGuides = getStardewGuideArticlesBySlugs(["first-museum-donations", "mining-first-month", "first-winter-preparation"]);

  return (
    <PageShell eyebrow="Artifacts Database" title="Stardew Valley Artifacts" kicker="Use artifact pages to decide what to donate first, what duplicates can do, and when an item should be saved instead of sold.">
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Artifact planning",
              description: "Start here when a found item may be a museum donation or a duplicate with later uses.",
              links: [
                { href: "/stardew/guides/first-museum-donations", label: "Museum donations" },
                { href: "/stardew/minerals", label: "Minerals" },
                { href: "/stardew/database", label: "Stardew Database" }
              ]
            }
          ]}
          title="Artifact routes to check first"
        />
        <StardewReferenceDirectory
          basePath="/stardew/artifacts"
          countLabel="Artifact Index"
          items={artifacts.map((item) => ({
            slug: item.slug,
            name: item.name,
            badge: item.museumDonation ? "Museum" : "Artifact",
            facts: [
              { label: "Sell price", value: formatGold(item.sellPrice) },
              { label: "Save priority", value: item.savePriority },
              { label: "Tailoring", value: item.tailoring ? "Yes" : "No" }
            ],
            note: item.beginnerNote
          }))}
          searchPlaceholder="Dwarf Scroll, Ancient Seed..."
          title="Browse artifacts"
        />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for museum and artifact decisions" />
      </div>
    </PageShell>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}
