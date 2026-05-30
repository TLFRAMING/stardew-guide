import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Player Codex | Game Guides and Databases",
  description: "Browse practical fan-made game guides, databases, and tools across Player Codex."
};

const games = [
  {
    title: "Stardew Guide",
    href: "/stardew",
    status: "Live",
    description: "Villagers, crops, fish, forage, minerals, fruit trees, Community Center tracking, and money routes.",
    meta: "Stardew Valley"
  },
  {
    title: "Rogue Command",
    href: "/rogue-command",
    status: "Live",
    description: "Beginner guides, systems primers, Specialist notes, and long-term progression advice for safer RTS roguelite runs.",
    meta: "Rogue Command"
  },
  {
    title: "Nova Roma",
    href: "/nova-roma",
    status: "Live",
    description: "Early Access city-building guide coverage. Beginner planning, resource pressure, water, religion, and defense notes.",
    meta: "Nova Roma"
  },
  {
    title: "Songs of Conquest Mobile",
    href: "/songs-of-conquest-mobile",
    status: "Live",
    description: "Mobile-first strategy guides for first campaign decisions, faction learning paths, and tactical combat basics.",
    meta: "Songs Mobile"
  }
];

const liveTools = [
  { label: "Stardew / Database", href: "/stardew/database" },
  { label: "Stardew / Guides", href: "/stardew/guides" },
  { label: "Stardew / Villagers", href: "/stardew/villagers" },
  { label: "Stardew / Crops", href: "/stardew/crops" },
  { label: "Stardew / Fish", href: "/stardew/fish" },
  { label: "Stardew / Community Center", href: "/stardew/community-center" },
  { label: "Rogue Command / Guides", href: "/rogue-command" },
  { label: "Nova Roma / Guides", href: "/nova-roma/guides" },
  { label: "Songs Mobile / Guides", href: "/songs-of-conquest-mobile/guides" }
];

export default function HomePage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="A multi-game home for practical reference pages and player tools." title="Choose a codex">
      <div className="space-y-4">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3 text-sm font-semibold leading-6 text-green-950/70">
            <p>
              Player Codex publishes fan-made game guides that are meant to help players make practical decisions: what to check before spending resources, which systems need planning, and where a database fact should change the next in-game action.
            </p>
            <p>
              The site currently focuses on Stardew Valley, Rogue Command, Nova Roma, and Songs of Conquest Mobile. Established game data is paired with original guide notes, while newer game coverage focuses on practical beginner decisions before deeper systems pages.
            </p>
          </div>
        </section>

        <section className="tool-directory rounded-md p-3 sm:p-4">
          <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.18)] pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-green-950/50">Game Library</p>
              <h2 className="mt-1 text-lg font-black text-green-950">Active and planned guides</h2>
            </div>
            <p className="text-xs font-bold text-green-950/58">{games.length} codex entries</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {games.map((game) => (
              <Link
                className="codex-entry group block rounded-md border border-green-950/10 bg-white/82 transition hover:-translate-y-0.5 hover:border-green-950/20"
                href={game.href}
                key={game.title}
              >
                <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-green-950/58">{game.meta}</span>
                    <span className={game.status === "Live" ? "rounded-sm bg-meadow/12 px-2 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-meadow" : "rounded-sm bg-green-950/[0.06] px-2 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-green-950/50"}>
                      {game.status}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="break-words text-xl font-black leading-tight text-green-950">{game.title}</h2>
                    <p className="mt-2 break-words text-sm font-semibold leading-6 text-green-950/68">{game.description}</p>
                    <span className="mt-4 inline-flex w-fit rounded-sm border border-green-950/12 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950/72 transition group-hover:bg-green-950/[0.08] group-hover:text-green-950">
                      Open guide
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-4 sm:px-5">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-green-950/46">Live Tools</p>
              <h2 className="mt-1 text-lg font-black text-green-950">Quick access</h2>
            </div>
            <Link className="w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/database">
              Browse All Databases
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {liveTools.map((tool) => (
              <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href={tool.href} key={tool.href}>
                {tool.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-4 sm:px-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-green-950/46">Site Trust</p>
          <h2 className="mt-1 text-lg font-black text-green-950">How Player Codex keeps guides useful</h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-green-950/66">
            The site separates each game section, writes original player-facing guides, and avoids official artwork, copied guide structures, and unsupported route promises.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/editorial-policy">
              Editorial Policy
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/about">
              About
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/contact">
              Contact
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
