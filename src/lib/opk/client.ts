import type { GraveyardVerdict, OpkEvent } from "./types";

type EventsResponse = { events: OpkEvent[] };
type GraveyardResponse = { verdicts: GraveyardVerdict[] };

export async function fetchEvents(params?: {
  limit?: number;
  since?: string; // ISO
  types?: string[];
  tags?: string[];
}): Promise<OpkEvent[]> {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.since) qs.set("since", params.since);
  if (params?.types?.length) qs.set("types", params.types.join(","));
  if (params?.tags?.length) qs.set("tags", params.tags.join(","));

  const res = await fetch(`/api/opk/events?${qs.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetchEvents failed: ${res.status}`);
  const data = (await res.json()) as EventsResponse;
  return data.events ?? [];
}

export async function fetchGraveyard(): Promise<GraveyardVerdict[]> {
  const res = await fetch(`/api/opk/graveyard`, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetchGraveyard failed: ${res.status}`);
  const data = (await res.json()) as GraveyardResponse;
  return data.verdicts ?? [];
}
