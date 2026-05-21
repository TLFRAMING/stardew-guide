import Link from "next/link";
import type { StardewGuideArticle as StardewGuideArticleType } from "@/lib/stardew/types";

const categoryLabels: Record<string, string> = {
  beginner: "Beginner",
  fishing: "Fishing",
  mining: "Mining",
  progression: "Progression"
};

export function StardewGuideArticle({ article }: { article: StardewGuideArticleType }) {
  return (
    <article className="space-y-5">
      <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap gap-2">
          <Chip>{categoryLabels[article.category] ?? formatLabel(article.category)}</Chip>
          <Chip>Last checked {article.lastChecked}</Chip>
          <Chip>{formatConfidence(article.confidence)}</Chip>
          <Chip>{formatPatchSensitivity(article.patchSensitivity)}</Chip>
          <Chip>{article.readingTimeMinutes} min read</Chip>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-green-950/62">
          This guide is original player-facing strategy content based on verified game references. It avoids fixed speed routes, exact income promises, and unverified social claims.
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

            if (block.type === "list") {
              const List = block.ordered ? "ol" : "ul";

              return (
                <List className={`space-y-2 pl-5 text-sm font-semibold leading-7 text-green-950/72 ${block.ordered ? "list-decimal" : "list-disc"}`} key={`list-${index}`}>
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
          })}
        </div>
      </section>

      <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-base font-black text-green-950">Sources</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
              These links verify mechanics and timing references. The guide text is original strategy writing, not copied source text.
            </p>
          </div>
          <div className="grid gap-2">
            {article.sourceUrls.map((url) => (
              <a
                className="break-words rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]"
                href={url}
                key={url}
                rel="noreferrer"
                target="_blank"
              >
                {url}
              </a>
            ))}
          </div>
        </div>
      </section>

      {article.relatedDataLinks && article.relatedDataLinks.length > 0 ? (
        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-base font-black text-green-950">Related Stardew References</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                Use these database pages alongside the guide when you need item, fish, crop, bundle, or money-route details.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {article.relatedDataLinks.map((link) => (
                <Link
                  className="rounded-sm border border-green-950/10 bg-green-950/[0.035] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div>
        <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/stardew/guides">
          Back to Stardew guides
        </Link>
      </div>
    </article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">{children}</span>;
}

function formatConfidence(value: string) {
  return value === "needs verification" ? "Needs verification" : `${formatLabel(value)} confidence`;
}

function formatPatchSensitivity(value: string) {
  return `${formatLabel(value)} patch sensitivity`;
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
