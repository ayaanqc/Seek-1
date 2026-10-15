"use client";

import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { CATEGORIES } from "@/lib/books-data";
import { useMounted } from "@/lib/hooks";

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
  const mounted = useMounted();

  // Date/locale formatting differs between server and client, so only render it
  // on the client to avoid a hydration mismatch.
  const today = mounted
    ? new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3 font-mono text-[12px] text-muted">
          <span className="min-h-[1em]">{today ? `${today} \u2014 Vol. IV` : "Vol. IV"}</span>
          <span className="hidden sm:inline">Essential Dialectics &amp; Selected Prose</span>
          <span className="hidden sm:inline">Edition No. 42</span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line py-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight">MARGINALIA</h1>
            <p className="text-[13px] text-graphite">A curated bookstore &amp; reading salon</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={"Search title, author\u2026"}
                aria-label="Search the catalog"
                className="w-64 rounded-md border border-line bg-white py-2 pl-9 pr-3 text-sm focus:border-terracotta focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setBagOpen(true)}
              aria-label={`Open reading bag, ${count} item${count === 1 ? "" : "s"}`}
              className="inline-flex items-center gap-2 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper hover:border-terracotta hover:bg-terracotta"
            >
              <ShoppingBag size={16} aria-hidden />
              Bag ({count})
            </button>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={"Search title, author\u2026"}
              aria-label="Search the catalog"
              className="w-full rounded-md border border-line bg-white py-2 pl-9 pr-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>
        </div>

        <nav aria-label="Categories" className="no-scrollbar flex gap-2 overflow-x-auto border-t border-line py-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
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
          &ldquo;A room, honestly proportioned, will outlast every theory written inside it.&rdquo; &mdash;
          Featured: The Architecture of Silence
        </div>
      </div>
    </header>
  );
}
