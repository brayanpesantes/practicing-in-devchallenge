"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import ImageLogo from "../images/Word Scramblle.svg";
import cn from "@/utils/cn";
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

  const inputsRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentInput, setCurrentInput] = useState<number>(0);
  const [tries, setTries] = useState<number>(0);
  const [scrambledWord, setScrambledWord] = useState<string>("");
  const [inputs, setInputs] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrambleWord = (word: string) => {
    const scrambledWord = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return scrambledWord;
  };

  const generateInputs = (wordLength: number) => {
    const newInputs = Array(wordLength).fill("");
    setInputs(newInputs);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const letter = e.target.value.toLowerCase();
    const regex = /[a-z]/;
    if (regex.test(letter)) {
      if (letter === currentWord[index]) {
        e.target.classList.remove("text-red-500");
        const nextIndex = index + 1;
        setCurrentInput(nextIndex);
        if (nextIndex === currentWord.length) {
          alert("🎉 success");
          startGame();
        } else {
          inputsRefs.current[nextIndex]?.focus();
        }
      } else {
        e.target.classList.add("text-red-500");
        setTries(tries + 1);
        setMistakes([...mistakes, letter]);

        if (tries === 5) {
          alert("Please Rest");
          resetGame();
        }
      }
    } else {
      e.target.value = "";
    }
  };

  const startGame = () => {
    inputsRefs.current.forEach((inputRef) => {
      if (inputRef) {
        inputRef.value = "";
      }
    });

    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex].toLowerCase();
    setCurrentWord(randomWord);
    const scrambledWord = scrambleWord(randomWord);
    setScrambledWord(scrambledWord);
    generateInputs(randomWord.length);
  };

  const resetGame = () => {
    setCurrentInput(0);
    setCurrentWord("");
    setScrambledWord("");
    setTries(0);
    setMistakes([]);
    startGame();
  };

  return (
    <div className="max-w-screen-xl h-screen font-outfit flex items-center justify-center mx-auto">
      <div className=" bg-[#030616] px-[26px] py-6 rounded-xl w-[416px]">
        <div className=" flex items-center justify-center">
          <Image
            src={ImageLogo}
            alt="logo"
            className="h-6 w-auto "
            height={24}
            priority
          />
        </div>
        <div className="bg-[#4A5567] py-3 rounded-lg my-6 w-full">
          <p className="font-medium text-[#97A3B6]  text-[26px] md:text-[32px] text-center tracking-[1rem] min-h-12">
            {scrambledWord}
          </p>
        </div>
        <div className="text-[#F2F5F9] text-xs">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <p> tries({tries}/5):</p>
              <div className="inline-flex gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span
                    className={cn([
                      "size-2 rounded-full bg-[#4A5567] ",
                      {
                        "bg-[#7429C6]": tries > index,
                      },
                    ])}
                    key={`trie-${index}`}
                  ></span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <p>Mistakes:</p>
              <div className="inline-flex gap-2">
                <p>{mistakes.join(", ")}</p>
              </div>
            </div>
          </div>
          <div className="py-[52px] flex flex-wrap items-center justify-center gap-2.5">
            {inputs.map((input, index) => (
              <input
                key={`input-${index}`}
                onChange={(e) => handleOnChange(e, index)}
                autoFocus={index === currentInput}
                maxLength={1}
                ref={(el) => {
                  if (el) {
                    inputsRefs.current[index] = el;
                  } else {
                    inputsRefs.current[index] = null;
                  }
                }}
                type="text"
                className="size-11 bg-transparent rounded-lg border-none ring-2 ring-[#4A5567] font-medium focus:ring-[#672171] focus:ring-2 text-[20px] text-center px-3 "
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
