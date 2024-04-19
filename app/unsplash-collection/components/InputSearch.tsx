import cn from "@/utils/cn";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
  readonly className?: string;
  readonly onSearch: (value: string) => void;
  readonly defaultValue?: string;
};
export default function InputSearch({
  className,
  onSearch,
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const route = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    route.replace(`/unsplash-collection/search?query=${value}`);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <form className={cn("w-[530px] relative ", className)} onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        value={value}
        onChange={handleChange}
        className="h-full w-full px-[15px] py-4 border rounded-lg shadow-sm border-[#E5E7EB] pe-12 placeholder:text-[#6C727F] placeholder:text-sm font-light text-[#121826]"
        placeholder="Enter your keywords..."
      />
      <button
        type="submit"
        className="absolute z-20 right-[15px] size-6 h-full text-[#E5E7EB]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 32 32"
          className="h-6 w-6"
          fill="currentColor"
        >
          <path
            fill="currentColor"
            d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
          ></path>
        </svg>
        <span className="sr-only">search</span>
      </button>
    </form>
  );
}
