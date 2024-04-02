"use client";
import cn from "@/utils/cn";
import React, { SelectHTMLAttributes } from "react";
import { useController } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  control: any;
  rules?: any;
  options: Option[];
}

export const Select = ({
  className,
  name,
  control,
  rules,
  options,
  ...rest
}: Props) => {
  const {
    field: { ref, ...fields },
    fieldState: { invalid, isTouched, isDirty, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <select
        id="company-size"
        className={cn([
          "ps-3 py-6 w-full rounded-lg text-[#111729] font-medium form-select",
          className,
          { "border-red-400": isTouched && invalid },
        ])}
        {...rest}
        {...fields}
        ref={ref}
      >
        <option value="">Seleccione una opción ...</option>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isTouched && invalid && (
        <div className="text-red-400">{error?.message}</div>
      )}
    </div>
  );
};
