"use client";

import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  Feather,
  Palette,
  PenLine,
  type LucideIcon,
} from "lucide-react";
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
            className="group inline-flex shrink-0 items-center gap-1.5 pb-1 text-[13px] font-medium text-ink transition-colors duration-150 hover:text-terracotta"
          >
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-200 after:ease-out group-hover:after:scale-x-100">
              View all
            </span>
            <ArrowRight
              size={15}
              aria-hidden
              className="transition-transform duration-150 ease-out group-hover:translate-x-1"
            />
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
                className={`group flex items-center gap-3 rounded-md border px-4 py-3 text-left transition duration-150 ease-out hover:-translate-y-px hover:shadow-book active:translate-y-0 active:scale-[0.99] ${
                  isActive ? "border-terracotta bg-terracotta/5" : "border-line bg-white hover:border-terracotta"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
                    isActive
                      ? "border-terracotta/40 bg-terracotta/10 text-terracotta"
                      : "border-line bg-wash text-graphite group-hover:border-terracotta/40 group-hover:bg-terracotta/10 group-hover:text-terracotta"
                  }`}
                >
                  <Icon
                    size={17}
                    aria-hidden
                    className="transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-110"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-serif text-[15px] font-medium transition-colors duration-150 group-hover:text-terracotta">
                    {c}
                  </span>
                  <span className="block font-mono text-[11px] uppercase tracking-wide text-muted">
                    {count} {count === 1 ? "book" : "books"}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="hidden shrink-0 -translate-x-1 text-terracotta opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
