/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import NoteCodeLogo from "../../images/NoteCodeLogo.svg";
import Editor from "@monaco-editor/react";
import cn from "@/utils/cn";

export default function Content() {
  const [language, setLanguage] = useState("html");
  const [mode, setMode] = useState("light");

  return (
    <div className="max-w-screen-md mx-auto h-auto pb-20">
      <div className="flex items-center justify-center">
        <img src={NoteCodeLogo.src} alt="logo note code" className="pt-10" />
      </div>
      <h1 className="mt-9 text-center text-[#121826] text-[32px] font-semibold">
        Create & Share
      </h1>
      <h2 className="mt-3 text-center text-[#121826] text-[40px] font-semibold">
        Your Code easily
      </h2>
      <div
        className={cn("mt-9 relative bg-white border border-black ", {
          "bg-gray-900": mode === "vs-dark",
        })}
      >
        <Editor
          height={400}
          defaultLanguage={"html"}
          language={language}
          theme={mode}
          defaultValue="// some comment"
          className="w-full max-h-[400px] overflow-auto"
        />
        <div className="mt-10 flex  justify-between items-center p-4">
          <div className="flex gap-3">
            <select
              name=""
              id=""
              className="form-select"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="html">Html</option>
              <option value="javascript">javascript</option>
              <option value="typescript">typescript</option>
            </select>
            <select
              name=""
              id=""
              className="form-select"
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="light">light</option>
              <option value="vs-dark">dark</option>
            </select>
          </div>
          <button className="bg-[#406AFF] text-[#FFFFFE]">Share</button>
        </div>
      </div>
    </div>
  );
}
