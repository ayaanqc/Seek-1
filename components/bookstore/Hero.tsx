"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Book } from "@/lib/types";
import { CATEGORIES } from "@/lib/books-data";
import { formatPrice } from "@/lib/utils";

// Offsets around the active cover: two to the left, two to the right.
const OFFSETS = [-2, -1, 0, 1, 2];

// Indexed by distance from the active cover: 0 = the big centre book, 2 = the far edges.
const SIZES = [
  "h-[280px] w-[197px] sm:h-[330px] sm:w-[232px]",
  "h-[206px] w-[145px] sm:h-[244px] sm:w-[171px]",
  "h-[168px] w-[118px]",
];

export default function Hero({
  books,
  query,
  setQuery,
  category,
  setCategory,
  onSearch,
  onOpen,
}: {
  books: Book[];
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  onSearch: () => void;
  onOpen: (id: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const total = books.length;
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);

  if (total === 0) return null;
  const active = books[index];

  return (
    <section className="border-b border-line bg-cream">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:pt-16">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta-ink">
          A curated bookstore &amp; reading salon
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center font-serif text-[33px] font-semibold leading-[1.08] tracking-tight sm:text-[46px]">
          Discover &amp; read <span className="text-terracotta">{total}</span> kept volumes
        </h2>

        <form
          className="mx-auto mt-7 flex max-w-2xl items-stretch overflow-hidden rounded-md border border-line bg-white shadow-book focus-within:border-terracotta"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <label className="sr-only" htmlFor="hero-category">
            Category
          </label>
          <select
            id="hero-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="max-w-[45%] border-r border-line bg-transparent px-3 py-3 text-[13px] text-graphite transition-colors duration-150 hover:text-ink focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All categories" : c}
              </option>
            ))}
          </select>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={"Search title, author or theme\u2026"}
            aria-label="Search the catalog"
            className="min-w-0 flex-1 px-3 py-3 text-sm focus:outline-none"
          />

          <button
            type="submit"
            aria-label="Search"
            className="group inline-flex items-center gap-2 bg-ink px-4 text-sm font-medium text-paper transition duration-150 ease-out hover:bg-terracotta active:bg-terracotta-deep"
          >
            <Search
              size={16}
              aria-hidden
              className="transition-transform duration-150 ease-out group-hover:scale-110"
            />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        <div className="relative mt-10">
          <div className="flex items-center justify-center gap-2 overflow-hidden py-8 sm:gap-5">
            {OFFSETS.map((off) => {
              const abs = Math.abs(off);
              const book = books[(index + off + total) % total];
              const isActive = abs === 0;
              return (
                <button
                  // Key by position, not by book: the five slots persist while
                  // their covers change, so focus survives stepping and the
                  // size/opacity transitions actually run.
                  key={off}
                  type="button"
                  onClick={() => (isActive ? onOpen(book.id) : setIndex((index + off + total) % total))}
                  aria-label={isActive ? `Open ${book.title}` : `Bring ${book.title} to the front`}
                  className={`group relative shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:opacity-100 hover:ring-2 hover:ring-terracotta ${SIZES[abs]} ${
                    abs === 2 ? "hidden opacity-50 sm:block" : ""
                  } ${abs === 1 ? "opacity-80" : ""} ${isActive ? "shadow-cover" : "shadow-book"}`}
                >
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title} by ${book.author}`}
                    fill
                    // Match the slot so the optimizer serves a 2x-capable file:
                    // centre 232px, neighbours 171px, far edges 118px.
                    sizes={
                      abs === 0
                        ? "(max-width: 640px) 197px, 232px"
                        : abs === 1
                          ? "(max-width: 640px) 145px, 171px"
                          : "118px"
                    }
                    quality={90}
                    priority={isActive}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous volume"
            className="group absolute left-0 top-1/2 -translate-y-1/2 rounded-md border border-line bg-white p-2 text-ink shadow-book transition duration-150 ease-out hover:border-terracotta hover:bg-terracotta hover:text-white hover:shadow-lg active:scale-95"
          >
            <ChevronLeft
              size={18}
              aria-hidden
              className="transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
            />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next volume"
            className="group absolute right-0 top-1/2 -translate-y-1/2 rounded-md border border-line bg-white p-2 text-ink shadow-book transition duration-150 ease-out hover:border-terracotta hover:bg-terracotta hover:text-white hover:shadow-lg active:scale-95"
          >
            <ChevronRight
              size={18}
              aria-hidden
              className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="font-serif text-[19px] font-medium">{active.title}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
            {active.author} &middot; {active.category} &middot; {formatPrice(active.price)}
          </p>
          <button
            type="button"
            onClick={() => onOpen(active.id)}
            className="group mt-4 inline-flex items-center gap-2 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition duration-150 ease-out hover:-translate-y-px hover:border-terracotta hover:bg-terracotta hover:shadow-book active:translate-y-0 active:scale-[0.97]"
          >
            {active.reading.kind === "excerpt" ? "Read the extract" : "Read the shop\u2019s note"}
            <ChevronRight
              size={15}
              aria-hidden
              className="transition-transform duration-150 ease-out group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
