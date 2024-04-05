import React from "react";
import Card from "./Card";
import { Coffe } from "../page";
type Props = {
  readonly coffes: Coffe[];
};

export default function ListCard({ coffes }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
      {coffes.map((coffe) => (
        <Card key={coffe.id} coffe={coffe} />
      ))}
    </div>
  );
}
