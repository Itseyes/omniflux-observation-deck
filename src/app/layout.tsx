import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";

export const metadata = {
  title: "OPK Observation Deck",
  description: "Read-only mission control for OPK governance and events.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
