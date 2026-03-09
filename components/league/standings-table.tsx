import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Team } from "@/lib/league-data";

export function StandingsTable({ teams }: { teams: Team[] }) {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Rank</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">GP</TableHead>
            <TableHead className="text-right">W</TableHead>
            <TableHead className="text-right">L</TableHead>
            <TableHead className="text-right">OT</TableHead>
            <TableHead className="text-right">PTS</TableHead>
            <TableHead className="text-right">GF</TableHead>
            <TableHead className="text-right">GA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((t, idx) => {
            const gp = t.record.w + t.record.l + (t.record.ot ?? 0);
            return (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell className="text-right">{gp}</TableCell>
                <TableCell className="text-right">{t.record.w}</TableCell>
                <TableCell className="text-right">{t.record.l}</TableCell>
                <TableCell className="text-right">{t.record.ot ?? 0}</TableCell>
                <TableCell className="text-right">{t.points}</TableCell>
                <TableCell className="text-right">{t.gf}</TableCell>
                <TableCell className="text-right">{t.ga}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
