import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeagueByDomain, getNews } from "@/lib/league-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const league = await getLeagueByDomain(domain);
  if (!league) return <div>League not found.</div>;

  const posts = await getNews(league.id);
  const base = `/domains/${encodeURIComponent(domain)}`;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">League News</h1>
        <p className="text-sm text-muted-foreground">Updates and announcements.</p>
      </div>

      <div className="grid gap-4">
        {posts.map((p) => (
          <Card key={p.id} className="hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">
                <Link href={`${base}/news/${p.slug}`} className="underline-offset-4 hover:underline">
                  {p.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="text-xs">{formatDate(p.publishedISO)}</div>
              <div className="mt-1">{p.excerpt}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
