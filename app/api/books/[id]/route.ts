import { NextResponse } from "next/server";
import { getBook } from "@/lib/books-data";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const book = getBook(params.id);
  if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ book });
}
