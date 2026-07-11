"use client";

import { ArrowRight, Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl lg:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Side */}

            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold tracking-wide text-teal-100">
                NEWSLETTER
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white">
                Stay Updated with the Latest Properties
              </h2>

              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-200">
                Subscribe to receive exclusive property listings,
                market insights, and the latest updates from
                HomeSphere directly in your inbox.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-teal-100">
                <Mail className="h-5 w-5" />
                No spam. Unsubscribe anytime.
              </div>
            </div>

            {/* Right Side */}

            <div>
              <div className="rounded-3xl bg-white p-6 shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-900">
                  Subscribe Now
                </h3>

                <p className="mt-2 text-slate-600">
                  Join our growing community and never miss a
                  property opportunity.
                </p>

                <form className="mt-8 space-y-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-600"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-600"
                  />

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
                  >
                    Subscribe

                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-500">
                  We respect your privacy and never share your
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}