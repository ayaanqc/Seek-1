"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BOOKS } from "./books-data";
import type { Book, CartItem } from "./types";

interface Toast {
  id: number;
  message: string;
}

interface CartContextValue {
  items: CartItem[];
  detailed: { book: Book; quantity: number }[];
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBagOpen, setBagOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [readerId, setReaderId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed.filter((i) => BOOKS.some((b) => b.id === i.bookId)));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2400);
  }, []);

  const add = useCallback(
    (bookId: string, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((i) => i.bookId === bookId);
        if (found) return prev.map((i) => (i.bookId === bookId ? { ...i, quantity: Math.min(9, i.quantity + qty) } : i));
        return [...prev, { bookId, quantity: qty }];
      });
      const book = BOOKS.find((b) => b.id === bookId);
      notify(book ? `Added “${book.title}” to bag` : "Added to bag");
    },
    [notify]
  );

  const remove = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((i) => i.bookId !== bookId));
  }, []);

  const setQty = useCallback((bookId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.bookId !== bookId)
        : prev.map((i) => (i.bookId === bookId ? { ...i, quantity: Math.min(9, qty) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo(
    () =>
      items
        .map((i) => ({ book: BOOKS.find((b) => b.id === i.bookId)!, quantity: i.quantity }))
        .filter((d) => Boolean(d.book)),
    [items]
  );

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const subtotal = useMemo(() => detailed.reduce((s, d) => s + d.book.price * d.quantity, 0), [detailed]);

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
