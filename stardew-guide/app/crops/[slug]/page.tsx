import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, SourceLine } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { getAllCrops, getCropBySlug } from "@/lib/stardew/data";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const crop = getCropBySlug(slug);

  if (!crop) {
    return {
      title: "Crop Not Found | Stardew Guide",
      description: "This Stardew Valley crop page could not be found."
    };
  }

  return {
    title: `${crop.name} Crop Guide | Stardew Guide`,
    description: crop.beginnerNote ?? crop.description ?? `Crop details for ${crop.name}.`
  };
}

export function generateStaticParams() {
  return getAllCrops().map((crop) => ({ slug: crop.slug }));
}

export default async function CropDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const crop = getCropBySlug(slug);

  if (!crop) {
    notFound();
  }

  return (
    <PageShell eyebrow="Crops Database" title={crop.name}>
      <div className="space-y-4">
        <DataCard>
          <p className="text-sm leading-6 text-green-950/72">{crop.description ?? crop.beginnerNote ?? "needs verification"}</p>
        </DataCard>

        <DataCard>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Name" value={crop.name} />
          <Fact label="Seasons" value={crop.seasons.join(" / ")} />
          <Fact label="Seed source" value={formatValueList(crop.seedSource)} />
          <Fact label="Seed price" value={formatGold(crop.seedPrice)} />
          <Fact label="Sell price" value={formatGold(crop.sellPrice)} />
          <Fact label="Growth" value={formatDays(crop.growthDays)} />
          <Fact label="Regrowth" value={formatDays(crop.regrowthDays)} />
          <Fact label="Profit notes" value={crop.profitNotes ?? "needs verification"} />
          <Fact label="Best uses" value={formatValueList(crop.bestUses)} />
        </dl>
        <SourceLine lastChecked={crop.lastChecked} sourceUrls={crop.sourceUrls} />
        </DataCard>

        <DataCard>
          <h2 className="text-xl font-bold text-green-950">Beginner Recommendation</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{buildBeginnerRecommendation(crop)}</p>
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

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}

function formatDays(value: number | "needs verification") {
  return typeof value === "number" ? `${value} days` : value;
}

function formatValueList(value: string[] | string | "needs verification" | undefined) {
  if (Array.isArray(value) && value.length > 0) {
    return value.join(", ");
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return "needs verification";
}

function buildBeginnerRecommendation(crop: {
  beginnerNote: string;
  growthDays: number | "needs verification";
  profitNotes?: string | "needs verification";
  bestUses?: string[] | string | "needs verification";
}) {
  const notes = [crop.beginnerNote];

  if (typeof crop.growthDays === "number") {
    notes.push(`It grows in ${crop.growthDays} days, which helps you plan watering and harvest timing.`);
  }

  if (crop.profitNotes && crop.profitNotes !== "needs verification") {
    notes.push(crop.profitNotes);
  }

  const bestUses = formatValueList(crop.bestUses);
  if (bestUses !== "needs verification") {
    notes.push(`Best uses: ${bestUses}.`);
  }

  return notes.join(" ");
}
