"use client";
import cn from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import ImageHero from "../images/hero-image-simple-homepage.webp";
import { ItemList } from "../testimonial/_components/ItemList";
import Header from "./_components/Header";
export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div
      className={cn([
        "font-poppins overflow-x-hidden",
        "transition  duration-150 ease-in-out dark:bg-[#111729] min-h-screen",
        {
          dark: isDarkMode,
        },
      ])}
    >
      <Header mode={isDarkMode} toggle={toggleDarkMode} />
      <div className="py-16">
        <div className="px-9 lg:px-[72px] grid grid-cols-1 lg:grid-cols-2 gap-9 items-center justify-center">
          <div className="order-2 lg:order-1">
            <p className="dark:text-white text-base md:text-lg uppercase">
              😎 Simple way to communicate
            </p>
            <h1 className="font-bold text-4xl md:text-6xl dark:text-white mt-3">
              Actions for Accessibility in Design
            </h1>
            <p className="text-lg mt-8 dark:text-[#909193]">
              The fastest way to build and deploy websites with resusable
              components.
            </p>
            <div className="my-[22px] space-x-2 md:space-x-8">
              <button className="py-2 px-4 md:py-4 md:px-8 text-base uppercase bg-[#2A4DD0] text-white rounded-xl">
                get started
              </button>
              <button className="py-2 px-4 md:py-4 md:px-8 text-base underline text-[#2A4DD0]">
                Get Live demo
              </button>
            </div>
            <ul className="mt-[18px] flex gap-10  items-center">
              <ItemList text="No credit card required" />
              <ItemList text="No credit card required" />
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <Image src={ImageHero} alt="image hero" />
          </div>
        </div>
      </div>
    </div>
  );
}
