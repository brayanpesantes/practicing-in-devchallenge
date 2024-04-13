import { useCountries } from "@/context/CountriesContext";
import CountryRow from "./CountryRow";

export default function CountryTable() {
  const { countries } = useCountries();

  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table className="w-full">
        <thead className="">
          <tr className="text-[#6C727F] text-start text-[12px] font-medium border-b-2 border-[#282B30]">
            <th scope="col" className="pb-4 text-start">
              Flag
            </th>
            <th scope="col" className="pb-4 text-start">
              Name
            </th>
            <th scope="col" className="pb-4 text-start">
              Population
            </th>
            <th scope="col" className="pb-4 text-start">
              Area (Km<sup>2</sup>)
            </th>
            <th scope="col">Region</th>
          </tr>
        </thead>
        <tbody className="">
          {countries.map((country, index) => (
            <CountryRow
              key={`${country.name.common}-${index}`}
              country={country}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
