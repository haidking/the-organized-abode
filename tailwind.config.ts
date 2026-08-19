import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        surface: "#FFFFFF",
        border: "#EAE0D6",
        ink: {
          DEFAULT: "#1E1E1E",
          secondary: "#6B5F57",
        },
        accent: {
          DEFAULT: "#2D6A4F",
          hover: "#235640",
          light: "#DCEDE3",
        },
        olive: {
          DEFAULT: "#4A6741",
          hover: "#3A5234",
          light: "#E6ECE2",
        },
        forest: {
          DEFAULT: "#2D6A4F",
        },
        // Fixed: previously referenced in CategoryFilter/ServingsScaler/
        // RecipeCard/AffiliateCard but were undefined → rendered unstyled
        highlight: "#2D6A4F",
        "highlight-soft": "#DCEDE3",
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