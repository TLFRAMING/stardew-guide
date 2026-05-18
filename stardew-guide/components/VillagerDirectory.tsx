"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Villager } from "@/lib/stardew/types";

type MarriageFilter = "all" | "candidates" | "non-candidates";

export function VillagerDirectory({ villagers }: { villagers: Villager[] }) {
  const [query, setQuery] = useState("");
  const [marriageFilter, setMarriageFilter] = useState<MarriageFilter>("all");

  const filteredVillagers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return villagers.filter((villager) => {
      const isCandidate = villager.marriageCandidate === true;
      const matchesMarriage =
        marriageFilter === "all" ||
        (marriageFilter === "candidates" && isCandidate) ||
        (marriageFilter === "non-candidates" && !isCandidate);

      const searchText = [
        villager.name,
        villager.birthday,
        villager.location,
        villager.lovedGifts.join(" "),
        villager.likedGifts.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return matchesMarriage && searchText.includes(normalizedQuery);
    });
  }, [marriageFilter, query, villagers]);

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-green-950/10 bg-white/85 p-3 shadow-soft">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-green-950/8 pb-3">
          <p className="text-sm font-bold text-green-950">Directory tools</p>
          <p className="rounded-md bg-meadow/10 px-2.5 py-1 text-xs font-bold text-meadow">{filteredVillagers.length} results</p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-green-950/50">Search villagers or gifts</span>
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Abigail, Parsnip, Fall..."
              type="search"
              value={query}
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-green-950/50">Marriage candidate</span>
            <select
              className="mt-2 min-h-11 w-full rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4 md:w-56"
              onChange={(event) => setMarriageFilter(event.target.value as MarriageFilter)}
              value={marriageFilter}
            >
              <option value="all">All villagers</option>
              <option value="candidates">Candidates only</option>
              <option value="non-candidates">Non-candidates</option>
            </select>
          </label>
        </div>
      </div>

      {filteredVillagers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredVillagers.map((villager) => (
            <Link
              className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-meadow/35"
              href={`/villagers/${villager.slug}`}
              key={villager.slug}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-green-950">{villager.name}</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Birthday: {villager.birthday}</span>
                  </div>
                </div>
                <span className={`w-fit rounded-md px-2.5 py-1 text-xs font-bold ${villager.marriageCandidate === true ? "bg-berry/10 text-berry" : "bg-green-950/6 text-green-950/58"}`}>
                  {villager.marriageCandidate === true ? "Marriage candidate" : "Not marked candidate"}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-green-950/70">Location: {villager.location ?? "needs verification"}</p>
              <p className="mt-2 text-sm leading-6 text-green-950/70">
                Loved gifts: {villager.lovedGifts.length > 0 ? villager.lovedGifts.slice(0, 4).join(", ") : "needs verification"}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-green-950/10 bg-white p-6 text-sm font-semibold text-green-950/62 shadow-soft">
          No villagers found.
        </div>
      )}
    </section>
  );
}
