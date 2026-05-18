import type { Metadata } from "next";
import { ForageDirectory } from "@/components/ForageDirectory";
import { PageShell } from "@/components/PageShell";
import { getAllForage } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Forage | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley forage items by season, location, sell price, and Community Center bundle use."
};

export default function ForagePage() {
  const forage = getAllForage();

  return (
    <PageShell eyebrow="Forage" title="Forage">
      <ForageDirectory forage={forage} />
    </PageShell>
  );
}
