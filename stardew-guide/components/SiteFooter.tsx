import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-t border-green-950/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-green-950/52">Fan-made guide for Stardew Valley. Not affiliated with ConcernedApe.</p>
        <nav className="flex gap-3 text-xs font-bold text-green-950/58">
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
