import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, SourceLine } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllAnimalProducts, getAnimalProductBySlug } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getAnimalProductBySlug(slug);

  if (!product) {
    return {
      title: "Animal Product Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley animal product page could not be found."
    };
  }

  return {
    title: `${product.name} Animal Product Guide | Stardew Guide | Player Codex`,
    description: product.beginnerNote
  };
}

export function generateStaticParams() {
  return getAllAnimalProducts().map((product) => ({ slug: product.slug }));
}

export default async function AnimalProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getAnimalProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedGuides = getStardewGuideArticlesBySlugs([
    "animals-first-barn-or-coop",
    "community-center-priority-route",
    "first-winter-preparation"
  ]);

  return (
    <PageShell eyebrow="Animal Products Database" title={product.name}>
      <div className="space-y-4">
        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{product.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Source" value={product.sourceBuilding} />
            <Fact label="Produced by" value={product.producedBy.join(", ")} />
            <Fact label="Sell price" value={formatGold(product.sellPrice)} />
            <Fact label="Processing" value={formatList(product.processingUses)} />
            <Fact label="Bundle usage" value={formatList(product.bundleUsage)} />
          </dl>
          <SourceLine lastChecked={product.lastChecked} sourceUrls={product.sourceUrls} />
        </DataCard>

        <RelatedStardewGuides articles={relatedGuides} title="Guides for animal products, bundles, and farm planning" />
      </div>
    </PageShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-green-950/6 p-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-green-950/48">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-green-950">{value}</dd>
    </div>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}

function formatList(value: string[]) {
  return value.length > 0 ? value.join(", ") : "None listed";
}
