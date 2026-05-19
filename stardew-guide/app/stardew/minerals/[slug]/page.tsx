import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { getAllMinerals, getMineralBySlug } from "@/lib/stardew/data";

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
    title: `${item.name} | Stardew Guide | Player Codex`,
    description: item.beginnerNote ?? `Mineral details for ${item.name}.`
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

  return (
    <PageShell eyebrow="Minerals" title={item.name}>
      <div className="space-y-4">
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
