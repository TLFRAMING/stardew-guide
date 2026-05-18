import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Player Codex",
  description: "Privacy information for Player Codex."
};

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Player Codex" title="Privacy Policy">
      <section className="rounded-lg border border-green-950/10 bg-white p-5 shadow-soft">
        <div className="max-w-3xl space-y-4 text-sm leading-6 text-green-950/72">
          <p>
            Player Codex may use basic cookies, analytics, or third-party services to understand site usage and improve the guide experience.
          </p>
          <p>
            In the future, Player Codex may use Google AdSense or other third-party advertising services.
          </p>
          <p>
            Third-party advertising services may use cookies or similar technologies to personalize ads, measure performance, and prevent abuse.
          </p>
          <p>
            You can manage cookies through your browser settings. Player Codex does not require an account for the current guide experience.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
