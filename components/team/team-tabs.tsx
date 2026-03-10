"use client"

import { useState } from "react"
import { TeamPlayerStats } from "@/components/team/team-player-stats"
import { GamesCarousel } from "@/components/Game/GamesCarousel"
import { Game } from "@/lib/league-data"

export function TeamTabs({
  players,
  stats,
  games
}: {
  players: any[]
  stats: any[]
  games: Game[]
}) {

  const [view,setView] = useState<"roster"|"schedule"|"score">("roster")

  return (
    <div className="space-y-6">

      {/* PILLS */}
      <div className="flex gap-2">

        <button
          onClick={()=>setView("roster")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            view === "roster"
              ? "bg-orange-500 text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Roster
        </button>

        <button
          onClick={()=>setView("schedule")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            view === "schedule"
              ? "bg-orange-500 text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Schedule
        </button>

        <button
          onClick={()=>setView("score")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            view === "score"
              ? "bg-orange-500 text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Score
        </button>

      </div>

      {/* CONTENT */}

      {view === "roster" && (
        <TeamPlayerStats players={players} stats={stats} />
      )}

      {view === "schedule" && (
        <GamesCarousel
          sectionTitle="Upcoming Games"
          games={games}
        />
      )}

      {view === "score" && (
        <GamesCarousel
          sectionTitle="Recent Scores"
          games={games}
        />
      )}

    </div>
  )
}