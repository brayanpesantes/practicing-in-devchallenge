import cn from "@/utils/cn";
import { HtmlHTMLAttributes } from "react";

interface RadioCustomProps extends HtmlHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly icon?: string;
  readonly name?: string;
  readonly value?: string;
  readonly iconSelected: string;
}

export default function RadioCustom({
  id,
  label,
  icon,
  name,
  iconSelected,
  value,
  ...rest
}: RadioCustomProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "p-3 bg-[#E3E8EF] rounded-lg hover:bg-[#F5D565] cursor-pointer flex items-center justify-center",
        {
          "bg-[#F5D565]": value === iconSelected,
        }
      )}
    >
      <span className="sr-only">{label}</span>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={value === iconSelected}
        {...rest}
        className="hidden"
      />
      <span className="text-lg">{icon}</span>
    </label>
  );
}
