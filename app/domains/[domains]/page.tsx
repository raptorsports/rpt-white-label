import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getGames,
  getLeagueByDomain,
  getNews,
  getSponsors,
  getStandings,
  getTeams,
} from "@/lib/league-data";
import { SponsorsStrip } from "@/components/league/sponsors-strip";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default async function LeagueHome({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const league = await getLeagueByDomain(domain);

  if (!league) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>League not found</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No tenant configured for domain: <span className="font-mono">{domain}</span>
        </CardContent>
      </Card>
    );
  }

  const [teams, standings, games, news, sponsors] = await Promise.all([
    getTeams(league.id),
    getStandings(league.id),
    getGames(league.id),
    getNews(league.id),
    getSponsors(league.id),
  ]);

  const upcoming = games.filter((g) => g.status === "upcoming").slice(0, 5);
  const results = games.filter((g) => g.status === "final").slice(0, 5);
  const topStandings = standings.slice(0, 4);
  const latestNews = news.slice(0, 3);

  const base = `/domains/${encodeURIComponent(domain)}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3">
            <span>{league.name}</span>
            <Badge variant="secondary">{league.seasonLabel}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {league.location ? <div>{league.location}</div> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link className="underline" href={`${base}/schedule`}>View schedule</Link>
            <span>•</span>
            <Link className="underline" href={`${base}/standings`}>View standings</Link>
            <span>•</span>
            <Link className="underline" href={`${base}/teams`}>Teams</Link>
            <span>•</span>
            <Link className="underline" href={`${base}/contact`}>Contact</Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Games</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 ? (
              <div className="text-sm text-muted-foreground">No upcoming games.</div>
            ) : (
              upcoming.map((g) => {
                const home = teams.find((t) => t.id === g.homeTeamId)?.name ?? g.homeTeamId;
                const away = teams.find((t) => t.id === g.awayTeamId)?.name ?? g.awayTeamId;
                return (
                  <div key={g.id} className="rounded-md border bg-white p-3">
                    <div className="text-sm font-medium">
                      {away} @ {home}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateTime(g.dateISO)} {g.location ? `• ${g.location}` : ""}
                    </div>
                  </div>
                );
              })
            )}
            <Separator />
            <Link className="text-sm underline" href={`${base}/schedule`}>
              Full schedule →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.length === 0 ? (
              <div className="text-sm text-muted-foreground">No recent results.</div>
            ) : (
              results.map((g) => {
                const home = teams.find((t) => t.id === g.homeTeamId)?.name ?? g.homeTeamId;
                const away = teams.find((t) => t.id === g.awayTeamId)?.name ?? g.awayTeamId;
                return (
                  <div key={g.id} className="rounded-md border bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium">
                        {away} @ {home}
                      </div>
                      <div className="text-sm tabular-nums">
                        {g.score ? `${g.score.away}–${g.score.home}` : "—"}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateTime(g.dateISO)} {g.location ? `• ${g.location}` : ""}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Standings (Top 4)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {topStandings.map((t, idx) => (
                <div key={t.id} className="flex items-center justify-between rounded-md border bg-white p-3">
                  <div className="text-sm font-medium">
                    {idx + 1}. {t.name}
                  </div>
                  <div className="text-sm tabular-nums text-muted-foreground">{t.points} pts</div>
                </div>
              ))}
              <Separator />
              <Link className="text-sm underline" href={`${base}/standings`}>
                Full standings →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>League News</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {latestNews.map((p) => (
                <Link key={p.id} href={`${base}/news/${p.slug}`} className="block rounded-md border bg-white p-3 hover:bg-muted">
                  <div className="text-sm font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.excerpt}</div>
                </Link>
              ))}
              <Separator />
              <Link className="text-sm underline" href={`${base}/news`}>
                All news →
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <SponsorsStrip sponsors={sponsors} />

          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {teams.slice(0, 6).map((t) => (
                <Link
                  key={t.id}
                  className="block rounded-md border bg-white p-3 hover:bg-muted"
                  href={`${base}/teams/${t.id}`}
                >
                  <div className="text-sm font-medium">{t.name}</div>
                </Link>
              ))}
              <Separator />
              <Link className="text-sm underline" href={`${base}/teams`}>
                All teams →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
