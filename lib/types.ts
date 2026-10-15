export type Category =
  | "Philosophy"
  | "Architecture"
  | "Fiction"
  | "Poetry"
  | "Essays"
  | "Design";

export type BookFormat = "Hardcover" | "Paperback";

export interface MarginaliaNote {
  page: number;
  note: string;
  author: string;
}

/**
 * What the reader panel shows.
 *
 * - "excerpt" — a verbatim passage from a public-domain text, always credited.
 * - "notes"   — original copy written by the shop, used for in-copyright titles
 *               where quoting the text would not be appropriate.
 *
 * Every book has one or the other, and the UI labels them honestly rather than
 * pretending an editor's note is the author's prose.
 */
export interface Reading {
  kind: "excerpt" | "notes";
  credit?: string;
  paragraphs: string[];
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  year: number;
  price: number;
  coverUrl: string;
  category: Category;
  isbn: string;
  pages: number;
  format: BookFormat;
  publisher: string;
  synopsis: string;
  reading: Reading;
  marginalia: MarginaliaNote[];
  featured?: boolean;
}

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface OrderItem {
  bookId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  trackingCode: string;
  items: OrderItem[];
  totalAmount: number;
  itemCount: number;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    postal: string;
  };
  createdAt: string;
  status: "confirmed";
  dispatchDays: string;
}
