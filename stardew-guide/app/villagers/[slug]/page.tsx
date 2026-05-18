import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, SourceLine, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { getAllVillagers, getVillagerBySlug } from "@/lib/stardew/data";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const villager = getVillagerBySlug(slug);

  if (!villager) {
    return {
      title: "Villager Not Found | Stardew Guide",
      description: "This Stardew Valley villager page could not be found."
    };
  }

  return {
    title: `${villager.name} Gifts | Stardew Guide`,
    description: villager.beginnerNote ?? villager.description ?? `Gift and schedule notes for ${villager.name}.`
  };
}

export function generateStaticParams() {
  return getAllVillagers().map((villager) => ({ slug: villager.slug }));
}

export default async function VillagerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const villager = getVillagerBySlug(slug);

  if (!villager) {
    notFound();
  }

  return (
    <PageShell eyebrow="Villager Gift Finder" title={villager.name}>
      <DataCard>
        <dl className="grid gap-3 sm:grid-cols-2">
          <Fact label="Name" value={villager.name} />
          <Fact label="Birthday" value={villager.birthday} />
          <Fact label="Location" value={villager.location ?? "needs verification"} />
          <Fact label="Marriage candidate" value={formatMarriageCandidate(villager.marriageCandidate)} />
        </dl>
        <TagList label="Loved gifts" values={villager.lovedGifts} />
        <TagList label="Liked gifts" values={villager.likedGifts} />
        <TagList label="Disliked gifts" values={withFallback(villager.dislikedGifts)} />
        <TagList label="Hated gifts" values={withFallback(villager.hatedGifts)} />
        <section className="mt-5 rounded-md bg-green-950/6 p-4">
          <h2 className="text-sm font-bold text-green-950">Schedule notes</h2>
          <div className="mt-2 space-y-2 text-sm leading-6 text-green-950/72">
            {formatScheduleNotes(villager.scheduleNotes).map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </section>
        <p className="mt-5 rounded-md bg-green-950/6 p-4 text-sm leading-6 text-green-950/72">{villager.beginnerNote}</p>
        <SourceLine lastChecked={villager.lastChecked} sourceUrls={villager.sourceUrls} />
        <p className="mt-4 text-sm font-semibold text-green-950/58">Data may require verification.</p>
      </DataCard>
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

function withFallback(values: string[] | undefined) {
  return values && values.length > 0 ? values : ["needs verification"];
}

function formatMarriageCandidate(value: boolean | "needs verification" | undefined) {
  if (value === true) {
    return "Yes";
  }

  if (value === false) {
    return "No";
  }

  return "needs verification";
}

function formatScheduleNotes(value: string[] | string | "needs verification" | undefined) {
  if (Array.isArray(value) && value.length > 0) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return [value];
  }

  return ["needs verification"];
}
