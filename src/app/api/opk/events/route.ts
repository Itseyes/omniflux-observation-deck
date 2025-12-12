import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const base = process.env.OPK_KERNEL_BASE_URL;
  if (!base) {
    return NextResponse.json({ events: [], error: "OPK_KERNEL_BASE_URL missing" }, { status: 500 });
  }

  const url = new URL(req.url);
  const qs = url.searchParams.toString();
  const target = `${base.replace(/\/+$/, "")}/ops/events${qs ? `?${qs}` : ""}`;

  const headers: Record<string, string> = {};
  const token = process.env.OPK_OBSERVER_TOKEN?.trim();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const r = await fetch(target, { headers, cache: "no-store" });

  // pass-through errors so you see what's wrong immediately
  const text = await r.text();
  try {
    const json = JSON.parse(text);
    return NextResponse.json(json, { status: r.status });
  } catch {
    return NextResponse.json({ events: [], error: text }, { status: r.status });
  }
}
