import { useEffect } from "react";
import { useDebounce } from "use-debounce";

interface InputSearchProps {
  readonly handleSearchChange: (value: string) => void;
  readonly searchQuery: string;
  readonly fetchData: (username: string) => void;
  readonly handleOpen: () => void;
}
export default function InputSearch({
  handleSearchChange,
  searchQuery,
  fetchData,
  handleOpen,
}: InputSearchProps) {
  const [debouncedValue] = useDebounce(searchQuery, 1000);

  useEffect(() => {
    let isMounted = true;

    const fetchDataAfterDebounce = async () => {
      try {
        fetchData(debouncedValue);
        handleOpen();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (debouncedValue && isMounted) {
      fetchDataAfterDebounce();
    }

    return () => {
      isMounted = false;
    };
  }, [debouncedValue, fetchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="h-5 w-5 text-[#364153]"
          fill="currentColor"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      <input
        className="placeholder:text-[#364153] block bg-[#20293A] w-full  rounded-md border-none py-4 px-4 ps-[50px] pr-3 shadow-sm focus:outline-none focus:border-[#3662E3] focus:ring-[#3662E3] focus:ring-2 text-base sm:text-sm text-[#CDD5E0] font-medium"
        placeholder="username"
        type="text"
        name="search"
        value={searchQuery}
        onChange={handleChange}
      />
    </label>
  );
}
