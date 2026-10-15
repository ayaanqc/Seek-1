"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface the fault in the server/browser console for debugging.
    console.error("MARGINALIA render error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="font-mono text-[12px] uppercase tracking-wide text-terracotta">Press error</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold">The plates slipped.</h1>
      <p className="mt-2 max-w-sm text-[14px] text-graphite">
        Something went wrong while binding this page. You can try the press run again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper hover:border-terracotta hover:bg-terracotta"
      >
        Try again
      </button>
    </main>
  );
}
