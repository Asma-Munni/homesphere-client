import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HeartHandshake,
  House,
  KeyRound,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const values = [
  {
    title: "Trusted Listings",
    description:
      "We aim to provide clear and reliable property information so users can make confident decisions.",
    icon: ShieldCheck,
  },
  {
    title: "Simple Experience",
    description:
      "HomeSphere keeps property discovery and management simple, organized and user-friendly.",
    icon: Sparkles,
  },
  {
    title: "User Focused",
    description:
      "Every feature is designed around the needs of tenants, property holders and administrators.",
    icon: HeartHandshake,
  },
];

const platformFeatures = [
  {
    title: "Explore Properties",
    description:
      "Search, filter, sort and compare available properties based on your preferences.",
    icon: Search,
  },
  {
    title: "Manage Listings",
    description:
      "Property holders can add, update and manage their own property listings from one dashboard.",
    icon: Building2,
  },
  {
    title: "Secure Access",
    description:
      "Role-based authentication provides appropriate access for tenants, property holders and admins.",
    icon: KeyRound,
  },
];

const highlights = [
  {
    value: "3",
    label: "User roles",
  },
  {
    value: "100%",
    label: "Responsive design",
  },
  {
    value: "24/7",
    label: "Property browsing",
  },
  {
    value: "Secure",
    label: "Authentication system",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-950 px-4 py-20 text-white sm:py-24">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 right-0 size-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-teal-50">
              <House size={16} />
              About HomeSphere
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Making property discovery and management easier
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              HomeSphere is a property rental and management platform designed
              to connect tenants with suitable homes while helping property
              holders manage their listings efficiently.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/properties"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Explore Properties
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 font-semibold text-white transition hover:bg-white/15"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-teal-700">
              Our story
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              One platform for every property journey
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Finding a suitable property can be difficult when information is
              scattered across different places. HomeSphere brings property
              listings, search tools and management features into one organized
              platform.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Tenants can explore available homes, property holders can manage
              their own listings, and administrators can maintain the quality
              and security of the platform.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Easy property search and filtering",
                "Role-based dashboards and access",
                "Responsive experience across all devices",
                "Secure authentication and protected actions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-teal-700"
                  />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 to-slate-950 p-8 text-white shadow-xl sm:p-10">
            <div className="absolute -right-12 -top-12 size-40 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10">
                <Target size={32} />
              </div>

              <h3 className="mt-8 text-3xl font-bold">Our Mission</h3>

              <p className="mt-4 leading-8 text-slate-200">
                To create a secure, accessible and user-friendly property
                platform where people can discover suitable homes and manage
                listings with confidence.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="font-semibold text-white">
                  Built for tenants, property holders and administrators.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Each user receives the tools and access appropriate to their
                  role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center"
            >
              <p className="text-2xl font-black text-teal-700 sm:text-3xl">
                {item.value}
              </p>

              <p className="mt-2 text-sm font-medium text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features */}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-teal-700">
              What we provide
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              A complete property experience
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              HomeSphere combines discovery, management and security features
              within one consistent platform.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}

      <section className="bg-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-teal-400">
              Our values
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              The principles behind HomeSphere
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Our platform is built around trust, simplicity and meaningful
              experiences for every user.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{value.title}</h3>

                  <p className="mt-3 leading-7 text-slate-300">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-teal-700 to-teal-800 px-6 py-10 text-center text-white shadow-xl md:flex-row md:px-10 md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Users size={21} />

              <span className="font-semibold text-teal-100">
                Join the HomeSphere community
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold">
              Start your property journey today
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-teal-50">
              Explore available properties or create an account to access your
              personalized dashboard.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-teal-800 transition hover:bg-teal-50"
          >
            Create Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}