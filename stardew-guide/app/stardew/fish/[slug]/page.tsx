import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, SourceLine, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { getAllFish, getFishBySlug } from "@/lib/stardew/data";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getFishBySlug(slug);

  if (!item) {
    return {
      title: "Fish Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley fish page could not be found."
    };
  }

  return {
    title: `${item.name} Fish Guide | Stardew Guide | Player Codex`,
    description: item.beginnerNote ?? item.description ?? `Fish details for ${item.name}.`
  };
}

export function generateStaticParams() {
  return getAllFish().map((item) => ({ slug: item.slug }));
}

export default async function FishDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getFishBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <PageShell eyebrow="Fish Calendar" title={item.name}>
      <div className="space-y-4">
        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{item.description ?? item.beginnerNote ?? "needs verification"}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Fact label="Name" value={item.name} />
            <Fact label="Seasons" value={item.seasons.join(" / ")} />
            <Fact label="Weather" value={item.weather.join(", ")} />
            <Fact label="Time" value={item.time} />
            <Fact label="Locations" value={item.locations.join(", ")} />
            <Fact label="Difficulty" value={String(item.difficulty)} />
            <Fact label="Sell price" value={formatGold(item.sellPrice)} />
            <Fact label="Bundle usage" value={formatValueList(item.bundleUsage)} />
            <Fact label="Community Center bundle" value={formatBundleUsage(item.bundleUsage)} />
          </dl>
          <SourceLine lastChecked={item.lastChecked} sourceUrls={item.sourceUrls} />
        </DataCard>

        <DataCard>
          <h2 className="text-xl font-bold text-green-950">How to catch</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{buildHowToCatch(item)}</p>
          <TagList label="Weather" values={item.weather} />
        </DataCard>
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

function formatGold(value: number | "needs verification" | undefined) {
  return typeof value === "number" ? `${value}g` : value ?? "needs verification";
}

function formatValueList(value: string[] | string | "needs verification" | undefined) {
  if (Array.isArray(value) && value.length === 0) {
    return "None";
  }

  if (Array.isArray(value) && value.length > 0) {
    return value.join(", ");
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return "needs verification";
}

function formatBundleUsage(value: string[] | string | "needs verification" | undefined) {
  const usage = formatValueList(value);

  if (usage === "needs verification") {
    return "needs verification";
  }

  return usage.toLowerCase() === "none" ? "No" : "Yes";
}

function buildHowToCatch(item: {
  name: string;
  seasons: string[];
  locations: string[];
  time: string;
  weather: string[];
}) {
  return `Look for ${item.name} during ${item.seasons.join(" / ")} at ${item.locations.join(", ")}. Time: ${item.time}. Weather: ${item.weather.join(", ")}.`;
}
