import { useCountries } from "@/context/CountriesContext";
import cn from "@/utils/cn";

export default function ListFilters() {
  const {
    handleSortChange,
    status,
    handleCheckboxChange,
    regions,
    handleCheckboxChangeRegions,
  } = useCountries();
  console.log(regions);

  return (
    <aside className="w-[325px] space-y-8">
      <div className="">
        <p className="text-[#6C727F]">Sort by</p>
        <select
          name=""
          id=""
          className="form-select mt-2  text-white ring-2 ring-[#282B30] w-full rounded-lg border-none py-3 px-4 bg-[#1B1D1F]"
          onChange={handleSortChange}
        >
          <option value="population">Population</option>
          <option value="name">Name</option>
          <option value="area">Área</option>
        </select>
      </div>
      <div className="">
        <p className="text-[#6C727F]">Region</p>
        <div
          className="*:px-3 *:py-1.5 *:rounded-full  mt-2 flex gap-3 flex-wrap *:cursor-pointer
        "
        >
          <label
            htmlFor="americas"
            className={cn([
              "text-[#6C727F]",
              { "bg-[#282B30] text-[#D2D5DA]": regions.americas },
            ])}
          >
            <input
              type="checkbox"
              name="americas"
              id="americas"
              className="hidden"
              checked={regions.americas}
              onChange={handleCheckboxChangeRegions}
            />
            <span>Americas</span>
          </label>
          <label
            htmlFor="antarctic"
            className={cn([
              "text-[#6C727F]",
              { "bg-[#282B30] text-[#D2D5DA]": regions.antarctic },
            ])}
          >
            <input
              type="checkbox"
              name="antarctic"
              id="antarctic"
              className="hidden"
              checked={regions.antarctic}
              onChange={handleCheckboxChangeRegions}
            />
            <span>Antarctic</span>
          </label>
          <label
            htmlFor="africa"
            className={cn([
              "text-[#6C727F]",
              { "bg-[#282B30] text-[#D2D5DA]": regions.africa },
            ])}
          >
            <input
              type="checkbox"
              name="africa"
              id="africa"
              className="hidden"
              checked={regions.africa}
              onChange={handleCheckboxChangeRegions}
            />
            <span>Africa</span>
          </label>
          <label
            htmlFor="asia"
            className={cn([
              "text-[#6C727F]",
              { "bg-[#282B30] text-[#D2D5DA]": regions.asia },
            ])}
          >
            <input
              type="checkbox"
              name="asia"
              id="asia"
              className="hidden"
              checked={regions.asia}
              onChange={handleCheckboxChangeRegions}
            />
            <span>Asia</span>
          </label>
          <label
            htmlFor="europe"
            className={cn([
              "text-[#6C727F]",
              { "bg-[#282B30] text-[#D2D5DA]": regions.europe },
            ])}
          >
            <input
              type="checkbox"
              name="europe"
              id="europe"
              className="hidden"
              checked={regions.europe}
              onChange={handleCheckboxChangeRegions}
            />
            <span>Europe</span>
          </label>
        </div>
      </div>
      <div className="">
        <p className="text-[#6C727F]">status</p>
        <label
          htmlFor="status-1"
          className="flex items-center gap-x-2 mt-2 text-white"
        >
          <input
            type="checkbox"
            name="un"
            id="status-1"
            checked={status.un}
            onChange={handleCheckboxChange}
            className="size-6 rounded-md"
          />
          <span> Member of the United Nations</span>
        </label>
        <label
          htmlFor="status-2"
          className="flex items-center gap-x-2 mt-3 text-white"
        >
          <input
            type="checkbox"
            name="independent"
            id="status-2"
            className="size-6 rounded-md"
            checked={status.independent}
            onChange={handleCheckboxChange}
          />
          <span>Independent</span>
        </label>
      </div>
    </aside>
  );
}
