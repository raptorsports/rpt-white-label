"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsPost } from "@/lib/league-data";

type NewsCarouselProps = {
  items: NewsPost[];
  basePath: string;
};

function formatPublishedDate(iso: string) {
  const d = new Date(iso);

  return d.toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}

function getFallbackGradient(index: number) {
  const gradients = [
    "from-slate-950 via-slate-800 to-slate-600",
    "from-zinc-950 via-slate-800 to-slate-500",
    "from-slate-900 via-neutral-800 to-slate-600",
    "from-stone-950 via-slate-900 to-zinc-600",
  ];

  return gradients[index % gradients.length];
}

export function NewsCarousel({ items, basePath }: NewsCarouselProps) {
  const slides = useMemo(() => items ?? [], [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div className="rounded-[28px] bg-white p-8 text-sm text-slate-500 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        No news available yet.
      </div>
    );
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-white p-3 shadow-[0_10px_40px_rgba(15,23,42,0.08)] md:p-4">
      <div className="relative overflow-hidden rounded-[26px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((item, index) => (
            <div key={item.id} className="min-w-full">
              <Link
                href={`${basePath}/news/${item.slug}`}
                className="group relative block h-[320px] overflow-hidden rounded-[26px] md:h-[420px]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getFallbackGradient(
                    index
                  )}`}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.20),transparent_25%),linear-gradient(to_top,rgba(15,23,42,0.88),rgba(15,23,42,0.22),rgba(15,23,42,0.08))]" />

                <div className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-[1.03]" />

                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                  <div className="mb-3 w-fit rounded-full bg-white/12 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    League Update
                  </div>

                  <h3 className="max-w-3xl text-2xl font-semibold tracking-tight text-white md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
                    {item.excerpt}
                  </p>

                  <div className="mt-5 flex items-center gap-3 text-sm text-white/70">
                    <span>{formatPublishedDate(item.publishedISO)}</span>
                    <span className="h-1 w-1 rounded-full bg-white/50" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      Read article
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous news"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/25"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next news"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/25"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to news ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? "w-8 bg-slate-900" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}