"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { isReviewValue } from "@/lib/stardew/display";
import type { Fish, Season } from "@/lib/stardew/types";

type SeasonFilter = "All" | "Spring" | "Summer" | "Fall" | "Winter" | "Special";

const seasonFilters: SeasonFilter[] = ["All", "Spring", "Summer", "Fall", "Winter", "Special"];

export function FishDirectory({ fish }: { fish: Fish[] }) {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState<SeasonFilter>("All");
  const [weather, setWeather] = useState("All");
  const [location, setLocation] = useState("All");

  const weatherOptions = useMemo(() => buildOptions(fish.flatMap((item) => item.weather)), [fish]);
  const locationOptions = useMemo(() => buildOptions(fish.flatMap((item) => item.locations)), [fish]);

  const filteredFish = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return fish.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(normalizedQuery);
      const matchesSeason = season === "All" || item.seasons.includes(season as Season);
      const matchesWeather = weather === "All" || item.weather.includes(weather);
      const matchesLocation = location === "All" || item.locations.includes(location);

      return matchesQuery && matchesSeason && matchesWeather && matchesLocation;
    });
  }, [fish, location, query, season, weather]);

  return (
    <section className="space-y-4">
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-berry">Catch Log</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Track fish by conditions</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{fish.length} fish indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-berry/20 bg-berry/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-berry">
            {filteredFish.length} results
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_repeat(3,minmax(0,11rem))] lg:items-end">
          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search fish</span>
            <input
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Sunfish, Catfish..."
              type="search"
              value={query}
            />
          </label>

          <FilterSelect label="Season" onChange={setSeason} options={seasonFilters} value={season} />
          <FilterSelect label="Weather" onChange={setWeather} options={weatherOptions} value={weather} />
          <FilterSelect label="Location" onChange={setLocation} options={locationOptions} value={location} />
        </div>
      </div>

      {filteredFish.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredFish.map((item) => (
            <Link
              className="codex-list-card codex-list-card-berry group block rounded-md transition hover:-translate-y-0.5 hover:border-berry/30"
              href={`/stardew/fish/${item.slug}`}
              key={item.slug}
            >
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-black leading-tight text-green-950">{item.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.seasons.map((seasonName) => (
                        <span className="codex-list-chip rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]" key={seasonName}>
                          {seasonName}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex w-fit flex-col items-start gap-2 sm:items-end">
                    <span className="rounded-sm border border-berry/20 bg-berry/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-berry">{item.time}</span>
                    <span className="rounded-sm border border-amber-500/20 bg-amber-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-amber-800">Difficulty {item.difficulty}</span>
                  </div>
                </div>

                <div className="flex min-w-0 flex-wrap gap-2">
                  {item.weather.map((weatherName) => (
                    <span className="rounded-sm border border-green-950/12 bg-green-950/6 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-green-950/62" key={weatherName}>
                      {weatherName}
                    </span>
                  ))}
                  <span className="rounded-sm border border-meadow/20 bg-meadow/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-meadow">
                    Bundle {formatBundleUsageSummary(item.bundleUsage)}
                  </span>
                </div>

                <div className="rounded-md border border-[rgba(122,86,56,0.12)] bg-[rgba(255,253,244,0.72)] px-3 py-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-green-950/48">Catch location</p>
                  <p className="mt-1 min-w-0 break-words text-sm font-semibold leading-6 text-green-950/72">{item.locations.join(", ")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">
          No fish found.
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
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-green-950/50">{label}</span>
      <select
        className="mt-2 min-h-11 w-full rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4 lg:w-44"
        onChange={(event) => onChange(event.target.value as T)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? `All ${label.toLowerCase()}` : option}
          </option>
        ))}
      </select>
    </label>
  );
}

function buildOptions(values: string[]) {
  return ["All", ...Array.from(new Set(values)).sort()] as string[];
}

function formatBundleUsageSummary(value: string[] | string | "needs verification" | undefined) {
  if (Array.isArray(value)) {
    return value.length === 0 ? "No" : "Yes";
  }

  if (typeof value === "string" && value.trim().length > 0) {
    if (isReviewValue(value)) {
      return "Check";
    }

    return value.toLowerCase() === "none" ? "No" : value;
  }

  return "Check";
}
