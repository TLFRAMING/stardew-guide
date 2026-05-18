import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/villagers", label: "Villagers" },
  { href: "/crops", label: "Crops" },
  { href: "/fish", label: "Fish" },
  { href: "/community-center", label: "Community Center" }
];

export function SiteNav() {
  return (
    <header className="border-b border-green-950/10 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link className="w-fit" href="/">
          <span className="block text-lg font-bold text-green-950">Player Codex</span>
          <span className="block text-xs font-bold uppercase tracking-wide text-meadow">Stardew Guide</span>
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-semibold text-green-950/70">
          {navItems.map((item) => (
            <Link className="rounded-md px-3 py-2 hover:bg-green-950/6 hover:text-green-950" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
