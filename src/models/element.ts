export enum GIElement {
  Anemo = "ETWind",
  Cryo = "ETIce",
  Dendro = "ETGrass",
  Electro = "ETThunder",
  Geo = "ETRock",
  Pyro = "ETFire",
  Hydro = "ETWater",
}

export type GIElementID = keyof typeof GIElement;
