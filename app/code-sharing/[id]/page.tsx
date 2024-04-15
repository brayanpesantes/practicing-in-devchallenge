"use client";
import cn from "@/utils/cn";
import { createClient } from "@/utils/supebase/client";
import { Editor } from "@monaco-editor/react";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NoteCodeLogo from "../../images/NoteCodeLogo.svg";
import { IconLink } from "../components/IconLink";
import { IconShare } from "../components/IconShare";
export default function ViewCodePage() {
  const { id } = useParams();
  console.log(id);

  const [language, setLanguage] = useState("");
  const [mode, setMode] = useState("");
  const [value, setValue] = useState("");
  const [idCode, setIdCode] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const pathname = usePathname();

  const supebase = createClient();

  const getData = async () => {
    const { data, error } = await supebase
      .from("share_code")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setIdCode(data?.id);
    const restored = JSON.parse(data.code);
    setValue(restored);
    setMode(data.theme);
    setLanguage(data.language);
  };
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

  useEffect(() => {
    getData();
  }, [id]);

  const handleSavedCode = async () => {
    const updateCode = JSON.stringify(value);
    const { error } = await supebase
      .from("share_code")
      .update({ code: updateCode, theme: mode, language })
      .match({ id: idCode });

    if (error) {
      alert("error saving code");
      return;
    }
    setIdCode(idCode);
    setIsButtonEnabled(false);
    const url = window.location.origin + pathname + "/" + idCode;
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
    <div className="max-w-screen-2xl mx-auto min-h-screen bg-code bg-violet-600 bg-cover bg-top">
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
                value={language}
              >
                <option value="html"> Html</option>
                <option value="css"> Css</option>
                <option value="javascript">javascript</option>
                <option value="typescript">typescript</option>
              </select>
              <select
                name=""
                id=""
                className="form-select py-1 pl-3 h-auto rounded-full  bg-[#CED6E1] border-none"
                onChange={(e) => setMode(e.target.value)}
                value={mode}
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
    </div>
  );
}
