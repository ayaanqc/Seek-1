"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const CAPACITY = 24;

export default function EventStrip() {
  const [reserved, setReserved] = useState(false);
  const { notify } = useCart();
  const seatsLeft = CAPACITY - (reserved ? 1 : 0);

  const toggle = () => {
    const next = !reserved;
    setReserved(next);
    notify(next ? "Seat reserved \u2014 An Evening of Slow Reading" : "Seat released");
  };

  return (
    <section id="salon" className="scroll-mt-4 border-y border-line bg-plum text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays size={20} className="shrink-0 text-cream/60" aria-hidden />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/75">Next event</p>
            <p className="font-serif text-[17px] font-medium">
              An Evening of Slow Reading &middot; Thu 24 Oct, 7:00 PM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span aria-live="polite" className="font-mono text-[11px] uppercase tracking-wide text-cream/75">
            <span key={seatsLeft} className="inline-block animate-pop tabular-nums text-cream">
              {seatsLeft}
            </span>{" "}
            of {CAPACITY} seats
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={reserved}
            className={`group inline-flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium transition duration-150 ease-out hover:-translate-y-px hover:shadow-lg active:translate-y-0 active:scale-[0.97] ${
              reserved
                ? "text-cream ring-1 ring-inset ring-cream/50 hover:bg-cream/15 hover:ring-cream/80"
                : "bg-cream text-plum hover:bg-white"
            }`}
          >
            {reserved ? (
              <>
                <Check
                  size={15}
                  aria-hidden
                  className="animate-pop transition-transform duration-200 ease-out group-hover:scale-110"
                />{" "}
                Reserved &mdash; release
              </>
            ) : (
              <>
                Reserve a seat{" "}
                <ArrowRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
