import cn from "@/utils/cn";
import { ButtonHTMLAttributes, ReactElement, ReactSVGElement } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: ReactSVGElement | ReactElement;
}

export default function ButtonIcon({ className, icon, ...rest }: Props) {
  return (
    <button
      className={cn([
        "p-2 ring-1 ring-[#4D5562] text-[#4D5562] rounded size-[34px]",
        className,
      ])}
      {...rest}
    >
      {icon}
    </button>
  );
}
