import { BookOpen, Library, Quote, Truck, Unlock } from "lucide-react";
import { BOOKS } from "@/lib/books-data";

const ITEMS = [
  { icon: BookOpen, label: "Free extracts" },
  { icon: Quote, label: "Staff marginalia" },
  { icon: Truck, label: "Ships in 2\u20133 days" },
  { icon: Library, label: `${BOOKS.length} kept volumes` },
  { icon: Unlock, label: "No account needed" },
];

export default function FeatureStrip() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon size={20} className="text-terracotta" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
