import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";

export const metadata: Metadata = {
  title: "MARGINALIA — Curated Literary Bookstore",
  description: "Volume IV: Essential Dialectics & Selected Prose. A curated bookstore and reading salon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
