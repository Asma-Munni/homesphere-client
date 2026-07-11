"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { banners } from "./banner-data";

const SLIDE_INTERVAL = 5000;

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentBanner = banners[activeIndex];

  const nextSlide = useCallback((): void => {
    setActiveIndex((previousIndex) => {
      return (previousIndex + 1) % banners.length;
    });
  }, []);

  const previousSlide = (): void => {
    setActiveIndex((previousIndex) => {
      return previousIndex === 0
        ? banners.length - 1
        : previousIndex - 1;
    });
  };

  useEffect(() => {
    const intervalId = window.setInterval(
      nextSlide,
      SLIDE_INTERVAL,
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [nextSlide]);

  if (!currentBanner) {
    return null;
  }

  return (
    <section
      className="relative h-[60vh] min-h-[520px] overflow-hidden"
      aria-label="Featured properties"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={currentBanner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentBanner.image}
            alt={currentBanner.title}
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/45 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <motion.p
            key={`label-${currentBanner.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-100 backdrop-blur-md"
          >
            Smarter Property Discovery
          </motion.p>

          <motion.h1
            key={`title-${currentBanner.id}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {currentBanner.title}
          </motion.h1>

          <motion.p
            key={`description-${currentBanner.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg"
          >
            {currentBanner.description}
          </motion.p>

          <motion.div
            key={`actions-${currentBanner.id}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/properties"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-950/20 transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Explore Properties
            </Link>

            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Show previous banner"
        className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/25 text-white backdrop-blur-md transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Show next banner"
        className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/25 text-white backdrop-blur-md transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
      >
        <ChevronRight className="size-5" />
      </button>

      <div
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
        aria-label="Banner navigation"
      >
        {banners.map((banner, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={banner.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-8 bg-teal-400"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}