import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Recommended Gaming Tools | Player Codex",
  description: "Useful gaming accessories and planning tools for reading guides, tracking goals, and playing strategy or cozy games more comfortably."
};

const amazonTag = "playercodex-20";

const recommendations = [
  {
    category: "Planning",
    title: "Notebook or desk planner",
    description: "Useful for Stardew Valley seasonal goals, Community Center notes, Rogue Command run reviews, and long-term checklist planning.",
    links: [
      {
        label: "Browse planners",
        href: amazonSearchUrl("gaming planner notebook")
      },
      {
        label: "Browse notebooks",
        href: amazonSearchUrl("dot grid notebook")
      }
    ]
  },
  {
    category: "Comfort",
    title: "Comfortable mouse",
    description: "Helpful for longer strategy sessions, inventory-heavy games, and RTS controls where repeated clicks and precise movement matter.",
    links: [
      {
        label: "Browse gaming mice",
        href: amazonSearchUrl("comfortable gaming mouse")
      }
    ]
  },
  {
    category: "Comfort",
    title: "Keyboard for longer sessions",
    description: "A comfortable keyboard can make hotkeys, menu navigation, and repeated guide-checking sessions easier on the hands.",
    links: [
      {
        label: "Browse gaming keyboards",
        href: amazonSearchUrl("comfortable gaming keyboard")
      }
    ]
  },
  {
    category: "Cozy games",
    title: "Controller for relaxed play",
    description: "Some players prefer a controller for farming sims, cozy games, and couch play. Check game support before buying.",
    links: [
      {
        label: "Browse PC controllers",
        href: amazonSearchUrl("pc game controller")
      }
    ]
  },
  {
    category: "Reference",
    title: "Second-screen setup",
    description: "A small second monitor or tablet stand can keep databases, maps, and guide pages visible without constantly switching windows.",
    links: [
      {
        label: "Browse portable monitors",
        href: amazonSearchUrl("portable monitor")
      },
      {
        label: "Browse tablet stands",
        href: amazonSearchUrl("tablet stand desk")
      }
    ]
  }
];

const relatedPages = [
  { label: "Stardew Database", href: "/stardew/database" },
  { label: "Stardew Guides", href: "/stardew/guides" },
  { label: "Rogue Command Guides", href: "/rogue-command" },
  { label: "Money Guides", href: "/stardew/money" }
];

export default function RecommendedToolsPage() {
  return (
    <PageShell eyebrow="Recommended Tools" kicker="Optional accessories and planning tools for players who use guides, databases, and long-session games." title="Gaming tools and accessories">
      <div className="space-y-4">
        <section className="rounded-md border border-amber-500/25 bg-amber-50/80 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-black text-green-950">Affiliate disclosure</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-green-950/70">
            As an Amazon Associate, Player Codex earns from qualifying purchases. Affiliate links do not change the price you pay, and recommendations should be treated as optional tools, not required purchases.
          </p>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
          <div className="mb-4 border-b border-green-950/10 pb-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-green-950/44">How to use this page</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Buy only what helps your actual play</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">
              These links point to broad Amazon searches instead of claiming one universal best product. Compare reviews, size, compatibility, return policy, and your own setup before buying.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {recommendations.map((item) => (
              <article className="rounded-md border border-green-950/10 bg-green-950/[0.025] p-4" key={item.title}>
                <span className="rounded-sm bg-green-950/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-green-950/55">{item.category}</span>
                <h3 className="mt-3 text-lg font-black leading-tight text-green-950">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.links.map((link) => (
                    <a className="rounded-sm border border-green-950/14 bg-white px-3 py-2 text-sm font-black text-green-950 transition hover:bg-green-950/[0.04]" href={link.href} key={link.href} rel="nofollow sponsored noreferrer" target="_blank">
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-green-950/10 bg-white/80 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-black text-green-950">Use with Player Codex</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">Open the related guide and database sections when planning what to track during a play session.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {relatedPages.map((page) => (
              <Link className="rounded-sm bg-green-950/[0.05] px-3 py-2 text-sm font-black text-green-950/72 transition hover:bg-green-950/[0.08] hover:text-green-950" href={page.href} key={page.href}>
                {page.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function amazonSearchUrl(query: string) {
  const params = new URLSearchParams({
    k: query,
    tag: amazonTag
  });

  return `https://www.amazon.com/s?${params.toString()}`;
}
