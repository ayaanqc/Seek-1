import { NextResponse } from "next/server";
import { BOOKS } from "@/lib/books-data";

interface PayloadItem {
  bookId: string;
  quantity: number;
}

function makeId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const time = Date.now().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${rand}${time}`;
}

export async function POST(req: Request) {
  let body: { items?: PayloadItem[]; shipping?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const items = body.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Bag is empty" }, { status: 400 });
  }

  let total = 0;
  let count = 0;
  const detailed = [];
  for (const it of items) {
    const book = BOOKS.find((b) => b.id === it.bookId);
    if (!book) return NextResponse.json({ error: `Unknown book: ${it.bookId}` }, { status: 400 });
    const qty = Math.min(9, Math.max(1, Number(it.quantity) || 1));
    total += book.price * qty;
    count += qty;
    detailed.push({ bookId: book.id, title: book.title, quantity: qty, unitPrice: book.price });
  }

  const order = {
    id: makeId("MARG"),
    trackingCode: makeId("TRK"),
    items: detailed,
    totalAmount: Math.round(total * 100) / 100,
    itemCount: count,
    shippingAddress: {
      name: String(body.shipping?.name ?? "Reader"),
      email: String(body.shipping?.email ?? "reader@example.com"),
      address: String(body.shipping?.address ?? ""),
      city: String(body.shipping?.city ?? ""),
      postal: String(body.shipping?.postal ?? ""),
    },
    createdAt: new Date().toISOString(),
    status: "confirmed",
    dispatchDays: "Ships in 2–3 days via tracked post",
  };

  return NextResponse.json({ order });
}
