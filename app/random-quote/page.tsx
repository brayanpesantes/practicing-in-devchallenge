"use client";

import { useCallback, useEffect, useState } from "react";

export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export default function RandomQuotePage() {
  const [quote, setQuote] = useState<Quote>();
  const [copy, setCopy] = useState(false);
  const getRandomQuote = useCallback(async () => {
    await fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  const copyClipboard = (quote: string | undefined) => {
    if (quote === undefined) return;

    navigator.clipboard
      .writeText(quote)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 500);
      })
      .catch((error) => alert(error?.message));
  };
  return (
    <div className="max-w-screen-xl min-h-screen bg-[#111729] flex flex-col items-center justify-center px-4 md:px-0">
      <div className="px-8 pt-8 pb-10 bg-[#20293A] rounded-xl md:w-[546px] bg-quote bg-cover bg-left">
        <h1 className="text-base font-bold text-[#97A3B6] text-center">
          {quote?.author}
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          {quote?.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[#6466E9] border border-[#6466E9] rounded-full py-1 px-3 text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-2xl text-center  text-[#4A5567]">
            &#10077; {quote?.content} &#10078;
          </p>
        </div>
      </div>
      <div className="mt-4 group transition-all duration-300 ease-in-out">
        <button
          className="px-3 py-2 border-y-2 border-l-2 rounded-l-xl border-[#4A5567] group-hover:border-[#6466E9]"
          onClick={() => getRandomQuote()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 15.2L2.29289 14.4929L1.58579 15.2L2.29289 15.9071L3 15.2ZM9.8 15.2L9.8 16.2L9.8 15.2ZM14.8 11.2C14.8 10.6477 14.3523 10.2 13.8 10.2C13.2477 10.2 12.8 10.6477 12.8 11.2L14.8 11.2ZM6.29289 10.4929L2.29289 14.4929L3.70711 15.9071L7.70711 11.9071L6.29289 10.4929ZM2.29289 15.9071L6.29289 19.9071L7.70711 18.4929L3.70711 14.4929L2.29289 15.9071ZM3 16.2L9.8 16.2L9.8 14.2L3 14.2L3 16.2ZM9.8 16.2C12.5614 16.2 14.8 13.9614 14.8 11.2L12.8 11.2C12.8 12.8569 11.4569 14.2 9.8 14.2L9.8 16.2Z"
              fill="#4A5567"
            />
            <path
              d="M21.5 8.8L22.2071 9.50711L22.9142 8.80001L22.2071 8.0929L21.5 8.8ZM14.2 8.80001L14.2 9.80001L14.2 9.80001L14.2 8.80001ZM9.20001 12.8C9.20001 13.3523 9.64773 13.8 10.2 13.8C10.7523 13.8 11.2 13.3523 11.2 12.8L9.20001 12.8ZM18.2071 13.5071L22.2071 9.50711L20.7929 8.0929L16.7929 12.0929L18.2071 13.5071ZM22.2071 8.0929L18.2071 4.0929L16.7929 5.50711L20.7929 9.50711L22.2071 8.0929ZM21.5 7.8L14.2 7.80001L14.2 9.80001L21.5 9.8L21.5 7.8ZM14.2 7.80001C11.4386 7.80002 9.20001 10.0386 9.20001 12.8L11.2 12.8C11.2 11.1432 12.5432 9.80002 14.2 9.80001L14.2 7.80001Z"
              fill="#4A5567"
            />
          </svg>
        </button>
        <button
          className="px-3 py-2 border-y-2 border-l-2 border-r-2 rounded-r-xl border-[#4A5567] group-hover:border-[#6466E9]"
          onClick={() => copyClipboard(quote?.content)}
        >
          {copy ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#6466E9]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 16H7C4.79086 16 3 14.2091 3 12V12C3 9.79086 4.79086 8 7 8H10"
                stroke="#4A5567"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 12H8"
                stroke="#4A5567"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 16H17C19.2091 16 21 14.2091 21 12V12C21 9.79086 19.2091 8 17 8H14"
                stroke="#4A5567"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
