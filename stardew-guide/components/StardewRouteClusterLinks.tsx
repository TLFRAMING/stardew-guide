import Link from "next/link";

export type StardewRouteCluster = {
  description: string;
  links: {
    href: string;
    label: string;
    note?: string;
  }[];
  title: string;
};

export function StardewRouteClusterLinks({
  clusters,
  eyebrow = "Route Links",
  title = "Follow the related Stardew pages"
}: {
  clusters: StardewRouteCluster[];
  eyebrow?: string;
  title?: string;
}) {
  const visibleClusters = clusters.filter((cluster) => cluster.links.length > 0);

  if (visibleClusters.length === 0) {
    return null;
  }

  return (
    <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
      <div className="mb-4 border-b border-green-950/10 pb-3">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-green-950/44">{eyebrow}</p>
        <h2 className="mt-1 text-lg font-black text-green-950">{title}</h2>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {visibleClusters.map((cluster) => (
          <div className="rounded-md border border-green-950/10 bg-green-950/[0.025] p-4" key={cluster.title}>
            <h3 className="text-base font-black text-green-950">{cluster.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-green-950/64">{cluster.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cluster.links.map((link) => (
                <Link
                  className="rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1.5 text-xs font-black text-pond transition hover:bg-pond/15"
                  href={link.href}
                  key={`${cluster.title}-${link.href}`}
                  title={link.note}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
