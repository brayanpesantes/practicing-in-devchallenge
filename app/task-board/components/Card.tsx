import cn from "@/utils/cn";
import { ReactNode } from "react";

type CardProps = {
  readonly children: ReactNode;
  readonly color?: string;
};

export default function Card({ children, color }: CardProps) {
  return <div className={cn("p-4 rounded-xl", color)}>{children}</div>;
}
