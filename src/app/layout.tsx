import type { Metadata } from "next";
import { SITE_URL, isIndexableDeployment } from "@/lib/site-seo";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ahmad Hassan | Agentic AI Developer in Lahore",
  description: "Ahmad Hassan, Agentic AI Developer and DevOps Engineer based in Lahore, Pakistan. Explore his AI agents, RAG systems, cloud infrastructure and projects.",
  alternates: { canonical: "/" },
  robots: { index: isIndexableDeployment(), follow: isIndexableDeployment() },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
