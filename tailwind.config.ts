import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7EDE2",
        surface: "#FFFFFF",
        border: "#EAE0D6",
        ink: {
          DEFAULT: "#1C1A18",
          secondary: "#6B5F57",
        },
        accent: {
          DEFAULT: "#E8632A",
          hover: "#C94F1A",
          light: "#EFDDD0",
        },
        forest: {
          DEFAULT: "#2D6A4F",
        },
        footer: {
          bg: "#2A2A2A",
          text: "#E8E0D8",
          border: "#3A3A3A",
          muted: "#9A9080",
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