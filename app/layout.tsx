import type { Metadata } from "next";
import "./globals.css";
import { sora } from "@/utils/typographies";

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
    <html lang="en" className={`${sora.variable}`}>
      <body className="">{children}</body>
    </html>
  );
}
