import Image from "next/image";
import DoneRoundedFill from "../../images/Done_ring_round_fill.svg";
import { FC } from "react";

type Props = {
  text: string;
  icon?: string;
};

export const ItemList: FC<Props> = ({ text, icon = DoneRoundedFill }) => {
  return (
    <li className="flex items-center gap-2 text-sm"> {/* Removed text-[#52525A] */}
      <Image src={icon} alt="check image" width={20} height={20} className="dark:filter dark:invert" /> {/* Added dark mode filter for icon */}
      <span>{text}</span>
    </li>
  );
};
