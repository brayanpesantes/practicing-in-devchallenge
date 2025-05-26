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
        "transition duration-150 ease-in-out dark:bg-[#111729] min-h-screen flex flex-col", // Added flex flex-col
        {
          dark: isDarkMode,
        },
      ])}
    >
      <Header mode={isDarkMode} toggle={toggleDarkMode} />
      {/* Main Content Area */}
      <main className="flex-grow flex items-center"> {/* Added flex-grow and items-center */}
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-20 md:py-24"> {/* Adjusted padding & py */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center"> {/* Increased gap */}
            <div className="order-2 lg:order-1 text-center lg:text-left"> {/* Centered text on mobile, left on lg */}
              <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm md:text-base lg:text-lg uppercase tracking-wider"> {/* Adjusted sub-headline styling */}
                😎 Simple way to communicate
              </p>
              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl dark:text-white mt-3 mb-6"> {/* Adjusted text sizes and margins */}
                Actions for Accessibility in Design
              </h1>
              <p className="text-lg md:text-xl mt-6 mb-8 dark:text-gray-300 text-gray-700"> {/* Adjusted paragraph color and margins */}
                The fastest way to build and deploy websites with resusable
                components.
              </p>
              <div className="my-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4"> {/* Adjusted button layout and spacing */}
                <button className="py-3 px-6 md:py-4 md:px-8 text-base font-medium uppercase bg-[#2A4DD0] hover:bg-blue-700 dark:hover:bg-blue-500 text-white rounded-lg shadow-md transition duration-150 ease-in-out"> {/* Adjusted button padding & added hover */}
                  Get Started
                </button>
                <button className="py-3 px-6 md:py-4 md:px-8 text-base font-medium underline text-[#2A4DD0] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg transition duration-150 ease-in-out"> {/* Adjusted button padding & added hover */}
                  Get Live Demo
                </button>
              </div>
              <ul className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-x-8 gap-y-4 items-center text-sm text-gray-600 dark:text-gray-400"> {/* Adjusted list layout and styling */}
                <ItemList text="No credit card required" />
                <ItemList text="Free 14-day trial" /> {/* Changed second item text for variety */}
              </ul>
            </div>
            <div className="order-1 lg:order-2 flex justify-center"> {/* Centered image */}
              <Image src={ImageHero} alt="image hero" className="rounded-lg shadow-xl" /> {/* Added rounded corners and shadow to image */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
