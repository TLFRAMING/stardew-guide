type DetailUseGuideLink = {
  href: string;
  label: string;
};

export function StardewDetailUseGuide({
  title,
  problem,
  steps,
  links = []
}: {
  links?: DetailUseGuideLink[];
  problem: string;
  steps: string[];
  title: string;
}) {
  return (
    <section className="rounded-md border border-green-950/10 bg-white/85 px-4 py-5 sm:px-5">
      <div className="mb-4 border-b border-green-950/10 pb-3">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-green-950/44">How to use this data</p>
        <h2 className="mt-1 text-lg font-black text-green-950">{title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-green-950/66">{problem}</p>
      </div>
      <ol className="space-y-2 text-sm font-semibold leading-6 text-green-950/68">
        {steps.map((step) => (
          <li className="rounded-md bg-green-950/[0.035] px-3 py-2" key={step}>
            {step}
          </li>
        ))}
      </ol>
      {links.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((link) => (
            <a className="rounded-sm border border-pond/20 bg-pond/10 px-2.5 py-1.5 text-xs font-black text-pond transition hover:bg-pond/15" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
