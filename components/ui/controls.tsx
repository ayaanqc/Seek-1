"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md";
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border font-medium",
        "transition duration-150 ease-out",
        "enabled:hover:-translate-y-px enabled:hover:shadow-book",
        "enabled:active:translate-y-0 enabled:active:scale-[0.97]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "px-2.5 py-1.5 text-[12px]" : "px-4 py-2 text-sm",
        variant === "primary" && "border-ink bg-ink text-paper hover:border-terracotta hover:bg-terracotta",
        variant === "accent" &&
          "border-terracotta-deep bg-terracotta-deep text-white hover:border-terracotta-ink hover:bg-terracotta-ink",
        variant === "outline" && "border-line bg-white text-ink hover:border-ink",
        variant === "ghost" && "border-transparent bg-transparent text-graphite hover:bg-wash hover:text-ink",
        className
      )}
    />
  );
}

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
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
      className={cn(
        "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted",
        "focus:border-terracotta focus:outline-none",
        props.className
      )}
    />
  );
}
