import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/database", label: "Database" },
  { href: "/villagers", label: "Villagers" },
  { href: "/crops", label: "Crops" },
  { href: "/fish", label: "Fish" },
  { href: "/community-center", label: "Community Center" }
];

export function SiteNav() {
  return (
    <header className="codex-nav backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link className="flex w-fit max-w-full items-center gap-3" href="/">
          <span className="codex-brand-mark rounded-sm text-sm font-black">PC</span>
          <span className="min-w-0">
            <span className="block text-lg font-black leading-tight text-green-950">Player Codex</span>
            <span className="block break-words text-[11px] font-black uppercase tracking-[0.16em] text-meadow">Current codex: Stardew Guide</span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-bold text-green-950/72">
          {navItems.map((item) => (
            <Link className="codex-tab rounded-sm px-3 py-2 leading-none" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
