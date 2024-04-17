"use client";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/utils/supebase/client";
import { useState } from "react";
import IconCloseRing from "./IconCloseRing";
import IconDone from "./IconDone";
import IconTimeAtack from "./IconTimeAtack";
import RadioCustom from "./RadioCustom";
import RadioStatus from "./RadioStatus";

type TaskFormProps = {
  readonly close: () => void;
};

export enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  WONT_DO = "WONT_DO",
  DEFAULT = "DEFAULT",
}
export default function TaskForm({ close }: TaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>(Status.DEFAULT);
  const [iconSelected, setIconSelected] = useState<string>("");

  const supabase = createClient();

  const handleIconChange = (value: string) => {
    setIconSelected(value);
  };
  const handleStateChange = (value: string) => {
    setStatus(value);
  };

  const handleOnSave = async () => {
    console.log("save");

    if (!validateData()) return;
    const { error } = await supabase.from("tasks").insert({
      title,
      description,
      type: status,
      icon: iconSelected,
    });

    if (error) {
      console.error(error);
      return;
    }

    setTitle("");
    setDescription("");
    setStatus(Status.DEFAULT);
    setIconSelected("");
    close();
  };

  const validateData = () => {
    if (title.length === 0) {
      alert("El titulo es requerido");
      return false;
    }
    if (iconSelected === "") {
      alert("El icono es requerido");
      return false;
    }
    return true;
  };

  return (
    <div className="w-1/2  h-full bg-[#F8FAFC] translate-x-full rounded-xl flex flex-col justify-between py-4 px-6">
      <div className=" ">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">Task details</h1>
          <button
            className="p-3 ring-1 self-center rounded-lg ring-[#00000033] "
            onClick={() => {
              close();
              setTitle("");
              setDescription("");
              setStatus(Status.DEFAULT);
              setIconSelected("");
            }}
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
            Name
          </Label>
          <input
            type="text"
            className="w-full form-input rounded-md px-[14px] py-[10px]"
            onChange={(e) => setTitle(e.target.value)}
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
            className="w-full form-input rounded-md px-[14px] py-[10px] resize-none h-40"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
              iconSelected={iconSelected}
              onChange={() => handleIconChange("💻")}
            />
            <RadioCustom
              icon="💬"
              id="icon2"
              name="icon"
              value="💬"
              onChange={() => handleIconChange("💬")}
              iconSelected={iconSelected}
            />
            <RadioCustom
              icon="☕"
              id="icon3"
              name="icon"
              value="☕"
              onChange={() => handleIconChange("☕")}
              iconSelected={iconSelected}
            />
            <RadioCustom
              icon="🏋️‍♀️"
              id="icon4"
              name="icon"
              value="🏋️‍♀️"
              onChange={() => handleIconChange("🏋️‍♀️")}
              iconSelected={iconSelected}
            />
            <RadioCustom
              icon="📚"
              id="icon5"
              name="icon"
              value="📚"
              onChange={() => handleIconChange("📚")}
              iconSelected={iconSelected}
            />
            <RadioCustom
              icon="⏰"
              id="icon6"
              name="icon"
              value="⏰"
              onChange={() => handleIconChange("⏰")}
              iconSelected={iconSelected}
            />
            {iconSelected}
          </div>
        </div>
        <div className="mt-5">
          <Label
            htmlFor="priority"
            className="text-[#97A3B6] font-normal pb-1.5"
          >
            Status
          </Label>
          <div className="grid grid-cols-2  gap-4">
            <RadioStatus
              icon={<IconTimeAtack />}
              color="bg-[#E9A23B]"
              text="In Progress"
              name="state"
              checked={status === Status.IN_PROGRESS}
              onChange={handleStateChange}
              value={Status.IN_PROGRESS}
            />
            <RadioStatus
              icon={<IconDone />}
              color="bg-[#32D657]"
              text="Completed"
              name="state"
              checked={status === Status.COMPLETED}
              onChange={handleStateChange}
              value={Status.COMPLETED}
            />
            <RadioStatus
              icon={<IconCloseRing />}
              color="bg-[#DD524C]"
              text="Won’t Do"
              name="state"
              checked={status === Status.WONT_DO}
              onChange={handleStateChange}
              value={Status.WONT_DO}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <button className="px-6 py-2 bg-[#97A3B6] text-[#F8FAFC] rounded-full">
          Delete
        </button>
        <button
          className="px-6 py-2 bg-[#3662E3] text-[#F8FAFC] rounded-full"
          onClick={handleOnSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
