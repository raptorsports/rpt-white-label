"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GameCard } from "@/components/Game/game-card";

export function GamesCarousel({ sectionTitle, games}: { sectionTitle: string, games: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      {/* HEADER + ARROWS */}
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
            className="p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50 transition"
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
            className="p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
      >
        {games.map((g) => (
          <div
            key={g.id}
            className="min-w-[400px] max-w-[400px] flex-shrink-0"
          >
            <GameCard
              division={g.division}
              home={g.homeName}
              away={g.awayName}
              dateISO={g.dateISO}
              location={g.location}
              lockerRoom={g.lockerRoom}
              score={g.score}
              homeTeamLogo={g.homeTeamLogo}
              awayTeamLogo={g.awayTeamLogo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}