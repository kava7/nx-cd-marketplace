import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        page: "#0B0E11",
        card: "#1E2329",
        border: "#2B3139",
        up: "#0ECB81",
        down: "#F6465D",
        alert: "#FFB800",
      },
      backgroundImage: {
        "gradient-up": "linear-gradient(to right, #0ECB81, #089e64)",
      },
      boxShadow: {
        "glow-up": "0 0 20px rgba(14, 203, 129, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
