"use client";

import { useEffect, useRef, useState } from "react";

/** True only after the first client render — safe for time/locale-dependent UI. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Freeze page scroll while an overlay (drawer/modal) is open, and restore it after. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/** Close-on-Escape without leaking listeners. */
export function useEscapeToClose(active: boolean, onClose: () => void): void {
  const handler = useRef(onClose);
  handler.current = onClose;
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
}
