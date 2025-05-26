import cn from "@/utils/cn";
import Image from "next/image";
import MoonIconDark from "../../images/Moon_fill.svg";
import MoonIcon from "../../images/Moon_fill_light.svg";
import SunIconDark from "../../images/Sun_fill.svg";
import SunIcon from "../../images/Sun_fill_light.svg";

type Props = {
  readonly mode: boolean;
  readonly toggle: () => void;
};
export default function SwitchDarkMode({ mode, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className={cn([
        "relative flex items-center justify-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 ease-in-out", // Adjusted height and colors
      ])}
      aria-label={`Switch to ${mode ? "light mode" : "dark mode"}`} // Translated aria-label
    >
      <div
        className={cn([
          "flex relative items-center justify-between w-full rounded-full px-1", // Inner container for icons
        ])}
      >
        {/* Moon icon, more visible in light mode's "off" state by default */}
        <Image
          src={MoonIcon} // Using non-dark version for light mode's visual cue
          alt="Moon icon"
          className={cn("size-4 transition-opacity duration-300 ease-in-out", mode ? "opacity-50" : "opacity-100 z-20")}
        />
        {/* Sun icon, more visible in dark mode's "on" state by default */}
        <Image
          src={SunIcon} // Using non-dark version for dark mode's visual cue
          alt="Sun icon"
          className={cn("size-4 transition-opacity duration-300 ease-in-out", mode ? "opacity-100 z-20" : "opacity-50")}
        />
        <span
          className={cn([
            "absolute top-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-300 size-5 rounded-full shadow-md", // Adjusted thumb color for dark mode and added shadow
            // The original translate values are specific. w-12 (3rem), thumb size-5 (1.25rem), px-1 (0.25rem padding each side)
            // Effective track width for center of thumb: 3rem - 0.25rem - 0.25rem - 1.25rem = 1.25rem.
            // So thumb should move from 0 to 1.25rem (which is `translate-x-5` in Tailwind)
            mode ? "translate-x-[1.625rem]" : "translate-x-[0.125rem]", // Adjusted to be 0.125rem from left edge, and 0.125rem from right edge (3rem - 1.25rem - 0.125rem = 1.625rem)
          ])}
        ></span>
      </div>
    </button>
  );
}
