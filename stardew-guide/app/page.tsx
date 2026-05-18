import type { Metadata } from "next";
import { CardLink } from "@/components/CardLink";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Player Codex | Stardew Guide",
  description: "Player Codex hosts a fan-made Stardew Valley guide for villagers, crops, fish, and Community Center bundles."
};

const features = [
  {
    href: "/villagers",
    title: "Villager Gift Finder",
    description: "Find beginner-friendly loved and liked gifts from local JSON data.",
    tone: "meadow" as const
  },
  {
    href: "/crops",
    title: "Crops Database",
    description: "Browse crop facts, seasons, prices, growth days, and starter notes.",
    tone: "pond" as const
  },
  {
    href: "/fish",
    title: "Fish Calendar",
    description: "Check fish by season, location, time, weather, and difficulty.",
    tone: "berry" as const
  },
  {
    href: "/community-center",
    title: "Community Center Tracker",
    description: "Track bundle items and save progress locally in your browser.",
    tone: "gold" as const
  },
  {
    href: "/money",
    title: "Money-Making Guides",
    description: "Compare five Stardew Valley money routes, from keg empires to fish smokers.",
    tone: "gold" as const
  }
];

export default function HomePage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="Current codex: Stardew Guide, a practical reference for new farmers." title="A calmer Stardew Valley guide">
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <CardLink description={feature.description} href={feature.href} key={feature.href} title={feature.title} tone={feature.tone} />
        ))}
      </div>
    </PageShell>
  );
}
