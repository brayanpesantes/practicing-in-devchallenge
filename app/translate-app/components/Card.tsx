import cn from "@/utils/cn";
import { ReactNode } from "react";

type Props = {
  readonly className?: string;
  readonly children: ReactNode;
};
export default function Card({ className, children }: Props) {
  return (
    <div
      className={cn([
        "p-6 border border-[#4D5562] rounded-2xl  min-w-[560px]",
        className,
      ])}
    >
      {children}
    </div>
  );
}
