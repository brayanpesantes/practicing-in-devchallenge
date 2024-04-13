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
        inter: "var(--font-inter)",
        outfit: "var(--font-outfit)",
        dmSans: "var(--font-dmSans)",
      },
      boxShadow: {
        "minimal-card": "0px 30px 100px 0px rgba(17, 23, 41, 0.05)",
      },
      backgroundImage: {
        contact: "url('/images/bg-image.svg')",
        "music-player": "url('/images/bg-music-player.webp')",
        quote: "url('/images/bg-image-random-quote.svg')",
        qr: "url('/images/bg-illustration.svg')",
        cafe: "url('/images/bg-cafe.webp')",
        github: "url('/images/hero-image-github-profile.webp')",
        country: "url('/images/hero-image-wr.webp')",
        quiz: "url('/images/bg.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
