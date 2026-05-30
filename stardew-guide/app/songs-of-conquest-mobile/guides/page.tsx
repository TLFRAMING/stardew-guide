import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllSongsOfConquestMobileGuideArticles } from "@/lib/songs-of-conquest-mobile/data";
import type { SongsOfConquestMobileGuideArticle } from "@/lib/songs-of-conquest-mobile/types";

export const metadata: Metadata = {
  title: "Songs of Conquest Mobile Guides: Beginner Campaign, Factions, and Combat | Player Codex",
  description:
    "Songs of Conquest Mobile guide hub for first campaign decisions, faction choice, tactical combat positioning, Wielders, resources, towns, and mobile play sessions.",
  alternates: {
    canonical: "https://playercodex.app/songs-of-conquest-mobile/guides"
  },
  openGraph: {
    title: "Songs of Conquest Mobile Guides | Player Codex",
    description:
      "Beginner-focused Songs of Conquest Mobile guides for campaign decisions, faction choice, tactical combat positioning, Wielders, resources, and towns.",
    url: "https://playercodex.app/songs-of-conquest-mobile/guides",
    siteName: "Player Codex",
    type: "website"
  }
};

export default function SongsOfConquestMobileGuidesPage() {
  const articles = getAllSongsOfConquestMobileGuideArticles();
  const firstCampaign = articles.find((article) => article.slug === "beginner-first-campaign");
  const factionChoice = articles.find((article) => article.slug === "faction-choice-framework");
  const combatBasics = articles.find((article) => article.slug === "combat-positioning-basics");

  return (
    <PageShell
      eyebrow="Songs of Conquest Mobile Guides"
      kicker="Mobile-first strategy guides for campaign decisions, faction learning paths, tactical combat, and army preservation."
      title="Songs of Conquest Mobile Guides"
    >
      <div className="space-y-5">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/50">
              Beginner route
            </span>
            <p className="text-sm font-semibold leading-6 text-green-950/72">
              Start with the first campaign guide if you are learning how the map, town, Wielder, and army decisions fit together. Then use the faction and combat pages to make cleaner choices before committing resources or taking risky fights.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {firstCampaign ? (
                <Link className="rounded-sm border border-green-950/14 bg-green-950/[0.06] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.1]" href={`/songs-of-conquest-mobile/guides/${firstCampaign.slug}`}>
                  First campaign decisions
                </Link>
              ) : null}
              {factionChoice ? (
                <Link className="rounded-sm border border-green-950/14 bg-white/70 px-3 py-2 text-sm font-black text-green-950 transition hover:bg-white" href={`/songs-of-conquest-mobile/guides/${factionChoice.slug}`}>
                  Choose a learning path
                </Link>
              ) : null}
              {combatBasics ? (
                <Link className="rounded-sm border border-green-950/14 bg-white/70 px-3 py-2 text-sm font-black text-green-950 transition hover:bg-white" href={`/songs-of-conquest-mobile/guides/${combatBasics.slug}`}>
                  Preserve your army
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <PathCard
            href="/songs-of-conquest-mobile/guides/beginner-first-campaign"
            label="Campaign start"
            title="First map feels scattered?"
            text="Use objective, town, Wielder, and army checks before clicking through turns."
          />
          <PathCard
            href="/songs-of-conquest-mobile/guides/faction-choice-framework"
            label="Faction choice"
            title="Not sure what to play?"
            text="Choose a faction by learning curve, army readability, resource comfort, and mobile session fit."
          />
          <PathCard
            href="/songs-of-conquest-mobile/guides/combat-positioning-basics"
            label="Combat basics"
            title="Winning fights but losing tempo?"
            text="Protect key stacks, read threat before advancing, and choose fights that move the map forward."
          />
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-5 sm:px-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-black text-green-950">Guide set</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">
                These pages are written for players who want practical mobile play decisions: what to check first, when to delay a fight, how to compare factions, and how to keep the campaign readable between sessions.
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
          <Link className="inline-flex w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]" href="/songs-of-conquest-mobile">
            Back to Songs of Conquest Mobile
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

function GuideCard({ article }: { article: SongsOfConquestMobileGuideArticle }) {
  return (
    <Link className="group rounded-sm border border-green-950/10 bg-green-950/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-green-950/20 hover:bg-green-950/[0.045]" href={`/songs-of-conquest-mobile/guides/${article.slug}`}>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-sm bg-green-950/[0.06] px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/50">{article.category}</span>
        <span className="rounded-sm bg-white/60 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/45">
          {article.readingTimeMinutes} min read
        </span>
      </div>
      <h2 className="mt-3 text-base font-black leading-snug text-green-950 group-hover:text-meadow">{article.title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">{article.summary}</p>
    </Link>
  );
}
