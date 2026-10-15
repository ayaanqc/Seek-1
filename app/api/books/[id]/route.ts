import { NextResponse } from "next/server";
import { getBook } from "@/lib/books-data";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const book = getBook(decodeURIComponent(params.id ?? ""));
  if (!book) {
    return NextResponse.json({ error: "Volume not found" }, { status: 404 });
  }
  return NextResponse.json({ book });
}
