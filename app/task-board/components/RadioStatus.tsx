import cn from "@/utils/cn";
import { ChangeEvent, HtmlHTMLAttributes, ReactNode } from "react";

interface RadioStatusProps extends HtmlHTMLAttributes<HTMLInputElement> {
  readonly icon?: ReactNode;
  readonly color?: string;
  readonly text?: string;
  readonly name?: string;
  readonly checked?: boolean;
  readonly value?: string;
  readonly onChange: (value: string) => void;
}
export default function RadioStatus({
  icon,
  id,
  color,
  name,
  checked,
  value,
  text,
  onChange,
  ...rest
}: RadioStatusProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <label
      htmlFor={id}
      className={cn(
        "p-[2px] flex justify-between items-center ring-1 ring-[#00000033] rounded-lg basis-1/2 cursor-pointer"
      )}
    >
      <div className="flex items-center gap-3 ">
        <div
          className={cn(
            "p-3  flex items-center justify-center rounded-lg",
            color
          )}
        >
          <span className="">{icon}</span>
        </div>
        <input
          type="radio"
          name={name}
          value={value}
          id={id}
          className="hidden"
          onChange={handleChange}
          {...rest}
        />
        <p>{text}</p>
      </div>
      {checked && (
        <div className="mr-4 size-5 rounded-full bg-[#3662E3] flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="size-5"
          >
            <path
              fill="currentColor"
              d="m10.5 16.2l-4-4l1.4-1.4l2.6 2.6l5.6-5.6l1.4 1.4l-7 7Z"
            ></path>
          </svg>
        </div>
      )}
    </label>
  );
}
