import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};
export default function Card({ children }: CardProps) {
  return (
    <div className="w-full md:w-[545px] p-2 bg-white dark:bg-[#212936] shadow-lg rounded-xl">
      {children}
    </div>
  );
}
