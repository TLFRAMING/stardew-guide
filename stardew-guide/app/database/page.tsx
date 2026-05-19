import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Game Databases | Player Codex",
  description: "Browse live and planned Player Codex game databases."
};

const games = [
  {
    name: "Stardew Guide",
    href: "/stardew/database",
    status: "Live",
    description: "Villagers, crops, fish, forage, fruit trees, minerals, bundles, and money guides.",
    entries: ["Villagers", "Crops", "Fish", "Fruit Trees", "Forage", "Minerals", "Community Center", "Money Guides"]
  },
  {
    name: "Rogue Command",
    href: "/rogue-command",
    status: "Planned",
    description: "Builds, strategy notes, and reference data are being staged before launch.",
    entries: ["Guides", "Builds", "Sources"]
  }
];

export default function DatabasePage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="A cross-game index for live databases and planned codex modules." title="Game Databases">
      <section className="space-y-4">
        {games.map((game) => (
          <article className="rounded-md border border-green-950/10 bg-white/80 px-4 py-4 sm:px-5" key={game.name}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-black text-green-950">{game.name}</h2>
                  <span className={game.status === "Live" ? "rounded-sm bg-meadow/12 px-2 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-meadow" : "rounded-sm bg-green-950/[0.06] px-2 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-green-950/50"}>
                    {game.status}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{game.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {game.entries.map((entry) => (
                    <span className="rounded-sm bg-green-950/[0.05] px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-green-950/52" key={entry}>
                      {entry}
                    </span>
                  ))}
                </div>
              </div>
              <Link className="w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href={game.href}>
                {game.status === "Live" ? "Open" : "Preview"}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}