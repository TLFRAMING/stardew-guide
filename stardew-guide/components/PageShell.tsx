export function PageShell({
  children,
  eyebrow,
  kicker,
  title
}: {
  children: React.ReactNode;
  eyebrow: string;
  kicker?: string;
  title: string;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-lg border border-green-950/10 bg-white/72 px-4 py-5 shadow-soft sm:px-5 sm:py-6">
        <div className="mb-4 h-1.5 w-16 rounded-full bg-meadow" />
        <p className="text-xs font-bold uppercase tracking-wide text-meadow sm:text-sm">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-3xl font-bold text-green-950 sm:text-5xl">{title}</h1>
        {kicker ? <p className="mt-3 max-w-2xl text-sm leading-6 text-green-950/64">{kicker}</p> : null}
      </header>
      <div className="mt-5 sm:mt-6">{children}</div>
    </main>
  );
}
