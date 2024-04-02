'use client'
import React, { SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value: string;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

export const Select = ({ options, ...rest }: Props) => {
  return (
    <select
      name="company-size"
      id="company-size"
      className="ps-3 py-6 w-full rounded-lg text-[#111729] font-medium form-select "
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
