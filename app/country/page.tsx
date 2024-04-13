import React from "react";
import Container from "./components/Container";
import { ProviderCountries } from "@/context/CountriesContext";

export default function CountryPage() {
  return (
    <ProviderCountries>
      <Container />
    </ProviderCountries>
  );
}
