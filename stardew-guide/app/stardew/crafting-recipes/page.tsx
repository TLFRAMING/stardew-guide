import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { StardewReferenceDirectory } from "@/components/StardewReferenceDirectory";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllCraftingRecipes } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Stardew Valley Crafting Recipes: Ingredients, Unlocks, and Craft Master",
  description: "Browse Stardew Valley crafting recipes by ingredients, unlock method, output quantity, Craft Master status, and practical crafting use."
};

export default function CraftingRecipesPage() {
  const recipes = getAllCraftingRecipes();

  return (
    <PageShell eyebrow="Crafting Database" title="Stardew Valley Crafting Recipes" kicker="Use crafting pages to check ingredients, unlocks, output quantity, Craft Master status, and whether the item solves your current farm problem.">
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Crafting checks",
              description: "Pair recipes with mining, animals, and artisan routes before spending scarce bars, wood, stone, or monster loot.",
              links: [
                { href: "/stardew/minerals", label: "Minerals" },
                { href: "/stardew/animals", label: "Animals" },
                { href: "/stardew/artisan-goods", label: "Artisan Goods" },
                { href: "/stardew/database", label: "Stardew Database" }
              ]
            }
          ]}
          title="Crafting routes to check first"
        />
        <StardewReferenceDirectory
          basePath="/stardew/crafting-recipes"
          countLabel="Crafting Index"
          items={recipes.map((recipe) => ({
            slug: recipe.slug,
            name: recipe.name,
            badge: recipe.craftMaster ? "Craft Master" : "Crafting",
            facts: [
              { label: "Ingredients", value: recipe.ingredientsText || "None listed" },
              { label: "Output", value: `${recipe.outputQuantity} ${recipe.productName}` },
              { label: "Unlock", value: formatUnlock(recipe.unlockMethod, recipe.unlockType) }
            ],
            note: recipe.beginnerNote
          }))}
          searchPlaceholder="Sprinkler, Keg, Wood..."
          title="Browse crafting recipes"
        />
      </div>
    </PageShell>
  );
}

function formatUnlock(unlockMethod: string, unlockType: string) {
  const value = unlockMethod || unlockType;
  return isDisplaySafe(value) ? value : "Listed in local data";
}

function isDisplaySafe(value: string) {
  return Boolean(value) && /^[\x20-\x7E]+$/.test(value);
}
