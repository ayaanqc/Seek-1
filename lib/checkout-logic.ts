import { BOOKS } from "./books-data";
import type { Order, OrderItem } from "./types";

export const MAX_QTY = 9;

export interface CheckoutPayload {
  items?: unknown;
  shipping?: unknown;
}

export type CheckoutResult =
  | { ok: true; order: Order }
  | { ok: false; status: number; error: string };

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Injectable entropy/time so the logic stays deterministic under test. */
export interface CheckoutOptions {
  now?: () => Date;
  random?: () => number;
}

export function makeId(prefix: string, options: CheckoutOptions = {}): string {
  const random = options.random ?? Math.random;
  const now = options.now ?? (() => new Date());
  let rand = "";
  for (let i = 0; i < 6; i += 1) {
    rand += ID_ALPHABET[Math.floor(random() * ID_ALPHABET.length)] ?? "X";
  }
  const time = now().getTime().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${rand}${time}`;
}

/** Clamp a raw quantity to a safe integer in [1, MAX_QTY]. Never returns NaN. */
export function clampQty(raw: unknown): number {
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_QTY, Math.max(1, n));
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Validate a bag payload and build a confirmed order. Pure — no network or DB. */
export function buildOrder(payload: CheckoutPayload, options: CheckoutOptions = {}): CheckoutResult {
  const rawItems = payload.items;
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return { ok: false, status: 400, error: "Bag is empty" };
  }
  if (rawItems.length > 50) {
    return { ok: false, status: 400, error: "Too many line items" };
  }

  const shipping = isRecord(payload.shipping) ? payload.shipping : {};
  const name = asString(shipping.name);
  const email = asString(shipping.email);
  const address = asString(shipping.address);
  const city = asString(shipping.city);
  const postal = asString(shipping.postal);

  if (!name) return { ok: false, status: 400, error: "Shipping name is required" };
  if (!isEmail(email)) return { ok: false, status: 400, error: "A valid email is required" };
  if (!address) return { ok: false, status: 400, error: "Shipping address is required" };

  const merged = new Map<string, number>();
  for (const raw of rawItems) {
    if (!isRecord(raw)) {
      return { ok: false, status: 400, error: "Malformed bag item" };
    }
    const bookId = asString(raw.bookId);
    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) return { ok: false, status: 400, error: `Unknown book: ${bookId || "(missing id)"}` };
    // Merge duplicate lines instead of double-counting or dropping them.
    const next = (merged.get(book.id) ?? 0) + clampQty(raw.quantity);
    merged.set(book.id, Math.min(MAX_QTY, next));
  }

  const items: OrderItem[] = [];
  let total = 0;
  let itemCount = 0;
  for (const [bookId, quantity] of merged) {
    const book = BOOKS.find((b) => b.id === bookId)!;
    total += book.price * quantity;
    itemCount += quantity;
    items.push({ bookId, title: book.title, quantity, unitPrice: book.price });
  }

  const order: Order = {
    id: makeId("MARG", options),
    trackingCode: makeId("TRK", options),
    items,
    totalAmount: Math.round(total * 100) / 100,
    itemCount,
    shippingAddress: { name, email, address, city, postal },
    createdAt: (options.now ?? (() => new Date()))().toISOString(),
    status: "confirmed",
    dispatchDays: "Ships in 2-3 days via tracked post",
  };

  return { ok: true, order };
}
