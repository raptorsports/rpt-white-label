import { getLeagueByDomain, getTeamStandings, getTeams } from "@/lib/league-data";
import { StandingsView } from "@/components/league/standings-view";

export default async function StandingsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  const league = await getLeagueByDomain(domain);
  if (!league) return <div>League not found.</div>;

  const teams = await getTeams(league.id);
  const teamStats = await getTeamStandings(
    league.id,
    league.activeSeasonID || ""
  );

  return (
    <StandingsView
      league={league}
      teams={teams}
      stats={teamStats}
    />
  );
}