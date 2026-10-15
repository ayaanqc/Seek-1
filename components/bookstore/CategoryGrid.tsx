"use client";

import { BookOpen, Brain, Building2, Feather, Palette, PenLine, type LucideIcon } from "lucide-react";
import { BOOKS, CATEGORIES } from "@/lib/books-data";

const ICONS: Record<string, LucideIcon> = {
  Philosophy: Brain,
  Architecture: Building2,
  Fiction: BookOpen,
  Poetry: Feather,
  Essays: PenLine,
  Design: Palette,
};

export default function CategoryGrid({
  active,
  onPick,
}: {
  active: string;
  onPick: (category: string) => void;
}) {
  const categories = CATEGORIES.filter((c) => c !== "All");

  return (
    <section id="categories" className="scroll-mt-4 border-b border-line bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta">Browse</p>
            <h2 className="mt-2 font-serif text-[27px] font-semibold tracking-tight sm:text-[32px]">
              Explore categories
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onPick("All")}
            className="shrink-0 border-b border-ink pb-1 text-[13px] font-medium transition-colors hover:border-terracotta hover:text-terracotta"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {categories.map((c) => {
            const Icon = ICONS[c] ?? BookOpen;
            const count = BOOKS.filter((b) => b.category === c).length;
            const isActive = active === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => onPick(c)}
                aria-pressed={isActive}
                className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                  isActive ? "border-terracotta bg-terracotta/5" : "border-line bg-white hover:border-ink"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded border ${
                    isActive
                      ? "border-terracotta/40 bg-terracotta/10 text-terracotta"
                      : "border-line bg-wash text-graphite"
                  }`}
                >
                  <Icon size={17} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-serif text-[15px] font-medium">{c}</span>
                  <span className="block font-mono text-[11px] uppercase tracking-wide text-muted">
                    {count} {count === 1 ? "book" : "books"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
