import type { Metadata } from "next";
import { CropDirectory } from "@/components/CropDirectory";
import { PageShell } from "@/components/PageShell";
import { getAllCrops } from "@/lib/stardew/data";

export const metadata: Metadata = {
  title: "Crops Database | Stardew Guide",
  description: "Browse Stardew Valley crops by name and season with growth, sell price, and use notes."
};

export default function CropsPage() {
  const crops = getAllCrops();

  return (
    <PageShell eyebrow="Crops Database" title="Crops">
      <CropDirectory crops={crops} />
    </PageShell>
  );
}
