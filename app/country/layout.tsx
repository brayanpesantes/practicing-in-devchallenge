import { ProviderCountries } from "@/context/CountriesContext";
import React from "react";

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProviderCountries>{children}</ProviderCountries>;
}
