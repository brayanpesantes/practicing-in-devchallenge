import { Label } from "@/components/ui/Label";
import IconCloseRing from "./IconCloseRing";
import IconDone from "./IconDone";
import IconTimeAtack from "./IconTimeAtack";
import RadioCustom from "./RadioCustom";
import RadioStatus from "./RadioStatus";

export default function Modal() {
  return (
    <div className="bg-[#00000033] absolute inset-0">
      <div className="w-full h-full relative p-6 ">
        <div className="w-1/2  h-full bg-[#F8FAFC] py-4 px-6 translate-x-full rounded-xl">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Task details</h1>
            <button className="p-3 ring-1 self-center rounded-lg ring-[#00000033]">
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
            />
          </div>
          <div className="mt-5">
            <Label
              htmlFor="description"
              className="text-[#97A3B6] font-normal pb-1.5"
            >
              Description
            </Label>
            <textarea className="w-full form-input rounded-md px-[14px] py-[10px] resize-none h-40" />
          </div>
          <div className="mt-5">
            <Label
              htmlFor="priority"
              className="text-[#97A3B6] font-normal pb-1.5"
            >
              Icon
            </Label>
            <div className="inline-flex gap-3 items-center ">
              <RadioCustom icon="💻" />
              <RadioCustom icon="💬" />
              <RadioCustom icon="☕" />
              <RadioCustom icon="🏋️‍♀️" />
              <RadioCustom icon="📚" />
              <RadioCustom icon="⏰" />
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
              />
              <RadioStatus
                icon={<IconDone />}
                color="bg-[#32D657]"
                text="Completed"
              />
              <RadioStatus
                icon={<IconCloseRing />}
                color="bg-[#DD524C]"
                text="Won’t Do"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
