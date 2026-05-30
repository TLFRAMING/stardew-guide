import type { Metadata } from "next";
import Link from "next/link";
import { DataCard } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { getAllNovaRomaGuideArticles, getAllNovaRomaSources } from "@/lib/nova-roma/data";
import type { NovaRomaGuideArticle } from "@/lib/nova-roma/types";

export const metadata: Metadata = {
  title: "Nova Roma Guide: Beginner City Building, Resources, Water, and Stability | Player Codex",
  description:
    "Nova Roma beginner guides for Early Access city planning, resource shortages, water supply, production chains, population stability, religion, and defense.",
  alternates: {
    canonical: "https://playercodex.app/nova-roma"
  },
  openGraph: {
    title: "Nova Roma Guide: Beginner City Building, Resources, Water, and Stability | Player Codex",
    description:
      "Nova Roma beginner guides for Early Access city planning, resource shortages, water supply, production chains, population stability, religion, and defense.",
    url: "https://playercodex.app/nova-roma",
    siteName: "Player Codex",
    type: "website"
  }
};

const identityFacts = [
  ["Game", "Nova Roma"],
  ["Developer", "Lion Shield"],
  ["Publisher", "Hooded Horse"],
  ["Steam release / Early Access date", "Mar 26, 2026"],
  ["Status", "Steam page shows the game is in Early Access as of 2026-05-24"]
] as const;

const futureCoverage = [
  "Beginner city-building planning",
  "Resource flow basics",
  "Water supply planning",
  "Production chain diagnosis",
  "Citizen stability",
  "Expansion risk",
  "Defense and recovery planning"
];

const sourceTypeLabels: Record<string, string> = {
  announcement: "Announcement",
  database: "Database",
  "official-site": "Official site",
  other: "Reference",
  store: "Store",
  wiki: "Wiki"
};

export default function NovaRomaPage() {
  const sources = getAllNovaRomaSources();
  const guideArticles = getAllNovaRomaGuideArticles();

  return (
    <PageShell
      eyebrow="Player Codex"
      kicker="Beginner-safe Nova Roma guide coverage for city growth, resource pressure, water planning, production chains, and stability checks."
      title="Nova Roma Guide"
    >
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              Intro page live
            </span>
            <p className="text-sm font-semibold leading-6 text-green-950/72">
              This page helps new players find the right Nova Roma guide quickly. Start with city planning, resource shortage diagnosis, water supply, production chains, population stability, religion, and defense.
            </p>
            <p className="text-sm font-semibold leading-6 text-green-950/62">
              If your city is stalling, use the guide hub as a troubleshooting path: check resources first, then water, then production chains, then population pressure.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.06] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.1]" href="/nova-roma/guides">
                Browse Nova Roma guides
              </Link>
              <Link className="rounded-sm border border-green-950/14 bg-white/70 px-3 py-2 text-sm font-black text-green-950 transition hover:bg-white" href="/nova-roma/guides/early-resource-shortage-guide">
                Start with resource shortages
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <DataCard>
            <h2 className="text-base font-black text-green-950">Start here</h2>
            <div className="mt-3 space-y-3 text-sm font-semibold leading-6 text-green-950/68">
              <p>
                Nova Roma is a Roman city-building game where growth decisions interact with water, storage, logistics, civic systems, and stability. The current guide layer focuses on the early questions that cause most city plans to break down.
              </p>
              <p>
                Use these guides when you need to decide whether to expand, pause construction, repair a chain, improve water access, or stabilize population growth before adding another district.
              </p>
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
            <h2 className="text-base font-black text-green-950">What Player Codex can cover next</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              These are the next guide areas that fit the current Nova Roma section.
            </p>
            <ul className="mt-4 grid gap-2">
              {futureCoverage.map((item) => (
                <li key={item} className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950/75">
                  {item}
                </li>
              ))}
            </ul>
          </DataCard>

          <DataCard>
            <h2 className="text-base font-black text-green-950">Recommended path</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              If you are new, follow this order before jumping into advanced city planning.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Read the core mechanics guide to understand the main pressure points.",
                "Use the resource shortage guide when food, storage, labor, or demand starts to slip.",
                "Check the water planning guide before expanding dense districts.",
                "Use production-chain and population guides when growth begins creating new bottlenecks.",
                "Move to city planning, religion, and defense once the basic support systems are readable."
              ].map((item) => (
                <li key={item} className="rounded-sm border border-green-950/10 bg-white p-3 text-sm font-semibold leading-6 text-green-950/72">
                  {item}
                </li>
              ))}
            </ul>
          </DataCard>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <DataCard>
            <h2 className="text-base font-black text-green-950">Why this page exists now</h2>
            <div className="mt-3 space-y-3 text-sm font-semibold leading-6 text-green-950/68">
              <p>
                Nova Roma already has a small guide layer on Player Codex, so this hub now works as the front door for search users who need beginner help with city pressure instead of a thin announcement page.
              </p>
              <p>
                The section stays useful today without opening empty database pages, layout pages, or optimization hubs before the evidence is ready.
              </p>
            </div>
          </DataCard>

          <DataCard>
            <h2 className="text-base font-black text-green-950">References</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              Reference pages used for the Nova Roma section.
            </p>
            <div className="mt-4 grid gap-3">
              {sources.map((source) => (
                <a
                  key={source.id}
                  className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-4 py-3 text-sm text-green-950 transition hover:bg-green-950/[0.08]"
                  href={source.url}
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
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-black text-green-950">Guides</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                These guides focus on beginner planning, resource pressure, water, religion, defense, production chains, and stable growth.
              </p>
            </div>
            <Link className="w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/nova-roma/guides">
              Browse all guides
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {guideArticles.map((article) => (
              <GuideCard article={article} key={article.slug} />
            ))}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-green-950/[0.035] px-4 py-4 sm:px-5">
          <p className="text-sm font-semibold leading-6 text-green-950/62">
            Player Codex is fan-made and is not connected with Lion Shield, Hooded Horse, or Steam.
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

function GuideCard({ article }: { article: NovaRomaGuideArticle }) {
  return (
    <Link className="group rounded-sm border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-green-950/[0.045]" href={`/nova-roma/guides/${article.slug}`}>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-sm bg-green-950/[0.06] px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/50">{article.category}</span>
        <span className="rounded-sm bg-white/60 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">{article.readingTimeMinutes} min read</span>
      </div>
      <h2 className="mt-3 text-base font-black leading-snug text-green-950 group-hover:text-meadow">{article.title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{article.summary}</p>
    </Link>
  );
}
