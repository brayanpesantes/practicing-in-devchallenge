/* eslint-disable @next/next/no-img-element */
import { Collection } from "@/types/app-unsplash";
import cn from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  readonly collection: Collection;
};
export default function CollectionCard({ collection }: Props) {
  const imagesCount = collection.preview_photos.length;
  const pathname = usePathname();
  const baseUrl = window.location.origin + pathname;
  return (
    <article className="overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out">
      <Link href={`${baseUrl}/photo/${collection.id}`}>
        <div className="max-w-[358px] h-[228px]">
          <div
            className={cn(
              "h-full w-full grid ",
              {
                "grid-cols-1": imagesCount === 1,
              },
              { "grid-cols-2": imagesCount === 2 },
              {
                "grid-cols-3": imagesCount === 3,
              },
              { "grid-cols-2 grid-rows-2": imagesCount === 4 },
              "aspect-square"
            )}
          >
            {collection.preview_photos.map((image, index) => (
              <div key={image.id} className="overflow-hidden">
                <img
                  src={image.urls.thumb}
                  alt={`Imagen ${image.id}`}
                  className={cn(
                    "w-full h-full object-cover object-center",
                    {
                      "rounded-tl-md ": index === 0,
                    },
                    {
                      "rounded-tr-md ": index === 1,
                    },
                    {
                      "rounded-bl-md": index === 2,
                    },
                    {
                      "rounded-br-md": index === 3,
                    }
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-[#121826] font-medium">{collection.title}</h2>
          <p className="mt-1 text-[#6C727F] text-[12px] font-light">
            {collection.total_photos} photos
          </p>
        </div>
      </Link>
    </article>
  );
}
