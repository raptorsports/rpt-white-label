// components/game-card.tsx

import { MapPin, Trophy } from "lucide-react";

type Score = {
  home: number;
  away: number;
};

type GameCardProps = {
   id: string
  division: string
  leagueId: string
  dateISO: string
  location?: string

  homeTeamName: string
  awayTeamName: string

  homeTeamLogo: string
  awayTeamLogo: string

  score?: {
    home: number
    away: number
  }
};

/* ===================================================== */
/* ================== DATE HELPERS ===================== */
/* ===================================================== */

function formatTime(iso: string) {
  const d = new Date(iso);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(d);
}

function formatMonth(iso: string) {
  const d = new Date(iso);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
    .format(d)
    .toUpperCase();
}

function formatDayLine(iso: string) {
  const d = new Date(iso);

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(d);

  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(d);

  return `${weekday}, ${day}`;
}

function isTodayAndActive(iso: string) {
  const now = new Date();
  const gameDate = new Date(iso);

  const isSameDay =
    now.getFullYear() === gameDate.getFullYear() &&
    now.getMonth() === gameDate.getMonth() &&
    now.getDate() === gameDate.getDate();

  const ONE_HOUR = 60 * 60 * 1000;

  const gameStart = gameDate.getTime();
  const gameEndWindow = gameStart + ONE_HOUR;

  return isSameDay && now.getTime() <= gameEndWindow;
}

/* ===================================================== */
/* ==================== COMPONENT ====================== */
/* ===================================================== */

export function GameCard({
  division,
  home,
  away,
  dateISO,
  location,
  lockerRoom,
  score,
  homeTeamLogo,
  awayTeamLogo
}: GameCardProps) {
  const month = formatMonth(dateISO);
  const dayLine = formatDayLine(dateISO);
  const time = formatTime(dateISO);
  const gameIsTodayActive = isTodayAndActive(dateISO);

  const homeLogo =
    "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870";

  const awayLogo = homeLogo;

  return (
    <div className="relative overflow-hidden border bg-white shadow-sm h-full flex flex-col rounded-xl">

      {/* ==== TOP SECTION ==== */}
      <div className="relative px-6 pt-6 pb-5 isolate">

        {/* Polygon Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute right-0 top-0 h-full w-[53%] bg-gray-100"
            style={{
              clipPath: "polygon(10% 0%,100% 0%,100% 100%,0% 100%)",
            }}
          />
        </div>

        {/* Time Badge */}
        <div className="absolute max-w-sm right-2 top-2">
          <div className={`relative text-center px-2 py-1 text-xs font-semibold rounded-md text-white ${gameIsTodayActive ? "bg-orange-500" : "bg-gray-600"
            }`}>
            {time}
          </div>
        </div>

        {/* Teams Row */}
        <div className="relative z-10 flex items-start justify-between">

          {/* HOME TEAM */}
          <div className="flex flex-col items-end flex-1">
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-right capitalize">
                {home}
              </div>
              <img
                src={homeTeamLogo}
                alt={home}
                className="h-12 w-12 object-contain rounded-full"
              />
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Home
            </div>
          </div>

          {/* Center Content */}
          <div
            className={`px-4 mt-1 font-semibold text-slate-600 mt-2 block ${score ? "text-md" : "text-xl"
              }`}
          >
            {score ? (
              <span className="font-bold text-slate-900">
                {score.home} - {score.away}
              </span>
            ) : (
              "vs"
            )}
          </div>

          {/* AWAY TEAM */}
          <div className="flex flex-col items-start flex-1">
            <div className="flex items-center gap-3">
              <img
                src={awayTeamLogo}
                alt={away}
                className="h-12 w-12 object-contain rounded-full"
              />
              <div className="text-sm font-semibold text-left capitalize">
                {away}
              </div>
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Away
            </div>
          </div>
        </div>
      </div>

      {/* ==== BOTTOM SECTION ==== */}
      <div className="mt-auto border-t px-6 py-2 flex items-center justify-between">

        {/* Left Info */}
        <div className="space-y-1 text-sm">

          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="font-semibold capitalize">{location}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-orange-500" />
            <span className="font-semibold capitalize">{division}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-300 mx-4" />

        {/* Date Block */}
        <div className="flex flex-col items-center text-center leading-tight">
          <div className="text-lg font-bold tracking-widest text-slate-500 leading-none">
            {month}
          </div>
          <div className="text-sm font-semibold text-slate-900 leading-none mt-1">
            {dayLine}
          </div>
        </div>
      </div>
    </div>
  );
}