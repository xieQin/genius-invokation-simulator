import { GIElement } from "./element";
import {
  EqiupmentWeaponType,
  IEquipmentArtifact,
  IEquipmentWeapon,
} from "./equipment";
import { GIRegion } from "./region";
import { ITalentCombat, ITalentPassive } from "./talent";

export interface ICharacter {
  name: keyof typeof Character;
  element: GIElement;
  weaponType: EqiupmentWeaponType;
  region: GIRegion;
  equipments: ICharacterEquipment;
  talents: ICharacterTalent;
  profile: ICharacterProfile;
  elementStatus: GIElement;
}

export interface ICharacterTalent {
  attack: ITalentCombat;
  skill: ITalentCombat[];
  burst: ITalentCombat;
  passive: ITalentPassive;
}

export interface ICharacterProfile {
  voice: {
    name: string;
    language: "cn" | "en" | "jp" | "kr";
  }[];
  birthday: string;
  affiliation: string;
  vision: GIElement;
  constellation: string;
  extra: string;
}

export interface ICharacterEquipment {
  weapon: IEquipmentWeapon;
  artifact: IEquipmentArtifact;
}

export enum Character {
  Ganyu,
  Diona,
  kaeya,
  Chongyun,
  KamisatoAyaka,
  Barbara,
  Xingqiu,
  Mona,
  Diluc,
  Xiangling,
  Bennett,
  Yoimiya,
  Fischl,
  Razor,
  Keqing,
  Cyno,
  Sucrose,
  Jean,
  Ningguang,
  Noelle,
  Collei,

  RhodeiaOfLoch,
  MirrorMaiden,
  FatuiPyroAgent,
  MaguuKenki,
  StonehideLawachurl,
  JadeplumeTerrorshroom,
}
