"use client";
import CollectionCard from "./CollectionCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function CollectionList() {
  const { collections, hasMore, loaderRef, loading } = useInfiniteScroll();

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-8">
        {collections.map((collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
      <div ref={loaderRef} className="py-20 flex items-center justify-center">
        {hasMore && (
          <button
            className="mx-auto py-3 px-10 bg-gray-300 rounded-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Cargar más"}
          </button>
        )}
      </div>
    </div>
  );
}
