/* eslint-disable @next/next/no-img-element */
"use client";
import { Photo } from "@/types/app-unsplash";
import { api } from "@/utils/unsplasn";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PhotoIdPage() {
  const params = useParams();
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const getCollection = () => {
    api.collections
      .getPhotos({ collectionId: String(params?.id), page: 1, perPage: 30 })
      .then((res) => {
        if (res.type === "success") {
          setPhotos(res.response.results);
        }
      });
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">
      {photos?.map((photo) => (
        <div key={photo.id}>
          <img src={photo.urls.regular} alt={photo.id} />
        </div>
      ))}
    </div>
  );
}
