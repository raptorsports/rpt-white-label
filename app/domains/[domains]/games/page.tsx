import { getGames, getLeagueByDomain } from "@/lib/league-data";
import { GamesByDivision } from "@/components/Game/GamesByDivision";

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

  const games = await getGames(league.id);

  const sortedGames = [...games].sort(
    (a, b) =>
      new Date(a.matchStart).getTime() -
      new Date(b.matchStart).getTime()
  );

  return (
    <div className="space-y-10">
      <GamesByDivision
        games={sortedGames}
        seasonLabel={league.seasonLabel}
      />
    </div>
  );
}