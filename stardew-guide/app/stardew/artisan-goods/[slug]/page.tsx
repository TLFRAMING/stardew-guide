import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataCard, SourceLine } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { StardewRouteClusterLinks, type StardewRouteCluster } from "@/components/StardewRouteClusterLinks";
import { getAllAnimalProducts, getAllAnimals, getAllArtisanGoods, getArtisanGoodBySlug } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const good = getArtisanGoodBySlug(slug);

  if (!good) {
    return {
      title: "Artisan Good Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley artisan good page could not be found."
    };
  }

  return {
    title: `${good.name} Artisan Good Guide | Stardew Guide | Player Codex`,
    description: good.beginnerNote
  };
}

export function generateStaticParams() {
  return getAllArtisanGoods().map((good) => ({ slug: good.slug }));
}

export default async function ArtisanGoodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const good = getArtisanGoodBySlug(slug);

  if (!good) {
    notFound();
  }

  const relatedGuides = getStardewGuideArticlesBySlugs([
    "animals-first-barn-or-coop",
    "sprinklers-and-farm-scaling",
    "year-one-fall-preparation"
  ]);
  const animalProducts = getAllAnimalProducts();
  const inputRows = good.inputs.map((input) => ({
    input,
    product: animalProducts.find((product) => product.name === input.itemName)
  }));
  const sourceAnimals = getAllAnimals().filter((animal) => inputRows.some(({ product }) => product?.producedBy.includes(animal.name)));
  const contextualClusters = getArtisanGoodRouteClusters(good.slug);

  return (
    <PageShell eyebrow="Artisan Goods Database" title={good.name}>
      <div className="space-y-4">
        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{good.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Machine" value={good.machine} />
            <Fact label="Processing time" value={good.processingTime} />
            <Fact label="Inputs" value={good.inputs.map((input) => input.itemName).join(", ")} />
            <Fact label="Bundle usage" value={formatList(good.bundleUsage)} />
          </dl>
          <SourceLine lastChecked={good.lastChecked} sourceUrls={good.sourceUrls} />
        </DataCard>

        <StardewDetailUseGuide
          title={`Decide when ${good.name} is worth processing`}
          problem="Artisan pages should help you compare raw inputs, machine time, output value, and farm routine pressure instead of assuming every item should always be processed."
          steps={[
            `Start with the machine requirement: ${good.name} uses ${good.machine}, so capacity matters as much as item value.`,
            `Check processing time before filling every machine. ${good.processingTime} affects whether this fits your current daily loop.`,
            "Compare the input rows against your current animal-product supply, not against a perfect late-game farm.",
            good.bundleUsage.length > 0 ? "Save any required bundle item before treating the output as pure profit." : "If no bundle use is listed, decide based on cash timing, machine availability, and input scarcity."
          ]}
          links={[
            { href: "/stardew/artisan-goods", label: "All artisan goods" },
            { href: "/stardew/guides/animals-first-barn-or-coop", label: "Animal planning guide" }
          ]}
        />

        <DataCard>
          <h2 className="text-lg font-black text-green-950">Input and value reference</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">Use these rows to compare raw inputs with processed output before choosing what to sell or process.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {inputRows.map(({ input, product }) => (
              <div className="rounded-md border border-green-950/10 bg-green-950/[0.025] p-4" key={input.itemName}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-pond/10 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-pond">
                    {input.inputQuantity}x input
                  </span>
                  <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">
                    {input.outputQuantity}x output
                  </span>
                </div>
                <h3 className="mt-3 text-base font-black text-green-950">{input.itemName}</h3>
                {product ? (
                  <Link className="mt-2 inline-flex rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-xs font-black text-pond transition hover:bg-pond/15" href={`/stardew/animal-products/${product.slug}`}>
                    Open animal product
                  </Link>
                ) : null}
                <dl className="mt-3 grid gap-2 sm:grid-cols-3">
                  <Fact label="Output value" value={formatGold(input.sellPrice)} />
                  <Fact label="With Artisan" value={formatGold(input.artisanSellPrice)} />
                  <Fact label="Quality" value={input.outputQuality} />
                </dl>
                <p className="mt-3 text-xs font-semibold leading-5 text-green-950/56">{input.note}</p>
              </div>
            ))}
          </div>
        </DataCard>

        {sourceAnimals.length > 0 ? (
          <DataCard>
            <h2 className="text-lg font-black text-green-950">Animal sources for these inputs</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/62">Open the animal pages to check building tier, unlock path, care notes, and seasonal constraints before scaling this processing route.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {sourceAnimals.map((animal) => (
                <Link className="rounded-md border border-pond/20 bg-pond/10 px-3 py-2 text-sm font-black text-pond transition hover:bg-pond/15" href={`/stardew/animals/${animal.slug}`} key={animal.slug}>
                  {animal.name}
                </Link>
              ))}
            </div>
          </DataCard>
        ) : null}

        <StardewRouteClusterLinks clusters={contextualClusters} title="Continue this processing route" />

        <RelatedStardewGuides articles={relatedGuides} title="Guides for processing, farm scaling, and animal planning" />
      </div>
    </PageShell>
  );
}

function getArtisanGoodRouteClusters(slug: string): StardewRouteCluster[] {
  if (slug === "truffle-oil") {
    return [
      {
        title: "Pig and Truffle Oil route",
        description: "Use this chain to compare the Pig source, raw Truffle page, Truffle Oil output, and the money guide before committing to a late-barn economy.",
        links: [
          { href: "/stardew/artisan-goods/truffle-oil", label: "Truffle Oil" },
          { href: "/stardew/animal-products/truffle", label: "Truffle" },
          { href: "/stardew/animals/pig", label: "Pig" },
          { href: "/stardew/money/pig-truffle-oil-economy", label: "Money guide" }
        ]
      }
    ];
  }

  if (slug === "mayonnaise") {
    return [
      {
        title: "Chicken and Mayonnaise route",
        description: "Use this chain to connect Chicken care, Egg collection, Mayonnaise processing, and the beginner animal-building guide.",
        links: [
          { href: "/stardew/artisan-goods/mayonnaise", label: "Mayonnaise" },
          { href: "/stardew/animal-products/egg", label: "Egg" },
          { href: "/stardew/animals/chicken", label: "Chicken" },
          { href: "/stardew/guides/animals-first-barn-or-coop", label: "Animal guide" }
        ]
      }
    ];
  }

  return [];
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
