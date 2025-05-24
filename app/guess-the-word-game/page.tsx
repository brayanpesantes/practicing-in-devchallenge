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
  const [scrambledWord, setScrambledWord] = useState<string>("");
  const [inputs, setInputs] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [player1Tries, setPlayer1Tries] = useState<number>(0);
  const [player2Tries, setPlayer2Tries] = useState<number>(0);
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
          // Word guessed correctly
          if (currentPlayer === 1) {
            setPlayer1Score(player1Score + 10);
          } else {
            setPlayer2Score(player2Score + 10);
          }
          alert(`Player ${currentPlayer}, you guessed the word!`);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          startGame();
        } else {
          inputsRefs.current[nextIndex]?.focus();
        }
      } else {
        e.target.classList.add("text-red-500");
        // Update tries for the current player
        if (currentPlayer === 1) {
          setPlayer1Tries(player1Tries + 1);
        } else {
          setPlayer2Tries(player2Tries + 1);
        }
        setMistakes([...mistakes, letter]);

        // Check tries based on current player
        const currentTries = currentPlayer === 1 ? player1Tries : player2Tries;
        if (currentTries >= 5) { // Check if tries have reached max (5)
          alert(`Player ${currentPlayer}, you've run out of tries!`);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          startGame();
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
    setCurrentInput(0); // Reset current input focus
    setMistakes([]); // Reset mistakes for the new turn/word

    // Reset tries for the current player
    if (currentPlayer === 1) {
      setPlayer1Tries(0);
    } else {
      setPlayer2Tries(0);
    }

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
    setPlayer1Tries(0);
    setPlayer2Tries(0);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setMistakes([]);
    setCurrentPlayer(1); // Set current player to 1 before starting
    // startGame will be called, and it will use currentPlayer = 1
    // and reset player 1's tries.
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
        {/* Player Turn and Scores Display */}
        <div className="text-center my-4 text-[#F2F5F9]">
          <p className="text-xl font-semibold">Player {currentPlayer}'s Turn</p>
          <div className="flex justify-around mt-2 text-lg">
            <p>Player 1 Score: {player1Score}</p>
            <p>Player 2 Score: {player2Score}</p>
          </div>
        </div>
        <div className="bg-[#4A5567] py-3 rounded-lg my-6 w-full">
          <p className="font-medium text-[#97A3B6]  text-[26px] md:text-[32px] text-center tracking-[1rem] min-h-12">
            {scrambledWord}
          </p>
        </div>
        <div className="text-[#F2F5F9] text-xs">
          <div className="flex justify-between">
            {/* Display tries based on current player - Already updated in previous step, verifying placement and clarity */}
            <div className="flex gap-3 items-center">
              <p>
                P{currentPlayer} Tries (
                {currentPlayer === 1 ? player1Tries : player2Tries}/5):
              </p>
              <div className="inline-flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => ( // Changed length to 5 to match max tries
                  <span
                    className={cn([
                      "size-2 rounded-full bg-[#4A5567]",
                      {
                        "bg-[#7429C6]":
                          (currentPlayer === 1 ? player1Tries : player2Tries) >
                          index,
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
