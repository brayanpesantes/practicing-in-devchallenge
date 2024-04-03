import cn from "@/utils/cn";
interface Item {
  id: number;
  label: string;
  checked: boolean;
}

type Props = {
  readonly checkboxes: Item[];
  readonly handleChange: (id: number) => void;
};

export default function Topics({ checkboxes, handleChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {checkboxes.map((checkbox) => (
        <div
          key={checkbox.id}
          className={cn([
            "flex items-center border border-[#A1A1A9] rounded-xl bg-[#394150] text-[#A1A1A9]",
            { "bg-[#652CD1] text-[#E5E7EB]": checkbox.checked === true },
          ])}
        >
          <input
            type="checkbox"
            id={`${checkbox.id}`}
            checked={checkbox.checked}
            onChange={() => handleChange(checkbox.id)}
            className="hidden"
          />
          <label
            htmlFor={`${checkbox.id}`}
            className="mx-2 w-full h-full py-4 cursor-pointer "
          >
            {checkbox.label}
          </label>
        </div>
      ))}
    </div>
  );
}
