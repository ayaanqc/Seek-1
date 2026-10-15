"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BOOKS } from "./books-data";
import { MAX_QTY } from "./checkout-logic";
import type { Book, CartItem } from "./types";

export interface Toast {
  id: number;
  message: string;
}

export interface DetailedItem {
  book: Book;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  detailed: DetailedItem[];
  count: number;
  subtotal: number;
  isBagOpen: boolean;
  setBagOpen: (open: boolean) => void;
  add: (bookId: string, qty?: number) => void;
  remove: (bookId: string) => void;
  setQty: (bookId: string, qty: number) => void;
  clear: () => void;
  toasts: Toast[];
  notify: (message: string) => void;
  readerId: string | null;
  setReaderId: (id: string | null) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "marginalia-bag-v1";
const TOAST_MS = 2400;

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.floor(qty)));
}

/** Drop anything from storage that isn't a known book with a sane quantity. */
function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: CartItem[] = [];
  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) continue;
    const { bookId, quantity } = entry as Partial<CartItem>;
    if (typeof bookId !== "string" || seen.has(bookId)) continue;
    if (!BOOKS.some((b) => b.id === bookId)) continue;
    seen.add(bookId);
    out.push({ bookId, quantity: clampQty(Number(quantity)) });
  }
  return out;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBagOpen, setBagOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [readerId, setReaderId] = useState<string | null>(null);

  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(sanitize(JSON.parse(raw)));
    } catch {
      // Corrupt storage is not fatal — start from an empty bag.
    } finally {
      hydrated.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private mode / quota — the bag still works for this session.
    }
  }, [items]);

  // Clear any pending toast timers on unmount.
  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    const timer = setTimeout(() => {
      timers.current.delete(id);
      setToasts((t) => t.filter((x) => x.id !== id));
    }, TOAST_MS);
    timers.current.set(id, timer);
  }, []);

  const add = useCallback(
    (bookId: string, qty = 1) => {
      const book = BOOKS.find((b) => b.id === bookId);
      if (!book) return;
      setItems((prev) => {
        const found = prev.find((i) => i.bookId === bookId);
        if (found) {
          return prev.map((i) =>
            i.bookId === bookId ? { ...i, quantity: clampQty(i.quantity + qty) } : i
          );
        }
        return [...prev, { bookId, quantity: clampQty(qty) }];
      });
      notify(`Added \u201C${book.title}\u201D to bag`);
    },
    [notify]
  );

  const remove = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((i) => i.bookId !== bookId));
  }, []);

  const setQty = useCallback((bookId: string, qty: number) => {
    setItems((prev) => {
      if (!Number.isFinite(qty) || qty <= 0) return prev.filter((i) => i.bookId !== bookId);
      return prev.map((i) => (i.bookId === bookId ? { ...i, quantity: clampQty(qty) } : i));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo<DetailedItem[]>(() => {
    const byId = new Map(BOOKS.map((b) => [b.id, b]));
    return items.flatMap((i) => {
      const book = byId.get(i.bookId);
      return book ? [{ book, quantity: i.quantity }] : [];
    });
  }, [items]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => Math.round(detailed.reduce((sum, d) => sum + d.book.price * d.quantity, 0) * 100) / 100,
    [detailed]
  );

  const value: CartContextValue = {
    items,
    detailed,
    count,
    subtotal,
    isBagOpen,
    setBagOpen,
    add,
    remove,
    setQty,
    clear,
    toasts,
    notify,
    readerId,
    setReaderId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
