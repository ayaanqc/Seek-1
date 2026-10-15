export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8" aria-busy="true" aria-label="Loading catalog">
      <div className="mb-6 border-b border-line pb-6">
        <div className="h-3 w-40 animate-pulse rounded bg-wash" />
        <div className="mt-3 h-8 w-2/3 animate-pulse rounded bg-wash" />
        <div className="mt-2 h-3 w-full max-w-xl animate-pulse rounded bg-wash" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-md border border-line bg-white">
            <div className="aspect-[3/4] animate-pulse bg-wash" />
            <div className="space-y-2 p-3">
              <div className="h-3 w-20 animate-pulse rounded bg-wash" />
              <div className="h-4 w-full animate-pulse rounded bg-wash" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-wash" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
