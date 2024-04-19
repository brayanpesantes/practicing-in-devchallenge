import { ReactNode } from "react";
import Navbar from "./components/Navbar";

export default function UnsplashCollectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="font-beVietnamPro  max-w-screen-xl mx-auto h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
