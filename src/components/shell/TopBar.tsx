import Link from "next/link";

export function TopBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <Link href="/deck" className="text-sm font-semibold tracking-wide">
            OPK Observation Deck
          </Link>
          <span className="text-xs text-zinc-500">read-only</span>
        </div>
        <div className="text-xs text-zinc-500">
          Everything is logged.
        </div>
      </div>
    </div>
  );
}
