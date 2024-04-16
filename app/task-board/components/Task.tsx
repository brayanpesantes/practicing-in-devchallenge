import { Task as TypeTask } from "@/types/task";
import Card from "./Card";
import IconState from "./IconState";
import IconTypeCard from "./IconTypeCard";
type TaskProps = {
  readonly task: TypeTask;
};
export default function Task({ task }: TaskProps) {
  return (
    <Card color="bg-[#A0ECB1]">
      <div className="flex flex-row items-center gap-5">
        <div className="self-start">
          <IconTypeCard />
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
      </div>
    </Card>
  );
}
