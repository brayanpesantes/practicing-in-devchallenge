import cn from "@/utils/cn";
import { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ children, className, ...rest }: Props) => {
  return (
    <label
      className={cn(["text-sm text-white block font-medium pb-1", className])}
      {...rest}
    >
      {children}
    </label>
  );
};
