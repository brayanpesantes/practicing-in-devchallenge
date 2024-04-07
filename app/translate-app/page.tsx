/* eslint-disable @next/next/no-img-element */
import { TranslateProvider } from "@/context/TranslateContext";
import Container from "./components/Container";

export default function TranslateAppPage() {
  return (
    <TranslateProvider>
      <div className="flex gap-10 justify-center bg-language max-w-screen-xl min-h-screen bg-cover bg-no-repeat bg-center items-center">
        {/* <img src={ImageLogo} alt="logo" /> */}
        <Container />
      </div>
    </TranslateProvider>
  );
}
