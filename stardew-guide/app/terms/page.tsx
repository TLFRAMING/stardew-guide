import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms of Use | Player Codex",
  description: "Terms of use, fan-site disclaimers, and content boundaries for Player Codex."
};

const terms = [
  {
    title: "Fan-made guide content",
    text: "Player Codex is an independent fan-made guide and database site. Game names are used to identify the guide topic, and Player Codex is not affiliated with, endorsed by, or sponsored by any game publisher, developer, storefront, or platform."
  },
  {
    title: "Informational use",
    text: "Guides and database pages are provided for general gameplay planning. Game updates can change mechanics, values, routes, or balance, especially for Early Access games. Players should treat patch-sensitive strategy as practical guidance, not a guaranteed result."
  },
  {
    title: "Original editorial work",
    text: "Player Codex aims to publish original, player-facing explanations rather than copied wiki pages, copied guide structures, or unverified community conclusions. External references are used where a page depends on public game facts."
  },
  {
    title: "External links",
    text: "Some pages may link to external sources, official stores, official sites, or optional tools. Player Codex is not responsible for third-party websites, their availability, or their privacy practices."
  },
  {
    title: "Corrections",
    text: "If a page appears outdated, unclear, or incorrect, use the contact page to send the page URL, the issue, and any stable source that helps verify the correction."
  }
];

export default function TermsPage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="Site terms, fan-site boundaries, and guide use." title="Terms of Use">
      <div className="space-y-4">
        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="max-w-3xl space-y-4 text-sm font-semibold leading-6 text-green-950/70">
            <p>
              These terms explain how to use Player Codex guide and database pages. By using this site, you agree to treat the content as fan-made gameplay reference material, not official publisher documentation.
            </p>
            <p>Last updated: May 26, 2026.</p>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          {terms.map((item) => (
            <article className="rounded-md border border-green-950/10 bg-white/85 p-4" key={item.title}>
              <h2 className="text-lg font-black text-green-950">{item.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <h2 className="text-lg font-black text-green-950">Related policy pages</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">
            These pages describe how Player Codex handles privacy, editorial review, corrections, and site ownership.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/privacy">
              Privacy
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/editorial-policy">
              Editorial Policy
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/contact">
              Contact
            </Link>
            <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href="/about">
              About
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
