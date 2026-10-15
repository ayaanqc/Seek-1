"use client";

import { BookMarked, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const NAV = [
  { label: "Categories", href: "#categories" },
  { label: "Collection", href: "#collection" },
  { label: "Salon", href: "#salon" },
  { label: "Reviews", href: "#reviews" },
];

// An underline that draws itself in on hover/focus — no pill, no glow.
const NAV_LINK =
  "relative font-mono text-[11px] uppercase tracking-[0.16em] text-graphite transition-colors duration-150 hover:text-terracotta focus-visible:text-terracotta " +
  "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-200 after:ease-out " +
  "hover:after:scale-x-100 focus-visible:after:scale-x-100";

export default function Header() {
  const { count, setBagOpen } = useCart();

  return (
    <header className="border-b border-line bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <a href="#top" className="group flex shrink-0 items-center gap-2">
          <BookMarked
            size={21}
            aria-hidden
            className="text-terracotta transition-transform duration-200 ease-out group-hover:-rotate-12 group-hover:scale-110"
          />
          <h1 className="font-serif text-[19px] font-semibold leading-none tracking-[0.22em] transition-colors duration-150 group-hover:text-terracotta sm:text-[22px]">
            MARGINALIA
          </h1>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={NAV_LINK}>
              {n.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setBagOpen(true)}
          aria-label={`Open reading bag, ${count} item${count === 1 ? "" : "s"}`}
          className={`group inline-flex shrink-0 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-paper transition duration-150 ease-out hover:-translate-y-px hover:shadow-book active:translate-y-0 active:scale-[0.97] ${
            count > 0
              ? "border-terracotta-deep bg-terracotta-deep hover:border-terracotta-ink hover:bg-terracotta-ink"
              : "border-ink bg-ink hover:border-terracotta hover:bg-terracotta"
          }`}
        >
          <ShoppingBag
            size={16}
            aria-hidden
            className="transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-110"
          />
          Bag{" "}
          <span key={count} className="inline-block animate-pop font-mono tabular-nums">
            ({count})
          </span>
        </button>
      </div>

      <nav
        aria-label="Sections (mobile)"
        className="no-scrollbar flex gap-6 overflow-x-auto border-t border-line px-4 py-2.5 md:hidden"
      >
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={`${NAV_LINK} whitespace-nowrap`}>
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
