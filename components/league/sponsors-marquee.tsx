import Link from "next/link";
import type { Sponsor } from "@/lib/league-data";

type SponsorsMarqueeProps = {
  sponsors: Sponsor[];
};

export function SponsorsMarquee({ sponsors }: SponsorsMarqueeProps) {
  if (!sponsors || sponsors.length === 0) {
    return (
      <div className="rounded-[28px] bg-white p-8 text-sm text-slate-500 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        No sponsors available yet.
      </div>
    );
  }

  const loopSponsors = [...sponsors, ...sponsors];

  return (
    <div className="relative w-full overflow-hidden rounded-[30px] bg-white px-4 py-5 shadow-[0_10px_40px_rgba(15,23,42,0.08)] md:px-5">

      {/* gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

      {/* TRACK */}
      <div className="flex w-[200%] animate-sponsors-marquee hover:[animation-play-state:paused]">

        {loopSponsors.map((sponsor, index) => {
          const content = (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-50 px-6 py-4 text-sm font-medium text-slate-700 shadow-[0_6px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100">
              {sponsor.name}
            </div>
          );

          return (
            <div
              key={`${sponsor.id}-${index}`}
              className="flex flex-1 px-2 min-w-0"
            >
              {sponsor.url ? (
                <Link
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}