"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
      <div className="rounded-lg border border-green-950/10 bg-white/85 p-3 shadow-soft">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-green-950/8 pb-3">
          <p className="text-sm font-bold text-green-950">Calendar tools</p>
          <p className="rounded-md bg-berry/10 px-2.5 py-1 text-xs font-bold text-berry">{filteredFish.length} results</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:items-end">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-green-950/50">Search fish</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
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
        <div className="grid gap-4 md:grid-cols-2">
          {filteredFish.map((item) => (
            <Link
              className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-meadow/35"
              href={`/fish/${item.slug}`}
              key={item.slug}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-green-950">{item.name}</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.seasons.map((seasonName) => (
                      <span className="rounded-md bg-pond/10 px-2.5 py-1 text-xs font-bold text-pond" key={seasonName}>
                        {seasonName}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="w-fit rounded-md bg-berry/10 px-2.5 py-1 text-xs font-bold text-berry">{item.time}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.weather.map((weatherName) => (
                  <span className="rounded-md bg-green-950/6 px-2.5 py-1 text-xs font-bold text-green-950/58" key={weatherName}>
                    {weatherName}
                  </span>
                ))}
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Difficulty: {item.difficulty}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-green-950/70">Locations: {item.locations.join(", ")}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-green-950/10 bg-white p-6 text-sm font-semibold text-green-950/62 shadow-soft">
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
