"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Crop, Season } from "@/lib/stardew/types";

type SeasonFilter = "All" | "Spring" | "Summer" | "Fall" | "Winter" | "Special";

const seasonFilters: SeasonFilter[] = ["All", "Spring", "Summer", "Fall", "Winter", "Special"];

export function CropDirectory({ crops }: { crops: Crop[] }) {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState<SeasonFilter>("All");

  const filteredCrops = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return crops.filter((crop) => {
      const matchesQuery = crop.name.toLowerCase().includes(normalizedQuery);
      const matchesSeason = season === "All" || crop.seasons.includes(season as Season);

      return matchesQuery && matchesSeason;
    });
  }, [crops, query, season]);

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-green-950/10 bg-white/85 p-3 shadow-soft">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-green-950/8 pb-3">
          <p className="text-sm font-bold text-green-950">Database tools</p>
          <p className="rounded-md bg-pond/10 px-2.5 py-1 text-xs font-bold text-pond">{filteredCrops.length} results</p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-green-950/50">Search crops</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Parsnip, Cauliflower..."
              type="search"
              value={query}
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-green-950/50">Season</span>
            <select
              className="mt-2 min-h-11 w-full rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4 md:w-48"
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

      {filteredCrops.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredCrops.map((crop) => (
            <Link
              className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-meadow/35"
              href={`/crops/${crop.slug}`}
              key={crop.slug}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-green-950">{crop.name}</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {crop.seasons.map((item) => (
                      <span className="rounded-md bg-pond/10 px-2.5 py-1 text-xs font-bold text-pond" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="w-fit rounded-md bg-meadow/10 px-2.5 py-1 text-xs font-bold text-meadow">
                  {formatDays(crop.growthDays)}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Fact label="Seed" value={formatGold(crop.seedPrice)} />
                <Fact label="Sell" value={formatGold(crop.sellPrice)} />
                <Fact label="Growth" value={formatDays(crop.growthDays)} />
                <Fact label="Regrow" value={formatDays(crop.regrowthDays)} />
              </div>
              <p className="mt-3 text-sm leading-6 text-green-950/70">Profit: {crop.profitNotes ?? "needs verification"}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-green-950/10 bg-white p-6 text-sm font-semibold text-green-950/62 shadow-soft">
          No crops found.
        </div>
      )}
    </section>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}

function formatDays(value: number | "needs verification") {
  return typeof value === "number" ? `${value} days` : value;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-green-950/6 p-2.5">
      <p className="text-[11px] font-bold uppercase tracking-wide text-green-950/45">{label}</p>
      <p className="mt-1 text-sm font-bold text-green-950">{value}</p>
    </div>
  );
}
