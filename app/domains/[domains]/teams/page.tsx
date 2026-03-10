import { getLeagueByDomain, getTeams } from "@/lib/league-data";
import { TeamsPage } from "./TeamsPage";

export default async function Page({
  params,
}: {
  params: { domain: string };
}) {
  const { domain } = params;

  const league = await getLeagueByDomain(domain);
  const teams = await getTeams(league.id);

  return (
    <TeamsPage
      teams={teams}
      seasonLabel={league.seasonLabel}
      domain={domain}
    />
  );
}