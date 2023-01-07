export enum GIElement {
  Anemo,
  Cryo,
  Dendro,
  Electro,
  Geo,
  Pyro,
  Hydro,
}

export type GIElementName = keyof typeof GIElement;
