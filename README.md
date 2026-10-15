# MARGINALIA — Curated Literary Bookstore

Editorial, Claude-inspired bookstore built for zero-config Vercel deployment.

## Run
```bash
npm install
npm run dev
npm run build
```

## Flow (60s)
1. Land on masthead, browse 14 volumes.
2. Filter `Essays` or search `Design` — grid updates instantly.
3. Click `Sample Excerpt` (e.g. The Architecture of Silence) — reader modal with excerpt + Staff Marginalia.
4. `Add to Reading Bag` — header `Bag (n)` updates + toast.
5. Open Bag → Complete Purchase → dummy shipping → instant order + tracking code + downloadable receipt.

## APIs
- `GET /api/books?category=&search=&sort=&format=`
- `GET /api/books/[id]`
- `POST /api/checkout` `{ items: [{bookId, quantity}], shipping }`
