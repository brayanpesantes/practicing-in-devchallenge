import { Task as TypeTask } from "@/types/task";
import Card from "./Card";
import IconState from "./IconState";
import IconTypeCard from "./IconTypeCard";
import { Status } from "./TaskForm";
type TaskProps = {
  readonly task: TypeTask;
  readonly open: () => void;
};
export default function Task({ task, open }: TaskProps) {
  return (
    <Card
      color={`${task.type === Status.COMPLETED && "bg-[#A0ECB1]"} 
      ${task.type === Status.DEFAULT && "bg-[#97A3B6]"}
       ${task.type === Status.IN_PROGRESS && "bg-[#F5D565]"}
       ${task.type === Status.WONT_DO && "bg-[#F7D4D3]"}
       `}
    >
      <button
        className="flex w-full flex-row items-center gap-5 cursor-pointer"
        onClick={open}
      >
        <div className="self-start">
          <IconTypeCard icon={task.icon} />
        </div>
        <div className="flex items-center justify-between gap-x-16 w-full">
          <div className="">
            <h1 className="text-xl font-semibold">{task.title}</h1>
            {task.description && (
              <p className="text-base font-light">{task.description}</p>
            )}
          </div>
          <div className="">
            <IconState icon={task.type} />
          </div>
        </div>
      </button>
    </Card>
  );
}
