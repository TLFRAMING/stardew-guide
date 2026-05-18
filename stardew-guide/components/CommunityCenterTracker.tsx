"use client";

import { useEffect, useMemo, useState } from "react";
import type { Bundle } from "@/lib/stardew/types";

const rooms = ["Crafts Room", "Pantry", "Fish Tank", "Boiler Room", "Bulletin Board", "Vault"];
const storageKey = "stardew-guide-community-center-v1";

type CheckedState = Record<string, boolean>;

export function CommunityCenterTracker({ bundles }: { bundles: Bundle[] }) {
  const [checkedItems, setCheckedItems] = useState<CheckedState>({});
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (storedValue) {
        setCheckedItems(JSON.parse(storedValue) as CheckedState);
      }
    } catch {
      setCheckedItems({});
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(checkedItems));
  }, [checkedItems, hasLoadedStorage]);

  const groupedBundles = useMemo(() => {
    return rooms.map((room) => ({
      room,
      bundles: bundles.filter((bundle) => bundle.room === room)
    }));
  }, [bundles]);

  const allItemIds = useMemo(() => bundles.flatMap((bundle) => getBundleItems(bundle).map((item) => getItemId(bundle, item))), [bundles]);
  const overallProgress = getProgress(allItemIds, checkedItems);

  if (bundles.length === 0) {
    return (
      <section className="rounded-lg border border-green-950/10 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-green-950">No bundles yet</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-green-950/70">
          Bundle data is empty. Once `bundles.json` has entries, this tracker will show grouped checklists here.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-meadow/20 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-meadow">Tracker progress</p>
            <h2 className="mt-1 text-2xl font-bold text-green-950">Overall Progress</h2>
            <p className="mt-2 text-sm font-semibold text-green-950/62">
              {overallProgress.completed} of {overallProgress.total} items checked
            </p>
          </div>
          <div className="w-fit rounded-lg bg-meadow/10 px-4 py-3 text-4xl font-bold text-meadow">{overallProgress.percent}%</div>
        </div>
        <ProgressBar percent={overallProgress.percent} size="large" />
      </div>

      <div className="space-y-4">
        {groupedBundles.map(({ bundles: roomBundles, room }) => {
          const roomItemIds = roomBundles.flatMap((bundle) => getBundleItems(bundle).map((item) => getItemId(bundle, item)));
          const roomProgress = getProgress(roomItemIds, checkedItems);

          return (
            <section className="rounded-lg border border-green-950/10 bg-white p-4 shadow-soft sm:p-5" key={room}>
              <div className="flex flex-col gap-3 border-b border-green-950/8 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-green-950">{room}</h2>
                  <p className="mt-1 text-sm font-semibold text-green-950/58">
                    {roomProgress.completed} of {roomProgress.total} items checked
                  </p>
                </div>
                <div className="w-fit rounded-md bg-green-950/6 px-3 py-2 text-2xl font-bold text-meadow">{roomProgress.percent}%</div>
              </div>
              <ProgressBar percent={roomProgress.percent} />

              {roomBundles.length > 0 ? (
                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  {roomBundles.map((bundle) => (
                    <BundleCard bundle={bundle} checkedItems={checkedItems} key={bundle.slug} onToggle={setCheckedItems} />
                  ))}
                </div>
              ) : (
                <p className="mt-5 rounded-md bg-green-950/6 p-4 text-sm font-semibold text-green-950/58">No bundle data for this room yet.</p>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}

function BundleCard({
  bundle,
  checkedItems,
  onToggle
}: {
  bundle: Bundle;
  checkedItems: CheckedState;
  onToggle: React.Dispatch<React.SetStateAction<CheckedState>>;
}) {
  const items = getBundleItems(bundle);

  return (
    <article className="rounded-lg border border-green-950/10 bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-green-950">{bundle.name}</h3>
          <p className="mt-2 w-fit rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Reward: {bundle.reward}</p>
        </div>
        <SourceLink sourceUrls={bundle.sourceUrls} />
      </div>
      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const itemId = getItemId(bundle, item);
          const isChecked = checkedItems[itemId] === true;

          return (
            <label
              className={`flex min-h-11 items-center gap-3 rounded-md border px-3 py-2 text-sm font-semibold transition ${
                isChecked
                  ? "border-meadow/20 bg-meadow/10 text-green-950/55"
                  : "border-transparent bg-green-950/6 text-green-950/76 hover:border-meadow/20 hover:bg-meadow/8"
              }`}
              key={itemId}
            >
              <input
                checked={isChecked}
                className="h-5 w-5 accent-meadow"
                onChange={(event) => {
                  const checked = event.target.checked;
                  onToggle((current) => ({ ...current, [itemId]: checked }));
                }}
                type="checkbox"
              />
              <span className={isChecked ? "line-through decoration-green-950/40" : undefined}>{formatItemName(item)}</span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

function ProgressBar({ percent, size = "regular" }: { percent: number; size?: "regular" | "large" }) {
  return (
    <div className={`${size === "large" ? "h-4" : "h-3"} mt-4 overflow-hidden rounded-full bg-green-950/10`}>
      <div className="h-full rounded-full bg-meadow transition-[width]" style={{ width: `${percent}%` }} />
    </div>
  );
}

function SourceLink({ sourceUrls }: { sourceUrls: string[] }) {
  if (sourceUrls.length === 0) {
    return null;
  }

  return (
    <a className="w-fit rounded-md bg-green-950/6 px-2.5 py-1 text-xs font-bold text-green-950/58 hover:bg-green-950/10" href={sourceUrls[0]} rel="noreferrer" target="_blank">
      Source
    </a>
  );
}

function getProgress(itemIds: string[], checkedItems: CheckedState) {
  const total = itemIds.length;
  const completed = itemIds.filter((itemId) => checkedItems[itemId] === true).length;

  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100)
  };
}

function getBundleItems(bundle: Bundle) {
  return bundle.items;
}

function getItemId(bundle: Bundle, item: Bundle["items"][number]) {
  return `${bundle.slug}:${item.id}`;
}

function formatItemName(item: Bundle["items"][number]) {
  return item.quantity === 1 ? item.name : `${item.name} x${item.quantity}`;
}
