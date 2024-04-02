import cn from "@/utils/cn";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...rest }: Props) => {
  return (
    <input
      className={cn([
        "ps-3 py-6 rounded-xl text-base font-medium text-[#111729] w-full  placeholder:text-[#CDD5E0]",
        className,
      ])}
      {...rest}
    />
  );
};
