"use client";
import { useState } from "react";
import LinkNavigation from "./LinkNavigation";
import Logo from "./Logo";
import MobileHeader from "./MobileHeader";
import SwitchDarkMode from "./SwitchDarkMode";

export const links = [
  {
    label: "About Us",
    href: "#",
  },
  {
    label: "Product",
    href: "#",
  },
  {
    label: "Resource",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
];
type Props = {
  readonly mode: boolean;
  readonly toggle: () => void;
};
export default function Header({ mode, toggle }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = (): void => {
    setIsOpen(true);
  };
  const close = (): void => {
    setIsOpen(false);
  };
  return (
    <header className="py-7 h-20  px-9 lg:px-[72px] relative">
      <div className="flex flex-row gap-10 justify-between items-center h-full">
        <div className="">
          <Logo mode={mode} />
        </div>
        <nav className="lg:inline-flex space-x-10 hidden dark:text-[#F2F9FE]">
          {links.map((link, index) => (
            <LinkNavigation
              key={`item-${link.label}`}
              href={link.href}
              label={link.label}
              isActive={index === 0}
            />
          ))}
        </nav>
        <div className="hidden lg:block">
          <SwitchDarkMode mode={mode} toggle={toggle} />
        </div>
        <button
          className="h-5 w-6 flex flex-col justify-between p-px lg:hidden"
          onClick={open}
        >
          <span className="h-0.5 w-full bg-[#111729] dark:bg-white"></span>
          <span className="h-0.5 w-full bg-[#111729] dark:bg-white"></span>
          <span className="h-0.5 w-full bg-[#111729] dark:bg-white"></span>
        </button>
      </div>
      <MobileHeader mode={mode} toggle={toggle} close={close} isOpen={isOpen} />
    </header>
  );
}
