import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getAllRogueCommandArticles, getRelatedRogueCommandArticles, getRogueCommandArticleBySlug } from "@/lib/rogue-command/data";
import type { RogueCommandArticle, RogueCommandArticleBlock } from "@/lib/rogue-command/types";

export const dynamicParams = false;

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
    description: article.summary,
    alternates: {
      canonical: `https://playercodex.app/rogue-command/${article.slug}`
    },
    openGraph: {
      title: `${article.title} | Player Codex`,
      description: article.summary,
      url: `https://playercodex.app/rogue-command/${article.slug}`,
      siteName: "Player Codex",
      type: "article"
    }
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

  const allArticles = getAllRogueCommandArticles();
  const articleIndex = allArticles.findIndex((candidate) => candidate.slug === article.slug);
  const previousArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined;
  const nextArticle = articleIndex >= 0 ? allArticles[articleIndex + 1] : undefined;
  const relatedArticles = getRelatedRogueCommandArticles(article);
  const headings = article.blocks.filter((block): block is Extract<RogueCommandArticleBlock, { type: "heading" }> => block.type === "heading" && block.level === 2);

  return (
    <PageShell eyebrow="Rogue Command Guide" kicker={article.summary} title={article.title}>
      <article className="space-y-5">
        <nav aria-label="Breadcrumb" className="rounded-md border border-green-950/10 bg-white/70 px-4 py-3 text-sm font-black text-green-950/58 sm:px-5">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-green-950" href="/">
                Player Codex
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-green-950" href="/rogue-command">
                Rogue Command
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-green-950">{categoryLabels[article.category] ?? article.category}</li>
          </ol>
        </nav>

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
              {article.readingTimeMinutes} min read
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-green-950/62">
            This guide focuses on practical run decisions and avoids current-version rankings, fixed build prescriptions, or precise stat claims.
          </p>
        </section>

        {article.patchSensitivity === "high" ? (
          <section className="rounded-md border border-amber-600/25 bg-amber-100/70 px-4 py-4 sm:px-5">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-amber-800">Specialist notes</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">
              Specialist behavior can change as the game is updated. Use this page for decision guidance, not as a ranking or exact balance table.
            </p>
          </section>
        ) : null}

        {headings.length > 0 ? (
          <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-4 sm:px-5">
            <h2 className="text-base font-black text-green-950">On this page</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {headings.map((heading) => (
                <a className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.07]" href={`#${headingId(heading.text)}`} key={heading.text}>
                  {heading.text}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-md border border-green-950/10 bg-white/90 px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-5">
            {article.blocks.map((block, index) => (
              <ArticleBlock block={block} index={index} key={`${block.type}-${index}`} />
            ))}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-base font-black text-green-950">Sources</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">References used for this guide.</p>
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

        {relatedArticles.length > 0 ? (
          <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
            <div className="mb-4 border-b border-green-950/10 pb-3">
              <h2 className="text-base font-black text-green-950">Related {categoryLabels[article.category] ?? article.category} guides</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">Continue with nearby articles before jumping into unrelated systems or Specialist-specific notes.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {relatedArticles.map((relatedArticle) => (
                <ArticleLinkCard article={relatedArticle} key={relatedArticle.slug} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-3 md:grid-cols-2">
          {previousArticle ? <NavArticle article={previousArticle} label="Previous guide" /> : <div />}
          {nextArticle ? <NavArticle article={nextArticle} label="Next guide" /> : <div />}
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

function ArticleBlock({ block, index }: { block: RogueCommandArticleBlock; index: number }) {
  if (block.type === "heading") {
    const Heading = block.level === 2 ? "h2" : "h3";

    return (
      <Heading className="scroll-mt-24 pt-2 text-lg font-black leading-tight text-green-950 sm:text-xl" id={block.level === 2 ? headingId(block.text) : undefined}>
        {block.text}
      </Heading>
    );
  }

  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul";

    return (
      <List className={block.ordered ? "list-decimal space-y-2 pl-5 text-sm font-semibold leading-7 text-green-950/72 sm:text-[0.95rem]" : "list-disc space-y-2 pl-5 text-sm font-semibold leading-7 text-green-950/72 sm:text-[0.95rem]"}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    );
  }

  return (
    <p className="text-sm font-semibold leading-7 text-green-950/72 sm:text-[0.95rem]" key={`${block.text}-${index}`}>
      {block.text}
    </p>
  );
}

function ArticleLinkCard({ article }: { article: RogueCommandArticle }) {
  return (
    <Link className="group rounded-sm border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-green-950/[0.045]" href={`/rogue-command/${article.slug}`}>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-sm bg-green-950/[0.06] px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/50">
          {categoryLabels[article.category] ?? article.category}
        </span>
        <span className="rounded-sm bg-white/60 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">
          {article.readingTimeMinutes} min
        </span>
      </div>
      <h3 className="mt-3 text-base font-black leading-snug text-green-950 group-hover:text-meadow">{article.title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{article.summary}</p>
    </Link>
  );
}

function NavArticle({ article, label }: { article: RogueCommandArticle; label: string }) {
  return (
    <Link className="group rounded-md border border-green-950/10 bg-white/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-white" href={`/rogue-command/${article.slug}`}>
      <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">{label}</p>
      <h2 className="mt-2 text-base font-black leading-snug text-green-950 group-hover:text-meadow">{article.title}</h2>
    </Link>
  );
}

function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
