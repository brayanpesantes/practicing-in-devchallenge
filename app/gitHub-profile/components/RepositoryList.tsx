import React from "react";
import { Repository } from "./Container";
import Card from "./Card";

interface RepositoryListProps {
  readonly repositories: Repository[];
  readonly showAll: boolean;
  readonly onShowAll: () => void;
}

export default function RepositoryList({
  onShowAll,
  repositories,
  showAll,
}: RepositoryListProps) {
  return (
    <div className="pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-wrap gap-x-8 gap-y-[34px] mt-[34px] items-start">
        {repositories.map((repository) => (
          <Card key={repository.id} repository={repository} />
        ))}
      </div>
      {repositories.length > 0 && showAll && ( // Only show button if there are repositories and showAll is true
        <div className="flex items-center justify-center py-8 md:py-11">
          <button
            className="text-slate-300 dark:text-slate-400 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#364153] dark:focus:ring-offset-slate-900 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-md px-4 py-2 transition-all duration-300 ease-in-out" // Added focus styling and slight padding
            onClick={onShowAll}
          >
            View all Repositories
          </button>
        </div>
      )}
    </div>
  );
}
