import { NextResponse } from "next/server";
import { buildOrder } from "@/lib/checkout-logic";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = buildOrder(payload as { items?: unknown; shipping?: unknown });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ order: result.order }, { status: 201 });
}
