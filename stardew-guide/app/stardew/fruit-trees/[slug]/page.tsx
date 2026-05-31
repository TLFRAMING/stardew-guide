import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { getAllFruitTrees, getFruitTreeBySlug } from "@/lib/stardew/data";
import { displayDays, displayGold, isReviewValue } from "@/lib/stardew/display";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tree = getFruitTreeBySlug(slug);

  if (!tree) {
    return {
      title: "Fruit Tree Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley fruit tree page could not be found."
    };
  }

  return {
    title: `${tree.name} | Stardew Guide | Player Codex`,
    description: tree.beginnerNote ?? `Fruit tree details for ${tree.name}.`
  };
}

export function generateStaticParams() {
  return getAllFruitTrees().map((tree) => ({ slug: tree.slug }));
}

export default async function FruitTreeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tree = getFruitTreeBySlug(slug);

  if (!tree) {
    notFound();
  }

  return (
    <PageShell eyebrow="Fruit Trees" title={tree.name}>
      <div className="space-y-4">
        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{tree.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Name" value={tree.name} />
            <Fact label="Fruit" value={tree.fruitName} />
            <Fact label="Sapling price" value={displayGold(tree.saplingPrice, "Check source")} highlight={isReviewValue(tree.saplingPrice)} />
            <Fact label="Growth" value={formatDays(tree.growthDays)} />
            <Fact label="Fruit sell price" value={displayGold(tree.fruitSellPrice, "Check source")} />
          </dl>
          <TagList label="Harvest season" values={tree.seasons} />
          <SourceBlock lastChecked={tree.lastChecked} sourceUrls={tree.sourceUrls} />
        </DataCard>

        <StardewDetailUseGuide
          title={`Plan ${tree.name} before spending sapling money`}
          problem="Fruit trees are expensive timing decisions. This page should help you avoid planting too late, blocking future layouts, or buying a tree before the harvest season matters."
          steps={[
            `Check the harvest season first: ${tree.fruitName} is tied to ${tree.seasons.join(" / ")} in this database.`,
            `Plan around the growth time. ${tree.name} needs ${formatDays(tree.growthDays)}, so a late sapling may not pay off until a later season or year.`,
            "Place the tree where it will not block future sprinklers, buildings, or pathing.",
            "Before buying, compare the sapling cost with your current tool, animal, sprinkler, and building plans."
          ]}
          links={[
            { href: "/stardew/fruit-trees", label: "All fruit trees" },
            { href: "/stardew/guides/year-one-fall-preparation", label: "Season planning guide" }
          ]}
        />

        <DataCard>
          <h2 className="text-lg font-black text-green-950">Player decision notes for {tree.name}</h2>
          <div className="mt-3 space-y-3 text-sm font-semibold leading-6 text-green-950/68">
            <p>
              Treat {tree.name} as a long-term farm layout choice, not a quick cash purchase. The sapling cost is paid up front, the tree needs an uninterrupted growth window, and the payoff depends on whether you will actually collect {tree.fruitName} during {tree.seasons.join(" / ")}.
            </p>
            <p>
              Before buying, ask what the tree is solving. It may support fruit collection, gifting, bundles, artisan planning, or a complete orchard route, but it can also delay tool upgrades, animals, or sprinklers if the farm is still short on basic infrastructure.
            </p>
            <p>
              A safe beginner approach is to plant fruit trees only after the tile plan is stable. If you are still moving paths, buildings, scarecrows, or sprinklers every few days, hold the money until the orchard space will not need to be rebuilt.
            </p>
          </div>
        </DataCard>
      </div>
    </PageShell>
  );
}

function Fact({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md p-3 ${highlight ? "bg-amber-50/80" : "bg-green-950/6"}`}>
      <dt className="text-xs font-bold uppercase tracking-wide text-green-950/48">{label}</dt>
      <dd className={`mt-1 text-sm font-semibold ${highlight ? "text-amber-800" : "text-green-950"}`}>{value}</dd>
    </div>
  );
}

function SourceBlock({ lastChecked, sourceUrls }: { lastChecked: string; sourceUrls: string[] }) {
  if (sourceUrls.length === 0) {
    return <p className="mt-5 text-xs leading-5 text-green-950/52">Last checked: {lastChecked} · Sources are being verified.</p>;
  }

  return (
    <p className="mt-5 text-xs leading-5 text-green-950/52">
      Last checked: {lastChecked} · Source:{" "}
      <a className="font-semibold text-pond hover:underline" href={sourceUrls[0]} rel="noreferrer" target="_blank">
        Stardew Valley Wiki
      </a>
    </p>
  );
}

function formatDays(value: number | "needs verification") {
  return displayDays(value);
}
