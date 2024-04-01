import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: "var(--font-sora)",
      },
      boxShadow: {
        "minimal-card": "0px 30px 100px 0px rgba(17, 23, 41, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
