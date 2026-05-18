import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Player Codex | Stardew Guide",
  description: "A fan-made Stardew Valley guide for villagers, crops, fish, and Community Center bundles.",
  other: {
    "google-adsense-account": "ca-pub-5708282524875348"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
