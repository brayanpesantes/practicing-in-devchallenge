export interface Country {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  population: number;
  area: number;
  region: string;
  subregion: string;
  independent: boolean;
  unMember: boolean;
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
