export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>


        <p className="mt-2 text-slate-600">
          Monitor users, properties, and overall platform activity.
        </p>

      </div>





      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-semibold text-slate-900">
            Total Users
          </h2>

          <p className="mt-3 text-3xl font-bold text-teal-700">
            0
          </p>

        </div>




        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-semibold text-slate-900">
            Tenants
          </h2>

          <p className="mt-3 text-3xl font-bold text-teal-700">
            0
          </p>

        </div>




        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-semibold text-slate-900">
            Property Holders
          </h2>

          <p className="mt-3 text-3xl font-bold text-teal-700">
            0
          </p>

        </div>




        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-semibold text-slate-900">
            Properties
          </h2>

          <p className="mt-3 text-3xl font-bold text-teal-700">
            0
          </p>

        </div>


      </div>


    </div>
  );
}