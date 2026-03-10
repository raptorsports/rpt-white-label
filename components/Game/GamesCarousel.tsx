"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GameCard } from "@/components/Game/game-card";
import { Game } from "@/lib/league-data";

export function GamesCarousel({
  sectionTitle,
  games,
}: {
  sectionTitle: string;
  games: Game[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{sectionTitle}</h2>

        <div className="flex gap-2">
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({
                left: -420,
                behavior: "smooth",
              })
            }
            className="p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() =>
              scrollRef.current?.scrollBy({
                left: 420,
                behavior: "smooth",
              })
            }
            className="p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SCROLL */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
      >
        {games.map((g) => (
          <div
            key={g.id}
            className="min-w-[400px] max-w-[400px] flex-shrink-0"
          >
            <GameCard game={g} />
          </div>
        ))}
      </div>
    </div>
  );
}