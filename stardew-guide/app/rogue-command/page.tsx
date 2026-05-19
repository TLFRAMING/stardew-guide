import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Rogue Command | Player Codex",
  description: "Rogue Command is a planned Player Codex guide. Builds, strategy notes, and reference data are being staged before launch."
};

export default function RogueCommandPage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="Planned codex: Rogue Command" title="Rogue Command">
      <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">Planned</span>
          <p className="text-sm font-semibold leading-6 text-green-950/70">
            Rogue Command is being prepared as a future Player Codex module. The current production site keeps this page as a stable placeholder while data, sources, and page structure are reviewed.
          </p>
          <p className="text-sm font-semibold leading-6 text-green-950/62">
            No gameplay claims are published here yet. When the module is ready, it will use the same source review and static export standards as Stardew Guide.
          </p>
          <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/">
            Back to Player Codex
          </Link>
        </div>
      </section>
    </PageShell>
  );
}