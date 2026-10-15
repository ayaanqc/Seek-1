"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, Quote } from "lucide-react";
import { getBook } from "@/lib/books-data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

export default function ReaderModal() {
  const { readerId, setReaderId, add, setBagOpen } = useCart();
  const [tab, setTab] = useState<"excerpt" | "notes">("excerpt");
  const book = readerId ? getBook(readerId) : undefined;

  useEffect(() => {
    setTab("excerpt");
  }, [readerId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReaderId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setReaderId]);

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-6" onClick={() => setReaderId(null)}>
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-t-lg bg-paper shadow-2xl sm:rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="font-mono text-[12px] uppercase tracking-wide text-muted">
            Excerpt &amp; Marginalia — {book.isbn}
          </div>
          <button onClick={() => setReaderId(null)} className="rounded-md border border-line p-1.5 hover:border-ink" aria-label="Close reader">
            <X size={16} />
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-57px)] overflow-y-auto md:grid-cols-[1.4fr_1fr] md:overflow-hidden">
          <div className="border-b border-line p-6 md:overflow-y-auto md:border-b-0 md:border-r">
            <div className="mb-4 flex gap-4">
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded border border-line">
                <Image src={book.coverUrl} alt={book.title} fill className="object-cover" sizes="96px" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wide text-terracotta">{book.category} · {book.year}</div>
                <h2 className="font-serif text-2xl font-semibold leading-tight">{book.title}</h2>
                <p className="text-sm text-graphite">by {book.author} — {book.publisher}</p>
                <p className="mt-1 font-mono text-[12px] text-muted">{book.format} · {book.pages} pages · {formatPrice(book.price)}</p>
              </div>
            </div>

            <div className="mb-4 flex gap-2 md:hidden">
              <button onClick={() => setTab("excerpt")} className={`flex-1 rounded-md border px-3 py-1.5 text-sm font-medium ${tab === "excerpt" ? "border-terracotta bg-terracotta text-white" : "border-line bg-white"}`}>Excerpt</button>
              <button onClick={() => setTab("notes")} className={`flex-1 rounded-md border px-3 py-1.5 text-sm font-medium ${tab === "notes" ? "border-terracotta bg-terracotta text-white" : "border-line bg-white"}`}>Marginalia ({book.marginalia.length})</button>
            </div>

            <div className={`${tab === "excerpt" ? "block" : "hidden"} md:block`}>
              <div className="prose-book font-serif text-[16.5px] text-ink">
                {book.excerpt.map((p, i) => (
                  <p key={i}>{i === 0 ? <><span className="float-left mr-2 font-serif text-5xl leading-[0.9] text-terracotta">{p.charAt(0)}</span>{p.slice(1)}</> : p}</p>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-3 font-serif text-[15px] italic text-graphite">{book.synopsis}</p>
            </div>

            <div className={`${tab === "notes" ? "block" : "hidden"} md:hidden`}>
              <NotesList bookId={book.id} />
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => { add(book.id); setReaderId(null); setBagOpen(true); }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-terracotta"
              >
                <ShoppingBag size={16} /> Add to Reading Bag — {formatPrice(book.price)}
              </button>
            </div>
          </div>

          <aside className="hidden bg-card p-6 md:block md:overflow-y-auto">
            <NotesList bookId={book.id} />
          </aside>
        </div>
      </div>
    </div>
  );
}

function NotesList({ bookId }: { bookId: string }) {
  const book = getBook(bookId)!;
  return (
    <div>
      <h3 className="mb-1 font-serif text-lg font-semibold">Staff Marginalia</h3>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-muted">{book.marginalia.length} annotations</p>
      <div className="space-y-3">
        {book.marginalia.map((m, i) => (
          <div key={i} className="rounded-md border border-line bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <Quote size={14} className="text-terracotta" />
              <span className="font-mono text-[11px] text-muted">p. {m.page}</span>
            </div>
            <p className="font-serif text-[14.5px] italic leading-relaxed">“{m.note}”</p>
            <p className="mt-1 font-mono text-[11px] text-graphite">— {m.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
