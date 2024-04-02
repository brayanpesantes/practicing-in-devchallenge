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
        "absolute z-50 bg-white w-2/3 right-0 top-0 min-h-screen lg:hidden transition duration-300 ease-in-out dark:bg-[#111729]",
        { "translate-x-full opacity-0 ": !isOpen },
        { "translate-x-0 opacity-100": isOpen },
      ])}
    >
      <div className="flex  justify-end p-9 ">
        <button
          className="text-[#111729] dark:text-white  font-bold pl-10 cursor-pointer"
          onClick={close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
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
      <nav className="flex flex-col mt-10  items-center gap-10 ">
        {links.map((link, index) => (
          <LinkNavigation
            key={`item-${link.label}`}
            href={link.href}
            label={link.label}
            isActive={index === 0}
            className="text-4xl"
          />
        ))}
        <SwitchDarkMode mode={mode} toggle={toggle} />
      </nav>
    </div>
  );
}
