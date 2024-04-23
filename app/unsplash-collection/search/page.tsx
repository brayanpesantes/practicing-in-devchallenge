/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { api } from "@/utils/unsplasn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import useColumnsMasonry from "@/hooks/useColumnsMasonry";
import { Photo } from "@/types/app-unsplash";
import cn from "@/utils/cn";
import Link from "next/link";
import InputSearch from "../components/InputSearch";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<Photo[] | null>(null);

  const handleInputChange = (value: string) => {
    setQuery(value);
  };
  useEffect(() => {
    const newUrl = query
      ? `${window.location.origin}/${pathname}?query=${query}`
      : `${window.location.origin}/${pathname}`;

    router.replace(newUrl);
  }, [query, pathname, router]);

  const getData = async () => {
    api.search
      .getPhotos({
        query: query,
        page: 1,
        perPage: 30,
      })
      .then((result) => {
        if (result.type === "success") {
          const res = result.response.results;
          setData(res as any);
        }
      })
      .catch((error) => console.log(error));
  };
  const onSubmit = async () => {
    getData();
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { chunkedImages, columns } = useColumnsMasonry({
    data,
    initialColumns: 4,
  });

  return (
    <>
      <div className="bg-collection-gradient h-20 relative">
        <div className="top-12 absolute inset-0">
          <InputSearch
            className="mx-auto"
            onSearch={handleInputChange}
            defaultValue={query}
            handleSubmit={onSubmit}
          />
        </div>
      </div>
      <Suspense fallback={<div>cargando...</div>}>
        <div
          className={cn(
            "mt-[78px] grid  gap-x-6 px-5  md:px-[72px]",
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
          {chunkedImages?.map((data, index) => {
            return (
              <div
                key={`figura-${data[index]?.id}`}
                className="flex flex-col gap-y-6"
              >
                {data?.map((image) => {
                  return (
                    <Link
                      href={`/unsplash-collection/details/${image.id}`}
                      key={`image-${image.id}`}
                    >
                      <figure>
                        <img
                          src={image.urls.regular}
                          alt={image.description}
                          className="w-full"
                        />
                      </figure>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Suspense>
    </>
  );
}
