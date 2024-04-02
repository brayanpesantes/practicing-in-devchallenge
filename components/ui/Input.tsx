import cn from "@/utils/cn";
import { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: any;
}

export const Input = ({ className, name, control, rules, ...rest }: Props) => {
  const {
    field: { ref, ...fields },
    fieldState: { invalid, isTouched, isDirty, error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <div className="">
      <input
        className={cn([
          "ps-3 py-6 rounded-xl text-base font-medium text-[#111729] w-full placeholder:text-[#CDD5E0]",
          className,
          {
            "border-red-400 focus:border-none focus:ring-2 focus:ring-red-400":
              invalid && isTouched,
          },
        ])}
        {...rest}
        {...fields}
        ref={ref}
      />

      {isTouched && invalid && (
        <div className="text-red-400">{error?.message}</div>
      )}
    </div>
  );
};
