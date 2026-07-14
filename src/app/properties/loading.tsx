import {
  SlidersHorizontal,
} from "lucide-react";

const SKELETON_CARDS = 8;

export default function PropertiesLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header skeleton */}

      <section className="border-b border-slate-200 bg-gradient-to-br from-teal-700 to-slate-950 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="h-7 w-40 animate-pulse rounded-full bg-white/15" />

          <div className="mt-4 h-12 w-full max-w-md animate-pulse rounded-xl bg-white/15" />

          <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded-lg bg-white/10" />

          <div className="mt-2 h-5 w-full max-w-md animate-pulse rounded-lg bg-white/10" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filter skeleton */}

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-teal-700"
            />

            <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FilterSkeleton className="lg:col-span-2" />

            <FilterSkeleton />

            <FilterSkeleton />

            <FilterSkeleton />

            <FilterSkeleton />

            <FilterSkeleton />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="h-12 w-full animate-pulse rounded-xl bg-teal-100 sm:w-40" />

            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 sm:w-32" />
          </div>
        </section>

        {/* Result title skeleton */}

        <section className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />

            <div className="mt-2 h-4 w-44 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="h-9 w-32 animate-pulse rounded-xl bg-teal-100" />
        </section>

        {/* Property card skeletons */}

        <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({
            length: SKELETON_CARDS,
          }).map((_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Image */}

              <div className="relative h-56 animate-pulse bg-slate-200">
                <div className="absolute left-4 top-4 h-7 w-24 rounded-full bg-slate-300" />

                <div className="absolute right-4 top-4 h-7 w-20 rounded-full bg-slate-300" />

                <div className="absolute bottom-4 left-4 h-8 w-28 rounded-lg bg-slate-300" />
              </div>

              {/* Card content */}

              <div className="p-5">
                <div className="h-6 w-4/5 animate-pulse rounded-lg bg-slate-200" />

                <div className="mt-3 flex items-center gap-2">
                  <div className="size-4 animate-pulse rounded-full bg-slate-200" />

                  <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="mt-4 flex items-center gap-5 border-y border-slate-100 py-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="mt-5 h-11 w-full animate-pulse rounded-xl bg-slate-300" />
              </div>
            </article>
          ))}
        </section>

        {/* Pagination skeleton */}

        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-200" />

          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="size-10 animate-pulse rounded-xl bg-slate-200"
            />
          ))}

          <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </main>
  );
}

interface FilterSkeletonProps {
  className?: string;
}

function FilterSkeleton({
  className = "",
}: FilterSkeletonProps) {
  return (
    <div className={className}>
      <div className="mb-2 h-4 w-24 animate-pulse rounded bg-slate-200" />

      <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}