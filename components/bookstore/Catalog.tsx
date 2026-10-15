"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, BookMarked } from "lucide-react";
import { BOOKS } from "@/lib/books-data";
import { filterBooks, type FormatFilter, type SortKey } from "@/lib/books-query";
import { useCart } from "@/lib/cart-store";
import BookCard from "./BookCard";
import Header from "./Header";
import ReaderModal from "./ReaderModal";
import CartDrawer from "./CartDrawer";
import { Button, Input } from "@/components/ui/controls";

const FORMATS: FormatFilter[] = ["All", "Hardcover", "Paperback"];

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [format, setFormat] = useState<FormatFilter>("All");
  const [sort, setSort] = useState<SortKey>("curated");
  const { toasts } = useCart();

  // Same pure function the /api/books route uses — one source of truth.
  const results = useMemo(
    () => filterBooks(BOOKS, { category, format, search: query, sort }),
    [query, category, format, sort]
  );

  const isFiltered = Boolean(query.trim()) || category !== "All" || format !== "All";
  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setFormat("All");
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header query={query} setQuery={setQuery} category={category} setCategory={setCategory} />

      <main id="catalog" className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-wide text-terracotta">
              Volume IV &mdash; The Collection
            </p>
            <h2 className="mt-1 font-serif text-3xl font-semibold">
              Essential Dialectics &amp; Selected Prose
            </h2>
            <p className="mt-1 max-w-xl text-[14px] text-graphite">
              {BOOKS.length} kept volumes across philosophy, architecture, fiction, poetry, essays, and
              design &mdash; each with a readable excerpt and staff marginalia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex overflow-hidden rounded-md border border-line bg-white" role="group" aria-label="Filter by format">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  aria-pressed={format === f}
                  className={`px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    format === f ? "bg-ink text-paper" : "text-graphite hover:text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1.5 text-[13px]">
              <ArrowUpDown size={14} className="text-muted" aria-hidden />
              <span className="sr-only">Sort volumes</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-transparent focus:outline-none"
              >
                <option value="curated">Curated</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price &uarr;</option>
                <option value="price-desc">Price &darr;</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p aria-live="polite" className="font-mono text-[12px] uppercase tracking-wide text-muted">
            Showing {results.length} of {BOOKS.length} volumes
            {query ? ` \u2014 \u201C${query}\u201D` : ""}
          </p>
          {isFiltered && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-md border border-line bg-white px-6 py-16 text-center">
            <BookMarked size={20} className="mx-auto mb-2 text-muted" aria-hidden />
            <p className="font-serif text-xl italic">No volumes match this margin.</p>
            <p className="mt-1 text-[13px] text-graphite">
              Try another title, author, or category.
            </p>
            <Button className="mt-4" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {results.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}

        <footer className="mt-12 border-t border-line pb-8 pt-6 text-center">
          <p className="font-serif text-lg font-medium">MARGINALIA</p>
          <p className="mt-1 font-mono text-[12px] text-muted">
            ISBN-indexed &middot; Pencil-friendly paper &middot; Ships in 2&ndash;3 days
          </p>
          <p className="mt-1 text-[13px] text-graphite">
            Zero-config on Vercel &mdash; Next.js App Router &middot; Tailwind &middot; Serverless routes at
            /api/books &amp; /api/checkout
          </p>
        </footer>
      </main>

      <ReaderModal />
      <CartDrawer />

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <div key={t.id} className="rounded-md border border-ink bg-ink px-4 py-2 text-sm text-paper shadow-lg">
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
