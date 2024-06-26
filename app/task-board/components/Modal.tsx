import { useTaskContext } from "@/context/TasksContext";
import cn from "@/utils/cn";
import TaskForm from "./TaskForm";

export default function Modal() {
  const { modalIsOpen, closeModal } = useTaskContext();

  return (
    <div
      className={cn([
        "bg-[#00000033] absolute inset-0 transition-all duration-500 ease-in-out",
        {
          "translate-x-full opacity-0": !modalIsOpen,
        },
        {
          "translate-x-0 opacity-100": modalIsOpen,
        },
      ])}
      onClick={closeModal}
    >
      <div className="w-full h-full relative p-6 ">
        <TaskForm />
      </div>
    </div>
  );
}
