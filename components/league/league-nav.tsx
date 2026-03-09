"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function LeagueNav({
  domain,
  leagueName,
}: {
  domain: string;
  leagueName: string;
}) {
  const base = `/domains/${encodeURIComponent(domain)}`;

  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const navLinks = [
    { label: "Home", href: `${base}` },
    { label: "Teams", href: `${base}/teams` },
    { label: "Games", href: `${base}/games` },
    { label: "Standings", href: `${base}/standings` },
    { label: "News", href: `${base}/news` },
    { label: "Contact", href: `${base}/contact` },
  ];

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        {/* LOGO */}
        <Link href={base} className="flex items-center">
          <Image
            src="/images/raptorlogo.png"
            alt="Raptor Logo"
            width={200}
            height={90}
            className="object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              className="text-md font-semibold font-zona text-blue-950 hover:text-foreground transition-colors"
              href={l.href}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-white shadow-sm transition active:scale-[0.98]"
        >
          {/* Animated hamburger → X */}
          <span className="relative block h-4 w-5">
            <span
              className={[
                "absolute left-0 top-0 h-0.5 w-5 bg-slate-900 rounded-full transition-transform duration-300 ease-out",
                open ? "translate-y-[7px] rotate-45" : "translate-y-0 rotate-0",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[7px] h-0.5 w-5 bg-slate-900 rounded-full transition-all duration-300 ease-out",
                open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[14px] h-0.5 w-5 bg-slate-900 rounded-full transition-transform duration-300 ease-out",
                open ? "translate-y-[-7px] -rotate-45" : "translate-y-0 rotate-0",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {/* MOBILE DRAWER + OVERLAY */}
      <div
        className={[
          "md:hidden",
          "fixed inset-0 z-50",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        {/* Drawer */}
        <div
          className={[
            "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-semibold tracking-wide text-slate-700"></span>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white shadow-sm transition active:scale-[0.98]"
            >
              ✕
            </button>
          </div>

          <nav className="px-5 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold font-zona text-blue-950 hover:bg-slate-50 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Optional footer */}
          <div className="mt-auto border-t px-5 py-4 text-xs text-muted-foreground">
            {leagueName}
          </div>
        </div>
      </div>

      {/* MOBILE LINKS ROW (optional) 
          If you want, remove this whole block now that you have a drawer */}
      {/* 
      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          <Link className="text-xs font-semibold font-zona hover:text-foreground" href={`${base}/teams`}>Teams</Link>
          <Link className="text-xs font-semibold font-zona hover:text-foreground" href={`${base}/games`}>Games</Link>
          <Link className="text-xs font-semibold font-zona hover:text-foreground" href={`${base}/standings`}>Standings</Link>
          <Link className="text-xs font-semibold font-zona hover:text-foreground" href={`${base}/news`}>News</Link>
        </div>
      </div>
      */}
    </header>
  );
}