import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { getAllMinerals, getMineralBySlug } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";
import type { Mineral } from "@/lib/stardew/types";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getMineralBySlug(slug);

  if (!item) {
    return {
      title: "Mineral Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley mineral page could not be found."
    };
  }

  return {
    title: buildMineralMetaTitle(item),
    description: buildMineralMetaDescription(item)
  };
}

export function generateStaticParams() {
  return getAllMinerals().map((item) => ({ slug: item.slug }));
}

export default async function MineralDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getMineralBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedGuides = getStardewGuideArticlesBySlugs(["first-museum-donations", "mining-first-month"]);

  return (
    <PageShell eyebrow="Minerals" title={item.name}>
      <div className="space-y-4">
        <DataCard>
          <h2 className="text-xl font-black text-green-950">{item.name} quick answer</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{buildMineralQuickAnswer(item)}</p>
        </DataCard>

        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{item.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Name" value={item.name} />
            <Fact label="Sell price" value={formatGold(item.sellPrice)} />
            <Fact label="Uses" value={formatUses(item.uses)} />
            <Fact label="Museum donation" value={item.museumDonation ? "Yes" : "No"} highlight={item.museumDonation} />
          </dl>
          <TagList label="Locations" values={item.locations} />
          <SourceBlock lastChecked={item.lastChecked} sourceUrls={item.sourceUrls} />
        </DataCard>

        <StardewDetailUseGuide
          title={`Use ${item.name} without losing museum progress`}
          problem="Mineral pages are most useful when they separate first-donation decisions from sell, gift, crafting, or fish pond choices."
          steps={[
            item.museumDonation ? "Donate the first copy before treating later copies as flexible resources." : "Because this item is not marked as a museum donation here, check its listed uses before selling extras.",
            "If the item came from a geode, decide whether your next mining day needs more geodes, ore, or ladder progress before spending more money at the Blacksmith.",
            "Use the locations field to choose the lowest-friction source instead of chasing every possible source at once.",
            "When a use is marked in the data, keep one spare until the related goal is complete."
          ]}
          links={[
            { href: "/stardew/guides/first-museum-donations", label: "Museum donation guide" },
            { href: "/stardew/minerals", label: "All minerals" }
          ]}
        />

        <RelatedStardewGuides articles={relatedGuides} title="Guides for museum donations, geodes, and early mining choices" />
      </div>
    </PageShell>
  );
}

function Fact({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md p-3 ${highlight ? "bg-meadow/10" : "bg-green-950/6"}`}>
      <dt className="text-xs font-bold uppercase tracking-wide text-green-950/48">{label}</dt>
      <dd className={`mt-1 text-sm font-semibold ${highlight ? "text-meadow" : "text-green-950"}`}>{value}</dd>
    </div>
  );
}

function SourceBlock({ lastChecked, sourceUrls }: { lastChecked: string; sourceUrls: string[] }) {
  if (sourceUrls.length === 0) {
    return <p className="mt-5 text-xs leading-5 text-green-950/52">Last checked: {lastChecked} | Sources are being verified.</p>;
  }

  return (
    <p className="mt-5 text-xs leading-5 text-green-950/52">
      Last checked: {lastChecked} | Source:{" "}
      <a className="font-semibold text-pond hover:underline" href={sourceUrls[0]} rel="noreferrer" target="_blank">
        Stardew Valley Wiki
      </a>
    </p>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}

function formatUses(value: string[]) {
  return value.length > 0 ? value.join(", ") : "None";
}

function buildMineralMetaTitle(item: Mineral) {
  const focusedTitles: Record<string, string> = {
    basalt: "Basalt Stardew Valley: How to Get It, Museum Use, Fish Pond, and Gifts"
  };

  return focusedTitles[item.slug] ?? `${item.name} Stardew Valley: How to Get It, Museum Use, and Gifts`;
}

function buildMineralMetaDescription(item: Mineral) {
  return `${item.name} Stardew Valley mineral guide: locations ${item.locations.join(", ")}, sell price ${formatGold(item.sellPrice)}, uses ${formatUses(item.uses)}, and museum donation status.`;
}

function buildMineralQuickAnswer(item: Mineral) {
  const museum = item.museumDonation ? "Donate one to the Museum before treating extras as flexible use items." : "It is not marked as a Museum donation in this database.";
  return `${item.name} can be found from ${item.locations.join(", ")}. It sells for ${formatGold(item.sellPrice)} and is used for ${formatUses(item.uses)}. ${museum}`;
}
