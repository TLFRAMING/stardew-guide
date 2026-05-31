"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { displayDays, displayGold, displayText, isReviewValue } from "@/lib/stardew/display";
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
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-pond">Season Board</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Plan crops by season</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{crops.length} crops indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-pond">
            {filteredCrops.length} results
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end">
          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search crops</span>
            <input
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Parsnip, Cauliflower..."
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

      {filteredCrops.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredCrops.map((crop) => (
            <Link
              className="codex-list-card codex-list-card-pond group block rounded-md transition hover:-translate-y-0.5 hover:border-pond/30"
              href={`/stardew/crops/${crop.slug}`}
              key={crop.slug}
            >
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-black leading-tight text-green-950">{crop.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {crop.seasons.map((item) => (
                        <span
                          className={`codex-list-chip rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
                            item === "Special" ? "border border-amber-500/20 bg-amber-100 text-amber-800" : ""
                          }`}
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`w-fit rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${getGrowthBadgeClass(crop.growthDays)}`}>
                    {displayDays(crop.growthDays)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Fact label="Seed price" value={displayGold(crop.seedPrice, "Check source")} tone={isReviewValue(crop.seedPrice) ? "review" : "default"} />
                  <Fact label="Sell price" value={displayGold(crop.sellPrice)} />
                  <Fact label="Growth" value={displayDays(crop.growthDays)} />
                  <Fact label="Regrow" value={displayDays(crop.regrowthDays, "No listed regrowth")} tone={isReviewValue(crop.regrowthDays) ? "review" : "default"} />
                </div>

                <div className="rounded-md border border-green-950/10 bg-[rgba(255,253,244,0.72)] px-3 py-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-green-950/48">Planner note</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-green-950/72">Profit: {displayText(crop.profitNotes, "Depends on setup")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">
          No crops found.
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

function getGrowthBadgeClass(value: number | "needs verification") {
  if (typeof value !== "number") {
    return "border border-green-950/12 bg-green-950/6 text-green-950/58";
  }

  if (value <= 4) {
    return "border border-meadow/20 bg-meadow/10 text-meadow";
  }

  if (value <= 8) {
    return "border border-pond/20 bg-pond/10 text-pond";
  }

  return "border border-amber-500/20 bg-amber-100 text-amber-800";
}
