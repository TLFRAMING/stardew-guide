import Link from "next/link";
import type { MoneyGuide } from "@/lib/stardew/types";

export function MoneyGuideDirectory({ guides }: { guides: MoneyGuide[] }) {
  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-amber-500/20 bg-amber-50/80 p-4">
        <p className="text-sm font-bold text-amber-900">Use these routes as planning guides, then adjust for your farm layout, season, professions, and available machines.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Link className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-amber-500/35" href={`/stardew/money/${guide.slug}`} key={guide.slug}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{formatLabel(guide.category)}</p>
                <h2 className="mt-1 text-xl font-bold text-green-950">{guide.shortName}</h2>
              </div>
              <span className="w-fit rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">{formatLabel(guide.bestStage)}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-green-950/70">{guide.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip label="Profit" value={formatLabel(guide.profitPotential)} />
              <Chip label="Labor" value={formatLabel(guide.laborCost)} />
              <Chip label="Risk" value={formatLabel(guide.versionRisk)} />
            </div>
          </Link>
        ))}
      </section>

      <section className="rounded-lg border border-green-950/10 bg-white p-4 shadow-soft">
        <h2 className="text-xl font-bold text-green-950">Strategy Comparison</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-green-950/10 text-xs uppercase tracking-wide text-green-950/50">
                <th className="py-3 pr-4">Strategy</th>
                <th className="py-3 pr-4">Best stage</th>
                <th className="py-3 pr-4">Profit</th>
                <th className="py-3 pr-4">Labor</th>
                <th className="py-3 pr-4">Automation</th>
                <th className="py-3">Version risk</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((guide) => (
                <tr className="border-b border-green-950/8 last:border-b-0" key={guide.slug}>
                  <td className="py-3 pr-4 font-bold text-green-950">
                    <Link className="hover:text-amber-700" href={`/stardew/money/${guide.slug}`}>
                      {guide.shortName}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{formatLabel(guide.bestStage)}</td>
                  <td className="py-3 pr-4">{formatLabel(guide.profitPotential)}</td>
                  <td className="py-3 pr-4">{formatLabel(guide.laborCost)}</td>
                  <td className="py-3 pr-4">{formatLabel(guide.automation)}</td>
                  <td className="py-3">{formatLabel(guide.versionRisk)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-md bg-green-950/6 px-2.5 py-1 text-xs font-bold text-green-950/62">
      {label}: {value}
    </span>
  );
}

export function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
