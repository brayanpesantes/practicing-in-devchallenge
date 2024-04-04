import type { Metadata } from "next";
import "./globals.css";
import {
  sora,
  lato,
  poppins,
  beVietnamPro,
  inter,
  outfit,
} from "@/utils/typographies";

export const metadata: Metadata = {
  title: "Practicing in dev challenge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${lato.variable} ${poppins.variable} ${beVietnamPro.variable} ${inter.variable} ${outfit.variable}`}
    >
      <body className="">{children}</body>
    </html>
  );
}
