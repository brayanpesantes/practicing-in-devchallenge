/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/utils/unsplasn";
import { Collection } from "@/types/app-unsplash";

export const useInfiniteScroll = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const getCollections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.collections.list({ page, perPage: 10 });
      if (res.type === "success") {
        setCollections((prevCollections) => [
          ...prevCollections,
          ...res.response.results,
        ]);
        setHasMore(res.response.results.length === 10);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      getCollections();
    }
  }, [getCollections, initialRender]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  return { collections, loading, hasMore, loaderRef };
};
