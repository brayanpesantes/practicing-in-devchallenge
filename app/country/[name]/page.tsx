/* eslint-disable @next/next/no-img-element */
"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Country } from "@/types/country";

export default function NamePage({ params }: { params: { name: string } }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [borders, setBorders] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  const getCountry = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${params.name}`
      );
      const data = await response.json();
      const countryData = data[0];
      setCountry(countryData);

      const codes = countryData.borders;
      if (codes && codes.length > 0) {
        const bordersResponse = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}`
        );
        const bordersData = await bordersResponse.json();
        setBorders(bordersData);
      } else {
        setBorders([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params.name]);

  useEffect(() => {
    getCountry();
  }, [getCountry]);

  if (loading) return <p>Cargando...</p>;
  if (!country) return <p>No se encontró el país</p>;

  return (
    <div className="max-w-screen-xl min-h-screen bg-[#282B30] pb-20 font-beVietnamPro">
      <Hero />
      <div className="bg-[#282B30] shadow-lg border border-[#6C727F] max-w-screen-sm mx-auto  rounded-lg -mt-20">
        <div className="flex flex-col justify-center items-center">
          <img
            src={country?.flags?.png}
            alt={`${country?.name?.common} flag`}
            className="h-[196px] w-[260px] -mt-10"
          />
          <h1 className="text-[#D2D5DA] text-3xl mt-8">
            {country?.name?.common}
          </h1>
          <p className="text-[#D2D5DA] text-base font-medium mt-2">
            {country?.name?.official}
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
            <div className="bg-[#6C727F] py-2.5 px-4 rounded-lg text-[#D2D5DA] space-x-3">
              <span>Population</span>
              <span>|</span>
              <span>{country?.population.toLocaleString()}</span>
            </div>
            <div className="bg-[#6C727F] py-2.5 px-4 rounded-lg text-[#D2D5DA] space-x-3">
              <span>
                Area (km<sup>2</sup>)
              </span>
              <span>|</span>
              <span>{country?.area.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pb-10">
          <ul className="divide-y *:flex *:justify-between *:px-4 *:py-5">
            <li>
              <span className="text-[#6C727F]">Capital</span>
              <span className="text-[#D2D5DA]">{country?.capital}</span>
            </li>
            <li>
              <span className="text-[#6C727F]">Subregion</span>
              <span className="text-[#D2D5DA]">{country?.subregion}</span>
            </li>
            <li>
              <span className="text-[#6C727F]">Language</span>
              <span className="text-[#D2D5DA]">
                {country?.languages &&
                  Object.entries(country?.languages)
                    .map(([_, value]) => value)
                    .join(", ")}
              </span>
            </li>
            <li>
              <span className="text-[#6C727F]">Currencies</span>
              <span className="text-[#D2D5DA]">
                {country?.currencies &&
                  Object.entries(country?.currencies)
                    .map(([_, value]) => value.name)
                    .join(", ")}
              </span>
            </li>
            <li>
              <span className="text-[#6C727F]">Continents</span>
              <span className="text-[#D2D5DA]">
                {country?.continents && country.continents.join(", ")}
              </span>
            </li>
            <li>
              <div className="">
                <h3 className="text-[#6C727F]">Neighbouring Countries</h3>
                <div className="flex flex-row gap-4 flex-wrap">
                  {borders.map((country) => (
                    <div
                      className="mt-4 flex-col flex gap-2"
                      key={country.name.common}
                    >
                      <img
                        src={country.flags.png}
                        alt=""
                        className="h-[60px] w-[84px]"
                      />
                      <p className="text-center text-[#D2D5DA]">
                        {country.name.common}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
