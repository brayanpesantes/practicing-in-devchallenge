export interface Country {
  flags: {
    png: string;
  };
  name: {
    common: string;
    official: string;
  };
  population: number;
  area: number;
  region: string;
  subregion: string;
  independent: boolean;
  unMember: boolean;
  capital: string[];
  languages: object;
  currencies: object;
  continents: string[];
  borders: string[];
}

export interface FilterStatus {
  un: boolean;
  independent: boolean;
}

export interface FilterRegion {
  americas: boolean;
  antarctic: boolean;
  africa: boolean;
  asia: boolean;
  europe: boolean;
}
