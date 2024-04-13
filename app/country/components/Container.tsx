"use client";
import { useCountries } from "@/context/CountriesContext";
import CountryTable from "./CountryTable";
import Hero from "./Hero";
import ListFilters from "./ListFilters";

export default function Container() {
  const { handleQueryChange } = useCountries();
  return (
    <div className="bg-[#282B30] max-w-screen-xl min-h-screen font-beVietnamPro">
      <Hero />
      <div className="mx-10 bg-[#1B1D1F] py-6 px-8 -mt-[60px]">
        <div className="flex justify-between items-center">
          <p className="text-[#6C727F]">Found 234 countries</p>
          <label className="relative w-96">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="h-5 w-5 text-[#6C727F]"
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
              className="placeholder:text-[#6C727F] block bg-[#282B30] w-full  rounded-xl border-none py-4 px-4 ps-[40px] pr-3 shadow focus:outline-none focus:border-[#3662E3] focus:ring-[#3662E3] focus:ring-2 text-base sm:text-sm text-[#CDD5E0] font-medium"
              placeholder="Search by Name, Region, or Subregion"
              type="text"
              name="search"
              onChange={handleQueryChange}
            />
          </label>
        </div>
        <div className="mt-9 flex gap-8">
          <ListFilters />
          <div className="flex-1">
            <CountryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
