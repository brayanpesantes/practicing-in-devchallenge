import cn from "@/utils/cn";
import { ReactNode } from "react";

interface Props {
  readonly className?: string;
  readonly children: ReactNode;
}
export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn([
        "w-[456px] p-10 bg-[#212936] border border-[#394150] rounded-xl",
        className,
      ])}
    >
      {children}
    </div>
  );
}
