import cn from "@/utils/cn";

interface QuizProgressProps {
  readonly currentIndex: number;
  readonly totalQuestions: number;
}
export default function QuizProgress({
  currentIndex,
  totalQuestions,
}: QuizProgressProps) {
  return (
    <div className="flex md:flex-row  gap-3 mt-4 flex-wrap">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <div
          key={i}
          className={cn(
            "size-11 rounded-full bg-[#393F6E] text-[#E2E4F3] flex items-center justify-center text-sm font-bold",
            {
              "bg-gradient-to-r from-[#E65895] to-[#BC6BE8]":
                i === currentIndex,
            },
            {
              "bg-gradient-to-r from-[#E65895] to-[#BC6BE8]": i < currentIndex,
            }
          )}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
