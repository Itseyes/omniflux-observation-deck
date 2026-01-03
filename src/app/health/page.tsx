"use client";

import { useEffect, useState } from "react";
import type { HealthEntity } from "@/lib/opk/types";
import { fetchHealth } from "@/lib/opk/client";

function HealthRow({ h }: { h: HealthEntity }) {
  let statusColor = "text-zinc-500";
  if (h.status === "ALIVE") statusColor = "text-emerald-400";
  if (h.status === "STRUGGLING") statusColor = "text-amber-400";
  if (h.status === "DEAD") statusColor = "text-rose-400";

  return (
    <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
      <td className="px-4 py-3 text-sm font-medium text-zinc-200">
        <span className="mr-2 rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
          {h.kind}
        </span>
        {h.id}
      </td>
      <td className={`px-4 py-3 text-sm font-semibold ${statusColor}`}>{h.status}</td>
      <td className="px-4 py-3 text-sm text-zinc-400">{h.cause}</td>
      <td className="px-4 py-3 text-sm text-zinc-500 font-mono">
        {new Date(h.lastSeen).toLocaleString()}
      </td>
    </tr>
  );
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthEntity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        const data = await fetchHealth();
        if (!cancelled) setHealth(data);
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Failed to load health status";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Health Wall</h1>
        <p className="text-zinc-400">Real-time status of all observed entities.</p>
      </header>

      {error && (
        <div className="mb-6 rounded-lg border border-rose-900/50 bg-rose-950/30 p-4 text-sm text-rose-200">
          Error: {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <table className="w-full text-left">
          <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Entity</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Cause</th>
              <th className="px-4 py-3 font-medium">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {health.length === 0 && !loading && !error && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No data / kernel unavailable
                </td>
              </tr>
            )}
            {health.map((h, i) => (
              <HealthRow key={i} h={h} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
