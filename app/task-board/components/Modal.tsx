import cn from "@/utils/cn";
import TaskForm from "./TaskForm";
type ModalProps = {
  readonly modalIsOpen: boolean;
  readonly close: () => void;
};
export default function Modal({ close, modalIsOpen }: ModalProps) {
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
    >
      <div className="w-full h-full relative p-6 ">
        <TaskForm close={close} />
      </div>
    </div>
  );
}
