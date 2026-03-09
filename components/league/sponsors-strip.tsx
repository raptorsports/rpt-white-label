import { Card, CardContent } from "@/components/ui/card";
import type { Sponsor } from "@/lib/league-data";

export function SponsorsStrip({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors.length) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-2 text-sm font-medium">Sponsors</div>
        <div className="flex flex-wrap gap-2">
          {sponsors.map((s) => {
            const content = (
              <div className="rounded-md border px-3 py-2 text-sm hover:bg-muted">
                {s.name}
              </div>
            );

            return s.url ? (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <div key={s.id}>{content}</div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
