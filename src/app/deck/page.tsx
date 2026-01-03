"use client";

import { useEffect, useMemo, useState } from "react";
import type { OpkEvent } from "@/lib/opk/types";
import { fetchEvents } from "@/lib/opk/client";

function EventRow({ e }: { e: OpkEvent }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 hover:bg-zinc-900/30">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold">{e.type}</div>
        <div className="text-xs text-zinc-500">{new Date(e.ts).toLocaleString()}</div>
      </div>
      <div className="mt-1 text-sm text-zinc-200">{e.summary}</div>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
        <span className="rounded-md border border-zinc-800 px-2 py-0.5">{e.severity}</span>
        {e.verdict && (
          <span className="rounded-md border border-zinc-800 px-2 py-0.5">
            verdict: {e.verdict}
          </span>
        )}
        {e.health_state && (
          <span className="rounded-md border border-zinc-800 px-2 py-0.5">
            health: {e.health_state}
          </span>
        )}
        {e.origin_id && (
          <span className="rounded-md border border-zinc-800 px-2 py-0.5">
            origin: {e.origin_id}
          </span>
        )}
        {e.job_id && (
          <span className="rounded-md border border-zinc-800 px-2 py-0.5">
            job: {e.job_id}
          </span>
        )}
        {(e.tags ?? []).slice(0, 4).map((t) => (
          <span key={t} className="rounded-md border border-zinc-800 px-2 py-0.5">
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DeckPage() {
  const [events, setEvents] = useState<OpkEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  const latestTs = useMemo(() => events[0]?.ts, [events]);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const initial = await fetchEvents({ limit: 100 });
        if (!cancelled) setEvents(initial.sort((a, b) => (a.ts < b.ts ? 1 : -1)));
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Failed to load events";
          setError(msg);
        }
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isPolling) return;

    const t = setInterval(async () => {
      try {
        const fresh = await fetchEvents({ since: latestTs });
        if (!fresh.length) return;

        // Prepend newest first, dedupe by id
        setEvents((prev) => {
          const seen = new Set(prev.map((p) => p.id));
          const merged = [...fresh.filter((f) => !seen.has(f.id)), ...prev];
          return merged.sort((a, b) => (a.ts < b.ts ? 1 : -1));
        });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Polling error";
        setError(msg);
      }
    }, 2500);

    return () => clearInterval(t);
  }, [isPolling, latestTs]);

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Live Feed</h1>
          <p className="text-sm text-zinc-400">
            Read-only event stream. No buttons. No спасать.
          </p>
        </div>
        <button
          className="rounded-lg border border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-900/40"
          onClick={() => setIsPolling((v) => !v)}
        >
          {isPolling ? "Pause" : "Resume"}
        </button>
      </header>

      {error && (
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-400">
            No events yet. If the kernel proxy is wired, check OPK_KERNEL_BASE_URL and that
            the kernel exposes /ops/events.
          </div>
        ) : (
          events.map((e) => <EventRow key={e.id} e={e} />)
        )}
      </div>
    </div>
  );
}
