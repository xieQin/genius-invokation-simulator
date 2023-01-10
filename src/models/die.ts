export interface IGIDice {
  id: GIDiceID;
}

export enum GIDice {
  Omni,
  Geo,
  Cryo,
  Dendro,
  Electro,
  Pyro,
  Anemo,
  Hydro,
}

export type GIDiceID = keyof typeof GIDice;
