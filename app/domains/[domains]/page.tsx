import Link from "next/link";
import { ChevronRight, CalendarDays, Newspaper, Trophy } from "lucide-react";
import {
  getGames,
  getLeagueByDomain,
  getNews,
  getSponsors,
  getTeams,
} from "@/lib/league-data";
import { Badge } from "@/components/ui/badge";
import { NewsCarousel } from "@/components/league/news-carousel";
import { SponsorsMarquee } from "@/components/league/sponsors-marquee";

function formatDateTime(iso: string) {
  const d = new Date(iso);

  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDivision(value?: string) {
  if (!value) return "Division";

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isUpcomingGame(matchStart?: string, isFinished?: boolean) {
  if (!matchStart) return false;
  if (isFinished) return false;

  return new Date(matchStart).getTime() >= Date.now();
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
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="rounded-3xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          <h1 className="text-xl font-semibold text-slate-900">League not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            No tenant configured for domain:{" "}
            <span className="font-mono text-slate-700">{domain}</span>
          </p>
        </div>
      </div>
    );
  }

  const [teams, games, news, sponsors] = await Promise.all([
    getTeams(league.id),
    getGames(league.id),
    getNews(league.id),
    getSponsors(league.id),
  ]);

  const upcomingGames = [...games]
    .filter((game) => isUpcomingGame(game.matchStart, game.isFinished))
    .sort(
      (a, b) =>
        new Date(a.matchStart).getTime() - new Date(b.matchStart).getTime()
    );

  const featuredNews = [...news].sort(
    (a, b) =>
      new Date(b.publishedISO).getTime() - new Date(a.publishedISO).getTime()
  );

  const base = `/domains/${encodeURIComponent(domain)}`;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 md:px-6 lg:space-y-10">
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-[0_12px_50px_rgba(15,23,42,0.28)] md:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border-0 bg-white/12 px-3 py-1 text-white hover:bg-white/12">
                {league.seasonLabel}
              </Badge>

              {league.location ? (
                <Badge className="rounded-full border-0 bg-white/8 px-3 py-1 text-white/90 hover:bg-white/8">
                  {league.location}
                </Badge>
              ) : null}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {league.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
              Follow the latest schedule across all divisions, stay on top of league
              news, and discover the sponsors supporting the season.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[430px]">
            <Link
              href={`${base}/schedule`}
              className="group rounded-2xl bg-white/10 px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                Explore
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-sm font-medium">
                Schedule
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href={`${base}/news`}
              className="group rounded-2xl bg-white/10 px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                Read
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-sm font-medium">
                News
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href={`${base}/teams`}
              className="group rounded-2xl bg-white/10 px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                Browse
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-sm font-medium">
                Teams
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href={`${base}/standings`}
              className="group rounded-2xl bg-white/10 px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                View
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-sm font-medium">
                Standings
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-slate-900">
              <CalendarDays className="h-5 w-5" />
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Upcoming Games
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              The next scheduled games across all divisions, sorted by the closest start time.
            </p>
          </div>

          <Link
            href={`${base}/schedule`}
            className="hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 md:inline-flex"
          >
            Full schedule
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {upcomingGames.length === 0 ? (
          <div className="rounded-[28px] bg-white p-8 text-sm text-slate-500 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            No upcoming games found.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcomingGames.map((game, index) => {
              const homeTeam =
                teams.find((team) => team.id === game.homeTeam.id) ?? game.homeTeam;

              const awayTeam =
                teams.find((team) => team.id === game.awayTeam.id) ?? game.awayTeam;

              return (
                <Link
                  key={game.id}
                  href={`${base}/schedule`}
                  className="group relative overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.14)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-300 opacity-90" />

                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <Badge className="rounded-full border-0 bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-100">
                        {formatDivision(game.division)}
                      </Badge>

                      {index === 0 ? (
                        <div className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                          Next up
                        </div>
                      ) : null}
                    </div>

                    <div className="text-right text-xs text-slate-400">
                      {game.gameType ? game.gameType.toUpperCase() : "GAME"}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 transition-colors duration-300 group-hover:bg-slate-100/80">
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
                          Away
                        </div>
                        <div className="truncate text-base font-semibold text-slate-900">
                          {awayTeam.name ?? "Away Team"}
                        </div>
                      </div>

                      <div className="text-xs font-medium text-slate-400">AT</div>

                      <div className="min-w-0 text-right">
                        <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
                          Home
                        </div>
                        <div className="truncate text-base font-semibold text-slate-900">
                          {homeTeam.name ?? "Home Team"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-slate-800">
                        {formatDateTime(game.matchStart)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {game.arenaName ?? "Arena TBA"}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="md:hidden">
          <Link
            href={`${base}/schedule`}
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Full schedule
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-slate-900">
              <Newspaper className="h-5 w-5" />
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                League News
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Featured updates with carousel navigation, autoplay, and pagination.
            </p>
          </div>

          <Link
            href={`${base}/news`}
            className="hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 md:inline-flex"
          >
            All news
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <NewsCarousel items={featuredNews} basePath={base} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Trophy className="h-5 w-5" />
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Sponsors
          </h2>
        </div>

        <SponsorsMarquee sponsors={sponsors} />
      </section>
    </div>
  );
}