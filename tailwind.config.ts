import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0c0c69",
          dark: "#080852",
          light: "#10108a",
        },
        secondary: {
          DEFAULT: "#fcba03",
          dark: "#ca9502",
          light: "#fdc835",
        },
        text: {
          DEFAULT: "#ffffff",
          muted: "#e0e0e0",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #0c0c69 0%, #10108a 100%)",
        "gradient-secondary": "linear-gradient(135deg, #fcba03 0%, #fdc835 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
