import InputSection from "./InputSection";
import OutputSection from "./OutputSection";

export default function Container() {
  return (
    <div className="flex gap-3 flex-none">
      <InputSection />
      <OutputSection />
    </div>
  );
}
