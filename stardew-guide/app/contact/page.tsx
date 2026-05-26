import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact | Player Codex",
  description: "Contact information for Player Codex, a fan-made multi-game guide and database site."
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Player Codex"
      kicker="Questions, corrections, and source notes for the guide project."
      title="Contact"
    >
      <div className="space-y-4">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-4 text-sm font-semibold leading-6 text-green-950/70">
            <p>
              Player Codex is a fan-made guide project. Use this page for correction requests, source questions, or notes about outdated guide content.
            </p>
            <p>
              Current coverage focuses on Stardew Valley, Rogue Command, and Nova Roma. The site does not represent any game publisher or developer.
            </p>
            <p>
              Contact email: <a className="font-black text-pond hover:underline" href="mailto:contact@playercodex.app">contact@playercodex.app</a>
            </p>
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <h2 className="text-lg font-black text-green-950">What to include</h2>
          <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-green-950/68">
            <li className="rounded-md bg-green-950/[0.035] px-3 py-2">The page URL you are writing about.</li>
            <li className="rounded-md bg-green-950/[0.035] px-3 py-2">The specific claim, item, guide step, or source that needs review.</li>
            <li className="rounded-md bg-green-950/[0.035] px-3 py-2">A stable source or in-game verification note if you are suggesting a correction.</li>
          </ul>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-black text-green-950">Useful site pages</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/about">
              About
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/editorial-policy">
              Editorial Policy
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/privacy">
              Privacy
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
