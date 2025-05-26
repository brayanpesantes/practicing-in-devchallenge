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
    <header className="py-7 h-20 relative border-b border-gray-200 dark:border-gray-700"> {/* Added bottom border */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 flex flex-row gap-10 justify-between items-center h-full"> {/* Applied container and consistent padding */}
        <div className="">
          <Logo mode={mode} />
        </div>
        <nav className="lg:inline-flex space-x-8 xl:space-x-10 hidden dark:text-gray-200"> {/* Adjusted spacing & dark text color */}
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
