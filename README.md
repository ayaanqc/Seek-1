# MARGINALIA — Curated Literary Bookstore

Editorial, Claude-inspired bookstore and reading salon built for zero-config deployment on Vercel.
Warm parchment canvas, serif display type, monospace metadata, terracotta accents.

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

| Command             | What it does                                              |
| :------------------ | :-------------------------------------------------------- |
| `npm run typecheck` | `tsc --noEmit` across app **and** tests                    |
| `npm test`          | 29 unit tests (node:test) over the data, query and checkout logic |
| `npm run build`     | Production build + lint + type check                      |

## 60-second evaluation flow

1. **Land on the masthead** — 14 volumes, live date/edition line, category pills, featured quote banner.
2. **Filter & search** — click `Essays`, or type `Design` / `Marchetti`. The grid updates instantly (no reload), with a live `Showing N of 14` counter.
3. **Inspect a volume** — hover a card and click `Sample Excerpt` (e.g. *The Architecture of Silence*). The reader modal opens a dual-column journal: excerpt on the left, **Staff Marginalia** on the right (tabbed on mobile).
4. **Add to the bag** — `Add to Reading Bag`, or `Quick Add` straight from the grid. The header `Bag (n)` counter and a toast confirm it.
5. **Check out** — open the bag, adjust quantities, `Complete Purchase`, enter dummy shipping → processing → a **dispatch ticket with order ID and tracking code**, plus a downloadable receipt.

Empty and error states are handled too: an unmatched search shows a `Clear filters` state, and bad shipping input is validated inline.

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
  bookstore/  Catalog, Header, BookCard, ReaderModal, CartDrawer
  ui/         controls (Button, Badge, Input)
lib/
  types.ts                    Book, CartItem, Order, MarginaliaNote
  books-data.ts               the 14-volume seed dataset
  books-query.ts              pure filter/sort — shared by UI and API
  checkout-logic.ts           pure order builder — shared by API and tests
  cart-store.tsx              bag + toasts + reader state (localStorage)
  hooks.ts                    scroll lock, escape-to-close, mount guard
tests/books.test.ts           data integrity, query, checkout, parity
```

**Design note:** filtering and order-building live in pure modules that both the UI and the
serverless routes import, so the client grid can never drift from the API response. That is
also what makes them directly unit-testable without a browser or database.

## API

```bash
curl "localhost:3000/api/books?category=Essays"
curl "localhost:3000/api/books?search=design&sort=price-asc"
curl "localhost:3000/api/books/architecture-of-silence"

curl -X POST localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"items":[{"bookId":"architecture-of-silence","quantity":2}],
       "shipping":{"name":"Ada","email":"ada@example.com","address":"12 Margin Row","city":"Lisbon","postal":"1100-001"}}'
```

`POST /api/checkout` returns **201** with a confirmed order, or **400** with a reason.
Quantities are clamped to 1–9, duplicate lines are merged, and malformed items are rejected
rather than crashing the handler.

## Deploy

Import the repo on Vercel — the framework is auto-detected, there are no environment
variables and no database. All data is in-memory in `lib/books-data.ts`.
