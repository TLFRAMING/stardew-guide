import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MoneyGuideDetail } from "@/components/MoneyGuideDetail";
import { PageShell } from "@/components/PageShell";
import { getAllMoneyGuides, getMoneyGuideBySlug } from "@/lib/stardew/data";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getMoneyGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Money Guide Not Found | Stardew Guide | Player Codex",
      description: "This Stardew Valley money-making guide could not be found."
    };
  }

  return {
    title: `${guide.title} | Stardew Guide | Player Codex`,
    description: guide.summary
  };
}

export function generateStaticParams() {
  return getAllMoneyGuides().map((guide) => ({ slug: guide.slug }));
}

export default async function MoneyGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getMoneyGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <PageShell eyebrow="Money-Making Guides" kicker={guide.summary} title={guide.title}>
      <MoneyGuideDetail guide={guide} />
    </PageShell>
  );
}
