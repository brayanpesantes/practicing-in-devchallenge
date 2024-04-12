import { useState } from "react";
import Dropdown from "./Dropdown";
import InputSearch from "./InputSearch";

interface HeroProps {
  readonly handleSearchChange: (value: string) => void;
  readonly searchQuery: string;
  readonly fetchData: (username: string) => void;
  readonly results: any;
  readonly handleData: () => void;
}

export default function Hero({
  handleSearchChange,
  searchQuery,
  fetchData,
  results,
  handleData,
}: HeroProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-60 w-full pt-8 bg-github bg-cover bg-center flex-none">
      <div className="md:w-[485px] px-2 md:px-0 md:mx-auto">
        <InputSearch
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          fetchData={fetchData}
          handleOpen={handleOpen}
        />
        {searchQuery.length > 2 && isOpen && (
          <Dropdown
            results={results}
            handleData={handleData}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
