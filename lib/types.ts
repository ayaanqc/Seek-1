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
  excerpt: string[];
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
