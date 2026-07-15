import Link from "next/link";

import {
  ArrowLeft,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                <Users size={24} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Manage Users
                </h1>

                <p className="mt-1 text-slate-600">
                  Review and manage HomeSphere user accounts.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/admin"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
          >
            <ArrowLeft size={18} />

            Back to Dashboard
          </Link>
        </div>

        {/* User management content */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <ShieldCheck size={32} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              User Management
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              The admin user management interface is ready. Registered user
              information will appear here after the users API is connected
              with the dashboard.
            </p>

            <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
              <p className="font-semibold text-slate-700">
                No user data is currently available.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This page does not display fake user information. Real users
                will be loaded from the HomeSphere database.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}