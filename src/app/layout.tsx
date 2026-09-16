import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Hassan — Agentic AI Developer × DevOps Engineer",
  description: "I build agents that act. Infrastructure that scales. Ahmad Hassan — Agentic AI Developer × DevOps Engineer.",
  robots: { index: false, follow: false }, // Local review phase; revisit with the verified production domain.
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
