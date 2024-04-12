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
    <div className="bg-gradient-to-r from-[#111729] to-[#1D1B48] text-white  w-full p-5 rounded-xl">
      <h3 className="text-xl">{repository?.name}</h3>
      <p className="text-base mt-3">{repository?.description}</p>
      <div className="flex gap-x-3 mt-5 text-[12px] items-center">
        {repository?.license && (
          <span className="inline-flex gap-1 items-center">
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
