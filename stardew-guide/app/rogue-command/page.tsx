import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import sources from "@/data/rogue-command/sources.json";
import { getRogueCommandArticlesByCategory } from "@/lib/rogue-command/data";

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

const sourceTypeLabels: Record<string, string> = {
  announcement: "Announcement",
  "official-site": "Official site",
  store: "Store",
  wiki: "Wiki",
  other: "Source"
};

const confidenceLabels: Record<string, string> = {
  official: "Official-source base",
  wiki: "Wiki-backed",
  mixed: "Mixed sources",
  "needs verification": "Needs verification"
};

const categoryLabels: Record<string, string> = {
  "getting-started": "Getting started",
  progression: "Progression",
  specialists: "Specialists",
  starters: "Starters",
  systems: "Systems"
};

export default function RogueCommandPage() {
  const articleGroups = getRogueCommandArticlesByCategory();
  const categoryEntries = Object.entries(articleGroups).sort(([first], [second]) => first.localeCompare(second));

  return (
    <PageShell eyebrow="Player Codex" kicker="Source-backed beginner guides and patch-sensitive strategy notes for Rogue Command." title="Rogue Command">
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              Guide layer live
            </span>
            <p className="text-sm font-semibold leading-6 text-green-950/72">
              This Rogue Command section now publishes the first English guide batch: beginner onboarding, core systems, starter choice, economy tempo, reward drafting, Specialist identity, and long-term progression.
            </p>
            <p className="text-sm font-semibold leading-6 text-green-950/62">
              The articles are written as practical player guidance, but they do not publish current-version tier lists, best-build rankings, or unverified optimal routes.
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
                Steam and official announcement sources support describing the game as a 1.0 release that has left Early Access. Wiki-backed Specialist and system content remains marked as patch-sensitive.
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
            <h2 className="text-base font-black text-green-950">Published guide set</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              Ten English articles are live as source-aware guide pages. Metadata is preserved on each page for version, confidence, and patch sensitivity.
            </p>
            <div className="mt-4 grid gap-2">
              {categoryEntries.map(([category, articles]) => (
                <div key={category} className="rounded-sm border border-green-950/10 bg-green-950/[0.025] p-3">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">{categoryLabels[category] ?? category}</p>
                  <p className="mt-1 text-sm font-black text-green-950">{articles.length} guides</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-black text-green-950">Rogue Command guides</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                Start with fundamentals, then move into systems, Specialists, and long-term progression.
              </p>
            </div>
            <span className="w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              10 articles
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {categoryEntries.flatMap(([, articles]) =>
              articles.map((article) => (
                <Link
                  key={article.slug}
                  className="group rounded-sm border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-green-950/[0.045]"
                  href={`/rogue-command/${article.slug}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm bg-green-950/[0.06] px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/50">
                      {categoryLabels[article.category] ?? article.category}
                    </span>
                    <span className="rounded-sm bg-white/60 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">
                      {confidenceLabels[article.confidence] ?? article.confidence}
                    </span>
                  </div>
                  <h3 className="mt-3 break-words text-base font-black leading-snug text-green-950 group-hover:text-meadow">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{article.summary}</p>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-base font-black text-green-950">Verified sources</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                This intro is based on public source review. Source notes remain internal, and no images, screenshots, logos, or icons are used.
              </p>
            </div>
            <div className="grid gap-2">
              {sources.map((source) => (
                <Link
                  key={source.id}
                  className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]"
                  href={source.url}
                >
                  <span className="block">{source.title}</span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.12em] text-green-950/48">
                    {source.publisher} / {sourceTypeLabels[source.sourceType] ?? source.sourceType}
                  </span>
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
