"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import ImageLogo from "../images/Word Scramblle.svg";
export default function GuessTheWordGame() {
  const words = useMemo(
    () => [
      "cat",
      "airplane",
      "chair",
      "house",
      "mountain",
      "unicorn",
      "beach",
      "strawberry",
      "robot",
      "book",
    ],
    []
  );

  const [word, setWord] = useState<string>("");
  const [scrambledWord, setScrambledWord] = useState<string>("");
  const [inputs, setInputs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentInput, setCurrentInput] = useState<number>(0);
  const inputRefs = useRef<(HTMLElement | null)[]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  const generateInputs = (wordLength: number) => {
    const newInputs = Array(wordLength).fill("");
    setInputs(newInputs);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const letter = e.target.value.toLowerCase();
    if (letter.match(/[a-z]/)) {
      if (letter === currentWord[index]) {
        const nextIndex = index + 1;
        setCurrentIndex(nextIndex);
        if (nextIndex === currentWord.length) {
          alert("🎉 success");
          resetGame();
        } else {
          inputRefs.current[nextIndex]?.focus();
        }
      } else {
        e.target.style.color = "red";
        setAttempts(attempts + 1);
        if (attempts === 5) {
          resetGame();
        }
      }
    } else {
      e.target.value = "";
    }

    // const newInputs = [...inputs];
    // const value = e.target.value.trimStart();

    // if (value.length === 1) {
    //   newInputs[index] = value;
    //   setInputs(newInputs);

    //   if (currentIndex === inputs.length - 1) {
    //     const info: string[] = [...inputs.slice(0, -1), value];

    //     checkWord(info);
    //   }
    //   const nextIndex = index + 1;

    //   if (nextIndex < inputs.length) {
    //     setCurrentIndex(nextIndex);
    //     inputRefs.current[nextIndex]?.focus();
    //   }
    // } else if (value === "") {
    //   newInputs[index] = "";
    //   setInputs(newInputs);
    //   const prevIndex = index - 1;
    //   if (prevIndex >= 0) {
    //     setCurrentIndex(prevIndex);
    //     inputRefs.current[prevIndex]?.focus();
    //   }
    //   inputRefs.current[prevIndex]?.focus();
    // }
  };

  const getRandomWord = () => {
    setInputs([]);
    setCurrentIndex(0);
    setScrambledWord("");
    setWord("");
    inputRefs.current[0]?.focus();
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setWord(randomWord);
    const scrambledWord = randomWord
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setScrambledWord(scrambledWord);
    const inputsLength = Array(scrambledWord.length).fill("");
    setInputs(inputsLength);
  };

  const scrambleWord = (word: string) => {
    const letters = word.split("");
    for (let i = 0; i < letters.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("");
  };

  const resetGame = () => {
    setCurrentWord("");
    setScrambledWord("");
    setInputs([]);
    setCurrentIndex(0);
    setAttempts(0);
    setMistakes([]);
  };

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex].toLowerCase();
    setCurrentWord(randomWord);
    const scrambledWord = scrambleWord(randomWord);
    setScrambledWord(scrambleWord);
    generateInputs(randomWord.length);
  };
  useEffect(() => startGame(), []);

  //   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
  //     if (e.key === " ") {
  //       e.preventDefault();
  //       const nextIndex = index + 1;

  //       if (nextIndex < inputs.length) {
  //         setCurrentIndex(nextIndex);
  //         inputRefs.current[nextIndex]?.focus();
  //       }
  //     }
  //   };
  //   const handleReset = () => {
  //     setInputs([]);
  //     setCurrentIndex(0);
  //     setScrambledWord("");
  //     inputRefs.current[0]?.focus();
  //     setMistakes([]);
  //     setAttempts(0);
  //   };
  //   const checkWord = (typedWord: string[]) => {
  //     console.log(typedWord);

  //     const typeW = typedWord.join("").trim();

  //     if (typeW === word) {
  //       alert("¡Correcto!");
  //       handleReset();
  //     } else {
  //       const firstMismatchIndex = typedWord.findIndex(
  //         (letter, index) => letter !== inputs[index]
  //       );

  //       if (firstMismatchIndex !== -1) {
  //         const newMistakes = [...mistakes];
  //         // Agrega la letra incorrecta al array de errores
  //         newMistakes.push(typedWord[firstMismatchIndex]);
  //         setMistakes(newMistakes);
  //         setAttempts(attempts + 1);
  //         if (attempts >= 5) {
  //           alert(
  //             "Has excedido el número máximo de intentos. Siguiente palabra."
  //           );
  //           getRandomWord();
  //         }
  //       }
  //     }
  //   };
  return (
    <div className="max-w-screen-xl h-screen font-outfit flex items-center justify-center mx-auto">
      <div className="bg-[#030616] px-[26px] py-6 rounded-xl w-[416px]">
        <div className=" flex items-center justify-center">
          <Image src={ImageLogo} alt="logo" className="h-6 w-auto " />
        </div>
        <div className="bg-[#4A5567] py-3 rounded-lg my-6 w-full">
          <p className="font-medium text-[#97A3B6] text-[32px] text-center tracking-[1rem] min-h-12">
            {scrambledWord}
          </p>
        </div>
        <div className="text-[#F2F5F9] text-xs">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <p> tries(4/5):</p>
              <div className="inline-flex gap-2">
                <span className="size-2 rounded-full bg-[#7429C6]"></span>
                <span className="size-2 rounded-full bg-[#7429C6]"></span>
                <span className="size-2 rounded-full bg-[#7429C6]"></span>
                <span className="size-2 rounded-full bg-[#7429C6]"></span>
                <span className="size-2 rounded-full bg-[#7429C6]"></span>
                <span className="size-2 rounded-full bg-[#7429C6]"></span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <p>Mistakes:</p>
              <div className="inline-flex gap-2">
                {mistakes.map((mistake, index) => (
                  <p key={index}>{mistake}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="py-[52px] flex flex-wrap items-center justify-center gap-2.5">
            {inputs.map((input, index) => (
              <input
                key={`input-${index}`}
                value={input}
                onChange={(e) => handleInputChange(e, index)}
                autoFocus={index === currentIndex}
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                className="size-11 bg-transparent rounded-lg border-none ring-2 ring-[#4A5567] font-medium focus:ring-[#672171] focus:ring-2 text-[20px] text-center px-4 "
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-10 pb-2 ">
            <button
              className="bg-[#C951E7] rounded-lg px-9 py-3 text-sm border-b-4 border-[#672171] hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={startGame}
            >
              Random
            </button>
            <button
              className="bg-[#C951E7] rounded-lg px-9 py-3 text-sm border-b-4 border-[#672171] hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={resetGame}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
