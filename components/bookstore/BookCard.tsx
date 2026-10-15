"use client";

import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";
import { formatPrice, formatYear } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

export default function BookCard({ book }: { book: Book }) {
  const { add, setReaderId } = useCart();
  const hasExcerpt = book.reading.kind === "excerpt";

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-line bg-white shadow-book transition duration-200 ease-out hover:-translate-y-1 hover:border-terracotta/50 hover:shadow-xl">
      <div className={`h-1.5 w-full ${book.featured ? "bg-terracotta" : "bg-plum/25"}`} aria-hidden />

      <button
        type="button"
        onClick={() => setReaderId(book.id)}
        aria-label={`${hasExcerpt ? "Read the extract from" : "Read the shop\u2019s note on"} ${book.title}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-wash"
      >
        <Image
          src={book.coverUrl}
          alt={`Cover of ${book.title} by ${book.author}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          quality={85}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center gap-1.5 bg-ink/75 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <BookOpen size={12} aria-hidden />
          {hasExcerpt ? "Open extract" : "Open note"}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta">{book.category}</p>
        <h3 className="mt-1 font-serif text-[16px] font-medium leading-snug transition-colors duration-150 group-hover:text-terracotta">
          {book.title}
        </h3>
        <p className="mt-0.5 text-[13px] text-graphite">{book.author}</p>
        <p className="mt-1 font-mono text-[11px] text-muted">
          {book.format} &middot; {formatYear(book.year)} &middot; {book.pages}p
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 border-t border-line pt-3">
          <span className="font-mono text-[14px] font-semibold text-terracotta">{formatPrice(book.price)}</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setReaderId(book.id)}
              className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1.5 text-[11px] font-medium text-graphite transition duration-150 ease-out hover:-translate-y-px hover:border-ink hover:bg-wash hover:text-ink hover:shadow-book active:translate-y-0 active:scale-[0.97]"
            >
              <BookOpen size={13} aria-hidden />
              {hasExcerpt ? "Extract" : "Notes"}
            </button>
            <button
              type="button"
              onClick={() => add(book.id)}
              className="group/buy inline-flex items-center gap-1 rounded-md border border-ink bg-ink px-2 py-1.5 text-[11px] font-medium text-paper transition duration-150 ease-out hover:-translate-y-px hover:border-terracotta hover:bg-terracotta hover:shadow-book active:translate-y-0 active:scale-[0.97]"
            >
              Buy now
              <ArrowRight
                size={13}
                aria-hidden
                className="transition-transform duration-150 ease-out group-hover/buy:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
