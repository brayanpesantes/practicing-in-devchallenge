import cn from "@/utils/cn";
import { links } from "./Header";
import LinkNavigation from "./LinkNavigation";
import SwitchDarkMode from "./SwitchDarkMode";
type Props = {
  readonly mode: boolean;
  readonly toggle: () => void;
  readonly isOpen: boolean;
  readonly close: () => void;
};
export default function MobileHeader({ mode, toggle, close, isOpen }: Props) {
  return (
    <div
      className={cn([
        "absolute z-50 bg-white w-full sm:w-2/3 md:w-1/2 right-0 top-0 min-h-screen lg:hidden transition duration-300 ease-in-out dark:bg-[#111729] shadow-xl", // Adjusted width for responsiveness, added shadow
        { "translate-x-full opacity-0 ": !isOpen },
        { "translate-x-0 opacity-100": isOpen },
      ])}
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700"> {/* Added padding, border, and items-center */}
        {/* Optional: Add Logo here if desired */}
        {/* <Logo mode={mode} /> */}
        <span className="text-lg font-semibold dark:text-white">Menu</span> {/* Added a title */}
        <button
          className="text-[#111729] dark:text-white cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" // Added padding and hover effect for better UX
          onClick={close}
          aria-label="Close menu" // Added aria-label for accessibility
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5} // Adjusted stroke width
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col py-8 px-6 items-start gap-6"> {/* Adjusted padding, alignment, and gap */}
        {links.map((link, index) => (
          <LinkNavigation
            key={`item-${link.label}`}
            href={link.href}
            label={link.label}
            isActive={index === 0} // This should ideally be dynamic based on route
            className="text-xl hover:text-blue-600 dark:hover:text-blue-400 w-full" // Adjusted text size, added hover effect and full width
            onClick={close} // Close menu on link click
          />
        ))}
        <div className="mt-auto pt-6 w-full"> {/* Pushes switch to bottom */}
          <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm dark:text-gray-300">Dark Mode</span>
            <SwitchDarkMode mode={mode} toggle={toggle} />
          </div>
        </div>
      </nav>
    </div>
  );
}
