"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FruitTree, Season } from "@/lib/stardew/types";

type SeasonFilter = "All" | "Spring" | "Summer" | "Fall" | "Winter" | "Special";

const seasonFilters: SeasonFilter[] = ["All", "Spring", "Summer", "Fall", "Winter", "Special"];

export function FruitTreeDirectory({ fruitTrees }: { fruitTrees: FruitTree[] }) {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState<SeasonFilter>("All");

  const filteredTrees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return fruitTrees.filter((tree) => {
      const matchesQuery =
        tree.name.toLowerCase().includes(normalizedQuery) ||
        tree.fruitName.toLowerCase().includes(normalizedQuery);
      const matchesSeason = season === "All" || tree.seasons.includes(season as Season);

      return matchesQuery && matchesSeason;
    });
  }, [fruitTrees, query, season]);

  return (
    <section className="space-y-4">
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-pond">Orchard Index</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Browse fruit trees</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{fruitTrees.length} fruit trees indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-pond">
            {filteredTrees.length} results
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end">
          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search fruit trees</span>
            <input
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Apple Tree, Peach..."
              type="search"
              value={query}
            />
          </label>

          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Season</span>
            <select
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4"
              onChange={(event) => setSeason(event.target.value as SeasonFilter)}
              value={season}
            >
              {seasonFilters.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All seasons" : item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredTrees.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrees.map((tree) => (
            <Link
              className="codex-list-card codex-list-card-pond group block rounded-md transition hover:-translate-y-0.5 hover:border-pond/30"
              href={`/fruit-trees/${tree.slug}`}
              key={tree.slug}
            >
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-black leading-tight text-green-950">{tree.name}</h3>
                    <p className="mt-1 break-words text-sm font-semibold text-green-950/62">Fruit: {tree.fruitName}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tree.seasons.map((item) => (
                        <span className="codex-list-chip rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-pond">
                    {formatDays(tree.growthDays)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Fact
                    label="Sapling price"
                    value={formatGoldOrReview(tree.saplingPrice)}
                    tone={tree.saplingPrice === "needs verification" ? "review" : "default"}
                  />
                  <Fact label="Fruit value" value={formatGoldOrReview(tree.fruitSellPrice)} />
                  <Fact label="Growth" value={formatDays(tree.growthDays)} />
                  <Fact label="Fruit" value={tree.fruitName} />
                </div>

                <div className="rounded-md border border-green-950/10 bg-[rgba(255,253,244,0.72)] px-3 py-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-green-950/48">Beginner note</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-green-950/72">{tree.beginnerNote}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">
          No fruit trees found.
        </div>
      )}
    </section>
  );
}

function Fact({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "review" }) {
  return (
    <div className={`codex-list-metric rounded-sm p-2.5 ${tone === "review" ? "bg-amber-50/80" : ""}`}>
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-green-950/45">{label}</p>
      <p className={`mt-1 break-words text-sm font-bold ${tone === "review" ? "text-amber-800" : "text-green-950"}`}>{value}</p>
    </div>
  );
}

function formatGoldOrReview(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : "Under review";
}

function formatDays(value: number | "needs verification") {
  return typeof value === "number" ? `${value} days` : value;
}
