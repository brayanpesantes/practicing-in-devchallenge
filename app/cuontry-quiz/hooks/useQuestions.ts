import { Country, Question } from "@/types/quiz";
import { useState, useEffect } from "react";

export const useQuestions = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const generateQuestions = (data: Country[]) => {
    const generatedQuestions: Question[] = [];

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const selectedCountry = data[randomIndex];

      const attributeOptions: (keyof Country)[] = [
        "name",
        "capital",
        "region",
        "subregion",
      ];
      const selectedAttribute =
        attributeOptions[Math.floor(Math.random() * attributeOptions.length)];

      const newQuestion = `What is the ${selectedAttribute} of ${selectedCountry.name}?`;
      const correct = selectedCountry[selectedAttribute];
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
    selectedAttribute: keyof Country,
    data: Country[]
  ) => {
    const incorrectOptions: string[] = [];

    while (incorrectOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const country = data[randomIndex];
      const option = country[selectedAttribute];

      if (option !== correct && !incorrectOptions.includes(option)) {
        incorrectOptions.push(option);
      }
    }

    return incorrectOptions;
  };
  const shuffleArray = (array: string[]) => {
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

  return { questions, countries };
};
