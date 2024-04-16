// ImageUploaderForm
import { createClient } from "@/utils/supebase/client";
import IconExit from "./IconExit";

interface ImageUploaderFormProps {
  setFile: (file: File | null) => void;
  setUploading: (uploading: boolean) => void;
  setImageUrl: (imageUrl: string | null) => void;
}

const urlImageBase =
  "https://bvosfitdsxrwdrurknwe.supabase.co/storage/v1/object/public/images/";
const ImageUploaderForm: React.FC<ImageUploaderFormProps> = ({
  setFile,
  setUploading,
  setImageUrl,
}) => {
  const supabase = createClient();

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${Date.now()}-${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        throw new Error("Error al subir la imagen");
      } else {
        setImageUrl(urlImageBase + data?.path);
      }
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
      validateFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      validateFile(file);
    }
  };
  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!allowedTypes.includes(file.type)) {
      alert(
        "El tipo de archivo no es válido. Solo se permiten JPG, PNG y GIF."
      );
      return;
    }

    if (file.size > maxSize) {
      alert("El tamaño del archivo excede el límite de 2 MB.");
      return;
    }

    setFile(file);
    handleUpload(file);
  };
  return (
    <div
      className="border border-dashed border-gray-400 p-4 rounded-xl flex flex-col items-center justify-center py-[112px]"
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
      <p className="font-medium text-sm dark:text-white">
        Drag & drop a file or
        <label
          htmlFor="file-input"
          className="cursor-pointer text-[#3662E3] hover:text-gray-700
                   mt-5 font-bold ml-2"
        >
          browse files
        </label>
      </p>

      <p className="mt-2 text-xs font-light dark:text-[#F9FAFBCC]">
        JPG, PNG or GIF - Max file size 2MB
      </p>
    </div>
  );
};

export default ImageUploaderForm;
