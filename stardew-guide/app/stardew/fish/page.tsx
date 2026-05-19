import type { Metadata } from "next";
import { FishDirectory } from "@/components/FishDirectory";
import { PageShell } from "@/components/PageShell";
import { getAllFish } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Fish Calendar | Stardew Guide | Player Codex",
  description: "Find Stardew Valley fish by season, weather, location, and time."
};

export default function FishPage() {
  const fish = getAllFish();

  return (
    <PageShell eyebrow="Fish Calendar" title="Fish">
      <FishDirectory fish={fish} />
    </PageShell>
  );
}
