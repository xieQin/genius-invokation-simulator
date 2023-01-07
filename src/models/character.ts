import { GIElement } from "./element";
import {
  EqiupmentWeaponType,
  IEquipmentArtifact,
  IEquipmentWeapon,
} from "./equipment";
import { GIRegion } from "./region";
import { ISkillCombat, ISkillPassive } from "./skill";

export interface ICharacter {
  name: CharacterName;
  element: GIElement;
  weaponType: EqiupmentWeaponType;
  region: GIRegion;
  equipments: ICharacterEquipment | null;
  skills: ICharacterSkill | null;
  profile: ICharacterProfile | null;
  elementStatus: GIElement | null;
}

export type CharacterName = keyof typeof Character;

export interface ICharacterSkill {
  attack: ISkillCombat;
  skill: ISkillCombat[];
  burst: ISkillCombat;
  passive: ISkillPassive;
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
