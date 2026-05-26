import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllNovaRomaGuideArticles } from "@/lib/nova-roma/data";
import type { NovaRomaGuideArticle } from "@/lib/nova-roma/types";

export const metadata: Metadata = {
  title: "Nova Roma Guides | Player Codex",
  description: "Source-bounded Nova Roma guide hub for Early Access city-building coverage, beginner planning, and system notes.",
  alternates: {
    canonical: "https://playercodex.app/nova-roma/guides"
  },
  openGraph: {
    title: "Nova Roma Guides | Player Codex",
    description: "Source-bounded Nova Roma guide hub for Early Access city-building coverage, beginner planning, and system notes.",
    url: "https://playercodex.app/nova-roma/guides",
    siteName: "Player Codex",
    type: "website"
  }
};

const confidenceLabels: Record<string, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  "needs verification": "Needs verification"
};

const patchSensitivityLabels: Record<string, string> = {
  high: "High patch sensitivity",
  low: "Low patch sensitivity",
  medium: "Medium patch sensitivity"
};

export default function NovaRomaGuidesPage() {
  const articles = getAllNovaRomaGuideArticles();

  return (
    <PageShell
      eyebrow="Nova Roma Guides"
      kicker="Early Access city-building guide coverage with source-bounded claims and no solved layouts or exact economy routes."
      title="Nova Roma Guide Hub"
    >
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              Early Access coverage
            </span>
            <p className="text-sm font-semibold leading-6 text-green-950/72">
              Nova Roma is still in Early Access. These guides are written as source-bounded planning help, not as solved layouts, exact economy routes, or live-balance verdicts.
            </p>
            <p className="text-sm font-semibold leading-6 text-green-950/62">
              Use this hub to move from beginner mechanics into resource pressure, water planning, production chains, population stability, and later city-planning decisions while the source set remains conservative.
            </p>
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-black text-green-950">Guide set</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                These seven live guides follow a beginner-safe reading path. Each one keeps confidence and patch-sensitivity visible so the hub stays useful without pretending Early Access strategy is already solved.
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
