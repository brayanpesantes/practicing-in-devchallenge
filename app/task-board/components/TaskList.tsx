"use client";
import { useTaskContext } from "@/context/TasksContext";
import Card from "./Card";
import IconAdd from "./IconAdd";
import Task from "./Task";

export default function TaskList() {
  const { tasks, openModal } = useTaskContext();

  return (
    <div className="flex flex-col gap-y-5 h-[700px] overflow-hidden">
      <div className="flex flex-col gap-5 overflow-auto scroll-smooth ">
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <Card color="bg-[#F5E8D5]">
        <button
          className="flex flex-row items-center gap-5 w-full h-full"
          onClick={openModal}
        >
          <div className="p-3 bg-[#E9A23B] rounded-lg">
            <IconAdd />
          </div>
          <h1 className="text-xl font-semibold">Add new task</h1>
        </button>
      </Card>
    </div>
  );
}
