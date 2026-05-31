import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { StardewReferenceDirectory } from "@/components/StardewReferenceDirectory";
import { StardewRouteClusterLinks } from "@/components/StardewRouteClusterLinks";
import { getAllCookingRecipes } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Stardew Valley Cooking Recipes: Ingredients, Energy, Buffs, and Sell Price",
  description: "Browse Stardew Valley cooking recipes by ingredients, energy, health, buffs, source, and practical save-or-cook decisions."
};

export default function CookingRecipesPage() {
  const recipes = getAllCookingRecipes();

  return (
    <PageShell eyebrow="Cooking Database" title="Stardew Valley Cooking Recipes" kicker="Use cooking pages to check ingredients, energy, health, buffs, sell price, and whether a recipe fits your next day plan.">
      <div className="space-y-5">
        <StardewRouteClusterLinks
          clusters={[
            {
              title: "Cooking checks",
              description: "Pair recipes with ingredient, animal product, and crop lookups before spending scarce food.",
              links: [
                { href: "/stardew/crops", label: "Crops" },
                { href: "/stardew/animal-products", label: "Animal Products" },
                { href: "/stardew/artisan-goods", label: "Artisan Goods" },
                { href: "/stardew/database", label: "Stardew Database" }
              ]
            }
          ]}
          title="Cooking routes to check first"
        />
        <StardewReferenceDirectory
          basePath="/stardew/cooking-recipes"
          countLabel="Cooking Index"
          items={recipes.map((recipe) => ({
            slug: recipe.slug,
            name: recipe.name,
            badge: recipe.buff === "None" ? "Food" : "Buff",
            facts: [
              { label: "Ingredients", value: recipe.ingredientsText || "None listed" },
              { label: "Energy / Health", value: `${recipe.energy} / ${recipe.health}` },
              { label: "Sell price", value: formatGold(recipe.sellPrice) }
            ],
            note: recipe.beginnerNote
          }))}
          searchPlaceholder="Fried Egg, Lucky Lunch, Egg..."
          title="Browse cooking recipes"
        />
      </div>
    </PageShell>
  );
}

function formatGold(value: number | "needs verification") {
  return typeof value === "number" ? `${value}g` : value;
}
