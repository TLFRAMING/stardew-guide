import type { Metadata } from "next";
import { CardLink } from "@/components/CardLink";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Player Codex | Stardew Guide",
  description: "Player Codex hosts fan-made Stardew Valley guides, database tools, villagers, crops, fish, and Community Center bundles."
};

const features = [
  {
    href: "/stardew/guides",
    title: "Beginner Guides",
    description: "Read original Stardew Valley decision guides for first-week planning, energy, mining, fishing, sprinklers, tools, and Fall prep.",
    tone: "guide" as const
  },
  {
    href: "/stardew/villagers",
    title: "Villager Gift Finder",
    description: "Find beginner-friendly loved and liked gifts from local JSON data.",
    tone: "meadow" as const
  },
  {
    href: "/stardew/crops",
    title: "Crops Database",
    description: "Browse crop facts, seasons, prices, growth days, and starter notes.",
    tone: "pond" as const
  },
  {
    href: "/stardew/fish",
    title: "Fish Calendar",
    description: "Check fish by season, location, time, weather, and difficulty.",
    tone: "berry" as const
  },
  {
    href: "/stardew/community-center",
    title: "Community Center Tracker",
    description: "Track bundle items and save progress locally in your browser.",
    tone: "gold" as const
  },
  {
    href: "/stardew/money",
    title: "Money-Making Guides",
    description: "Compare original Stardew Valley money routes, from early cash bridges to artisan scaling.",
    tone: "gold" as const
  }
];

export default function HomePage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="Current codex: Stardew Guide, a practical reference for new farmers." title="Stardew Guide Codex">
      <div className="space-y-4">
        <section className="tool-directory rounded-md p-3 sm:p-4">
          <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.18)] pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-green-950/50">Tool Directory</p>
              <h2 className="mt-1 text-lg font-black text-green-950">Choose a field guide</h2>
            </div>
            <p className="text-xs font-bold text-green-950/58">{features.length} active tools</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {features.map((feature) => (
              <CardLink description={feature.description} href={feature.href} key={feature.href} title={feature.title} tone={feature.tone} />
            ))}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-green-950/46">Browse All Data</p>
              <h2 className="mt-1 text-lg font-black text-green-950">Open the Stardew database hub</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-green-950/66">
                See live data modules together with planned categories for fruit trees, forage, animals, recipes, and item references.
              </p>
            </div>
            <a
              className="w-fit rounded-sm border border-green-950/14 bg-green-950/[0.04] px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.08]"
              href="/stardew/database"
            >
              Browse Database
            </a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
