import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="font-mono text-[12px] uppercase tracking-wide text-terracotta">Error 404</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold">This shelf is empty.</h1>
      <p className="mt-2 max-w-sm text-[14px] text-graphite">
        The volume you were looking for is not in our catalog &mdash; it may have been reshelved.
      </p>
      <Link
        href="/"
        className="mt-5 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper hover:border-terracotta hover:bg-terracotta"
      >
        Return to the catalog
      </Link>
    </main>
  );
}
