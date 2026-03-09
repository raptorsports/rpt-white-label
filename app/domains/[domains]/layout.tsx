import type { Metadata } from "next";
import { LeagueNav } from "@/components/league/league-nav";
import { getLeagueByDomain } from "@/lib/league-data";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const league = await getLeagueByDomain(domain);

  return {
    title: league ? `${league.name} — ${league.seasonLabel}` : "League",
    description: league
      ? `Schedule, standings, teams, and league updates.`
      : undefined,
  };
}

export default async function LeagueLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const league = await getLeagueByDomain(domain);

  const leagueName = league?.name ?? "League";

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">

      <LeagueNav domain={domain} leagueName={leagueName} />

      {/* MAIN CONTENT */}
      <main className="flex-1 mx-auto max-w-6xl px-4 py-6 w-full">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center gap-2 text-sm text-muted-foreground">

          <span>Powered by</span>

          <Image
            src="/images/raptorlogo.png"
            alt="Raptor Sports"
            width={100}
            height={26}
            className="h-5 w-auto"
          />

        </div>
      </footer>

    </div>
  );
}