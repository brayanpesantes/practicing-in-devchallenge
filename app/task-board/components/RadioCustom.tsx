import { HtmlHTMLAttributes } from "react";

interface RadioCustomProps extends HtmlHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly icon?: string;
}
export default function RadioCustom({
  id,
  label,
  icon,
  ...rest
}: RadioCustomProps) {
  return (
    <label
      htmlFor={id}
      className="p-3 bg-[#E3E8EF] rounded-lg hover:bg-[#F5D565] cursor-pointer"
    >
      <span className="sr-only">{label}</span>
      <input type="radio" id={id} className="hidden" {...rest} />
      <span className="size-5">{icon}</span>
    </label>
  );
}
