import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { StardewRouteClusterLinks, type StardewRouteCluster } from "@/components/StardewRouteClusterLinks";
import { getAllForage, getForageBySlug } from "@/lib/stardew/data";
import type { ForageItem } from "@/lib/stardew/types";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getForageBySlug(slug);

  if (!item) {
    return {
      title: "Forage Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley forage page could not be found."
    };
  }

  return {
    title: buildForageMetaTitle(item),
    description: buildForageMetaDescription(item)
  };
}

export function generateStaticParams() {
  return getAllForage().map((item) => ({ slug: item.slug }));
}

export default async function ForageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getForageBySlug(slug);

  if (!item) {
    notFound();
  }

  const routeClusters = getForageRouteClusters(item);

  return (
    <PageShell eyebrow="Forage" title={item.name}>
      <div className="space-y-4">
        <DataCard>
          <h2 className="text-xl font-black text-green-950">{item.name} quick answer</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{buildForageQuickAnswer(item)}</p>
        </DataCard>

        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{item.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Name" value={item.name} />
            <Fact label="Sell price" value={formatGold(item.sellPrice)} />
            <Fact label="Bundle usage" value={formatBundleUsage(item.bundleUsage)} />
            <Fact label="Community Center" value={item.bundleUsage.length > 0 ? "Yes" : "No"} highlight={item.bundleUsage.length > 0} />
          </dl>
          <TagList label="Seasons" values={item.seasons} />
          <TagList label="Locations" values={item.locations} />
          <SourceBlock lastChecked={item.lastChecked} sourceUrls={item.sourceUrls} />
        </DataCard>

        <StardewDetailUseGuide
          title={`Decide whether to save or sell ${item.name}`}
          problem="Forage items can look like small cash, but the better choice depends on season pressure, bundle use, gifting, and how hard the item is to replace."
          steps={[
            `Start with the season field. If ${item.name} is seasonal, save one before the season ends unless you are sure it has no bundle or crafting pressure.`,
            item.bundleUsage.length > 0 ? "Because this item appears in bundle usage, store one copy before selling extras." : "If no bundle use is listed, compare the sell price with your current backpack and cash needs.",
            "Use the location field to build a low-effort pickup route instead of turning the whole day into random wandering.",
            "If the item is easy to find again, sell extras; if it is awkward or seasonal, keep a small reserve."
          ]}
          links={[
            { href: "/stardew/forage", label: "All forage" },
            { href: "/stardew/community-center", label: "Community Center" }
          ]}
        />

        <StardewRouteClusterLinks clusters={routeClusters} title="Continue this forage route" />

        <DataCard>
          <h2 className="text-lg font-black text-green-950">Player decision notes for {item.name}</h2>
          <div className="mt-3 space-y-3 text-sm font-semibold leading-6 text-green-950/68">
            <p>
              Forage is easy to underestimate because each pickup looks small on its own. The real value is timing: a seasonal item can solve a bundle, fill a gift need, bridge early cash, or become a low-effort route while you are already walking through {item.locations.join(" / ")}.
            </p>
            <p>
              If {item.name} appears during {item.seasons.join(" / ")}, save at least one copy until you know whether the season has any bundle, crafting, or gift pressure for your current save. Selling every pickup is simple, but it can force an awkward search later when the season is almost over.
            </p>
            <p>
              Once one reserve copy is stored, treat extras according to your current bottleneck. Sell them if backpack space or early cash matters, keep them if the item is hard to replace, or route them into Community Center planning when the bundle field says it has a use.
            </p>
          </div>
        </DataCard>
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

function formatBundleUsage(value: string[]) {
  return value.length > 0 ? value.join(", ") : "None";
}

function buildForageMetaTitle(item: ForageItem) {
  const focusedTitles: Record<string, string> = {
    blackberry: "Blackberry Stardew Valley: Season, Location, Sell Price, and Uses",
    common_mushroom: "Common Mushroom Stardew Valley: Where to Find It, Season, and Uses",
    fiddlehead_fern: "Fiddlehead Fern Stardew Valley: Where to Find It, Bundle Use, and Season",
    magma_cap: "Magma Cap Stardew Valley: Location, Season, Sell Price, and Uses"
  };

  return focusedTitles[item.slug] ?? `${item.name} Stardew Valley: Season, Location, Sell Price, and Uses`;
}

function buildForageMetaDescription(item: ForageItem) {
  return `${item.name} Stardew Valley forage guide: seasons ${item.seasons.join(" / ")}, locations ${item.locations.join(" / ")}, sell price ${formatGold(item.sellPrice)}, and bundle use ${formatBundleUsage(item.bundleUsage)}.`;
}

function buildForageQuickAnswer(item: ForageItem) {
  const bundleText = item.bundleUsage.length > 0 ? ` It is used for ${formatBundleUsage(item.bundleUsage)}, so save one before selling extras.` : " No Community Center bundle use is listed here, so extras are usually more flexible.";
  return `${item.name} appears in ${item.seasons.join(" / ")} and can be found at ${item.locations.join(" / ")}. It sells for ${formatGold(item.sellPrice)}.${bundleText}`;
}

function getForageRouteClusters(item: ForageItem): StardewRouteCluster[] {
  const comparisonLinks: Record<string, { href: string; label: string }[]> = {
    blackberry: [
      { href: "/stardew/forage/salmonberry", label: "Salmonberry" },
      { href: "/stardew/guides/year-one-fall-preparation", label: "Fall prep" }
    ],
    common_mushroom: [
      { href: "/stardew/forage/chanterelle", label: "Chanterelle" },
      { href: "/stardew/forage/morel", label: "Morel" }
    ],
    fiddlehead_fern: [
      { href: "/stardew/community-center", label: "Community Center" },
      { href: "/stardew/guides/early-foraging-habits", label: "Foraging habits" }
    ],
    magma_cap: [
      { href: "/stardew/forage/common_mushroom", label: "Common Mushroom" },
      { href: "/stardew/guides/first-winter-preparation", label: "Winter prep" }
    ]
  };

  return [
    {
      title: `${item.name} planning links`,
      description: "Use these links to compare nearby forage items, bundle pressure, and seasonal save-or-sell decisions.",
      links: [
        { href: "/stardew/forage", label: "All forage" },
        { href: "/stardew/community-center", label: "Community Center" },
        ...(comparisonLinks[item.slug] ?? [])
      ]
    }
  ];
}
