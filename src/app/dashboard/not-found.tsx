import Link from "next/link";
import {
  ArrowLeft,
  LayoutDashboard,
  Home,
} from "lucide-react";

export default function DashboardNotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      <div className="absolute -left-24 -top-24 size-72 rounded-full bg-teal-100 blur-3xl" />

      <div className="absolute -bottom-24 -right-20 size-80 rounded-full bg-slate-200 blur-3xl" />

      <section className="relative z-10 w-full max-w-2xl text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-700 to-slate-950 text-white shadow-xl shadow-teal-900/20">
          <LayoutDashboard size={38} />
        </div>

        <h1 className="mt-8 bg-gradient-to-r from-teal-700 to-slate-900 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Dashboard page not found
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
          The dashboard page you are looking for does not exist, or you may not
          have access to it.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700 sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}