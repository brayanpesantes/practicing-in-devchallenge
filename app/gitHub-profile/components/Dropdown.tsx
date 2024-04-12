import DropdownItem from "./DropdownItem";
interface DropdownProps {
  readonly results: any;
  readonly handleData: () => void;
  readonly handleClose: () => void;
}
export default function Dropdown({
  results,
  handleData,
  handleClose,
}: DropdownProps) {
  return (
    <div className="text-white mt-2 w-full bg-[#20293A] px-2 rounded-md py-2 overflow-hidden ">
      <div className="flex flex-col overflow-y-auto gap-4 divide-y max-h-72">
        <DropdownItem
          name={results?.name}
          description={results?.bio}
          image_url={results?.avatar_url}
          handleData={handleData}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
