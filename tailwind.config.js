/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zona: ["var(--font-zona)"],
      },
      colors: {
        surface: "#FFFFFF",
        background: "#F8F8F8",
        bold: "#EAEAEA",
        primary: "#EC5027",
        secondary: "#0D2051",
        third: "#F80E19",
        fourth: "#20CB64",
        content: "#AAAAAA",
        detail: "#E4E4E4",
        textEmpashis: "#48494D",
        disabled: "#AEAEAE",

        rptOrange: "#EC4D27",
        rptPrimaryBlue: "#147EFB",
        rptSecondaryBlue: "#0D2051",

      },
    },
  },
  plugins: [],
};