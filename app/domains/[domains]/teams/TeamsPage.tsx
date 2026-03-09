"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export type Team = {
  id: string;
  leagueId: string;
  division: string;
  name: string;
  logo: string;

  record: { w: number; l: number; ot?: number };
  points: number;
  gf: number;
  ga: number;

  roster?: {
    id: string;
    name: string;
    number?: string;
    position?: string;
  }[];
};

export function TeamsPage({
  teams,
  seasonLabel,
  domain,
}: {
  teams: Team[];
  seasonLabel: string;
  domain: string;
}) {
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const base = `/domains/${encodeURIComponent(domain)}`;

  /* ===============================
     DIVISIONS
  =============================== */

  const divisions = useMemo(() => {
    const unique = Array.from(new Set(teams.map((t) => t.division)));
    return ["All", ...unique];
  }, [teams]);

  /* ===============================
     FILTER BY DIVISION
  =============================== */

  const divisionFilteredTeams = useMemo(() => {
    if (selectedDivision === "All") return teams;

    return teams.filter(
      (t) =>
        t.division.toLowerCase() === selectedDivision.toLowerCase()
    );
  }, [teams, selectedDivision]);

  /* ===============================
     SEARCH FILTER
  =============================== */

  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return divisionFilteredTeams;

    const query = searchQuery.toLowerCase();

    return divisionFilteredTeams.filter((t) =>
      t.name.toLowerCase().includes(query)
    );
  }, [divisionFilteredTeams, searchQuery]);

  return (
    <div className="space-y-4">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Teams</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white
          pl-10 pr-10 py-2.5 text-sm shadow-sm
          focus:outline-none focus:ring-2 focus:ring-rptOrange"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <X size={16} />
          </button>
        )}

      </div>

      {/* Division Filters */}
      <div className="flex gap-3 flex-wrap">

        {divisions.map((division) => (
          <button
            key={division}
            onClick={() => setSelectedDivision(division)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold uppercase transition
              ${
                selectedDivision === division
                  ? "bg-blue-950 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {division}
          </button>
        ))}

      </div>

      {/* Teams Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {filteredTeams.map((t) => (
          <Link key={t.id} href={`${base}/teams/${t.id}`} className="block">

            <Card className="hover:bg-muted/50 hover:shadow-md transition cursor-pointer h-full">

              <CardHeader>

                <CardTitle className="flex items-center gap-3 text-lg">

                  <Image
                    src={t.logo}
                    alt={t.name}
                    width={60}
                    height={60}
                  />

                  <div className="flex flex-col">

                    <span>{t.name}</span>

                    <span className="text-sm font-medium text-muted-foreground uppercase">
                      {t.division} Division
                    </span>

                  </div>

                </CardTitle>

              </CardHeader>

            </Card>

          </Link>
        ))}

      </div>

      {filteredTeams.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No teams found.
        </p>
      )}

    </div>
  );
}