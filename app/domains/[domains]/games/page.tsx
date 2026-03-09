import { getGames, getLeagueByDomain, getTeams } from "@/lib/league-data";
import { GamesByDivision } from "@/components/Game/GamesByDivision";

function isToday(dateISO: string) {
  const d = new Date(dateISO);
  const today = new Date();

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

export default async function GamesPage({
  params,
}: {
  params: { domain: string };
}) {
  const { domain } = params;

  const league = await getLeagueByDomain(domain);
  if (!league) {
    return <div className="p-6">League not found.</div>;
  }

  const [teams, games] = await Promise.all([
    getTeams(league.id),
    getGames(league.id),
  ]);

  const sortedGames = [...games].sort(
    (a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime()
  );

  const gamesWithTeams = sortedGames.map((g) => ({
    ...g,
    homeName:
      teams.find((t) => t.id === g.homeTeamName)?.name ?? g.homeTeamName,
    awayName:
      teams.find((t) => t.id === g.awayTeamName)?.name ?? g.awayTeamName,
  }));

  return (
    <div className="space-y-10">
      
      {/* Client Component */}
       <GamesByDivision
        games={gamesWithTeams}
        seasonLabel={league.seasonLabel}
      />
    </div>
  );
}