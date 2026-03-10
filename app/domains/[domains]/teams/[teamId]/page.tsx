import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  getLeagueByDomain,
  getTeam,
  getPlayersByIDs,
  getPlayerStatsByIDs
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
      <div className="relative overflow-hidden rounded-xl border bg-gray-200 text-foreground p-6">

        <div className="flex items-center gap-6">

          <div className="rounded-xl bg-white p-3 shadow-lg">
            <Image
              src={team.logo ?? ""}
              alt={team.name ?? ""}
              width={70}
              height={70}
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

      {/* ROSTER */}
      <Card>
        <CardContent className="p-6 space-y-4">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold uppercase">Roster</h1>
              <p className="text-sm text-gray-400">
                Click on a player to see stats
              </p>
            </div>

            <span className="text-xs text-muted-foreground">
              {sortedPlayers.length} players
            </span>
          </div>

          <Separator />

          <TeamTabs
            players={sortedPlayers}
            stats={stats}
            games={team.games ?? []}
          />

        </CardContent>
      </Card>

    </div>
  )
}