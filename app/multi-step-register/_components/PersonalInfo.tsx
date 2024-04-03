"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "./Card";

type Inputs = {
  name: string;
  email: string;
};

export default function PersonalInfo() {
  const { control, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data));

  return (
    <Card>
      <h1 className="text-[#E5E7EB] text-xl">Register</h1>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <Label className="pb-2 text-[#E5E7EB]">Name</Label>
          <Input
            name="name"
            placeholder="name"
            control={control}
            className="py-4 border outline-none  border-[#A1A1A9] bg-[#212936] focus:ring-1 focus:ring-[#652CD1] focus:outline-none caret-white text-[#E5E7EB] placeholder:text-[#A1A1A9]"
          />
        </div>
        <div className="mt-6">
          <Label className="pb-2 text-[#E5E7EB]">Email</Label>
          <Input
            name="email"
            control={control}
            className="py-4 border border-[#A1A1A9] bg-[#212936] focus:ring-1 focus:ring-[#652CD1] focus:outline-none caret-white text-[#E5E7EB] placeholder:text-[#A1A1A9]"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mt-9">
          <button>Coutinue</button>
        </div>
      </form>
    </Card>
  );
}
