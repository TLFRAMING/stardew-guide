import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About | Player Codex",
  description: "Learn about Player Codex, a fan-made multi-game guide index for practical guides, databases, and source-aware player tools."
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Player Codex"
      kicker="Fan-made guides, databases, and practical player notes across multiple games."
      title="About Player Codex"
    >
      <div className="space-y-4">
        <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
          <div className="max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
            <p>
              Player Codex is a fan-made multi-game guide site built for players who want clear reference pages,
              practical beginner guidance, and source-aware notes without digging through scattered tabs.
            </p>
            <p>
              The site currently covers Stardew Valley, Rogue Command, and Nova Roma. Each game area is kept separate
              so databases, guides, and patch-sensitive strategy notes can grow without mixing claims between games.
            </p>
            <p>
              Player Codex is not affiliated with, endorsed by, or sponsored by any game publisher or developer.
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
          <div className="max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
            <h2 className="text-lg font-black text-green-950">Who maintains the site</h2>
            <p>
              Player Codex is maintained as an editorial guide project. New pages are reviewed for source boundaries,
              duplicate topics, patch-sensitive claims, and whether the page helps a player make a practical in-game decision.
            </p>
            <p>
              The site avoids official game artwork, wiki image hotlinking, copied guide structures, and unsupported claims such as current-meta rankings or guaranteed best routes.
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
          <div className="mb-4 border-b border-green-950/10 pb-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-green-950/46">Live Codexes</p>
            <h2 className="mt-1 text-lg font-black text-green-950">What the site covers now</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Link className="rounded-md border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:bg-white" href="/stardew">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-meadow">Stardew Valley</p>
              <h3 className="mt-2 text-lg font-black text-green-950">Stardew Guide</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">
                Villagers, crops, fish, minerals, forage, animals, artisan goods, Community Center planning, and original beginner guides.
              </p>
            </Link>
            <Link className="rounded-md border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:bg-white" href="/rogue-command">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-meadow">Rogue Command</p>
              <h3 className="mt-2 text-lg font-black text-green-950">RTS Roguelite Guides</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">
                Beginner runs, core systems, Specialist notes, blueprint drafting, recovery habits, and patch-sensitive progression advice.
              </p>
            </Link>
            <Link className="rounded-md border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:bg-white" href="/nova-roma">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-meadow">Nova Roma</p>
              <h3 className="mt-2 text-lg font-black text-green-950">City-Building Notes</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">
                Early Access coverage for first-city planning, resource pressure, water systems, religion, defense, and expansion risks.
              </p>
            </Link>
          </div>
        </section>

        <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
          <div className="max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
            <h2 className="text-lg font-black text-green-950">Editorial approach</h2>
            <p>
              Guides are written to help players make better decisions in-game. For established games, Player Codex
              connects guide pages to structured database entries where possible. For newer or Early Access games, the
              site keeps claims cautious, marks source boundaries, and avoids unverified tier lists, current-meta claims,
              exact ratios, or copied community conclusions.
            </p>
            <p>
              The goal is not to mirror a wiki. Player Codex uses verified facts as a base, then turns them into
              practical planning guides, checklists, and resource-focused advice.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/database">
              Browse Databases
            </Link>
            <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/stardew/guides">
              Stardew Guides
            </Link>
            <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/rogue-command">
              Rogue Command
            </Link>
            <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/nova-roma">
              Nova Roma
            </Link>
            <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/contact">
              Contact
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
