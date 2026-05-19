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
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-meadow">Gift Index</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Scan villagers by gifts</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{villagers.length} villagers indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-meadow/20 bg-meadow/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-meadow">
            {filteredVillagers.length} results
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end">
          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search villagers or gifts</span>
            <input
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Abigail, Parsnip, Fall..."
              type="search"
              value={query}
            />
          </label>

          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Marriage candidate</span>
            <select
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4"
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
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredVillagers.map((villager) => (
            <Link
              className="codex-list-card codex-list-card-meadow group block rounded-md transition hover:-translate-y-0.5 hover:border-meadow/30"
              href={`/stardew/villagers/${villager.slug}`}
              key={villager.slug}
            >
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-black leading-tight text-green-950">{villager.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="codex-list-chip rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]">Birthday {villager.birthday}</span>
                      <span
                        className={`rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
                          villager.marriageCandidate === true
                            ? "codex-list-chip"
                            : "border border-green-950/12 bg-green-950/6 text-green-950/58"
                        }`}
                      >
                        {villager.marriageCandidate === true ? "Marriage candidate" : "Not candidate"}
                      </span>
                    </div>
                  </div>
                  <span className="w-fit rounded-sm border border-[rgba(122,86,56,0.16)] bg-[rgba(255,253,244,0.62)] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-green-950/55">
                    Open profile
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="min-w-0 break-words text-sm font-semibold leading-6 text-green-950/72">
                    <span className="font-black text-green-950/85">Location:</span> {villager.location ?? "needs verification"}
                  </p>
                  <GiftRow label="Loved" values={villager.lovedGifts} tone="meadow" />
                  <GiftRow label="Liked" values={villager.likedGifts} tone="pond" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">
          No villagers found.
        </div>
      )}
    </section>
  );
}

function GiftRow({
  label,
  tone,
  values
}: {
  label: "Loved" | "Liked";
  tone: "meadow" | "pond";
  values: string[];
}) {
  const visibleValues = values.slice(0, 3);
  const extraCount = Math.max(values.length - visibleValues.length, 0);

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-green-950/50">{label} gifts</p>
      <div className="flex min-w-0 flex-wrap gap-2">
        {visibleValues.length > 0 ? (
          visibleValues.map((value) => (
            <span
              className={`rounded-sm border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${
                tone === "meadow"
                  ? "border-meadow/20 bg-meadow/10 text-green-950/80"
                  : "border-pond/20 bg-pond/10 text-green-950/80"
              }`}
              key={value}
            >
              {value}
            </span>
          ))
        ) : (
          <span className="rounded-sm border border-green-950/12 bg-green-950/6 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-green-950/58">
            needs verification
          </span>
        )}
        {extraCount > 0 ? (
          <span className="rounded-sm border border-green-950/12 bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-green-950/58">
            +{extraCount}
          </span>
        ) : null}
      </div>
    </div>
  );
}
