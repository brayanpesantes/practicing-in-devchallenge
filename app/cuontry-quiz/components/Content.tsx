/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useQuestions } from "../hooks/useQuestions";
import Card from "./Card";
import QuizProgress from "./QuizProgress";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";

export default function Content() {
  const { questions } = useQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const handleOptionClick = (selectedOption: string, correctAnswer: string) => {
    if (selectedOption === correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setSelectedOption(selectedOption);
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    }, 2000);
  };

  const startGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setCorrectAnswers(0);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {currentQuestionIndex < questions.length ? (
        <Card>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-[#8B8EAB] text-xl font-semibold">
              Country Quiz
            </h1>
            <QuizProgress
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />
            <QuestionCard
              question={questions[currentQuestionIndex]}
              options={questions[currentQuestionIndex].options}
              currentAnswer={selectedOption}
              handleOptionClick={handleOptionClick}
            />
          </div>
        </Card>
      ) : (
        <QuizResult
          correctAnswers={correctAnswers}
          totalQuestions={questions.length}
          startGame={startGame}
        />
      )}
    </div>
  );
}
