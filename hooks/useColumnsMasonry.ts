import { Photo } from "@/types/app-unsplash";
import { useEffect, useState } from "react";

interface UseColumnsMasonryOptions {
  initialColumns: number;
  data: Photo[] | null;
}

const useColumnsMasonry = ({
  initialColumns,
  data,
}: UseColumnsMasonryOptions) => {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1);
      } else if (width <= 768) {
        setColumns(2);
      } else if (width < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chunkArray = (array: Photo[] | null, columns: number): Photo[][] => {
    const chunkedArray: Photo[][] = [];
    const columnHeights: number[] = new Array(columns).fill(0);

    array?.forEach((photo) => {
      const minHeightColumn = columnHeights.indexOf(Math.min(...columnHeights));
      chunkedArray[minHeightColumn] = chunkedArray[minHeightColumn] || [];
      chunkedArray[minHeightColumn].push(photo);
      columnHeights[minHeightColumn] += photo.height;
    });

    return chunkedArray;
  };

  const chunkedImages = chunkArray(data, columns);

  return { columns, chunkedImages };
};

export default useColumnsMasonry;
