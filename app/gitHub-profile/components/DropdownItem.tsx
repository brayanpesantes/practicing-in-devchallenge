/* eslint-disable @next/next/no-img-element */
interface DropdownItemProps {
  readonly name: string | null;
  readonly description: string | null;
  readonly image_url: string;
  readonly handleData: () => void;
  readonly handleClose: () => void;
}
export default function DropdownItem({
  name,
  description,
  image_url,
  handleData,
  handleClose,
}: DropdownItemProps) {
  return (
    <button
      className="flex gap-x-3 cursor-pointer"
      onClick={() => {
        handleData();
        handleClose();
      }}
    >
      <img src={image_url} alt="logo" className="size-[75px] " />
      <div className="my-auto">
        <h1 className="text-[#CDD5E0] text-[20px]">{name}</h1>
        <p className="text-[#4A5567] text-xs">{description}</p>
      </div>
    </button>
  );
}
