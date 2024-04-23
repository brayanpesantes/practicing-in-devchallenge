"use client";
import PhotoList from "@/app/unsplash-collection/components/PhotoList";
import { useParams } from "next/navigation";

export default function PhotoIdPage() {
  const params = useParams();
  return <PhotoList id={String(params?.id)} />;
}
