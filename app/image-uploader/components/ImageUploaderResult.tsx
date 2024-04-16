/* eslint-disable @next/next/no-img-element */
import Card from "./Card";
import { IconDownload } from "./IconDownload";
import { IconShare } from "./IconShare";

interface ImageUploaderResultProps {
  imageUrl: string;
}

const ImageUploaderResult: React.FC<ImageUploaderResultProps> = ({
  imageUrl,
}) => {
  const shareImage = async () => {
    try {
      await navigator.share({
        title: "Compartir imagen",
        text: "Mira esta imagen:",
        url: imageUrl,
      });
    } catch (err) {
      console.error("Error al compartir la imagen:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card>
        <img
          src={imageUrl}
          alt="Uploaded Image"
          className="w-full h-64 rounded-lg"
        />
      </Card>
      <div className="mt-4">
        <button
          className="bg-[#3662E3] hover:bg-[#C2DAF9] transition-colors text-white font-semibold py-2 px-4 rounded mr-2 inline-flex items-center gap-1 text-[10px]"
          onClick={shareImage}
        >
          <IconShare />
          Share
        </button>
        <a
          href={imageUrl}
          download
          className="bg-[#3662E3] hover:bg-[#C2DAF9] transition-colors text-white font-semibold py-2 px-4 rounded inline-flex items-center gap-1 text-[10px]"
        >
          <IconDownload /> Download
        </a>
      </div>
    </div>
  );
};

export default ImageUploaderResult;
