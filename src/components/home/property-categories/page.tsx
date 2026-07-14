import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Home,
  Search,
} from "lucide-react";

const categories = [
  {
    name: "Apartment",
    description:
      "Explore comfortable apartments for individuals, couples and families.",
    icon: Building2,
  },
  {
    name: "House",
    description:
      "Discover spacious houses with privacy and family-friendly features.",
    icon: Home,
  },
  {
    name: "Condo",
    description:
      "Browse modern condominiums with convenient facilities and locations.",
    icon: Building2,
  },
  {
    name: "Studio",
    description:
      "Find practical studio spaces suitable for students and professionals.",
    icon: Home,
  },
  {
    name: "Commercial",
    description:
      "Search commercial spaces for offices, shops and growing businesses.",
    icon: Building2,
  },
];

export default function PropertyCategories() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700">
              <Search size={16} />

              Browse by Category
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Find the right type of property
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Select a property category and quickly discover listings that
              match your needs and lifestyle.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-semibold text-teal-700 transition hover:text-teal-800"
          >
            Browse all listings

            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Category cards */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/properties?category=${encodeURIComponent(
                  category.name
                )}&page=1`}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-xl"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 transition group-hover:text-teal-700">
                  {category.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-teal-700">
                  Explore category

                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}