import cn from "@/utils/cn";
import { ReactNode } from "react";

type Props = {
  readonly className?: string;
  readonly children: ReactNode;
};
export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn([
        "w-[346px] pt-5 pb-7 px-5 bg-[#121826a6] rounded-2xl",
        className,
      ])}
    >
      {children}
    </div>
  );
}
