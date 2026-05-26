import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { getAllForage, getForageBySlug } from "@/lib/stardew/data";

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
    title: `${item.name} | Stardew Guide | Player Codex`,
    description: item.beginnerNote ?? `Forage details for ${item.name}.`
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

  return (
    <PageShell eyebrow="Forage" title={item.name}>
      <div className="space-y-4">
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

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}

function formatBundleUsage(value: string[]) {
  return value.length > 0 ? value.join(", ") : "None";
}
