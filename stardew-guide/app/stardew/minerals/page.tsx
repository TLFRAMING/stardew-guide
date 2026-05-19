import type { Metadata } from "next";
import { MineralDirectory } from "@/components/MineralDirectory";
import { PageShell } from "@/components/PageShell";
import { getAllMinerals } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Minerals | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley minerals by location, sell price, uses, and museum donation status."
};

export default function MineralsPage() {
  const minerals = getAllMinerals();

  return (
    <PageShell eyebrow="Minerals" title="Minerals">
      <MineralDirectory minerals={minerals} />
    </PageShell>
  );
}
