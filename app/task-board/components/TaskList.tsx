import { Task as TypeTask } from "@/types/task";
import Card from "./Card";
import IconAdd from "./IconAdd";
import Task from "./Task";

type TaskListProps = {
  readonly tasks: TypeTask[] | null;
};
export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="flex flex-col gap-y-5">
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}

      <Card color="bg-[#F5E8D5]">
        <button className="flex flex-row items-center gap-5 w-full h-full">
          <div className="p-3 bg-[#E9A23B] rounded-lg">
            <IconAdd />
          </div>
          <h1 className="text-xl font-semibold">Add new task</h1>
        </button>
      </Card>
    </div>
  );
}
