import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "./Logo";
type Props = {
  readonly generator: () => void;
  readonly handleInputChange: (url: string) => void;
};
type formData = {
  url: string;
};
export default function Input({ generator, handleInputChange }: Props) {
  const { register, handleSubmit } = useForm<formData>();
  const onSubmit: SubmitHandler<formData> = (data) => {
    handleInputChange(data.url);
    generator();
  };

  return (
    <div className="h-full w-full  items-center justify-center min-h-screen flex flex-col">
      <div className="">
        <Logo />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 md:px-0">
        <div className="mt-8 w-[300px] sm:w-[380px]  md:w-[608px] h-[66px] relative">
          <input
            type="text"
            className="absolute inset-0 rounded-2xl border-none ring-2 ring-[#3662E3] focus:ring-2 focus:ring-[#F2F5F9] bg-[#111729] placeholder:text-[#4e80ee33] text-[#F2F5F9] py-2 ps-8 text-base pe-36 md:pe-40"
            placeholder="Enter an url"
            {...register("url", { required: true })}
          />
          <button className="px-5 md:px-10 py-2 h-[calc(66px-16px)] bg-[#3662E3] text-white absolute right-2 top-2 text-base rounded-2xl">
            QR code
          </button>
        </div>
      </form>
    </div>
  );
}
