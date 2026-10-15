"use client";

import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { CATEGORIES } from "@/lib/books-data";

export default function Header({
  query,
  setQuery,
  category,
  setCategory,
}: {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
}) {
  const { count, setBagOpen } = useCart();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3 text-[12px] font-mono text-muted">
          <span>{today} — Vol. IV</span>
          <span className="hidden sm:inline">Essential Dialectics &amp; Selected Prose</span>
          <span>Edition No. 42</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line py-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight">MARGINALIA</h1>
            <p className="text-[13px] text-graphite">A curated bookstore &amp; reading salon</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, author…"
                className="w-64 rounded-md border border-line bg-white py-2 pl-9 pr-3 text-sm focus:border-terracotta focus:outline-none"
              />
            </div>
            <button
              onClick={() => setBagOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-terracotta hover:border-terracotta"
            >
              <ShoppingBag size={16} />
              Bag ({count})
            </button>
          </div>
        </div>
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, author…"
              className="w-full rounded-md border border-line bg-white py-2 pl-9 pr-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>
        </div>
        <nav className="no-scrollbar flex gap-2 overflow-x-auto border-t border-line py-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                category === c
                  ? "border-terracotta bg-terracotta text-white"
                  : "border-line bg-white text-graphite hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </nav>
      </div>
      <div className="border-t border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-2 text-center font-serif text-[15px] italic text-graphite">
          “A room, honestly proportioned, will outlast every theory written inside it.” — Featured: The Architecture of Silence
        </div>
      </div>
    </header>
  );
}
