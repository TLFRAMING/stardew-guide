import type { Metadata } from "next";
import { CommunityCenterTracker } from "@/components/CommunityCenterTracker";
import { PageShell } from "@/components/PageShell";
import { getAllBundles } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Community Center Tracker | Stardew Guide | Player Codex",
  description: "Track Stardew Valley Community Center bundle items with local browser progress."
};

export default function CommunityCenterPage() {
  const bundles = getAllBundles();

  return (
    <PageShell eyebrow="Community Center" title="Community Center Tracker">
      <CommunityCenterTracker bundles={bundles} />
    </PageShell>
  );
}
