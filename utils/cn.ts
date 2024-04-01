import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}

export default cn;
