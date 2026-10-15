import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { BOOKS, CATEGORIES, getBook } from "../lib/books-data";
import { filterBooks, normalizeSort, matches, type BookQuery } from "../lib/books-query";
import { buildOrder, clampQty, makeId, MAX_QTY } from "../lib/checkout-logic";
import { formatPrice } from "../lib/utils";
import type { Book, Category } from "../lib/types";

const KNOWN_CATEGORIES: Category[] = [
  "Philosophy",
  "Architecture",
  "Fiction",
  "Poetry",
  "Essays",
  "Design",
];

const UNSAFE_PAYLOADS: unknown[] = [null, undefined, 42, "nope", [], true];

/** Real ISBN-13 validation: 978/979 prefix + EAN-13 check digit. */
function isValidIsbn13(raw: string): boolean {
  const digits = raw.replace(/-/g, "");
  if (!/^97[89]\d{10}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i += 1) sum += Number(digits[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10 === Number(digits[12]);
}

describe("catalog data integrity", () => {
  it("ships at least 12 fully-populated volumes", () => {
    assert.ok(BOOKS.length >= 12, `expected >= 12 books, got ${BOOKS.length}`);
  });

  it("has unique ids and slugs", () => {
    const ids = BOOKS.map((b) => b.id);
    const slugs = BOOKS.map((b) => b.slug);
    assert.equal(new Set(ids).size, ids.length, "duplicate book id found");
    assert.equal(new Set(slugs).size, slugs.length, "duplicate slug found");
  });

  it("keeps id and slug in sync so /api/books/[id] resolves either", () => {
    for (const b of BOOKS) {
      assert.equal(b.id, b.slug, `id/slug drift on ${b.title}`);
      assert.equal(getBook(b.id)?.id, b.id);
      assert.equal(getBook(b.slug)?.id, b.id);
    }
  });

  it("exposes only resolvable categories", () => {
    for (const b of BOOKS) {
      assert.ok(KNOWN_CATEGORIES.includes(b.category), `unknown category ${b.category}`);
    }
    assert.equal(CATEGORIES[0], "All");
    for (const c of KNOWN_CATEGORIES) {
      assert.ok(CATEGORIES.includes(c as never), `filter bar is missing "${c}"`);
      assert.ok(BOOKS.some((b) => b.category === c), `no volumes in category "${c}"`);
    }
  });

  it("validates every record field-by-field", () => {
    for (const b of BOOKS) {
      const at = `[${b.id}]`;
      assert.ok(b.title.trim().length > 3, `${at} title too short`);
      assert.ok(b.author.trim().length > 2, `${at} author missing`);
      assert.ok(b.publisher.trim().length > 2, `${at} publisher missing`);
      assert.ok(b.year >= 1900 && b.year <= 2100, `${at} implausible year ${b.year}`);
      assert.ok(b.price > 0 && b.price < 1000, `${at} implausible price ${b.price}`);
      assert.ok(Number.isInteger(b.pages) && b.pages > 0, `${at} bad page count`);
      assert.match(b.isbn, /^\d{3}(-\d{1,5}){2,4}-\d$/, `${at} malformed ISBN hyphenation ${b.isbn}`);
      assert.ok(isValidIsbn13(b.isbn), `${at} ISBN-13 check digit is invalid: ${b.isbn}`);
      assert.match(b.coverUrl, /^https:\/\/images\.unsplash\.com\//, `${at} cover must be an Unsplash https URL`);
      assert.ok(["Hardcover", "Paperback"].includes(b.format), `${at} bad format`);
      assert.ok(b.synopsis.trim().length > 40, `${at} synopsis too short`);
    }
  });

  it("gives every volume a readable excerpt and staff marginalia", () => {
    for (const b of BOOKS) {
      const at = `[${b.id}]`;
      assert.ok(b.excerpt.length >= 2, `${at} needs >= 2 excerpt paragraphs`);
      for (const p of b.excerpt) {
        assert.ok(p.trim().length > 40, `${at} excerpt paragraph too short`);
      }
      assert.ok(b.marginalia.length >= 1, `${at} needs >= 1 marginalia note`);
      for (const m of b.marginalia) {
        assert.ok(Number.isInteger(m.page) && m.page > 0, `${at} bad marginalia page`);
        assert.ok(m.note.trim().length > 20, `${at} marginalia note too short`);
        assert.ok(m.author.trim().length > 2, `${at} marginalia author missing`);
      }
    }
  });

  it("returns undefined for unknown volumes instead of throwing", () => {
    assert.equal(getBook("does-not-exist"), undefined);
    assert.equal(getBook(""), undefined);
  });
});

describe("filterBooks", () => {
  it("returns the whole catalog with no query", () => {
    assert.equal(filterBooks(BOOKS).length, BOOKS.length);
    assert.equal(filterBooks(BOOKS, { category: "All", format: "All", search: "" }).length, BOOKS.length);
  });

  it("filters by category", () => {
    const essays = filterBooks(BOOKS, { category: "Essays" });
    assert.equal(essays.length, 3);
    assert.ok(essays.every((b) => b.category === "Essays"));
  });

  it("filters by format", () => {
    const hard = filterBooks(BOOKS, { format: "Hardcover" });
    const soft = filterBooks(BOOKS, { format: "Paperback" });
    assert.ok(hard.every((b) => b.format === "Hardcover"));
    assert.ok(soft.every((b) => b.format === "Paperback"));
    assert.equal(hard.length + soft.length, BOOKS.length);
  });

  it("searches title, author, synopsis, publisher and category, case- and space-insensitively", () => {
    const byAuthor = filterBooks(BOOKS, { search: "  mArChEtTi  " });
    assert.deepEqual(byAuthor.map((b) => b.id), ["architecture-of-silence"]);

    const byCategory = filterBooks(BOOKS, { search: "design" });
    assert.ok(byCategory.length >= 2);
    assert.ok(byCategory.every((b) => matches(b, { search: "design" })));

    assert.equal(filterBooks(BOOKS, { search: "zzzz-no-such-title" }).length, 0);
  });

  it("sorts by price and recency", () => {
    const asc = filterBooks(BOOKS, { sort: "price-asc" }).map((b) => b.price);
    const desc = filterBooks(BOOKS, { sort: "price-desc" }).map((b) => b.price);
    assert.deepEqual(asc, [...asc].sort((a, b) => a - b));
    assert.deepEqual(desc, [...desc].sort((a, b) => b - a));
    assert.equal(asc.length, BOOKS.length);

    const years = filterBooks(BOOKS, { sort: "newest" }).map((b) => b.year);
    assert.deepEqual(years, [...years].sort((a, b) => b - a));
  });

  it("falls back to curated order for an unknown sort key", () => {
    assert.equal(normalizeSort("DROP TABLE"), "curated");
    assert.equal(normalizeSort(undefined), "curated");
    assert.deepEqual(filterBooks(BOOKS, { sort: "bogus" }).map((b) => b.id), BOOKS.map((b) => b.id));
  });

  it("never mutates the source catalog or the input array", () => {
    const before = BOOKS.map((b) => b.id);
    const input = [...BOOKS];
    filterBooks(input, { sort: "price-asc", category: "Fiction" });
    assert.deepEqual(BOOKS.map((b) => b.id), before, "BOOKS order was mutated");
    assert.deepEqual(input.map((b) => b.id), before, "input array was mutated");
  });

  it("combines category, format and search", () => {
    const result = filterBooks(BOOKS, { category: "Fiction", format: "Hardcover", search: "park" });
    assert.deepEqual(result.map((b) => b.id), ["field-guide-to-leaving"]);
  });
});

describe("clampQty", () => {
  it("guards against NaN, negatives, zero, floats and overflow", () => {
    assert.equal(clampQty(undefined), 1);
    assert.equal(clampQty(null), 1);
    assert.equal(clampQty("abc"), 1);
    assert.equal(clampQty(NaN), 1);
    assert.equal(clampQty(Infinity), 1);
    assert.equal(clampQty(-5), 1);
    assert.equal(clampQty(0), 1);
    assert.equal(clampQty(2.9), 2);
    assert.equal(clampQty("3"), 3);
    assert.equal(clampQty(99), MAX_QTY);
  });
});

describe("makeId", () => {
  it("builds a prefixed, uppercase, collision-resistant id", () => {
    const id = makeId("MARG", { random: () => 0.123456, now: () => new Date("2026-01-01T00:00:00Z") });
    assert.match(id, /^MARG-[A-Z0-9]{10}$/);
    assert.match(makeId("TRK"), /^TRK-[A-Z0-9]{10}$/);
  });
});

describe("buildOrder", () => {
  const shipping = {
    name: "Ada Reader",
    email: "ada@example.com",
    address: "12 Margin Row",
    city: "Lisbon",
    postal: "1100-001",
  };
  const opts = { now: () => new Date("2026-01-01T00:00:00Z"), random: () => 0.5 };

  const expectOk = (r: ReturnType<typeof buildOrder>) => {
    if (!r.ok) throw new Error(`expected success, got: ${r.error}`);
    return r.order;
  };
  const expectFail = (r: ReturnType<typeof buildOrder>, status = 400) => {
    if (r.ok) throw new Error("expected checkout to fail, but it succeeded");
    assert.equal(r.status, status);
    return r.error;
  };

  it("totals a valid bag and marks the order confirmed", () => {
    const a = BOOKS[0];
    const b = BOOKS[1];
    const order = expectOk(
      buildOrder({ items: [{ bookId: a.id, quantity: 2 }, { bookId: b.id, quantity: 1 }], shipping }, opts)
    );
    const expected = Math.round((a.price * 2 + b.price) * 100) / 100;
    assert.equal(order.totalAmount, expected);
    assert.equal(order.itemCount, 3);
    assert.equal(order.items.length, 2);
    assert.equal(order.status, "confirmed");
    assert.equal(order.createdAt, "2026-01-01T00:00:00.000Z");
    assert.match(order.id, /^MARG-/);
    assert.match(order.trackingCode, /^TRK-/);
    assert.notEqual(order.id, order.trackingCode);
    assert.deepEqual(order.shippingAddress, shipping);
  });

  it("merges duplicate line items instead of double-counting lines", () => {
    const a = BOOKS[0];
    const order = expectOk(
      buildOrder({ items: [{ bookId: a.id, quantity: 2 }, { bookId: a.id, quantity: 3 }], shipping }, opts)
    );
    assert.equal(order.items.length, 1);
    assert.equal(order.items[0].quantity, 5);
    assert.equal(order.itemCount, 5);
  });

  it("never exceeds the per-title cap", () => {
    const a = BOOKS[0];
    const order = expectOk(buildOrder({ items: [{ bookId: a.id, quantity: 500 }], shipping }, opts));
    assert.equal(order.items[0].quantity, MAX_QTY);
    assert.equal(order.totalAmount, Math.round(a.price * MAX_QTY * 100) / 100);
  });

  it("rejects malformed items without throwing", () => {
    for (const bad of UNSAFE_PAYLOADS) {
      const err = expectFail(buildOrder({ items: [bad], shipping }, opts));
      assert.match(err, /Malformed bag item/);
    }
  });

  it("rejects an empty or non-array bag", () => {
    assert.match(expectFail(buildOrder({ items: [], shipping }, opts)), /empty/i);
    assert.match(expectFail(buildOrder({ items: "nope", shipping }, opts)), /empty/i);
    assert.match(expectFail(buildOrder({ shipping }, opts)), /empty/i);
  });

  it("rejects unknown book ids", () => {
    const err = expectFail(buildOrder({ items: [{ bookId: "ghost-title", quantity: 1 }], shipping }, opts));
    assert.match(err, /Unknown book/);
  });

  it("requires name, a valid email, and an address", () => {
    const items = [{ bookId: BOOKS[0].id, quantity: 1 }];
    assert.match(expectFail(buildOrder({ items, shipping: { ...shipping, name: "  " } }, opts)), /name/i);
    assert.match(expectFail(buildOrder({ items, shipping: { ...shipping, email: "not-an-email" } }, opts)), /email/i);
    assert.match(expectFail(buildOrder({ items, shipping: { ...shipping, email: "" } }, opts)), /email/i);
    assert.match(expectFail(buildOrder({ items, shipping: { ...shipping, address: "" } }, opts)), /address/i);
    assert.match(expectFail(buildOrder({ items }, opts)), /name/i);
    assert.match(expectFail(buildOrder({ items, shipping: "nope" }, opts)), /name/i);
  });

  it("trims whitespace out of shipping fields", () => {
    const order = expectOk(
      buildOrder(
        { items: [{ bookId: BOOKS[0].id, quantity: 1 }], shipping: { ...shipping, name: "  Ada  ", city: " Lisbon " } },
        opts
      )
    );
    assert.equal(order.shippingAddress.name, "Ada");
    assert.equal(order.shippingAddress.city, "Lisbon");
  });

  it("caps runaway line-item counts", () => {
    const items = Array.from({ length: 51 }, () => ({ bookId: BOOKS[0].id, quantity: 1 }));
    const err = expectFail(buildOrder({ items, shipping }, opts));
    assert.match(err, /Too many line items/);
  });

  it("keeps totals rounded to cents", () => {
    const items = BOOKS.slice(0, 6).map((b) => ({ bookId: b.id, quantity: 3 }));
    const order = expectOk(buildOrder({ items, shipping }, opts));
    assert.equal(order.totalAmount, Math.round(order.totalAmount * 100) / 100);
    assert.equal(
      order.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      order.totalAmount
    );
  });
});

describe("formatPrice", () => {
  it("formats to two decimal places", () => {
    assert.equal(formatPrice(0), "$0.00");
    assert.equal(formatPrice(34), "$34.00");
    assert.equal(formatPrice(12.5), "$12.50");
    assert.equal(formatPrice(19.999), "$20.00");
  });
});

describe("catalog/API parity", () => {
  it("applies identical filtering to the route handler's query shape", () => {
    const shapes: Array<Record<string, string>> = [
      { category: "Poetry" },
      { format: "Paperback" },
      { sort: "price-asc" },
      { category: "Fiction", sort: "newest", search: "the" },
    ];
    for (const shape of shapes) {
      const fromQuery = filterBooks(BOOKS, {
        category: shape.category ?? "All",
        search: shape.search ?? "",
        sort: shape.sort ?? "curated",
        format: shape.format ?? "All",
      });
      const direct = filterBooks(BOOKS, shape as BookQuery);
      assert.deepEqual(fromQuery.map((b: Book) => b.id), direct.map((b: Book) => b.id));
    }
  });
});
