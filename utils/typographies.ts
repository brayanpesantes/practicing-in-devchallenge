import { Sora, Lato, Poppins } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sora",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

export { sora, lato, poppins };
