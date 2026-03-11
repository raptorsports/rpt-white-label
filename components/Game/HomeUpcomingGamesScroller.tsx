"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GameCard } from "@/components/Game/game-card";
import type { Game } from "@/lib/league-data";

export function HomeUpcomingGamesScroller({ games }: { games: Game[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    scrollRef.current?.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  }

  if (!games.length) {
    return (
      <div className="rounded-[28px] bg-white p-8 text-sm text-slate-500 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        No upcoming games found.
      </div>
    );
  }

  return (
    <div className="relative">

      <button
        onClick={scrollLeft}
        className="absolute left-[-10px] top-1/2 z-10 hidden -translate-y-1/2 rounded-full border bg-white p-2 shadow-md hover:bg-gray-50 md:flex"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-[-10px] top-1/2 z-10 hidden -translate-y-1/2 rounded-full border bg-white p-2 shadow-md hover:bg-gray-50 md:flex"
      >
        <ChevronRight size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2 px-8"
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="min-w-[400px] max-w-[400px] flex-shrink-0"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}