import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeagueByDomain, getNewsPost } from "@/lib/league-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}) {
  const { domain, slug } = await params;
  const league = await getLeagueByDomain(domain);
  if (!league) return <div>League not found.</div>;

  const post = await getNewsPost(league.id, slug);
  if (!post) return <div>Post not found.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="text-xs text-muted-foreground">{formatDate(post.publishedISO)}</div>
      </CardHeader>
      <CardContent className="prose max-w-none">
        {post.content.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </CardContent>
    </Card>
  );
}
