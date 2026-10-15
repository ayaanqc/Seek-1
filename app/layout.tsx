import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "MARGINALIA — Curated Literary Bookstore",
  description:
    "Volume IV: Essential Dialectics & Selected Prose. A curated bookstore and reading salon with excerpts and staff marginalia.",
  keywords: ["bookstore", "literary", "essays", "marginalia", "reading salon"],
};

export const viewport: Viewport = {
  themeColor: "#FBFBF9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#catalog"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:border focus:border-ink focus:bg-white focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to catalog
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
