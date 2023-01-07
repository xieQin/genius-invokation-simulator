export interface ISupport {
  name: SupportName;
  type: SupportType;
}

export enum SupportType {
  Item,
  Location,
  Companion,
}

export enum SupportItem {
  NRE,
  ParametricTransformer,
}

export enum SupportLocation {
  KnightsOfFavoniusLiabrary,
  JadeChamber,
  DawnWinery,
  LiyueHarborWharf,
  WangsuInn,
  FavoniusCathedral,
}

export enum SupportCompanion {
  Katheryne,
  Timaeus,
  Wagner,
  ChefOfMao,
  Tubby,
  Timmie,
  Ellin,
  IronTongueTian,
  LiuSu,
  Liben,
  ChangeTheNinth,
  Paimon,
}

export type SupportItemName = keyof typeof SupportItem;
export type SupportLocationName = keyof typeof SupportLocation;
export type SupportCompanionName = keyof typeof SupportCompanion;
export type SupportName =
  | SupportItemName
  | SupportLocationName
  | SupportCompanionName;
