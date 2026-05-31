import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { getAllArtifacts, getArtifactBySlug } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getArtifactBySlug(slug);

  if (!item) {
    return {
      title: "Artifact Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley artifact page could not be found."
    };
  }

  return {
    title: `${item.name} Stardew Valley: Museum Donation, Sell Price, and Uses`,
    description: `${item.name} artifact guide: museum status, sell price ${formatGold(item.sellPrice)}, tailoring, Bone Mill use, and whether to save the first copy.`
  };
}

export function generateStaticParams() {
  return getAllArtifacts().map((item) => ({ slug: item.slug }));
}

export default async function ArtifactDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getArtifactBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedGuides = getStardewGuideArticlesBySlugs(["first-museum-donations", "mining-first-month"]);

  return (
    <PageShell eyebrow="Artifacts" title={item.name}>
      <div className="space-y-4">
        <DataCard>
          <h2 className="text-xl font-black text-green-950">{item.name} quick answer</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{item.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Sell price" value={formatGold(item.sellPrice)} />
            <Fact label="Museum donation" value={item.museumDonation ? "Yes" : "No"} highlight={item.museumDonation} />
            <Fact label="Bone Mill" value={item.boneMill ? "Yes" : "No"} />
            <Fact label="Tailoring" value={item.tailoring ? "Yes" : "No"} />
          </dl>
          <SourceBlock lastChecked={item.lastChecked} sourceUrls={item.sourceUrls} />
        </DataCard>

        <StardewDetailUseGuide
          title={`Use ${item.name} without losing museum progress`}
          problem="Artifact pages are most useful when they separate the first museum copy from duplicate uses."
          steps={[
            item.museumDonation ? "Donate the first copy before treating duplicates as flexible items." : "Check the listed use fields before selling or gifting extras.",
            "Keep one spare if tailoring, Bone Mill, fish pond, or gift planning matters to your current farm.",
            "If the item came from a rare source, do not sell it until the museum and current collection goals are checked."
          ]}
          links={[
            { href: "/stardew/artifacts", label: "All artifacts" },
            { href: "/stardew/guides/first-museum-donations", label: "Museum donation guide" }
          ]}
        />

        <RelatedStardewGuides articles={relatedGuides} title="Guides for donations and collection planning" />
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
  return (
    <p className="mt-5 text-xs leading-5 text-green-950/52">
      Last checked: {lastChecked} | Source:{" "}
      {sourceUrls[0] ? (
        <a className="font-semibold text-pond hover:underline" href={sourceUrls[0]} rel="noreferrer" target="_blank">
          Stardew Valley Wiki
        </a>
      ) : (
        "Local Stardew database"
      )}
    </p>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}
