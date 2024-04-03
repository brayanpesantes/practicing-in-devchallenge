import React, { useState } from "react";
import Card from "./Card";
import Topics from "./Topics";
import { Button } from "@/components/ui/Button";
import { useFormStepContext } from "@/context/FormStepContext";

export default function TopicInterested() {
  const { handleChange } = useFormStepContext();

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Software Development", checked: false },
    { id: 2, label: "User Experience", checked: false },
    { id: 3, label: "Graphic Design", checked: false },
  ]);
  const handleCheckboxChange = (id: number) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleNextStep = () => {
    const filterLength = checkboxes.filter(
      (checkbox) => checkbox.checked === true
    ).length;
    if (filterLength <= 0) {
      alert("selected is item");
      return;
    }
    const topic = checkboxes
      .filter((item) => item.checked === true)
      .map((item) => {
        return item.label;
      });
    handleChange({ topic }, "topicsInterested");
  };

  return (
    <Card>
      <h1 className="text-[#E5E7EB] text-xl">
        Which topics you are interested in?
      </h1>
      <div className="mt-6">
        <Topics checkboxes={checkboxes} handleChange={handleCheckboxChange} />
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
