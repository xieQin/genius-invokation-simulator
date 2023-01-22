export interface ISummon {
  id: SummonsID;
  name: string;
}

export enum Summons {
  CuileinAnbar,

  OceanidMimicFerret,
  OceanidMimicFrog,
  OceanidMimicRaptor,

  ShadowsordLoneGale,
  ShadowsordGallopingFrost,

  LargeWindSpirit,

  LightningStiletto,

  SacredCryoPearl,

  DrunkenMist,

  FrostflakeSekiNoTo,

  MelodyLoop,

  Reflection,

  Guoba,

  Oz,

  IceLotus,

  DandelionField,
}

export type SummonsID = keyof typeof Summons;
