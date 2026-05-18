export function DataCard({ children }: { children: React.ReactNode }) {
  return <article className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">{children}</article>;
}

export function SourceLine({ lastChecked, sourceUrls }: { lastChecked: string; sourceUrls: string[] }) {
  return (
    <p className="mt-5 text-xs leading-5 text-green-950/52">
      Last checked: {lastChecked} · Source:{" "}
      <a className="font-semibold text-pond hover:underline" href={sourceUrls[0]} rel="noreferrer" target="_blank">
        Stardew Valley Wiki
      </a>
    </p>
  );
}

export function TagList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-green-950/60">{label}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => (
          <span className="rounded-md bg-meadow/10 px-2.5 py-1 text-sm font-semibold text-meadow" key={value}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
