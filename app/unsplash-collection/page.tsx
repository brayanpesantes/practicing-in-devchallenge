"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputSearch from "./components/InputSearch";
import Navbar from "./components/Navbar";

export default function UnsplashCollectionPage() {
  const [query, setQuery] = useState<string>("");
  const route = useRouter();

  const handleSearch = (value: string) => {
    setQuery(value);
    route.push(`/unsplash-collection?query=${query}`);
  };
  const handleSubmit = () => {
    route.replace(`/unsplash-collection/search?query=${query}`);
  };

  return (
    <div className="font-beVietnamPro  max-w-screen-xl mx-auto h-screen">
      <Navbar />
      <div className="bg-collection w-full h-[calc(100%-185px)] bg-center bg-cover bg-no-repeat">
        <div className="my-16">
          <div className="flex flex-col items-center justify-center pt-[95px]">
            <h1 className="text-4xl font-semibold text-[#121826]">Search</h1>
            <p className="mt-2 text-sm font-light text-[#121826]">
              Search high-resolution images from Unsplash
            </p>
            <InputSearch
              className="mt-6"
              onSearch={handleSearch}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
