"use client";
import cn from "@/utils/cn";
import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import Navbar from "./components/Navbar";

export default function ImageLoaderPage() {
  const [theme, setTheme] = useState<boolean>(false);
  const toggleTheme = () => {
    setTheme(!theme);
  };
  return (
    <div
      className={cn(
        "max-w-screen-xl min-h-screen mx-auto dark:bg-[#121826] bg-[#F9FAFBCC] font-inter",
        {
          dark: theme,
        }
      )}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <ImageUploader />
    </div>
  );
}
