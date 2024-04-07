"use client";
import { URL_BASE_TRANSLATE } from "@/utils/consts";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type StateUpdater<T> = Dispatch<SetStateAction<T>>;
type InitialContext = {
  query: string;
  setQuery: StateUpdater<string>;
  setTargetLang: StateUpdater<string>;
  translatedText: string;
  handleTranslate: () => void;
};

const TranslateContext = createContext<InitialContext>({
  query: "",
  setQuery: () => {},
  translatedText: "",
  setTargetLang: () => {},
  handleTranslate: () => {},
});

type PropsProvider = {
  readonly children: ReactNode;
};
const getData = async (
  query: string,
  sourceLang: string,
  targetLang: string
) => {
  const URL_ACTIVE = `${URL_BASE_TRANSLATE}?q=${query}!&langpair=${sourceLang}|${targetLang}`;
};

export function TranslateProvider({ children }: PropsProvider) {
  const [query, setQuery] = useState<string>("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState<string>("en");
  const [targetLang, setTargetLang] = useState<string>("fr");

  const handleTranslate = async () => {
    if (!query) {
      setTranslatedText("");
      return;
    }
    try {
      const translation = await getData(query, sourceLang, targetLang);
      console.log(translation);
      setTranslatedText("");
    } catch (error) {
      console.error("Error al traducir:", error);
    }
  };

  const value = {
    query,
    setQuery,
    translatedText,
    setTargetLang,
    handleTranslate,
  };
  return (
    <TranslateContext.Provider value={value}>
      {children}
    </TranslateContext.Provider>
  );
}

export const useTranslateContext = () => useContext(TranslateContext);
