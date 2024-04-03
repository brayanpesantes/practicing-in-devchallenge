import { useFormStepContext } from "@/context/FormStepContext";
import React from "react";
import Card from "./Card";
import { Button } from "@/components/ui/Button";

export default function DataSummary() {
  const { formData } = useFormStepContext();

  const handleNextStep = () => {};

  return (
    <Card>
      <h1 className="text-[#E5E7EB] text-xl">Summary</h1>
      <div className="mt-6">
        <p className="text-[#A1A1A9]">
          Name:
          <span className="text-[#E5E7EB] ml-2">
            {formData?.personalInfo?.name}
          </span>
        </p>
        <p className="text-[#A1A1A9]">
          Email:
          <span className="text-[#E5E7EB] ml-2">
            {formData?.personalInfo?.email}
          </span>
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-[#A1A1A9]">Topics:</h2>
        {
          <ul>
            {formData.topicsInterested.topic?.map((top) => (
              <li className="text-[#E5E7EB]" key={top}>
                {top}
              </li>
            ))}
          </ul>
        }
      </div>
      <div className="mt-9 flex items-center justify-center">
        <Button
          onClick={handleNextStep}
          className="px-7 py-3 rounded-full bg-[#845EEE] text-white hover:bg-[#652CD1]"
        >
          Continue
        </Button>
      </div>
    </Card>
  );
}
