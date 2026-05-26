import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, SourceLine } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { StardewRouteClusterLinks, type StardewRouteCluster } from "@/components/StardewRouteClusterLinks";
import { getAllCrops, getCropBySlug } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";
import type { Crop } from "@/lib/stardew/types";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const crop = getCropBySlug(slug);

  if (!crop) {
    return {
      title: "Crop Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley crop page could not be found."
    };
  }

  return {
    title: buildCropMetaTitle(crop),
    description: buildCropMetaDescription(crop)
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

  const relatedGuides = getStardewGuideArticlesBySlugs(getRelatedCropGuideSlugs(crop));
  const routeClusters = getCropRouteClusters(crop);

  return (
    <PageShell eyebrow="Crops Database" title={crop.name}>
      <div className="space-y-4">
        <DataCard>
          <h2 className="text-xl font-black text-green-950">{crop.name} quick answer</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{buildCropQuickAnswer(crop)}</p>
        </DataCard>

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

        <StardewDetailUseGuide
          title={`Decide whether ${crop.name} fits this season`}
          problem="A crop page should help you avoid buying seeds that miss the harvest window, overload your watering time, or distract from bundles and tool upgrades."
          steps={[
            `Count the remaining days before planting. ${crop.name} needs ${formatDays(crop.growthDays)}, so late-season purchases need extra caution.`,
            "Check whether regrowth matters. Regrowing crops reward early planting, while one-time crops are easier to fit into short windows.",
            "Compare seed cost, sell price, and best uses against your current goal: cash, bundles, cooking, gifting, or processing.",
            "Before scaling the crop, confirm scarecrow coverage and sprinkler capacity so the field does not become an energy trap."
          ]}
          links={[
            { href: "/stardew/guides/sprinklers-and-farm-scaling", label: "Farm scaling guide" },
            { href: "/stardew/crops", label: "All crops" }
          ]}
        />

        <StardewRouteClusterLinks clusters={routeClusters} title="Continue this crop route" />

        <RelatedStardewGuides articles={relatedGuides} title="Guides for crop timing, protection, and farm scaling" />
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

function buildCropMetaDescription(crop: Crop) {
  return `${crop.name} Stardew Valley crop guide: season ${crop.seasons.join(" / ")}, seed source ${formatValueList(crop.seedSource)}, growth ${formatDays(crop.growthDays)}, regrowth ${formatDays(crop.regrowthDays)}, sell price ${formatGold(crop.sellPrice)}, and best uses.`;
}

function buildCropQuickAnswer(crop: Crop) {
  const season = crop.seasons.join(" / ");
  const growth = formatDays(crop.growthDays);
  const regrowth = formatDays(crop.regrowthDays);
  const sellPrice = formatGold(crop.sellPrice);
  const seedSource = formatValueList(crop.seedSource);
  const regrowthText = regrowth === "needs verification" ? "" : ` Regrowth: ${regrowth}.`;

  const uses = formatValueList(crop.bestUses);
  const usesText = uses === "needs verification" ? "" : ` Best uses: ${uses}.`;

  return `${crop.name} grows in ${season}. It takes ${growth}, sells for ${sellPrice}, and comes from ${seedSource}.${regrowthText}${usesText} Use the guide links below when deciding whether this crop fits your season plan, scarecrow coverage, or sprinkler transition.`;
}

function buildCropMetaTitle(crop: Crop) {
  const focusedTitles: Record<string, string> = {
    amaranth: "Amaranth Stardew Valley: Growth Time, Season, Price, and Uses",
    "blue-jazz": "Blue Jazz Stardew Valley: Growth Time, Season, Price, and Uses",
    cranberries: "Cranberries Stardew Valley: Growth Time, Regrowth, Profit, and Uses",
    "red-cabbage": "Red Cabbage Stardew Valley: Seeds, Growth Time, Bundle Use, and Year 1 Tips",
    starfruit: "Starfruit Stardew Valley: Seeds, Growth Time, Price, Wine, and Uses",
    wheat: "Wheat Stardew Valley: Growth Time, Hay, Beer, and Summer/Fall Uses"
  };

  return focusedTitles[crop.slug] ?? `${crop.name} Stardew Valley: Season, Growth Time, Price, and Uses`;
}

function getRelatedCropGuideSlugs(crop: Crop) {
  const slugs = ["sprinklers-and-farm-scaling", "first-scarecrow-crop-protection"];
  const seasonSet = new Set(crop.seasons);

  if (seasonSet.has("Spring")) {
    slugs.push("spring-year-one-first-week");
  }

  if (seasonSet.has("Fall")) {
    slugs.push("year-one-fall-preparation");
  }

  slugs.push("first-sprinkler-transition");
  return [...new Set(slugs)];
}

function getCropRouteClusters(crop: Crop): StardewRouteCluster[] {
  const comparisonLinks: Record<string, { href: string; label: string }[]> = {
    cranberries: [
      { href: "/stardew/crops/wheat", label: "Wheat" },
      { href: "/stardew/guides/year-one-fall-preparation", label: "Fall prep" }
    ],
    "red-cabbage": [
      { href: "/stardew/community-center", label: "Community Center" },
      { href: "/stardew/guides/community-center-priority-route", label: "Bundle guide" }
    ],
    wheat: [
      { href: "/stardew/crops/cranberries", label: "Cranberries" },
      { href: "/stardew/guides/first-scarecrow-crop-protection", label: "Scarecrow guide" }
    ],
    starfruit: [
      { href: "/stardew/money/starfruit-wine-burst-profit", label: "Starfruit wine guide" },
      { href: "/stardew/crops/cranberries", label: "Cranberries" }
    ],
    amaranth: [
      { href: "/stardew/crops/wheat", label: "Wheat" },
      { href: "/stardew/guides/year-one-fall-preparation", label: "Fall prep" }
    ],
    "blue-jazz": [
      { href: "/stardew/guides/spring-year-one-first-week", label: "Spring first week" },
      { href: "/stardew/crops/parsnip", label: "Parsnip" }
    ]
  };

  return [
    {
      title: `${crop.name} planning links`,
      description: "Use these links to compare nearby crop pages, bundle pressure, protection needs, and season planning before buying seeds.",
      links: [
        { href: "/stardew/crops", label: "All crops" },
        { href: "/stardew/guides/sprinklers-and-farm-scaling", label: "Sprinklers guide" },
        ...(comparisonLinks[crop.slug] ?? [])
      ]
    }
  ];
}
