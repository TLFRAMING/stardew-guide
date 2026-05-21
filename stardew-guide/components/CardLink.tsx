import Link from "next/link";

type CardTone = "meadow" | "pond" | "berry" | "gold" | "guide";

const toneStyles: Record<CardTone, { className: string; markerText: string }> = {
  meadow: {
    className: "codex-entry-meadow",
    markerText: "Gifts"
  },
  pond: {
    className: "codex-entry-pond",
    markerText: "Crops"
  },
  berry: {
    className: "codex-entry-berry",
    markerText: "Fish"
  },
  gold: {
    className: "codex-entry-gold",
    markerText: "Tracker"
  },
  guide: {
    className: "codex-entry-meadow",
    markerText: "Guides"
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
    <Link className={`codex-entry ${styles.className} group block rounded-md transition`} href={href}>
      <div className="relative flex h-full min-w-0 flex-col gap-4 px-5 py-5 pl-7">
        <div className="flex items-start justify-between gap-3">
          <span className="codex-entry-marker rounded-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em]">{styles.markerText}</span>
          <span className="text-xs font-black uppercase tracking-[0.14em] text-green-950/40 transition group-hover:text-green-950/64">Open</span>
        </div>
        <div className="min-w-0">
          <h2 className="break-words text-xl font-black leading-tight text-green-950">{title}</h2>
          <p className="mt-2 max-w-[16.5rem] break-words text-sm font-semibold leading-6 text-green-950/68 sm:max-w-none">{description}</p>
        </div>
      </div>
    </Link>
  );
}
