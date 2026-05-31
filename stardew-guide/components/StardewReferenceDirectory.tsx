"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type StardewReferenceCard = {
  slug: string;
  name: string;
  badge: string;
  facts: { label: string; value: string }[];
  note: string;
};

export function StardewReferenceDirectory({
  basePath,
  countLabel,
  items,
  searchPlaceholder,
  title
}: {
  basePath: string;
  countLabel: string;
  items: StardewReferenceCard[];
  searchPlaceholder: string;
  title: string;
}) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      const haystack = [item.name, item.badge, item.note, ...item.facts.flatMap((fact) => [fact.label, fact.value])].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [items, query]);

  return (
    <section className="space-y-4">
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-pond">{countLabel}</p>
            <h2 className="mt-1 text-lg font-black text-green-950">{title}</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{items.length} entries indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-pond">
            {filteredItems.length} results
          </p>
        </div>
        <label className="block min-w-0">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search</span>
          <input
            className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={query}
          />
        </label>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <Link className="codex-list-card codex-list-card-pond group block rounded-md transition hover:-translate-y-0.5 hover:border-pond/30" href={`${basePath}/${item.slug}`} key={item.slug}>
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="break-words text-xl font-black leading-tight text-green-950">{item.name}</h3>
                  <span className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-pond">{item.badge}</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {item.facts.map((fact) => (
                    <div className="codex-list-metric rounded-sm p-2.5" key={`${item.slug}-${fact.label}`}>
                      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-green-950/45">{fact.label}</p>
                      <p className="mt-1 break-words text-sm font-bold text-green-950">{fact.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-md border border-green-950/10 bg-[rgba(255,253,244,0.72)] px-3 py-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-green-950/48">Beginner note</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-green-950/72">{item.note}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">No entries found.</div>
      )}
    </section>
  );
}
