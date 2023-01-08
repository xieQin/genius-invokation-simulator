import { GIElement } from "./element";
import {
  EqiupmentWeaponType,
  IEquipmentArtifact,
  IEquipmentWeapon,
} from "./equipment";
import { GIRegionID } from "./region";
import { ISkill } from "./skill";

export interface ICharacter {
  id: number;
  name: string;
  element: GIElement;
  weaponType: EqiupmentWeaponType;
  region: GIRegionID[];
  equipments: ICharacterEquipment | null;
  skills: ISkill[];
  profile: ICharacterProfile | null;
  elementStatus: GIElement | null;
  hp: number;
  img: string;
  imgID: string;
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
  Ganyu = "Ganyu",
  Diona = "Diona",
  Kaeya = "Kaeya",
  Chongyun = "Chongyun",
  KamisatoAyaka = "Kamisato Ayaka",
  Barbara = "Barbara",
  Xingqiu = "Xingqiu",
  Mona = "Mona",
  Diluc = "Diluc",
  Xiangling = "Xiangling",
  Bennett = "Bennett",
  Yoimiya = "Yoimiya",
  Fischl = "Fischl",
  Razor = "Razor",
  Keqing = "Keqing",
  Cyno = "Cyno",
  Sucrose = "Sucrose",
  Jean = "Jean",
  Ningguang = "Ningguang",
  Noelle = "Noelle",
  Collei = "Collei",

  RhodeiaOfLoch = "Rhodeia of Loch",
  MirrorMaiden = "Mirror Maiden",
  FatuiPyroAgent = "Fatui Pyro Agent",
  MaguuKenki = "Maguu Kenki",
  StonehideLawachurl = "Stonehide Lawachurl",
  JadeplumeTerrorshroom = "Jadeplume Terrorshroom",
}
