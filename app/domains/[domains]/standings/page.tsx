import { getLeagueByDomain, getStandings } from "@/lib/league-data";
import { StandingsTable } from "@/components/league/standings-table";

export default async function StandingsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const league = await getLeagueByDomain(domain);
  if (!league) return <div>League not found.</div>;

  const standings = await getStandings(league.id);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Standings</h1>
        <p className="text-sm text-muted-foreground">{league.seasonLabel}</p>
      </div>

      <StandingsTable teams={standings} />
    </div>
  );
}
