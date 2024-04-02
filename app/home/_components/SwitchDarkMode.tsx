import Image from "next/image";
import React from "react";
import cn from "@/utils/cn";
import SunIcon from "../../images/Sun_fill.svg";
import MoonIconDark from "../../images/Moon_fill.svg";
import MoonIcon from "../../images/Moon_fill_light.svg";

type Props = {
  readonly mode: boolean;
  readonly toggle: () => void;
};
export default function SwitchDarkMode({ mode, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className={cn([
        "relative flex items-center justify-center w-12 h-5 rounded-full bg-[#111729] dark:bg-[#223344]",
      ])}
      aria-label={`Cambiar a ${mode ? "modo claro" : "modo oscuro"}`}
    >
      <div
        className={cn([
          "flex relative items-center  justify-between  w-full rounded-full px-1",
        ])}
      >
        <Image src={SunIcon} alt="icon sun" className="size-4 z-20" />
        <Image
          src={mode ? MoonIcon : MoonIconDark}
          alt="icon sun"
          className="size-4 z-20"
        />
        <span
          className={cn([
            "absolute transition-transform duration-300 bg-[#F2F9FE] dark:bg-black size-5 rounded-full -z-[1px]",
            {
              "translate-x-[22px]": mode,
              "-translate-x-[1.5px]": !mode,
            },
          ])}
        ></span>
      </div>
    </button>
  );
}
