import { Button } from "@/components/ui/Button";
import { useFormStepContext } from "@/context/FormStepContext";
import Card from "./Card";

export default function DataSummary() {
  const { formData, goToNextStep } = useFormStepContext();

  const handleNextStep = () => {
    const isConfirm = confirm("esta seguro");
    if (isConfirm) goToNextStep();
  };

  return (
    <Card>
      <h1 className="text-[#E5E7EB] text-xl">Summary</h1>
      <div className="mt-6">
        <p className="text-[#A1A1A9]">
          <span>Name:</span>
          <span className="text-[#E5E7EB] ml-2">
            {formData?.personalInfo?.name}
          </span>
        </p>
        <p className="text-[#A1A1A9]">
          <span>Email:</span>
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
          Confirm
        </Button>
      </div>
    </Card>
  );
}
