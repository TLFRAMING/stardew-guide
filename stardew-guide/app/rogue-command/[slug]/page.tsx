import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getAllRogueCommandArticles, getRogueCommandArticleBySlug } from "@/lib/rogue-command/data";

export const dynamicParams = false;

const confidenceLabels: Record<string, string> = {
  official: "Official-source base",
  wiki: "Wiki-backed",
  mixed: "Mixed sources",
  "needs verification": "Needs verification"
};

const patchSensitivityLabels: Record<string, string> = {
  high: "High patch sensitivity",
  low: "Low patch sensitivity",
  medium: "Medium patch sensitivity"
};

const categoryLabels: Record<string, string> = {
  "getting-started": "Getting started",
  progression: "Progression",
  specialists: "Specialists",
  starters: "Starters",
  systems: "Systems"
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getRogueCommandArticleBySlug(slug);

  if (!article) {
    return {
      title: "Rogue Command Guide Not Found | Player Codex",
      description: "This Rogue Command guide could not be found."
    };
  }

  return {
    title: `${article.title} | Player Codex`,
    description: article.summary
  };
}

export function generateStaticParams() {
  return getAllRogueCommandArticles().map((article) => ({ slug: article.slug }));
}

export default async function RogueCommandArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getRogueCommandArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageShell eyebrow="Rogue Command Guide" kicker={article.summary} title={article.title}>
      <article className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">
              {categoryLabels[article.category] ?? article.category}
            </span>
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">
              Patch {article.patchVersion}
            </span>
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">
              Verified {article.lastVerified}
            </span>
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">
              {confidenceLabels[article.confidence] ?? article.confidence}
            </span>
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">
              {patchSensitivityLabels[article.patchSensitivity] ?? article.patchSensitivity}
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-green-950/62">
            This guide is player-facing strategy content with source metadata preserved. Patch-sensitive wiki-backed mechanics should be rechecked before turning them into tier lists, best-build claims, or exact-stat references.
          </p>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/90 px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-5">
            {article.blocks.map((block, index) => {
              if (block.type === "heading") {
                const Heading = block.level === 2 ? "h2" : "h3";

                return (
                  <Heading className="pt-2 text-lg font-black leading-tight text-green-950 sm:text-xl" key={`${block.text}-${index}`}>
                    {block.text}
                  </Heading>
                );
              }

              return (
                <p className="text-sm font-semibold leading-7 text-green-950/72 sm:text-[0.95rem]" key={`${block.text}-${index}`}>
                  {block.text}
                </p>
              );
            })}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-base font-black text-green-950">Sources</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                Source IDs are resolved against the Rogue Command source registry. Internal notes are not shown on public pages.
              </p>
            </div>
            <div className="grid gap-2">
              {article.sources.map((source) => (
                <Link
                  className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]"
                  href={source.url}
                  key={source.id}
                >
                  <span className="block">{source.title}</span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.12em] text-green-950/48">
                    {source.publisher} / {source.sourceType}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div>
          <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/rogue-command">
            Back to Rogue Command
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
