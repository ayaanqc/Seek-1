"use client";

import { BookMarked, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const NAV = [
  { label: "Categories", href: "#categories" },
  { label: "Collection", href: "#collection" },
  { label: "Salon", href: "#salon" },
  { label: "Reviews", href: "#reviews" },
];

export default function Header() {
  const { count, setBagOpen } = useCart();

  return (
    <header className="border-b border-line bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <a href="#top" className="flex shrink-0 items-center gap-2">
          <BookMarked size={21} className="text-terracotta" aria-hidden />
          <h1 className="font-serif text-[19px] font-semibold leading-none tracking-[0.22em] sm:text-[22px]">
            MARGINALIA
          </h1>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite transition-colors hover:text-terracotta"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setBagOpen(true)}
          aria-label={`Open reading bag, ${count} item${count === 1 ? "" : "s"}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-terracotta hover:bg-terracotta"
        >
          <ShoppingBag size={16} aria-hidden />
          Bag ({count})
        </button>
      </div>

      <nav
        aria-label="Sections"
        className="no-scrollbar flex gap-6 overflow-x-auto border-t border-line px-4 py-2.5 md:hidden"
      >
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-graphite"
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
