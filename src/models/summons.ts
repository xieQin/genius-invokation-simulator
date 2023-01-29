import { CardModify } from "./card";

export interface ISummon {
  id: number;
  imgID: string;
  name: string;
  content: string;
  cardModify: CardModify[];
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
