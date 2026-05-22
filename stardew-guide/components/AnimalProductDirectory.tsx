"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AnimalProduct } from "@/lib/stardew/types";

type SourceFilter = "All" | "Coop" | "Barn" | "Mixed";

const sourceFilters: SourceFilter[] = ["All", "Coop", "Barn", "Mixed"];

export function AnimalProductDirectory({ products }: { products: AnimalProduct[] }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<SourceFilter>("All");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.producedBy.some((animal) => animal.toLowerCase().includes(normalizedQuery));
      const matchesSource = source === "All" || product.sourceBuilding === source;

      return matchesQuery && matchesSource;
    });
  }, [products, query, source]);

  return (
    <section className="space-y-4">
      <div className="codex-list-shell rounded-md p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 border-b border-[rgba(122,86,56,0.16)] pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-pond">Animal Products</p>
            <h2 className="mt-1 text-lg font-black text-green-950">Track products by source</h2>
            <p className="mt-1 text-xs font-semibold text-green-950/55">{products.length} products indexed</p>
          </div>
          <p className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-pond">
            {filteredProducts.length} results
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end">
          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Search products</span>
            <input
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 placeholder:text-green-950/38 focus:ring-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Egg, Milk, Rabbit..."
              type="search"
              value={query}
            />
          </label>

          <label className="block min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-950/50">Source</span>
            <select
              className="mt-2 min-h-11 w-full min-w-0 rounded-md border border-green-950/15 bg-white px-3 text-green-950 outline-none ring-meadow/25 focus:ring-4"
              onChange={(event) => setSource(event.target.value as SourceFilter)}
              value={source}
            >
              {sourceFilters.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All sources" : item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link
              className="codex-list-card codex-list-card-pond group block rounded-md transition hover:-translate-y-0.5 hover:border-pond/30"
              href={`/stardew/animal-products/${product.slug}`}
              key={product.slug}
            >
              <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-black leading-tight text-green-950">{product.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{product.beginnerNote}</p>
                  </div>
                  <span className="w-fit rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-pond">
                    {product.sourceBuilding}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Fact label="Sell price" value={formatGold(product.sellPrice)} />
                  <Fact label="Produced by" value={product.producedBy.join(", ")} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="codex-list-shell rounded-md p-6 text-sm font-semibold text-green-950/62">No animal products found.</div>
      )}
    </section>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="codex-list-metric rounded-sm p-2.5">
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-green-950/45">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-green-950">{value}</p>
    </div>
  );
}
