import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  getAllSongsOfConquestMobileGuideArticles,
  getAllSongsOfConquestMobileGuideSlugs,
  getSongsOfConquestMobileGuideArticleBySlug
} from "@/lib/songs-of-conquest-mobile/data";
import type { SongsOfConquestMobileGuideArticle, SongsOfConquestMobileGuideArticleBlock } from "@/lib/songs-of-conquest-mobile/types";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getSongsOfConquestMobileGuideArticleBySlug(slug);

  if (!article) {
    return {
      title: "Songs of Conquest Mobile Guide Not Found | Player Codex",
      description: "This Songs of Conquest Mobile guide could not be found."
    };
  }

  return {
    title: `${article.title} | Player Codex`,
    description: article.summary,
    alternates: {
      canonical: `https://playercodex.app/songs-of-conquest-mobile/guides/${article.slug}`
    },
    openGraph: {
      title: `${article.title} | Player Codex`,
      description: article.summary,
      url: `https://playercodex.app/songs-of-conquest-mobile/guides/${article.slug}`,
      siteName: "Player Codex",
      type: "article"
    }
  };
}

export function generateStaticParams() {
  return getAllSongsOfConquestMobileGuideSlugs().map((slug) => ({ slug }));
}

export default async function SongsOfConquestMobileGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getSongsOfConquestMobileGuideArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllSongsOfConquestMobileGuideArticles();
  const articleIndex = allArticles.findIndex((candidate) => candidate.slug === article.slug);
  const previousArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined;
  const nextArticle = articleIndex >= 0 ? allArticles[articleIndex + 1] : undefined;
  const headings = article.blocks.filter((block): block is Extract<SongsOfConquestMobileGuideArticleBlock, { type: "heading" }> => block.type === "heading" && block.level === 2);

  return (
    <PageShell eyebrow="Songs of Conquest Mobile Guide" kicker={article.summary} title={article.title}>
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
              <Link className="hover:text-green-950" href="/songs-of-conquest-mobile">
                Songs of Conquest Mobile
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-green-950" href="/songs-of-conquest-mobile/guides">
                Guides
              </Link>
            </li>
          </ol>
        </nav>

        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">{article.category}</span>
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">Checked {article.lastChecked}</span>
            <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">
              {article.readingTimeMinutes} min read
            </span>
          </div>
        </section>

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

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
            <h2 className="text-base font-black text-green-950">Sources</h2>
            <div className="mt-4 grid gap-2">
              {article.sourceUrls.map((sourceUrl) => (
                <a
                  className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]"
                  href={sourceUrl}
                  key={sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {sourceUrl}
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
            <h2 className="text-base font-black text-green-950">Related links</h2>
            <div className="mt-4 grid gap-2">
              {(article.relatedDataLinks ?? []).map((link) => (
                <Link className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/songs-of-conquest-mobile/guides">
                Songs of Conquest Mobile Guides
              </Link>
            </div>
          </section>
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          {previousArticle ? <NavArticle article={previousArticle} label="Previous guide" /> : <div />}
          {nextArticle ? <NavArticle article={nextArticle} label="Next guide" /> : <div />}
        </section>

        <div>
          <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/songs-of-conquest-mobile/guides">
            Back to Songs of Conquest Mobile Guides
          </Link>
        </div>
      </article>
    </PageShell>
  );
}

function ArticleBlock({ block, index }: { block: SongsOfConquestMobileGuideArticleBlock; index: number }) {
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
          <li key={item}>{renderInlineInternalLinks(item)}</li>
        ))}
      </List>
    );
  }

  return (
    <p className="text-sm font-semibold leading-7 text-green-950/72 sm:text-[0.95rem]" key={`${block.text}-${index}`}>
      {renderInlineInternalLinks(block.text)}
    </p>
  );
}

function renderInlineInternalLinks(text: string) {
  const segments: Array<string | React.ReactElement> = [];
  const linkPattern = /\[([^\]]+)\]\((\/songs-of-conquest-mobile\/[^\s)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(text.slice(lastIndex, match.index));
    }

    segments.push(
      <Link className="font-black text-pond hover:underline" href={match[2]} key={`${match[2]}-${match.index}`}>
        {match[1]}
      </Link>
    );

    lastIndex = linkPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  return segments.length > 0 ? segments : text;
}

function NavArticle({ article, label }: { article: SongsOfConquestMobileGuideArticle; label: string }) {
  return (
    <Link className="group rounded-md border border-green-950/10 bg-white/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-white" href={`/songs-of-conquest-mobile/guides/${article.slug}`}>
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
