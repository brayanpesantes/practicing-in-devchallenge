/* eslint-disable @next/next/no-img-element */
import { Country } from "../types";

interface CountryRowProps {
  readonly country: Country;
}

export default function CountryRow({ country }: CountryRowProps) {
  return (
    <tr className="text-sm font-bold text-[#D2D5DA] ">
      <td className="py-3">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-[50px] h-[38px]"
        />
      </td>
      <td className="w-48">{country.name.common}</td>
      <td>{country.population}</td>
      <td>{country.area}</td>
      <td>{country.region}</td>
    </tr>
  );
}
