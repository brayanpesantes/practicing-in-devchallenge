"use client";
import { Label } from "@/components/ui/Label";
import { useTaskContext } from "@/context/TasksContext";
import { Status } from "@/types/task";
import cn from "@/utils/cn";
import { useTaskForm } from "../hooks/useForm";
import IconCloseRing from "./IconCloseRing";
import IconDone from "./IconDone";
import IconTimeAtack from "./IconTimeAtack";
import RadioCustom from "./RadioCustom";
import RadioStatus from "./RadioStatus";

export default function TaskForm() {
  const {
    formData,
    handleIconChange,
    handleStatusChange,
    handleChange,
    handleSaveAndEdit,
    handleDelete,
    selectedTask,
  } = useTaskForm();
  const { closeModal } = useTaskContext();
  const { title, description, status, icon } = formData;
  return (
    <div
      className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full bg-[#F8FAFC] translate-x-full rounded-xl flex flex-col justify-between py-4 px-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <div className="flex justify-between items-center">
          <h1 id="modal-title" className="text-xl font-medium">Task details</h1>
          <button
            aria-label="Close task details modal"
            className="p-3 ring-1 self-center rounded-lg ring-[#00000033] "
            onClick={closeModal}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="7.5"
                fill="#E9A23B"
                fillOpacity="0.25"
              />
              <path
                d="M7.5 7.5L12.5 12.5"
                stroke="#E9A23B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M12.5 7.5L7.5 12.5"
                stroke="#E9A23B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="w-full mt-4">
          <Label htmlFor="name" className="text-[#97A3B6] font-normal pb-1.5">
            Task Name
          </Label>
          <input
            type="text"
            name="title"
            className="w-full form-input rounded-md px-[14px] py-[10px]"
            onChange={handleChange}
            value={title}
          />
        </div>
        <div className="mt-5">
          <Label
            htmlFor="description"
            className="text-[#97A3B6] font-normal pb-1.5"
          >
            Description
          </Label>
          <textarea
            name="description"
            className="w-full form-input rounded-md px-[14px] py-[10px] resize-none h-40 placeholder:text-[#97A3B6]"
            onChange={handleChange}
            value={description}
            placeholder="Enter a short description"
          />
        </div>
        <div className="mt-5">
          <Label
            htmlFor="priority"
            className="text-[#97A3B6] font-normal pb-1.5"
          >
            Icon
          </Label>
          <div className="inline-flex gap-3 items-center ">
            <RadioCustom
              icon="💻"
              id="icon1"
              name="icon"
              value="💻"
              iconSelected={icon}
              onChange={() => handleIconChange("💻")}
            />
            <RadioCustom
              icon="💬"
              id="icon2"
              name="icon"
              value="💬"
              onChange={() => handleIconChange("💬")}
              iconSelected={icon}
            />
            <RadioCustom
              icon="☕"
              id="icon3"
              name="icon"
              value="☕"
              onChange={() => handleIconChange("☕")}
              iconSelected={icon}
            />
            <RadioCustom
              icon="🏋️‍♀️"
              id="icon4"
              name="icon"
              value="🏋️‍♀️"
              onChange={() => handleIconChange("🏋️‍♀️")}
              iconSelected={icon}
            />
            <RadioCustom
              icon="📚"
              id="icon5"
              name="icon"
              value="📚"
              onChange={() => handleIconChange("📚")}
              iconSelected={icon}
            />
            <RadioCustom
              icon="⏰"
              id="icon6"
              name="icon"
              value="⏰"
              onChange={() => handleIconChange("⏰")}
              iconSelected={icon}
            />
          </div>
        </div>
        <div className="mt-5">
          <Label
            htmlFor="priority"
            className="text-[#97A3B6] font-normal pb-1.5"
          >
            Status
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RadioStatus
              icon={<IconTimeAtack />}
              color="bg-[#E9A23B]"
              text="In Progress"
              name="status"
              value={Status.IN_PROGRESS}
              checked={formData.status === Status.IN_PROGRESS}
              onChange={handleStatusChange}
            />
            <RadioStatus
              icon={<IconDone />}
              color="bg-[#32D657]"
              text="Completed"
              name="status"
              value={Status.COMPLETED}
              checked={status === Status.COMPLETED}
              onChange={handleStatusChange}
            />
            <RadioStatus
              icon={<IconCloseRing />}
              color="bg-[#DD524C]"
              text="Won't Do"
              name="status"
              value={Status.WONT_DO}
              checked={status === Status.WONT_DO}
              onChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <button
          className={cn(
            "px-6 py-2 bg-[#97A3B6] text-[#F8FAFC] rounded-full disabled:cursor-not-allowed ",
            {
              "bg-[#DD524C]": selectedTask,
            }
          )}
          disabled={!selectedTask}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="px-6 py-2 bg-[#3662E3] text-[#F8FAFC] rounded-full"
          onClick={handleSaveAndEdit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
