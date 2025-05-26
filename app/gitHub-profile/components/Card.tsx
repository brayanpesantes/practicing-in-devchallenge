import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Repository } from "./Container";
import IconChieldAlt from "./IconChieldAlt";
import IconNesting from "./IconNesting";
import IconStart from "./IconStart";
dayjs.extend(relativeTime);

type Props = {
  readonly repository: Repository;
};
export default function Card({ repository }: Props) {
  return (
    <div className="bg-gradient-to-r from-[#111729] to-[#1D1B48] text-white w-full p-5 rounded-xl shadow-lg h-full flex flex-col"> {/* Added shadow, h-full and flex flex-col */}
      <h3 className="text-xl font-semibold text-slate-100">{repository?.name}</h3> {/* Added font-semibold and specific color */}
      <p className="text-sm text-slate-300 mt-2 mb-4 flex-grow line-clamp-3"> {/* Adjusted text size, color, margin, flex-grow and line-clamp */}
        {repository?.description || "No description available."}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto pt-3 text-xs text-slate-400 items-center border-t border-slate-700/50"> {/* Adjusted text size, color, added border-t, flex-wrap and gap */}
        {repository?.license && (
          <span className="inline-flex gap-1.5 items-center"> {/* Adjusted gap */}
            <IconNesting />
            {repository?.license?.spdx_id}
          </span>
        )}
        <span className="inline-flex gap-1 items-center">
          <IconChieldAlt />
          {repository?.forks_count ?? 0}
        </span>
        <span className="inline-flex gap-1 items-center">
          <IconStart />
          {repository?.watchers_count ?? 0}
        </span>
        <span className="ml-3">
          update {dayjs(repository?.updated_at).fromNow()}
        </span>
      </div>
    </div>
  );
}
