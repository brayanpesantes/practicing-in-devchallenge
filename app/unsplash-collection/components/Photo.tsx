/* eslint-disable @next/next/no-img-element */
import { Photo as TypePhoto } from "@/types/app-unsplash";

type PhotoProps = {
  readonly photo: TypePhoto;
};

export default function Photo({ photo }: PhotoProps) {
  return (
    <figure className="overflow-hidden  cursor-pointer rounded-lg">
      <img
        src={photo.urls.regular}
        alt={photo.description}
        className="rounded-lg hover:scale-110 transition-all duration-500 ease-in-out"
      />
      <figcaption className="sr-only">{photo.description}</figcaption>
    </figure>
  );
}
