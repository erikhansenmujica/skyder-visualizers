import localFont from "next/font/local";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/logo.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "card-pattern": "url('/cardbg.jpeg')",
      },
      animation: {
        pulse1: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        "3xl": "0 15px 100px -15px rgba(45,212,191, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
