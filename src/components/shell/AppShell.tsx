import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <TopBar />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 md:grid-cols-[240px_1fr]">
        <aside className="border-b border-zinc-800 md:min-h-[calc(100dvh-56px)] md:border-b-0 md:border-r">
          <SideNav />
        </aside>
        <main className="p-4 md:p-6">{children}</main>
      </div>
      <footer className="mx-auto max-w-6xl px-4 py-6 text-xs text-zinc-500">
        OBSERVATION ONLY — NO CONTROL SURFACES
      </footer>
    </div>
  );
}
