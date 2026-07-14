import Link from "next/link";
import {
  Building2,
  Home,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      {/* Background decoration */}
      <div className="absolute left-[-80px] top-[-80px] size-72 rounded-full bg-teal-100 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-80px] size-80 rounded-full bg-slate-200 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Logo icon */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-700 to-slate-950 text-white shadow-xl shadow-teal-900/20">
          <Building2 size={38} />
        </div>

        {/* Error number */}
        <h1 className="mt-8 bg-gradient-to-r from-teal-700 to-slate-900 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Property not found
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          The page or property you are looking for may have been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 sm:w-auto"
          >
            <Home size={18} />

            Back to Home
          </Link>

          <Link
            href="/properties"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700 sm:w-auto"
          >
            <Search size={18} />

            Explore Properties
          </Link>
        </div>

        {/* Small card */}
        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <p className="text-sm text-slate-500">
            Looking for your next home?
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            Browse verified properties and find the perfect place with
            HomeSphere.
          </p>
        </div>
      </section>
    </main>
  );
}