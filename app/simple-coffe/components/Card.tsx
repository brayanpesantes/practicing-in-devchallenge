/* eslint-disable @next/next/no-img-element */
import { Coffe } from "../page";
import { IconRatingSolid } from "./IconRatingSolid";
import { IconRatingOutline } from "./IconRatingOutline";

type Props = {
  readonly coffe: Coffe;
};

export default function Card({ coffe }: Props) {
  return (
    <div className="min-w-64">
      <div className="overflow-hidden rounded-xl">
        <img
          src={coffe.image}
          alt={coffe.name}
          className="rounded-xl object-cover w-full h-auto hover:scale-110 transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-[#FEF7EE]">{coffe.name}</h3>
          <span className="text-[12px] bg-[#BEE3CC] rounded-sm  px-2 py-0.5 font-bold text-[#111315]">
            {coffe.price}
          </span>
        </div>
        <div className="text-[10px] mt-3">
          {coffe.rating ? (
            <div className="flex justify-between items-center">
              <div className="flex gap-1.5 items-center">
                <span className="text-yellow-500">
                  <IconRatingSolid />
                </span>
                <div className="inline-flex gap-0.5 items-center">
                  <span className="text-[#FEF7EE] font-bold">
                    {coffe.rating}
                  </span>
                  <span className="text-[#6F757C]">({coffe.votes} votes)</span>
                </div>
              </div>
              {!coffe.available && (
                <span className="text-[#ED735D]">Sold out</span>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-[#6F757C] inline-flex gap-2 items-center">
                <IconRatingOutline />
                No rating
              </span>
              {!coffe.available && (
                <span className="text-[#ED735D]">Sold out</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
