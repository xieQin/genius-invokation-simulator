export interface ISummon {
  name: SummonsName;
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

  DandelionField,
}

export type SummonsName = keyof typeof Summons;
