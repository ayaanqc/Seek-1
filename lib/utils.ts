import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** Antiquarian years read better as approximations; modern ones read better plain. */
export function formatYear(year: number): string {
  return year < 1000 ? `c. ${year}` : `${year}`;
}
