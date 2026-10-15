import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { BOOKS } from "@/lib/books-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "All";
  const search = (searchParams.get("search") ?? "").toLowerCase().trim();
  const sort = searchParams.get("sort") ?? "curated";
  const format = searchParams.get("format") ?? "All";

  let results = [...BOOKS];

  if (category !== "All") {
    results = results.filter((b) => b.category === category);
  }
  if (format !== "All") {
    results = results.filter((b) => b.format === format);
  }
  if (search) {
    results = results.filter((b) =>
      `${b.title} ${b.author} ${b.synopsis} ${b.category}`.toLowerCase().includes(search)
    );
  }

  if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
  else if (sort === "newest") results.sort((a, b) => b.year - a.year);

  return NextResponse.json({ count: results.length, books: results });
}
