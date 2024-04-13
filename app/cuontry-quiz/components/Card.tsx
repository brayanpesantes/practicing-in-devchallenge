import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <article className="min-w-[820px] pt-9 pb-16 px-10 bg-[#343964] rounded-lg flex items-center justify-center">
      {children}
    </article>
  );
}
