export interface ISupport {
  id: SupportID;
  name: string;
  type: SupportType;
}

export enum SupportType {
  Item = "Item",
  Location = "Location",
  Companion = "Companion",
}

export enum SupportItem {
  NRE,
  ParametricTransformer,
}

export enum SupportLocation {
  KnightsofFavoniusLibrary,
  JadeChamber,
  DawnWinery,
  LiyueHarborWharf,
  WangshuInn,
  FavoniusCathedral,
}

export enum SupportCompanion {
  Katheryne,
  Timaeus,
  Wagner,
  ChefMao,
  Tubby,
  Timmie,
  Ellin,
  IronTongueTian,
  LiuSu,
  Liben,
  ChangtheNinth,
  Paimon,
}

export type SupportItemID = keyof typeof SupportItem;
export type SupportLocationID = keyof typeof SupportLocation;
export type SupportCompanionID = keyof typeof SupportCompanion;
export type SupportID = SupportItemID | SupportLocationID | SupportCompanionID;
