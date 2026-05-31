import type { MoneyGuide } from "@/lib/stardew/types";
import { formatLabel } from "@/components/MoneyGuideDirectory";

export function MoneyGuideDetail({ guide }: { guide: MoneyGuide }) {
  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-amber-500/20 bg-amber-50/80 p-4">
        <p className="text-sm font-bold text-amber-900">{getReviewNotice(guide)}</p>
      </section>

      <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-green-950">Quick facts</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Best stage" value={formatLabel(guide.bestStage)} />
          <Fact label="Profit" value={formatLabel(guide.profitPotential)} />
          <Fact label="Labor" value={formatLabel(guide.laborCost)} />
          <Fact label="Automation" value={formatLabel(guide.automation)} />
          <Fact label="Version risk" value={formatLabel(guide.versionRisk)} />
        </dl>
      </section>

      <TextList title="Why it works" values={guide.whyItWorks} />
      <NumberedList title="Setup steps" values={guide.setupSteps} />

      <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-green-950">Profit estimates</h2>
        <div className="mt-4 space-y-3">
          {guide.profitEstimates.map((estimate) => (
            <article className="rounded-lg border border-green-950/10 p-4" key={estimate.label}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="font-bold text-green-950">{estimate.label}</h3>
                <span className="w-fit rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Estimate</span>
              </div>
              <p className="mt-3 text-sm font-bold text-green-950">{estimate.value}</p>
              <p className="mt-2 text-sm leading-6 text-green-950/68">{estimate.assumption}</p>
            </article>
          ))}
        </div>
      </section>

      <TextList title="Best for" values={guide.bestFor} />
      <TextList title="Caveats" values={guide.caveats} />
      <TextList title="What this guide covers" values={guide.articleAngles} />

      <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-green-950">Sources</h2>
        {guide.sourceUrls.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {guide.sourceUrls.map((url) => (
              <li key={url}>
                <a className="font-semibold text-pond hover:underline" href={url} rel="noreferrer" target="_blank">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm font-semibold text-green-950/62">Sources are being verified.</p>
        )}
        <p className="mt-4 text-xs leading-5 text-green-950/50">Last checked: {guide.lastChecked}. {guide.notes}</p>
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-green-950/6 p-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-green-950/45">{label}</dt>
      <dd className="mt-1 text-sm font-bold text-green-950">{value}</dd>
    </div>
  );
}

function TextList({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-green-950">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-green-950/70">
        {values.map((value) => (
          <li key={value}>- {value}</li>
        ))}
      </ul>
    </section>
  );
}

function NumberedList({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-green-950">{title}</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-green-950/70">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ol>
    </section>
  );
}

function getReviewNotice(guide: MoneyGuide) {
  const hasUnderReviewEstimate = guide.profitEstimates.some((estimate) => estimate.confidence === "needs verification");

  if (hasUnderReviewEstimate) {
    return "Strategy notes are written for planning and should be checked against your current save conditions.";
  }

  return "Strategy notes are written for planning and should be checked against your current save conditions.";
}
