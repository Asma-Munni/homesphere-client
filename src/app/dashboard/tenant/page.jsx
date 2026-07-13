export default function TenantDashboardPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Tenant Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your saved properties and rental activities.
        </p>
      </div>


      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Favorite Properties
          </h2>

          <p className="mt-3 text-3xl font-bold text-teal-700">
            0
          </p>
        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Rental Requests
          </h2>

          <p className="mt-3 text-3xl font-bold text-teal-700">
            0
          </p>
        </div>


        <div className="rounded-2xl border border-slate-200 bg-white bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Saved Search
          </h2>

          <p className="mt-3 text-3xl font-bold text-teal-700">
            0
          </p>
        </div>

      </div>

    </div>
  );
}