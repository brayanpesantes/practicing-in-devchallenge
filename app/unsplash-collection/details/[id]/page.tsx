/* eslint-disable @next/next/no-img-element */
"use client";
import { api } from "@/utils/unsplasn";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Photo } from "@/types/app-unsplash";
dayjs.extend(LocalizedFormat);
export default function DetailsIdPage() {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);

  const getPhoto = async () => {
    setLoading(true);
    await api.photos
      .get({ photoId: String(params.id) })
      .then(async (result) => {
        if (result.type === "success") {
          const res = result.response;
          setPhoto(res as any);
          setLoading(false);
        }
      });
  };

  const photoDownload = () => {
    if (!photo) return;

    const link = document.createElement("a");
    link.href = photo.links.download;
    link.download = photo.id + ".jpg";
    link.target = "_blank";
    link.click();
  };

  useEffect(() => {
    getPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto font-beVietnamPro">
      <Navbar />
      <div className="mt-14">
        {loading ? (
          "cargando"
        ) : (
          <div className="grid grid-cols-1 w-full px-4 sm:w-[552px] mx-auto xl:w-full xl:grid-cols-2 gap-6">
            <div className="">
              <img src={photo?.urls?.regular} alt="" className="rounded-md" />
            </div>
            <div className="">
              <div className="flex gap-3">
                <img
                  src={photo?.user?.profile_image?.small}
                  alt={photo?.user?.name}
                  className="rounded-full"
                />
                <h2>{photo?.user?.name}</h2>
              </div>
              <p className="mt-5">
                Published on {dayjs(photo?.created_at).format("LL")}
              </p>
              <div className="space-x-3 mt-5">
                <button className="transition-all duration-150 cursor-pointer ease-in-out py-2 px-3 sm:py-3 sm:px-6 bg-[#E5E7EB] text-[#121826] text-sm font-medium rounded-md hover:text-white hover:bg-blue-500">
                  Add to Collection
                </button>
                <button
                  className="transition-all duration-150 cursor-pointer ease-in-out py-2 px-3 sm:py-3 sm:px-6 bg-[#E5E7EB] text-[#121826] text-sm font-medium rounded-md hover:text-white hover:bg-blue-500"
                  onClick={photoDownload}
                >
                  Download
                </button>
              </div>
              <div className="mt-9">
                <h3>Collections</h3>
                <div className="mt-2 space-y-3">
                  {photo?.related_collections?.results?.map((collection) => (
                    <div
                      className="flex justify-between p-2 hover:bg-[#E5E7EBCC] rounded group/item transition-all duration-150 cursor-pointer ease-in-out "
                      key={collection?.id}
                    >
                      <div className="flex gap-4">
                        <img
                          src={collection.cover_photo.urls.thumb}
                          alt={collection.user.name}
                          className="rounded size-[60px]"
                        />
                        <div className="">
                          <h2>{collection.title}</h2>
                          <p className="mt-1">
                            {collection?.total_photos} photos
                          </p>
                        </div>
                      </div>
                      <button className="mr-4 group/edit invisible group-hover/item:visible text-[#121826] ">
                        - Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
