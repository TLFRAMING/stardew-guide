import type { Metadata } from "next";
import { CommunityCenterTracker } from "@/components/CommunityCenterTracker";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
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
    <PageShell eyebrow="Community Center" title="Community Center Tracker">
      <div className="space-y-5">
        <CommunityCenterTracker bundles={bundles} />
        <RelatedStardewGuides articles={relatedGuides} title="Guides for seasonal planning and bundle pressure" />
      </div>
    </PageShell>
  );
}
