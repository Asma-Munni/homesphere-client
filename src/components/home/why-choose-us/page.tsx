"use client";

import { motion } from "framer-motion";

import { whyChooseData } from "./whyChooseData";

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            WHY CHOOSE US
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Why Choose HomeSphere?
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            We simplify property discovery through trusted listings,
            powerful search, and a secure platform designed for both
            tenants and property holders.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {whyChooseData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">
                  <Icon className="h-8 w-8 text-teal-700" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}