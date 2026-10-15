"use client";

import Image from "next/image";
import { BookOpen, Plus } from "lucide-react";
import type { Book } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { Badge, Button } from "@/components/ui/controls";

export default function BookCard({ book }: { book: Book }) {
  const { add, setReaderId } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-line bg-white shadow-book transition-shadow hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-wash">
        <Image
          src={book.coverUrl}
          alt={`Cover of ${book.title} by ${book.author}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          <Badge className="border-line/80 bg-paper/95">{book.category}</Badge>
          {book.featured && <Badge className="border-terracotta/40 bg-terracotta/10 text-terracotta-deep">Featured</Badge>}
        </div>

        <div className="absolute inset-x-0 bottom-0 hidden translate-y-2 gap-2 bg-gradient-to-t from-black/55 to-transparent p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => setReaderId(book.id)}>
            <BookOpen size={14} aria-hidden /> Sample Excerpt
          </Button>
          <Button variant="accent" size="sm" className="flex-1" onClick={() => add(book.id)}>
            <Plus size={14} aria-hidden /> Quick Add
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="font-mono text-[11px] uppercase tracking-wide text-muted">
          {book.format} &middot; {book.year}
        </div>
        <h3 className="font-serif text-[17px] font-medium leading-snug">{book.title}</h3>
        <p className="text-[13px] text-graphite">{book.author}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-[12px] text-graphite">{book.pages}p</span>
          <span className="font-mono text-[14px] font-semibold">{formatPrice(book.price)}</span>
        </div>

        <div className="mt-2 flex gap-2 sm:hidden">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => setReaderId(book.id)}>
            Excerpt
          </Button>
          <Button variant="primary" size="sm" className="flex-1" onClick={() => add(book.id)}>
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
