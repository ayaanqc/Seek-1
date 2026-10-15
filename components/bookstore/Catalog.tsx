"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, BookMarked } from "lucide-react";
import { BOOKS } from "@/lib/books-data";
import BookCard from "./BookCard";
import Header from "./Header";
import ReaderModal from "./ReaderModal";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/lib/cart-store";

type SortKey = "curated" | "newest" | "price-asc" | "price-desc";
type FormatFilter = "All" | "Hardcover" | "Paperback";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [format, setFormat] = useState<FormatFilter>("All");
  const [sort, setSort] = useState<SortKey>("curated");
  const { toasts } = useCart();

  const results = useMemo(() => {
    let r = [...BOOKS];
    if (category !== "All") r = r.filter((b) => b.category === category);
    if (format !== "All") r = r.filter((b) => b.format === format);
    const q = query.toLowerCase().trim();
    if (q) r = r.filter((b) => `${b.title} ${b.author} ${b.synopsis} ${b.category}`.toLowerCase().includes(q));
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    else if (sort === "newest") r.sort((a, b) => b.year - a.year);
    return r;
  }, [query, category, format, sort]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header query={query} setQuery={setQuery} category={category} setCategory={setCategory} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-wide text-terracotta">Volume IV — The Collection</p>
            <h2 className="mt-1 font-serif text-3xl font-semibold">Essential Dialectics &amp; Selected Prose</h2>
            <p className="mt-1 max-w-xl text-[14px] text-graphite">
              Twelve kept volumes across philosophy, architecture, fiction, poetry, essays, and design — each with a readable excerpt and staff marginalia.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-md border border-line bg-white">
              {(["All", "Hardcover", "Paperback"] as FormatFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-3 py-1.5 text-[13px] font-medium ${format === f ? "bg-ink text-paper" : "text-graphite hover:text-ink"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1.5 text-[13px]">
              <ArrowUpDown size={14} className="text-muted" />
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="bg-transparent focus:outline-none">
                <option value="curated">Curated</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </label>
          </div>
        </div>

        <p className="mb-4 font-mono text-[12px] uppercase tracking-wide text-muted">
          Showing {results.length} of {BOOKS.length} volumes
          {query && <> — “{query}”</>}
        </p>

        {results.length === 0 ? (
          <div className="rounded-md border border-line bg-white px-6 py-16 text-center">
            <BookMarked size={20} className="mx-auto mb-2 text-muted" />
            <p className="font-serif text-xl italic">No volumes match this margin.</p>
            <button
              onClick={() => { setQuery(""); setCategory("All"); setFormat("All"); }}
              className="mt-3 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-terracotta hover:border-terracotta"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {results.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}

        <footer className="mt-12 border-t border-line pt-6 pb-8 text-center">
          <p className="font-serif text-lg font-medium">MARGINALIA</p>
          <p className="mt-1 font-mono text-[12px] text-muted">ISBN-indexed · Pencil-friendly paper · Ships in 2–3 days</p>
          <p className="mt-1 text-[13px] text-graphite">Zero-config on Vercel — Next.js App Router · Tailwind · Serverless routes at /api/books &amp; /api/checkout</p>
        </footer>
      </main>

      <ReaderModal />
      <CartDrawer />

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="rounded-md border border-ink bg-ink px-4 py-2 text-sm text-paper shadow-lg">
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
