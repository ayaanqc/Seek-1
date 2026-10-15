import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { filterBooks } from "@/lib/books-query";
import { BOOKS } from "@/lib/books-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const books = filterBooks(BOOKS, {
    category: searchParams.get("category") ?? "All",
    search: searchParams.get("search") ?? "",
    sort: searchParams.get("sort") ?? "curated",
    format: searchParams.get("format") ?? "All",
  });

  return NextResponse.json({
    count: books.length,
    total: BOOKS.length,
    books,
  });
}
