"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { GamesCarousel } from "@/components/Game/GamesCarousel";
import { Game } from "@/lib/league-data";

export function GamesByDivision({
  games,
  seasonLabel,
}: {
  games: Game[];
  seasonLabel: string;
}) {
  const [selectedDivision, setSelectedDivision] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;

  /* ===============================
     DIVISIONS
  =============================== */

  const divisions = useMemo(() => {
    const unique = Array.from(
      new Set(games.map((g) => g.division).filter(Boolean))
    );
    return ["All", ...unique];
  }, [games]);

  /* ===============================
     FILTER BY DIVISION
  =============================== */

  const divisionFilteredGames = useMemo(() => {
    if (selectedDivision === "All") return games;

    return games.filter((game) => {
      if (!game.division) return false;

      return (
        game.division.trim().toLowerCase() ===
        selectedDivision.trim().toLowerCase()
      );
    });
  }, [games, selectedDivision]);

  /* ===============================
     SEARCH
  =============================== */

  const searchedGames = useMemo(() => {
    if (!searchQuery.trim()) return divisionFilteredGames;

    const query = searchQuery.toLowerCase();

    return divisionFilteredGames.filter((game) => {
      const home = game.homeTeam?.name?.toLowerCase() ?? "";
      const away = game.awayTeam?.name?.toLowerCase() ?? "";
      const location = game.arenaName?.toLowerCase() ?? "";

      const dateString = new Date(game.matchStart)
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
        .toLowerCase();

      return (
        home.includes(query) ||
        away.includes(query) ||
        location.includes(query) ||
        dateString.includes(query)
      );
    });
  }, [divisionFilteredGames, searchQuery]);

  /* ===============================
     UPCOMING
  =============================== */

  const upcomingGames = useMemo(() => {
    return searchedGames
      .filter((g) => {
        const gameTime = new Date(g.matchStart).getTime();
        return gameTime + ONE_HOUR >= now;
      })
      .sort(
        (a, b) =>
          new Date(a.matchStart).getTime() -
          new Date(b.matchStart).getTime()
      );
  }, [searchedGames, now]);

  /* ===============================
     PAST
  =============================== */

  const pastGames = useMemo(() => {
    return searchedGames
      .filter((g) => {
        const gameTime = new Date(g.matchStart).getTime();
        return gameTime + ONE_HOUR < now;
      })
      .sort(
        (a, b) =>
          new Date(b.matchStart).getTime() -
          new Date(a.matchStart).getTime()
      );
  }, [searchedGames, now]);

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div className="space-y-4">

        <h2 className="text-xl font-semibold">
          {seasonLabel} Games
        </h2>

        {/* SEARCH */}
        <div className="relative w-full max-w-md">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by team, location, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-white border border-gray-200 
                       pl-10 pr-10 py-2.5 text-sm shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-rptOrange 
                       focus:border-transparent transition"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* DIVISION FILTER */}
        <div className="flex gap-3 flex-wrap">
          {divisions.map((division) => (
            <button
              key={division}
              onClick={() => setSelectedDivision(division || "")}
              className={`px-4 py-2 rounded-full border text-sm font-semibold uppercase transition ${
                selectedDivision === division
                  ? "bg-blue-950 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {division}
            </button>
          ))}
        </div>

      </div>

      {/* UPCOMING */}
      <div className="space-y-6">

        <GamesCarousel
          sectionTitle="Upcoming Games"
          games={upcomingGames}
        />

        {upcomingGames.length === 0 && (
          <p className="text-md text-muted-foreground -mt-12">
            No upcoming games.
          </p>
        )}
      </div>

      {/* SCORES */}
      <div className="space-y-6">

        <GamesCarousel
          sectionTitle="Scores"
          games={pastGames}
        />

        {pastGames.length === 0 && (
          <p className="text-sm text-muted-foreground -mt-12">
            No completed games.
          </p>
        )}
      </div>
    </div>
  );
}