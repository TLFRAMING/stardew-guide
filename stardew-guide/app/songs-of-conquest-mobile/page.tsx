import type { Metadata } from "next";
import Link from "next/link";
import { DataCard } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { getAllSongsOfConquestMobileGuideArticles, getAllSongsOfConquestMobileSources } from "@/lib/songs-of-conquest-mobile/data";

export const metadata: Metadata = {
  title: "Songs of Conquest Mobile Guide: Beginner Strategy, Factions, Wielders, and Resources | Player Codex",
  description:
    "Songs of Conquest Mobile guide coverage for beginner strategy, faction choice, Wielders, resource planning, town building, tactical combat, and mobile session planning.",
  alternates: {
    canonical: "https://playercodex.app/songs-of-conquest-mobile"
  },
  openGraph: {
    title: "Songs of Conquest Mobile Guide | Player Codex",
    description:
      "Beginner-safe Songs of Conquest Mobile guide coverage for factions, Wielders, resources, towns, tactical battles, and mobile play.",
    url: "https://playercodex.app/songs-of-conquest-mobile",
    siteName: "Player Codex",
    type: "website"
  }
};

const identityFacts = [
  ["Game", "Songs of Conquest Mobile"],
  ["Core genre", "Turn-based adventure strategy"],
  ["Key systems", "Wielders, armies, resources, towns, and tactical battles"],
  ["Mobile sources", "App Store and Google Play"],
  ["Coverage status", "Intro page and beginner guides live"]
] as const;

const boundaries = [
  "Compare factions by learning curve, army readability, and resource comfort.",
  "Use Wielder pages to connect army plans, spell timing, and map goals.",
  "Read troop pages as role explainers before committing your early army plan.",
  "Treat combat pages as decision routines for preserving important stacks.",
  "Use economy pages to connect town spending, resources, and map movement.",
  "Use mobile session pages to end turns and sessions at clean decision points."
];

const sourceTypeLabels: Record<string, string> = {
  announcement: "Announcement",
  database: "Database",
  "official-site": "Official site",
  other: "Source",
  store: "Store",
  wiki: "Wiki"
};

export default function SongsOfConquestMobilePage() {
  const sources = getAllSongsOfConquestMobileSources();
  const articles = getAllSongsOfConquestMobileGuideArticles();

  return (
    <PageShell
      eyebrow="Player Codex"
      kicker="Mobile-first strategy guide coverage for Songs of Conquest players who need beginner help with factions, Wielders, resources, towns, and tactical battles."
      title="Songs of Conquest Mobile Guide"
    >
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              Guide coverage live
            </span>
            <p className="text-sm font-semibold leading-6 text-green-950/72">
              Songs of Conquest Mobile brings the adventure strategy structure of Songs of Conquest to phones and tablets. Player Codex covers it with beginner guides for faction choice, Wielders, resource planning, town building, tactical combat, and mobile session flow.
            </p>
            <p className="text-sm font-semibold leading-6 text-green-950/62">
              Start with the guide hub if you need help deciding what to do in the first campaign, how to choose a learning path, or how to preserve army strength in early fights.
            </p>
            <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.06] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.1]" href="/songs-of-conquest-mobile/guides">
              Open Songs of Conquest Mobile Guides
            </Link>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <DataCard>
            <h2 className="text-base font-black text-green-950">What this guide hub will help with</h2>
            <div className="mt-3 space-y-3 text-sm font-semibold leading-6 text-green-950/68">
              <p>
                The useful beginner question is how to read the map, keep the economy moving, choose fights that match your army, and build Wielders around the decisions you can actually support.
              </p>
              <p>Use the live guide set when you need a first-session routine, faction comparison criteria, or a safer combat routine for preserving important troops.</p>
            </div>
          </DataCard>

          <DataCard>
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-green-950/55">Identity card</h2>
            <dl className="mt-3 space-y-3">
              {identityFacts.map(([label, value]) => (
                <div key={label} className="grid gap-1">
                  <dt className="text-xs font-black uppercase tracking-[0.1em] text-green-950/45">{label}</dt>
                  <dd className="text-sm font-black text-green-950">{value}</dd>
                </div>
              ))}
            </dl>
          </DataCard>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <DataCard>
            <h2 className="text-base font-black text-green-950">Live beginner guides</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              These guides form the first Songs of Conquest Mobile reading path.
            </p>
            <div className="mt-4 grid gap-3">
              {articles.map((article) => (
                <Link className="rounded-sm border border-green-950/10 bg-green-950/[0.035] p-3 transition hover:bg-green-950/[0.07]" href={`/songs-of-conquest-mobile/guides/${article.slug}`} key={article.slug}>
                  <h3 className="text-sm font-black text-green-950">{article.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{article.summary}</p>
                </Link>
              ))}
            </div>
          </DataCard>

          <DataCard>
            <h2 className="text-base font-black text-green-950">Next guide areas</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              These are the next useful areas for players who want to improve beyond the first campaign, faction choice, and combat basics.
            </p>
            <ul className="mt-4 space-y-2">
              {boundaries.map((item) => (
                <li className="rounded-sm border border-green-950/10 bg-white p-3 text-sm font-semibold leading-6 text-green-950/72" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </DataCard>
        </section>

        <DataCard>
          <h2 className="text-base font-black text-green-950">Verified sources</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
            Store and official pages are listed here so readers can check platform availability and the official game overview.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {sources.map((source) => (
              <a
                className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-4 py-3 text-sm text-green-950 transition hover:bg-green-950/[0.08]"
                href={source.url}
                key={source.id}
                rel="noreferrer"
                target="_blank"
              >
                <span className="block font-black">{source.title}</span>
                <span className="mt-2 block text-xs font-black uppercase tracking-[0.12em] text-green-950/48">
                  {source.publisher} / {sourceTypeLabels[source.sourceType] ?? source.sourceType}
                </span>
                <span className="mt-1 block text-xs font-black uppercase tracking-[0.12em] text-green-950/42">
                  Checked {source.lastChecked}
                </span>
              </a>
            ))}
          </div>
        </DataCard>

        <section className="rounded-md border border-green-950/10 bg-green-950/[0.035] px-4 py-4 sm:px-5">
          <p className="text-sm font-semibold leading-6 text-green-950/62">
            Player Codex is fan-made and is not affiliated with Lavapotion, Coffee Stain Publishing, Apple, Google, or Steam.
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
