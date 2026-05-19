import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About | Player Codex",
  description: "Learn about Player Codex and its fan-made game guide modules."
};

export default function AboutPage() {
  return (
    <PageShell eyebrow="Player Codex" title="About">
      <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
        <div className="max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
          <p>
            Player Codex is a fan-made game guide site focused on practical, readable reference pages for players.
          </p>
          <p>
            The live module is Stardew Guide, a Stardew Valley guide covering villagers, crops, fish, Community Center bundles, and money-making routes. Additional game codexes can be staged as Player Codex expands.
          </p>
          <p>
            Player Codex is not affiliated with, endorsed by, or sponsored by any game publisher or developer.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
