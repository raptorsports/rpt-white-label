import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  getLeagueByDomain,
  getTeam,
  getPlayersByIDs,
  getPlayerStatsByIDs,
  getGamesByTeamID
} from "@/lib/league-data"
import { Separator } from "@/components/ui/separator"
import { TeamTabs } from "@/components/team/team-tabs"

export default async function TeamDetailPage({
  params,
}: {
  params: { domain: string; teamId: string }
}) {

  const { domain, teamId } = params

  const league = await getLeagueByDomain(domain)
  if (!league) return <div>League not found.</div>

  const team = await getTeam(league.id, teamId)
  if (!team) return <div>Team not found.</div>

  const base = `/domains/${encodeURIComponent(domain)}/teams`

  /* ===============================
     FETCH PLAYERS
  =============================== */

  const players =
    team.players?.length
      ? await getPlayersByIDs(team.players)
      : []

  const stats =
    players.length
      ? await getPlayerStatsByIDs(
        players
          .map(p => p.statsID)
          .filter(Boolean) as string[]
      )
      : []

  const sortedPlayers = [...players].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  /* ===============================
     FETCH TEAM GAMES
  =============================== */

  const games = await getGamesByTeamID(teamId)

  return (
    <div className="space-y-8">

      {/* BACK BUTTON */}
      <Link
        href={base}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition"
      >
        <ArrowLeft size={16} />
        Back to Teams
      </Link>

      {/* TEAM HEADER */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] text-foreground p-6">

        <div className="flex items-center gap-6">

          <div className="p-3">
            <Image
              src={team.logo ?? ""}
              alt={team.name ?? ""}
              width={74}
              height={74}
              className="object-contain"
            />
          </div>

          <div className="space-y-1">

            <h1 className="text-3xl font-bold tracking-tight">
              {team.name}
            </h1>

            <p className="text-md font-semibold text-gray-500 uppercase">
              {team.division ?? "—"}
            </p>

            <p className="text-sm font-semibold text-gray-500">
              Team Manager: Victor Monteiro
            </p>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <Card className="border-0 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
        <CardContent className="p-6 space-y-4">

          <TeamTabs
            players={sortedPlayers}
            stats={stats}
            games={games}
          />

        </CardContent>
      </Card>

    </div>
  )
}