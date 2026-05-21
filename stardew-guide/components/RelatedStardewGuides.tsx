import Link from "next/link";
import type { StardewGuideArticle } from "@/lib/stardew/types";

export function RelatedStardewGuides({
  articles,
  eyebrow = "Related Guides",
  title = "Use these guides with this database"
}: {
  articles: StardewGuideArticle[];
  eyebrow?: string;
  title?: string;
}) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
      <div className="mb-4 flex flex-col gap-2 border-b border-green-950/10 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-green-950/44">{eyebrow}</p>
          <h2 className="mt-1 text-lg font-black text-green-950">{title}</h2>
        </div>
        <Link className="w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/stardew/guides">
          All Guides
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            className="group rounded-md border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-amber-500/35 hover:bg-white"
            href={`/stardew/guides/${article.slug}`}
            key={article.slug}
          >
            <div className="flex flex-wrap gap-2">
              <Chip>{formatLabel(article.category)}</Chip>
              <Chip>{article.readingTimeMinutes} min read</Chip>
            </div>
            <h3 className="mt-3 break-words text-base font-black leading-tight text-green-950 group-hover:text-amber-700">{article.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{article.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">{children}</span>;
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
