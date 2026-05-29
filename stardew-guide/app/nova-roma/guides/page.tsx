import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllNovaRomaGuideArticles } from "@/lib/nova-roma/data";
import type { NovaRomaGuideArticle } from "@/lib/nova-roma/types";

export const metadata: Metadata = {
  title: "Nova Roma Guides: Resources, Water, Production Chains, and Stability | Player Codex",
  description: "Nova Roma guide hub for Early Access city-building help: resource shortages, water planning, production chains, population stability, religion, defense, and beginner growth.",
  alternates: {
    canonical: "https://playercodex.app/nova-roma/guides"
  },
  openGraph: {
    title: "Nova Roma Guides: Resources, Water, Production Chains, and Stability | Player Codex",
    description: "Nova Roma guide hub for Early Access city-building help: resource shortages, water planning, production chains, population stability, religion, defense, and beginner growth.",
    url: "https://playercodex.app/nova-roma/guides",
    siteName: "Player Codex",
    type: "website"
  }
};

const confidenceLabels: Record<string, string> = {
  high: "Verified sources",
  medium: "Source checked",
  "needs verification": "Review needed"
};

const patchSensitivityLabels: Record<string, string> = {
  high: "Patch-sensitive",
  low: "Stable topic",
  medium: "Early Access"
};

export default function NovaRomaGuidesPage() {
  const articles = getAllNovaRomaGuideArticles();
  const startingGuide = articles.find((article) => article.slug === "understand-nova-roma-core-mechanics");
  const shortageGuide = articles.find((article) => article.slug === "early-resource-shortage-guide");
  const waterGuide = articles.find((article) => article.slug === "water-planning-basics");

  return (
    <PageShell
      eyebrow="Nova Roma Guides"
      kicker="Early Access city-building guides for resource pressure, water planning, production-chain bottlenecks, population stability, and safer expansion."
      title="Nova Roma Guides"
    >
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              Early Access coverage
            </span>
            <p className="text-sm font-semibold leading-6 text-green-950/72">
              Nova Roma is still in Early Access. These guides help players understand why a city stalls, where shortages begin, and how to slow growth before the support systems break.
            </p>
            <p className="text-sm font-semibold leading-6 text-green-950/62">
              Use this hub to move from beginner mechanics into resource pressure, water planning, production chains, population stability, and later city-planning decisions while the source set remains conservative.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {startingGuide ? (
                <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.06] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.1]" href={`/nova-roma/guides/${startingGuide.slug}`}>
                  Start with core mechanics
                </Link>
              ) : null}
              {shortageGuide ? (
                <Link className="rounded-sm border border-green-950/14 bg-white/70 px-3 py-2 text-sm font-black text-green-950 transition hover:bg-white" href={`/nova-roma/guides/${shortageGuide.slug}`}>
                  Fix resource shortages
                </Link>
              ) : null}
              {waterGuide ? (
                <Link className="rounded-sm border border-green-950/14 bg-white/70 px-3 py-2 text-sm font-black text-green-950 transition hover:bg-white" href={`/nova-roma/guides/${waterGuide.slug}`}>
                  Plan water first
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <PathCard
            href="/nova-roma/guides/early-resource-shortage-guide"
            label="Resource pressure"
            title="If the city is already stalling"
            text="Start by checking whether the problem is input, storage, labor, water access, or new demand."
          />
          <PathCard
            href="/nova-roma/guides/water-planning-basics"
            label="Water planning"
            title="If expansion feels hard to service"
            text="Use the water guide before density makes the city expensive to repair."
          />
          <PathCard
            href="/nova-roma/guides/population-needs-and-stability"
            label="Population stability"
            title="If new housing creates new pressure"
            text="Check water, food, jobs, storage, and support before adding more residents."
          />
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-black text-green-950">Guide set</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                These live guides follow a beginner-safe reading path. Each one keeps source and Early Access status visible so the hub stays useful without pretending Early Access strategy is already solved.
              </p>
            </div>
            <span className="w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              {articles.length} guides
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <GuideCard article={article} key={article.slug} />
            ))}
          </div>
        </section>

        <div>
          <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/nova-roma">
            Back to Nova Roma
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function PathCard({ href, label, text, title }: { href: string; label: string; text: string; title: string }) {
  return (
    <Link className="group rounded-md border border-green-950/10 bg-white/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-white" href={href}>
      <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">{label}</p>
      <h2 className="mt-2 text-base font-black leading-snug text-green-950 group-hover:text-meadow">{title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{text}</p>
    </Link>
  );
}

function GuideCard({ article }: { article: NovaRomaGuideArticle }) {
  return (
    <Link className="group rounded-sm border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-green-950/[0.045]" href={`/nova-roma/guides/${article.slug}`}>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-sm bg-green-950/[0.06] px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/50">{article.category}</span>
        <span className="rounded-sm bg-white/60 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">
          {confidenceLabels[article.confidence] ?? article.confidence}
        </span>
        <span className="rounded-sm bg-white/60 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">
          {patchSensitivityLabels[article.patchSensitivity] ?? article.patchSensitivity}
        </span>
      </div>
      <h2 className="mt-3 text-base font-black leading-snug text-green-950 group-hover:text-meadow">{article.title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{article.summary}</p>
    </Link>
  );
}
