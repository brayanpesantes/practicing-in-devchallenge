/* eslint-disable @next/next/no-img-element */
"use client";
import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import IconCorrect from "./IconCorrect";
import IconIncorrect from "./IconIncorrect";

import bgCardFinish from "../../images/congrats.svg";

interface Country {
  name: string;
  capital: string;
  region: string;
  subregion: string;
}
type CountryAttribute = keyof Country;
export default function Content() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; correctAnswer: string }[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  async function fetchData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const transformedData: Country[] = data.map((country: any) => ({
        name: country.name.common,
        capital: country?.capital?.join(", "),
        region: country.region,
        subregion: country.subregion,
      }));
      setCountries(transformedData);
      generateQuestions(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    startGame();
  }, []);

  const generateQuestions = (data: Country[]) => {
    const generatedQuestions: {
      question: string;
      options: string[];
      correctAnswer: string;
    }[] = [];

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const selectedCountry: Country = data[randomIndex];

      const attributeOptions = ["name", "capital", "region", "subregion"];
      const selectedAttribute =
        attributeOptions[Math.floor(Math.random() * attributeOptions.length)];

      const newQuestion = `What is the ${selectedAttribute} of ${selectedCountry.name}?`;
      const correct = selectedCountry[selectedAttribute as CountryAttribute];
      const incorrectOptions = generateIncorrectOptions(
        correct,
        selectedAttribute,
        data
      );

      const allOptions = [correct, ...incorrectOptions];
      const shuffledOptions = shuffleArray(allOptions);

      generatedQuestions.push({
        question: newQuestion,
        options: shuffledOptions,
        correctAnswer: correct,
      });
    }
    setQuestions(generatedQuestions);
  };
  const generateIncorrectOptions = (
    correct: string,
    selectedAttribute: string,
    data: Country[]
  ) => {
    const incorrectOptions: string[] = [];

    while (incorrectOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const country = data[randomIndex];
      const option = country[selectedAttribute as CountryAttribute];

      if (option !== correct && !incorrectOptions.includes(option)) {
        incorrectOptions.push(option);
      }
    }

    return incorrectOptions;
  };
  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleOptionClick = (selectedOption: string, correct: string) => {
    if (selectedOption === correct) {
      setCorrectAnswer((prev) => prev + 1);
    }

    setSelectedOption(selectedOption);
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    }, 2000);
  };
  const startGame = () => {
    fetchData();
    setSelectedOption("");
    setCurrentQuestionIndex(0);
    setCorrectAnswer(0);
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {currentQuestionIndex < questions.length ? (
        <Card>
          <div className="">
            <h1 className="text-center text-[#8B8EAB] text-xl font-semibold">
              Country Quiz
            </h1>

            <div className="flex flex-row gap-x-3 mt-4">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "size-11 rounded-full bg-[#393F6E] text-[#E2E4F3] flex items-center justify-center text-sm font-bold",
                    {
                      "bg-gradient-to-r from-[#E65895] to-[#BC6BE8]":
                        i === currentQuestionIndex,
                    },
                    {
                      "bg-gradient-to-r from-[#E65895] to-[#BC6BE8]":
                        i < currentQuestionIndex,
                    }
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <h2 className="mt-8 text-center text-[#E2E4F3] text-2xl font-medium">
              {questions[currentQuestionIndex]?.question}
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-10">
              {questions[currentQuestionIndex]?.options?.map(
                (option, index) => {
                  const isCorrectOption =
                    questions[currentQuestionIndex].correctAnswer === option &&
                    selectedOption !== "";
                  const isSelectedOption = selectedOption === option;

                  return (
                    <Button
                      onClick={() =>
                        handleOptionClick(
                          option,
                          questions[currentQuestionIndex].correctAnswer
                        )
                      }
                      key={`${option}-${index}`}
                      disabled={selectedOption !== ""}
                      className={`${
                        selectedOption === option
                          ? "bg-gradient-to-r from-[#E65895] to-[#BC6BE8]"
                          : ""
                      } flex flex-row items-center justify-center gap-2`}
                    >
                      {option}
                      {isSelectedOption && (
                        <>
                          {isCorrectOption ? (
                            <IconCorrect />
                          ) : (
                            <IconIncorrect />
                          )}
                        </>
                      )}
                      {isSelectedOption && isCorrectOption && (
                        <>
                          {questions[currentQuestionIndex].correctAnswer ===
                            option && <IconCorrect />}
                        </>
                      )}
                    </Button>
                  );
                }
              )}
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center">
            <img src={bgCardFinish.src} alt="image" />
            <h1 className="text-2xl text-[#E2E4F3] font-medium mt-3">
              Congrats! You completed the quiz.
            </h1>
            <p className="mt-4 text-[#E2E4F3]">
              You answer {correctAnswer}/10 correctly.
            </p>
            <Button className="mt-12" onClick={startGame}>
              Play again
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
