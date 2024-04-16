/* eslint-disable @next/next/no-img-element */
"use client";
import { IconMoon } from "./IconMoon";
import { IconSun } from "./IconSun";
import Logo from "./Logo";

type NavbarProps = {
  toggleTheme: () => void;
  theme: boolean;
};
export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <header className="py-4 border-b w-full">
      <div className="px-5 md:px-[72px] flex justify-between items-center">
        <div className="">
          <Logo colorText={theme ? "#FFF" : "#121826"} />
        </div>
        <button
          onClick={toggleTheme}
          className="size-10 flex items-center justify-center bg-[#FFFFFF] p-3 dark:bg-[#4D5562] text-[#212936] dark:text-white rounded ring-1 ring-[#212936]"
        >
          {theme ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </header>
  );
}
