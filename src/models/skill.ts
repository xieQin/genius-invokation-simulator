import { IEffect } from "./effect";
import { SummonsID } from "./summons";

export interface ICost {
  costNum: number;
  costType: string;
}

export interface ISkill {
  id: string;
  name: string;
  type: SkillSubType[];
  text: string;
  costs: ICost[];
  img: string;
  imgID: string;
  summons: SummonsID[];
  effect: IEffect[];
  shield: string[];
}

export enum SkillType {
  Combat = "Combat",
  Passive = "Passive",
  Other = "Other",
}

export type SkillTypeID = keyof typeof SkillType;

export enum SkillCombatType {
  NormalAttack = "Normal Attack",
  ElementalSkill = "Elemental Skill",
  ElementalBurst = "Elemental Burst",
}

export enum SkillPassiveType {
  Passive = "Passive Skill",
}

export type SkillSubType = SkillCombatType | SkillPassiveType | "";
