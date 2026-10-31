export interface Building {
  id: string;
  address: string;
  floors: number;
  entrances: number;
}

export const buildings: Building[] = [
  { id: "1", address: "Strada Universitatii nr. 10", floors: 4, entrances: 2 },
  { id: "2", address: "Bulevardul Carol I nr. 25", floors: 8, entrances: 3 },
  { id: "3", address: "Calea Victoriei nr. 100", floors: 5, entrances: 1 },
];