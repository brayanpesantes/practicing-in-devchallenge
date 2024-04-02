import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";

type Props = {};

export const CardForm = (props: Props) => {
  return (
    <div className="w-full xl:w-[810px] xl:mx-auto pt-10">
      <div className="p-4 md:p-8 mx-6 lg:mx-8 xl:mx-auto flex flex-col gap-6 bg-[#CDD5E0]/20 rounded-xl">
        <div className="flex flex-col lg:flex-row gap-[18px] w-full ">
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Ethan Johnson" />
          </div>
          <div className="w-full">
            <Label htmlFor="name">Company Email</Label>
            <Input id="name" placeholder="ethan@johnson.com" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-[18px] w-full">
          <div className="w-full">
            <Label htmlFor="company-size">Company Size</Label>
            <Select
              id="company-size"
              name="company-size"
              options={[
                { label: "50-100 employees", value: "50-100" },
                { label: "101-150 employees", value: "101-150" },
                { label: "151-200 employees", value: "151-200" },
              ]}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="Subject">Subject</Label>
            <Select
              options={[
                {
                  label: "Building Landing pages",
                  value: "Building Landing pages",
                },
                { label: "Building E-commerce", value: "Building E-commerce" },
                { label: "Building Dashboard", value: "Building Dashboard" },
              ]}
            />
          </div>
        </div>
        <div className="w-full">
          <Label>Message</Label>
          <textarea
            id="message"
            name="message"
            className="mt-1 w-full ps-3 resize-none rounded-xl h-52 placeholder:text-[#111729]"
            placeholder="50-100 employees"
          ></textarea>
        </div>
        <Button>Contact Sales</Button>
      </div>
    </div>
  );
};
