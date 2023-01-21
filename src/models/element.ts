export enum GIElement {
  Anemo = "Anemo",
  Cryo = "Cryo",
  Dendro = "Dendro",
  Electro = "Electro",
  Geo = "Geo",
  Pyro = "Pyro",
  Hydro = "Hydro",
}

export type GIElementID = keyof typeof GIElement;
