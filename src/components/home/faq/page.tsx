"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { faqData } from "./faq-data";

export default function Faq() {
  const [activeId, setActiveId] = useState<number>(1);

  const handleToggle = (id: number) => {
    setActiveId((prev) => (prev === id ? 0 : id));
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}

        <div className="text-center">
          <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold tracking-wide text-teal-700">
            FAQ
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Find answers to the most common questions about using
            HomeSphere and discovering your perfect property.
          </p>
        </div>

        {/* Accordion */}

        <div className="mt-14 space-y-5">
          {faqData.map((item) => {
            const isOpen = activeId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <ChevronDown className="h-6 w-6 text-teal-700" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-6 py-5">
                        <p className="leading-7 text-slate-600">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}