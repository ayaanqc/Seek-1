"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, BookMarked } from "lucide-react";
import { BOOKS } from "@/lib/books-data";
import { filterBooks, type FormatFilter, type SortKey } from "@/lib/books-query";
import { useCart } from "@/lib/cart-store";
import BookCard from "./BookCard";
import Header from "./Header";
import Hero from "./Hero";
import FeatureStrip from "./FeatureStrip";
import CategoryGrid from "./CategoryGrid";
import EventStrip from "./EventStrip";
import Reviews from "./Reviews";
import ReaderModal from "./ReaderModal";
import CartDrawer from "./CartDrawer";
import { Button } from "@/components/ui/controls";

const FORMATS: FormatFilter[] = ["All", "Hardcover", "Paperback"];

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [format, setFormat] = useState<FormatFilter>("All");
  const [sort, setSort] = useState<SortKey>("curated");
  const { toasts, setReaderId } = useCart();

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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Header />

      <Hero
        books={BOOKS}
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        onSearch={() => scrollTo("collection")}
        onOpen={setReaderId}
      />

      <FeatureStrip />

      <CategoryGrid
        active={category}
        onPick={(c) => {
          setCategory(c);
          scrollTo("collection");
        }}
      />

      <section id="collection" className="scroll-mt-4">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta">The shelf</p>
              <h2 className="mt-2 font-serif text-[27px] font-semibold tracking-tight sm:text-[32px]">
                Deciding what to read next?
              </h2>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-graphite">
                {BOOKS.length} kept volumes across philosophy, architecture, fiction, poetry, essays and design
                &mdash; each with a readable extract, or an honest note from the people who shelve it.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div
                className="flex overflow-hidden rounded-md border border-line bg-white"
                role="group"
                aria-label="Filter by format"
              >
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
              {category !== "All" ? ` \u00b7 ${category}` : ""}
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
              <p className="mt-1 text-[13px] text-graphite">Try another title, author, or category.</p>
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
        </div>
      </section>

      <EventStrip />
      <Reviews />

      <footer className="border-t border-line bg-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-lg font-medium tracking-[0.24em]">MARGINALIA</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted">
              Pencil-friendly paper &middot; Ships in 2&ndash;3 days
            </p>
            <p className="mt-2 text-[13px] text-graphite">
              Zero-config on Vercel &mdash; Next.js App Router &middot; routes at /api/books &amp; /api/checkout
            </p>
          </div>
          <p className="max-w-sm text-[12px] leading-relaxed text-graphite">
            Book data and cover art courtesy of the Open Library Covers API. Prices, stock and events are
            fictional &mdash; nothing here places a real order.
          </p>
        </div>
      </footer>

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
