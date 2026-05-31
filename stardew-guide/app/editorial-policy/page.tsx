import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Editorial Policy | Player Codex",
  description: "How Player Codex writes original game guides, checks sources, and keeps fan-made game coverage separate from publishers."
};

const standards = [
  {
    title: "Original guide writing",
    text: "Player Codex does not republish wiki pages or copy public guide structures. Database facts are used as a foundation, then rewritten into player-facing decisions, planning notes, checklists, and failure-recovery advice."
  },
  {
    title: "Checked sources",
    text: "Established game facts are checked against stable references where possible. Newer game pages start with practical decisions and avoid unsupported rankings, rigid formulas, or solved routes."
  },
  {
    title: "Changing games",
    text: "When a game may still change, guides focus on decision frameworks, warning signs, and recovery habits instead of pretending that every number or route is permanent."
  },
  {
    title: "Fan-made independence",
    text: "Player Codex is not affiliated with, endorsed by, or sponsored by any covered game publisher or developer. Game names are used only to identify the fan guide topic."
  },
  {
    title: "AI-assisted editing boundary",
    text: "Drafting and research workflows may use AI assistance, but pages are edited for original structure, player utility, clear sourcing, and duplicate-topic risk before publication."
  },
  {
    title: "Community pain points",
    text: "Player comments and reviews may be used to identify common questions, but they are not treated as proof of mechanics, balance, popularity, or winning strategy."
  }
];

export default function EditorialPolicyPage() {
  return (
    <PageShell
      eyebrow="Player Codex"
      kicker="How guide pages are written, verified, and kept useful for players."
      title="Editorial Policy"
    >
      <div className="space-y-4">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-4 text-sm font-semibold leading-6 text-green-950/70">
            <p>
              Player Codex is built around practical game help: searchable database pages, beginner decisions, route planning, and player-facing guide articles. The site is designed to answer what a player should check next, not just repeat a raw data table.
            </p>
            <p>
              Coverage is separated by game so Stardew Valley, Rogue Command, Nova Roma, and Songs of Conquest Mobile can each keep their own sources, route structure, and guide focus.
            </p>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          {standards.map((item) => (
            <article className="rounded-md border border-green-950/10 bg-white/85 p-4" key={item.title}>
              <h2 className="text-lg font-black text-green-950">{item.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <h2 className="text-lg font-black text-green-950">Current guide areas</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">
            Use these sections to see the current editorial approach in practice.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/stardew/guides">
              Stardew Guides
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/rogue-command">
              Rogue Command
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/nova-roma/guides">
              Nova Roma Guides
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/songs-of-conquest-mobile/guides">
              Songs Mobile Guides
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
