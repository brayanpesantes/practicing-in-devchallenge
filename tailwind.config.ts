import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sora: "var(--font-sora)",
        lato: "var(--font-lato)",
        poppins: "var(--font-poppins)",
        beVietnamPro: "var(--font-beVietnamPro)",
      },
      boxShadow: {
        "minimal-card": "0px 30px 100px 0px rgba(17, 23, 41, 0.05)",
      },
      backgroundImage: {
        contact: "url('/images/bg-image.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
