import localFont from "next/font/local";

export const zonaPro = localFont({
  src: [
    {
      path: "../public/fonts/ZonaPro/ZonaPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zona",
  display: "swap",
});