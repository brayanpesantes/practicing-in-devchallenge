import React, { useState, useEffect, useRef } from "react";
import DropdownItem from "./DropdownItem";
import { UserData } from "./Container"; // Assuming UserData is exported from Container.tsx

interface DropdownProps {
  readonly results: UserData[] | UserData | null | { message?: string }; // Can be array, single object, null, or error message
  readonly isLoading: boolean;
  readonly handleData: (user: UserData) => void; // To pass the selected user
  readonly handleClose: () => void;
}

export default function Dropdown({
  results,
  isLoading,
  handleData,
  handleClose,
}: DropdownProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement>(null);

  // Determine userArray based on results prop
  let userArray: UserData[] = [];
  let R = results as any; // type assertion
  if (Array.isArray(R)) {
    userArray = R;
  } else if (R && R.login) {
    // Single user object that is not an error
    userArray = [R];
  }

  // Handle API "Not Found" message or other error messages
  let errorMessage: string | null = null;
  if (R && R.message && !R.login) {
    errorMessage = R.message === "Not Found" ? "User not found." : R.message;
  }


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!userArray.length && !isLoading) return;

      if (event.key === "Escape") {
        handleClose();
        return;
      }
      
      if (userArray.length > 0) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setFocusedIndex((prevIndex) => (prevIndex + 1) % userArray.length);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setFocusedIndex(
            (prevIndex) => (prevIndex - 1 + userArray.length) % userArray.length
          );
        } else if (event.key === "Enter") {
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < userArray.length) {
            handleData(userArray[focusedIndex]);
            handleClose();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userArray, focusedIndex, handleData, handleClose, isLoading]);
  
  useEffect(() => {
    // Reset focused index when results change
    setFocusedIndex(-1);
  }, [results]);


  if (isLoading) {
    return (
      <div className="text-slate-300 mt-2 w-full bg-slate-800 dark:bg-slate-900 shadow-lg rounded-md p-4 text-center">
        Loading...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-slate-300 mt-2 w-full bg-slate-800 dark:bg-slate-900 shadow-lg rounded-md p-4 text-center">
        {errorMessage}
      </div>
    );
  }
  
  if (!userArray.length) {
    return (
      <div className="text-slate-300 mt-2 w-full bg-slate-800 dark:bg-slate-900 shadow-lg rounded-md p-4 text-center">
        No results found.
      </div>
    );
  }

  return (
    <ul
      role="listbox"
      ref={listRef}
      className="text-white mt-2 w-full bg-slate-800 dark:bg-slate-900 shadow-lg rounded-md py-2 overflow-y-auto max-h-80 focus:outline-none"
      tabIndex={-1} // Make it focusable for key events if needed, though items are handled
    >
      {userArray.map((user, index) => (
        <DropdownItem
          key={user.id || index} // Use user.id if available, otherwise index
          user={user}
          isFocused={index === focusedIndex}
          onClick={() => {
            handleData(user);
            handleClose();
          }}
        />
      ))}
    </ul>
  );
}
