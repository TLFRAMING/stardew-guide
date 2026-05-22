import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataCard, SourceLine, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { getAllAnimalProducts, getAllAnimals, getAnimalBySlug } from "@/lib/stardew/data";
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

        <RelatedStardewGuides articles={relatedGuides} title="Guides for animal buildings and bundle planning" />
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
