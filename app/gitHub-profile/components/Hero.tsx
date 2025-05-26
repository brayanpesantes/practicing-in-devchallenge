import { useState } from "react";
import Dropdown from "./Dropdown";
import InputSearch from "./InputSearch";
import { UserData } from "./Container"; // Assuming UserData is exported

interface HeroProps {
  readonly handleSearchChange: (value: string) => void;
  readonly searchQuery: string;
  readonly fetchData: (username: string) => Promise<void>; // Assuming fetchData can be async
  readonly results: UserData[] | UserData | null | { message?: string };
  readonly handleData: () => void; // This is Container's handleData, which takes no args
}

export default function Hero({
  handleSearchChange,
  searchQuery,
  fetchData,
  results,
  handleData,
}: HeroProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // Wrapper for fetchData to manage isLoading state
  const fetchDataAndUpdateLoadingState = async (username: string) => {
    setIsLoading(true);
    try {
      await fetchData(username);
    } catch (error) {
      console.error("Error fetching data in Hero:", error);
      // Optionally set results to an error state or display a message
    }
    setIsLoading(false);
  };
  
  // This function is called when a user is selected from the dropdown
  const handleUserSelectionFromDropdown = async (selectedUser: UserData) => {
    setIsLoading(true);
    setIsOpen(false); // Close dropdown
    try {
      // Update the main search query in Container to the selected user's login
      handleSearchChange(selectedUser.login);
      // Fetch this specific user's data to update Container's 'resultSearch' state
      await fetchData(selectedUser.login); 
      // Now call Container's handleData, which should use the updated 'resultSearch'
      handleData(); 
    } catch (error) {
      console.error("Error selecting user from dropdown:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-60 w-full bg-github bg-cover bg-center flex-none relative">
      <div className="absolute inset-0 bg-black/60"></div> {/* Overlay for better contrast */}
      <div className="md:w-[485px] px-4 sm:px-6 lg:px-8 md:mx-auto relative z-10 pt-10 sm:pt-12 md:pt-16"> {/* Adjusted padding for responsiveness */}
        <InputSearch
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          fetchData={fetchDataAndUpdateLoadingState} // Pass the wrapper
          handleOpen={handleOpen}
        />
        {isOpen && ( // Removed searchQuery.length > 2 condition to allow showing "No results" or "Loading" based on Dropdown logic
          <Dropdown
            results={results}
            isLoading={isLoading}
            handleData={handleUserSelectionFromDropdown} // Pass the new handler
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
