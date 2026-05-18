import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="codex-footer flex flex-col gap-3 rounded-md px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold leading-5 text-green-950/58">Fan-made guide for Stardew Valley. Not affiliated with ConcernedApe.</p>
        <nav className="flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.12em] text-green-950/58">
          <Link className="hover:text-green-950" href="/database">
            Database
          </Link>
          <Link className="hover:text-green-950" href="/about">
            About
          </Link>
          <Link className="hover:text-green-950" href="/privacy">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
