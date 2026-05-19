"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ForageItem, Season } from "@/lib/stardew/types";

type SeasonFilter = "All" | "Spring" | "Summer" | "Fall" | "Winter" | "Special";

const seasonFilters: SeasonFilter[] = ["All", "Spring", "Summer", "Fall", "Winter", "Special"];

export function ForageDirectory({ forage }: { forage: ForageItem[] }) {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState<SeasonFilter>("All");
  const [location, setLocation] = useState("All");

  const locationOptions = useMemo(() => ["All", ...Array.from(new Set(forage.flatMap((item) => item.locations))).sort()], [forage]);

  const filteredForage = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return forage.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.locations.some((entry) => entry.toLowerCase().includes(normalizedQuery)) ||
        item.bundleUsage.some((entry) => entry.toLowerCase().includes(normalizedQuery));

      const matchesSeason =
        season === "All" ||
        item.seasons.includes(season as Season) ||
        item.seasons.includes("All");

      const matchesLocation = location === "All" || item.locations.includes(location);

      return matchesQuery && matchesSeason && matchesLocation;
    });
  }, [forage, location, query, season]);

  return (
    <section className="space-y-4">
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-pond">Forage Index</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Browse forage items</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{forage.length} forage items indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-pond">
            {filteredForage.length} results
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem_14rem] lg:items-end">
          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search forage</span>
            <input
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Wild Plum, Beach..."
              type="search"
              value={query}
            />
          </label>

          <FilterSelect label="Season" onChange={setSeason} options={seasonFilters} value={season} />
          <FilterSelect label="Location" onChange={setLocation} options={locationOptions} value={location} />
        </div>
      </div>

      {filteredForage.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredForage.map((item) => (
            <Link
              className="codex-list-card codex-list-card-pond group block rounded-md transition hover:-translate-y-0.5 hover:border-pond/30"
              href={`/stardew/forage/${item.slug}`}
              key={item.slug}
            >
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-black leading-tight text-green-950">{item.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.seasons.map((entry) => (
                        <span className="codex-list-chip rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]" key={entry}>
                          {entry}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-pond">
                    {formatGold(item.sellPrice)}
                  </span>
                </div>

                <div className="rounded-md border border-green-950/10 bg-white/70 px-3 py-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-green-950/48">Locations</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-green-950/72">{item.locations.join(", ")}</p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Fact label="Bundle usage" value={formatBundleUsage(item.bundleUsage)} />
                  <Fact label="Community Center" value={hasBundleUsage(item.bundleUsage) ? "Yes" : "No"} tone={hasBundleUsage(item.bundleUsage) ? "default" : "muted"} />
                </div>

                <div className="rounded-md border border-green-950/10 bg-[rgba(255,253,244,0.72)] px-3 py-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-green-950/48">Beginner note</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-green-950/72">{item.beginnerNote}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">
          No forage items found.
        </div>
      )}
    </section>
  );
}

function FilterSelect<T extends string>({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: T) => void;
  options: readonly T[];
  value: T;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">{label}</span>
      <select
        className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4"
        onChange={(event) => onChange(event.target.value as T)}
        value={value}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item === "All" ? `All ${label.toLowerCase()}s` : item}
          </option>
        ))}
      </select>
    </label>
  );
}

function Fact({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "muted" }) {
  return (
    <div className={`codex-list-metric rounded-sm p-2.5 ${tone === "muted" ? "bg-green-950/[0.04]" : ""}`}>
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-green-950/45">{label}</p>
      <p className={`mt-1 break-words text-sm font-bold ${tone === "muted" ? "text-green-950/58" : "text-green-950"}`}>{value}</p>
    </div>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}

function formatBundleUsage(value: string[]) {
  return value.length > 0 ? value.join(", ") : "None";
}

function hasBundleUsage(value: string[]) {
  return value.length > 0;
}
