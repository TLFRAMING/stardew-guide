import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataCard, TagList } from "@/components/DataCard";
import { PageShell } from "@/components/PageShell";
import { StardewDetailUseGuide } from "@/components/StardewDetailUseGuide";
import { getAllCraftingRecipes, getCraftingRecipeBySlug } from "@/lib/stardew/data";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getCraftingRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Crafting Recipe Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley crafting recipe page could not be found."
    };
  }

  return {
    title: `${recipe.name} Stardew Valley Crafting Recipe: Ingredients and Unlock`,
    description: `${recipe.name} crafting recipe guide: ingredients ${recipe.ingredientsText}, output ${recipe.outputQuantity} ${recipe.productName}, unlock ${formatUnlock(recipe.unlockMethod, recipe.unlockType)}.`
  };
}

export function generateStaticParams() {
  return getAllCraftingRecipes().map((recipe) => ({ slug: recipe.slug }));
}

export default async function CraftingRecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getCraftingRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <PageShell eyebrow="Crafting Recipe" title={recipe.name}>
      <div className="space-y-4">
        <DataCard>
          <h2 className="text-xl font-black text-green-950">{recipe.name} quick answer</h2>
          <p className="mt-3 text-sm leading-6 text-green-950/72">{recipe.beginnerNote}</p>
        </DataCard>

        <DataCard>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Ingredients" value={recipe.ingredientsText || "None listed"} />
            <Fact label="Output" value={`${recipe.outputQuantity} ${recipe.productName}`} />
            <Fact label="Unlock" value={formatUnlock(recipe.unlockMethod, recipe.unlockType)} />
            <Fact label="Craft Master" value={recipe.craftMaster ? "Yes" : "No"} />
          </dl>
          <TagList label="Flags" values={[recipe.starterRecipe ? "Starter recipe" : "Unlock required", recipe.consumable ? "Consumable" : "Reusable or placed item", recipe.introducedIn16 ? "Stardew 1.6 item" : "Pre-1.6 or base recipe"]} />
          <SourceBlock lastChecked={recipe.lastChecked} sourceUrls={recipe.sourceUrls} />
        </DataCard>

        <StardewDetailUseGuide
          title={`Craft ${recipe.name} when it solves a current bottleneck`}
          problem="Crafting spends resources that may also be needed for tools, machines, buildings, or Community Center progress."
          steps={[
            "Check the ingredient list before spending scarce bars, wood, stone, monster loot, or special items.",
            "Craft immediately when the output removes a current bottleneck such as watering time, processing capacity, storage, defense, or mobility.",
            "Delay crafting when the item is only nice to have and the ingredients block a stronger near-term goal.",
            "If Craft Master completion matters, keep a checklist instead of crafting randomly from memory."
          ]}
          links={[
            { href: "/stardew/crafting-recipes", label: "All crafting recipes" },
            { href: "/stardew/minerals", label: "Minerals" },
            { href: "/stardew/artisan-goods", label: "Artisan goods" }
          ]}
        />
      </div>
    </PageShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-green-950/6 p-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-green-950/48">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-green-950">{value}</dd>
    </div>
  );
}

function SourceBlock({ lastChecked, sourceUrls }: { lastChecked: string; sourceUrls: string[] }) {
  return (
    <p className="mt-5 text-xs leading-5 text-green-950/52">
      Last checked: {lastChecked} | Source:{" "}
      {sourceUrls[0] ? (
        <a className="font-semibold text-pond hover:underline" href={sourceUrls[0]} rel="noreferrer" target="_blank">
          Stardew Valley Wiki
        </a>
      ) : (
        "Local Stardew database"
      )}
    </p>
  );
}

function formatUnlock(unlockMethod: string, unlockType: string) {
  const value = unlockMethod || unlockType;
  return isDisplaySafe(value) ? value : "Listed in local data";
}

function isDisplaySafe(value: string) {
  return Boolean(value) && /^[\x20-\x7E]+$/.test(value);
}
