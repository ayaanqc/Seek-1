import { BOOKS } from "./books-data";
import type { Book } from "./types";

export type SortKey = "curated" | "newest" | "price-asc" | "price-desc";
export type FormatFilter = "All" | "Hardcover" | "Paperback";

export interface BookQuery {
  category?: string;
  search?: string;
  sort?: string;
  format?: string;
}

const SORTS: SortKey[] = ["curated", "newest", "price-asc", "price-desc"];

export function normalizeSort(value?: string): SortKey {
  return SORTS.includes(value as SortKey) ? (value as SortKey) : "curated";
}

export function matches(book: Book, query: BookQuery): boolean {
  const category = query.category ?? "All";
  const format = query.format ?? "All";
  if (category !== "All" && book.category !== category) return false;
  if (format !== "All" && book.format !== format) return false;

  const q = (query.search ?? "").toLowerCase().trim();
  if (!q) return true;
  return `${book.title} ${book.author} ${book.synopsis} ${book.category} ${book.publisher}`
    .toLowerCase()
    .includes(q);
}

/** Pure filter + sort. Never mutates the input array. */
export function filterBooks(books: Book[], query: BookQuery = {}): Book[] {
  const result = books.filter((b) => matches(b, query));
  const sort = normalizeSort(query.sort);
  if (sort === "price-asc") result.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price || a.title.localeCompare(b.title));
  else if (sort === "newest") result.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return result;
}

export function queryCatalog(query: BookQuery = {}): Book[] {
  return filterBooks(BOOKS, query);
}
