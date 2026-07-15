import Link from "next/link";

import {
  ArrowRight,
  FileText,
  Home,
} from "lucide-react";

export default function TenantRequestsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
              <FileText size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Rental Requests
              </h1>

              <p className="mt-1 text-slate-600">
                Review your submitted property rental requests.
              </p>
            </div>
          </div>

          <Link
            href="/properties"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 font-semibold text-white transition hover:bg-teal-800"
          >
            Explore Properties

            <ArrowRight size={18} />
          </Link>
        </div>

        <section className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <Home size={31} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            No rental requests yet
          </h2>

          <p className="mt-3 max-w-md leading-7 text-slate-600">
            Your rental requests will appear here after you contact a property
            holder or submit a request for a property.
          </p>

          <Link
            href="/properties"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-teal-700 px-5 py-2.5 font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            Find a Property

            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}