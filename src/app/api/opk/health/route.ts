import { NextResponse } from "next/server";

const KERNEL_BASE_URL = process.env.OPK_KERNEL_BASE_URL;
const OBSERVER_TOKEN = process.env.OPK_OBSERVER_TOKEN;

export async function GET() {
  if (!KERNEL_BASE_URL || !OBSERVER_TOKEN) {
    return NextResponse.json(
      { error: "Kernel not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${KERNEL_BASE_URL}/ops/health`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${OBSERVER_TOKEN}`,
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Kernel unavailable" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Kernel unreachable" },
      { status: 502 }
    );
  }
}

/**
 * HARD SAFETY:
 * No POST / PUT / PATCH / DELETE exports.
 * This file is observe-only by design.
 */
