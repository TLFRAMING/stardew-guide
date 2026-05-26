import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, SourceLine, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { RelatedStardewGuides } from "@/components/RelatedStardewGuides";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { StardewRouteClusterLinks, type StardewRouteCluster } from "@/components/StardewRouteClusterLinks";
import { getAllVillagers, getVillagerBySlug } from "@/lib/stardew/data";
import { getStardewGuideArticlesBySlugs } from "@/lib/stardew/guides";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const villager = getVillagerBySlug(slug);

  if (!villager) {
    return {
      title: "Villager Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley villager page could not be found."
    };
  }

  return {
    title: buildVillagerMetaTitle(villager),
    description: buildVillagerMetaDescription(villager)
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

  const relatedGuides = getStardewGuideArticlesBySlugs([
    "friendship-and-gifts-basics",
    "stardew-valley-festivals-overview",
    "spring-year-one-first-week"
  ]);
  const routeClusters = getVillagerRouteClusters(villager.slug, villager.name);

  return (
    <PageShell eyebrow="Villager Gift Finder" title={villager.name}>
      <div className="space-y-4">
        <DataCard>
          <h2 className="text-xl font-black text-green-950">{villager.name} quick answer</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{buildVillagerQuickAnswer(villager)}</p>
        </DataCard>

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

        <StardewDetailUseGuide
          title={`Use ${villager.name}'s gifts as a weekly friendship plan`}
          problem="A gift page is strongest when it helps you avoid low-value gifts, missed birthdays, and schedule mistakes instead of only listing items."
          steps={[
            `Save one loved gift before ${villager.name}'s birthday on ${villager.birthday}; a birthday gift is the easiest time to turn item knowledge into friendship progress.`,
            "Keep a backup liked gift for weeks when loved gifts are expensive, seasonal, or not available yet.",
            "Check schedule notes before traveling so you do not spend a day carrying the right gift to the wrong place.",
            "Use disliked and hated gifts as a safety filter when you are clearing inventory or preparing festival gifts."
          ]}
          links={[
            { href: "/stardew/guides/friendship-and-gifts-basics", label: "Gift planning guide" },
            { href: "/stardew/villagers", label: "All villagers" }
          ]}
        />

        <StardewRouteClusterLinks clusters={routeClusters} title="Continue this friendship route" />

        <RelatedStardewGuides articles={relatedGuides} title="Guides for gifts, birthdays, and early friendship planning" />
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

function buildVillagerMetaDescription(villager: {
  slug: string;
  name: string;
  birthday: string;
  location?: string;
  lovedGifts: string[];
  likedGifts: string[];
  beginnerNote?: string;
  description?: string;
}) {
  const giftText = [...villager.lovedGifts.slice(0, 2), ...villager.likedGifts.slice(0, 1)].filter(Boolean).join(", ");
  const locationText = villager.location && villager.location !== "needs verification" ? ` Location: ${villager.location}.` : "";

  return `${villager.name} Stardew Valley guide: loved gifts, liked gifts, birthday (${villager.birthday}), schedule notes, location, and friendship planning tips.${giftText ? ` Gift ideas include ${giftText}.` : ""}${locationText}`;
}

function buildVillagerQuickAnswer(villager: {
  name: string;
  birthday: string;
  location?: string | "needs verification";
  lovedGifts: string[];
  likedGifts: string[];
}) {
  const loved = withFallback(villager.lovedGifts).slice(0, 3).join(", ");
  const liked = withFallback(villager.likedGifts).slice(0, 2).join(", ");
  const location = villager.location && villager.location !== "needs verification" ? ` They are associated with ${villager.location}.` : "";

  return `${villager.name}'s birthday is ${villager.birthday}. Start with confirmed loved gifts such as ${loved}; if those are not available, use liked gifts such as ${liked}.${location} Check the schedule notes before planning a birthday or weekly gift route.`;
}

function buildVillagerMetaTitle(villager: { slug: string; name: string }) {
  const focusedTitles: Record<string, string> = {
    evelyn: "Evelyn Stardew Valley Gifts, Birthday, Loved Items, and Schedule",
    george: "George Stardew Valley Gifts, Birthday, Loved Items, and Schedule",
    gus: "Gus Stardew Valley Gifts, Birthday, Loved Items, and Schedule",
    penny: "Penny Stardew Valley Gifts, Birthday, Loved Items, and Schedule",
    wizard: "Wizard Stardew Gifts: Loved Items, Birthday, and Friendship Tips",
    haley: "Haley Stardew Gifts: Loved Items, Birthday, and Friendship Tips"
  };

  return focusedTitles[villager.slug] ?? `${villager.name} Stardew Valley Gifts, Birthday, Loved Items, and Schedule`;
}

function getVillagerRouteClusters(slug: string, name: string): StardewRouteCluster[] {
  const comparisonLinks: Record<string, { href: string; label: string }[]> = {
    wizard: [
      { href: "/stardew/villagers/haley", label: "Haley gifts" },
      { href: "/stardew/villagers/penny", label: "Penny gifts" }
    ],
    evelyn: [
      { href: "/stardew/villagers/george", label: "George gifts" },
      { href: "/stardew/villagers/gus", label: "Gus gifts" }
    ],
    george: [
      { href: "/stardew/villagers/evelyn", label: "Evelyn gifts" },
      { href: "/stardew/villagers/gus", label: "Gus gifts" }
    ],
    haley: [
      { href: "/stardew/villagers/penny", label: "Penny gifts" },
      { href: "/stardew/villagers/wizard", label: "Wizard gifts" }
    ],
    penny: [
      { href: "/stardew/villagers/haley", label: "Haley gifts" },
      { href: "/stardew/villagers/wizard", label: "Wizard gifts" }
    ],
    gus: [
      { href: "/stardew/villagers/evelyn", label: "Evelyn gifts" },
      { href: "/stardew/villagers/george", label: "George gifts" }
    ]
  };

  return [
    {
      title: `${name} gift planning links`,
      description: "Use these links to compare nearby gift pages, check birthday planning, and avoid turning a one-page lookup into a dead end.",
      links: [
        { href: "/stardew/villagers", label: "All villagers" },
        { href: "/stardew/guides/friendship-and-gifts-basics", label: "Gift guide" },
        { href: "/stardew/guides/stardew-valley-festivals-overview", label: "Festival guide" },
        ...(comparisonLinks[slug] ?? [])
      ]
    }
  ];
}
