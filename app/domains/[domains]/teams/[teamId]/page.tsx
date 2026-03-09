import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeagueByDomain, getTeam } from "@/lib/league-data";
import { Separator } from "@/components/ui/separator";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ domain: string; teamId: string }>;
}) {
  const { domain, teamId } = await params;

  const league = await getLeagueByDomain(domain);
  if (!league) return <div>League not found.</div>;

  const team = await getTeam(league.id, teamId);
  if (!team) return <div>Team not found.</div>;

  const gp = team.record.w + team.record.l + (team.record.ot ?? 0);

  const base = `/domains/${encodeURIComponent(domain)}/teams`;

  return (
    <div className="space-y-4">

      {/* Back Button */}
      <Link
        href={base}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition"
      >
        <ArrowLeft size={16} />
        Back to Teams
      </Link>

      {/* Team Header */}
      <div className="flex items-center gap-4">

        <Image
          src={team.logo}
          alt={team.name}
          width={70}
          height={70}
          className="object-contain"
        />

        <div>
          <h1 className="text-2xl font-semibold">{team.name}</h1>

          <p className="text-sm text-muted-foreground">
            GP {gp} • {team.record.w}-{team.record.l}-{team.record.ot ?? 0} • {team.points} pts
          </p>
        </div>

      </div>

      {/* Team Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Goals For / Against: {team.gf} / {team.ga}
        </CardContent>
      </Card>

      {/* Roster */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Roster</CardTitle>
        </CardHeader>

        <CardContent>
          {!team.roster?.length ? (
            <div className="text-sm text-muted-foreground">
              Roster not available.
            </div>
          ) : (
            <div className="space-y-2">

              {team.roster.map((p) => (
                <div key={p.id} className="rounded-md border bg-white p-3">
                  <div className="text-sm font-medium">
                    {p.number ? `#${p.number} ` : ""}
                    {p.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {p.position ?? "—"}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="text-xs text-muted-foreground">
                (MVP) Later: player stats, game logs, and advanced metrics.
              </div>

            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}