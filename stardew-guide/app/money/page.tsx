import type { Metadata } from "next";
import { MoneyGuideDirectory } from "@/components/MoneyGuideDirectory";
import { PageShell } from "@/components/PageShell";
import { getAllMoneyGuides } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Money-Making Guides | Stardew Guide | Player Codex",
  description: "Compare Stardew Valley money-making routes by stage, labor, automation, risk, and profit potential."
};

export default function MoneyGuidesPage() {
  const guides = getAllMoneyGuides();

  return (
    <PageShell eyebrow="Stardew Guide" kicker="Draft strategy data. Profit estimates are under review." title="Money-Making Guides">
      <MoneyGuideDirectory guides={guides} />
    </PageShell>
  );
}
