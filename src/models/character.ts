import { ICard } from "./card";
import { GIElement } from "./element";
import { EqiupmentWeaponType } from "./equipment";
import { GIRegionID } from "./region";
import { ISkill } from "./skill";

export interface ICharacter {
  id: number;
  name: string;
  element: GIElement;
  weaponType: EqiupmentWeaponType;
  region: GIRegionID[];
  equipments: ICharacterEquipment;
  skills: ISkill[];
  profile: ICharacterProfile | null;
  elementStatus: GIElement[];
  hp: number;
  currentHp: number;
  energy: number;
  currentEnergy: number;
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
  weapon: ICard | null;
  artifact: ICard | null;
  talent: ICard | null;
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
