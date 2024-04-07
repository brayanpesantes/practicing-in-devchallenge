"use client";
import { useTranslateContext } from "@/context/TranslateContext";
import ButtonIcon from "./ButtonIcon";
import Card from "./Card";
import IconCopy from "./IconCopy";
import IconShortAlpha from "./IconShortAlpha";
import IconSound from "./IconSound";

export default function InputSection() {
  const { query, setQuery, handleTranslate } = useTranslateContext();
  return (
    <Card className="bg-[#212936]/90 ">
      <div className="space-x-3 pb-4 border-b border-[#4D5562]">
        <button className="bg-[#121826cc]  px-3 py-1.5 rounded-lg text-[#F9FAFB] text-sm font-bold">
          Detect Language
        </button>
        <button className="text-[#4D5562] text-sm font-bold px-3 py-1.5">
          English
        </button>
        <button className="text-[#4D5562] text-sm font-bold px-3 py-1.5">
          French
        </button>
        <button className="text-[#4D5562] text-sm font-bold px-3 py-1.5">
          Spanish
        </button>
      </div>
      <div className="mt-6 w-full">
        <textarea
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          maxLength={500}
          className="form-textarea  w-full h-48 bg-transparent border-none resize-none rounded-xl text-[#F9FAFB] text-base font-bold  focus:ring-1 focus:ring-[#4D5562]"
          autoFocus={true}
        ></textarea>
      </div>
      <div className="flex mt-3 items-center justify-between ">
        <div className="flex gap-2 self-end">
          <ButtonIcon icon={<IconSound />} />
          <ButtonIcon icon={<IconCopy />} />
        </div>
        <div className="">
          <button
            className="px-6 py-3 bg-[#3662E3] ring-1 rin-[#7CA9F3] text-[#F9FAFB] rounded-xl flex items-center justify-center gap-x-3 text-base font-bold"
            onClick={handleTranslate}
          >
            <IconShortAlpha /> Translate
          </button>
        </div>
      </div>
    </Card>
  );
}
