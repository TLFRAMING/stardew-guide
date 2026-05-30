import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";

export const metadata: Metadata = {
  title: "Stardew Valley Database | Stardew Guide | Player Codex",
  description: "Browse Stardew Valley villagers, gifts, crops, fish, forage, minerals, animals, artisan goods, Community Center tools, and beginner guides."
};

type HubItem = {
  title: string;
  href?: string;
  note: string;
  status: "Live" | "Planned";
};

type HubGroup = {
  name: string;
  tone: string;
  items: HubItem[];
};

const groups: HubGroup[] = [
  {
    name: "People",
    tone: "border-meadow/25 bg-meadow/8",
    items: [{ title: "Villagers", href: "/stardew/villagers", note: "Gift finder and profile pages.", status: "Live" }]
  },
  {
    name: "Farming",
    tone: "border-pond/20 bg-pond/7",
    items: [
      { title: "Crops", href: "/stardew/crops", note: "Season, price, and growth references.", status: "Live" },
      { title: "Fruit Trees", href: "/stardew/fruit-trees", note: "Sapling prices, seasons, and fruit values.", status: "Live" },
      { title: "Animals", href: "/stardew/animals", note: "Barn and coop animals, unlocks, products, and care notes.", status: "Live" },
      { title: "Animal Products", href: "/stardew/animal-products", note: "Eggs, milk, wool, truffles, processing, and bundle uses.", status: "Live" },
      { title: "Artisan Goods", href: "/stardew/artisan-goods", note: "Animal processing outputs, machines, input items, and value references.", status: "Live" }
    ]
  },
  {
    name: "Foraging",
    tone: "border-amber-700/20 bg-amber-100/65",
    items: [{ title: "Forage", href: "/stardew/forage", note: "Seasonal pickups, beach items, and bundle forage.", status: "Live" }]
  },
  {
    name: "Fishing",
    tone: "border-berry/20 bg-berry/7",
    items: [{ title: "Fish", href: "/stardew/fish", note: "Calendar, weather, and location lookup.", status: "Live" }]
  },
  {
    name: "Items",
    tone: "border-green-950/10 bg-white/75",
    items: [
      { title: "Minerals", href: "/stardew/minerals", note: "Location, value, and museum lookup.", status: "Live" },
      { title: "Artifacts", note: "Planned artifact index.", status: "Planned" }
    ]
  },
  {
    name: "Crafting & Cooking",
    tone: "border-gold/25 bg-gold/10",
    items: [
      { title: "Cooking Recipes", note: "Planned cooking reference.", status: "Planned" },
      { title: "Crafting Recipes", note: "Planned crafting reference.", status: "Planned" }
    ]
  },
  {
    name: "Other Tools",
    tone: "border-green-950/14 bg-green-950/[0.04]",
    items: [
      { title: "Guides", href: "/stardew/guides", note: "Beginner and progression decision guides.", status: "Live" },
      { title: "Community Center", href: "/stardew/community-center", note: "Bundle tracker with local progress.", status: "Live" },
      { title: "Money Guides", href: "/stardew/money", note: "Source-reviewed strategy overviews.", status: "Live" }
    ]
  }
];

export default function DatabasePage() {
  return (
    <PageShell
      eyebrow="Database Hub"
      kicker="Start with the lookup you need: gifts, fish windows, crop timing, forage seasons, minerals, animals, artisan goods, bundles, or beginner guide routes."
      title="Stardew Valley Database"
    >
      <section className="space-y-4">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Popular lookups",
              description: "Jump into pages that often answer a single search question quickly.",
              links: [
                { href: "/stardew/villagers/george", label: "George gifts" },
                { href: "/stardew/villagers/wizard", label: "Wizard gifts" },
                { href: "/stardew/fish/bream", label: "Bream" },
                { href: "/stardew/crops/cranberries", label: "Cranberries" }
              ]
            },
            {
              title: "Main database paths",
              description: "Use these categories when you are comparing several items before making an in-game decision.",
              links: [
                { href: "/stardew/fish", label: "Fish calendar" },
                { href: "/stardew/crops", label: "Crops" },
                { href: "/stardew/forage", label: "Forage" },
                { href: "/stardew/minerals", label: "Minerals" }
              ]
            },
            {
              title: "Decision guides",
              description: "Open guide pages when a raw data page does not explain the next step.",
              links: [
                { href: "/stardew/guides/fishing-season-weather-planning", label: "Fishing conditions" },
                { href: "/stardew/guides/first-museum-donations", label: "Museum donations" },
                { href: "/stardew/guides/friendship-and-gifts-basics", label: "Gift basics" },
                { href: "/stardew/community-center", label: "Community Center" }
              ]
            }
          ]}
          title="Start with these Stardew lookups"
        />
        {groups.map((group) => (
          <section className={`rounded-md border px-4 py-4 sm:px-5 ${group.tone}`} key={group.name}>
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-green-950/10 pb-3">
              <h2 className="text-lg font-black text-green-950">{group.name}</h2>
              <span className="text-xs font-black uppercase tracking-[0.14em] text-green-950/48">{group.items.length} entries</span>
            </div>
            <div className="divide-y divide-green-950/10">
              {group.items.map((item) => (
                <DatabaseItem item={item} key={item.title} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </PageShell>
  );
}

function DatabaseItem({ item }: { item: HubItem }) {
  const content = (
    <div className="flex min-w-0 flex-col gap-3 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="text-base font-black text-green-950">{item.title}</h3>
          <StatusPill status={item.status} />
        </div>
        <p className="mt-1 text-sm font-semibold leading-6 text-green-950/66">{item.note}</p>
      </div>
      {item.status === "Live" ? (
        <span className="w-fit rounded-sm bg-green-950/[0.05] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/58">Open</span>
      ) : (
        <span className="w-fit rounded-sm bg-green-950/[0.04] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-950/42">Soon</span>
      )}
    </div>
  );

  if (item.href) {
    return (
      <Link className="block transition hover:translate-y-[-1px] hover:text-green-950" href={item.href}>
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}

function StatusPill({ status }: { status: HubItem["status"] }) {
  const styles =
    status === "Live"
      ? "bg-meadow/12 text-meadow"
      : "bg-green-950/[0.06] text-green-950/50";

  return <span className={`rounded-sm px-2 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${styles}`}>{status}</span>;
}
