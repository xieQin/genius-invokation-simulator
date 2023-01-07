export interface ISupport {
  name: keyof typeof SupportItem | SupportLocation | SupportCompanion;
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
  ELlin,
  IronTongueTian,
  LiuSu,
  Liben,
  ChangeTheNinth,
}
