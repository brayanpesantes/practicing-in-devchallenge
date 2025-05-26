/* eslint-disable @next/next/no-img-element */ // Keep this if next/image is not used, otherwise remove. For now, sticking to img as per prompt.

import { UserData } from "./Container"; // Assuming UserData is exported from Container.tsx or a types file

interface DropdownItemProps {
  readonly user: UserData;
  readonly isFocused: boolean;
  readonly onClick: () => void;
}

export default function DropdownItem({
  user,
  isFocused,
  onClick,
}: DropdownItemProps) {
  const description = user.bio || "No bio available.";
  // Truncate description for display
  const truncatedDescription =
    description.length > 60
      ? description.substring(0, 57) + "..."
      : description;

  return (
    <li role="option" aria-selected={isFocused}>
      <button
        type="button"
        className={`flex items-center gap-x-3 cursor-pointer w-full text-left p-3 rounded-md transition-colors duration-150 ease-in-out
                    ${
                      isFocused
                        ? "bg-slate-700 dark:bg-slate-600"
                        : "hover:bg-slate-600/50 dark:hover:bg-slate-700/50"
                    }`}
        onClick={onClick}
        ref={(el) => { // For scrolling into view
          if (isFocused && el) {
            el.scrollIntoView({ block: "nearest" });
          }
        }}
      >
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`} // More descriptive alt text
          className="size-12 rounded-full object-cover flex-shrink-0" // Adjusted size and added rounded-full
        />
        <div className="my-auto overflow-hidden">
          <h3 className="text-base font-semibold text-slate-100 dark:text-slate-50 truncate">
            {user.name || user.login}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-300">
            {user.login}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {truncatedDescription}
          </p>
        </div>
      </button>
    </li>
  );
}
