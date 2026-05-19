import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { getAllFruitTrees, getFruitTreeBySlug } from "@/lib/stardew/data";

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
            <Fact label="Sapling price" value={formatGoldOrReview(tree.saplingPrice)} highlight={tree.saplingPrice === "needs verification"} />
            <Fact label="Growth" value={formatDays(tree.growthDays)} />
            <Fact label="Fruit sell price" value={formatGoldOrReview(tree.fruitSellPrice)} />
          </dl>
          <TagList label="Harvest season" values={tree.seasons} />
          <SourceBlock lastChecked={tree.lastChecked} sourceUrls={tree.sourceUrls} />
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

function formatGoldOrReview(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : "Under review";
}

function formatDays(value: number | "needs verification") {
  return typeof value === "number" ? `${value} days` : value;
}
