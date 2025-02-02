import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: {
          a0: "#d1ee26",
          a10: "#d8f04b",
          a20: "#def266",
          a30: "#e4f47e",
          a40: "#eaf695",
          a50: "#eff7aa",
        },

        surface: {
          a0: "#121212",
          a10: "#282828",
          a20: "#3f3f3f",
          a30: "#575757",
          a40: "#717171",
          a50: "#8b8b8b",
        },

        tonal: {
          a0: "#232418",
          a10: "#38382d",
          a20: "#4e4e44",
          a30: "#64655c",
          a40: "#7c7d75",
          a50: "#95958f",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;