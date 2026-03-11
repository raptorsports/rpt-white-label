import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Team, TeamStats } from "@/lib/league-data"

export function StandingsTable({
  teams,
  stats,
}: {
  teams: Team[]
  stats: TeamStats[]
}) {

  const getStats = (teamID?: string) => {
    return stats.find((s) => s.teamID === teamID)
  }

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-orange-500 font-bold"
    if (rank === 2) return "text-orange-500 font-bold"
    if (rank === 3) return "text-orange-500 font-bold"
    return ""
  }

  /*
  ============================================
  HEAD TO HEAD PLACEHOLDER
  ============================================

  To implement this properly you must pass
  the list of games played between teams.

  For now we return 0 (tie).
  */

  const headToHead = (a: Team, b: Team) => {
    return 0
  }

  /*
  ============================================
  SORT TEAMS BASED ON LEAGUE RULES
  ============================================
  */

  const sortedTeams = [...teams].sort((a, b) => {

    const aStats = getStats(a.id)
    const bStats = getStats(b.id)

    const aPts = aStats?.pts ?? 0
    const bPts = bStats?.pts ?? 0

    // 1️⃣ POINTS
    if (bPts !== aPts) {
      return bPts - aPts
    }

    const aWins = aStats?.w ?? 0
    const bWins = bStats?.w ?? 0

    // 2️⃣ WINS
    if (bWins !== aWins) {
      return bWins - aWins
    }

    // 3️⃣ HEAD TO HEAD
    const h2h = headToHead(a, b)
    if (h2h !== 0) {
      return h2h
    }

    const aDiff = (aStats?.gf ?? 0) - (aStats?.ga ?? 0)
    const bDiff = (bStats?.gf ?? 0) - (bStats?.ga ?? 0)

    // 4️⃣ GOAL DIFFERENTIAL
    if (bDiff !== aDiff) {
      return bDiff - aDiff
    }

    const aGF = aStats?.gf ?? 0
    const bGF = bStats?.gf ?? 0

    // 5️⃣ GOALS FOR
    return bGF - aGF
  })

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white shadow-[0_0_08px_rgba(0,0,0,0.12)] overflow-hidden">

        <Table>

          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Team</TableHead>

              <TableHead className="text-right font-semibold">GP</TableHead>
              <TableHead className="text-right font-semibold">W</TableHead>
              <TableHead className="text-right font-semibold">L</TableHead>
              <TableHead className="text-right font-semibold">OT</TableHead>

              <TableHead className="text-right font-semibold text-black">
                PTS
              </TableHead>

              <TableHead className="text-right font-semibold">GF</TableHead>
              <TableHead className="text-right font-semibold">GA</TableHead>
              <TableHead className="text-right font-semibold">DIFF</TableHead>
              <TableHead className="text-right font-semibold">STREAK</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            {sortedTeams.map((team, idx) => {

              const teamStats = getStats(team.id)
              const diff = (teamStats?.gf ?? 0) - (teamStats?.ga ?? 0)

              return (

                <TableRow
                  key={team.id}
                  className="hover:bg-gray-50 transition-colors \"
                >

                  {/* Rank */}
                  <TableCell className={`font-semibold ${getRankStyle(idx + 1)}`}>
                    {idx + 1}
                  </TableCell>

                  {/* Team */}
                  <TableCell>
                    <div className="flex items-center gap-3">

                      {team.logo && (
                        <Image
                          src={team.logo}
                          alt={team.name ?? ""}
                          width={28}
                          height={28}
                          className="rounded-sm"
                        />
                      )}

                      <span className="font-semibold">
                        {team.name}
                      </span>

                    </div>
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {teamStats?.gp ?? 0}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {teamStats?.w ?? 0}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {teamStats?.l ?? 0}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {teamStats?.otl ?? 0}
                  </TableCell>

                  {/* Points */}
                  <TableCell className="text-right font-semibold">
                    {teamStats?.pts ?? 0}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {teamStats?.gf ?? 0}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {teamStats?.ga ?? 0}
                  </TableCell>

                  {/* Goal Diff */}
                  <TableCell
                    className={`text-right font-semibold ${diff > 0
                      ? "text-green-600"
                      : diff < 0
                        ? "text-red-500"
                        : ""
                      }`}
                  >
                    {diff > 0 ? `+${diff}` : diff}
                  </TableCell>

                  {/* Streak */}
                  <TableCell className="text-right font-semibold">

                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold
                      ${teamStats?.streak?.startsWith("W")
                          ? "bg-green-100 text-green-700"
                          : teamStats?.streak?.startsWith("L")
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }
                    `}
                    >
                      {teamStats?.streak ?? "-"}
                    </span>

                  </TableCell>

                </TableRow>

              )
            })}

          </TableBody>

        </Table>

      </div>

      {/* TIEBREAKER RULES */}
      <div className="bg-amber-50 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.15)] px-4 py-3 text-sm text-amber-900 flex items-start gap-3">

        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mt-[2px] text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>

        {/* Text */}
        <div>
          <span className="font-semibold">Standings Tiebreaker Rules:</span>{" "}
          Teams are ranked using the following order:
          <span className="font-semibold ml-1">
            Points → Wins → Head-to-Head → Goal Differential → Goals For
          </span>
        </div>

      </div>
    </div>
  )
}