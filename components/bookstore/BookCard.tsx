"use client";

import Image from "next/image";
import { BookOpen, Plus } from "lucide-react";
import type { Book } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

export default function BookCard({ book }: { book: Book }) {
  const { add, setReaderId } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-line bg-white shadow-book">
      <div className="relative aspect-[3/4] overflow-hidden bg-wash">
        <Image
          src={book.coverUrl}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 gap-2 bg-gradient-to-t from-black/55 to-transparent p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => setReaderId(book.id)}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-white px-2 py-1.5 text-[12px] font-semibold text-ink hover:bg-paper"
          >
            <BookOpen size={14} /> Sample Excerpt
          </button>
          <button
            onClick={() => add(book.id)}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-terracotta px-2 py-1.5 text-[12px] font-semibold text-white hover:bg-terracotta-deep"
          >
            <Plus size={14} /> Quick Add
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="font-mono text-[11px] uppercase tracking-wide text-muted">
          {book.category} · {book.year}
        </div>
        <h3 className="font-serif text-[17px] font-medium leading-snug">{book.title}</h3>
        <p className="text-[13px] text-graphite">{book.author}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-[12px] text-graphite">
            {book.format} · {book.pages}p
          </span>
          <span className="font-mono text-[14px] font-semibold">{formatPrice(book.price)}</span>
        </div>
        <div className="mt-2 flex gap-2 sm:hidden">
          <button
            onClick={() => setReaderId(book.id)}
            className="flex-1 rounded-md border border-line bg-white px-2 py-1.5 text-[12px] font-medium"
          >
            Excerpt
          </button>
          <button
            onClick={() => add(book.id)}
            className="flex-1 rounded-md bg-ink px-2 py-1.5 text-[12px] font-medium text-paper"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
