import { MapPin, Trophy } from "lucide-react";
import { Game } from "@/lib/league-data";

/* DATE HELPERS */

function formatTime(iso: string) {
  const d = new Date(iso);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

function formatMonth(iso: string) {
  const d = new Date(iso);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
  })
    .format(d)
    .toUpperCase();
}

function formatDayLine(iso: string) {
  const d = new Date(iso);

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(d);

  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
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

/* COMPONENT */

export function GameCard({ game }: { game: Game }) {

  const month = formatMonth(game.matchStart);
  const dayLine = formatDayLine(game.matchStart);
  const time = formatTime(game.matchStart);

  const gameIsTodayActive = isTodayAndActive(game.matchStart);

  const home = game.homeTeam?.name ?? "";
  const away = game.awayTeam?.name ?? "";

  const homeLogo = game.homeTeam?.logo;
  const awayLogo = game.awayTeam?.logo;

  return (
    <div className="relative overflow-hidden border bg-white shadow-sm h-full flex flex-col rounded-xl">

      <div className="relative px-6 pt-6 pb-5 isolate">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute right-0 top-0 h-full w-[53%] bg-gray-100"
            style={{
              clipPath: "polygon(10% 0%,100% 0%,100% 100%,0% 100%)",
            }}
          />
        </div>

        {/* TIME BADGE */}
        <div className="absolute max-w-sm right-2 top-2">
          <div
            className={`px-2 py-1 text-xs font-semibold rounded-md text-white ${
              gameIsTodayActive ? "bg-orange-500" : "bg-gray-600"
            }`}
          >
            {time}
          </div>
        </div>

        <div className="relative z-10 flex items-start justify-between">

          {/* HOME */}
          <div className="flex flex-col items-end flex-1">
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-right capitalize">
                {home}
              </div>
              <img
                src={homeLogo}
                alt={home}
                className="h-12 w-12 object-contain rounded-full"
              />
            </div>
            <div className="text-xs font-bold uppercase text-slate-500">
              Home
            </div>
          </div>

          {/* SCORE */}
          <div className="px-4 mt-2 font-semibold text-slate-600">
            {game.score ? (
              <span className="font-bold text-slate-900">
                {game.score.home} - {game.score.away}
              </span>
            ) : (
              "vs"
            )}
          </div>

          {/* AWAY */}
          <div className="flex flex-col items-start flex-1">
            <div className="flex items-center gap-3">
              <img
                src={awayLogo}
                alt={away}
                className="h-12 w-12 object-contain rounded-full"
              />
              <div className="text-sm font-semibold capitalize">
                {away}
              </div>
            </div>
            <div className="text-xs font-bold uppercase text-slate-500">
              Away
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-auto border-t px-6 py-2 flex items-center justify-between">

        <div className="space-y-1 text-sm">

          {game.arenaName && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="font-semibold capitalize">
                {game.arenaName}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-orange-500" />
            <span className="font-semibold capitalize">
              {game.division}
            </span>
          </div>

        </div>

        <div className="h-12 w-px bg-gray-300 mx-4" />

        <div className="flex flex-col items-center text-center">
          <div className="text-lg font-bold tracking-widest text-slate-500">
            {month}
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {dayLine}
          </div>
        </div>

      </div>
    </div>
  );
}