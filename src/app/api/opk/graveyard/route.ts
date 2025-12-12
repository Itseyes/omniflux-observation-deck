import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.OPK_KERNEL_BASE_URL;
  if (!base) {
    return NextResponse.json({ verdicts: [], error: "OPK_KERNEL_BASE_URL missing" }, { status: 500 });
  }

  const target = `${base.replace(/\/+$/, "")}/ops/graveyard`;

  const headers: Record<string, string> = {};
  const token = process.env.OPK_OBSERVER_TOKEN?.trim();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const r = await fetch(target, { headers, cache: "no-store" });
  const text = await r.text();

  try {
    const json = JSON.parse(text);
    return NextResponse.json(json, { status: r.status });
  } catch {
    return NextResponse.json({ verdicts: [], error: text }, { status: r.status });
  }
}
