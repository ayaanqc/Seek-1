import { cn } from "@/lib/utils";
import React from "react";

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50",
        variant === "primary" && "border-ink bg-ink text-paper hover:bg-terracotta hover:border-terracotta",
        variant === "outline" && "border-line bg-white text-ink hover:border-ink",
        variant === "ghost" && "border-transparent bg-transparent text-graphite hover:text-ink hover:bg-wash",
        className
      )}
    />
  );
}

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-wash px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-graphite",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-terracotta ${props.className ?? ""}`}
    />
  );
}
