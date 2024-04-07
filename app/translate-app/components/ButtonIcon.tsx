import cn from "@/utils/cn";
import { ButtonHTMLAttributes, ReactElement, ReactSVGElement } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: ReactSVGElement | ReactElement;
}

export default function ButtonIcon({ className, icon, ...rest }: Props) {
  return (
    <button
      className={cn([
        "p-2 ring-inset ring-2 ring-[#4D5562] text-[#4D5562] rounded-lg size-[34px]",
        className,
      ])}
      {...rest}
    >
      {icon}
    </button>
  );
}
