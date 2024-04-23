"use client";
import useColumnsMasonry from "@/hooks/useColumnsMasonry";
import { Photo as PhotoType } from "@/types/app-unsplash";
import cn from "@/utils/cn";
import { api } from "@/utils/unsplasn";
import { useEffect, useState } from "react";
import Photo from "./Photo";

type PhotoListProps = {
  readonly id: string;
};

export default function PhotoList({ id }: PhotoListProps) {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isMounted, setMounted] = useState<boolean>(true);

  const fetchCollectionsPhotos = async () => {
    setLoading(true);
    const res = await api.collections.getPhotos({
      collectionId: id,
      page,
      perPage: 30,
    });
    if (res.type === "success") {
      console.log(
        res.response.results,
        Math.round(res.response.total / 30),
        page
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...res.response.results]);
      setHasMore(Math.round(res.response.total / 30) > page);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isMounted) {
      setMounted(false);
    } else {
      fetchCollectionsPhotos();
    }
  }, [isMounted]);

  const loadMorePhotos = async () => {
    if (hasMore) {
      setPage(page + 1);
      await fetchCollectionsPhotos();
    }
  };

  const { chunkedImages, columns } = useColumnsMasonry({
    data: photos,
    initialColumns: 4,
  });

  return (
    <div className="mt-12">
      <div
        className={cn(
          "mt-[78px] grid gap-x-6 px-5 md:px-[72px]",
          {
            "grid-cols-4": columns === 4,
          },
          {
            "grid-cols-3": columns === 3,
          },
          {
            "grid-cols-2": columns === 2,
          },
          {
            "grid-cols-1": columns === 1,
          }
        )}
      >
        {chunkedImages.map((column, columnIndex) => (
          <div
            className="flex flex-col gap-6"
            key={`column-${columnIndex.toString()}}`}
          >
            {column.map((photo: PhotoType) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </div>
        ))}
      </div>
      {!loading && hasMore && <button onClick={loadMorePhotos}>More</button>}
    </div>
  );
}
