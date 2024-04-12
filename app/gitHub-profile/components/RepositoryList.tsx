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
      {showAll && (
        <div className="flex items-center justify-center py-11">
          <button
            className="text-[#CDD5E0] hover:underline transition-all duration-300 ease-in-out"
            onClick={onShowAll}
          >
            View all Repositories
          </button>
        </div>
      )}
    </div>
  );
}
