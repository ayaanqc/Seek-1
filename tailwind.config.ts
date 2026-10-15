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
        cream: "#F4EFE5",
        ink: "#1F1E1D",
        graphite: "#6B6964",
        // #6E6C66 is the lightest grey that still clears 4.5:1 on paper —
        // secondary metadata text lives here, so it has to pass.
        muted: "#6E6C66",
        terracotta: {
          DEFAULT: "#C96442",
          deep: "#BC544B",
          // Small text (eyebrows, prices, labels) in DEFAULT fails contrast
          // on cream/paper, so it uses this darker cut instead. DEFAULT stays
          // for large display type, icons, fills and borders.
          ink: "#9C4227",
        },
        // Deep aubergine — the bookshop's evening colour, used for the hero and salon bands.
        plum: {
          DEFAULT: "#5B3141",
          deep: "#42242F",
          soft: "#7C4A5B",
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
        cover: "0 22px 48px -22px rgba(15,10,12,0.55), 0 2px 6px rgba(15,10,12,0.25)",
      },
      keyframes: {
        // Bag counter giving a small kick when the total changes.
        pop: {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.35)" },
          "100%": { transform: "scale(1)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(10px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "panel-in": {
          from: { opacity: "0", transform: "translateY(14px) scale(0.99)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        pop: "pop 320ms ease-out",
        "toast-in": "toast-in 220ms ease-out",
        "panel-in": "panel-in 220ms ease-out",
        "slide-in-right": "slide-in-right 240ms ease-out",
        "fade-in": "fade-in 180ms ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
