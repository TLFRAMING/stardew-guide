import Link from "next/link";

const gameNavItems = [
  { href: "/stardew", label: "Stardew Guide", status: "Live" },
  { href: "/rogue-command", label: "Rogue Command", status: "Live" },
  { href: "/nova-roma", label: "Nova Roma", status: "Live" },
  { href: "/songs-of-conquest-mobile", label: "Songs Mobile", status: "Live" }
];

export function SiteNav() {
  return (
    <header className="codex-nav backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link className="flex w-fit max-w-full items-center gap-3" href="/">
          <span className="codex-brand-mark rounded-sm text-sm font-black">PC</span>
          <span className="min-w-0">
            <span className="block text-lg font-black leading-tight text-green-950">Player Codex</span>
            <span className="block break-words text-[11px] font-black uppercase tracking-[0.16em] text-meadow">Multi-game guide index</span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-bold text-green-950/72" aria-label="Game navigation">
          {gameNavItems.map((item) => (
            <Link className="codex-tab rounded-sm px-3 py-2 leading-none" href={item.href} key={item.href}>
              <span>{item.label}</span>
              <span className="ml-2 text-[10px] font-black uppercase tracking-[0.12em] text-green-950/42">{item.status}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
