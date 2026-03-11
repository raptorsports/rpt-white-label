"use client"

import { useState } from "react"
import { StandingsTable } from "@/components/league/standings-table"
import type { Team, TeamStats } from "@/lib/league-data"

export function StandingsView({
  league,
  teams,
  stats,
}: {
  league: any
  teams: Team[]
  stats: TeamStats[]
}) {

  const divisions = Array.from(
    new Set(teams.map((t) => t.division).filter(Boolean))
  )

  const [selectedDivision, setSelectedDivision] = useState<string>(
    divisions[0] || ""
  )

  const filteredTeams = teams.filter(
    (t) => t.division === selectedDivision
  )

  const filteredStats = stats.filter((s) =>
    filteredTeams.some((t) => t.id === s.teamID)
  )

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Standings</h1>
        <p className="text-sm text-muted-foreground">{league.seasonLabel}</p>
      </div>

      {/* DIVISION PILLS */}
      <div className="flex flex-wrap gap-2">

        {divisions.map((division) => (
          <button
            key={division}
            onClick={() => setSelectedDivision(division || "")}
            className={`px-4 py-1.5 rounded-full text-sm border transition
              ${
                selectedDivision === division
                  ? "bg-blue-950 text-white border-black"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {division}
          </button>
        ))}

      </div>

      {/* STANDINGS TABLE */}
      <StandingsTable
        teams={filteredTeams}
        stats={filteredStats}
      />

    </div>
  )
}