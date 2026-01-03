"use client";

import { useEffect, useState } from "react";
import type { GraveyardVerdict } from "@/lib/opk/types";
import { fetchGraveyard } from "@/lib/opk/client";

function Tombstone({ v }: { v: GraveyardVerdict }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900/30">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">{v.title}</div>
        <div className="text-xs text-zinc-500">{new Date(v.ts).toLocaleString()}</div>
      </div>
      <div className="mt-1 text-sm text-zinc-300">{v.cause}</div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
        <span className="rounded-md border border-zinc-800 px-2 py-0.5">{v.severity}</span>
        {v.origin_id && (
          <span className="rounded-md border border-zinc-800 px-2 py-0.5">origin: {v.origin_id}</span>
        )}
        {v.job_id && (
          <span className="rounded-md border border-zinc-800 px-2 py-0.5">job: {v.job_id}</span>
        )}
        {(v.tags ?? []).slice(0, 4).map((t) => (
          <span key={t} className="rounded-md border border-zinc-800 px-2 py-0.5">#{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function GraveyardPage() {
  const [verdicts, setVerdicts] = useState<GraveyardVerdict[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const v = await fetchGraveyard();
        if (!cancelled) setVerdicts(v.sort((a, b) => (a.ts < b.ts ? 1 : -1)));
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Failed to load graveyard";
          setError(msg);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold">Graveyard</h1>
        <p className="text-sm text-zinc-400">
          Where bad ideas go to rest. Permanently.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {verdicts.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-400">
          No verdicts yet. If the kernel proxy is wired, check /ops/graveyard.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {verdicts.map((v) => (
            <Tombstone key={v.id} v={v} />
          ))}
        </div>
      )}
    </div>
  );
}
