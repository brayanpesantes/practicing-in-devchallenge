import React, { Suspense } from "react";
import CollectionList from "../components/CollectionList";

export default function CollectionsPage() {
  return (
    <div className="mt-9 ">
      <div className="text-center">
        <h1 className="text-[36px] font-semibold ">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200  via-red-300 to-violet-900">
            Collections
          </span>
        </h1>
        <p className="mt-2">
          Explore the world through collections of beautiful <br /> photos free
          to use under the{" "}
          <strong className="underline">Unsplash License.</strong>
        </p>
      </div>
      <div className="mt-14 px-[72px]">
        <CollectionList />
      </div>
    </div>
  );
}
