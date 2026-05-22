"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Animal } from "@/lib/stardew/types";

type BuildingFilter = "All" | "Coop" | "Barn";

const buildingFilters: BuildingFilter[] = ["All", "Coop", "Barn"];

export function AnimalDirectory({ animals }: { animals: Animal[] }) {
  const [query, setQuery] = useState("");
  const [building, setBuilding] = useState<BuildingFilter>("All");

  const filteredAnimals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return animals.filter((animal) => {
      const matchesQuery =
        animal.name.toLowerCase().includes(normalizedQuery) ||
        animal.products.some((product) => product.toLowerCase().includes(normalizedQuery));
      const matchesBuilding = building === "All" || animal.building === building;

      return matchesQuery && matchesBuilding;
    });
  }, [animals, building, query]);

  return (
    <section className="space-y-4">
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-pond">Animal Board</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Plan animals by building</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{animals.length} animals indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-pond">
            {filteredAnimals.length} results
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end">
          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search animals</span>
            <input
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chicken, Milk, Truffle..."
              type="search"
              value={query}
            />
          </label>

          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Building</span>
            <select
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4"
              onChange={(event) => setBuilding(event.target.value as BuildingFilter)}
              value={building}
            >
              {buildingFilters.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All buildings" : item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredAnimals.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredAnimals.map((animal) => (
            <Link
              className="codex-list-card codex-list-card-pond group block rounded-md transition hover:-translate-y-0.5 hover:border-pond/30"
              href={`/stardew/animals/${animal.slug}`}
              key={animal.slug}
            >
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-black leading-tight text-green-950">{animal.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{animal.beginnerNote}</p>
                  </div>
                  <span className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-pond">
                    {animal.building}
                  </span>
                </div>

                <div className="rounded-md border border-green-950/10 bg-[rgba(255,253,244,0.72)] px-3 py-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-green-950/48">Products</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-green-950/72">{animal.products.join(", ")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">No animals found.</div>
      )}
    </section>
  );
}
