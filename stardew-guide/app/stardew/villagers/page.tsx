import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { VillagerDirectory } from "@/components/VillagerDirectory";
import { getAllVillagers } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Villager Gift Finder | Stardew Guide | Player Codex",
  description: "Search Stardew Valley villagers by name, gifts, and marriage candidate status."
};

export default function VillagersPage() {
  const villagers = getAllVillagers();

  return (
    <PageShell eyebrow="Villager Gift Finder" title="Villagers">
      <VillagerDirectory villagers={villagers} />
    </PageShell>
  );
}
