"use client"

import { useState } from "react"
import { TeamPlayerStats } from "@/components/team/team-player-stats"
import { GamesCarousel } from "@/components/Game/GamesCarousel"
import { Game } from "@/lib/league-data"
import { Separator } from "@/components/ui/separator"
import { ChartNoAxesCombined } from "lucide-react"

export function TeamTabs({
  players = [],
  stats = [],
  games = []
}: {
  players: any[]
  stats: any[]
  games: Game[]
}) {

  const [view, setView] = useState<"roster" | "schedule" | "score">("roster")

  const title =
    view === "roster"
      ? "Roster"
      : view === "schedule"
        ? "Schedule"
        : "Scores"

  const now = new Date()

  /* ===============================
     UPCOMING GAMES (Schedule)
  =============================== */

  const upcomingGames = games
    .filter((g) => {

      if (!g.matchStart) return false

      const start = new Date(g.matchStart)

      const oneHourAfterStart = new Date(
        start.getTime() + 60 * 60 * 1000
      )

      return now < oneHourAfterStart

    })
    .sort((a, b) =>
      new Date(a.matchStart).getTime() -
      new Date(b.matchStart).getTime()
    )

  /* ===============================
     FINISHED GAMES (Scores)
  =============================== */

  const finishedGames = games
    .filter((g) => {

      if (!g.matchStart) return false

      const start = new Date(g.matchStart)

      const oneHourAfterStart = new Date(
        start.getTime() + 60 * 60 * 1000
      )

      return now >= oneHourAfterStart

    })
    .sort((a, b) =>
      new Date(b.matchStart).getTime() -
      new Date(a.matchStart).getTime()
    )

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold uppercase">
            {title}
          </h1>

          {view === "roster" && (
             <p className="text-md font-bold text-gray-500">Click on a player to see stats</p>
          )}

          {view === "schedule" && (
             <p className="text-md font-bold text-gray-500">
              All Scheduled Upcoming Games
            </p>
          )}

          {view === "score" && (
             <p className="text-md font-bold text-gray-500">
              Previous Game Results
            </p>
          )}

        </div>

        {view === "roster" && (
          <span className="text-xs text-muted-foreground">
            {players?.length ?? 0} players
          </span>
        )}

      </div>

      <Separator />

      {/* TABS */}
      <div className="flex gap-2">

        <button
          onClick={() => setView("roster")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${view === "roster"
            ? "bg-blue-950 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Roster
        </button>

        <button
          onClick={() => setView("schedule")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${view === "schedule"
            ? "bg-blue-950 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Schedule
        </button>

        <button
          onClick={() => setView("score")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${view === "score"
            ? "bg-blue-950 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Score
        </button>

      </div>

      {/* CONTENT */}

      {view === "roster" && (
        <TeamPlayerStats
          players={players ?? []}
          stats={stats ?? []}
        />
      )}

      {view === "schedule" && (
        <GamesCarousel
          sectionTitle="Upcoming Games"
          games={upcomingGames}
        />
      )}

      {view === "score" && (
        <GamesCarousel
          sectionTitle="Previous Scores"
          games={finishedGames}
        />
      )}

    </div>
  )
}