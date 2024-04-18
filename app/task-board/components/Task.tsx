import { useTaskContext } from "@/context/TasksContext";
import { Status, Task as TypeTask } from "@/types/task";
import Card from "./Card";
import IconState from "./IconState";
import IconTypeCard from "./IconTypeCard";
type TaskProps = {
  readonly task: TypeTask;
};

const statusColorMap: { [key: string]: string } = {
  [Status.COMPLETED]: "bg-[#A0ECB1]",
  [Status.DEFAULT]: "bg-[#97A3B6]",
  [Status.IN_PROGRESS]: "bg-[#F5D565]",
  [Status.WONT_DO]: "bg-[#F7D4D3]",
};

export default function Task({ task }: TaskProps) {
  const { openModalForEdit } = useTaskContext();

  const color = statusColorMap.hasOwnProperty(task.status)
    ? statusColorMap[task?.status]
    : "";

  return (
    <Card color={color}>
      <button
        className="flex w-full flex-row items-center gap-5 cursor-pointer"
        onClick={() => openModalForEdit(task)}
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
            <IconState icon={task.status} />
          </div>
        </div>
      </button>
    </Card>
  );
}
