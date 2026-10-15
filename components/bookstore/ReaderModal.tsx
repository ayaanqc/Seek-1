"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, Quote } from "lucide-react";
import { getBook } from "@/lib/books-data";
import { formatPrice, formatYear } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { useBodyScrollLock, useEscapeToClose } from "@/lib/hooks";
import { Button } from "@/components/ui/controls";

export default function ReaderModal() {
  const { readerId, setReaderId, add, setBagOpen } = useCart();
  const [tab, setTab] = useState<"reading" | "notes">("reading");
  const book = readerId ? getBook(readerId) : undefined;
  const open = Boolean(book);

  useBodyScrollLock(open);
  useEscapeToClose(open, () => setReaderId(null));

  useEffect(() => {
    setTab("reading");
  }, [readerId]);

  if (!book) return null;

  const { reading } = book;
  const isExcerpt = reading.kind === "excerpt";

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-ink/40 sm:items-center sm:p-6"
      onClick={() => setReaderId(null)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${isExcerpt ? "Excerpt" : "Editor's note"} and marginalia for ${book.title}`}
        className="max-h-[92vh] w-full max-w-4xl animate-panel-in overflow-hidden rounded-t-lg bg-paper shadow-2xl sm:rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="font-mono text-[12px] uppercase tracking-wide text-muted">
            {isExcerpt ? "Excerpt" : "Reader\u2019s Note"} &amp; Marginalia &mdash; ISBN {book.isbn}
          </div>
          <button
            type="button"
            onClick={() => setReaderId(null)}
            aria-label="Close reader"
            className="rounded-md border border-line p-1.5 transition duration-150 ease-out hover:border-terracotta hover:bg-wash hover:text-terracotta active:scale-90"
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-57px)] overflow-y-auto md:grid-cols-[1.4fr_1fr] md:overflow-hidden">
          <div className="border-b border-line p-6 md:overflow-y-auto md:border-b-0 md:border-r">
            <div className="mb-4 flex gap-4">
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded border border-line">
                <Image
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                  quality={90}
                />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wide text-terracotta">
                  {book.category} &middot; {formatYear(book.year)}
                </div>
                <h2 className="font-serif text-2xl font-semibold leading-tight">{book.title}</h2>
                <p className="text-sm text-graphite">
                  by {book.author} &mdash; {book.publisher}
                </p>
                <p className="mt-1 font-mono text-[12px] text-muted">
                  {book.format} &middot; {book.pages} pages &middot; {formatPrice(book.price)}
                </p>
              </div>
            </div>

            <div className="mb-4 flex gap-2 md:hidden">
              <Button
                variant={tab === "reading" ? "accent" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setTab("reading")}
                aria-pressed={tab === "reading"}
              >
                {isExcerpt ? "Excerpt" : "Note"}
              </Button>
              <Button
                variant={tab === "notes" ? "accent" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setTab("notes")}
                aria-pressed={tab === "notes"}
              >
                Marginalia ({book.marginalia.length})
              </Button>
            </div>

            <div className={`${tab === "reading" ? "block" : "hidden"} md:block`}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {isExcerpt ? "\u2014 From the text" : "\u2014 Written by the shop"}
              </p>
              <div className="prose-book font-reading text-[16.5px] text-ink">
                {reading.paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {i === 0 ? (
                      <>
                        <span aria-hidden className="float-left mr-2 font-serif text-5xl leading-[0.9] text-terracotta">
                          {p.charAt(0)}
                        </span>
                        {p.slice(1)}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}
              </div>
              {reading.credit && (
                <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-muted">
                  Source: {reading.credit}
                </p>
              )}
              <p className="mt-4 border-t border-line pt-3 font-serif text-[15px] italic text-graphite">
                {book.synopsis}
              </p>
            </div>

            <div className={`${tab === "notes" ? "block" : "hidden"} md:hidden`}>
              <NotesList bookId={book.id} />
            </div>

            <div className="mt-5">
              <Button
                className="w-full"
                onClick={() => {
                  add(book.id);
                  setReaderId(null);
                  setBagOpen(true);
                }}
              >
                <ShoppingBag size={16} aria-hidden /> Add to Reading Bag &mdash; {formatPrice(book.price)}
              </Button>
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
  const book = getBook(bookId);
  if (!book) return null;

  return (
    <div>
      <h3 className="mb-1 font-serif text-lg font-semibold">Staff Marginalia</h3>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-muted">
        {book.marginalia.length} annotations
      </p>
      <div className="space-y-3">
        {book.marginalia.map((m, i) => (
          <div key={i} className="rounded-md border border-line bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <Quote size={14} className="text-terracotta" aria-hidden />
              <span className="font-mono text-[11px] text-muted">p. {m.page}</span>
            </div>
            <p className="font-serif text-[14.5px] italic leading-relaxed">&ldquo;{m.note}&rdquo;</p>
            <p className="mt-1 font-mono text-[11px] text-graphite">&mdash; {m.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
