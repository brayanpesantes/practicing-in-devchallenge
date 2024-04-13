import { Question } from "@/types/quiz";
import Button from "./Button";
import IconCorrect from "./IconCorrect";
import IconIncorrect from "./IconIncorrect";

interface QuestionCardProps {
  readonly question: Question;
  readonly options: string[];
  readonly currentAnswer: string;
  readonly handleOptionClick: (
    selectedOption: string,
    correctAnswer: string
  ) => void;
}

export default function QuestionCard({
  question,
  options,
  currentAnswer,
  handleOptionClick,
}: QuestionCardProps) {
  return (
    <div>
      <h2 className="mt-8 text-center text-[#E2E4F3] text-2xl font-medium">
        {question.question}
      </h2>
      <div className="grid grid-cols-2 gap-6 mt-10">
        {options.map((option, index) => {
          const isCorrectOption = question.correctAnswer === option;
          const isSelectedOption = currentAnswer === option;

          return (
            <Button
              key={`${option}-${index}`}
              onClick={() => handleOptionClick(option, question.correctAnswer)}
              disabled={currentAnswer !== ""}
              className={`${
                isSelectedOption
                  ? "bg-gradient-to-r from-[#E65895] to-[#BC6BE8]"
                  : ""
              } flex flex-row items-center justify-center gap-2`}
            >
              {option}
              {isSelectedOption && (
                <>{isCorrectOption ? <IconCorrect /> : <IconIncorrect />}</>
              )}
              {currentAnswer !== "" && isCorrectOption && !isSelectedOption && (
                <IconCorrect />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
