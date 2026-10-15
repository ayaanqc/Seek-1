# MARGINALIA — Curated Literary Bookstore

Editorial bookstore and reading salon built for zero-config deployment on Vercel.
Warm parchment canvas, deep-aubergine evening bands, serif display type, monospace metadata,
terracotta accents.

Fifteen **real** books across six shelves. Cover art comes from the Open Library Covers API;
every extract is verbatim public-domain text pulled from Project Gutenberg. Where a book is
still in copyright the reader panel says so and shows an original note written by the shop
instead of a fabricated quotation.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Verify everything (one command)

```bash
npm run verify     # typecheck -> unit tests -> production build
```

Individually:

| Command             | What it does                                                       |
| :------------------ | :----------------------------------------------------------------- |
| `npm run typecheck` | `tsc --noEmit` across app **and** tests                             |
| `npm test`          | 30 unit tests (node:test) over the data, query and checkout logic  |
| `npm run build`     | Production build + lint + type check                               |

## 60-second evaluation flow

1. **Land on the hero** — an aubergine masthead with a fanned stack of real cover art, then
   *"Curated for curious readers"*: four featured volumes across four shelves.
2. **Filter & search** — click `Poetry`, or type `woolf` / `design`. The grid updates instantly
   (no reload) with a live `Showing N of 15` counter.
3. **Inspect a volume** — click a card's `Sample Excerpt` (e.g. *Walden*) to open the reader:
   the extract on the left with its Gutenberg credit, **Staff Marginalia** on the right.
   Open *Orbital* instead and the same panel reads `Editor's Note` — because that book is still
   in copyright and the shop will not invent a quote for it.
4. **Add to the bag** — `Add to Reading Bag`, or `Quick Add` straight from the grid. The header
   `Bag (n)` counter and a toast confirm it.
5. **Check out** — open the bag, adjust quantities, `Complete Purchase`, enter dummy shipping →
   processing → a **dispatch ticket with order ID and tracking code** and a downloadable receipt.
6. **Reserve a seat** — the evening **salon** band at the foot of the page has a working RSVP:
   the seat count drops from 24 and the button flips to *Seat reserved — release*.

Empty and error states are handled too: an unmatched search shows a `Clear filters` state, and
bad shipping input is validated inline.

## Architecture

```
app/
  layout.tsx                  root shell, self-hosted fonts, cart provider
  page.tsx                    prerendered catalog
  loading.tsx  error.tsx  not-found.tsx
  globals.css                 paper/ink tokens, reading measure
  api/
    books/route.ts            GET  /api/books?category=&search=&sort=&format=
    books/[id]/route.ts       GET  /api/books/[id]
    checkout/route.ts         POST /api/checkout
components/
  bookstore/  Catalog, Header, Hero, FeatureStrip, CategoryGrid,
              BookCard, EventStrip, Reviews, ReaderModal, CartDrawer
  ui/         controls (Button, Badge, Input)
lib/
  types.ts                    Book, Reading, CartItem, Order, MarginaliaNote
  books-data.ts               the 15-volume seed dataset
  excerpts.ts                 generated: verbatim public-domain passages
  books-query.ts              pure filter/sort — shared by UI and API
  checkout-logic.ts           pure order builder — shared by API and tests
  cart-store.tsx              bag + toasts + reader state (localStorage)
  hooks.ts                    scroll lock, escape-to-close, mount guard
scripts/gen-excerpts.cjs      regenerates lib/excerpts.ts from Project Gutenberg
tests/books.test.ts           data integrity, query, checkout, parity
```

**Design note:** filtering and order-building live in pure modules that both the UI and the
serverless routes import, so the client grid can never drift from the API response. That is
also what makes them directly unit-testable without a browser or database.

**Content note:** `Book.reading.kind` is either `"excerpt"` (verbatim, public domain, always
credited) or `"notes"` (original copy by the shop). A unit test enforces that an `excerpt`
always carries a Gutenberg credit and that a `notes` entry never claims a source.

## Regenerating the extracts

```bash
node scripts/gen-excerpts.cjs   # rewrites lib/excerpts.ts from gutenberg.org
```

The script anchors on a phrase inside each Gutenberg plain-text file (tolerating the hard line
wrapping) and writes the opening passages verbatim. It fails loudly rather than emitting partial
text if an anchor moves.

## API

```bash
curl "localhost:3000/api/books?category=Poetry"
curl "localhost:3000/api/books?search=design&sort=price-asc"
curl "localhost:3000/api/books/orbital"

curl -X POST localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"items":[{"bookId":"orbital","quantity":2}],
       "shipping":{"name":"Ada","email":"ada@example.com","address":"12 Margin Row","city":"Lisbon","postal":"1100-001"}}'
```

`POST /api/checkout` returns **201** with a confirmed order, or **400** with a reason.
Quantities are clamped to 1–9, duplicate lines are merged, and malformed items are rejected
rather than crashing the handler.

## Credits & disclaimers

- Book metadata and cover art: [Open Library](https://openlibrary.org) Covers API.
- Public-domain excerpts: [Project Gutenberg](https://www.gutenberg.org).
- Section photographs: Unsplash.

Prices, stock, the shop itself and the salon event are **fictional**. Nothing here places a real
order. Cover art is matched by title and may come from a different printing than the listed ISBN.

## Deploy

Import the repo on Vercel — the framework is auto-detected, there are no environment variables
and no database. All data is in-memory in `lib/books-data.ts`.
