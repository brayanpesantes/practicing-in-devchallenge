import cn from "@/utils/cn";
import { HtmlHTMLAttributes } from "react";
interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}
export default function Button({
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "bg-[#393F6E] transition-all duration-300 ease-in-out px-[76px] py-5 rounded-xl text-[#E2E4F3] text-base font-medium hover:bg-gradient-to-r from-[#E65895] to-[#BC6BE8] text-wrap disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
