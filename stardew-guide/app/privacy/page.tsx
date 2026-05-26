import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Player Codex",
  description: "Privacy information for Player Codex, including cookies, analytics, advertising services, and user data handling."
};

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Player Codex" kicker="How Player Codex handles basic site data, cookies, and third-party services." title="Privacy Policy">
      <div className="space-y-4">
        <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
          <div className="max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
            <p>
              Player Codex is a fan-made guide and database site. The current site does not require user accounts, paid memberships, logins, or user-submitted profiles.
            </p>
            <p>
              Player Codex may use basic cookies, analytics, hosting logs, or third-party services to understand site usage, maintain security, and improve the guide experience.
            </p>
            <p>
              Last updated: May 26, 2026.
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-black text-green-950">Advertising and cookies</h2>
          <div className="mt-3 max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
            <p>
              Player Codex may use Google AdSense or other third-party advertising services. These services may use cookies or similar technologies to personalize ads, measure ad performance, prevent abuse, and limit repeated ads.
            </p>
            <p>
              Third-party vendors, including Google, may use cookies to serve ads based on prior visits to this site or other websites. Users can manage personalized advertising preferences through their Google ad settings and browser cookie controls.
            </p>
            <p>
              Player Codex does not ask users to click ads, does not provide rewards for ad interactions, and does not place advertising code on pages that are designed only for ads.
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-black text-green-950">Data collected by this site</h2>
          <div className="mt-3 max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
            <p>
              Basic technical data may be processed by hosting, analytics, or security providers. This can include page URL, browser type, device type, approximate region, referring page, and timestamps.
            </p>
            <p>
              Player Codex does not sell personal information and does not collect account passwords, payment details, or private gameplay files.
            </p>
            <p>
              You can disable or delete cookies through your browser settings. Some browser privacy tools may also limit analytics or advertising cookies.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
