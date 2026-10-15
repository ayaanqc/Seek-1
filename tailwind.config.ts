import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBFBF9",
        card: "#F3F3EE",
        wash: "#ECECE6",
        ink: "#1F1E1D",
        graphite: "#6B6964",
        muted: "#9A9892",
        terracotta: {
          DEFAULT: "#C96442",
          deep: "#BC544B",
        },
        amberwarm: "#D97706",
        line: "#E5E5DE",
      },
      fontFamily: {
        // Display / titles / quotes — self-hosted via next/font, Georgia fallback.
        serif: ['"var(--font-display)"', "Georgia", '"Playfair Display"', '"Times New Roman"', "serif"],
        // Long-form reading — Georgia is the most legible widely-available serif.
        reading: ["Georgia", '"Source Serif 4"', '"Iowan Old Style"', "serif"],
        sans: ['"var(--font-sans)"', '"Plus Jakarta Sans"', "Manrope", "Inter", "system-ui", "sans-serif"],
        mono: ['"var(--font-mono)"', '"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        book: "0 1px 2px rgba(31,30,29,0.06), 0 8px 24px -12px rgba(31,30,29,0.18)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
