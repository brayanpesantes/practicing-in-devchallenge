"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useFormStepContext } from "@/context/FormStepContext";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "./Card";

type Inputs = {
  name: string;
  email: string;
};

export default function PersonalInfo() {
  const { control, handleSubmit } = useForm<Inputs>();

  const { formData, handleChange, goToNextStep } = useFormStepContext();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    goToNextStep();
    handleChange(data, "personalInfo");
  };

  return (
    <Card>
      <h1 className="text-[#E5E7EB] text-xl font-bold">Register</h1>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <Label className="pb-2 text-[#E5E7EB]">Name</Label>
          <Input
            name="name"
            placeholder="name"
            value={formData.personalInfo.name}
            control={control}
            rules={{ required: "Name is required" }}
            className="py-4 border outline-none  border-[#A1A1A9] bg-[#212936] focus:ring-1 focus:ring-[#652CD1] focus:outline-none caret-white text-[#E5E7EB] placeholder:text-[#A1A1A9]"
          />
        </div>
        <div className="mt-6">
          <Label className="pb-2 text-[#E5E7EB]">Email</Label>
          <Input
            name="email"
            control={control}
            value={formData.personalInfo.email}
            rules={{
              required: "Email is Requerid",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email is invalided",
              },
            }}
            className="py-4 border border-[#A1A1A9] bg-[#212936] focus:ring-1 focus:ring-[#652CD1] focus:outline-none caret-white text-[#E5E7EB] placeholder:text-[#A1A1A9]"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mt-9 flex items-center justify-center">
          <Button
            className="px-7 py-3 rounded-full bg-[#845EEE] text-white hover:bg-[#652CD1]"
            type="submit"
          >
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
}
