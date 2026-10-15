import { Quote } from "lucide-react";
import { getBook } from "@/lib/books-data";

// Three real notes from the shelf — no invented testimonials.
const PICKS = [
  { bookId: "meditations", noteIndex: 0 },
  { bookId: "leaves-of-grass", noteIndex: 0 },
  { bookId: "mrs-dalloway", noteIndex: 0 },
];

const initials = (name: string) =>
  name
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default function Reviews() {
  const cards = PICKS.flatMap(({ bookId, noteIndex }) => {
    const book = getBook(bookId);
    const note = book?.marginalia[noteIndex];
    return book && note ? [{ book, note }] : [];
  });

  return (
    <section id="reviews" className="scroll-mt-4 bg-plum-deep text-cream">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60">Testimonials</p>
          <h2 className="mt-2 font-serif text-[27px] font-semibold tracking-tight sm:text-[32px]">
            Editorial reviews
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-cream/70">
            Notes our staff have pencilled into the margins of the shelf.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {cards.map(({ book, note }) => (
            <figure key={book.id} className="flex h-full flex-col rounded-md border border-cream/15 bg-cream/5 p-5">
              <Quote size={18} className="text-terracotta" aria-hidden />
              <blockquote className="mt-3 flex-1 font-serif text-[15px] italic leading-relaxed text-cream/90">
                &ldquo;{note.note}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-cream/15 pt-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/10 font-mono text-[12px] text-cream"
                >
                  {initials(note.author)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium">{note.author}</span>
                  <span className="block truncate font-mono text-[10px] uppercase tracking-wide text-cream/60">
                    {book.title} &middot; p. {note.page}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
