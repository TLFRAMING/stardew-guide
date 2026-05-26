import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataCard, SourceLine, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewRouteClusterLinks, type StardewRouteCluster } from "@/components/StardewRouteClusterLinks";
import { getAllAnimalProducts, getAllAnimals, getAnimalBySlug, getArtisanGoodsForInput } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const animal = getAnimalBySlug(slug);

  if (!animal) {
    return {
      title: "Animal Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley animal page could not be found."
    };
  }

  return {
    title: `${animal.name} Animal Guide | Stardew Guide | Player Codex`,
    description: animal.beginnerNote
  };
}

export function generateStaticParams() {
  return getAllAnimals().map((animal) => ({ slug: animal.slug }));
}

export default async function AnimalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const animal = getAnimalBySlug(slug);

  if (!animal) {
    notFound();
  }

  const relatedGuides = getStardewGuideArticlesBySlugs([
    "animals-first-barn-or-coop",
    "community-center-priority-route",
    "first-winter-preparation"
  ]);
  const productLinks = getAllAnimalProducts().filter((product) => animal.products.includes(product.name));
  const artisanOutputs = uniqueBySlug(productLinks.flatMap((product) => getArtisanGoodsForInput(product.name)));
  const contextualClusters = getAnimalRouteClusters(animal.slug);

  return (
    <PageShell eyebrow="Animals Database" title={animal.name}>
      <div className="space-y-4">
        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{animal.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Building" value={animal.building} />
            <Fact label="Unlock" value={animal.unlock} />
            <Fact label="Purchase source" value={animal.purchaseSource} />
            <Fact label="Products" value={animal.products.join(", ")} />
          </dl>
          <TagList label="Care notes" values={animal.careNotes} />
          <SourceLine lastChecked={animal.lastChecked} sourceUrls={animal.sourceUrls} />
        </DataCard>

        {productLinks.length > 0 ? (
          <DataCard>
            <h2 className="text-lg font-black text-green-950">Products from this animal</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">Open the linked product pages to compare sell value, processing use, and bundle relevance.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {productLinks.map((product) => (
                <Link className="rounded-md border border-pond/20 bg-pond/10 px-3 py-2 text-sm font-black text-pond transition hover:bg-pond/15" href={`/stardew/animal-products/${product.slug}`} key={product.slug}>
                  {product.name}
                </Link>
              ))}
            </div>
          </DataCard>
        ) : null}

        {artisanOutputs.length > 0 ? (
          <DataCard>
            <h2 className="text-lg font-black text-green-950">Processing outputs from this animal</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">Open the artisan pages to compare machine, processing time, and output value for this animal product chain.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {artisanOutputs.map((good) => (
                <Link className="rounded-md border border-pond/20 bg-pond/10 px-3 py-2 text-sm font-black text-pond transition hover:bg-pond/15" href={`/stardew/artisan-goods/${good.slug}`} key={good.slug}>
                  {good.name}
                </Link>
              ))}
            </div>
          </DataCard>
        ) : null}

        <StardewRouteClusterLinks clusters={contextualClusters} title="Plan the full animal route" />

        <RelatedStardewGuides articles={relatedGuides} title="Guides for animal buildings and bundle planning" />
      </div>
    </PageShell>
  );
}

function getAnimalRouteClusters(slug: string): StardewRouteCluster[] {
  if (slug === "pig") {
    return [
      {
        title: "Pig to Truffle Oil",
        description: "Use this chain to evaluate Pig timing, Truffle collection, Oil Maker processing, and whether the money guide fits your farm routine.",
        links: [
          { href: "/stardew/animals/pig", label: "Pig" },
          { href: "/stardew/animal-products/truffle", label: "Truffle" },
          { href: "/stardew/artisan-goods/truffle-oil", label: "Truffle Oil" },
          { href: "/stardew/money/pig-truffle-oil-economy", label: "Money guide" }
        ]
      }
    ];
  }

  if (slug === "chicken") {
    return [
      {
        title: "Chicken to Mayonnaise",
        description: "Use this chain when planning your first coop routine: care for Chickens, collect Eggs, and decide when Mayonnaise Machines are worth using.",
        links: [
          { href: "/stardew/animals/chicken", label: "Chicken" },
          { href: "/stardew/animal-products/egg", label: "Egg" },
          { href: "/stardew/artisan-goods/mayonnaise", label: "Mayonnaise" },
          { href: "/stardew/guides/animals-first-barn-or-coop", label: "Animal guide" }
        ]
      }
    ];
  }

  return [];
}

function uniqueBySlug<T extends { slug: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.slug, item])).values());
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-green-950/6 p-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-green-950/48">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-green-950">{value}</dd>
    </div>
  );
}
