import cn from "@/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, children, ...rest }: Props) => {
  return (
    <button
      className={cn([
        "py-6 bg-white text-[#4036A9] font-medium rounded-xl hover:bg-[#4036A9] hover:text-white focus:ring focus:ring-blue-500 transition duration-300 ease-in-out",
        className,
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};
