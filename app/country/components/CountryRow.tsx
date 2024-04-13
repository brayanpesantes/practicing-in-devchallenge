/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Country } from "@/types/country";

interface CountryRowProps {
  readonly country: Country;
}

export default function CountryRow({ country }: CountryRowProps) {
  return (
    <tr className="text-sm font-bold text-[#D2D5DA] hover:bg-black/5">
      <td className="py-3">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="md:w-10  md:h-7 lg:w-[50px] lg:h-[38px]"
        />
      </td>
      <td className="w-20 md:w-40 lg:w-48">
        <Link href={`/country/${country.name.common}`}>
          {country.name.common}
        </Link>
      </td>
      <td className="w-16 md:w-auto">{country.population.toLocaleString()}</td>
      <td className="w-16 md:w-auto">{country.area.toLocaleString()}</td>
      <td>{country.region}</td>
    </tr>
  );
}
