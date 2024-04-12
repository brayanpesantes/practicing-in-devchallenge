type Props = {
  name: string;
  label: string | number;
};
export default function InfoButton({ label, name }: Props) {
  return (
    <div className="bg-[#111729] rounded-xl flex items-center">
      <div className="px-5 py-4 text-[#4A5567] text-[12px] font-bold ">
        {name}
      </div>
      <hr className=" my-auto h-9 w-0 block border-r border-[#4A5567] overflow-hidden" />
      <div className="px-5 py-4 text-[#CDD5E0] text-[12px] font-bold">
        {label}
      </div>
    </div>
  );
}
