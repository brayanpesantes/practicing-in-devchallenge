/* eslint-disable @next/next/no-img-element */
"use client";
import { createClient } from "@/utils/supebase/client";
import { useState } from "react";
import IconExit from "./IconExit";
import { IconShare } from "./IconShare";
import { IconDownload } from "./IconDownload";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const supabase = createClient();

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { data, error } = await supabase.storage
        .from("images") // Nombre del bucket público
        .upload(`${Date.now()}-${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        throw new Error("Error al subir la imagen");
      }

      setImageUrl(
        "https://bvosfitdsxrwdrurknwe.supabase.co/storage/v1/object/public/" +
          data?.fullPath
      );
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error al subir la imagen. Inténtalo de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      handleUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFile(file);
      handleUpload(file);
    }
  };
  return (
    <div className="h-[calc(100vh-73px)]">
      <div className="mx-auto flex items-center justify-center h-full">
        <div className="p-2 bg-white rounded-md w-[540px]">
          {!uploading && !imageUrl && (
            <div
              className="border-2 border-dashed border-gray-400 p-4 rounded-md flex flex-col items-center justify-center py-[112px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <IconExit />
              <input
                type="file"
                accept="image/jpeg, image/png, image/gif"
                className="hidden"
                onChange={handleFileChange}
                id="file-input"
              />
              <p className="font-bold">
                Drag & drop a file or
                <label
                  htmlFor="file-input"
                  className="cursor-pointer text-[#3662E3] hover:text-gray-700
                   mt-5 font-bold ml-2"
                >
                  browse files
                </label>
              </p>

              <p className="mt-2">JPG, PNG or GIF - Max file size 2MB</p>
            </div>
          )}

          {uploading && !imageUrl && (
            <div className="flex flex-col items-center justify-center w-full px-[72px] py-7 ">
              <h3 className=" w-full text-center">
                <strong>Uploading</strong>, please wait..
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 mt-4 dark:bg-gray-700 relative overflow-hidden">
                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse loader"></div>
              </div>
            </div>
          )}

          {imageUrl && (
            <div className="flex flex-col items-center justify-center">
              <img
                src={imageUrl}
                alt="Uploaded Image"
                className="max-w-full h-64"
              />
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-[#3662E3] text-white font-bold py-2 px-4 rounded mr-2 inline-flex items-center gap-1"
                  onClick={() => navigator.clipboard.writeText(imageUrl)}
                >
                  <IconShare />
                  Share
                </button>
                <a
                  href={imageUrl}
                  download
                  className="bg-green-500 hover:bg-[#3662E3] text-white font-bold py-2 px-4 rounded inline-flex items-center gap-1"
                >
                  <IconDownload /> Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
