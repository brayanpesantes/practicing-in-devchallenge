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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchQuery.trim()) {
        e.preventDefault(); // Prevent form submission if it's part of a form
        fetchData(searchQuery.trim());
        handleOpen();
      }
    }
  };

  return (
    <label className="relative block">
      <span className="sr-only">Search GitHub Username</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3" aria-hidden="true"> {/* Adjusted padding slightly for icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="h-5 w-5 text-[#909193]" // Slightly lighter icon color for better contrast on dark bg
          fill="currentColor"
          aria-hidden="true" // Added aria-hidden for decorative icon
        >
          <path
            fillRule="evenodd"
            d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      <input
        className="placeholder:text-gray-400 dark:placeholder:text-gray-500 block bg-[#20293A] dark:bg-slate-800 w-full rounded-md border-transparent dark:border-slate-700 py-4 px-4 ps-12 pr-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-2 text-base sm:text-sm text-[#CDD5E0] dark:text-slate-200 font-medium" // Adjusted ps, colors and focus
        placeholder="Enter GitHub username and press Enter" // More descriptive placeholder
        type="search" // Changed type to "search"
        name="search"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Added keydown handler
      />
    </label>
  );
}
