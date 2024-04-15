/* eslint-disable @next/next/no-img-element */
"use client";
import cn from "@/utils/cn";
import { DEFAULT_CODE_INITIALIZATION } from "@/utils/codeStateInitial";
import { createClient } from "@/utils/supebase/client";
import Editor from "@monaco-editor/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NoteCodeLogo from "../../images/NoteCodeLogo.svg";
import { IconLink } from "./IconLink";
import { IconShare } from "./IconShare";

export default function Content() {
  const [language, setLanguage] = useState<string>("html");

  const [mode, setMode] = useState("light");
  const [value, setValue] = useState(DEFAULT_CODE_INITIALIZATION);
  const [idCode, setIdCode] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const pathname = usePathname();

  const supebase = createClient();

  const isEditorEmpty = () => {
    return value.trim() === "";
  };
  const shareUrl = async (url: string) => {
    try {
      await navigator.share({
        title: "Compartir URL",
        text: "Mira esta página web",
        url,
      });
    } catch (err) {
      console.error("Error al compartir URL:", err);
    }
  };

  const handleSavedCode = async () => {
    const compressedCode = JSON.stringify(value);
    let rawData;
    if (idCode === "") {
      rawData = { code: compressedCode, theme: mode, language };
    } else {
      rawData = { code: compressedCode, id: idCode, theme: mode, language };
    }
    const { error, data } = await supebase
      .from("share_code")
      .upsert(rawData, { onConflict: "id" })
      .select("id")
      .single();
    if (error) {
      alert("error saving code");
    }
    setIdCode(data?.id);
    setIsButtonEnabled(false);
    const url = window.location.origin + pathname + "/" + data?.id;
    shareUrl(url);
  };

  useEffect(() => {
    const handleEditorChange = () => {
      setIsButtonEnabled(!isEditorEmpty());
    };
    window.addEventListener("keydown", handleEditorChange);
    window.addEventListener("keyup", handleEditorChange);

    return () => {
      window.removeEventListener("keydown", handleEditorChange);
      window.removeEventListener("keyup", handleEditorChange);
    };
  }, [value]);
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
          "bg-[#1e1e1e]": mode === "vs-dark",
        })}
      >
        <Editor
          height={400}
          defaultLanguage={"html"}
          language={language}
          theme={mode}
          defaultValue={value}
          value={value}
          className="w-full max-h-[400px] overflow-auto"
          onChange={(e) => {
            if (e === undefined) return;
            setValue(e);
          }}
        />
        <div className="mt-2 flex  justify-between items-center p-4">
          <div className="flex gap-3">
            <select
              name=""
              id=""
              className="form-select py-1 pl-3 h-auto rounded-full  bg-[#CED6E1] border-none"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value={"html"}>Html</option>
              <option value={"css"}>Css</option>
              <option value="javascript">Javascript</option>
              <option value="typescript">Typescript</option>
            </select>
            <select
              name=""
              id=""
              className="form-select py-1 pl-3 h-auto rounded-full  bg-[#CED6E1] border-none"
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="light">light</option>
              <option value="vs-dark">dark</option>
            </select>
          </div>
          <div className="inline-flex gap-x-5 items-center">
            {!isButtonEnabled && (
              <p className="inline-flex gap-3 items-center text-[#364153] ">
                <IconLink />
                <span className="text-[#6C727F] text-[10px] font-semibold">
                  .../{idCode}
                </span>
              </p>
            )}

            <button
              className="bg-[#406AFF] text-[#FFFFFE] px-6 py-3 inline-flex items-center gap-x-2 rounded-full hover:ring-1 disabled:bg-[#CED6E1]"
              onClick={handleSavedCode}
              disabled={!isButtonEnabled}
            >
              <IconShare /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
