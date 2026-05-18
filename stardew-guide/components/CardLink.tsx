import Link from "next/link";

type CardTone = "meadow" | "pond" | "berry" | "gold";

const toneStyles: Record<CardTone, { accent: string; marker: string; markerText: string }> = {
  meadow: {
    accent: "bg-meadow",
    marker: "bg-meadow/10 text-meadow",
    markerText: "Gifts"
  },
  pond: {
    accent: "bg-pond",
    marker: "bg-pond/10 text-pond",
    markerText: "Crops"
  },
  berry: {
    accent: "bg-berry",
    marker: "bg-berry/10 text-berry",
    markerText: "Fish"
  },
  gold: {
    accent: "bg-amber-500",
    marker: "bg-amber-100 text-amber-800",
    markerText: "Tracker"
  }
};

export function CardLink({
  description,
  href,
  tone = "meadow",
  title
}: {
  description: string;
  href: string;
  tone?: CardTone;
  title: string;
}) {
  const styles = toneStyles[tone];

  return (
    <Link className="group overflow-hidden rounded-lg border border-green-950/10 bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-green-950/20" href={href}>
      <div className={`h-1.5 ${styles.accent}`} />
      <div className="p-5">
        <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${styles.marker}`}>{styles.markerText}</span>
        <h2 className="mt-4 text-xl font-bold text-green-950">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-green-950/68">{description}</p>
      </div>
    </Link>
  );
}
