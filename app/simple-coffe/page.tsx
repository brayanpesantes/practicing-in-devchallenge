"use client";
import React, { useEffect, useState } from "react";
import ListCard from "./components/ListCard";
import cn from "@/utils/cn";

export interface Coffe {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: any;
  votes: number;
  popular: boolean;
  available: boolean;
}

type Filter = "all" | "available";

export default function SimpleCoffePage() {
  const [coffes, setCoffes] = useState<Coffe[]>([]);
  const [showAvailable, setShowAvailable] = useState<boolean>(false);

  const getData = async () => {
    await fetch(
      "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoffes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const filteredCoffes = showAvailable
    ? coffes.filter((coffee) => coffee.available)
    : coffes;

  return (
    <div className="min-h-screen max-w-screen-xl relative bg-[#111315]">
      <div className="bg-cafe h-[300px] bg-cover"></div>
      <div className=" min-h-screen pb-20">
        <div className="font-dmSans  mx-4 sm:mx-24">
          <div className="bg-[#1B1D1F] -mt-40 rounded-2xl py-20 px-4 sm:px-11 lg:px-[88px] xl:px-[124px] max-w-max">
            <div className="text-center">
              <h1 className="text-[#FEF7EE] text-[32px] font-bold">
                Our Collection
              </h1>
              <p className="text-base lg:w-[500px] text-[#6F757C] mt-2 mx-auto">
                Introducing our Coffee Collection, a selection of unique coffees
                from different roast types and origins, expertly roasted in
                small batches and shipped fresh weekly.
              </p>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  className={cn([
                    "px-3 py-2  rounded-lg text-[#FEF7EE] text-base",
                    { "bg-[#6F757C]": !showAvailable },
                  ])}
                  onClick={() => setShowAvailable(false)}
                >
                  All Products
                </button>
                <button
                  className={cn([
                    "px-3 py-2  rounded-lg text-[#FEF7EE] text-base",
                    { "bg-[#6F757C]": showAvailable },
                  ])}
                  onClick={() => setShowAvailable(true)}
                >
                  Available Now
                </button>
              </div>
            </div>
            <div className="mt-10">
              <ListCard coffes={filteredCoffes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
