import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#FAF8F5",
          100: "#F4EFEA",
          200: "#E9DFD5",
          300: "#DAC9B8",
          400: "#C4AC94",
          500: "#A88B70",
          600: "#8C6F55",
          700: "#6F543F",
          800: "#543E2E",
          900: "#3B2B1F",
          950: "#241912",
        },
        brand: {
          amber: "#F59E0B",
          coral: "#F97316",
          rose: "#FB7185",
          emerald: "#10B981",
          teal: "#0D9488",
          indigo: "#6366F1",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        warm: "0 10px 30px -5px rgba(168, 139, 112, 0.15)",
        "warm-lg": "0 20px 40px -10px rgba(168, 139, 112, 0.22)",
        glow: "0 0 35px -5px rgba(245, 158, 11, 0.35)",
        "glow-emerald": "0 0 35px -5px rgba(16, 185, 129, 0.3)",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
