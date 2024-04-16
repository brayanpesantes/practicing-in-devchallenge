// Componente ImageUploader
import { useState } from "react";
import Card from "./Card";
import ImageUploaderForm from "./ImageUploaderForm";
import ImageUploaderResult from "./ImageUploaderResult";

export default function ImageUploader() {
  const [_, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="h-[calc(100vh-73px)]">
      <div className="mx-auto flex items-center justify-center h-full">
        {!uploading && !imageUrl && (
          <Card>
            <ImageUploaderForm
              setFile={setFile}
              setUploading={setUploading}
              setImageUrl={setImageUrl}
            />
          </Card>
        )}

        {uploading && !imageUrl && (
          <div className="flex flex-col items-center justify-center w-[545px] px-[72px] py-7 ">
            <h3 className=" w-full text-center">
              <strong>Uploading</strong>, please wait..
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 mt-4 dark:bg-gray-700 relative overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full animate-pulse loader"></div>
            </div>
          </div>
        )}

        {imageUrl && <ImageUploaderResult imageUrl={imageUrl} />}
      </div>
    </div>
  );
}
