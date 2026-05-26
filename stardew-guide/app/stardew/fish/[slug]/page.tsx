import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, SourceLine, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { StardewRouteClusterLinks, type StardewRouteCluster } from "@/components/StardewRouteClusterLinks";
import { getAllFish, getFishBySlug } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";
import type { Fish } from "@/lib/stardew/types";

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
    title: buildFishMetaTitle(item),
    description: buildFishMetaDescription(item)
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

  const relatedGuides = getStardewGuideArticlesBySlugs(getRelatedFishGuideSlugs(item));
  const routeClusters = getFishRouteClusters(item);

  return (
    <PageShell eyebrow="Fish Calendar" title={item.name}>
      <div className="space-y-4">
        <DataCard>
          <h2 className="text-xl font-black text-green-950">{item.name} quick answer</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{buildFishQuickAnswer(item)}</p>
        </DataCard>

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

        <StardewDetailUseGuide
          title={`Plan a ${item.name} catch without wasting the season`}
          problem="Fish pages are most useful when you turn the season, weather, time, and location fields into a short fishing plan before the day starts."
          steps={[
            `Check the season first: ${item.name} is only useful to chase when ${item.seasons.join(" / ")} is active.`,
            `Match the time window before traveling. If the window is narrow, finish watering, animals, or mining plans before committing to the fishing trip.`,
            `Use the location and weather fields together. A correct location on the wrong weather day is still a failed trip.`,
            formatBundleUsage(item.bundleUsage) === "Yes" ? "If you need this for a bundle, catch and store one before selling extras." : "If there is no bundle pressure, compare the sell price against your current money route before spending a full day on it."
          ]}
          links={[
            { href: "/stardew/guides/fishing-season-weather-planning", label: "Fishing planning guide" },
            { href: "/stardew/fish", label: "All fish" }
          ]}
        />

        <StardewRouteClusterLinks clusters={routeClusters} title="Continue this fish route" />

        <RelatedStardewGuides articles={relatedGuides} title="Guides for fish timing, weather windows, and bundle planning" />
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

function buildFishMetaDescription(item: Fish) {
  return `${item.name} Stardew Valley guide: where to catch it, seasons ${item.seasons.join(" / ")}, locations ${item.locations.join(", ")}, time ${item.time}, weather ${item.weather.join(", ")}, difficulty ${item.difficulty}, sell price ${formatGold(item.sellPrice)}, and bundle use.`;
}

function buildFishQuickAnswer(item: Fish) {
  const bundle = formatBundleUsage(item.bundleUsage);
  const bundleText = bundle === "Yes" ? " It is used for a Community Center bundle, so check the guide links before the season changes." : " It is not listed for a standard Community Center bundle in this database.";

  return `${item.name} is caught at ${item.locations.join(", ")} during ${item.seasons.join(" / ")}. Time window: ${item.time}. Weather: ${item.weather.join(", ")}. Difficulty: ${item.difficulty}. Base sell price: ${formatGold(item.sellPrice)}.${bundleText}`;
}

function buildFishMetaTitle(item: Fish) {
  const focusedTitles: Record<string, string> = {
    bream: "Bream Stardew Valley: Location, Time, Season, Weather, and Uses",
    bullhead: "Bullhead Stardew Valley: Location, Season, Time, Difficulty, and Uses",
    halibut: "Halibut Stardew Valley: Where to Catch, Season, Time, and Uses",
    "radioactive-carp": "Radioactive Carp Stardew Valley: Location, Season, Time, and Uses",
    "spook-fish": "Spook Fish Stardew Valley: Location, Season, Time, and Uses",
    sturgeon: "Sturgeon Stardew Valley: Location, Season, Time, Weather, and Uses",
    "tiger-trout": "Tiger Trout Stardew Valley: Location, Season, Time, Weather, and Uses"
  };

  return focusedTitles[item.slug] ?? `${item.name} Stardew Valley: Location, Time, Season, Weather, and Uses`;
}

function getRelatedFishGuideSlugs(item: Fish) {
  const slugs = ["fishing-season-weather-planning", "fishing-early-game-cash"];
  const needsWeatherPlanning = item.weather.some((weather) => weather.toLowerCase() !== "any");

  if (needsWeatherPlanning) {
    slugs.push("rainy-day-planning");
  }

  if (formatBundleUsage(item.bundleUsage) === "Yes") {
    slugs.push("community-center-priority-route");
  }

  return [...new Set(slugs)];
}

function getFishRouteClusters(item: Fish): StardewRouteCluster[] {
  const links = [
    { href: "/stardew/fish", label: "All fish" },
    { href: "/stardew/guides/fishing-season-weather-planning", label: "Fishing guide" }
  ];

  if (formatBundleUsage(item.bundleUsage) === "Yes") {
    links.push({ href: "/stardew/community-center", label: "Community Center" });
  }

  if (item.weather.some((weather) => weather.toLowerCase() !== "any")) {
    links.push({ href: "/stardew/guides/rainy-day-planning", label: "Rain planning" });
  }

  const comparisonLinks: Record<string, { href: string; label: string }[]> = {
    bream: [
      { href: "/stardew/fish/halibut", label: "Halibut" },
      { href: "/stardew/fish/tiger-trout", label: "Tiger Trout" }
    ],
    halibut: [
      { href: "/stardew/fish/bream", label: "Bream" },
      { href: "/stardew/fish/sardine", label: "Sardine" }
    ],
    "tiger-trout": [
      { href: "/stardew/fish/bream", label: "Bream" },
      { href: "/stardew/fish/shad", label: "Shad" }
    ],
    bullhead: [
      { href: "/stardew/fish/bream", label: "Bream" },
      { href: "/stardew/fish/tiger-trout", label: "Tiger Trout" },
      { href: "/stardew/fish/sturgeon", label: "Sturgeon" }
    ],
    sardine: [
      { href: "/stardew/fish/halibut", label: "Halibut" },
      { href: "/stardew/fish/bream", label: "Bream" }
    ],
    shad: [
      { href: "/stardew/fish/bream", label: "Bream" },
      { href: "/stardew/fish/tiger-trout", label: "Tiger Trout" }
    ],
    sturgeon: [
      { href: "/stardew/fish/bullhead", label: "Bullhead" },
      { href: "/stardew/fish/tiger-trout", label: "Tiger Trout" }
    ],
    "radioactive-carp": [
      { href: "/stardew/fish/spook-fish", label: "Spook Fish" },
      { href: "/stardew/fish/sturgeon", label: "Sturgeon" }
    ],
    "spook-fish": [
      { href: "/stardew/fish/radioactive-carp", label: "Radioactive Carp" },
      { href: "/stardew/fish/sturgeon", label: "Sturgeon" }
    ]
  };

  return [
    {
      title: `${item.name} planning links`,
      description: "Use these links to compare timing, season pressure, weather rules, and bundle planning before the current season ends.",
      links: [...links, ...(comparisonLinks[item.slug] ?? [])]
    }
  ];
}
