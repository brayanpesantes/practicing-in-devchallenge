"use client";
import { useTranslateContext } from "@/context/TranslateContext";
import ButtonIcon from "./ButtonIcon";
import Card from "./Card";
import IconCopy from "./IconCopy";
import IconHorizontalMain from "./IconHorizontalMain";
import IconSound from "./IconSound";

export default function OutputSection() {
  const { translatedText } = useTranslateContext();
  return (
    <Card className="bg-[#121826]/90">
      <div className="pb-4 border-b border-[#4D5562] flex items-center justify-between">
        <div className="space-x-3">
          <button className="text-[#F9FAFB] rounded-lg bg-[#121826cc] text-sm font-bold px-3 py-1.5">
            English
          </button>
          <button className="text-[#4D5562] text-sm font-bold px-3 py-1.5">
            French
          </button>
          <button className="text-[#4D5562] text-sm font-bold px-3 py-1.5">
            Spanish
          </button>
        </div>
        <ButtonIcon icon={<IconHorizontalMain />} className="px-1.5" />
      </div>
      <div className="mt-6 w-full">
        <div className="form-textarea  w-full h-48 bg-transparent border-none resize-none rounded-xl text-[#F9FAFB] text-base font-bold  focus:ring-1 focus:ring-[#4D5562]">
          <p>{translatedText}</p>
        </div>
      </div>
      <div className="flex mt-3 items-center gap-2 ">
        <ButtonIcon icon={<IconSound />} />
        <ButtonIcon icon={<IconCopy />} />
      </div>
    </Card>
  );
}
