import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        surface: "#FFFFFF",
        border: "#E8E3DC",
        ink: {
          DEFAULT: "#1C1C1A",
          secondary: "#6B6560",
        },
        accent: {
          DEFAULT: "#2D6A4F",
          light: "#D8F3DC",
        },
        highlight: {
          DEFAULT: "#B5451B",
          soft: "#FDF0EC",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
