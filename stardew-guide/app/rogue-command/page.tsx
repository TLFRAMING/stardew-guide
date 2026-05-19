import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Rogue Command | Player Codex",
  description:
    "Source-reviewed introduction to Rogue Command, a single-player RTS with roguelite build crafting, staged as a future Player Codex guide module."
};

const verifiedFacts = [
  ["Developer / Publisher", "feneq"],
  ["Full release", "2026-05-14"],
  ["Early Access", "2024-11-18"],
  ["Categories", "Action, Simulation, Strategy"]
];

const systemsUnderReview = ["Blueprints", "Upgrades", "Hacks", "Engineer", "Economy", "Specialist"];

const plannedModules = [
  {
    title: "Guides",
    description: "Beginner-facing notes and system explanations will be published after source review."
  },
  {
    title: "Builds",
    description: "Build pages are still under review and will not include rankings until claims are verified."
  },
  {
    title: "Database",
    description: "Reference data for systems and terms is being staged before it becomes production content."
  }
];

const sources = [
  {
    title: "Steam store",
    href: "https://store.steampowered.com/app/1461910/Rogue_Command/"
  },
  {
    title: "Steam announcements",
    href: "https://steamcommunity.com/app/1461910/announcements/"
  },
  {
    title: "Official About page",
    href: "https://www.roguecommand.net/about-us"
  }
];

export default function RogueCommandPage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="A verified intro page for the next Player Codex module." title="Rogue Command">
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              Source-reviewed intro
            </span>
            <p className="text-sm font-semibold leading-6 text-green-950/72">
              This page is a source-reviewed introduction for Rogue Command. Strategy guides are not published yet, and build or database pages remain under review.
            </p>
            <p className="text-sm font-semibold leading-6 text-green-950/62">
              Player Codex is staging Rogue Command as its next game module with conservative source boundaries before any recommendations go live.
            </p>
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <h2 className="text-base font-black text-green-950">Overview</h2>
              <p className="text-sm font-semibold leading-6 text-green-950/72">
                Rogue Command is a single-player RTS with roguelite build crafting. Its official Steam description frames play around controlling units, building a base, harvesting resources, exploring the map, defending positions, and planning attacks.
              </p>
              <p className="text-sm font-semibold leading-6 text-green-950/62">
                Steam and official announcement sources support describing the game as a 1.0 release that has left Early Access. This page does not publish build rankings, strategy conclusions, or detailed system data.
              </p>
            </div>
            <div className="rounded-md border border-green-950/10 bg-green-950/[0.035] p-4">
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-green-950/55">Verified Facts</h2>
              <dl className="mt-3 space-y-3">
                {verifiedFacts.map(([label, value]) => (
                  <div key={label} className="grid gap-1">
                    <dt className="text-xs font-black uppercase tracking-[0.1em] text-green-950/45">{label}</dt>
                    <dd className="text-sm font-black text-green-950">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
            <h2 className="text-base font-black text-green-950">Systems Under Review</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              These system names are source-backed, but Player Codex has not published detailed RC data yet.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {systemsUnderReview.map((system) => (
                <li key={system} className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950/75">
                  {system}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
            <h2 className="text-base font-black text-green-950">Planned Modules</h2>
            <div className="mt-4 space-y-3">
              {plannedModules.map((module) => (
                <article key={module.title} className="rounded-sm border border-green-950/10 bg-green-950/[0.025] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-black text-green-950">{module.title}</h3>
                    <span className="rounded-sm bg-green-950/[0.06] px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/50">
                      Planned
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{module.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-base font-black text-green-950">Sources</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                This intro is based on public source review. No images, screenshots, logos, or icons are used.
              </p>
            </div>
            <div className="grid gap-2">
              {sources.map((source) => (
                <Link
                  key={source.href}
                  className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]"
                  href={source.href}
                >
                  {source.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-green-950/[0.035] px-4 py-4 sm:px-5">
          <p className="text-sm font-semibold leading-6 text-green-950/62">
            Player Codex is fan-made and is not affiliated with feneq or Rogue Command.
          </p>
        </section>

        <div>
          <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/">
            Back to Player Codex
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
