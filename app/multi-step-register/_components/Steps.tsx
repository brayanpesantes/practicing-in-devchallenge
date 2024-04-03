import { useFormStepContext } from "@/context/FormStepContext";
import cn from "@/utils/cn";
import { ReactNode } from "react";
import DataSummary from "./DataSummary";
import PersonalInfo from "./PersonalInfo";
import TopicInterested from "./TopicInterested";

const steps: { [key: number]: ReactNode } = {
  1: <PersonalInfo />,
  2: <TopicInterested />,
  3: <DataSummary />,
};

export default function Steps() {
  const { currentStep } = useFormStepContext();

  return (
    <div>
      {steps[currentStep]}
      <div className="flex items-center justify-center mt-4 gap-6">
        <div className="text-[12px] text-[#4D5562]">
          Step {currentStep} of {Object.keys(steps).length}
        </div>
        <div className="flex items-center justify-center gap-2">
          {Object.keys(steps).map((_, i) => (
            <div
              key={`step-${i}`}
              className={cn([
                "size-3 bg-[#4D5562] rounded-full ring-4 ring-transparent",
                {
                  "bg-[#652CD1] ring-4 ring-[#652CD1]/30":
                    i + 1 === currentStep,
                },
                { "bg-[#652CD1]": i + 1 < currentStep },
              ])}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
