import type { Metadata } from "next";
import Link from "next/link";
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
    <PageShell eyebrow="Stardew Guide" kicker="Strategy data is source-reviewed. Some profit estimates remain under review." title="Money-Making Guides">
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-green-950/44">Related Stardew Guides</p>
              <h2 className="mt-1 text-lg font-black text-green-950">Need planning advice before profit routes?</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-green-950/64">
                Use the general guide hub for first-year decisions such as energy, rainy days, tool timing, sprinklers, mining, and seasonal preparation.
              </p>
            </div>
            <Link className="w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/stardew/guides">
              Open Guides
            </Link>
          </div>
        </section>
        <MoneyGuideDirectory guides={guides} />
      </div>
    </PageShell>
  );
}
