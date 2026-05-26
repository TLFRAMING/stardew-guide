import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Editorial Policy | Player Codex",
  description: "How Player Codex writes original, source-aware game guides, handles patch-sensitive claims, and keeps fan-made game coverage separate from publishers."
};

const standards = [
  {
    title: "Original guide writing",
    text: "Player Codex does not republish wiki pages or copy public guide structures. Database facts are used as a foundation, then rewritten into player-facing decisions, planning notes, checklists, and failure-recovery advice."
  },
  {
    title: "Source boundaries",
    text: "Established game facts are checked against stable references where possible. For Early Access games, claims stay cautious and avoid unsupported current-meta conclusions, exact ratios, rankings, or solved routes."
  },
  {
    title: "Patch-sensitive coverage",
    text: "Strategy pages mark confidence and patch sensitivity when the underlying game may still change. A guide can explain how to think through a system without pretending that every number or best route has been verified."
  },
  {
    title: "Fan-made independence",
    text: "Player Codex is not affiliated with, endorsed by, or sponsored by any covered game publisher or developer. Game names are used only to identify the fan guide topic."
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
              Player Codex is built around practical game help: searchable database pages, beginner decisions, route planning, and source-aware guide articles. The site is designed to answer what a player should check next, not just repeat a raw data table.
            </p>
            <p>
              Coverage is separated by game so Stardew Valley, Rogue Command, and Nova Roma can each keep their own sources, patch notes, and content boundaries.
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
          </div>
        </section>
      </div>
    </PageShell>
  );
}
