/* eslint-disable @next/next/no-img-element */
import Card from "./Card";
import Button from "./Button";
import bgCardFinish from "../../images/congrats.svg";

interface QuizResultProps {
  readonly correctAnswers: number;
  readonly totalQuestions: number;
  readonly startGame: () => void;
}

export default function QuizResult({
  correctAnswers,
  totalQuestions,
  startGame,
}: QuizResultProps) {
  return (
    <Card>
      <div className="text-center">
        <img src={bgCardFinish.src} alt="image" />
        <h1 className="text-2xl text-[#E2E4F3] font-medium mt-3">
          Congrats! You completed the quiz.
        </h1>
        <p className="mt-4 text-[#E2E4F3]">
          You answer {correctAnswers}/{totalQuestions} correctly.
        </p>
        <Button className="mt-12" onClick={startGame}>
          Play again
        </Button>
      </div>
    </Card>
  );
}
